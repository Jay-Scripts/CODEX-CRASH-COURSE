"use client";

import { Play, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/types/portfolio.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProjectSystemPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: Pick<
    Project,
    "systemPreviewAlt" | "systemPreviewNote" | "systemPreviewSrc" | "title"
  >;
};

const isVideoPreview = (src: string) =>
  [".mp4", ".webm", ".ogg"].some((extension) =>
    src.toLowerCase().includes(extension),
  );

/**
 * Displays an in-page preview modal for project system demos and placeholder walkthrough videos.
 */
export const ProjectSystemPreviewModal = ({
  isOpen,
  onClose,
  project,
}: ProjectSystemPreviewModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project.systemPreviewSrc || typeof document === "undefined") {
    return null;
  }

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
            aria-label="Close system preview"
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
            aria-label={`${project.title} system preview`}
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
                  <span>System preview</span>
                  <span className="hidden sm:inline">/</span>
                  <span>Video walkthrough</span>
                </div>
              </div>
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

            <div className="min-h-0 flex-1 overflow-auto bg-muted/30 p-3 sm:p-5">
              <div className="mx-auto flex max-w-5xl flex-col gap-4">
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-xl">
                  {isVideoPreview(project.systemPreviewSrc) ? (
                    <video
                      autoPlay
                      className="max-h-[72dvh] w-full bg-black object-contain"
                      controls
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      src={project.systemPreviewSrc}
                    />
                  ) : (
                    <Image
                      alt={project.systemPreviewAlt ?? `${project.title} system preview`}
                      className="h-auto w-full object-contain"
                      height={1200}
                      src={project.systemPreviewSrc}
                      width={1600}
                    />
                  )}
                </div>

                <div className="rounded-2xl border border-border/60 bg-background p-4 shadow-sm sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        System preview walkthrough
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {project.systemPreviewNote ??
                          "This preview is a walkthrough video for the project."}
                      </p>
                    </div>
                    <Badge
                      className="border-primary/20 bg-primary/10 text-primary"
                      variant="outline"
                    >
                      <Play className="size-3.5" />
                      Preview
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
