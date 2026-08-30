"use client";

import { ArrowRight, FileText, Mail, MapPin, ShieldCheck } from "lucide-react";
import { animate, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { experiences, profile } from "@/constants/portfolio.constants";
import { skillLogoMap } from "@/constants/skill-logos.constants";
import { ProjectDocumentOverlay } from "@/components/cards/project-document-overlay";
import { HeroIconConnections } from "@/components/sections/home/hero-icon-connections";
import { Button } from "@/components/ui/button";
import { smoothMotionEase } from "@/utils/animations.utils";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothMotionEase,
    },
  },
};

const floatingEase = "easeInOut" as const;
const floatingCardRevealDelay = 1;
const floatingCardRevealDuration = 1.1;
const experienceCounterDuration = 1.2;
const floatingIconPopDelay = 2;
type FloatingCardDirection = "left" | "right";

const floatingCardVariants: Variants = {
  hidden: (direction: FloatingCardDirection = "left") => ({
    opacity: 0,
    scale: 0,
    x: direction === "right" ? 800 : -800,
    rotateY: direction === "right" ? -30 : 30,
    y: 18,
    transformOrigin: direction === "right" ? "100% 50%" : "-100% 50%",
    transformPerspective: 1000,
    zIndex: 2,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    rotateY: 0,
    y: [0, -6, 0],
    transformOrigin: "1800px 50%",
    transformPerspective: 1000,
    zIndex: 6,
    transition: {
      opacity: {
        duration: floatingCardRevealDuration,
        ease: smoothMotionEase,
        delay: floatingCardRevealDelay,
      },
      scale: {
        duration: floatingCardRevealDuration,
        ease: smoothMotionEase,
        delay: floatingCardRevealDelay,
      },
      x: {
        duration: floatingCardRevealDuration,
        ease: smoothMotionEase,
        delay: floatingCardRevealDelay,
      },
      rotateY: {
        duration: floatingCardRevealDuration,
        ease: smoothMotionEase,
        delay: floatingCardRevealDelay,
      },
      y: {
        duration: 4.5,
        repeat: Infinity,
        ease: floatingEase,
        delay: 2.1,
      },
    },
  },
};

const heroSpinnerBoxes = [
  {
    className:
      "left-[1%] top-[9%] size-12 sm:left-[2%] sm:top-[7%] sm:size-14 lg:size-16 xl:left-[3%] xl:top-24 xl:size-20",
    delay: "-2s",
    duration: "18s",
    rotate: "-10deg",
    skill: "JavaScript",
    spin: "hero-spin",
  },
  {
    className:
      "right-[1%] top-[24%] size-12 sm:right-auto sm:left-[2%] sm:top-[23%] sm:size-14 lg:size-16 xl:left-[16%] xl:top-[28%] xl:size-20",
    delay: "-3s",
    duration: "23s",
    rotate: "6deg",
    skill: "TypeScript",
    spin: "hero-spin-reverse",
  },
  {
    className:
      "left-[10%] top-[18%] size-10 sm:left-[12%] sm:top-[18%] sm:size-12 lg:size-14 xl:left-[12%] xl:top-[46%] xl:size-20",
    delay: "-6s",
    duration: "24s",
    rotate: "8deg",
    skill: "PHP",
    spin: "hero-spin-reverse",
  },
  {
    className:
      "right-[1%] top-[17%] size-12 sm:right-[2%] sm:top-[16%] sm:size-14 lg:size-16 xl:right-auto xl:top-auto xl:left-[21%] xl:bottom-24 xl:size-22",
    delay: "-10s",
    duration: "28s",
    rotate: "16deg",
    skill: "React",
    spin: "hero-spin",
  },
  {
    className:
      "right-[10%] top-[12%] size-10 sm:right-[12%] sm:top-20 sm:size-12 lg:size-14 xl:left-[31%] xl:top-20 xl:size-20",
    delay: "-4s",
    duration: "20s",
    rotate: "-14deg",
    skill: "HTML",
    spin: "hero-spin-reverse",
  },
  {
    className:
      "left-[10%] top-[88%] size-10 sm:left-[12%] sm:top-auto sm:bottom-24 sm:size-12 lg:size-14 xl:left-[40%] xl:bottom-24 xl:size-20",
    delay: "-1s",
    duration: "22s",
    rotate: "10deg",
    skill: "CSS",
    spin: "hero-spin",
  },
  {
    className:
      "right-[18%] top-[24%] size-10 sm:right-[2%] sm:top-[27%] sm:size-12 lg:size-14 xl:right-auto xl:top-auto xl:left-[6%] xl:bottom-[42%] xl:size-24",
    delay: "-8s",
    duration: "26s",
    rotate: "-6deg",
    skill: "Tailwind CSS",
    spin: "hero-spin-reverse",
  },
  {
    className:
      "left-[1%] top-[31%] size-12 sm:left-[2%] sm:top-[32%] sm:size-14 lg:size-16 xl:left-[47%] xl:top-[48%] xl:size-20",
    delay: "-5s",
    duration: "20s",
    rotate: "12deg",
    skill: "Next.js",
    spin: "hero-spin",
  },
  {
    className:
      "right-[10%] top-[52%] size-10 sm:right-[12%] sm:top-24 sm:size-12 lg:size-14 xl:right-[3%] xl:top-24 xl:size-24",
    delay: "-10s",
    duration: "34s",
    rotate: "10deg",
    skill: "shadcn/ui",
    spin: "hero-spin-reverse",
  },
  {
    className:
      "left-[18%] top-[36%] size-10 sm:left-[2%] sm:top-[46%] sm:size-12 lg:size-14 xl:left-auto xl:right-[7%] xl:top-[38%] xl:size-22",
    delay: "-3s",
    duration: "22s",
    rotate: "-6deg",
    skill: "MySQL",
    spin: "hero-spin",
  },
  {
    className:
      "right-[10%] top-[78%] size-10 sm:right-[12%] sm:top-auto sm:bottom-28 sm:size-12 lg:size-14 xl:right-[3%] xl:bottom-28 xl:size-24",
    delay: "-7s",
    duration: "30s",
    rotate: "-6deg",
    skill: "PostgreSQL",
    spin: "hero-spin-reverse",
  },
  {
    className: "hidden right-[21%] top-[18%] size-20 xl:block",
    delay: "-9s",
    duration: "26s",
    rotate: "-8deg",
    skill: "Claude Code",
    spin: "hero-spin",
  },
  {
    className: "hidden right-[30%] top-[10%] size-24 xl:block",
    delay: "-11s",
    duration: "32s",
    rotate: "8deg",
    skill: "Codex",
    spin: "hero-spin-reverse",
  },
  {
    className:
      "right-[18%] top-[64%] size-10 sm:right-[2%] sm:top-[73%] sm:size-12 lg:size-14 xl:right-auto xl:left-[9%] xl:top-[10%] xl:size-20",
    delay: "-13s",
    duration: "24s",
    rotate: "-12deg",
    skill: "Git",
    spin: "hero-spin",
  },
  {
    className:
      "left-[18%] top-[92%] size-10 sm:left-[2%] sm:top-[93%] sm:size-12 lg:size-14 xl:left-auto xl:top-auto xl:right-[7%] xl:bottom-[10%] xl:size-20",
    delay: "-15s",
    duration: "28s",
    rotate: "12deg",
    skill: "GitHub",
    spin: "hero-spin-reverse",
  },
  {
    className:
      "right-[38%] top-[28%] size-9 sm:right-[39%] sm:top-[20%] sm:size-12 lg:size-14 xl:right-[39%] xl:top-[20%] xl:size-22",
    delay: "-17s",
    duration: "30s",
    rotate: "-5deg",
    skill: "Cursor",
    spin: "hero-spin",
  },
  {
    className:
      "right-[1%] top-[87%] size-12 sm:right-[2%] sm:top-[86%] sm:size-14 lg:size-16 xl:right-[12%] xl:top-[10%] xl:size-20",
    delay: "-19s",
    duration: "27s",
    rotate: "6deg",
    skill: "VS Code",
    spin: "hero-spin-reverse",
  },
  {
    className: "hidden right-[48%] top-[12%] size-20 xl:block",
    delay: "-21s",
    duration: "29s",
    rotate: "-7deg",
    skill: "Claude",
    spin: "hero-spin",
  },
  {
    className: "hidden right-[30%] bottom-[10%] size-24 xl:block",
    delay: "-23s",
    duration: "31s",
    rotate: "9deg",
    skill: "ChatGPT",
    spin: "hero-spin-reverse",
  },
  {
    className:
      "right-[1%] top-[40%] size-12 sm:right-[2%] sm:top-[41%] sm:size-14 lg:size-16 xl:right-auto xl:left-[2%] xl:top-[30%] xl:size-22",
    delay: "-25s",
    duration: "28s",
    rotate: "-9deg",
    skill: "Node.js",
    spin: "hero-spin",
  },
  {
    className:
      "right-[1%] top-[63%] size-12 sm:right-[2%] sm:top-[64%] sm:size-14 lg:size-16 xl:right-auto xl:top-auto xl:left-[2%] xl:bottom-[18%] xl:size-20",
    delay: "-27s",
    duration: "26s",
    rotate: "7deg",
    skill: "Bootstrap",
    spin: "hero-spin-reverse",
  },
  {
    className:
      "left-[1%] top-[76%] size-12 sm:left-[2%] sm:top-[78%] sm:size-14 lg:size-16 xl:left-auto xl:right-[2%] xl:top-[58%] xl:size-20",
    delay: "-29s",
    duration: "30s",
    rotate: "-11deg",
    skill: "Lucide React",
    spin: "hero-spin",
  },
  {
    className:
      "left-[1%] top-[53%] size-12 sm:left-[2%] sm:top-[57%] sm:size-14 lg:size-16 xl:top-auto xl:left-[12%] xl:bottom-[4%] xl:size-20",
    delay: "-31s",
    duration: "32s",
    rotate: "10deg",
    skill: "React Native",
    spin: "hero-spin-reverse",
  },
  {
    className: "hidden left-[56%] top-[14%] size-20 xl:block",
    delay: "-33s",
    duration: "27s",
    rotate: "-8deg",
    skill: "Supabase",
    spin: "hero-spin",
  },
  {
    className:
      "hidden right-[2%] top-[48%] size-14 lg:block lg:right-[3%] lg:size-16 xl:right-[30%] xl:top-[1%] xl:size-20",
    delay: "-35s",
    duration: "29s",
    rotate: "7deg",
    skill: "Playwright",
    spin: "hero-spin-reverse",
  },
  {
    className: "hidden left-[28%] bottom-[10%] size-20 xl:block",
    delay: "-37s",
    duration: "31s",
    rotate: "11deg",
    skill: "Obsidian Graphify",
    spin: "hero-spin",
  },
] as const;

const monthIndices: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const parsePeriodEdge = (value: string) => {
  const now = new Date();

  if (value === "Present") {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  const [month, year] = value.split(" ");
  const parsedDate = new Date(Number(year), monthIndices[month] ?? 0, 1);

  if (parsedDate > now) {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  return parsedDate;
};

const getTimelineSpanMonthCount = (
  periodEntries: Array<{ period: string }>,
) => {
  if (!periodEntries.length) {
    return 0;
  }

  const dates = periodEntries.map(({ period }) => {
    const [start, end] = period.split(" - ");

    return {
      end: parsePeriodEdge(end),
      start: parsePeriodEdge(start),
    };
  });

  const earliestStart = dates.reduce(
    (earliest, current) =>
      current.start < earliest ? current.start : earliest,
    dates[0].start,
  );
  const latestEnd = dates.reduce(
    (latest, current) => (current.end > latest ? current.end : latest),
    dates[0].end,
  );

  return (
    (latestEnd.getFullYear() - earliestStart.getFullYear()) * 12 +
    (latestEnd.getMonth() - earliestStart.getMonth()) +
    1
  );
};

const chipStyle: CSSProperties = {
  backgroundColor: "var(--hero-chip-surface)",
  borderColor: "var(--hero-chip-border)",
  boxShadow:
    "var(--neomorph-compact-shadow)",
  color: "var(--hero-chip-text)",
};

const floatingCardStyle: CSSProperties = {
  backgroundColor: "var(--hero-floating-surface)",
  borderColor: "var(--hero-floating-border)",
  boxShadow: "var(--hero-floating-shadow)",
};

type AnimatedCounterProps = {
  active?: boolean;
  className?: string;
  delay?: number;
  duration?: number;
  prefix?: string;
  style?: CSSProperties;
  suffix?: string;
  value: number;
};

const AnimatedCounter = ({
  active = true,
  className,
  delay = 0,
  duration = 1.2,
  prefix = "",
  style,
  suffix = "",
  value,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!active) {
      return;
    }

    const controls = animate(0, value, {
      delay,
      duration,
      ease: smoothMotionEase,
      onUpdate: (latestValue) => {
        setDisplayValue(`${prefix}${Math.round(latestValue)}${suffix}`);
      },
    });

    return () => {
      controls.stop();
    };
  }, [active, delay, duration, prefix, suffix, value]);

  return (
    <span className={className} style={style}>
      {displayValue}
    </span>
  );
};

/**
 * Displays the recruiter-facing hero section with a theme-aware neon visual treatment.
 */
export const HeroSection = () => {
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [isPortraitLoaded, setIsPortraitLoaded] = useState(false);
  const [hasExperienceRevealFinished, setHasExperienceRevealFinished] =
    useState(false);
  const techSupportExperienceMonths = getTimelineSpanMonthCount(
    experiences.filter(
      (experience) => experience.organization === "Global Reciprocal Colleges",
    ),
  );
  const techSupportExperienceYears = Math.max(
    1,
    Math.floor(techSupportExperienceMonths / 12),
  );
  const techSupportExperienceSuffix =
    techSupportExperienceYears === 1 ? " yr" : " yrs";
  const appDevelopmentExperienceYears: number = 2;

  useEffect(() => {
    if (!isPortraitLoaded) {
      return undefined;
    }

    const completionTimer = window.setTimeout(
      () => {
        setHasExperienceRevealFinished(true);
      },
      (floatingCardRevealDelay + experienceCounterDuration) * 1000,
    );

    return () => {
      window.clearTimeout(completionTimer);
    };
  }, [isPortraitLoaded]);

  return (
    <motion.section
      animate="visible"
      className="relative overflow-hidden"
      id="top"
      initial="hidden"
      style={{ backgroundColor: "var(--hero-background)" }}
      variants={containerVariants}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--hero-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid-line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 65% 45%, transparent 30%, var(--hero-radial-mask-end) 80%)",
        }}
      />
      <HeroIconConnections />
      {heroSpinnerBoxes.map((box, index) => {
        const skill = skillLogoMap[box.skill];

        return (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute z-[3] transition-opacity duration-1000 ${
              hasExperienceRevealFinished
                ? "opacity-75 xl:opacity-[0.92]"
                : "opacity-40 xl:opacity-60"
            } ${box.className}`}
            data-hero-floating-icon
            key={box.className}
            style={{
              transform: `rotate(${box.rotate})`,
            }}
          >
            <div
              className="relative flex size-full items-center justify-center"
              style={{
                animation: `${box.spin} ${box.duration} linear infinite`,
                animationDelay: box.delay,
              }}
            >
              <div
                className="hero-icon-pop"
                style={{
                  animation:
                    "hero-icon-pop 720ms cubic-bezier(0.22, 1, 0.36, 1) both",
                  animationDelay: `${floatingIconPopDelay + index * 0.12}s`,
                }}
              >
                <span className="relative z-[1] grid place-items-center">
                  {skill.logo ? (
                    <Image
                      alt=""
                      className={`size-6 object-contain sm:size-7 lg:size-8 xl:size-9 ${skill.logoClassName ?? ""}`}
                      height={30}
                      loading="lazy"
                      src={skill.logo}
                      unoptimized
                      width={30}
                    />
                  ) : null}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-8 px-4 py-12 transition-[gap,padding] duration-500 ease-out sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[1fr_360px] lg:gap-16 lg:px-10 lg:py-24">
        <motion.div
          className="order-2 max-w-2xl text-center lg:order-1 lg:text-left"
          variants={containerVariants}
        >
          <motion.h1
            className="text-balance text-2xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            style={{
              color: "var(--hero-heading)",
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
            variants={itemVariants}
          >
            {profile.name.split(" ")[0]}{" "}
            <span
              style={{
                background:
                  "linear-gradient(120deg, var(--hero-heading-accent-start), var(--hero-heading-accent-end))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-md text-xs md:text-sm leading-relaxed sm:text-base lg:max-w-lg"
            style={{ color: "var(--hero-body)" }}
            variants={itemVariants}
          >
            IT professional in Manila open to technical support, IT operations,
            software testing, quality assurance, systems documentation, and
            software development roles. I bring hands-on experience
            troubleshooting, validating, documenting, and improving
            user-friendly systems.
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
            variants={itemVariants}
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={chipStyle}
            >
              <MapPin className="size-3 text-primary" />
              {profile.location}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={chipStyle}
            >
              <ShieldCheck className="size-3 text-primary" />
              Software Development
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={chipStyle}
            >
              <ShieldCheck className="size-3 text-primary" />
              Software Testing
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={chipStyle}
            >
              <ShieldCheck className="size-3 text-primary" />
              Quality Assurance
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={chipStyle}
            >
              <ShieldCheck className="size-3 text-primary" />
              Technical Support
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={chipStyle}
            >
              <ShieldCheck className="size-3 text-primary" />
              Hardware &amp; Software Troubleshooting
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={chipStyle}
            >
              <ShieldCheck className="size-3 text-primary" />
              IT Operations
            </span>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            variants={itemVariants}
          >
            <Button
              asChild
              className="hero-primary-button sm:min-w-40 sm:h-11 sm:px-6"
              size="default"
            >
              <Link href="#projects">
                View Projects
                <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button
              className="hero-outline-button sm:min-w-40 sm:h-11 sm:px-6"
              onClick={() => setIsResumePreviewOpen(true)}
              size="default"
              type="button"
              variant="outline"
            >
              <>
                <FileText className="mr-1" />
                View Resume
              </>
            </Button>
            <Button
              asChild
              className="hero-ghost-button sm:min-w-40 sm:h-11 sm:px-6"
              size="default"
              variant="ghost"
            >
              <Link href="#contact">
                <Mail className="mr-1" />
                Contact Me
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-1 mx-auto flex w-full max-w-[280px] flex-col items-center gap-0 lg:order-2 lg:max-w-[360px] lg:justify-self-end"
          variants={itemVariants}
        >
          <div className="relative w-[min(58vw,220px)] sm:w-[min(58vw,260px)] lg:w-[min(30vw,300px)]">
            <div
              className="absolute -inset-3.5 z-[1] rounded-[22px] border border-dashed"
              style={{
                animation: "hero-spin 30s linear infinite",
                borderColor: "var(--hero-portrait-ring)",
              }}
            />
            <div
              className="absolute -left-2 -top-2 z-[4] h-7 w-7 rounded-tl-sm border-l-2 border-t-2"
              style={{ borderColor: "var(--hero-portrait-corner)" }}
            />
            <div
              className="absolute -bottom-2 -right-2 z-[4] h-7 w-7 rounded-br-sm border-b-2 border-r-2"
              style={{ borderColor: "var(--hero-portrait-corner)" }}
            />

            <div
              className="relative z-[3] overflow-hidden rounded-[18px] border"
              style={{
                aspectRatio: "1 / 1.15",
                background:
                  "linear-gradient(135deg, var(--hero-portrait-start), var(--hero-portrait-middle), var(--hero-portrait-end))",
                borderColor: "var(--hero-portrait-border)",
              }}
            >
              <Image
                alt={`${profile.name} portrait`}
                className="mx-auto h-auto w-full object-contain"
                height={938}
                priority
                quality={100}
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, calc(100vw - 4rem)"
                src="/jr-pic-transparent.png"
                width={1064}
                onLoad={() => setIsPortraitLoaded(true)}
              />
            </div>

            {/* <motion.div
              animate="animate"
              className="absolute -right-14 bottom-16 z-[6] rounded-xl border px-3.5 py-2.5"
              style={floatingCardStyle}
              variants={floatVariants}
            >
              <p
                className="text-[10px] uppercase tracking-wider"
                style={{ color: "var(--hero-floating-label)" }}
              >
                Projects
              </p>
              <p
                className="font-bold"
                style={{
                  color: "var(--hero-floating-value)",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 16,
                }}
              >
                <AnimatedCounter suffix="+" value={5} />
              </p>
              <p
                className="text-[9px]"
                style={{ color: "var(--hero-floating-copy)" }}
              >
                Shipped live
              </p>
            </motion.div> */}

            <motion.div
              animate={isPortraitLoaded ? "visible" : "hidden"}
              className="absolute -left-14 top-8 z-[6] max-w-[calc(100%+2rem)] rounded-xl border px-2.5 py-2 sm:top-10 sm:max-w-none sm:px-3.5 sm:py-2.5"
              custom="left"
              style={floatingCardStyle}
              variants={floatingCardVariants}
            >
              <p
                className="text-[9px] uppercase tracking-wider sm:text-[10px]"
                style={{ color: "var(--hero-floating-label)" }}
              >
                Tech Supp. Exp.
              </p>
              <p
                className="font-bold"
                style={{
                  color: "var(--hero-floating-value)",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 14,
                }}
              >
                <AnimatedCounter
                  active={isPortraitLoaded}
                  delay={1}
                  duration={experienceCounterDuration}
                  suffix={techSupportExperienceSuffix}
                  value={techSupportExperienceYears}
                />
              </p>
              <p
                className="text-[8px] sm:text-[9px]"
                style={{ color: "var(--hero-floating-copy)" }}
              >
                Scholar Service — IT Dept.
              </p>
            </motion.div>

            <motion.div
              animate={isPortraitLoaded ? "visible" : "hidden"}
              className="absolute -bottom-3 -right-14 z-[6] max-w-[calc(100%+2rem)] rounded-xl border px-2.5 py-2 sm:-bottom-5 sm:max-w-none sm:px-3.5 sm:py-2.5"
              custom="right"
              style={floatingCardStyle}
              variants={floatingCardVariants}
            >
              <p
                className="text-[9px] uppercase tracking-wider sm:text-[10px]"
                style={{ color: "var(--hero-floating-label)" }}
              >
                App Dev Exp.
              </p>
              <p
                className="font-bold"
                style={{
                  color: "var(--hero-floating-value)",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 14,
                }}
              >
                <AnimatedCounter
                  active={isPortraitLoaded}
                  delay={1}
                  duration={experienceCounterDuration}
                  suffix={appDevelopmentExperienceYears === 1 ? " yr" : " yrs"}
                  value={appDevelopmentExperienceYears}
                />
              </p>
              <p
                className="text-[8px] sm:text-[9px]"
                style={{ color: "var(--hero-floating-copy)" }}
              >
                freelance, thesis &amp; internship
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div
        className="relative z-10 mx-auto max-w-6xl px-6 pb-6 lg:px-10"
        style={{
          borderImage: "var(--hero-divider-gradient) 1",
          borderTop: "1px solid",
        }}
      />

      <style>{`
      @keyframes hero-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes hero-spin-reverse {
        to {
          transform: rotate(-360deg);
        }
      }

      @keyframes hero-icon-pop {
        0% {
          opacity: 0;
          transform: scale(0.35) translateY(10px);
        }
        70% {
          opacity: 1;
          transform: scale(1.08) translateY(-2px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-icon-pop {
          animation: none !important;
        }
      }
    `}</style>

      <ProjectDocumentOverlay
        documentLayout="single-page"
        downloadLabel="Download resume"
        downloadUrl={profile.resumeUrl}
        isOpen={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
        src={`${profile.resumeUrl}#page=1&view=FitH`}
        title={`${profile.name} Resume`}
      />
    </motion.section>
  );
};
