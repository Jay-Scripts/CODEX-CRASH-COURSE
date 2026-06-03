import { aboutEntries } from "@/constants/portfolio.constants";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Displays personal background details and developer goals in a structured about section.
 */
export const AboutSection = () => (
  <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="about">
    <RevealGroup className="relative mx-auto max-w-5xl">
      <SectionAccentBackdrop variant="left" />
      <RevealItem>
        <SectionHeading
          description="A clearer view of who I am, how I approach development, and where I want to grow."
          eyebrow="About"
          title="Personal details and long-term goals"
        />
      </RevealItem>
      <RevealGroup className="relative space-y-5 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-border md:before:left-1/2">
        {aboutEntries.map((item, index) => {
          const Icon = item.icon;
          const isEven = index % 2 === 0;

          return (
            <RevealItem key={item.title}>
              <article className="relative grid gap-4 pl-14 md:grid-cols-[1fr_3rem_1fr] md:pl-0">
                <div className={isEven ? "md:col-start-1" : "md:col-start-3"}>
                  <Card>
                    <CardContent className="p-5 sm:p-6">
                      <h3 className="text-lg font-semibold sm:text-xl">
                        {item.title}
                      </h3>
                      <div className="mt-4 space-y-3">
                        {item.description.map((paragraph) => (
                          <p
                            className="text-sm leading-7 text-muted-foreground sm:text-base"
                            key={paragraph}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-0 top-5 grid size-10 place-items-center rounded-full border border-border bg-background text-primary md:static md:col-start-2 md:size-12">
                  <Icon className="size-4 md:size-5" />
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
