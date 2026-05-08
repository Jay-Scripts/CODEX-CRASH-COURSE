"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = ComponentProps<typeof motion.section>;

export const AnimatedSection = ({
  children,
  className,
  ...props
}: AnimatedSectionProps) => (
  <motion.section
    className={cn("scroll-mt-24", className)}
    initial={{ opacity: 0, y: 18 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.18 }}
    whileInView={{ opacity: 1, y: 0 }}
    {...props}
  >
    {children}
  </motion.section>
);
