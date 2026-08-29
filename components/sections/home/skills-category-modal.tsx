"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TestTube2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { buttonVariants } from "@/components/ui/button";
import { skillLogoMap } from "@/constants/skill-logos.constants";
import { cn } from "@/lib/utils";
import type { SkillGroup } from "@/types/portfolio.types";

type SkillsCategoryModalProps = {
  group: SkillGroup | null;
  onClose: () => void;
};

/** Displays every tool from a selected skills category in a responsive modal. */
export const SkillsCategoryModal = ({
  group,
  onClose,
}: SkillsCategoryModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!group) {
      return undefined;
    }

    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [group, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {group ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-5"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.button
            aria-label={`Close ${group.title} tools`}
            className="absolute inset-0 cursor-pointer bg-background/80 backdrop-blur-md"
            onClick={onClose}
            tabIndex={-1}
            type="button"
          />

          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-labelledby="skills-category-modal-title"
            aria-modal="true"
            className="relative flex max-h-[70dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-2xl sm:max-h-[88dvh] sm:rounded-3xl"
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            id="skills-category-modal"
            role="dialog"
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3 sm:gap-4 sm:px-6 sm:py-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center text-primary">
                  <group.icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3
                    className="truncate text-lg font-semibold text-foreground sm:text-xl"
                    id="skills-category-modal-title"
                  >
                    {group.title}
                  </h3>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                aria-label="Close tools preview"
                className={buttonVariants({
                  className: "size-9 shrink-0",
                  size: "icon",
                  variant: "outline",
                })}
                onClick={onClose}
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </header>

            <div className="min-h-0 overflow-x-hidden overflow-y-auto bg-muted/20 p-3 sm:p-6">
              <ul className="grid grid-cols-3 gap-2 sm:gap-3">
                {group.skills.map((skillName) => {
                  const skill = skillLogoMap[skillName] ?? {};
                  const Icon = skill.icon ?? TestTube2;

                  return (
                    <li
                      className="flex min-h-16 min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-background p-2 text-center sm:min-h-24 sm:gap-3 sm:rounded-2xl sm:p-4"
                      key={skillName}
                    >
                      <span className="grid size-7 place-items-center text-primary sm:size-10">
                        {skill.logo ? (
                          <Image
                            alt=""
                            className={cn(
                              "size-4 object-contain sm:size-6",
                              skill.logoClassName,
                            )}
                            height={24}
                            loading="lazy"
                            src={skill.logo}
                            unoptimized
                            width={24}
                          />
                        ) : (
                          <Icon
                            aria-hidden="true"
                            className="size-4 sm:size-5"
                          />
                        )}
                      </span>
                      <span className="wrap-break-word text-[11px] font-medium leading-tight text-foreground sm:text-sm">
                        {skillName}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
