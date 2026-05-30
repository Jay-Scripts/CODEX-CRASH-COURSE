"use client";

import {
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

type ProjectDocumentOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
};

type PdfDoc = {
  numPages: number;
  getPage: (n: number) => Promise<PdfPage2>;
};

type PdfPage2 = {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (ctx: {
    canvasContext: CanvasRenderingContext2D;
    viewport: ReturnType<PdfPage2["getViewport"]>;
  }) => { promise: Promise<void> };
};

type PdfJsLib = {
  getDocument: (src: string) => { promise: Promise<PdfDoc> };
  GlobalWorkerOptions: { workerSrc: string };
};

// PDF.js is loaded once from CDN and cached on window.
declare global {
  interface Window {
    pdfjsLib?: PdfJsLib;
  }
}

const PDFJS_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";
const WORKER_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

async function loadPdfJs() {
  if (window.pdfjsLib) {
    return window.pdfjsLib;
  }

  // Load PDF.js dynamically from the CDN and cache the initialized library.
  const mod = (await import(
    /* webpackIgnore: true */ PDFJS_CDN as string
  )) as PdfJsLib & { default?: PdfJsLib };
  const lib = mod.default ?? mod;

  lib.GlobalWorkerOptions.workerSrc = WORKER_CDN;
  window.pdfjsLib = lib;

  return window.pdfjsLib;
}

/**
 * Displays a fullscreen overlay rendering the PDF directly via PDF.js —
 * no browser toolbar, no sidebar, 2-page spread by default.
 */
export const ProjectDocumentOverlay = ({
  isOpen,
  onClose,
  src,
  title,
}: ProjectDocumentOverlayProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [pdfDoc, setPdfDoc] = useState<PdfDoc | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Two-page spread: render currentPage and currentPage+1 side by side
  const leftCanvas = useRef<HTMLCanvasElement>(null);
  const rightCanvas = useRef<HTMLCanvasElement>(null);

  // ── Load PDF.js + document ──────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError(null);
    setPdfDoc(null);

    loadPdfJs()
      .then((lib) => lib!.getDocument(src).promise)
      .then((doc) => {
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setCurrentPage(1);
      })
      .catch(() => setError("Failed to load document."))
      .finally(() => setLoading(false));
  }, [isOpen, src]);

  // ── Render two pages onto canvases ──────────────────────────
  const renderPages = useCallback(async () => {
    if (!pdfDoc) return;

    const renderOne = async (
      pageNum: number,
      canvas: HTMLCanvasElement | null,
    ) => {
      if (!canvas || pageNum < 1 || pageNum > totalPages) {
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = 0;
            canvas.height = 0;
          }
        }
        return;
      }
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;
    };

    await Promise.all([
      renderOne(currentPage, leftCanvas.current),
      renderOne(currentPage + 1, rightCanvas.current),
    ]);
  }, [pdfDoc, currentPage, scale, totalPages]);

  useEffect(() => {
    renderPages();
  }, [renderPages]);

  // ── Scroll to top on page change ────────────────────────────
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // ── Scroll + keyboard ───────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrentPage((p) => Math.min(p + 2, totalPages));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentPage((p) => Math.max(p - 2, 1));
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (
        e.shiftKey
          ? document.activeElement === first
          : document.activeElement === last
      ) {
        e.preventDefault();
        (e.shiftKey ? last : first)?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, totalPages]);

  // ── Reset on close ──────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) {
      setPdfDoc(null);
      setCurrentPage(1);
    }
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage + 1 < totalPages;
  const showRightPage = currentPage + 1 <= totalPages;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center sm:justify-center sm:p-4 md:p-6 lg:p-8">
      {/* Backdrop */}
      <button
        aria-label="Close document preview"
        className="absolute inset-0 bg-background/85 backdrop-blur-xl"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        aria-label={`${title} fullscreen preview`}
        aria-modal="true"
        role="dialog"
        className="relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-background shadow-2xl sm:h-[calc(100dvh-2rem)] sm:max-w-5xl sm:rounded-xl sm:border sm:border-border/60 md:max-w-6xl lg:max-w-7xl"
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/60 bg-background px-4 py-3 sm:px-5">
          {/* Mobile drag handle */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-muted-foreground/25 sm:hidden"
          />

          <div className="min-w-0 pt-1 sm:pt-0">
            <p className="truncate text-sm font-semibold sm:text-base">
              {title}
            </p>
            {totalPages > 0 && (
              <p className="text-xs text-muted-foreground">
                Pages {currentPage}
                {showRightPage ? `–${currentPage + 1}` : ""} of {totalPages}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {/* Zoom out */}
            <Button
              aria-label="Zoom out"
              className="size-8"
              disabled={scale <= 0.6}
              onClick={() => setScale((s) => Math.max(s - 0.2, 0.6))}
              size="icon"
              type="button"
              variant="outline"
            >
              <ZoomOut className="size-4" />
            </Button>

            {/* Zoom in */}
            <Button
              aria-label="Zoom in"
              className="size-8"
              disabled={scale >= 2.6}
              onClick={() => setScale((s) => Math.min(s + 0.2, 2.6))}
              size="icon"
              type="button"
              variant="outline"
            >
              <ZoomIn className="size-4" />
            </Button>

            {/* Open in new tab */}
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

            {/* Close */}
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

        {/* ── Canvas area ─────────────────────────────────────── */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-auto bg-muted/30 p-3 sm:p-5"
        >
          {loading && (
            <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
              Loading document…
            </div>
          )}

          {error && (
            <div className="flex h-full items-center justify-center text-sm text-destructive">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="flex min-h-full items-start justify-center gap-3">
              {/* Left page */}
              <canvas
                ref={leftCanvas}
                className="max-w-full rounded-md border border-border/50 bg-white shadow-md"
                style={{ display: "block" }}
              />
              {/* Right page — only shown when a second page exists */}
              <canvas
                ref={rightCanvas}
                className="max-w-full rounded-md border border-border/50 bg-white shadow-md"
                style={{ display: showRightPage ? "block" : "none" }}
              />
            </div>
          )}
        </div>

        {/* ── Navigation footer ───────────────────────────────── */}
        <div className="flex shrink-0 items-center justify-between border-t border-border/60 bg-background px-4 py-2.5 sm:px-5">
          <Button
            aria-label="Previous spread"
            className="h-8 gap-1.5 px-3 text-xs"
            disabled={!canGoPrev}
            onClick={() => setCurrentPage((p) => Math.max(p - 2, 1))}
            type="button"
            variant="outline"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <span className="text-xs tabular-nums text-muted-foreground">
            {totalPages > 0
              ? `${Math.ceil(currentPage / 2)} / ${Math.ceil(totalPages / 2)} spreads`
              : "—"}
          </span>

          <Button
            aria-label="Next spread"
            className="h-8 gap-1.5 px-3 text-xs"
            disabled={!canGoNext}
            onClick={() => setCurrentPage((p) => Math.min(p + 2, totalPages))}
            type="button"
            variant="outline"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
