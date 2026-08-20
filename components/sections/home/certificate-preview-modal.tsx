"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Certificate } from "@/types/portfolio.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CertificatePreviewModalProps = {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
};

/**
 * Displays a fullscreen in-page certificate preview without leaving the portfolio.
 */
export const CertificatePreviewModal = ({
  certificate,
  isOpen,
  onClose,
  onExited,
}: CertificatePreviewModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!certificate || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence onExitComplete={onExited}>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-4 md:p-6"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.button
            animate={{ opacity: 1 }}
            aria-label="Close certificate preview"
            className="absolute inset-0 cursor-pointer bg-background/85 backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            tabIndex={-1}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            type="button"
          />

          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-label={`${certificate.title} preview`}
            aria-modal="true"
            className="relative flex h-[70dvh] w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl sm:h-[calc(100dvh-2rem)] sm:max-w-6xl"
            exit={{ opacity: 0, scale: 0.98, y: 24 }}
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            role="dialog"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                  {certificate.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{certificate.issuer}</span>
                  <span className="hidden sm:inline">/</span>
                  <span>{certificate.issued}</span>
                </div>
              </div>
              <Button
                aria-label="Close preview"
                className="size-8 cursor-pointer"
                onClick={onClose}
                size="icon"
                type="button"
                variant="outline"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-muted/30 p-2 sm:p-5">
              <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:gap-4">
                <div className="rounded-2xl border border-border/60 bg-background p-2 shadow-xl sm:p-4">
                  {certificate.imageSrc ? (
                    <div className="flex justify-center">
                      <Image
                        alt={certificate.imageAlt ?? certificate.title}
                        className="h-auto max-h-[42dvh] w-auto max-w-full rounded-xl object-contain sm:max-h-[65dvh]"
                        height={1200}
                        src={certificate.imageSrc}
                        width={1600}
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/30 px-4 text-center text-sm text-muted-foreground sm:min-h-80 sm:px-6">
                      No certificate image has been added for this entry yet.
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-border/60 bg-background p-3 shadow-sm sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-primary">
                        {certificate.issued}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
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
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
