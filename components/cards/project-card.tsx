"use client";
import {
  Award,
  ChevronDown,
  Expand,
  Eye,
  ExternalLink,
  FileText,
  GitBranch,
  Layers,
  ListChecks,
  Link2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project, ProjectCategory } from "@/types/portfolio.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProjectDocumentOverlay } from "./project-document-overlay";
import { ProjectFlowchartOverlay } from "./project-flowchart-overlay";
import { ProjectRecognitionModal } from "./project-recognition-modal";
import { ProjectPreviewGalleryModal } from "./project-preview-gallery-modal";
import { ProjectSystemPreviewModal } from "./project-system-preview-modal";

const projectCategoryLabels: Record<ProjectCategory, string> = {
  pos: "POS",
  "booking-&-reservation": "Booking & Reservation",
  "ai-chat-bot": "AI Chatbot",
  website: "Website",
  android: "Android",
  mobile: "Mobile",
  "stand-alone": "Stand Alone",
  "user-manuals": "User Manuals",
  "system-flowcharts": "System Flowchart",
};

const projectActionLabels: Record<ProjectCategory, string> = {
  pos: "Live demo",
  "booking-&-reservation": "Live demo",
  "ai-chat-bot": "Live demo",
  website: "Live demo",
  android: "Live demo",
  mobile: "Live demo",
  "stand-alone": "Live demo",
  "user-manuals": "View manual",
  "system-flowcharts": "Open diagram",
};

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
  const [isRecognitionPreviewOpen, setIsRecognitionPreviewOpen] =
    useState(false);
  const [isSystemPreviewOpen, setIsSystemPreviewOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState<{
    src: string;
    title: string;
  } | null>(null);

  const hasPreview = Boolean(project.previewSrc);
  const hasExpandableDocumentPreview = Boolean(project.previewDialogSrc);
  const hasResourceLinks = Boolean(project.resourceLinks?.length);
  const hasPreviewGallery = Boolean(project.previewImages?.length);
  const isUserManualPreview = project.primaryCategory === "user-manuals";
  const isSystemFlowchartProject =
    project.primaryCategory === "system-flowcharts" &&
    Boolean(project.flowchartPreviews?.length);
  const hidePrimaryActions =
    project.id === "smart-pos-system-flowchart" || isUserManualPreview;
  const hasRecognitionPreview = Boolean(project.recognitionPreviewSrc);
  const hasSystemPreview = Boolean(project.systemPreviewSrc);
  const previewOverlayLabel = isSystemFlowchartProject
    ? "View flowchart"
    : hasPreviewGallery
      ? "View previews"
      : "View manual";
  const previewTriggerLabel = isSystemFlowchartProject
    ? `${project.title} flowchart preview`
    : hasPreviewGallery
      ? `${project.title} preview images`
      : `${project.title} manual preview`;
  const canOpenPreview =
    hasExpandableDocumentPreview ||
    isSystemFlowchartProject ||
    hasPreviewGallery;
  const activeFlowchartPreview =
    project.flowchartPreviews?.[activeFlowchartIndex];
  const usesLandscapePreview = project.previewLayout === "landscape";
  const hasResponsiveCover = Boolean(
    project.previewDesktopSrc && project.previewCompactSrc,
  );
  const usesExpandedPreviewSurface =
    !hasResponsiveCover &&
    (project.previewSurface === "expanded" ||
      isUserManualPreview ||
      isSystemFlowchartProject);
  const [isPreviewGalleryOpen, setIsPreviewGalleryOpen] = useState(false);
  const previewFrameClassName = cn(
    "lg:aspect-auto lg:min-h-[34rem] lg:w-full lg:max-w-none",
    isSystemFlowchartProject
      ? "min-h-[20rem] w-full flex-1"
      : hasResponsiveCover
        ? "aspect-video w-full"
        : usesExpandedPreviewSurface
          ? "aspect-[3/4] w-full"
          : usesLandscapePreview
            ? "aspect-video w-full max-w-none"
            : "mx-auto aspect-[3/4] w-full max-w-60 sm:w-40",
  );
  const previewImageClassName = cn(
    isSystemFlowchartProject
      ? "object-contain p-3"
      : usesLandscapePreview
        ? "object-cover object-center"
        : "object-cover object-top",
  );

  const renderPreviewMedia = () => {
    if (hasResponsiveCover) {
      return (
        <>
          <Image
            alt={project.previewAlt ?? `${project.title} preview`}
            className="object-cover object-center lg:hidden"
            fill
            sizes="(min-width: 640px) 48rem, 100vw"
            src={project.previewCompactSrc!}
          />
          <Image
            alt={project.previewAlt ?? `${project.title} preview`}
            className="hidden object-cover object-center lg:block"
            fill
            sizes="24rem"
            src={project.previewDesktopSrc!}
          />
        </>
      );
    }

    if (project.previewSrc && isImagePreview(project.previewSrc)) {
      return (
        <Image
          alt={project.previewAlt ?? `${project.title} preview`}
          className={previewImageClassName}
          fill
          sizes={
            usesLandscapePreview
              ? "(min-width: 1280px) 42rem, (min-width: 1024px) 34rem, 100vw"
              : "(min-width: 640px) 10rem, 9rem"
          }
          src={project.previewSrc}
        />
      );
    }

    return (
      <iframe
        aria-label={project.previewAlt}
        className="h-full w-full bg-background"
        src={project.previewSrc}
        title={project.previewAlt ?? `${project.title} preview`}
      />
    );
  };

  const openDocumentOverlay = (src: string, title: string) => {
    setActiveDocument({ src, title });
    setIsDocumentOverlayOpen(true);
  };

  const openFlowchartOverlay = (index = 0) => {
    setActiveFlowchartIndex(index);
    setIsFlowchartOverlayOpen(true);
  };

  const openPreviewGallery = () => {
    setIsPreviewGalleryOpen(true);
  };

  const closeDocumentOverlay = () => {
    setIsDocumentOverlayOpen(false);
  };

  const closeFlowchartOverlay = () => {
    setIsFlowchartOverlayOpen(false);
  };

  const closePreviewGallery = () => {
    setIsPreviewGalleryOpen(false);
  };

  const openRecognitionPreview = () => {
    setIsRecognitionPreviewOpen(true);
  };

  const closeRecognitionPreview = () => {
    setIsRecognitionPreviewOpen(false);
  };

  const openSystemPreview = () => {
    setIsSystemPreviewOpen(true);
  };

  const closeSystemPreview = () => {
    setIsSystemPreviewOpen(false);
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

  useEffect(() => {
    if (isDocumentOverlayOpen || !activeDocument) {
      return undefined;
    }

    const clearDocumentTimer = window.setTimeout(() => {
      setActiveDocument(null);
    }, 220);

    return () => {
      window.clearTimeout(clearDocumentTimer);
    };
  }, [activeDocument, isDocumentOverlayOpen]);

  return (
    <>
      <Card
        className="glass-interactive group overflow-hidden rounded-xl sm:rounded-2xl"
        id={project.id}
      >
        <article
          aria-labelledby={`${project.id}-title`}
          className="lg:grid lg:grid-cols-[minmax(20rem,24rem)_minmax(0,1fr)]"
          data-fd-id="project-card"
        >
          {/* ── Preview column ── */}
          <div className="flex flex-col border-b border-border/40 bg-muted/20 lg:border-b-0 lg:border-r lg:border-border/40">
            {hasPreview ? (
              <>
                {/* top bar */}
                <div className="flex items-center gap-2 border-b border-border/30 px-3 py-2 sm:px-4 sm:py-2.5">
                  <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                    <FileText className="size-3 shrink-0 text-primary" />
                    Project preview
                  </span>
                </div>

                {/* thumbnail */}
                <div
                  className="flex flex-1 items-stretch justify-stretch px-3 py-4 sm:px-4 lg:p-4"
                  data-fd-id="project-card-media"
                >
                  {canOpenPreview ? (
                    <button
                      aria-haspopup="dialog"
                      aria-label={previewTriggerLabel}
                      className={cn(
                        "group/thumb relative h-full cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-background/80 shadow-md transition-all duration-200 hover:scale-[1.02] hover:border-border/80 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                        previewFrameClassName,
                      )}
                      onClick={() => {
                        if (isSystemFlowchartProject) {
                          openFlowchartOverlay();
                          return;
                        }

                        if (hasPreviewGallery) {
                          openPreviewGallery();
                          return;
                        }

                        openDocumentOverlay(
                          project.previewDialogSrc!,
                          project.title,
                        );
                      }}
                      type="button"
                    >
                      {renderPreviewMedia()}
                      {isUserManualPreview || isSystemFlowchartProject ? (
                        <span className="absolute inset-0 flex items-center justify-center bg-background/75 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/thumb:opacity-100">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                            <Expand className="size-3.5 text-primary" />
                            {previewOverlayLabel}
                          </span>
                        </span>
                      ) : hasPreviewGallery ? (
                        <span className="absolute inset-0 flex items-center justify-center bg-background/75 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/thumb:opacity-100">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                            <Expand className="size-3.5 text-primary" />
                            {previewOverlayLabel}
                          </span>
                        </span>
                      ) : null}
                    </button>
                  ) : (
                    <figure
                      className={cn(
                        "relative h-full overflow-hidden rounded-xl border border-border/50 bg-background/80 shadow-md",
                        previewFrameClassName,
                      )}
                    >
                      {renderPreviewMedia()}
                    </figure>
                  )}
                </div>

                {/* bottom bar */}
                <div className="flex items-center justify-center border-t border-border/30 px-3 py-1.5 text-[10px] text-muted-foreground sm:px-4 sm:py-2">
                  <span>Click to See Previews</span>
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
                        <div key={i} className="h-8 rounded-lg bg-primary/5" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Content column ── */}
          <CardContent
            className="flex flex-col gap-3 p-3.5 sm:gap-4 sm:p-6 lg:p-7"
            data-fd-id="project-card-content"
          >
            {/* title + category */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3
                className="text-base font-semibold tracking-tight text-foreground sm:text-xl"
                id={`${project.id}-title`}
              >
                {project.title}
              </h3>
              <span className="inline-flex shrink-0 items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                {projectCategoryLabels[project.primaryCategory]}
              </span>
            </div>

            {project.projectBadges?.length ? (
              <div className="flex flex-wrap gap-1.5">
                {project.projectBadges.map((badge) => (
                  <Badge
                    className="rounded-md border-primary/20 bg-primary/10 text-[10.5px] font-medium text-primary"
                    key={badge}
                    variant="outline"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            ) : null}

            {/* summary */}
            <p className="text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-relaxed">
              {project.summary}
            </p>

            {/* tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  className="rounded-md border-border/50 bg-muted/50 text-[10.5px] font-normal text-foreground hover:bg-muted/70"
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
                  className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-foreground"
                  id={`${project.id}-resource-links`}
                >
                  <Link2 className="size-3 text-primary" />
                  Project files
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.resourceLinks?.map((resource) => (
                    <Button
                      key={resource.href}
                      className="h-7 gap-1.5 rounded-lg border-border/50 bg-muted/40 px-3 text-xs text-foreground hover:border-border/70 hover:bg-muted/60"
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
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <section aria-labelledby={`${project.id}-architecture`}>
                <h4
                  className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-foreground"
                  id={`${project.id}-architecture`}
                >
                  <Layers className="size-3 text-primary" />
                  Architecture
                </h4>
                <ul className="space-y-1.5">
                  {project.architecture.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-xs leading-5 text-muted-foreground sm:gap-2 sm:text-sm"
                    >
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby={`${project.id}-features`}>
                <h4
                  className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-foreground"
                  id={`${project.id}-features`}
                >
                  <ListChecks className="size-3 text-primary" />
                  Features
                </h4>
                <ul className="space-y-1.5">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-1.5 text-xs leading-5 text-muted-foreground sm:gap-2 sm:text-sm"
                    >
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary/40" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* more details (mobile toggle) */}
            <div className="space-y-3">
              <button
                aria-expanded={detailsOpen}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border/50 bg-muted/40 px-3.5 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-border/70 hover:bg-muted/60 md:hidden"
                onClick={() => setDetailsOpen((v) => !v)}
                type="button"
              >
                More details
                <ChevronDown
                  className={cn(
                    "size-3.5 text-muted-foreground transition-transform duration-200",
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
                    className="glass-inset rounded-xl p-4"
                  >
                    <h4
                      className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-foreground"
                      id={`${project.id}-flowchart-activities`}
                    >
                      <GitBranch className="size-3 text-primary" />
                      Flowchart activities
                    </h4>
                    <ul className="space-y-1.5">
                      {project.flowchartActivities.map((activity) => (
                        <li
                          key={activity}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary/40" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                <section
                  aria-labelledby={`${project.id}-challenges`}
                  className="glass-inset rounded-xl p-4"
                >
                  <h4
                    className="mb-2.5 text-[10.5px] font-semibold uppercase tracking-widest text-foreground"
                    id={`${project.id}-challenges`}
                  >
                    Challenges solved
                  </h4>
                  <ul className="space-y-1.5">
                    {project.challenges.map((challenge) => (
                      <li
                        key={challenge}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary/40" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* action buttons */}
            {!hidePrimaryActions ? (
              <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  className="h-9 w-full gap-2 rounded-lg border-border/50 bg-muted/40 text-xs font-medium text-foreground hover:border-border/70 hover:bg-muted/60 sm:w-auto sm:px-5"
                  variant="outline"
                >
                  <Link
                    href={project.githubUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <GitBranch className="size-3.5 shrink-0" />
                    GitHub
                  </Link>
                </Button>
                {hasSystemPreview ? (
                  <Button
                    className="h-9 w-full gap-2 rounded-lg text-xs font-medium sm:w-auto sm:px-5"
                    onClick={openSystemPreview}
                    type="button"
                  >
                    <Eye className="size-3.5 shrink-0" />
                    View system preview
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="h-9 w-full gap-2 rounded-lg text-xs font-medium sm:w-auto sm:px-5"
                  >
                    <Link
                      href={project.liveDemoUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <ExternalLink className="size-3.5 shrink-0" />
                      {projectActionLabels[project.primaryCategory]}
                    </Link>
                  </Button>
                )}
                {hasRecognitionPreview ? (
                  <Button
                    className="h-9 w-full gap-2 rounded-lg border-border/50 bg-muted/40 text-xs font-medium text-foreground hover:border-border/70 hover:bg-muted/60 sm:w-auto sm:px-5"
                    onClick={openRecognitionPreview}
                    type="button"
                    variant="outline"
                  >
                    <Award className="size-3.5 shrink-0" />
                    View recognition
                  </Button>
                ) : null}
              </div>
            ) : null}
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

      {hasRecognitionPreview ? (
        <ProjectRecognitionModal
          isOpen={isRecognitionPreviewOpen}
          onClose={closeRecognitionPreview}
          project={project}
        />
      ) : null}

      {hasPreviewGallery ? (
        <ProjectPreviewGalleryModal
          isOpen={isPreviewGalleryOpen}
          onClose={closePreviewGallery}
          project={project}
        />
      ) : null}

      {hasSystemPreview ? (
        <ProjectSystemPreviewModal
          isOpen={isSystemPreviewOpen}
          onClose={closeSystemPreview}
          project={project}
        />
      ) : null}
    </>
  );
};
