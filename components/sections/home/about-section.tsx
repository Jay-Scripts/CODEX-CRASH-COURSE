"use client";

import { aboutEntries } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { SectionHeading } from "@/components/common/section-heading";

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

        <RevealGroup className="grid gap-3">
          <RevealItem>
            <div className="grid gap-3 sm:grid-cols-2">
              {aboutEntries.map((item) => {
                const Icon = item.icon;

                return (
                  <section
                    className="glass-panel glass-interactive relative overflow-hidden rounded-2xl p-5"
                    key={item.title}
                  >
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
                );
              })}
            </div>
          </RevealItem>
        </RevealGroup>
      </RevealGroup>
    </AnimatedSection>
  );
};
