"use client";

import { Award, Eye, FileBadge2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { certificates } from "@/constants/portfolio.constants";
import type { Certificate } from "@/types/portfolio.types";
import { AnimatedSection } from "@/components/common/animated-section";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CertificatePreviewModal } from "./certificate-preview-modal";

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
      : certificates.filter(
          (certificate) => certificate.type === activeFilter,
        );

  return (
    <AnimatedSection
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
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
              {certificateFilters.map((filter) => {
                const isActive = activeFilter === filter;
                const label = filter === "all" ? "All" : filter;

                return (
                  <Button
                    aria-pressed={isActive}
                    className={cn(
                      "w-full border-primary/15 bg-background/80 backdrop-blur-sm sm:w-auto",
                      isActive &&
                        "border-primary/30 bg-primary/12 text-foreground hover:bg-primary/18",
                    )}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    type="button"
                    variant="outline"
                  >
                    {label}
                  </Button>
                );
              })}
            </nav>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Showing {visibleCertificates.length}{" "}
              {activeFilter === "all"
                ? "certificates"
                : activeFilter.toLowerCase()}
              .
            </p>
            <RevealGroup
              animate="visible"
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
              initial="visible"
              key={activeFilter}
            >
              {visibleCertificates.map((certificate) => (
                <RevealItem key={`${certificate.title}-${certificate.issued}`}>
                <button
                  aria-label={`Preview ${certificate.title}`}
                  className="group/certificate block h-full w-full cursor-pointer text-left "
                  onClick={() => {
                    setClosingCertificate(null);
                    setActiveCertificate(certificate);
                  }}
                  type="button"
                >
                  <Card className="h-full overflow-hidden border-border/70 bg-card/95 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="flex h-full flex-col p-0">
                      {certificate.imageSrc ? (
                        <div className="relative aspect-[4/3] overflow-hidden border-b border-border/60 bg-muted/30 p-3">
                          <div className="relative h-full w-full">
                            <Image
                              alt={certificate.imageAlt ?? certificate.title}
                              className="rounded-lg object-contain"
                              fill
                              sizes="(min-width: 1280px) 24rem, (min-width: 768px) 50vw, 100vw"
                              src={certificate.imageSrc}
                              unoptimized
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

                      <article className="flex h-full flex-col p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm text-primary">
                              {certificate.issued}
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                              {certificate.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {certificate.issuer}
                            </p>
                          </div>
                          <Badge
                            className="border-primary/20 bg-primary/10 text-primary"
                            variant="outline"
                          >
                            {certificate.type}
                          </Badge>
                        </div>

                        {certificate.credentialId ? (
                          <p className="mt-4 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                              Credential ID:
                            </span>{" "}
                            {certificate.credentialId}
                          </p>
                        ) : null}

                        {certificate.skills?.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {certificate.skills.map((skill) => (
                              <Badge
                                className="border-border bg-background text-muted-foreground"
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
            </RevealGroup>
          </>
        ) : (
          <RevealItem>
            <Card className=" overflow-hidden border-border/70 bg-card/95 shadow-sm shadow-primary/5">
              <CardContent className="p-6 sm:p-8">
                <section className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-primary/25 bg-muted/20 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-primary/15 bg-background text-primary shadow-sm">
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
