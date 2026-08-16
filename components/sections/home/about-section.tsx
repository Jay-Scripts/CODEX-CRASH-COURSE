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
    scale: 0.96,
    x: direction === "right" ? 420 : -420,
    rotateY: direction === "right" ? -24 : 24,
    transformOrigin: direction === "right" ? "100% 50%" : "0% 50%",
    transformPerspective: 1000,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    rotateY: 0,
    transformOrigin: "50% 50%",
    transformPerspective: 1000,
    transition: {
      duration: 1,
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

        <RevealGroup className="grid gap-3 sm:grid-cols-2 [perspective:1000px]">
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
                <section className="glass-panel glass-interactive relative h-full overflow-hidden rounded-2xl p-5">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                  <div className="flex items-center gap-3">
                    <span className="glass-inset grid size-9 place-items-center rounded-xl text-primary">
                      <Icon className="size-4" />
                    </span>
                    <h4 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h4>
                  </div>

                  <div className="mt-4 space-y-2">
                    {item.description.map((paragraph) => (
                      <p
                        className="text-sm leading-7 text-muted-foreground"
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
