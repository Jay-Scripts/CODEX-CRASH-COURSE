"use client";

import { AnimatePresence, type Variants } from "framer-motion";
import { Award, Eye, FileBadge2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatedSection } from "@/components/common/animated-section";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { CertificatePreviewModal } from "@/components/sections/home/certificate-preview-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { certificates } from "@/constants/portfolio.constants";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/types/portfolio.types";
import {
  filteredItemExitState,
  smoothMotionEase,
} from "@/utils/animations.utils";

const certificateGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.12,
    },
  },
};

const certificateCardVariants: Variants = {
  hidden: (direction: number = 1) => ({
    opacity: 0,
    rotateX: 10,
    rotateZ: direction * 5,
    scale: 1.16,
    transformOrigin: "50% 50%",
    transformPerspective: 900,
    y: -28,
  }),
  visible: {
    opacity: 1,
    rotateZ: 0,
    scale: 1,
    y: 0,
    rotateX: 0,
    transformOrigin: "50% -1400px",
    transformPerspective: 1000,
    transition: {
      duration: 0.68,
      ease: smoothMotionEase,
    },
  },
};

const certificateFilters = [
  "all",
  ...new Set(certificates.map((certificate) => certificate.type)),
] as const;

type CertificateFilterValue = (typeof certificateFilters)[number];

/**
 * Displays portfolio certificates and opens them in an in-page preview modal.
 */
export const CertificatesSection = () => {
  const [activeFilter, setActiveFilter] =
    useState<CertificateFilterValue>("all");
  const [activeCertificate, setActiveCertificate] =
    useState<Certificate | null>(null);
  const [closingCertificate, setClosingCertificate] =
    useState<Certificate | null>(null);
  const visibleCertificates =
    activeFilter === "all"
      ? certificates
      : certificates.filter((certificate) => certificate.type === activeFilter);

  return (
    <AnimatedSection
      className="px-3 py-16 sm:px-6 sm:py-20 lg:px-8"
      id="certificates"
    >
      <RevealGroup className="relative mx-auto max-w-7xl">
        <SectionAccentBackdrop variant="center" />
        <RevealItem>
          <SectionHeading
            description="A collection of technical certifications, seminar credentials, and professional achievement awards that reflect my continuous learning and professional growth."
            eyebrow="Certificates"
            title="Certifications & Achievements"
          />
        </RevealItem>

        {certificates.length > 0 ? (
          <>
            <nav
              aria-label="Certificate categories"
              className="mb-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center"
            >
              <RevealGroup className="contents">
                {certificateFilters.map((filter) => {
                  const isActive = activeFilter === filter;
                  const label = filter === "all" ? "All" : filter;

                  return (
                    <RevealItem key={filter}>
                      <Button
                        aria-pressed={isActive}
                        className={cn(
                          "glass-chip w-full border-primary/15 sm:w-auto",
                          isActive &&
                            "border-primary/30 bg-primary/12 text-foreground hover:bg-primary/18",
                        )}
                        onClick={() => setActiveFilter(filter)}
                        type="button"
                        variant="outline"
                      >
                        {label}
                      </Button>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </nav>
            <p
              aria-live="polite"
              className="mb-4 text-center text-sm text-muted-foreground"
            >
              Showing {visibleCertificates.length}{" "}
              {activeFilter === "all"
                ? "certificates"
                : activeFilter.toLowerCase()}
              .
            </p>
            <RevealGroup
              className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3"
              layout
              variants={certificateGridVariants}
            >
              <AnimatePresence mode="sync">
                {visibleCertificates.map((certificate, certificateIndex) => (
                  <RevealItem
                    animate="visible"
                    custom={certificateIndex % 2 === 0 ? -1 : 1}
                    exit={filteredItemExitState}
                    initial="hidden"
                    key={`${certificate.title}-${certificate.issued}`}
                    layout="position"
                    variants={certificateCardVariants}
                  >
                    <button
                      aria-label={`Preview ${certificate.title}`}
                      className="group/certificate block h-full w-full cursor-pointer text-left"
                      onClick={() => {
                        setClosingCertificate(null);
                        setActiveCertificate(certificate);
                      }}
                      type="button"
                    >
                      <Card className="glass-interactive h-full overflow-hidden rounded-xl sm:rounded-2xl">
                        <CardContent className="flex h-full flex-col p-0">
                          {certificate.imageSrc ? (
                            <div className="relative aspect-[4/3] overflow-hidden border-b border-border/60 bg-muted/20 p-1.5 backdrop-blur-sm sm:p-3">
                              <div className="relative h-full w-full">
                                <Image
                                  alt={
                                    certificate.imageAlt ?? certificate.title
                                  }
                                  className="rounded-lg object-contain"
                                  fill
                                  sizes="(min-width: 1280px) 24rem, (min-width: 768px) 50vw, 50vw"
                                  src={certificate.imageSrc}
                                />
                              </div>
                              <span className="absolute inset-0 flex items-center justify-center bg-background/75 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/certificate:opacity-100">
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                                  <Eye className="size-3.5 text-primary" />
                                  View certificate
                                </span>
                              </span>
                            </div>
                          ) : (
                            <div className="grid aspect-[4/3] place-items-center border-b border-border/60 bg-muted/30 text-primary">
                              <FileBadge2 className="size-10" />
                            </div>
                          )}

                          <article className="flex h-full flex-col p-3 sm:p-6">
                            <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
                              <div className="min-w-0">
                                <p className="text-[10px] text-primary sm:text-sm">
                                  {certificate.issued}
                                </p>
                                <h3 className="mt-1 line-clamp-3 text-xs font-semibold leading-snug text-foreground sm:mt-2 sm:text-xl">
                                  {certificate.title}
                                </h3>
                                <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted-foreground sm:text-sm">
                                  {certificate.issuer}
                                </p>
                              </div>
                              <Badge
                                className="border-primary/20 bg-primary/10 px-1.5 py-0 text-[9px] text-primary sm:px-2.5 sm:py-0.5 sm:text-xs"
                                variant="outline"
                              >
                                {certificate.type}
                              </Badge>
                            </div>

                            {certificate.credentialId ? (
                              <p className="mt-4 hidden text-sm text-muted-foreground sm:block">
                                <span className="font-medium text-foreground">
                                  Credential ID:
                                </span>{" "}
                                {certificate.credentialId}
                              </p>
                            ) : null}

                            {certificate.skills?.length ? (
                              <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
                                {certificate.skills.map((skill) => (
                                  <Badge
                                    className="glass-chip text-muted-foreground"
                                    key={skill}
                                    variant="outline"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            ) : null}
                          </article>
                        </CardContent>
                      </Card>
                    </button>
                  </RevealItem>
                ))}
              </AnimatePresence>
            </RevealGroup>
          </>
        ) : (
          <RevealItem>
            <Card className="overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <section className="glass-inset flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="glass-chip grid size-12 shrink-0 place-items-center rounded-xl text-primary">
                      <Award className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Certificates will appear here
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                        This section is ready for your certificates, seminar
                        records, and training credentials as you continue adding
                        them to your portfolio.
                      </p>
                    </div>
                  </div>
                  <Badge
                    className="border-primary/20 bg-primary/10 text-primary"
                    variant="outline"
                  >
                    Ready for uploads
                  </Badge>
                </section>
              </CardContent>
            </Card>
          </RevealItem>
        )}
      </RevealGroup>

      <CertificatePreviewModal
        certificate={activeCertificate ?? closingCertificate}
        isOpen={Boolean(activeCertificate)}
        onClose={() => {
          setClosingCertificate(activeCertificate);
          setActiveCertificate(null);
        }}
        onExited={() => setClosingCertificate(null)}
      />
    </AnimatedSection>
  );
};
