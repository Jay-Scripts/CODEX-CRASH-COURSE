import { projects } from "@/constants/portfolio.constants";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SectionShowcase } from "@/components/common/section-showcase";
import { ProjectFilter } from "./project-filter";

/**
 * Displays the featured projects section with interactive category filtering.
 */
export const ProjectsSection = () => (
  <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="projects">
    <RevealGroup className="relative mx-auto max-w-7xl">
      <SectionAccentBackdrop variant="right" />
      <RevealItem>
        <SectionHeading
          description="A selection of projects showcasing my ability to design, build, test, document, and deliver practical full-stack systems."
          eyebrow="Featured Projects"
          title="Full-stack projects with system design and mobile-first depth"
        />
      </RevealItem>
      <SectionShowcase glowPosition="right">
        <RevealItem className="mb-6 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-primary/15 bg-background/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {projects.length} featured builds
          </span>
          <span className="rounded-full border border-primary/15 bg-background/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            systems + docs + QA
          </span>
        </RevealItem>
        <ProjectFilter projects={projects} />
      </SectionShowcase>
    </RevealGroup>
  </AnimatedSection>
);
