import { projects } from "@/constants/portfolio.constants";
import { AnimatedSection } from "./animated-section";
import { ProjectFilter } from "./project-filter";
import { RevealGroup, RevealItem } from "./scroll-reveal";
import { SectionHeading } from "./section-heading";

/**
 * Displays the featured projects section with interactive category filtering.
 */
export const ProjectsSection = () => (
  <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-8" id="projects">
    <RevealGroup className="mx-auto max-w-7xl">
      <RevealItem>
        <SectionHeading
          description="A selection of projects showcasing my ability to design, build, test, document, and deliver practical full-stack systems."
          eyebrow="Featured Projects"
          title="Full-stack projects with system design and QA depth"
        />
      </RevealItem>
      <ProjectFilter projects={projects} />
    </RevealGroup>
  </AnimatedSection>
);
