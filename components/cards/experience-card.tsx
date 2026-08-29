"use client";

import type { Experience } from "@/types/portfolio.types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ExperienceProofGallery } from "./experience-proof-gallery";

type ExperienceCardProps = {
  experience: Experience;
  isEven: boolean;
};

/**
 * Displays one experience timeline entry with recruiter-relevant highlights.
 */
export const ExperienceCard = ({ experience, isEven }: ExperienceCardProps) => {
  const Icon = experience.icon;
  const cardAlignment = isEven ? "left" : "right";
  const proofItems = experience.proofItems ?? [];
  const hasProofItems = proofItems.length > 0;
  const usesFourColumnProofGrid =
    experience.role === "IT Support Assistant (Student Assistant)";
  const cardColumnClassName = isEven ? "md:col-start-1" : "md:col-start-3";
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [isWideViewport, setIsWideViewport] = useState(false);
  const [isDesktopProofVisible, setIsDesktopProofVisible] = useState(false);
  const proofHideTimerRef = useRef<number | null>(null);
  const proofSectionId = `${experience.role}-${experience.organization}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  useEffect(
    () => () => {
      if (proofHideTimerRef.current !== null) {
        window.clearTimeout(proofHideTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const wideQuery = window.matchMedia("(min-width: 1280px)");
    const syncDesktopViewport = () => {
      setIsDesktopViewport(desktopQuery.matches);
      setIsWideViewport(wideQuery.matches);
    };

    syncDesktopViewport();
    desktopQuery.addEventListener("change", syncDesktopViewport);
    wideQuery.addEventListener("change", syncDesktopViewport);

    return () => {
      desktopQuery.removeEventListener("change", syncDesktopViewport);
      wideQuery.removeEventListener("change", syncDesktopViewport);
    };
  }, []);

  const showDesktopProof = () => {
    if (proofHideTimerRef.current !== null) {
      window.clearTimeout(proofHideTimerRef.current);
      proofHideTimerRef.current = null;
    }

    setIsDesktopProofVisible(true);
  };

  const hideDesktopProofWithDelay = () => {
    if (proofHideTimerRef.current !== null) {
      window.clearTimeout(proofHideTimerRef.current);
    }

    proofHideTimerRef.current = window.setTimeout(() => {
      setIsDesktopProofVisible(false);
      proofHideTimerRef.current = null;
    }, 500);
  };

  return (
    <article
      className={cn(
        "relative grid gap-4 pl-14 md:grid-cols-[1fr_3rem_1fr] md:items-start md:gap-5 md:pl-0",
        hasProofItems && (proofItems.length > 4 ? "md:py-24" : "md:py-16"),
      )}
    >
      <div
        className={cn(cardColumnClassName, "group/experience relative")}
        onMouseEnter={showDesktopProof}
        onMouseLeave={hideDesktopProofWithDelay}
      >
        <Card className="glass-interactive relative overflow-hidden">
          <div className="pointer-events-none absolute right-4 top-4 z-10 hidden rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-primary md:inline-flex">
            Hover to see more info
          </div>
          <CardContent className="p-5 sm:p-6">
            <p className="text-sm text-primary">{experience.period}</p>
            <h3 className="mt-2 text-lg font-semibold sm:text-xl">
              {experience.role}
            </h3>
            <p className="text-sm text-muted-foreground">
              {experience.organization}
            </p>
            {experience.techStack?.length ? (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                <span className="font-medium text-foreground">Tech stack:</span>{" "}
                {experience.techStack.join(", ")}
              </p>
            ) : null}
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-primary">
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            {hasProofItems && !isDesktopViewport ? (
              <ExperienceProofGallery
                mode="mobile"
                proofItems={proofItems}
                proofSectionId={proofSectionId}
              />
            ) : null}
          </CardContent>
        </Card>

        {hasProofItems && isDesktopViewport ? (
          <ExperienceProofGallery
            cardAlignment={cardAlignment}
            desktopLayout={isWideViewport ? "wide" : "medium"}
            mode="desktop"
            proofItems={proofItems}
            proofSectionId={proofSectionId}
            desktopProofColumns={usesFourColumnProofGrid ? 4 : 2}
            previewVisible={isDesktopProofVisible}
          />
        ) : null}
      </div>
      <div className="glass-chip absolute left-0 top-5 grid size-10 place-items-center rounded-full text-primary md:static md:col-start-2 md:size-12">
        <Icon className="size-4 md:size-5" />
      </div>
    </article>
  );
};
