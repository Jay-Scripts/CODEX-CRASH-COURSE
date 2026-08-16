"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { Project, ProjectPreviewCategory } from "@/types/portfolio.types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectPreviewGalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Pick<Project, "previewCategories" | "previewImages" | "title">;
};

const formatPreviewCategoryLabel = (categoryId: string) =>
  categoryId
    .split("-")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");

/**
 * Displays a fullscreen image gallery for project preview screenshots.
 */
export const ProjectPreviewGalleryModal = ({
  isOpen,
  onClose,
  project,
}: ProjectPreviewGalleryModalProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState("");

  const previewImages = useMemo(
    () => project.previewImages ?? [],
    [project.previewImages],
  );
  const previewCategories = useMemo<ProjectPreviewCategory[]>(() => {
    if (project.previewCategories?.length) {
      return project.previewCategories;
    }

    return [...new Set(previewImages.map((image) => image.category))].map(
      (category) => ({
        id: category,
        label: formatPreviewCategoryLabel(category),
      }),
    );
  }, [previewImages, project.previewCategories]);

  const selectedCategoryId = previewCategories.some(
    (category) => category.id === activeCategoryId,
  )
    ? activeCategoryId
    : previewCategories[0]?.id || "";
  const activeCategoryImages = useMemo(
    () =>
      previewImages.filter(
        (image) => image.category === selectedCategoryId,
      ),
    [previewImages, selectedCategoryId],
  );
  const activePreview = activeCategoryImages[activeIndex];

  const showPrevious = useCallback(() => {
    if (!activeCategoryImages.length) {
      return;
    }

    setActiveIndex((currentIndex) => {
      const safeIndex = currentIndex < activeCategoryImages.length
        ? currentIndex
        : 0;

      return safeIndex === 0
        ? activeCategoryImages.length - 1
        : safeIndex - 1;
    });
  }, [activeCategoryImages.length]);

  const showNext = useCallback(() => {
    if (!activeCategoryImages.length) {
      return;
    }

    setActiveIndex((currentIndex) => {
      const safeIndex = currentIndex < activeCategoryImages.length
        ? currentIndex
        : 0;

      return safeIndex === activeCategoryImages.length - 1
        ? 0
        : safeIndex + 1;
    });
  }, [activeCategoryImages.length]);

  const handleImageDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const dragThreshold = 60;
      const swipeVelocityThreshold = 500;

      if (
        Math.abs(info.offset.x) < dragThreshold &&
        Math.abs(info.velocity.x) < swipeVelocityThreshold
      ) {
        return;
      }

      if (info.offset.x < 0) {
        showNext();
        return;
      }

      showPrevious();
    },
    [showNext, showPrevious],
  );

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

  if (!previewImages.length || !previewCategories.length || typeof document === "undefined") {
    return null;
  }

  const currentPreview = activePreview ?? activeCategoryImages[0];

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
            <div className="flex items-start justify-end gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
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

            <div className="border-b border-border/60 bg-muted/20 px-4 py-3 sm:px-5">
              <div
                aria-label="Preview categories"
                className="flex gap-2 overflow-x-auto pb-0.5"
                role="tablist"
              >
                {previewCategories.map((category) => {
                  const isActive = selectedCategoryId === category.id;
                  const categoryCount = previewImages.filter(
                    (image) => image.category === category.id,
                  ).length;

                  return (
                    <button
                      key={category.id}
                      aria-selected={isActive}
                      className={cn(
                        "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                        isActive
                          ? "border-primary/30 bg-primary text-primary-foreground"
                          : "border-border/60 bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      onClick={() => {
                        setActiveCategoryId(category.id);
                        setActiveIndex(0);
                      }}
                      role="tab"
                      type="button"
                    >
                      {category.label}
                      <span className="ml-1.5 text-[10px] opacity-80">
                        {categoryCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-auto bg-muted/30 p-2 sm:p-4">
              <div className="mx-auto flex max-w-5xl flex-col gap-3">
                <Button
                  aria-label="Previous preview image"
                  className="absolute left-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/90 shadow-lg backdrop-blur sm:left-5 md:left-6"
                  disabled={activeCategoryImages.length <= 1}
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
                  disabled={activeCategoryImages.length <= 1}
                  onClick={showNext}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <ChevronRight className="size-4" />
                </Button>

                <motion.div
                  animate={{ x: 0, opacity: 1 }}
                  className="relative overflow-hidden rounded-2xl border border-border/60 bg-background shadow-xl"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.08}
                  onDragEnd={handleImageDragEnd}
                  role="group"
                  style={{ touchAction: "pan-y" }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <div className="relative h-[min(76dvh,48rem)] w-full cursor-grab select-none active:cursor-grabbing">
                    <Image
                      key={currentPreview.src}
                      alt={currentPreview.alt}
                      className="object-contain p-2 sm:p-3"
                      fill
                      draggable={false}
                      priority={activeIndex === 0 && selectedCategoryId === previewCategories[0]?.id}
                      sizes="(min-width: 1280px) 64rem, (min-width: 1024px) 56rem, 100vw"
                      src={currentPreview.src}
                    />
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
