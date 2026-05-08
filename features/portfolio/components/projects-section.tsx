import { projects } from "@/features/portfolio/data";
import { AnimatedSection } from "./animated-section";
import { ProjectFilter } from "./project-filter";
import { SectionHeading } from "./section-heading";

export const ProjectsSection = () => (
  <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-8" id="projects">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        description="Project cards are written for recruiters and hiring managers: what the system does, how it is structured, and what problems it solves."
        eyebrow="Featured Projects"
        title="Full-stack systems with dashboard and QA depth"
      />
      <ProjectFilter projects={projects} />
    </div>
  </AnimatedSection>
);
