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
import { Card, CardContent } from "@/components/ui/card";
import { CertificatePreviewModal } from "./certificate-preview-modal";

/**
 * Displays portfolio certificates and opens them in an in-page preview modal.
 */
export const CertificatesSection = () => {
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(
    null,
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
            description="Certifications, training records, and formal learning credentials that support my development and technical growth."
            eyebrow="Certificates"
            title="Professional certificates and training milestones"
          />
        </RevealItem>

        {certificates.length > 0 ? (
          <RevealGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {certificates.map((certificate) => (
              <RevealItem key={`${certificate.title}-${certificate.issued}`}>
                <button
                  aria-label={`Preview ${certificate.title}`}
                  className="block h-full w-full text-left"
                  onClick={() => setActiveCertificate(certificate)}
                  type="button"
                >
                  <Card className="h-full overflow-hidden border-border/70 bg-card/95 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="flex h-full flex-col p-0">
                      {certificate.imageSrc ? (
                        <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-muted/30">
                          <Image
                            alt={certificate.imageAlt ?? certificate.title}
                            className="object-cover"
                            fill
                            sizes="(min-width: 1280px) 24rem, (min-width: 768px) 50vw, 100vw"
                            src={certificate.imageSrc}
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="grid aspect-[16/10] place-items-center border-b border-border/60 bg-muted/30 text-primary">
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

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                          Preview certificate
                          <Eye className="size-4" />
                        </div>
                      </article>
                    </CardContent>
                  </Card>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <RevealItem>
            <Card className="overflow-hidden border-border/70 bg-card/95 shadow-sm shadow-primary/5">
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
        certificate={activeCertificate}
        onClose={() => setActiveCertificate(null)}
      />
    </AnimatedSection>
  );
};
