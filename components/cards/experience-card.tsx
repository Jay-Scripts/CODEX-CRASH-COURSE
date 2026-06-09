import type { Experience } from "@/types/portfolio.types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExperienceProofGallery } from "./experience-proof-gallery";

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
  const proofItems = experience.proofItems ?? [];
  const hasProofItems = proofItems.length > 0;
  const cardColumnClassName = isEven ? "md:col-start-1" : "md:col-start-3";
  const proofSectionId = `${experience.role}-${experience.organization}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <article
      className={cn(
        "relative grid gap-4 pl-14 md:grid-cols-[1fr_3rem_1fr] md:items-start md:gap-5 md:pl-0",
        hasProofItems &&
          (proofItems.length > 4 ? "md:py-24" : "md:py-16"),
      )}
    >
      <div
        className={cn(
          cardColumnClassName,
          hasProofItems && "group/experience relative",
        )}
      >
        <Card className="overflow-hidden border-border/70 bg-card/95 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
          <CardContent className="p-5 sm:p-6">
            <p className="text-sm text-primary">{experience.period}</p>
            <h3 className="mt-2 text-lg font-semibold sm:text-xl">
              {experience.role}
            </h3>
            <p className="text-sm text-muted-foreground">
              {experience.organization}
            </p>
            {experience.techStack?.length ? (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                <span className="font-medium text-foreground">Tech stack:</span>{" "}
                {experience.techStack.join(", ")}
              </p>
            ) : null}
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-primary">
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            {hasProofItems ? (
              <ExperienceProofGallery
                mode="mobile"
                proofItems={proofItems}
                proofSectionId={proofSectionId}
              />
            ) : null}
          </CardContent>
        </Card>

        {hasProofItems ? (
          <ExperienceProofGallery
            mode="desktop"
            proofItems={proofItems}
            proofSectionId={proofSectionId}
          />
        ) : null}
      </div>
      <div className="absolute left-0 top-5 grid size-10 place-items-center rounded-full border border-primary/20 bg-background text-primary shadow-sm shadow-primary/10 md:static md:col-start-2 md:size-12">
        <Icon className="size-4 md:size-5" />
      </div>
    </article>
  );
};
