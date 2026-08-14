"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { defaultMotionTransition } from "@/utils/animations.utils";

type MotionProviderProps = {
  children: ReactNode;
};

/**
 * Applies consistent motion timing and reduced-motion preferences across the site.
 */
export const MotionProvider = ({ children }: MotionProviderProps) => (
  <MotionConfig reducedMotion="user" transition={defaultMotionTransition}>
    {children}
  </MotionConfig>
);
