"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Displays the fixed page-scroll progress bar at the top of the viewport.
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-primary"
      style={{ scaleX }}
    />
  );
};
