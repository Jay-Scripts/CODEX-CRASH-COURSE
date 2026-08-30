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
    className="px-3 py-16 sm:px-6 sm:py-20 lg:px-8"
    id="projects"
  >
    <RevealGroup className="relative mx-auto max-w-7xl">
      <SectionAccentBackdrop variant="right" />
      <RevealItem>
        <SectionHeading
          description="A selection of projects showcasing my skills in system analysis, design, development, testing, technical documentation, and deployment."
          eyebrow="Featured Projects"
          title="Complete Software Solutions"
        />
      </RevealItem>
      <ProjectFilter projects={projects} />
    </RevealGroup>
  </AnimatedSection>
);
