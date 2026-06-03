import { serviceOfferings } from "@/constants/portfolio.constants";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";

/**
 * Displays the core delivery areas offered across development, design, and QA/Tester work.
 */
export const ServicesSection = () => (
  <AnimatedSection
    className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    id="services"
  >
    <RevealGroup className="relative mx-auto max-w-7xl">
      <SectionAccentBackdrop variant="center" />
      <RevealItem>
        <SectionHeading
          description="The core areas I can contribute to across product builds, interface quality, and testing."
          eyebrow="What I Can Provide"
          title="Development, responsive UI, product thinking, and QA/Tester support"
        />
      </RevealItem>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {serviceOfferings.map((offering) => {
          const Icon = offering.icon;

          return (
            <RevealItem key={offering.title}>
              <article className="flex h-full flex-col items-center rounded-2xl border border-border/70 bg-card px-5 py-6 text-center text-card-foreground shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-border hover:bg-background/80">
                <div className="grid size-11 place-items-center rounded-xl border border-border/70 bg-background/80 text-primary shadow-sm">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-medium text-foreground sm:text-lg">
                  {offering.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                  {offering.description}
                </p>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
