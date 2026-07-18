import { projects } from "@/constants/portfolio.constants";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ProjectFilter } from "./project-filter";

/**
 * Displays the featured projects section with interactive category filtering.
 */
export const ProjectsSection = () => (
  <AnimatedSection
    className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    id="projects"
  >
    <RevealGroup className="relative mx-auto max-w-7xl">
      <SectionAccentBackdrop variant="right" />
      <RevealItem>
        <SectionHeading
          description="A selection of projects showcasing my ability to design, build, test, document, and deliver practical full-stack systems."
          eyebrow="Featured Projects"
          title="Full-stack projects with system design and mobile-first depth"
        />
      </RevealItem>
      <ProjectFilter projects={projects} />
    </RevealGroup>
  </AnimatedSection>
);
