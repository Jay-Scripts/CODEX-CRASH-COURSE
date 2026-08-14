"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { smoothMotionEase } from "@/utils/animations.utils";

const staggerGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const revealItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: smoothMotionEase,
    },
  },
};

type RevealGroupProps = ComponentProps<typeof motion.div>;

/**
 * Displays a motion container that staggers its child reveal animations.
 */
export const RevealGroup = ({
  children,
  className,
  variants = staggerGroupVariants,
  ...props
}: RevealGroupProps) => (
  <motion.div
    className={cn(
      "motion-safe:transition-[gap] motion-safe:duration-500",
      className,
    )}
    variants={variants}
    {...props}
  >
    {children}
  </motion.div>
);

type RevealItemProps = ComponentProps<typeof motion.div>;

/**
 * Displays one smoothly animated scroll-reveal item within a section.
 */
export const RevealItem = ({
  children,
  className,
  variants = revealItemVariants,
  ...props
}: RevealItemProps) => (
  <motion.div className={cn(className)} variants={variants} {...props}>
    {children}
  </motion.div>
);
