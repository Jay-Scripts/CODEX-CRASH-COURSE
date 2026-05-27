import type { Experience } from "@/types/portfolio.types";
import { Card, CardContent } from "@/components/ui/card";

type ExperienceCardProps = {
  experience: Experience;
  isEven: boolean;
};

/**
 * Displays one experience timeline entry with recruiter-relevant highlights.
 */
export const ExperienceCard = ({
  experience,
  isEven,
}: ExperienceCardProps) => {
  const Icon = experience.icon;

  return (
    <article className="relative grid gap-4 pl-14 md:grid-cols-[1fr_3rem_1fr] md:pl-0">
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
    </article>
  );
};
