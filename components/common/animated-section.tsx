"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { InteractiveConstellation } from "@/components/common/interactive-constellation";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = Omit<
  HTMLMotionProps<"section">,
  "children"
> & {
  children?: ReactNode;
};

const sectionRevealState = {
  hidden: {},
  visible: {},
};

/**
 * Displays a reusable motion-powered section wrapper with viewport reveal and a shared grid background.
 */
export const AnimatedSection = ({
  children,
  className,
  ...props
}: AnimatedSectionProps) => (
  <motion.section
    className={cn(
      "fluid-section surface-grid min-h-[100svh] scroll-mt-24 overflow-hidden motion-safe:transition-[padding] motion-safe:duration-500",
      className,
    )}
    initial="hidden"
    variants={sectionRevealState}
    viewport={{ once: true, amount: 0.08, margin: "0px 0px -6% 0px" }}
    whileInView="visible"
    {...props}
  >
    <InteractiveConstellation className="z-[1] opacity-70 dark:opacity-85" />
    {children}
  </motion.section>
);
