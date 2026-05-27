import { ExternalLink, GitBranch, Layers, ListChecks } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/portfolio.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectFlowchartCarousel } from "./project-flowchart-carousel";

type ProjectCardProps = {
  project: Project;
};

/**
 * Displays one recruiter-facing project card with architecture, features, and project links.
 */
export const ProjectCard = ({ project }: ProjectCardProps) => (
  <Card className="overflow-hidden" id={project.id}>
    <article aria-labelledby={`${project.id}-title`}>
      <div className="grid min-h-44 place-items-center border-b border-border bg-muted/50 p-4 sm:min-h-52 sm:p-6">
        <div className="w-full max-w-sm rounded-lg border border-border bg-background p-3 shadow-sm sm:p-4">
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
        </div>
      </div>
      <CardContent className="p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="text-xl font-semibold tracking-tight sm:text-2xl"
              id={`${project.id}-title`}
            >
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
          <section aria-labelledby={`${project.id}-architecture`}>
            <h4
              className="mb-3 flex items-center gap-2 text-sm font-semibold"
              id={`${project.id}-architecture`}
            >
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
          </section>
          <section aria-labelledby={`${project.id}-features`}>
            <h4
              className="mb-3 flex items-center gap-2 text-sm font-semibold"
              id={`${project.id}-features`}
            >
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
          </section>
        </div>
        {project.flowchartPreviews?.length ? (
          <ProjectFlowchartCarousel previews={project.flowchartPreviews} />
        ) : null}
        {project.flowchartActivities?.length ? (
          <section
            aria-labelledby={`${project.id}-flowchart-activities`}
            className="mt-5 rounded-lg border border-border/70 bg-muted/40 p-4"
          >
            <h4
              className="mb-3 flex items-center gap-2 text-sm font-semibold"
              id={`${project.id}-flowchart-activities`}
            >
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
          </section>
        ) : null}
        <section
          aria-labelledby={`${project.id}-challenges`}
          className="mt-5 rounded-lg border border-border/70 bg-muted/40 p-4"
        >
          <h4 className="mb-2 text-sm font-semibold" id={`${project.id}-challenges`}>
            Challenges solved
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {project.challenges.map((challenge) => (
              <li className="break-words" key={challenge}>
                {challenge}
              </li>
            ))}
          </ul>
        </section>
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
    </article>
  </Card>
);
