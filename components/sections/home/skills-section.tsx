"use client";

import { motion, type Variants } from "framer-motion";
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

const skillLaneGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

const skillLaneVariants: Variants = {
  hidden: (movesRight: boolean) => ({
    clipPath: movesRight
      ? "inset(0 0 0 100% round 0.75rem)"
      : "inset(0 100% 0 0 round 0.75rem)",
    opacity: 0,
    rotateZ: movesRight ? 1.5 : -1.5,
    x: movesRight ? 44 : -44,
  }),
  visible: {
    clipPath: "inset(0 0 0 0 round 0.75rem)",
    opacity: 1,
    rotateZ: 0,
    transition: {
      duration: 0.64,
      ease: [0.22, 1, 0.36, 1],
    },
    transitionEnd: {
      clipPath: "none",
    },
    x: 0,
  },
};

/** Displays technical skills in categorized, alternating infinite carousels. */
export const SkillsSection = () => {
  const [selectedGroup, setSelectedGroup] = useState<SkillGroup | null>(null);

  return (
    <AnimatedSection
      className="scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[calc(100svh-4rem)] lg:px-8 lg:py-6"
      id="skills"
    >
      <RevealGroup className="relative w-full min-w-0">
        <SectionAccentBackdrop variant="center" />

        <RevealItem>
          <SectionHeading
            className="lg:mb-4 lg:[&>div]:mb-2 lg:[&>p]:mt-2 lg:[&>p]:leading-6"
            description="A structured overview of my technical skills across software development, technical troubleshooting, user support, testing, quality assurance, and delivery workflows."
            eyebrow="Technical Skills"
            title="Development, technical support, testing, and QA"
          />
        </RevealItem>

        <RevealGroup
          className="overflow-visible bg-transparent sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border/60"
          variants={skillLaneGroupVariants}
        >
          {skillGroups.map((group, groupIndex) => {
            const movesRight = groupIndex % 2 !== 0;

            return (
              <motion.article
                  className={cn(
                    "skills-toolbelt-lane mb-4 min-w-0 max-w-full p-3.5 last:mb-0 sm:mb-0 sm:p-5 lg:px-3 lg:py-2.5",
                    groupIndex > 0 && "sm:border-t sm:border-border/60",
                  )}
                  custom={movesRight}
                  key={group.title}
                  variants={skillLaneVariants}
                >
                  <div className="mb-2.5 flex items-center justify-between gap-3 sm:mb-3 sm:justify-center lg:mb-1.5">
                    <h3>
                      <button
                        aria-controls="skills-category-modal"
                        aria-expanded={selectedGroup?.title === group.title}
                        aria-haspopup="dialog"
                        className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-1 py-1 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/20 hover:bg-primary/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:rounded-full sm:px-3 sm:py-1.5 sm:text-center sm:text-xs sm:tracking-widest"
                        onClick={() => setSelectedGroup(group)}
                        type="button"
                      >
                        {group.title}
                        <LayoutGrid
                          aria-hidden="true"
                          className="size-3.5 text-primary/70 transition-transform group-hover:scale-110"
                        />
                        <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] tabular-nums text-primary sm:hidden">
                          {group.skills.length}
                        </span>
                      </button>
                    </h3>
                    <div
                      aria-hidden="true"
                      className="flex min-w-12 items-center gap-1.5 text-primary/55 sm:hidden"
                    >
                      <span className="h-px flex-1 bg-primary/20" />
                      <span className="text-xs">
                        {movesRight ? "→" : "←"}
                      </span>
                    </div>
                  </div>

                  <SkillsCarouselRow
                    direction={movesRight ? "right" : "left"}
                    group={group.title}
                    skills={group.skills}
                  />
              </motion.article>
            );
          })}
        </RevealGroup>
      </RevealGroup>

      <SkillsCategoryModal
        group={selectedGroup}
        onClose={() => setSelectedGroup(null)}
      />
    </AnimatedSection>
  );
};
