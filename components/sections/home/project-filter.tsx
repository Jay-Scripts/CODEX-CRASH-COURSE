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
      <div className="mb-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <RevealItem key={filter.value}>
              <Button
                aria-pressed={isActive}
                className={cn(
                  "glass-chip w-full border-primary/15 sm:w-auto",
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
      <RevealGroup className="grid gap-6" layout>
        <AnimatePresence initial={false} mode="sync">
          {visibleProjects.length ? (
            visibleProjects.map((project) => (
              <RevealItem
                animate={filteredItemVisibleState}
                exit={filteredItemExitState}
                initial={filteredItemInitialState}
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
