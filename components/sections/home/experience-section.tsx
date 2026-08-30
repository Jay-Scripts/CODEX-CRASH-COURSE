"use client";

import type { Variants } from "framer-motion";
import { experiences } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ExperienceCard } from "@/components/cards/experience-card";
import { cn } from "@/lib/utils";
import { smoothMotionEase } from "@/utils/animations.utils";

const experienceTimelineVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.14,
    },
  },
};

const experienceCardVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateY: 26,
    rotateZ: -1.5,
    scale: 0.94,
    transformPerspective: 1000,
    x: -28,
    y: 22,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    transformPerspective: 1000,
    transition: {
      duration: 0.72,
      ease: smoothMotionEase,
    },
    x: 0,
    y: 0,
  },
};

/**
 * Displays the work history timeline with recruiter-relevant highlights.
 */
export const ExperienceSection = () => (
  <AnimatedSection
    className="px-3 py-16 sm:px-6 sm:py-20 lg:px-8"
    id="experience"
  >
    <RevealGroup className="relative mx-auto max-w-5xl">
      <SectionAccentBackdrop variant="left" />
      <RevealItem>
        <SectionHeading
          description="A timeline of my internship, technical projects, and professional experience that strengthened my technical, problem-solving, teamwork, and customer service skills."
          eyebrow="Experience"
          title="Professional & Technical Experience"
        />
      </RevealItem>

      <RevealGroup
        className="relative space-y-4 before:absolute before:left-4 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-primary/20 before:via-border before:to-primary/20 md:space-y-5 md:before:left-1/2"
        variants={experienceTimelineVariants}
      >
        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0;

          return (
            <RevealItem
              className={cn(
                "[transform-origin:0%_2rem] [transform-style:preserve-3d]",
                isEven
                  ? "md:[transform-origin:100%_2.5rem]"
                  : "md:[transform-origin:0%_2.5rem]",
              )}
              key={`${experience.role}-${experience.organization}`}
              variants={experienceCardVariants}
            >
              <ExperienceCard experience={experience} isEven={isEven} />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
