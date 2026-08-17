"use client";

import { LayoutGrid } from "lucide-react";
import { useState } from "react";
import { AnimatedSection } from "@/components/common/animated-section";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SkillsCategoryModal } from "@/components/sections/home/skills-category-modal";
import { SkillsCarouselRow } from "@/components/sections/home/skills-carousel-row";
import { skillGroups } from "@/constants/portfolio.constants";
import { cn } from "@/lib/utils";
import type { SkillGroup } from "@/types/portfolio.types";

/** Displays technical skills in categorized, alternating infinite carousels. */
export const SkillsSection = () => {
  const [selectedGroup, setSelectedGroup] = useState<SkillGroup | null>(null);

  return (
    <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="skills">
      <RevealGroup className="relative w-full min-w-0">
        <SectionAccentBackdrop variant="center" />

        <RevealItem>
          <SectionHeading
            description="A structured overview of my technical skills across software development, technical troubleshooting, user support, testing, quality assurance, and delivery workflows."
            eyebrow="Technical Skills"
            title="Development, technical support, testing, and QA"
          />
        </RevealItem>

        <RevealItem>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-transparent">
            {skillGroups.map((group, groupIndex) => {
              const movesRight = groupIndex % 2 !== 0;

              return (
                <article
                  className={cn(
                    "min-w-0 max-w-full p-4 sm:p-5",
                    groupIndex > 0 && "border-t border-border/60",
                  )}
                  key={group.title}
                >
                  <div className="mb-3 flex items-center justify-center">
                    <h3>
                      <button
                        aria-controls="skills-category-modal"
                        aria-expanded={selectedGroup?.title === group.title}
                        aria-haspopup="dialog"
                        className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/20 hover:bg-primary/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        onClick={() => setSelectedGroup(group)}
                        type="button"
                      >
                        {group.title}
                        <LayoutGrid
                          aria-hidden="true"
                          className="size-3.5 text-primary/70 transition-transform group-hover:scale-110"
                        />
                      </button>
                    </h3>
                    <div
                      aria-hidden="true"
                      className="hidden"
                    >
                      <span className="h-px flex-1 bg-border/60" />
                      <span className="text-[10px] text-muted-foreground/50">
                        {movesRight ? "→" : "←"}
                      </span>
                    </div>
                  </div>

                  <SkillsCarouselRow
                    direction={movesRight ? "right" : "left"}
                    group={group.title}
                    skills={group.skills}
                  />
                </article>
              );
            })}
          </div>
        </RevealItem>
      </RevealGroup>

      <SkillsCategoryModal
        group={selectedGroup}
        onClose={() => setSelectedGroup(null)}
      />
    </AnimatedSection>
  );
};
