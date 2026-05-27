import { GraduationCap } from "lucide-react";
import { education } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Displays the education section and relevant coursework badges.
 */
export const EducationSection = () => (
  <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="education">
    <RevealGroup className="mx-auto max-w-5xl">
      <RevealItem>
        <SectionHeading
          description="Academic foundation in information technology with coursework focused on full-stack development, database systems, software engineering, and systems analysis."
          eyebrow="Education"
          title="BSIT foundation in systems, software, and database development"
        />
      </RevealItem>
      <RevealItem>
        <Card>
          <CardContent className="p-5 sm:p-6">
            <article className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="mb-4 grid size-10 place-items-center rounded-md bg-primary/10 text-primary sm:mb-5 sm:size-12">
                  <GraduationCap className="size-5 sm:size-6" />
                </div>
                <h3 className="text-xl font-semibold sm:text-2xl">
                  {education.degree}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {education.specialization}
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Relevant coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {education.coursework.map((course) => (
                    <Badge key={course} variant="outline">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          </CardContent>
        </Card>
      </RevealItem>
    </RevealGroup>
  </AnimatedSection>
);
