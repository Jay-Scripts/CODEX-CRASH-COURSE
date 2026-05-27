import { Card, CardContent } from "@/components/ui/card";
import { aboutHighlights } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";

/**
 * Displays the portfolio summary highlights for enterprise-ready delivery traits.
 */
export const AboutSection = () => (
  <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="about">
    <RevealGroup className="mx-auto max-w-7xl">
      <RevealItem>
        <SectionHeading
          description="A practical developer profile centered on reliable web systems, QA discipline, database design, and clear communication."
          eyebrow="About"
          title="Built for enterprise delivery habits"
        />
      </RevealItem>
      <RevealGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {aboutHighlights.map((item) => {
          const Icon = item.icon;

          return (
            <RevealItem key={item.title}>
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <article>
                    <div className="mb-4 grid size-10 place-items-center rounded-md bg-primary/10 text-primary sm:mb-5 sm:size-11">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base font-semibold sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                </CardContent>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
