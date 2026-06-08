"use client";

import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { FlowchartPreview } from "@/types/portfolio.types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectFlowchartOverlayProps = {
  activePreview: FlowchartPreview;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  total: number;
};

const MIN_ZOOM_LEVEL = 1;
const MAX_ZOOM_LEVEL = 2.5;
const ZOOM_STEP = 0.25;

/**
 * Displays a fullscreen overlay for inspecting a project flowchart without affecting the card layout underneath.
 */
export const ProjectFlowchartOverlay = ({
  activePreview,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  total,
}: ProjectFlowchartOverlayProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const previousIndexRef = useRef(currentIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [baseImageSize, setBaseImageSize] = useState({
    height: 0,
    width: 0,
  });
  const [displayedPreview, setDisplayedPreview] = useState(activePreview);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "previous">("next");

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    // ==========================================================================
    // Handle Overlay Close Behavior
    //
    // Lock background scrolling and allow Escape to dismiss the fullscreen
    // flowchart while the overlay is active.
    // ==========================================================================
    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setZoomLevel(1);
      return;
    }

    setZoomLevel(1);
  }, [activePreview.id, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setDisplayedPreview(activePreview);
      setIsPreviewVisible(true);
      previousIndexRef.current = currentIndex;

      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }

      return;
    }

    if (activePreview.id === displayedPreview.id) {
      previousIndexRef.current = currentIndex;
      return;
    }

    setTransitionDirection(
      currentIndex >= previousIndexRef.current ? "next" : "previous",
    );
    setIsPreviewVisible(false);

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      setDisplayedPreview(activePreview);
      setIsPreviewVisible(true);
      transitionTimeoutRef.current = null;
    }, 140);

    previousIndexRef.current = currentIndex;
  }, [activePreview, currentIndex, displayedPreview.id, isOpen]);

  useEffect(
    () => () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!isOpen || !imageRef.current) {
      return undefined;
    }

    const imageElement = imageRef.current;
    const updateBaseImageSize = () => {
      if (!imageElement.clientWidth || !imageElement.clientHeight) {
        return;
      }

      setBaseImageSize({
        height: imageElement.clientHeight / zoomLevel,
        width: imageElement.clientWidth / zoomLevel,
      });
    };

    updateBaseImageSize();

    const observer = new ResizeObserver(updateBaseImageSize);
    observer.observe(imageElement);

    return () => observer.disconnect();
  }, [isOpen, zoomLevel]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < total - 1;
  const canZoomOut = zoomLevel > MIN_ZOOM_LEVEL;
  const canZoomIn = zoomLevel < MAX_ZOOM_LEVEL;
  const scaledImageStyle =
    zoomLevel > 1 && baseImageSize.width > 0 && baseImageSize.height > 0
      ? {
          height: `${baseImageSize.height * zoomLevel}px`,
          maxHeight: "none",
          maxWidth: "none",
          width: `${baseImageSize.width * zoomLevel}px`,
        }
      : undefined;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button
        aria-label="Close fullscreen flowchart preview"
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex h-full w-full items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
        <div
          aria-label={`${activePreview.label} flowchart fullscreen preview`}
          aria-modal="true"
          className="relative flex h-dvh w-screen flex-col overflow-hidden bg-background/95 shadow-2xl sm:h-[calc(100dvh-2rem)] sm:w-full sm:max-w-5xl sm:rounded-lg sm:border sm:border-border/70 md:max-w-6xl lg:max-w-7xl"
          role="dialog"
        >
          <div className="sticky top-0 z-10 flex flex-col gap-3 border-b border-border/70 bg-background/95 px-3 py-3 backdrop-blur sm:px-5 md:flex-row md:items-start md:justify-between md:px-6">
            <div>
              <p className="text-base font-semibold sm:text-lg">
                {activePreview.label} Flowchart
              </p>
              <p className="text-sm text-muted-foreground">
                Fullscreen system diagram preview
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <div className="rounded-md border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                {currentIndex + 1} / {total}
              </div>
              <Button
                aria-label="Zoom out"
                className="size-8"
                disabled={!canZoomOut}
                onClick={() =>
                  setZoomLevel((currentZoom) =>
                    Math.max(currentZoom - ZOOM_STEP, MIN_ZOOM_LEVEL),
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
                disabled={!canZoomIn}
                onClick={() =>
                  setZoomLevel((currentZoom) =>
                    Math.min(currentZoom + ZOOM_STEP, MAX_ZOOM_LEVEL),
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
                <a
                  href={displayedPreview.src}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Expand className="size-3.5" />
                  Open diagram
                </a>
              </Button>
              <Button
                asChild
                aria-label="Open diagram in new tab"
                className="size-8 sm:hidden"
                size="icon"
                variant="outline"
              >
                <a
                  href={displayedPreview.src}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Expand className="size-4" />
                </a>
              </Button>
              <Button
                aria-label="Close fullscreen preview"
                className="sm:self-start"
                onClick={onClose}
                size="icon"
                type="button"
                variant="outline"
              >
                <X />
              </Button>
            </div>
          </div>

          <div
            className="relative min-h-0 flex-1 overflow-auto overscroll-contain bg-muted/30 p-3 sm:p-5 md:p-6"
            style={{ touchAction: "pan-x pan-y pinch-zoom" }}
          >
            <Button
              aria-label="Previous diagram"
              className="absolute left-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/90 shadow-lg backdrop-blur sm:left-5 md:left-6"
              disabled={!canGoPrev}
              onClick={onPrevious}
              size="icon"
              type="button"
              variant="outline"
            >
              <ChevronLeft className="size-4" />
            </Button>

            <Button
              aria-label="Next diagram"
              className="absolute right-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/90 shadow-lg backdrop-blur sm:right-5 md:right-6"
              disabled={!canGoNext}
              onClick={onNext}
              size="icon"
              type="button"
              variant="outline"
            >
              <ChevronRight className="size-4" />
            </Button>

            <div className="flex min-h-full min-w-full items-center justify-center">
              <figure className="inline-flex max-w-full rounded-lg border border-border/70 bg-background/95 p-3 shadow-sm sm:p-4">
                {/* SVG assets keep their native scaling and remain easier to inspect in a scrollable overlay with a plain image element. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imageRef}
                  alt={displayedPreview.alt}
                  className={cn(
                    "mx-auto h-auto max-h-[calc(100dvh-12rem)] w-auto max-w-full rounded-md object-contain transition-all duration-300 ease-out sm:max-h-[calc(100dvh-13rem)] lg:max-h-[calc(100dvh-11rem)]",
                    isPreviewVisible
                      ? "translate-x-0 scale-100 opacity-100"
                      : transitionDirection === "next"
                        ? "-translate-x-6 scale-[0.985] opacity-0"
                        : "translate-x-6 scale-[0.985] opacity-0",
                  )}
                  draggable="false"
                  src={displayedPreview.src}
                  style={scaledImageStyle}
                />
              </figure>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center border-t border-border/60 bg-background px-4 py-2.5 sm:px-5">
            <span className="text-xs tabular-nums text-muted-foreground">
              {currentIndex + 1} / {total} diagrams
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
