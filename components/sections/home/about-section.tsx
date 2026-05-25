import { Card, CardContent } from "@/components/ui/card";
import { aboutHighlights } from "@/constants/portfolio.constants";
import { AnimatedSection } from "./animated-section";
import { RevealGroup, RevealItem } from "./scroll-reveal";
import { SectionHeading } from "./section-heading";

/**
 * Displays the portfolio summary highlights for enterprise-ready delivery traits.
 */
export const AboutSection = () => (
  <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-8" id="about">
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
                <CardContent className="p-6">
                  <div className="mb-5 grid size-11 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
