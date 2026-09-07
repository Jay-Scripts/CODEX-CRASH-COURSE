"use client";

import type { Experience } from "@/types/portfolio.types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
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
  const cardColumnClassName = isEven ? "md:col-start-1" : "md:col-start-3";
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const proofSectionId = `${experience.role}-${experience.organization}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const syncDesktopViewport = () => {
      setIsDesktopViewport(desktopQuery.matches);
    };

    syncDesktopViewport();
    desktopQuery.addEventListener("change", syncDesktopViewport);

    return () => {
      desktopQuery.removeEventListener("change", syncDesktopViewport);
    };
  }, []);

  return (
    <article
      className={cn(
        "relative grid gap-3 pl-10 md:grid-cols-[1fr_3rem_1fr] md:items-start md:gap-5 md:pl-0",
        hasProofItems && (proofItems.length > 4 ? "md:py-24" : "md:py-16"),
      )}
    >
      <div className={cn(cardColumnClassName, "relative")}>
        <Card className="glass-interactive relative overflow-hidden">
          <div className="pointer-events-none absolute right-4 top-4 z-10 hidden rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-primary md:inline-flex">
            Proof reel
          </div>
          <CardContent className="p-3.5 sm:p-6">
            <p className="text-xs text-primary sm:text-sm">{experience.period}</p>
            <h3 className="mt-1.5 text-base font-semibold sm:mt-2 sm:text-xl">
              {experience.role}
            </h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {experience.organization}
            </p>
            {experience.techStack?.length ? (
              <p className="mt-2 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-6">
                <span className="font-medium text-foreground">Tech stack:</span>{" "}
                {experience.techStack.join(", ")}
              </p>
            ) : null}
            <ul className="mt-3 list-disc space-y-1 pl-4 text-xs leading-5 text-muted-foreground marker:text-primary sm:mt-4 sm:space-y-2 sm:pl-5 sm:text-sm sm:leading-6">
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

        {proofItems.length > 1 && isDesktopViewport ? (
          <ExperienceProofGallery
            cardAlignment={cardAlignment}
            desktopLayout="filmstrip"
            mode="desktop"
            proofItems={proofItems}
            proofSectionId={proofSectionId}
            previewVisible
          />
        ) : null}
      </div>
      <div className="glass-chip absolute left-0 top-4 grid size-8 place-items-center rounded-full text-primary md:static md:col-start-2 md:size-12">
        <Icon className="size-3.5 md:size-5" />
      </div>
    </article>
  );
};
