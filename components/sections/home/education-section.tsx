import { GraduationCap } from "lucide-react";
import { education } from "@/constants/portfolio.constants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "./animated-section";
import { SectionHeading } from "./section-heading";

/**
 * Displays the education section and relevant coursework badges.
 */
export const EducationSection = () => (
  <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-8" id="education">
    <div className="mx-auto max-w-5xl">
      <SectionHeading
        description="Academic foundation in information technology with coursework focused on full-stack development, database systems, software engineering, and systems analysis."
        eyebrow="Education"
        title="BSIT foundation in systems, software, and database development"
      />
      <Card>
        <CardContent className="grid gap-8 p-6 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-5 grid size-12 place-items-center rounded-md bg-primary/10 text-primary">
              <GraduationCap className="size-6" />
            </div>
            <h3 className="text-2xl font-semibold">{education.degree}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {education.specialization}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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
        </CardContent>
      </Card>
    </div>
  </AnimatedSection>
);
