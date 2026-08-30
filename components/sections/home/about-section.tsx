"use client";

import { aboutEntries } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { SectionHeading } from "@/components/common/section-heading";
import { smoothMotionEase } from "@/utils/animations.utils";
import type { Variants } from "framer-motion";

type AboutCardDirection = "left" | "right";

const aboutCardVariants: Variants = {
  hidden: (direction: AboutCardDirection = "left") => ({
    opacity: 0,
    rotateY: direction === "right" ? -52 : 52,
    rotateZ: direction === "right" ? 2 : -2,
    scale: 0.92,
    transformOrigin: direction === "right" ? "100% 50%" : "0% 50%",
    transformPerspective: 900,
    x: direction === "right" ? 28 : -28,
    y: 24,
  }),
  visible: {
    opacity: 1,
    rotateZ: 0,
    scale: 1,
    x: 0,
    y: 0,
    rotateY: 0,
    transformOrigin: "50% 50%",
    transformPerspective: 900,
    transition: {
      duration: 0.78,
      ease: smoothMotionEase,
    },
  },
};

/**
 * Displays a recruiter-friendly profile overview with strengths, personal background, and goals.
 */
export const AboutSection = () => {
  return (
    <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="about">
      <RevealGroup className="relative mx-auto max-w-6xl">
        <SectionAccentBackdrop variant="left" />

        <RevealItem>
          <SectionHeading
            description="A clearer view of who I am, how I approach technology work, and the roles where I can contribute and grow."
            eyebrow="About"
            title="Adaptable across development, support, testing, and QA"
          />
        </RevealItem>

        <RevealGroup className="grid grid-cols-2 gap-4 sm:gap-5 [perspective:1000px]">
          {aboutEntries.map((item, index) => {
            const Icon = item.icon;
            const direction: AboutCardDirection = index === 0 ? "left" : "right";

            return (
              <RevealItem
                className="[transform-style:preserve-3d]"
                custom={direction}
                key={item.title}
                variants={aboutCardVariants}
              >
                <section className="glass-panel glass-interactive relative h-full overflow-hidden rounded-xl p-3 sm:rounded-2xl sm:p-5">
                  <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent sm:inset-x-8" />

                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <span className="glass-inset grid size-8 shrink-0 place-items-center rounded-lg text-primary sm:size-9 sm:rounded-xl">
                      <Icon className="size-3.5 sm:size-4" />
                    </span>
                    <h4 className="text-xs font-semibold leading-snug text-foreground sm:text-sm">
                      {item.title}
                    </h4>
                  </div>

                  <div className="mt-3 space-y-2 sm:mt-4">
                    {item.description.map((paragraph) => (
                      <p
                        className="hyphens-auto text-[11px] leading-[1.55] text-muted-foreground min-[380px]:text-xs sm:text-sm sm:leading-7"
                        key={paragraph}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </RevealGroup>
    </AnimatedSection>
  );
};
