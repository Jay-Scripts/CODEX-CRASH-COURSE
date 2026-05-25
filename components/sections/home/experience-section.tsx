import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/constants/portfolio.constants";
import { AnimatedSection } from "./animated-section";
import { RevealGroup, RevealItem } from "./scroll-reveal";
import { SectionHeading } from "./section-heading";

/**
 * Displays the work history timeline with recruiter-relevant highlights.
 */
export const ExperienceSection = () => (
  <AnimatedSection
    className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    id="experience"
  >
    <RevealGroup className="mx-auto max-w-5xl">
      <RevealItem>
        <SectionHeading
          description="Professional experience spanning IT support, customer service, inventory control, troubleshooting, and collaborative workplace operations."
          eyebrow="Experience"
          title="Technical support and professional work experience"
        />
      </RevealItem>
      <RevealGroup className="relative space-y-5 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-border md:before:left-1/2">
        {experiences.map((experience, index) => {
          const Icon = experience.icon;
          const isEven = index % 2 === 0;

          return (
            <RevealItem key={`${experience.role}-${experience.organization}`}>
              <div className="relative grid gap-4 pl-14 md:grid-cols-[1fr_3rem_1fr] md:pl-0">
                <div className={isEven ? "md:col-start-1" : "md:col-start-3"}>
                  <Card>
                    <CardContent className="p-5 sm:p-6">
                      <p className="text-sm text-primary">{experience.period}</p>
                      <h3 className="mt-2 text-lg font-semibold sm:text-xl">
                        {experience.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {experience.organization}
                      </p>
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-primary">
                        {experience.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-0 top-5 grid size-10 place-items-center rounded-full border border-border bg-background text-primary md:static md:col-start-2 md:size-12">
                  <Icon className="size-4 md:size-5" />
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
