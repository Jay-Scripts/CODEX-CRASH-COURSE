"use client";

import { ExternalLink, GitBranch, Layers, ListChecks } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project, ProjectCategory } from "@/types/portfolio.types";
import { ProjectFlowchartCarousel } from "./project-flowchart-carousel";
import { RevealGroup, RevealItem } from "./scroll-reveal";

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
            <Card className="overflow-hidden" id={project.id}>
              <div className="grid min-h-44 place-items-center border-b border-border bg-muted/50 p-4 sm:min-h-52 sm:p-6">
                <Card className="w-full max-w-sm bg-background shadow-sm">
                  <CardContent className="p-3 sm:p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="h-2.5 w-24 rounded bg-primary/70" />
                      <div className="flex gap-1.5">
                        <div className="size-2 rounded-full bg-muted-foreground/40" />
                        <div className="size-2 rounded-full bg-muted-foreground/40" />
                        <div className="size-2 rounded-full bg-muted-foreground/40" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="h-3 rounded bg-muted" />
                      <div className="h-3 w-5/6 rounded bg-muted" />
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="h-12 rounded-md bg-primary/10" />
                        <div className="h-12 rounded-md bg-primary/10" />
                        <div className="h-12 rounded-md bg-primary/10" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {project.summary}
                    </p>
                  </div>
                  <Badge variant="secondary">{project.category}</Badge>
                </div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <Layers className="size-4 text-primary" />
                      Architecture highlights
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.architecture.map((item) => (
                        <li className="break-words" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <ListChecks className="size-4 text-primary" />
                      Features implemented
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.features.map((feature) => (
                        <li className="break-words" key={feature}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {project.flowchartPreviews?.length ? (
                  <ProjectFlowchartCarousel previews={project.flowchartPreviews} />
                ) : null}
                {project.flowchartActivities?.length ? (
                  <Card className="mt-5 bg-muted/40 shadow-none">
                    <CardContent className="p-4">
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                        <GitBranch className="size-4 text-primary" />
                        System flowchart activities
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {project.flowchartActivities.map((activity) => (
                          <li className="break-words" key={activity}>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ) : null}
                <Card className="mt-5 bg-muted/40 shadow-none">
                  <CardContent className="p-4">
                    <h4 className="mb-2 text-sm font-semibold">
                      Challenges solved
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.challenges.map((challenge) => (
                        <li className="break-words" key={challenge}>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="outline">
                    <Link
                      href={project.githubUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <GitBranch />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link
                      href={project.liveDemoUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink />
                      Live demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </RevealGroup>
  );
};
