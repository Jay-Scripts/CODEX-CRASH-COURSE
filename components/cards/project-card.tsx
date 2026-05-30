import {
  Expand,
  ExternalLink,
  FileText,
  GitBranch,
  Layers,
  ListChecks,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types/portfolio.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProjectDocumentOverlay } from "./project-document-overlay";
import { ProjectFlowchartCarousel } from "./project-flowchart-carousel";

const projectCategoryLabels = {
  "cloud-hosted": "Cloud Hosted",
  qa: "QA",
  "stand-alone": "Stand Alone",
  "user-manuals": "User Manuals",
} as const;

const projectCategoryColors = {
  "cloud-hosted":
    "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  qa: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  "stand-alone":
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "user-manuals":
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
} as const;

const projectActionLabels = {
  "cloud-hosted": "Live demo",
  qa: "View project",
  "stand-alone": "Live demo",
  "user-manuals": "View manual",
} as const;

type ProjectCardProps = {
  project: Project;
};

const isImagePreview = (previewSrc: string) =>
  [".png", ".jpg", ".jpeg", ".webp", ".svg"].some((ext) =>
    previewSrc.toLowerCase().includes(ext),
  );

/**
 * Displays one recruiter-facing project card — fully responsive across mobile, tablet, and desktop.
 */
export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isDocumentOverlayOpen, setIsDocumentOverlayOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const hasPreview = Boolean(project.previewSrc);
  const hasExpandableDocumentPreview = Boolean(project.previewDialogSrc);

  return (
    <>
      <Card
        className="group overflow-hidden border border-border/60 bg-card transition-shadow duration-300 hover:shadow-md"
        id={project.id}
      >
        <article aria-labelledby={`${project.id}-title`}>
          {/* ── Preview banner ─────────────────────────────────── */}
          <div className="relative border-b border-border/60 bg-muted/40">
            {hasPreview ? (
              <div className="flex flex-col items-center gap-0">
                {/* Header bar */}
                <div className="flex w-full items-center justify-between gap-3 border-b border-border/50 bg-background/60 px-4 py-2.5 backdrop-blur-sm sm:px-5">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FileText className="size-3.5 shrink-0 text-primary" />
                    Manual cover preview
                  </span>
                  {hasExpandableDocumentPreview && (
                    <Button
                      aria-haspopup="dialog"
                      className="h-8 gap-1.5 px-3 text-xs"
                      onClick={() => setIsDocumentOverlayOpen(true)}
                      type="button"
                      variant="outline"
                    >
                      <Expand className="size-3.5" />
                      Expand
                    </Button>
                  )}
                </div>

                {/* Thumbnail */}
                <div className="flex w-full justify-center bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08),_transparent_60%)] px-6 py-6 sm:py-8">
                  <figure className="relative aspect-[3/4] w-40 overflow-hidden rounded-xl border border-border/60 bg-background shadow-[0_12px_40px_-16px_hsl(var(--foreground)/0.25)] ring-1 ring-border/40 sm:w-48">
                    {project.previewSrc &&
                    isImagePreview(project.previewSrc) ? (
                      <Image
                        alt={project.previewAlt ?? `${project.title} preview`}
                        className="object-cover object-top"
                        fill
                        priority={project.primaryCategory === "user-manuals"}
                        sizes="(min-width: 640px) 12rem, 10rem"
                        src={project.previewSrc}
                        unoptimized
                      />
                    ) : (
                      <iframe
                        aria-label={project.previewAlt}
                        className="h-full w-full bg-background"
                        src={project.previewSrc}
                        title={project.previewAlt ?? `${project.title} preview`}
                      />
                    )}
                  </figure>
                </div>

                {/* Footer bar */}
                <div className="flex w-full items-center justify-between border-t border-border/50 bg-background/60 px-4 py-2 text-xs text-muted-foreground">
                  <span>Front page cover</span>
                  <span>PDF available in fullscreen</span>
                </div>
              </div>
            ) : (
              /* Skeleton placeholder */
              <div className="flex justify-center p-6 sm:p-8">
                <div className="w-full max-w-xs rounded-xl border border-border/60 bg-background p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-2 w-20 rounded-full bg-primary/50" />
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="size-2 rounded-full bg-muted-foreground/30"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 rounded-full bg-muted" />
                    <div className="h-2.5 w-4/5 rounded-full bg-muted" />
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="h-10 rounded-lg bg-primary/8" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Card body ───────────────────────────────────────── */}
          <CardContent className="p-4 sm:p-5 lg:p-6">
            {/* Title row */}
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <h3
                className="text-xl font-semibold tracking-tight sm:text-2xl"
                id={`${project.id}-title`}
              >
                {project.title}
              </h3>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  projectCategoryColors[project.primaryCategory],
                )}
              >
                {projectCategoryLabels[project.primaryCategory]}
              </span>
            </div>

            {/* Summary */}
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>

            {/* Tech stack */}
            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="rounded-full text-xs font-normal"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Architecture + Features — side by side on sm+, stacked on mobile */}
            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              <section aria-labelledby={`${project.id}-architecture`}>
                <h4
                  className="mb-2.5 flex items-center gap-2 text-sm font-semibold"
                  id={`${project.id}-architecture`}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center ">
                    <Layers className="size-3.5 text-primary" />
                  </span>
                  Architecture highlights
                </h4>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {project.architecture.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 break-words"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby={`${project.id}-features`}>
                <h4
                  className="mb-2.5 flex items-center gap-2 text-sm font-semibold"
                  id={`${project.id}-features`}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center ">
                    <ListChecks className="size-3.5 text-primary" />
                  </span>
                  Features implemented
                </h4>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 break-words"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Flowchart carousel */}
            {project.flowchartPreviews?.length ? (
              <ProjectFlowchartCarousel previews={project.flowchartPreviews} />
            ) : null}

            {/* Collapsible details (flowchart activities + challenges) — always visible on md+ */}
            <div className="mt-4 space-y-3">
              {/* Mobile toggle */}
              <button
                className="flex w-full items-center justify-between rounded-lg border border-border/60 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted/60 md:hidden"
                onClick={() => setDetailsOpen((v) => !v)}
                type="button"
                aria-expanded={detailsOpen}
              >
                More details
                <ChevronDown
                  className={cn(
                    "size-4 text-muted-foreground transition-transform duration-200",
                    detailsOpen && "rotate-180",
                  )}
                />
              </button>

              <div
                className={cn(
                  "space-y-3",
                  "md:block",
                  detailsOpen ? "block" : "hidden",
                )}
              >
                {project.flowchartActivities?.length ? (
                  <section
                    aria-labelledby={`${project.id}-flowchart-activities`}
                    className="rounded-lg border border-border/60 bg-muted/40 p-4"
                  >
                    <h4
                      className="mb-2.5 flex items-center gap-2 text-sm font-semibold"
                      id={`${project.id}-flowchart-activities`}
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <GitBranch className="size-3.5 text-primary" />
                      </span>
                      System flowchart activities
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {project.flowchartActivities.map((activity) => (
                        <li
                          key={activity}
                          className="flex items-start gap-2 break-words"
                        >
                          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/50" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                <section
                  aria-labelledby={`${project.id}-challenges`}
                  className="rounded-lg border border-border/60 bg-muted/40 p-4"
                >
                  <h4
                    className="mb-2 text-sm font-semibold"
                    id={`${project.id}-challenges`}
                  >
                    Challenges solved
                  </h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {project.challenges.map((challenge) => (
                      <li
                        key={challenge}
                        className="flex items-start gap-2 break-words"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/50" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* CTA buttons — stack on mobile, row on sm+ */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Button
                asChild
                variant="outline"
                className="h-10 w-full gap-2 sm:w-auto"
              >
                <Link
                  href={project.githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GitBranch className="size-4 shrink-0" />
                  GitHub
                </Link>
              </Button>
              <Button asChild className="h-10 w-full gap-2 sm:w-auto">
                <Link
                  href={project.liveDemoUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="size-4 shrink-0" />
                  {projectActionLabels[project.primaryCategory]}
                </Link>
              </Button>
            </div>
          </CardContent>
        </article>
      </Card>

      {project.previewDialogSrc ? (
        <ProjectDocumentOverlay
          isOpen={isDocumentOverlayOpen}
          onClose={() => setIsDocumentOverlayOpen(false)}
          src={project.previewDialogSrc}
          title={project.title}
        />
      ) : null}
    </>
  );
};
