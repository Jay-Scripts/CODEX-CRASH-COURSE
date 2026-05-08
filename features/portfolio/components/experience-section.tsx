import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/features/portfolio/data";
import { AnimatedSection } from "./animated-section";
import { SectionHeading } from "./section-heading";

export const ExperienceSection = () => (
  <AnimatedSection
    className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8"
    id="experience"
  >
    <div className="mx-auto max-w-5xl">
      <SectionHeading
        description="Experience is positioned around teamwork, support, debugging, communication, and practical troubleshooting."
        eyebrow="Experience"
        title="Timeline of technical and customer-facing work"
      />
      <div className="relative space-y-5 before:absolute before:left-6 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-border md:before:left-1/2">
        {experiences.map((experience, index) => {
          const Icon = experience.icon;
          const isEven = index % 2 === 0;

          return (
            <div
              className="relative grid gap-4 md:grid-cols-[1fr_3rem_1fr]"
              key={`${experience.role}-${experience.organization}`}
            >
              <div className={isEven ? "md:col-start-1" : "md:col-start-3"}>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-primary">{experience.period}</p>
                    <h3 className="mt-2 text-xl font-semibold">
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
              <div className="absolute left-0 top-6 grid size-12 place-items-center rounded-full border border-border bg-background text-primary md:static md:col-start-2">
                <Icon className="size-5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </AnimatedSection>
);
