"use client";

import {
  ChevronLeft,
  ChevronRight,
  FileBadge2,
  FileSpreadsheet,
  FileText,
  ImageIcon,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type {
  ExperienceProofItem,
  ExperienceSpreadsheetSheet,
} from "@/types/portfolio.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ExperienceProofGalleryProps = {
  cardAlignment?: "left" | "right";
  mode: "desktop" | "mobile";
  proofItems: ExperienceProofItem[];
  proofSectionId: string;
  desktopProofColumns?: 2 | 4;
  previewVisible?: boolean;
};

const proofTypeLabels = {
  certificate: "Certificate",
  document: "Document",
  photo: "Photo",
  video: "Video",
} as const;

const proofTypeIcons = {
  certificate: FileBadge2,
  document: FileText,
  photo: ImageIcon,
  video: Video,
} as const;

const documentProofIcons = {
  csv: FileSpreadsheet,
  default: FileText,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
} as const;

const getDocumentExtension = (src: string) =>
  src.split(".").pop()?.split("?")[0]?.toLowerCase() ?? "";

const getDocumentProofIcon = (src: string) =>
  documentProofIcons[
    getDocumentExtension(src) as keyof typeof documentProofIcons
  ] ?? documentProofIcons.default;

const isImageProof = (src: string) =>
  [".png", ".jpg", ".jpeg", ".webp", ".svg"].some((extension) =>
    src.toLowerCase().endsWith(extension),
  );

const isVideoProof = (src: string) =>
  [".mp4", ".webm", ".ogg"].some((extension) =>
    src.toLowerCase().endsWith(extension),
  );

const renderDocumentTile = (
  DocumentIcon: ReturnType<typeof getDocumentProofIcon>,
  extension: string,
  compact = false,
) => (
  <div
    className={cn(
      "flex h-full w-full flex-col items-center justify-center gap-2 bg-muted/30 p-3 text-center",
      compact && "gap-1.5 p-2.5",
    )}
  >
    <DocumentIcon
      className={cn("text-primary", compact ? "size-7" : "size-10")}
    />
    <span
      className={cn(
        "font-medium uppercase tracking-wide text-muted-foreground",
        compact ? "text-[10px]" : "text-xs",
      )}
    >
      {extension || "Document"}
    </span>
  </div>
);

const renderProofSurface = (
  item: ExperienceProofItem,
  options?: {
    compact?: boolean;
    desktopHoverVideo?: boolean;
    playVideo?: boolean;
    sizes?: string;
  },
) => {
  const compact = options?.compact ?? false;
  const extension = getDocumentExtension(item.src);
  const DocumentIcon = getDocumentProofIcon(item.src);
  const shouldRenderImage = isImageProof(item.src);
  const shouldRenderVideo = isVideoProof(item.src);

  if (shouldRenderVideo) {
    return (
      <div className="relative h-full w-full">
        <video
          autoPlay={options?.playVideo}
          className="pointer-events-none h-full w-full object-cover"
          loop={options?.playVideo}
          muted
          playsInline
          preload={
            options?.desktopHoverVideo && !options.playVideo
              ? "none"
              : "metadata"
          }
          src={item.src}
        />
      </div>
    );
  }

  if (shouldRenderImage) {
    return (
      <Image
        alt={item.alt}
        className="pointer-events-none object-cover"
        fill
        sizes={options?.sizes ?? "8rem"}
        src={item.src}
      />
    );
  }

  return renderDocumentTile(DocumentIcon, extension, compact);
};

const SpreadsheetPreview = ({
  sheets,
}: {
  sheets: ExperienceSpreadsheetSheet[];
}) => {
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const activeSheet = sheets[activeSheetIndex] ?? sheets[0];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-4 flex flex-wrap gap-2">
        {sheets.map((sheet, index) => (
          <button
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              index === activeSheetIndex
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/60 bg-background text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground",
            )}
            key={sheet.name}
            onClick={() => setActiveSheetIndex(index)}
            type="button"
          >
            {sheet.name}
          </button>
        ))}
      </div>
      <div className="glass-inset rounded-2xl">
        <div className="border-b border-border/60 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">
            {activeSheet.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Spreadsheet preview excerpt from the uploaded QA tracker.
          </p>
        </div>
        <div className="max-h-[60dvh] overflow-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="sticky top-0 bg-muted/70 backdrop-blur">
              <tr>
                {activeSheet.columns.map((column) => (
                  <th
                    className="border-b border-border/60 px-4 py-3 align-top text-xs font-semibold uppercase tracking-wide text-foreground"
                    key={column}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeSheet.rows.map((row, rowIndex) => (
                <tr
                  className="border-b border-border/40 last:border-b-0"
                  key={`${activeSheet.name}-${rowIndex}`}
                >
                  {activeSheet.columns.map((_, columnIndex) => (
                    <td
                      className="min-w-40 px-4 py-3 align-top text-sm leading-6 text-muted-foreground"
                      key={`${activeSheet.name}-${rowIndex}-${columnIndex}`}
                    >
                      {row[columnIndex] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/**
 * Displays hover-preview proof cards and opens an in-app modal for full proof viewing.
 */
export const ExperienceProofGallery = ({
  cardAlignment = "left",
  mode,
  proofItems,
  proofSectionId,
  desktopProofColumns = 2,
  previewVisible = false,
}: ExperienceProofGalleryProps) => {
  const [activeProofIndex, setActiveProofIndex] = useState<number | null>(null);
  const [closingProof, setClosingProof] = useState<ExperienceProofItem | null>(
    null,
  );
  const [hoveredProofIndex, setHoveredProofIndex] = useState<number | null>(
    null,
  );

  const activeProof =
    activeProofIndex !== null ? proofItems[activeProofIndex] : null;
  const displayedProof = activeProof ?? closingProof;

  const leftDesktopProofItems =
    cardAlignment === "right"
      ? proofItems.map((item, index) => ({ index, item }))
      : [];
  const rightDesktopProofItems =
    cardAlignment === "left"
      ? proofItems.map((item, index) => ({ index, item }))
      : [];

  const desktopProofDelayClasses = [
    "delay-0",
    "delay-75",
    "delay-100",
    "delay-150",
    "delay-200",
    "delay-300",
    "delay-[350ms]",
    "delay-[400ms]",
  ] as const;

  const mediumProofContainerClassName =
    cardAlignment === "left"
      ? "left-[calc(100%+2.75rem)]"
      : "right-[calc(100%+2.75rem)]";
  const mediumProofMotionClassName =
    cardAlignment === "left" ? "translate-x-6" : "-translate-x-6";
  const mediumProofAnimationClassName =
    cardAlignment === "left"
      ? "md:group-hover/experience:animate-[experience-proof-slide-in-right_700ms_ease-in-out_both]"
      : "md:group-hover/experience:animate-[experience-proof-slide-in-left_700ms_ease-in-out_both]";
  const wideProofGridClassName =
    desktopProofColumns === 4
      ? "w-[35rem] grid-cols-4"
      : "w-[17rem] grid-cols-2";
  const wideProofLeftOffsetClassName =
    desktopProofColumns === 4 ? "left-[-36rem]" : "left-[-18rem]";
  const wideProofRightOffsetClassName =
    desktopProofColumns === 4 ? "right-[-36rem]" : "right-[-18rem]";

  const showPreviousProof = useCallback(() => {
    if (activeProofIndex === null || !proofItems.length) {
      return;
    }

    setClosingProof(null);
    setActiveProofIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0;
      }

      return currentIndex === 0 ? proofItems.length - 1 : currentIndex - 1;
    });
  }, [activeProofIndex, proofItems.length]);

  const showNextProof = useCallback(() => {
    if (activeProofIndex === null || !proofItems.length) {
      return;
    }

    setClosingProof(null);
    setActiveProofIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0;
      }

      return currentIndex === proofItems.length - 1 ? 0 : currentIndex + 1;
    });
  }, [activeProofIndex, proofItems.length]);

  useEffect(() => {
    if (!activeProof) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProofIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        showPreviousProof();
      }

      if (event.key === "ArrowRight") {
        showNextProof();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProof, showNextProof, showPreviousProof]);

  const openProofPreview = (index: number) => {
    setClosingProof(null);
    setActiveProofIndex(index);
  };

  const closeProofPreview = () => {
    setClosingProof(activeProof);
    setActiveProofIndex(null);
  };

  return (
    <>
      {mode === "mobile" ? (
        <section
          aria-labelledby={`${proofSectionId}-proof-mobile`}
          className="mt-5 border-t border-border/50 pt-4 md:hidden"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h4
                className="text-sm font-semibold text-foreground"
                id={`${proofSectionId}-proof-mobile`}
              >
                Supporting materials
              </h4>
              <p className="text-xs text-muted-foreground">
                Tap a proof item to preview it without leaving the portfolio.
              </p>
            </div>
            <Badge
              className="border-primary/20 bg-primary/10 text-primary"
              variant="outline"
            >
              {proofItems.length} items
            </Badge>
          </div>
          <div className="grid gap-3">
            {proofItems.map((item, index) => {
              const ProofIcon = proofTypeIcons[item.type];

              return (
                <button
                  className="glass-inset flex cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition-colors hover:border-primary/20"
                  key={item.label}
                  onClick={() => openProofPreview(index)}
                  type="button"
                >
                  <div className="relative aspect-[4/3] w-24 overflow-hidden rounded-lg border border-border/50 bg-background">
                    {renderProofSurface(item, { compact: true, sizes: "6rem" })}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ProofIcon className="size-3.5 text-primary" />
                      {proofTypeLabels[item.type]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {mode === "desktop" ? (
        <div
          aria-labelledby={`${proofSectionId}-proof-desktop`}
          className="pointer-events-none absolute -inset-6 z-20 hidden md:block"
        >
          <div className="sr-only" id={`${proofSectionId}-proof-desktop`}>
            Supporting materials
          </div>
          <div
            className={cn(
              "absolute top-1/2 hidden w-60 -translate-y-1/2 md:block xl:hidden",
              mediumProofContainerClassName,
            )}
          >
            <div className="grid grid-cols-2 gap-3">
              {proofItems.map((item, originalIndex) => {
                const ProofIcon = proofTypeIcons[item.type];
                const delayClassName =
                  desktopProofDelayClasses[originalIndex] ??
                  desktopProofDelayClasses.at(-1);

                return (
                  <button
                    className={cn(
                      "glass-panel pointer-events-auto w-full cursor-pointer rounded-2xl p-2 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      previewVisible
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90",
                      mediumProofMotionClassName,
                      delayClassName,
                      previewVisible && mediumProofAnimationClassName,
                      previewVisible && "translate-x-0",
                    )}
                    key={item.label}
                    onClick={() => openProofPreview(originalIndex)}
                    onFocus={() => setHoveredProofIndex(originalIndex)}
                    onMouseEnter={() => setHoveredProofIndex(originalIndex)}
                    onMouseLeave={() => setHoveredProofIndex(null)}
                    onBlur={() => setHoveredProofIndex(null)}
                    type="button"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-background">
                      {renderProofSurface(item, {
                        compact: true,
                        desktopHoverVideo: true,
                        playVideo: hoveredProofIndex === originalIndex,
                        sizes: "7rem",
                      })}
                    </div>
                    <div className="mt-2 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <ProofIcon className="size-3 text-primary" />
                          {proofTypeLabels[item.type]}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div
            className={cn(
              "absolute top-1/2 hidden -translate-y-1/2 gap-3 xl:grid",
              wideProofLeftOffsetClassName,
              wideProofGridClassName,
            )}
          >
            {leftDesktopProofItems.map(
              ({ item, index: originalIndex }, index) => {
                const ProofIcon = proofTypeIcons[item.type];
                const delayClassName =
                  desktopProofDelayClasses[index] ??
                  desktopProofDelayClasses.at(-1);

                return (
                  <button
                    className={cn(
                      "glass-panel pointer-events-auto w-32 cursor-pointer rounded-2xl p-2 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      previewVisible
                        ? "opacity-100 scale-100 translate-x-0"
                        : "opacity-0 scale-90 -translate-x-8",
                      delayClassName,
                      previewVisible &&
                        "animate-[experience-proof-slide-in-left_700ms_ease-in-out_both]",
                    )}
                    key={item.label}
                    onClick={() => openProofPreview(originalIndex)}
                    onFocus={() => setHoveredProofIndex(originalIndex)}
                    onMouseEnter={() => setHoveredProofIndex(originalIndex)}
                    onMouseLeave={() => setHoveredProofIndex(null)}
                    onBlur={() => setHoveredProofIndex(null)}
                    type="button"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-background">
                      {renderProofSurface(item, {
                        compact: true,
                        desktopHoverVideo: true,
                        playVideo: hoveredProofIndex === originalIndex,
                        sizes: "8rem",
                      })}
                    </div>
                    <div className="mt-2 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <ProofIcon className="size-3 text-primary" />
                          {proofTypeLabels[item.type]}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              },
            )}
          </div>
          <div
            className={cn(
              "absolute top-1/2 hidden -translate-y-1/2 gap-3 xl:grid",
              wideProofRightOffsetClassName,
              wideProofGridClassName,
            )}
          >
            {rightDesktopProofItems.map(
              ({ item, index: originalIndex }, index) => {
                const ProofIcon = proofTypeIcons[item.type];
                const delayClassName =
                  desktopProofDelayClasses[index] ??
                  desktopProofDelayClasses.at(-1);

                return (
                  <button
                    className={cn(
                      "glass-panel pointer-events-auto w-32 cursor-pointer rounded-2xl p-2 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      previewVisible
                        ? "opacity-100 scale-100 translate-x-0"
                        : "opacity-0 scale-90 translate-x-8",
                      delayClassName,
                      previewVisible &&
                        "animate-[experience-proof-slide-in-right_700ms_ease-in-out_both]",
                    )}
                    key={item.label}
                    onClick={() => openProofPreview(originalIndex)}
                    onFocus={() => setHoveredProofIndex(originalIndex)}
                    onMouseEnter={() => setHoveredProofIndex(originalIndex)}
                    onMouseLeave={() => setHoveredProofIndex(null)}
                    onBlur={() => setHoveredProofIndex(null)}
                    type="button"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-background">
                      {renderProofSurface(item, {
                        compact: true,
                        desktopHoverVideo: true,
                        playVideo: hoveredProofIndex === originalIndex,
                        sizes: "8rem",
                      })}
                    </div>
                    <div className="mt-2 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <ProofIcon className="size-3 text-primary" />
                          {proofTypeLabels[item.type]}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              },
            )}
          </div>
        </div>
      ) : null}

      {displayedProof && typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence onExitComplete={() => setClosingProof(null)}>
              {activeProof ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 z-[80] flex items-end sm:items-center sm:justify-center sm:p-4 md:p-6"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <motion.button
                    animate={{ opacity: 1 }}
                    aria-label="Close proof preview"
                    className="absolute inset-0 cursor-pointer bg-background/85 backdrop-blur-xl"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    onClick={closeProofPreview}
                    tabIndex={-1}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    type="button"
                  />

                  <motion.div
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    aria-label={`${displayedProof.label} preview`}
                    aria-modal="true"
                    className="relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-border/60 bg-background shadow-2xl sm:h-[calc(100dvh-2rem)] sm:max-w-5xl sm:rounded-2xl"
                    exit={{ opacity: 0, scale: 0.98, y: 24 }}
                    initial={{ opacity: 0, scale: 0.98, y: 24 }}
                    role="dialog"
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                          {displayedProof.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {proofTypeLabels[displayedProof.type]}
                        </p>
                      </div>
                      <Button
                        aria-label="Close preview"
                        className="size-8 cursor-pointer"
                        onClick={closeProofPreview}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>

                    <div className="relative min-h-0 flex-1 overflow-auto bg-muted/30 p-3 sm:p-5">
                      <Button
                        aria-label="Previous proof"
                        className="absolute left-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/90 shadow-lg backdrop-blur sm:left-5"
                        disabled={proofItems.length <= 1}
                        onClick={showPreviousProof}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <ChevronLeft className="size-4" />
                      </Button>

                      <Button
                        aria-label="Next proof"
                        className="absolute right-3 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/90 shadow-lg backdrop-blur sm:right-5"
                        disabled={proofItems.length <= 1}
                        onClick={showNextProof}
                        size="icon"
                        type="button"
                        variant="outline"
                      >
                        <ChevronRight className="size-4" />
                      </Button>

                      {displayedProof.spreadsheetPreview ? (
                        <SpreadsheetPreview
                          sheets={displayedProof.spreadsheetPreview.sheets}
                        />
                      ) : isVideoProof(displayedProof.src) ? (
                        <div className="flex h-full min-h-[24rem] items-center justify-center">
                          <video
                            autoPlay
                            className="max-h-full w-full rounded-2xl border border-border/60 bg-black object-contain shadow-xl"
                            controls
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            src={displayedProof.src}
                          />
                        </div>
                      ) : isImageProof(displayedProof.src) ? (
                        <div className="flex h-full min-h-[24rem] items-center justify-center">
                          <div className="relative h-full min-h-[24rem] w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-xl">
                            <Image
                              alt={displayedProof.alt}
                              className="object-contain"
                              fill
                              sizes="100vw"
                              src={displayedProof.src}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full min-h-[24rem] items-center justify-center">
                          <div className="flex max-w-md flex-col items-center gap-3 rounded-2xl border border-border/60 bg-background p-8 text-center shadow-xl">
                            {renderDocumentTile(
                              getDocumentProofIcon(displayedProof.src),
                              getDocumentExtension(displayedProof.src),
                            )}
                            <p className="text-sm font-medium text-foreground">
                              Preview not available for this document type.
                            </p>
                            <p className="text-sm text-muted-foreground">
                              This proof item is stored as a file rather than
                              image, video, or spreadsheet excerpt.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
};
