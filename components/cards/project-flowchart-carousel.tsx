"use client";

import { ChevronLeft, ChevronRight, Expand, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FlowchartPreview } from "@/types/portfolio.types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectFlowchartOverlay } from "./project-flowchart-overlay";

type ProjectFlowchartCarouselProps = {
  previews: FlowchartPreview[];
};

/**
 * Displays an ordered flowchart preview carousel for project system diagrams.
 * Fully responsive: tab strip scrolls horizontally on mobile, touch-friendly nav.
 */
export const ProjectFlowchartCarousel = ({
  previews,
}: ProjectFlowchartCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const tabListRef = useRef<HTMLDivElement>(null);

  const activePreview = previews[activeIndex];

  const handlePrevious = () =>
    setActiveIndex((i) => (i === 0 ? previews.length - 1 : i - 1));

  const handleNext = () =>
    setActiveIndex((i) => (i === previews.length - 1 ? 0 : i + 1));

  // Scroll active tab into view when index changes
  useEffect(() => {
    const list = tabListRef.current;
    if (!list) return;
    const activeBtn = list.children[activeIndex] as HTMLElement | undefined;
    activeBtn?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  // Keyboard arrow navigation
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
      (
        tabListRef.current?.children[
          (index + 1) % previews.length
        ] as HTMLElement
      )?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrevious();
      const prev = (index - 1 + previews.length) % previews.length;
      (tabListRef.current?.children[prev] as HTMLElement)?.focus();
    }
  };

  return (
    <>
      <div className="mt-5 overflow-hidden rounded-xl border border-border/60 bg-muted/30">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/60 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <ImageIcon className="size-3.5 text-primary" />
              </span>
              System flowchart preview
            </h4>
            <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
              Browse modules: Options → Kiosk → POS → BVS → Managers → CVS → CRM
              → DB
            </p>
          </div>
          <span className="shrink-0 rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs font-medium tabular-nums text-muted-foreground">
            {activeIndex + 1} / {previews.length}
          </span>
        </div>

        <div className="p-3 sm:p-4">
          {/* ── Tab strip — scrollable on mobile ───────────────── */}
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Flowchart modules"
            className="mb-3 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {previews.map((preview, index) => (
              <button
                key={preview.id}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`flowchart-panel-${preview.id}`}
                id={`flowchart-tab-${preview.id}`}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                type="button"
                className={cn(
                  "shrink-0 cursor-pointer rounded-md border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                  activeIndex === index
                    ? "border-primary/40 bg-primary text-primary-foreground"
                    : "border-border/60 bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {preview.label}
              </button>
            ))}
          </div>

          {/* ── Diagram panel ──────────────────────────────────── */}
          <div
            role="tabpanel"
            id={`flowchart-panel-${activePreview.id}`}
            aria-labelledby={`flowchart-tab-${activePreview.id}`}
            className="overflow-hidden rounded-lg border border-border/60 bg-background"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2.5 sm:px-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {activePreview.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  Module flow diagram
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <Button
                  aria-haspopup="dialog"
                  aria-label="Expand diagram to fullscreen"
                  className="h-8 gap-1.5 px-2.5 text-xs"
                  onClick={() => setIsFullscreenOpen(true)}
                  type="button"
                  variant="outline"
                >
                  <Expand className="size-3.5" />
                  <span className="hidden sm:inline">Expand</span>
                </Button>
                <Button
                  aria-label="Previous diagram"
                  className="size-8"
                  onClick={handlePrevious}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  aria-label="Next diagram"
                  className="size-8"
                  onClick={handleNext}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            {/* Image */}
            <figure className="relative aspect-[16/10] bg-muted/20">
              <Image
                key={activePreview.src}
                alt={activePreview.alt}
                className="object-contain p-3 sm:p-4"
                fill
                priority={activeIndex === 0}
                sizes="(min-width: 1024px) 40rem, (min-width: 640px) calc(100vw - 4rem), 100vw"
                src={activePreview.src}
                unoptimized
              />
            </figure>

            {/* Dot indicators — touch-friendly on mobile */}
            <div
              className="flex items-center justify-center gap-1.5 border-t border-border/60 py-2.5"
              aria-hidden="true"
            >
              {previews.map((preview, index) => (
                <button
                  key={preview.id}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                  className={cn(
                    "cursor-pointer rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                    activeIndex === index
                      ? "h-2 w-4 bg-primary"
                      : "size-2 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                  )}
                  aria-label={`Go to ${preview.label}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProjectFlowchartOverlay
        activePreview={activePreview}
        currentIndex={activeIndex}
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        total={previews.length}
      />
    </>
  );
};
