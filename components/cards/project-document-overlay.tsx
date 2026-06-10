"use client";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  Expand,
  Loader2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

type ProjectDocumentOverlayProps = {
  downloadLabel?: string;
  downloadUrl?: string;
  documentLayout?: "auto" | "single-page";
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
};

type PdfDoc = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
};

type PdfPage = {
  getViewport: (options: { scale: number }) => { width: number; height: number };
  render: (options: {
    canvasContext: CanvasRenderingContext2D;
    viewport: ReturnType<PdfPage["getViewport"]>;
  }) => PdfRenderTask;
};

type PdfJsLib = {
  getDocument: (src: string) => { promise: Promise<PdfDoc> };
  GlobalWorkerOptions: { workerSrc: string };
};

type PdfRenderTask = {
  cancel: () => void;
  promise: Promise<void>;
};

declare global {
  interface Window {
    pdfjsLib?: PdfJsLib;
  }
}

const PDFJS_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";
const WORKER_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

const MIN_ZOOM_LEVEL = 0.7;
const MAX_ZOOM_LEVEL = 1.9;
const ZOOM_STEP = 0.15;
const MOBILE_LAYOUT_BREAKPOINT = 960;

// ==========================================================================
// Load PDF.js Runtime
//
// Reuse a single browser-loaded PDF.js instance so the overlay can render
// documents without bundling the library into the main app chunk.
// ==========================================================================
const loadPdfJs = async () => {
  if (window.pdfjsLib) {
    return window.pdfjsLib;
  }

  const mod = (await import(
    /* webpackIgnore: true */ PDFJS_CDN as string
  )) as PdfJsLib & { default?: PdfJsLib };
  const lib = mod.default ?? mod;

  lib.GlobalWorkerOptions.workerSrc = WORKER_CDN;
  window.pdfjsLib = lib;

  return window.pdfjsLib;
};

/**
 * Displays a fullscreen PDF viewer that fits the current viewport and adapts
 * between single-page mobile layout and two-page desktop spread layout.
 */
export const ProjectDocumentOverlay = ({
  downloadLabel = "Download PDF",
  downloadUrl,
  documentLayout = "auto",
  isOpen,
  onClose,
  src,
  title,
}: ProjectDocumentOverlayProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftRenderTaskRef = useRef<PdfRenderTask | null>(null);
  const rightRenderTaskRef = useRef<PdfRenderTask | null>(null);
  const renderCycleRef = useRef(0);

  const [pdfDoc, setPdfDoc] = useState<PdfDoc | null>(null);
  const [viewerSize, setViewerSize] = useState({ height: 0, width: 0 });
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSinglePageLayout =
    documentLayout === "single-page" ||
    (viewerSize.width > 0 && viewerSize.width < MOBILE_LAYOUT_BREAKPOINT);
  const pageStep = isSinglePageLayout ? 1 : 2;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    // ==========================================================================
    // Load Active Document
    //
    // Reset prior viewer state before loading the next PDF so the overlay never
    // shows stale page counts or canvas content between previews.
    // ==========================================================================
    setLoading(true);
    setError(null);
    setPdfDoc(null);

    loadPdfJs()
      .then((lib) => lib.getDocument(src).promise)
      .then((doc) => {
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setCurrentPage(1);
      })
      .catch(() => {
        setError("Failed to load document.");
      })
      .finally(() => {
        setLoading(false);
      });

    return undefined;
  }, [isOpen, src]);

  useEffect(() => {
    if (!isOpen || !scrollRef.current) {
      return undefined;
    }

    const scrollElement = scrollRef.current;
    const updateViewerSize = () => {
      setViewerSize({
        height: scrollElement.clientHeight,
        width: scrollElement.clientWidth,
      });
    };

    updateViewerSize();

    const observer = new ResizeObserver(updateViewerSize);
    observer.observe(scrollElement);

    return () => observer.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!isSinglePageLayout && currentPage % 2 === 0) {
      setCurrentPage((page) => Math.max(page - 1, 1));
    }
  }, [currentPage, isSinglePageLayout]);

  const settleRenderTask = useCallback(async (task: PdfRenderTask | null) => {
    if (!task) {
      return;
    }

    task.cancel();

    try {
      await task.promise;
    } catch {
      // Ignore cancellation errors from PDF.js while swapping renders.
    }
  }, []);

  const cancelActiveRenderTasks = useCallback(async () => {
    const leftTask = leftRenderTaskRef.current;
    const rightTask = rightRenderTaskRef.current;

    leftRenderTaskRef.current = null;
    rightRenderTaskRef.current = null;

    await Promise.all([
      settleRenderTask(leftTask),
      settleRenderTask(rightTask),
    ]);
  }, [settleRenderTask]);

  const renderPages = useCallback(async () => {
    if (!pdfDoc || viewerSize.width === 0 || viewerSize.height === 0) {
      return;
    }

    // ==========================================================================
    // Render Visible Pages
    //
    // Fit the current spread to the available viewport, then swap canvases only
    // for the active pages so zoom and layout changes stay responsive.
    // ==========================================================================
    const renderCycleId = renderCycleRef.current + 1;
    renderCycleRef.current = renderCycleId;

    await cancelActiveRenderTasks();

    if (renderCycleRef.current !== renderCycleId) {
      return;
    }

    const clearCanvas = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) {
        return;
      }

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
    };

    const leftPage = await pdfDoc.getPage(currentPage);
    const leftBaseViewport = leftPage.getViewport({ scale: 1 });
    const rightPageNumber = currentPage + 1;
    const hasRightPage = !isSinglePageLayout && rightPageNumber <= totalPages;
    const rightPage = hasRightPage
      ? await pdfDoc.getPage(rightPageNumber)
      : null;
    const rightBaseViewport = rightPage?.getViewport({ scale: 1 });

    const pageGap = hasRightPage ? 16 : 0;
    const availableWidth = Math.max(viewerSize.width - 32, 240);
    const availableHeight = Math.max(viewerSize.height - 32, 240);
    const spreadWidth =
      leftBaseViewport.width + (rightBaseViewport?.width ?? 0) + pageGap;
    const spreadHeight = Math.max(
      leftBaseViewport.height,
      rightBaseViewport?.height ?? 0,
    );
    const fitScale = Math.min(
      availableWidth / spreadWidth,
      availableHeight / spreadHeight,
    );
    const renderScale = Math.max(fitScale * zoomLevel, 0.35);

    const renderOne = async (
      page: PdfPage,
      canvas: HTMLCanvasElement | null,
      taskRef: typeof leftRenderTaskRef,
    ) => {
      if (!canvas) {
        return;
      }

      const viewport = page.getViewport({ scale: renderScale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      const renderTask = page.render({ canvasContext: context, viewport });
      taskRef.current = renderTask;

      try {
        await renderTask.promise;
      } catch (error) {
        const message =
          error instanceof Error ? error.message.toLowerCase() : "";
        if (!message.includes("cancel")) {
          throw error;
        }
      } finally {
        if (taskRef.current === renderTask) {
          taskRef.current = null;
        }
      }
    };

    try {
      await Promise.all([
        renderOne(leftPage, leftCanvasRef.current, leftRenderTaskRef),
      rightPage
          ? renderOne(rightPage, rightCanvasRef.current, rightRenderTaskRef)
          : Promise.resolve(clearCanvas(rightCanvasRef.current)),
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : "";
      if (!message.includes("cancel")) {
        throw error;
      }
    }
  }, [
    cancelActiveRenderTasks,
    currentPage,
    isSinglePageLayout,
    pdfDoc,
    totalPages,
    viewerSize.height,
    viewerSize.width,
    zoomLevel,
  ]);

  useEffect(() => {
    renderPages();
  }, [renderPages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ behavior: "smooth", top: 0 });
  }, [currentPage]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        setCurrentPage((page) => Math.min(page + pageStep, totalPages));
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setCurrentPage((page) => Math.max(page - pageStep, 1));
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey
          ? document.activeElement === firstElement
          : document.activeElement === lastElement
      ) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement)?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, pageStep, totalPages]);

  useEffect(() => {
    if (!isOpen) {
      const resetOverlayTimer = window.setTimeout(() => {
        setPdfDoc(null);
        setViewerSize({ height: 0, width: 0 });
        setCurrentPage(1);
        setZoomLevel(1);
        void cancelActiveRenderTasks();
      }, 220);

      return () => {
        window.clearTimeout(resetOverlayTimer);
      };
    }

    return undefined;
  }, [cancelActiveRenderTasks, isOpen]);

  useEffect(
    () => () => {
      void cancelActiveRenderTasks();
    },
    [cancelActiveRenderTasks],
  );

  if (typeof document === "undefined") {
    return null;
  }

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage + pageStep <= totalPages;
  const showRightPage = currentPage + 1 <= totalPages;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] flex items-end sm:items-center sm:justify-center sm:p-4 md:p-6 lg:p-8"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.button
            animate={{ opacity: 1 }}
            aria-label="Close document preview"
            className="absolute inset-0 bg-background/85 backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            tabIndex={-1}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            type="button"
          />

          <motion.div
            ref={dialogRef}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-label={`${title} fullscreen preview`}
            aria-modal="true"
            className="relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-background shadow-2xl sm:h-[calc(100dvh-2rem)] sm:max-w-5xl sm:rounded-xl sm:border sm:border-border/60 md:max-w-6xl lg:max-w-7xl"
            exit={{ opacity: 0, scale: 0.98, y: 24 }}
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            role="dialog"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/60 bg-background px-4 py-3 sm:px-5">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-muted-foreground/25 sm:hidden"
          />

          <div className="min-w-0 pt-1 sm:pt-0">
            <p className="truncate text-sm font-semibold sm:text-base">
              {title}
            </p>
            {totalPages > 0 ? (
              <p className="text-xs text-muted-foreground">
                Pages {currentPage}
                {!isSinglePageLayout && showRightPage ? `-${currentPage + 1}` : ""}{" "}
                of {totalPages}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <Button
              aria-label="Zoom out"
              className="size-8"
              disabled={zoomLevel <= MIN_ZOOM_LEVEL}
              onClick={() =>
                setZoomLevel((level) =>
                  Math.max(level - ZOOM_STEP, MIN_ZOOM_LEVEL),
                )
              }
              size="icon"
              type="button"
              variant="outline"
            >
              <ZoomOut className="size-4" />
            </Button>

            <Button
              aria-label="Zoom in"
              className="size-8"
              disabled={zoomLevel >= MAX_ZOOM_LEVEL}
              onClick={() =>
                setZoomLevel((level) =>
                  Math.min(level + ZOOM_STEP, MAX_ZOOM_LEVEL),
                )
              }
              size="icon"
              type="button"
              variant="outline"
            >
              <ZoomIn className="size-4" />
            </Button>

            <Button
              asChild
              className="hidden h-8 gap-1.5 px-3 text-xs sm:flex"
              variant="outline"
            >
              <a href={src} rel="noopener noreferrer" target="_blank">
                <Expand className="size-3.5" />
                Open PDF
              </a>
            </Button>

            {downloadUrl ? (
              <Button
                asChild
                className="hidden h-8 gap-1.5 px-3 text-xs sm:flex"
                variant="default"
              >
                <a download href={downloadUrl}>
                  {downloadLabel}
                </a>
              </Button>
            ) : null}

            <Button
              asChild
              aria-label="Open PDF in new tab"
              className="size-8 sm:hidden"
              size="icon"
              variant="outline"
            >
              <a href={src} rel="noopener noreferrer" target="_blank">
                <Expand className="size-4" />
              </a>
            </Button>

            {downloadUrl ? (
              <Button
                asChild
                aria-label={downloadLabel}
                className="size-8 sm:hidden"
                size="icon"
                variant="default"
              >
                <a download href={downloadUrl}>
                  <Download className="size-4" />
                </a>
              </Button>
            ) : null}

            <Button
              ref={closeButtonRef}
              aria-label="Close preview"
              className="size-8"
              onClick={onClose}
              size="icon"
              type="button"
              variant="outline"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="relative min-h-0 flex-1 overflow-auto bg-muted/30 p-3 sm:p-5"
        >
          {!loading && !error ? (
            <>
              <Button
                aria-label={
                  isSinglePageLayout ? "Previous page" : "Previous spread"
                }
                className="absolute left-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/90 shadow-lg backdrop-blur sm:left-5"
                disabled={!canGoPrev}
                onClick={() =>
                  setCurrentPage((page) => Math.max(page - pageStep, 1))
                }
                size="icon"
                type="button"
                variant="outline"
              >
                <ChevronLeft className="size-4" />
              </Button>

              <Button
                aria-label={isSinglePageLayout ? "Next page" : "Next spread"}
                className="absolute right-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/90 shadow-lg backdrop-blur sm:right-5"
                disabled={!canGoNext}
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + pageStep, totalPages))
                }
                size="icon"
                type="button"
                variant="outline"
              >
                <ChevronRight className="size-4" />
              </Button>
            </>
          ) : null}

          {loading ? (
            <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
              Loading document...
            </div>
          ) : null}

          {error ? (
            <div className="flex h-full items-center justify-center text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {!loading && !error ? (
            <div
              className={`mx-auto flex min-h-full w-full items-start justify-center ${
                isSinglePageLayout ? "" : "gap-3"
              }`}
            >
              <canvas
                ref={leftCanvasRef}
                className="h-auto max-w-full rounded-md border border-border/50 bg-card shadow-md"
                style={{ display: "block" }}
              />
              <canvas
                ref={rightCanvasRef}
                className="h-auto max-w-full rounded-md border border-border/50 bg-card shadow-md"
                style={{
                  display:
                    !isSinglePageLayout && showRightPage ? "block" : "none",
                }}
              />
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center justify-center border-t border-border/60 bg-background px-4 py-2.5 sm:px-5">
          <span className="text-xs tabular-nums text-muted-foreground">
            {totalPages > 0
              ? isSinglePageLayout
                ? `${currentPage} / ${totalPages} pages`
                : `${Math.ceil(currentPage / 2)} / ${Math.ceil(totalPages / 2)} spreads`
              : "-"}
          </span>
        </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
