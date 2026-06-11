"use client";

import {
  BarChart2,
  CalendarDays,
  Code2,
  ExternalLink,
  Eye,
  Flame,
  GitCommitHorizontal,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { profile } from "@/constants/portfolio.constants";
import { useMounted } from "@/hooks/use-mounted";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const githubUsername = new URL(profile.githubUrl).pathname.replace("/", "");

const getWidgetTheme = (theme?: string) =>
  theme === "dark" ? "tokyonight" : "default";

const getStatsUrl = (theme: string) =>
  `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&count_private=true&hide_border=true&theme=${theme}`;

const getLanguagesUrl = (theme: string) =>
  `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&hide_border=true&theme=${theme}`;

const getStreakUrl = (theme: string) =>
  `https://streak-stats.demolab.com?user=${githubUsername}&hide_border=true&theme=${theme}`;

const getViewsUrl = () =>
  `https://komarev.com/ghpvc/?username=${githubUsername}&label=Profile%20views&color=2563eb&style=flat`;

const statCards = [
  {
    icon: GitCommitHorizontal,
    label: "Total commits",
    meta: "across public repos",
    valueKey: "commits" as const,
  },
  {
    icon: Flame,
    label: "Current streak",
    meta: "days active",
    valueKey: "streak" as const,
  },
  {
    icon: Star,
    label: "Total stars",
    meta: "on public repos",
    valueKey: "stars" as const,
  },
  {
    icon: Eye,
    label: "Profile views",
    meta: "all-time",
    valueKey: "views" as const,
  },
];

type GitHubActivityCardProps = {
  commits?: string;
  stars?: string;
  streak?: string;
  views?: string;
};

/**
 * Displays GitHub activity widgets using the same card language as the rest of the portfolio.
 */
export const GitHubActivityCard = ({
  commits = "–",
  stars = "–",
  streak = "–",
  views = "–",
}: GitHubActivityCardProps) => {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const widgetTheme = getWidgetTheme(resolvedTheme);

  const statValues = {
    commits,
    stars,
    streak,
    views,
  };

  return (
    <Card className="overflow-hidden border-border/70 bg-card/95 shadow-sm shadow-primary/5">
      <CardContent className="p-5 sm:p-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                GitHub
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                GitHub activity
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                Public contributions, streaks, and top languages shown in the
                same clean style as the rest of the page.
              </p>
            </div>
            <Badge
              className="border-primary/20 bg-primary/10 text-primary"
              variant="outline"
            >
              Live widgets
            </Badge>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <WidgetFrame
              label="Stats"
              icon={<BarChart2 className="size-3.5" />}
            >
              {mounted ? (
                <Image
                  alt="GitHub stats card"
                  className="h-auto w-full rounded-xl border border-border/60 bg-background"
                  height={195}
                  src={getStatsUrl(widgetTheme)}
                  unoptimized
                  width={495}
                />
              ) : (
                <Skeleton className="aspect-[495/195] rounded-xl" />
              )}
            </WidgetFrame>

            <WidgetFrame
              label="Top languages"
              icon={<Code2 className="size-3.5" />}
            >
              {mounted ? (
                <Image
                  alt="GitHub top languages card"
                  className="h-auto w-full rounded-xl border border-border/60 bg-background"
                  height={195}
                  src={getLanguagesUrl(widgetTheme)}
                  unoptimized
                  width={495}
                />
              ) : (
                <Skeleton className="aspect-[495/195] rounded-xl" />
              )}
            </WidgetFrame>
          </div>

          <WidgetFrame
            label="Contribution streak"
            icon={<CalendarDays className="size-3.5" />}
          >
            {mounted ? (
              <Image
                alt="GitHub contribution streak"
                className="h-auto w-full rounded-xl border border-border/60 bg-background"
                height={220}
                src={getStreakUrl(widgetTheme)}
                unoptimized
                width={600}
              />
            ) : (
              <Skeleton className="aspect-[600/220] rounded-xl" />
            )}
          </WidgetFrame>

          <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {githubUsername}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                github.com/{githubUsername}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {mounted ? (
                <Image
                  alt="GitHub profile views counter"
                  height={20}
                  src={getViewsUrl()}
                  unoptimized
                  width={140}
                />
              ) : (
                <div className="h-5 w-36 rounded-full border border-border/60 bg-muted/40" />
              )}

              <Button asChild size="sm" variant="outline" className="gap-1.5">
                <a
                  href={profile.githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="size-3.5" />
                  Open GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WidgetFrame = ({
  label,
  icon,
  children,
}: {
  children: ReactNode;
  icon: ReactNode;
  label: string;
}) => (
  <section className="overflow-hidden rounded-2xl border border-border/60 bg-muted/10 p-3.5">
    <p className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      {icon}
      {label}
    </p>
    {children}
  </section>
);

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`border border-border/60 bg-muted/40 ${className ?? ""}`} />
);
