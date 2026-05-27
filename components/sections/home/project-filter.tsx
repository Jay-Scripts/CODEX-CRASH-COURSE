"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/project-card";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { Button } from "@/components/ui/button";
import type { Project, ProjectCategory } from "@/types/portfolio.types";

const filters: { label: string; value: ProjectCategory }[] = [
  { label: "All", value: "all" },
  { label: "Full-stack", value: "full-stack" },
  { label: "Dashboard", value: "dashboard" },
  { label: "QA workflows", value: "qa" },
];

type ProjectFilterProps = {
  projects: Project[];
};

/**
 * Displays project filter controls and the matching recruiter-facing project cards.
 */
export const ProjectFilter = ({ projects }: ProjectFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    if (activeFilter === "qa") {
      return projects.filter((project) =>
        project.features.some((feature) => feature.toLowerCase().includes("qa")),
      );
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <RevealGroup>
      <RevealGroup className="mb-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
        {filters.map((filter) => (
          <RevealItem key={filter.value}>
            <Button
              aria-pressed={activeFilter === filter.value}
              className="w-full sm:w-auto"
              onClick={() => setActiveFilter(filter.value)}
              type="button"
              variant={activeFilter === filter.value ? "default" : "outline"}
            >
              {filter.label}
            </Button>
          </RevealItem>
        ))}
      </RevealGroup>
      <RevealGroup className="grid gap-6 lg:grid-cols-2">
        {visibleProjects.map((project) => (
          <RevealItem key={project.id}>
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </RevealGroup>
    </RevealGroup>
  );
};
