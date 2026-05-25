"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import type { FlowchartPreview } from "@/types/portfolio.types";

type ProjectFlowchartOverlayProps = {
  activePreview: FlowchartPreview;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  total: number;
};

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

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button
        aria-label="Close fullscreen flowchart preview"
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div
          aria-label={`${activePreview.label} flowchart fullscreen preview`}
          aria-modal="true"
          className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-background/95 shadow-[0_32px_120px_-48px_rgba(15,23,42,0.65)]"
          role="dialog"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-6">
            <div>
              <p className="text-base font-semibold sm:text-lg">
                {activePreview.label} Flowchart
              </p>
              <p className="text-sm text-muted-foreground">
                Fullscreen system diagram preview
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                {currentIndex + 1} / {total}
              </div>
              <Button
                onClick={onPrevious}
                size="icon"
                type="button"
                variant="outline"
              >
                <ChevronLeft />
              </Button>
              <Button onClick={onNext} size="icon" type="button" variant="outline">
                <ChevronRight />
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
            className="min-h-0 flex-1 overflow-auto bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,_var(--primary)_12%,_transparent),_transparent_60%)] p-4 sm:p-6"
            style={{ touchAction: "pan-x pan-y pinch-zoom" }}
          >
            <div className="flex min-h-full min-w-full items-center justify-center">
              <div className="inline-flex max-w-full rounded-[1.5rem] border border-border/70 bg-background/95 p-3 shadow-sm sm:p-4">
                {/* SVG assets keep their native scaling and remain easier to inspect in a scrollable overlay with a plain image element. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={activePreview.alt}
                  className="mx-auto h-auto max-h-[calc(100vh-11rem)] w-auto max-w-full rounded-xl object-contain"
                  draggable="false"
                  src={activePreview.src}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
