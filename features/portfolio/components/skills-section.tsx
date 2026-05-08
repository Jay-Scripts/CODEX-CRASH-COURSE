"use client";

import {
  ClipboardCheck,
  FileWarning,
  GitBranch,
  TestTube2,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { skillGroups } from "@/features/portfolio/data";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./animated-section";
import { SectionHeading } from "./section-heading";

type SkillLogoMeta = {
  icon?: LucideIcon;
  logo?: string;
};

const skillLogoMap: Record<string, SkillLogoMeta> = {
  Bootstrap: {
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  "Bug Documentation": {
    icon: FileWarning,
  },
  "Functional Testing": {
    icon: ClipboardCheck,
  },
  Git: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  GitHub: {
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  "Integration Testing": {
    icon: GitBranch,
  },
  "JavaScript ES6": {
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  "MySQL Workbench": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  MySQL: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  "Next.js": {
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  PHP: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  PostgreSQL: {
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  React: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  Supabase: {
    logo: "https://cdn.simpleicons.org/supabase/3FCF8E",
  },
  "Tailwind CSS": {
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  UAT: {
    icon: UserCheck,
  },
  "VS Code": {
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
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

const carouselSkills = [...allSkills, ...allSkills];

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
    <span
      aria-hidden={isDuplicate || undefined}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm",
        compact && "px-2.5 py-1.5 text-xs text-muted-foreground shadow-none",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-md bg-white text-primary shadow-inner ring-1 ring-border",
          compact && "size-7",
        )}
      >
        {skill.logo ? (
          <Image
            alt=""
            className={cn("size-5 object-contain", compact && "size-4")}
            height={20}
            loading="lazy"
            src={skill.logo}
            unoptimized
            width={20}
          />
        ) : (
          <Icon className={cn("size-4", compact && "size-3.5")} />
        )}
      </span>
      <span className="whitespace-nowrap">{skill.name}</span>
    </span>
  );
};

export const SkillsSection = () => (
  <AnimatedSection className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8" id="skills">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        description="Skills are grouped by the way recruiters and engineering teams evaluate junior full-stack candidates."
        eyebrow="Technical Skills"
        title="Frontend, backend, QA, and delivery tooling"
      />
      <motion.div
        className="skills-carousel-mask mb-8 overflow-hidden rounded-lg border border-border bg-card py-4 shadow-sm"
        initial={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.35 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div
          aria-label="Technical skills logo carousel"
          className="skills-carousel-track flex gap-3 px-3"
        >
          {carouselSkills.map((skill, index) => (
            <SkillLogoPill
              isDuplicate={index >= allSkills.length}
              key={`${skill.name}-${index}`}
              skill={skill}
            />
          ))}
        </div>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, groupIndex) => {
          const Icon = group.icon;

          return (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              key={group.title}
              transition={{ delay: groupIndex * 0.08, duration: 0.35 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-semibold">{group.title}</h3>
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
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  </AnimatedSection>
);
