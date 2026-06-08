"use client";
import {
  ChevronDown,
  Expand,
  ExternalLink,
  FileText,
  GitBranch,
  Layers,
  ListChecks,
  Link2,
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
import { ProjectFlowchartOverlay } from "./project-flowchart-overlay";

const projectCategoryLabels = {
  website: "Website",
  mobile: "Mobile",
  "stand-alone": "Stand Alone",
  "user-manuals": "User Manuals",
  "system-flowcharts": "System Flowchart",
} as const;

const projectActionLabels = {
  website: "Live demo",
  mobile: "Live demo",
  "stand-alone": "Live demo",
  "user-manuals": "View manual",
  "system-flowcharts": "Open diagram",
} as const;

type ProjectCardProps = {
  project: Project;
};

const isImagePreview = (previewSrc: string) =>
  [".png", ".jpg", ".jpeg", ".webp", ".svg"].some((ext) =>
    previewSrc.toLowerCase().includes(ext),
  );

/**
 * Displays one recruiter-facing project card with preview, technical highlights,
 * and project actions across mobile and desktop layouts.
 */
export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isDocumentOverlayOpen, setIsDocumentOverlayOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeFlowchartIndex, setActiveFlowchartIndex] = useState(0);
  const [isFlowchartOverlayOpen, setIsFlowchartOverlayOpen] = useState(false);
  const [isFlowchartPreviewVisible, setIsFlowchartPreviewVisible] =
    useState(false);
  const [activeDocument, setActiveDocument] = useState<{
    src: string;
    title: string;
  } | null>(null);

  const hasPreview = Boolean(project.previewSrc);
  const hasExpandableDocumentPreview = Boolean(project.previewDialogSrc);
  const hasResourceLinks = Boolean(project.resourceLinks?.length);
  const isUserManualPreview = project.primaryCategory === "user-manuals";
  const isSystemFlowchartProject =
    project.primaryCategory === "system-flowcharts" &&
    Boolean(project.flowchartPreviews?.length);
  const usesExpandedPreviewSurface =
    isUserManualPreview || isSystemFlowchartProject;
  const canOpenPreview =
    hasExpandableDocumentPreview || isSystemFlowchartProject;
  const activeFlowchartPreview = project.flowchartPreviews?.[activeFlowchartIndex];

  const openDocumentOverlay = (src: string, title: string) => {
    setActiveDocument({ src, title });
    setIsDocumentOverlayOpen(true);
  };

  const openFlowchartOverlay = (index = 0) => {
    setActiveFlowchartIndex(index);
    setIsFlowchartOverlayOpen(true);
  };

  const closeDocumentOverlay = () => {
    setIsDocumentOverlayOpen(false);
    setActiveDocument(null);
  };

  const closeFlowchartOverlay = () => {
    setIsFlowchartOverlayOpen(false);
  };

  const showPreviousFlowchart = () => {
    if (!project.flowchartPreviews?.length) {
      return;
    }

    setActiveFlowchartIndex((currentIndex) =>
      currentIndex === 0
        ? project.flowchartPreviews!.length - 1
        : currentIndex - 1,
    );
  };

  const showNextFlowchart = () => {
    if (!project.flowchartPreviews?.length) {
      return;
    }

    setActiveFlowchartIndex((currentIndex) =>
      currentIndex === project.flowchartPreviews!.length - 1
        ? 0
        : currentIndex + 1,
    );
  };

  return (
    <>
      <Card
        className="group overflow-hidden border border-border/50 bg-card transition-all duration-300 hover:border-border/80 hover:shadow-lg hover:shadow-black/20"
        id={project.id}
      >
        <article
          aria-labelledby={`${project.id}-title`}
          className="lg:grid lg:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)]"
        >
          {/* ── Preview column ── */}
          <div className="flex flex-col border-b border-border/40 bg-muted/20 lg:border-b-0 lg:border-r lg:border-border/40">
            {hasPreview ? (
              <>
                {/* top bar */}
                <div className="flex items-center gap-2 border-b border-border/30 px-4 py-2.5">
                  <span className="flex items-center gap-1.5 text-[11px] tracking-wide text-muted-foreground/60 uppercase">
                    <FileText className="size-3 shrink-0 text-primary/50" />
                    Document preview
                  </span>
                </div>

                {/* thumbnail */}
                <div
                  className={cn(
                    "flex flex-1 items-stretch justify-stretch px-6 py-8",
                    usesExpandedPreviewSurface && "px-4 py-4",
                  )}
                >
                  {canOpenPreview ? (
                    <button
                      aria-haspopup="dialog"
                      className={cn(
                        "group/thumb relative h-full overflow-hidden rounded-xl border border-border/50 bg-background/80 shadow-md transition-all duration-200 hover:scale-[1.02] hover:border-border/80 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                        isSystemFlowchartProject
                          ? "min-h-[20rem] w-full flex-1 lg:min-h-[24rem]"
                          : usesExpandedPreviewSurface
                            ? "aspect-[3/4] w-full"
                            : "aspect-[3/4] w-36 sm:w-40",
                      )}
                      onClick={() => {
                        if (isSystemFlowchartProject) {
                          openFlowchartOverlay();
                          return;
                        }

                        openDocumentOverlay(
                          project.previewDialogSrc!,
                          project.title,
                        );
                      }}
                      type="button"
                    >
                      {project.previewSrc &&
                      isImagePreview(project.previewSrc) ? (
                        <Image
                          alt={project.previewAlt ?? `${project.title} preview`}
                          className={cn(
                            isSystemFlowchartProject
                              ? "object-contain p-3"
                              : "object-cover object-top",
                          )}
                          fill
                          priority={project.primaryCategory === "user-manuals"}
                          sizes="(min-width: 640px) 10rem, 9rem"
                          src={project.previewSrc}
                          unoptimized
                        />
                      ) : (
                        <iframe
                          aria-label={project.previewAlt}
                          className="h-full w-full bg-background"
                          src={project.previewSrc}
                          title={
                            project.previewAlt ?? `${project.title} preview`
                          }
                        />
                      )}
                      {isUserManualPreview || isSystemFlowchartProject ? (
                        <span className="absolute inset-0 flex items-center justify-center bg-background/75 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/thumb:opacity-100">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                            <Expand className="size-3.5 text-primary" />
                            {isSystemFlowchartProject
                              ? "View flowchart"
                              : "View manual"}
                          </span>
                        </span>
                      ) : null}
                    </button>
                  ) : (
                    <figure
                      className={cn(
                        "relative h-full overflow-hidden rounded-xl border border-border/50 bg-background/80 shadow-md",
                        isSystemFlowchartProject
                          ? "min-h-[20rem] w-full flex-1 lg:min-h-[24rem]"
                          : usesExpandedPreviewSurface
                            ? "aspect-[3/4] w-full"
                            : "aspect-[3/4] w-36 sm:w-40",
                      )}
                    >
                      {project.previewSrc &&
                      isImagePreview(project.previewSrc) ? (
                        <Image
                          alt={project.previewAlt ?? `${project.title} preview`}
                          className={cn(
                            isSystemFlowchartProject
                              ? "object-contain p-3"
                              : "object-cover object-top",
                          )}
                          fill
                          priority={project.primaryCategory === "user-manuals"}
                          sizes="(min-width: 640px) 10rem, 9rem"
                          src={project.previewSrc}
                          unoptimized
                        />
                      ) : (
                        <iframe
                          aria-label={project.previewAlt}
                          className="h-full w-full bg-background"
                          src={project.previewSrc}
                          title={
                            project.previewAlt ?? `${project.title} preview`
                          }
                        />
                      )}
                    </figure>
                  )}
                </div>

                {/* bottom bar */}
                <div className="flex items-center justify-between border-t border-border/30 px-4 py-2 text-[10px] text-muted-foreground/40">
                  <span>Front page</span>
                  <span>
                    {isSystemFlowchartProject
                      ? "Diagram in fullscreen"
                      : "PDF in fullscreen"}
                  </span>
                </div>
              </>
            ) : (
              /* skeleton placeholder when no preview */
              <div className="flex h-full items-center justify-center p-6 sm:p-8">
                <div className="w-full max-w-[11rem] rounded-xl border border-border/40 bg-background/60 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-1.5 w-16 rounded-full bg-primary/30" />
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="size-1.5 rounded-full bg-muted-foreground/20"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-muted/60" />
                    <div className="h-2 w-4/5 rounded-full bg-muted/60" />
                    <div className="mt-3 grid grid-cols-3 gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-8 rounded-lg bg-primary/5"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Content column ── */}
          <CardContent className="flex flex-col gap-4 p-5 sm:p-6 lg:p-7">

            {/* title + category */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3
                className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
                id={`${project.id}-title`}
              >
                {project.title}
              </h3>
              <span className="inline-flex shrink-0 items-center rounded-full border border-primary/20 bg-primary/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                {projectCategoryLabels[project.primaryCategory]}
              </span>
            </div>

            {/* summary */}
            <p className="text-sm leading-relaxed text-muted-foreground/70">
              {project.summary}
            </p>

            {/* tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  className="rounded-md border-border/40 bg-muted/30 text-[10.5px] font-normal text-muted-foreground/60 hover:bg-muted/50"
                  variant="outline"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="h-px bg-border/30" />

            {/* resource links */}
            {hasResourceLinks ? (
              <section aria-labelledby={`${project.id}-resource-links`}>
                <h4
                  className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50"
                  id={`${project.id}-resource-links`}
                >
                  <Link2 className="size-3 text-primary/50" />
                  Project files
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.resourceLinks?.map((resource) => (
                    <Button
                      key={resource.href}
                      className="h-7 gap-1.5 rounded-lg border-border/40 bg-muted/20 px-3 text-xs text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground"
                      onClick={() =>
                        openDocumentOverlay(
                          `${resource.href}#page=1&view=FitH`,
                          `${project.title} - ${resource.label}`,
                        )
                      }
                      type="button"
                      variant="outline"
                    >
                      <FileText className="size-3 shrink-0" />
                      {resource.label}
                    </Button>
                  ))}
                </div>
              </section>
            ) : null}

            {/* architecture + features */}
            <div className="grid gap-5 sm:grid-cols-2">
              <section aria-labelledby={`${project.id}-architecture`}>
                <h4
                  className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50"
                  id={`${project.id}-architecture`}
                >
                  <Layers className="size-3 text-primary/50" />
                  Architecture
                </h4>
                <ul className="space-y-1.5">
                  {project.architecture.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground/60">
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby={`${project.id}-features`}>
                <h4
                  className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50"
                  id={`${project.id}-features`}
                >
                  <ListChecks className="size-3 text-primary/50" />
                  Features
                </h4>
                <ul className="space-y-1.5">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground/60">
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary/40" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* flowchart toggle */}
            {project.flowchartPreviews?.length ? (
              <>
                <div className="h-px bg-border/30" />
                <section>
                  <button
                    aria-expanded={isFlowchartPreviewVisible}
                    className="flex w-full items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-3.5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border/60 hover:bg-muted/30 hover:text-foreground"
                    onClick={() => setIsFlowchartPreviewVisible((v) => !v)}
                    type="button"
                  >
                    <span className="flex items-center gap-2">
                      <GitBranch className="size-3.5 shrink-0 text-primary/50" />
                      {isFlowchartPreviewVisible
                        ? "Hide flowchart preview"
                        : "View system flowchart"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-3.5 text-muted-foreground/50 transition-transform duration-200",
                        isFlowchartPreviewVisible && "rotate-180",
                      )}
                    />
                  </button>
                  {isFlowchartPreviewVisible ? (
                    <div className="mt-3">
                      <ProjectFlowchartCarousel previews={project.flowchartPreviews} />
                    </div>
                  ) : null}
                </section>
              </>
            ) : null}

            {/* more details (mobile toggle) */}
            <div className="space-y-3">
              <button
                aria-expanded={detailsOpen}
                className="flex w-full items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-3.5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border/60 hover:bg-muted/30 hover:text-foreground md:hidden"
                onClick={() => setDetailsOpen((v) => !v)}
                type="button"
              >
                More details
                <ChevronDown
                  className={cn(
                    "size-3.5 text-muted-foreground/50 transition-transform duration-200",
                    detailsOpen && "rotate-180",
                  )}
                />
              </button>

              <div className={cn("space-y-3", "md:block", detailsOpen ? "block" : "hidden")}>
                {project.flowchartActivities?.length ? (
                  <section
                    aria-labelledby={`${project.id}-flowchart-activities`}
                    className="rounded-lg border border-border/40 bg-muted/20 p-4"
                  >
                    <h4
                      className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50"
                      id={`${project.id}-flowchart-activities`}
                    >
                      <GitBranch className="size-3 text-primary/50" />
                      Flowchart activities
                    </h4>
                    <ul className="space-y-1.5">
                      {project.flowchartActivities.map((activity) => (
                        <li key={activity} className="flex items-start gap-2 text-sm text-muted-foreground/60">
                          <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary/40" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                <section
                  aria-labelledby={`${project.id}-challenges`}
                  className="rounded-lg border border-border/40 bg-muted/20 p-4"
                >
                  <h4
                    className="mb-2.5 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50"
                    id={`${project.id}-challenges`}
                  >
                    Challenges solved
                  </h4>
                  <ul className="space-y-1.5">
                    {project.challenges.map((challenge) => (
                      <li key={challenge} className="flex items-start gap-2 text-sm text-muted-foreground/60">
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary/40" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* action buttons */}
            <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row">
              <Button
                asChild
                className="h-9 w-full gap-2 rounded-lg border-border/40 bg-muted/20 text-xs font-medium text-muted-foreground hover:border-border/60 hover:bg-muted/40 hover:text-foreground sm:w-auto sm:px-5"
                variant="outline"
              >
                <Link href={project.githubUrl} rel="noopener noreferrer" target="_blank">
                  <GitBranch className="size-3.5 shrink-0" />
                  GitHub
                </Link>
              </Button>
              <Button
                asChild
                className="h-9 w-full gap-2 rounded-lg text-xs font-medium sm:w-auto sm:px-5"
              >
                <Link href={project.liveDemoUrl} rel="noopener noreferrer" target="_blank">
                  <ExternalLink className="size-3.5 shrink-0" />
                  {projectActionLabels[project.primaryCategory]}
                </Link>
              </Button>
            </div>
          </CardContent>
        </article>
      </Card>

      {activeDocument ? (
        <ProjectDocumentOverlay
          documentLayout={project.documentLayout}
          isOpen={isDocumentOverlayOpen}
          onClose={closeDocumentOverlay}
          src={activeDocument.src}
          title={activeDocument.title}
        />
      ) : null}

      {project.flowchartPreviews?.length && activeFlowchartPreview ? (
        <ProjectFlowchartOverlay
          activePreview={activeFlowchartPreview}
          currentIndex={activeFlowchartIndex}
          isOpen={isFlowchartOverlayOpen}
          onClose={closeFlowchartOverlay}
          onNext={showNextFlowchart}
          onPrevious={showPreviousFlowchart}
          total={project.flowchartPreviews.length}
        />
      ) : null}
    </>
  );
};
