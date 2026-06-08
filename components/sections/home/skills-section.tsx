"use client";

import {
  ClipboardCheck,
  FileWarning,
  GitBranch,
  Sparkles,
  TestTube2,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { skillGroups } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SkillLogoMeta = {
  darkLogo?: string;
  icon?: LucideIcon;
  logo?: string;
  logoClassName?: string;
};

const skillLogoMap: Record<string, SkillLogoMeta> = {
  Bootstrap: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  "Bug Documentation": {
    icon: FileWarning,
  },
  "Functional Testing": {
    icon: ClipboardCheck,
  },
  Flowbite: {
    icon: Sparkles,
  },
  Git: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  GitHub: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  "Integration Testing": {
    icon: GitBranch,
  },
  "JavaScript ES6": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  Laragon: {
    logo: "https://cdn.simpleicons.org/laragon/0E83CD",
  },
  "Lucide React": {
    logo: "https://cdn.simpleicons.org/lucide",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  "MySQL Workbench": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  MySQL: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  "Next.js": {
    logo: "https://cdn.simpleicons.org/nextdotjs/000000",
    darkLogo: "https://cdn.simpleicons.org/nextdotjs/white",
  },
  npm: {
    logo: "https://cdn.simpleicons.org/npm/CB3837",
  },
  "Node.js": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  pnpm: {
    logo: "https://cdn.simpleicons.org/pnpm/F69220",
  },
  PHP: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  PostgreSQL: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  React: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  Supabase: {
    logo: "https://cdn.simpleicons.org/supabase/3FCF8E",
  },
  "Tailwind CSS": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  "shadcn/ui": {
    logo: "https://cdn.simpleicons.org/shadcnui",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  UAT: {
    icon: UserCheck,
  },
  Vercel: {
    logo: "https://cdn.simpleicons.org/vercel",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  "VS Code": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  "EAS Build": {
    logo: "https://cdn.simpleicons.org/expo/000020",
    logoClassName: "dark:brightness-0 dark:invert",
  },
  XAMPP: {
    logo: "https://cdn.simpleicons.org/xampp/FB7A24",
  },
};

const allSkills = skillGroups.flatMap((group) =>
  group.skills.map((skill) => ({
    group: group.title,
    name: skill,
    ...skillLogoMap[skill],
  })),
);

type SkillLogoPillProps = {
  className?: string;
  compact?: boolean;
  isDuplicate?: boolean;
  skill: (typeof allSkills)[number];
};

const SkillLogoPill = ({
  className,
  compact = false,
  isDuplicate = false,
  skill,
}: SkillLogoPillProps) => {
  const Icon = skill.icon ?? TestTube2;

  return (
    <Badge
      aria-hidden={isDuplicate || undefined}
      className={cn(
        "max-w-full shrink-0 gap-2 border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm",
        compact &&
          "px-2.5 py-1.5 text-xs text-muted-foreground shadow-none sm:max-w-none",
        className,
      )}
      variant="outline"
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-md bg-card text-primary shadow-inner ring-1 ring-border",
          compact && "size-7",
        )}
      >
        {skill.logo ? (
          <>
            <Image
              alt=""
              className={cn(
                "size-5 object-contain",
                compact && "size-4",
                skill.darkLogo && "dark:hidden",
                skill.logoClassName,
              )}
              height={20}
              loading="lazy"
              src={skill.logo}
              unoptimized
              width={20}
            />
            {skill.darkLogo ? (
              <Image
                alt=""
                className={cn(
                  "hidden size-5 object-contain dark:block",
                  compact && "size-4",
                )}
                height={20}
                loading="lazy"
                src={skill.darkLogo}
                unoptimized
                width={20}
              />
            ) : null}
          </>
        ) : (
          <Icon className={cn("size-4", compact && "size-3.5")} />
        )}
      </span>
      <span
        className={cn(
          "break-words",
          compact ? "sm:whitespace-nowrap" : "whitespace-nowrap",
        )}
      >
        {skill.name}
      </span>
    </Badge>
  );
};

/**
 * Displays the grouped technical skills section and animated skills carousel.
 */
export const SkillsSection = () => (
  <AnimatedSection
    className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    id="skills"
  >
    <RevealGroup className="relative mx-auto max-w-7xl">
      <SectionAccentBackdrop variant="center" />
      <RevealItem>
        <SectionHeading
          description="A structured overview of my technical skills across frontend development, backend integration, quality assurance, and delivery workflows."
          eyebrow="Technical Skills"
          title="Frontend, backend, QA/Tester, and delivery tooling"
        />
      </RevealItem>
      <RevealGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <RevealItem key={group.title}>
              <Card className="h-full overflow-hidden border-border/70 bg-card/95 shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-5 sm:p-6">
                  <article>
                    <div className="mb-4 flex items-center gap-3 sm:mb-5">
                      <span className="grid size-10 place-items-center rounded-2xl border border-primary/15 bg-background/80 text-primary shadow-sm">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold sm:text-base">
                          {group.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => {
                        const skillWithLogo = allSkills.find(
                          (item) => item.name === skill,
                        );

                        return skillWithLogo ? (
                          <SkillLogoPill
                            compact
                            key={skill}
                            skill={skillWithLogo}
                          />
                        ) : null;
                      })}
                    </div>
                  </article>
                </CardContent>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
