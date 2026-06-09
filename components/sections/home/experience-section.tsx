import { experiences } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ExperienceCard } from "@/components/cards/experience-card";

/**
 * Displays the work history timeline with recruiter-relevant highlights.
 */
export const ExperienceSection = () => (
  <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="experience">
    <RevealGroup className="relative mx-auto max-w-5xl">
      <SectionAccentBackdrop variant="left" />
      <RevealItem>
        <SectionHeading
          description="Professional experience spanning junior web development, QA testing, IT support, troubleshooting, and collaborative workplace operations."
          eyebrow="Experience"
          title="Development, QA, and professional work experience"
        />
      </RevealItem>
      <RevealGroup className="relative space-y-5 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-primary/20 before:via-border before:to-primary/20 md:before:left-1/2">
        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0;

          return (
            <RevealItem key={`${experience.role}-${experience.organization}`}>
              <ExperienceCard experience={experience} isEven={isEven} />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
