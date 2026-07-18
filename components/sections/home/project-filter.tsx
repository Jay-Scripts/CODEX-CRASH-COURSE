"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/project-card";
import { RevealItem } from "@/components/common/scroll-reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project, ProjectFilterValue } from "@/types/portfolio.types";

const filters: { label: string; value: ProjectFilterValue }[] = [
  { label: "All", value: "all" },
  { label: "POS", value: "pos" },
  { label: "Booking & Reservation", value: "booking-&-reservation" },
  { label: "Website", value: "website" },
  { label: "Android APP", value: "android" },
  { label: "System Flowchart", value: "system-flowcharts" },
  { label: "User Manuals", value: "user-manuals" },
];

type ProjectFilterProps = {
  projects: Project[];
};

/**
 * Displays project filter controls and the matching recruiter-facing project cards.
 */
export const ProjectFilter = ({ projects }: ProjectFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterValue>("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) =>
      project.categories.includes(activeFilter),
    );
  }, [activeFilter, projects]);

  return (
    <>
      <div className="mb-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <RevealItem key={filter.value}>
              <Button
                aria-pressed={isActive}
                className={cn(
                  "w-full border-primary/15 bg-background/80 backdrop-blur-sm sm:w-auto",
                  isActive &&
                    "border-primary/30 bg-primary/12 text-foreground hover:bg-primary/18",
                )}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
                variant="outline"
              >
                {filter.label}
              </Button>
            </RevealItem>
          );
        })}
      </div>
      <div className="grid gap-6" key={activeFilter}>
        {visibleProjects.length ? (
          visibleProjects.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))
        ) : (
          <div>
            <div className="rounded-[1.6rem] border border-dashed border-primary/20 bg-background/80 p-8 text-center text-sm text-muted-foreground lg:col-span-2">
              No projects are tagged under this tab yet.
            </div>
          </div>
        )}
      </div>
    </>
  );
};
