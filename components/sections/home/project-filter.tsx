"use client";

import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/project-card";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project, ProjectFilterValue } from "@/types/portfolio.types";
import {
  filteredItemExitState,
  filteredItemInitialState,
  filteredItemVisibleState,
  responsiveLayoutTransition,
} from "@/utils/animations.utils";

const filters: { label: string; value: ProjectFilterValue }[] = [
  { label: "All", value: "all" },
  { label: "POS", value: "pos" },
  { label: "Booking & Reservation", value: "booking-&-reservation" },
  { label: "AI Chatbot", value: "ai-chat-bot" },
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
      <div className="mb-6 grid grid-cols-2 gap-2 sm:mb-8 sm:flex sm:flex-wrap sm:justify-center">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <RevealItem
              className="min-w-0 last:col-span-2 sm:last:col-span-1"
              key={filter.value}
            >
              <Button
                aria-pressed={isActive}
                className={cn(
                  "glass-chip h-9 w-full border-primary/15 px-2 text-xs sm:h-10 sm:w-auto sm:px-4 sm:text-sm",
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
      <RevealGroup className="grid gap-4 sm:gap-6 [perspective:1200px]" layout>
        <AnimatePresence initial={false} mode="sync">
          {visibleProjects.length ? (
            visibleProjects.map((project, projectIndex) => (
              <RevealItem
                animate={{
                  ...filteredItemVisibleState,
                  rotateX: 0,
                  rotateZ: 0,
                  scaleY: 1,
                  transformPerspective: 1200,
                }}
                className="[transform-origin:50%_0%] [transform-style:preserve-3d]"
                exit={{
                  ...filteredItemExitState,
                  rotateX: 8,
                  scaleY: 0.96,
                }}
                initial={{
                  ...filteredItemInitialState,
                  rotateX: -14,
                  rotateZ: projectIndex % 2 === 0 ? -1 : 1,
                  scaleY: 0.88,
                  transformPerspective: 1200,
                  y: 42,
                }}
                key={project.id}
                layout="position"
                transition={responsiveLayoutTransition}
              >
                <ProjectCard project={project} />
              </RevealItem>
            ))
          ) : (
            <RevealItem
              animate={filteredItemVisibleState}
              exit={filteredItemExitState}
              initial={filteredItemInitialState}
              key="empty-project-filter"
              layout
              transition={responsiveLayoutTransition}
            >
              <div className="glass-inset rounded-2xl p-8 text-center text-sm text-muted-foreground lg:col-span-2">
                No projects are tagged under this tab yet.
              </div>
            </RevealItem>
          )}
        </AnimatePresence>
      </RevealGroup>
    </>
  );
};
