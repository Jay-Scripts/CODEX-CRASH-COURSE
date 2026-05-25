"use client";

import { ArrowRight, Download, Mail, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/constants/portfolio.constants";
import { Button } from "@/components/ui/button";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const heroContentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const heroItemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

/**
 * Displays the recruiter-facing hero section with responsive layout, portrait framing, and primary calls to action.
 */
export const HeroSection = () => (
  <motion.section
    animate="visible"
    className="relative overflow-hidden border-b border-border bg-background"
    id="top"
    initial="hidden"
    variants={heroContentVariants}
  >
    <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,_var(--primary)_26%,_transparent),_transparent_58%)] sm:h-[34rem]" />
    <div className="absolute right-[-12%] top-24 -z-10 hidden size-72 rounded-full bg-primary/12 blur-3xl dark:block lg:block" />
    <div className="absolute left-[-10%] top-16 -z-10 hidden size-56 rounded-full bg-primary/10 blur-3xl sm:block" />
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-8 lg:py-24">
      <motion.div
        className="order-2 max-w-3xl text-center lg:order-1 lg:text-left"
        variants={heroContentVariants}
      >
        <motion.h1
          className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          variants={heroItemVariants}
        >
          {profile.name}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg font-medium text-primary sm:text-2xl"
          variants={heroItemVariants}
        >
          {profile.role}
        </motion.p>
        <motion.div
          className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start"
          variants={heroItemVariants}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-1.5 shadow-sm backdrop-blur">
            <MapPin className="size-4 text-primary" />
            {profile.location}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-1.5 shadow-sm backdrop-blur">
            <ShieldCheck className="size-4 text-primary" />
            QA-focused delivery mindset
          </span>
        </motion.div>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0"
          variants={heroItemVariants}
        >
          {profile.summary} Built to show enterprise-ready delivery traits:
          quality, clarity, system thinking, and maintainable execution.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          variants={heroItemVariants}
        >
          <Button
            asChild
            className="shadow-lg shadow-primary/20 sm:min-w-40"
            size="lg"
          >
            <Link href="#projects">
              View Projects
              <ArrowRight />
            </Link>
          </Button>
          <Button
            asChild
            className="border-border/80 bg-background/80 backdrop-blur sm:min-w-40"
            size="lg"
            variant="outline"
          >
            <Link href={profile.resumeUrl}>
              <Download />
              Download Resume
            </Link>
          </Button>
          <Button asChild className="sm:min-w-40" size="lg" variant="ghost">
            <Link href="#contact">
              <Mail />
              Contact Me
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        className="order-1 mx-auto w-full max-w-[26rem] lg:order-2 lg:max-w-[32rem] lg:justify-self-end"
        variants={heroItemVariants}
      >
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-border/70 backdrop-blur-xl ">
          <div className="absolute inset-x-8 top-0 h-32 rounded-full bg-primary/18 blur-3xl" />

          <Image
            alt={`${profile.name} portrait`}
            className="mx-auto h-auto w-full max-w-[22rem] object-contain drop-shadow-[0_28px_36px_rgba(15,23,42,0.28)] sm:max-w-[26rem]"
            height={938}
            priority
            sizes="(min-width: 1024px) 32rem, (min-width: 640px) 26rem, calc(100vw - 4rem)"
            src="/jr-pic-transparent.png"
            unoptimized
            width={1064}
          />
        </div>
      </motion.div>
    </div>
  </motion.section>
);
