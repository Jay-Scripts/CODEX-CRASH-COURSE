"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/types/portfolio.types";
import { Button } from "@/components/ui/button";

type ProjectPreviewGalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Pick<Project, "previewImages" | "title">;
};

/**
 * Displays a fullscreen image gallery for project preview screenshots.
 */
export const ProjectPreviewGalleryModal = ({
  isOpen,
  onClose,
  project,
}: ProjectPreviewGalleryModalProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const previewImages = project.previewImages ?? [];
  const activePreview = previewImages[activeIndex];

  const showPrevious = useCallback(() => {
    if (!previewImages.length) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? previewImages.length - 1 : currentIndex - 1,
    );
  }, [previewImages.length]);

  const showNext = useCallback(() => {
    if (!previewImages.length) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex === previewImages.length - 1 ? 0 : currentIndex + 1,
    );
  }, [previewImages.length]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, showNext, showPrevious]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveIndex(0);
  }, [isOpen, previewImages.length]);

  useEffect(() => {
    if (activeIndex < previewImages.length) {
      return;
    }

    setActiveIndex(0);
  }, [activeIndex, previewImages.length]);

  if (!previewImages.length || typeof document === "undefined") {
    return null;
  }

  const currentPreview = activePreview ?? previewImages[0];

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[80] flex items-end sm:items-center sm:justify-center sm:p-4 md:p-6"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.button
            animate={{ opacity: 1 }}
            aria-label="Close project preview gallery"
            className="absolute inset-0 cursor-pointer bg-background/85 backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            tabIndex={-1}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            type="button"
          />

          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-label={`${project.title} preview gallery`}
            aria-modal="true"
            className="relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border/60 bg-background shadow-2xl sm:h-[calc(100dvh-2rem)] sm:max-w-6xl sm:rounded-2xl"
            exit={{ opacity: 0, scale: 0.98, y: 24 }}
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            role="dialog"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                  {project.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{currentPreview.label}</span>
                  <span className="hidden sm:inline">/</span>
                  <span>{activeIndex + 1} of {previewImages.length}</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <Button
                  asChild
                  className="hidden h-8 gap-1.5 px-3 text-xs sm:flex"
                  variant="outline"
                >
                  <a
                    href={currentPreview.src}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Expand className="size-3.5" />
                    Open image
                  </a>
                </Button>

                <Button
                  asChild
                  aria-label="Open image in new tab"
                  className="size-8 sm:hidden"
                  size="icon"
                  variant="outline"
                >
                  <a
                    href={currentPreview.src}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Expand className="size-4" />
                  </a>
                </Button>

                <Button
                  aria-label="Close preview"
                  className="size-8 cursor-pointer"
                  onClick={onClose}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-muted/30 p-3 sm:p-5">
              <div className="mx-auto flex max-w-5xl flex-col gap-4">
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background shadow-xl">
                  <Button
                    aria-label="Previous preview image"
                    className="absolute left-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/90 shadow-lg backdrop-blur sm:left-5 md:left-6"
                    disabled={previewImages.length <= 1}
                    onClick={showPrevious}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>

                  <Button
                    aria-label="Next preview image"
                    className="absolute right-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/90 shadow-lg backdrop-blur sm:right-5 md:right-6"
                    disabled={previewImages.length <= 1}
                    onClick={showNext}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <ChevronRight className="size-4" />
                  </Button>

                  <div className="relative h-[min(70dvh,42rem)] w-full">
                    <Image
                      key={currentPreview.src}
                      alt={currentPreview.alt}
                      className="object-contain p-3 sm:p-4"
                      fill
                      priority={activeIndex === 0}
                      sizes="(min-width: 1280px) 64rem, (min-width: 1024px) 56rem, 100vw"
                      src={currentPreview.src}
                      unoptimized
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background p-4 shadow-sm sm:p-5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {currentPreview.label}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Project screenshot preview for {project.title}.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-center border-t border-border/60 bg-background px-4 py-2.5 sm:px-5">
              <span className="text-xs tabular-nums text-muted-foreground">
                {activeIndex + 1} / {previewImages.length} images
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
