"use client";

import { ArrowRight, FileText, Mail, MapPin, ShieldCheck } from "lucide-react";
import { animate, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { experiences, profile } from "@/constants/portfolio.constants";
import { ProjectDocumentOverlay } from "@/components/cards/project-document-overlay";
import { Button } from "@/components/ui/button";

const smoothEase = [0.22, 1, 0.36, 1] as const;

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
      ease: smoothEase,
    },
  },
};

const floatingEase = "easeInOut" as const;

const floatVariants: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: floatingEase,
    },
  },
};

const floatVariantsDelayed: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: floatingEase,
      delay: 1.5,
    },
  },
};

const heroBlobs: Array<{ className: string; style: CSSProperties }> = [
  {
    className: "right-[8%] top-[-80px] size-[380px]",
    style: { backgroundColor: "var(--hero-blob-primary)" },
  },
  {
    className: "bottom-[-40px] right-[28%] size-[260px]",
    style: { backgroundColor: "var(--hero-blob-secondary)" },
  },
  {
    className: "left-[2%] top-[35%] size-[200px]",
    style: { backgroundColor: "var(--hero-blob-tertiary)" },
  },
  {
    className: "bottom-[10%] left-[30%] size-[160px]",
    style: { backgroundColor: "var(--hero-blob-quaternary)" },
  },
];

const heroSpinnerBoxes = [
  {
    className: "left-[4%] top-24 size-16 sm:size-20",
    delay: "-2s",
    duration: "18s",
    innerClassName: "left-2 top-2",
    innerSizeClassName: "size-8 sm:size-10",
    rotate: "-10deg",
    spin: "hero-spin",
  },
  {
    className: "left-[14%] bottom-24 size-24 sm:size-28",
    delay: "-6s",
    duration: "28s",
    innerClassName: "bottom-3 right-3",
    innerSizeClassName: "size-10 sm:size-12",
    rotate: "8deg",
    spin: "hero-spin-reverse",
  },
  {
    className: "left-[46%] top-20 size-14 sm:size-[4.5rem]",
    delay: "-8s",
    duration: "20s",
    innerClassName: "left-1.5 top-1.5",
    innerSizeClassName: "size-7 sm:size-8",
    rotate: "16deg",
    spin: "hero-spin",
  },
  {
    className: "right-[12%] top-28 size-20 sm:size-24",
    delay: "-4s",
    duration: "24s",
    innerClassName: "right-2 top-2",
    innerSizeClassName: "size-8 sm:size-10",
    rotate: "-14deg",
    spin: "hero-spin-reverse",
  },
  {
    className: "right-[4%] bottom-28 size-28 sm:size-36",
    delay: "-10s",
    duration: "34s",
    innerClassName: "bottom-4 left-4",
    innerSizeClassName: "size-12 sm:size-14",
    rotate: "10deg",
    spin: "hero-spin",
  },
  {
    className: "right-[32%] bottom-12 size-[4.5rem] sm:size-24",
    delay: "-1s",
    duration: "22s",
    innerClassName: "right-2 bottom-2",
    innerSizeClassName: "size-7 sm:size-9",
    rotate: "-6deg",
    spin: "hero-spin-reverse",
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
  color: "var(--hero-chip-text)",
};

const floatingCardStyle: CSSProperties = {
  backgroundColor: "var(--hero-floating-surface)",
  borderColor: "var(--hero-floating-border)",
  boxShadow: "var(--hero-floating-shadow)",
};

const statTileStyle: CSSProperties = {
  backgroundColor: "var(--hero-stat-surface)",
  borderColor: "var(--hero-stat-border)",
};

type AnimatedCounterProps = {
  className?: string;
  duration?: number;
  prefix?: string;
  style?: CSSProperties;
  suffix?: string;
  value: number;
};

const AnimatedCounter = ({
  className,
  duration = 1.2,
  prefix = "",
  style,
  suffix = "",
  value,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: smoothEase,
      onUpdate: (latestValue) => {
        setDisplayValue(`${prefix}${Math.round(latestValue)}${suffix}`);
      },
    });

    return () => {
      controls.stop();
    };
  }, [duration, prefix, suffix, value]);

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
  const industryExperienceMonths = getTimelineSpanMonthCount(experiences);
  const techRelatedExperienceMonths = getTimelineSpanMonthCount(
    experiences.filter((experience) => experience.isTechRelated),
  );
  const industryExperienceYears = Math.max(
    1,
    Math.ceil(industryExperienceMonths / 12),
  );
  const techRelatedExperienceYears = Math.max(
    1,
    Math.ceil(techRelatedExperienceMonths / 12),
  );
  const industryExperienceSuffix =
    industryExperienceYears === 1 ? " yr" : " yrs";
  const techRelatedExperienceSuffix =
    techRelatedExperienceYears === 1 ? " yr" : " yrs";
  const heroStats = [
    {
      label: "Tech-related exp.",
      suffix: techRelatedExperienceSuffix,
      value: techRelatedExperienceYears,
    },
    { label: "Systems Built", suffix: "", value: 5 },
    { label: "Certs", suffix: "", value: 14 },
  ] as const;

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
      {heroBlobs.map((blob) => (
        <div
          className={`pointer-events-none absolute rounded-full blur-[70px] ${blob.className}`}
          key={blob.className}
          style={blob.style}
        />
      ))}
      {heroSpinnerBoxes.map((box) => (
        <div
          className={`pointer-events-none absolute hidden opacity-60 md:block ${box.className}`}
          key={box.className}
          style={{ transform: `rotate(${box.rotate})` }}
        >
          <div
            className="relative size-full rounded-[1.35rem] border border-dashed"
            style={{
              animation: `${box.spin} ${box.duration} linear infinite`,
              animationDelay: box.delay,
              backgroundColor:
                "color-mix(in oklab, var(--hero-chip-surface) 34%, transparent)",
              borderColor: "var(--hero-portrait-ring)",
              boxShadow:
                "inset 0 0 0 1px color-mix(in oklab, var(--hero-background) 78%, transparent)",
            }}
          >
            <span
              className={`absolute rounded-[0.9rem] border border-dashed ${box.innerClassName} ${box.innerSizeClassName}`}
              style={{
                animation: `${box.spin === "hero-spin" ? "hero-spin-reverse" : "hero-spin"} ${box.duration} linear infinite`,
                animationDelay: box.delay,
                borderColor:
                  "color-mix(in oklab, var(--hero-portrait-corner) 70%, transparent)",
              }}
            />
          </div>
        </div>
      ))}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_360px] lg:gap-16 lg:px-10 lg:py-24">
        <motion.div
          className="order-2 max-w-2xl text-center lg:order-1 lg:text-left"
          variants={containerVariants}
        >
          <motion.h1
            className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
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
            className="mt-4 max-w-md text-sm leading-relaxed sm:text-base lg:max-w-lg"
            style={{ color: "var(--hero-body)" }}
            variants={itemVariants}
          >
            Junior Web Developer focused on building responsive, user-friendly
            systems and scalable web applications with modern technologies.
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
            variants={itemVariants}
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs backdrop-blur-md"
              style={chipStyle}
            >
              <MapPin className="size-3 text-primary" />
              {profile.location}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs backdrop-blur-md"
              style={chipStyle}
            >
              <ShieldCheck className="size-3 text-primary" />
              Junior Web Developer
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs backdrop-blur-md"
              style={chipStyle}
            >
              <ShieldCheck className="size-3 text-primary" />
              Quality Assurance
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs backdrop-blur-md"
              style={chipStyle}
            >
              <ShieldCheck className="size-3 text-primary" />
              Technical Support
            </span>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            variants={itemVariants}
          >
            <Button
              asChild
              className="hero-primary-button sm:min-w-40"
              size="lg"
            >
              <Link href="#projects">
                View Projects
                <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button
              className="hero-outline-button sm:min-w-40"
              onClick={() => setIsResumePreviewOpen(true)}
              size="lg"
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
              className="hero-ghost-button sm:min-w-40"
              size="lg"
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
          className="order-1 mx-auto flex w-full max-w-[320px] flex-col items-center gap-0 lg:order-2 lg:max-w-[360px] lg:justify-self-end"
          variants={itemVariants}
        >
          <div className="relative w-[280px]">
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
                className="mx-auto h-auto w-full object-contain drop-shadow-lg"
                height={938}
                priority
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, calc(100vw - 4rem)"
                src="/jr-pic-transparent.png"
                unoptimized
                width={1064}
              />
            </div>

            {/* <motion.div
              animate="animate"
              className="absolute -right-14 bottom-16 z-[6] rounded-xl border px-3.5 py-2.5 backdrop-blur-md"
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
              animate="animate"
              className="absolute -left-14 top-10 z-[6] rounded-xl border px-3.5 py-2.5 backdrop-blur-md"
              style={floatingCardStyle}
              variants={floatVariantsDelayed}
            >
              <p
                className="text-[10px] uppercase tracking-wider"
                style={{ color: "var(--hero-floating-label)" }}
              >
                Industry Exp.
              </p>
              <p
                className="font-bold"
                style={{
                  color: "var(--hero-floating-value)",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 16,
                }}
              >
                <AnimatedCounter
                  suffix={industryExperienceSuffix}
                  value={industryExperienceYears}
                />
              </p>
              <p
                className="text-[9px]"
                style={{ color: "var(--hero-floating-copy)" }}
              >
                included tech-related exp.
              </p>
            </motion.div>
          </div>

          <div className="mt-7 flex w-full gap-3">
            {heroStats.map(({ label, suffix, value }) => (
              <div
                className="flex flex-1 flex-col items-center rounded-xl border py-2.5"
                key={label}
                style={statTileStyle}
              >
                <AnimatedCounter
                  className="font-bold"
                  style={{
                    color: "var(--hero-stat-value)",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 20,
                  }}
                  suffix={suffix}
                  value={value}
                />
                <span
                  className="mt-0.5 text-center text-[11px]"
                  style={{
                    color: "var(--hero-stat-label)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
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
