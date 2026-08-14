"use client";

import { AnimatedSection } from "@/components/common/animated-section";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SkillsCarouselRow } from "@/components/sections/home/skills-carousel-row";
import { skillGroups } from "@/constants/portfolio.constants";
import { cn } from "@/lib/utils";

/** Displays technical skills in categorized, alternating infinite carousels. */
export const SkillsSection = () => (
  <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="skills">
    <RevealGroup className="relative w-full min-w-0">
      <SectionAccentBackdrop variant="center" />

      <RevealItem>
        <SectionHeading
          description="A structured overview of my technical skills across frontend development, backend integration, quality assurance, and delivery workflows."
          eyebrow="Technical Skills"
          title="Frontend, backend, QA/Tester, and delivery tooling"
        />
      </RevealItem>

      <RevealItem>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-transparent">
          {skillGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            const movesRight = groupIndex % 2 !== 0;

            return (
              <article
                className={cn(
                  "min-w-0 max-w-full p-4 sm:p-5",
                  groupIndex > 0 && "border-t border-border/60",
                )}
                key={group.title}
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="glass-inset grid size-7 shrink-0 place-items-center rounded-lg text-primary">
                    <Icon aria-hidden="true" className="size-3.5" />
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {group.title}
                  </h3>
                  <div
                    aria-hidden="true"
                    className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden"
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
  </AnimatedSection>
);
