"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { aboutEntries, profile } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { SectionHeading } from "@/components/common/section-heading";
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

/**
 * Displays a recruiter-friendly profile overview with strengths, personal background, and goals.
 */
export const AboutSection = () => {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const widgetTheme = getWidgetTheme(resolvedTheme);
  const statsUrl = getStatsUrl(widgetTheme);
  const languagesUrl = getLanguagesUrl(widgetTheme);
  const streakUrl = getStreakUrl(widgetTheme);
  const viewsUrl = getViewsUrl();

  return (
    <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="about">
      <RevealGroup className="relative mx-auto max-w-6xl">
        <SectionAccentBackdrop variant="left" />

        <RevealItem>
          <SectionHeading
            description="A clearer view of who I am, how I approach development, and where I want to grow."
            eyebrow="About"
            title="Personal details and long-term goals"
          />
        </RevealItem>

        <RevealGroup className="grid gap-3">
          <RevealItem>
            <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-7 shadow-sm shadow-primary/5 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Personal details
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                I&apos;m Cornelio A. Gatbonton Jr., a BSIT student and Junior Web
                Developer based in Manila, Philippines. I build web applications
                using Next.js, React, Supabase/PostgreSQL, Tailwind CSS, PHP, and
                MySQL.
              </p>

              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                I have experience in frontend development, database design,
                authentication, RBAC, QA testing, technical documentation, and IT
                support. I enjoy building projects that are clear to use,
                reliable to maintain, and backed by thoughtful testing.
              </p>
            </section>
          </RevealItem>

          <RevealItem>
            <div className="grid gap-3 sm:grid-cols-2">
              {aboutEntries.map((item) => {
                const Icon = item.icon;

                return (
                  <section
                    className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-5 shadow-sm shadow-primary/5"
                    key={item.title}
                  >
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-xl border border-primary/15 bg-background text-primary">
                        <Icon className="size-4" />
                      </span>
                      <h4 className="text-sm font-semibold text-foreground">
                        {item.title}
                      </h4>
                    </div>

                    <div className="mt-4 space-y-2">
                      {item.description.map((paragraph) => (
                        <p
                          className="text-sm leading-7 text-muted-foreground"
                          key={paragraph}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </RevealItem>

          <RevealItem>
            <Card className="overflow-hidden border-border/70 bg-card/95 shadow-sm shadow-primary/5">
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                      GitHub activity
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      A quick snapshot of my public GitHub activity and consistency.
                    </p>
                  </div>
                  <Badge
                    className="border-primary/20 bg-primary/10 text-primary"
                    variant="outline"
                  >
                    GitHub
                  </Badge>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="grid gap-4 md:grid-cols-2">
                    <a
                      aria-label="Open GitHub stats card"
                      className="group block overflow-hidden rounded-xl transition-transform duration-200 hover:-translate-y-0.5"
                      href={profile.githubUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {mounted ? (
                        <Image
                          alt="GitHub stats card"
                          className="h-auto w-full rounded-xl border border-border/60 bg-background"
                          height={195}
                          src={statsUrl}
                          unoptimized
                          width={495}
                        />
                      ) : (
                        <div className="aspect-[495/195] rounded-xl border border-border/60 bg-muted/40" />
                      )}
                    </a>

                    <a
                      aria-label="Open GitHub top languages card"
                      className="group block overflow-hidden rounded-xl transition-transform duration-200 hover:-translate-y-0.5"
                      href={profile.githubUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {mounted ? (
                        <Image
                          alt="GitHub top languages card"
                          className="h-auto w-full rounded-xl border border-border/60 bg-background"
                          height={195}
                          src={languagesUrl}
                          unoptimized
                          width={495}
                        />
                      ) : (
                        <div className="aspect-[495/195] rounded-xl border border-border/60 bg-muted/40" />
                      )}
                    </a>
                  </div>

                  <div className="grid gap-4">
                    <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/20 p-4">
                      <h4 className="text-sm font-semibold text-foreground">
                        Contribution streak
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        A live look at my current consistency.
                      </p>
                      <div className="mt-4 overflow-hidden rounded-lg">
                        {mounted ? (
                          <Image
                            alt="GitHub contribution streak card"
                            className="h-auto w-full rounded-lg border border-border/60 bg-background"
                            height={220}
                            src={streakUrl}
                            unoptimized
                            width={600}
                          />
                        ) : (
                          <div className="aspect-[600/220] rounded-lg border border-border/60 bg-muted/40" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-background px-4 py-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">
                          Profile views
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Simple visitor counter for the GitHub profile.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {mounted ? (
                          <Image
                            alt="GitHub profile views counter"
                            height={20}
                            src={viewsUrl}
                            unoptimized
                            width={140}
                          />
                        ) : (
                          <div className="h-5 w-36 rounded-full border border-border/60 bg-muted/40" />
                        )}
                        <Button asChild size="sm" variant="outline">
                          <a
                            href={profile.githubUrl}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Open GitHub
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RevealItem>
        </RevealGroup>
      </RevealGroup>
    </AnimatedSection>
  );
};
