import { serviceOfferings } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";

/**
 * Displays the core delivery areas offered across development, design, and QA work.
 */
export const ServicesSection = () => (
  <AnimatedSection
    className="border-b border-border px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
    id="services"
  >
    <RevealGroup className="mx-auto max-w-7xl">
      <RevealItem>
        <SectionHeading
          description="The core areas I can contribute to across product builds, interface quality, and testing."
          eyebrow="What I Can Provide"
          title="Development, responsive UI, product thinking, and QA support"
        />
      </RevealItem>
      <ul className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {serviceOfferings.map((offering) => {
          const Icon = offering.icon;

          return (
            <li key={offering.title}>
              <RevealItem>
                <article className="flex h-full flex-col items-center border-b border-border/70 pb-4 text-center sm:pb-5 lg:border-b-0 lg:pb-0">
                  <Icon className="size-5 text-primary" />
                  <h3 className="mt-3 text-base font-medium text-foreground sm:text-lg">
                    {offering.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                    {offering.description}
                  </p>
                </article>
              </RevealItem>
            </li>
          );
        })}
      </ul>
    </RevealGroup>
  </AnimatedSection>
);
