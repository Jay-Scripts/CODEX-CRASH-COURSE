import { serviceOfferings } from "@/constants/portfolio.constants";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";

/**
 * Displays the core contribution areas offered across development, support, testing, and QA work.
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
          description="I can contribute across the software lifecycle by building reliable applications, resolving technical issues, testing user flows, strengthening quality, and documenting systems clearly."
          eyebrow="What I Can Provide"
          title="Skills & Areas of Contribution"
        />
      </RevealItem>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {serviceOfferings.map((offering) => {
          const Icon = offering.icon;

          return (
            <RevealItem key={offering.title}>
              <article className="glass-panel glass-interactive group relative flex h-full min-h-[17rem] flex-col items-center overflow-hidden rounded-2xl px-5 py-7 text-center text-card-foreground xl:min-h-[19rem]">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-70" />
                <div className="glass-inset grid size-12 place-items-center rounded-xl text-primary">
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
