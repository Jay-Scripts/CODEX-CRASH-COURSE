"use client";

import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FlowchartPreview } from "@/types/portfolio.types";
import { ProjectFlowchartOverlay } from "./project-flowchart-overlay";

type ProjectFlowchartCarouselProps = {
  previews: FlowchartPreview[];
};

/**
 * Displays an ordered flowchart preview carousel for project system diagrams.
 */
export const ProjectFlowchartCarousel = ({
  previews,
}: ProjectFlowchartCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const activePreview = previews[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? previews.length - 1 : currentIndex - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === previews.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <>
      <Card className="mt-5 overflow-hidden border-border/70 bg-muted/40 shadow-none">
        <CardContent className="p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <ImageIcon className="size-4 text-primary" />
                System flowchart preview
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse the Smart POS modules in this order: Options, Kiosk, POS,
                BVS, Managers, CVS, CRM, and DB.
              </p>
            </div>
            <div className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              {activeIndex + 1} / {previews.length}
            </div>
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {previews.map((preview, index) => (
              <Button
                aria-pressed={activeIndex === index}
                className="shrink-0"
                key={preview.id}
                onClick={() => setActiveIndex(index)}
                type="button"
                variant={activeIndex === index ? "default" : "outline"}
              >
                {preview.label}
              </Button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-background">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{activePreview.label}</p>
                <p className="text-xs text-muted-foreground">
                  Module flow diagram preview
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  aria-haspopup="dialog"
                  onClick={() => setIsFullscreenOpen(true)}
                  type="button"
                  variant="outline"
                >
                  Expand
                </Button>
                <Button
                  onClick={handlePrevious}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  onClick={handleNext}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>

            <div className="relative aspect-[16/10] bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,_var(--primary)_10%,_transparent),_transparent_58%)]">
              <Image
                alt={activePreview.alt}
                className="object-contain p-3 sm:p-4"
                fill
                priority={activeIndex === 0}
                sizes="(min-width: 1024px) 40rem, 100vw"
                src={activePreview.src}
                unoptimized
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
