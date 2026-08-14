import type { Transition } from "framer-motion";

/**
 * Provides the shared easing curve used by site-wide entrance and layout motion.
 */
export const smoothMotionEase = [0.22, 1, 0.36, 1] as const;

/**
 * Provides a restrained default transition for motion-enabled interface elements.
 */
export const defaultMotionTransition: Transition = {
  duration: 0.42,
  ease: smoothMotionEase,
};

/**
 * Provides coordinated layout, transform, and opacity timings for responsive reflow.
 */
export const responsiveLayoutTransition: Transition = {
  duration: 0.38,
  ease: smoothMotionEase,
  layout: {
    duration: 0.42,
    ease: smoothMotionEase,
  },
  opacity: {
    duration: 0.2,
    ease: smoothMotionEase,
  },
};

/**
 * Provides the explicit entrance state for content mounted by interactive filters.
 */
export const filteredItemInitialState = {
  opacity: 0,
  scale: 0.985,
  y: 10,
};

/**
 * Provides the explicit visible state for content mounted by interactive filters.
 */
export const filteredItemVisibleState = {
  opacity: 1,
  scale: 1,
  y: 0,
};

/**
 * Provides the explicit exit state for content removed by interactive filters.
 */
export const filteredItemExitState = {
  opacity: 0,
  scale: 0.985,
  y: -10,
};
