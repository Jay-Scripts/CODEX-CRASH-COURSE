"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = ComponentProps<typeof motion.section>;

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
      "fluid-section surface-grid scroll-mt-24 overflow-hidden motion-safe:transition-[padding] motion-safe:duration-500",
      className,
    )}
    initial="hidden"
    variants={sectionRevealState}
    viewport={{ once: true, amount: 0.08, margin: "0px 0px -6% 0px" }}
    whileInView="visible"
    {...props}
  >
    {children}
  </motion.section>
);
