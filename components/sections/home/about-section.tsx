import {
  aboutEntries,
  aboutHighlights,
  profile,
} from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Displays a recruiter-friendly profile overview with strengths, personal background, and goals.
 */
export const AboutSection = () => (
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
      <RevealGroup className="grid gap-6">
        <RevealItem>
          <Card className="border-border/70 bg-card/95 shadow-sm shadow-primary/5">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <article className="grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)] lg:gap-10">
                <div className="flex h-full flex-col">
                  <h3 className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Personal details
                  </h3>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                    I&apos;m Cornelio A. Gatbonton Jr., a BSIT student and
                    Junior Web Developer based in Manila, Philippines. I build
                    web applications using Next.js, React, Supabase/PostgreSQL,
                    Tailwind CSS, PHP, and MySQL. I have experience in frontend
                    development, database design, authentication, RBAC, QA
                    testing, technical documentation, and IT support.
                  </p>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                    I enjoy building projects that are clear to use, reliable to
                    maintain, and backed by thoughtful testing and
                    documentation.
                  </p>
                </div>

                <aside className="rounded-[1.8rem] border border-border/70 bg-background/85 p-5 shadow-sm sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Growth focus
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                    Expanding from frontend delivery into stronger full-stack
                    and QA-ready execution.
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2"></div>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    I want to keep improving in UI/UX, responsive frontend work,
                    backend systems, and QA so I can contribute across the full
                    delivery process.
                  </p>
                </aside>
              </article>

              <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
                {aboutEntries.map((item) => {
                  const Icon = item.icon;

                  return (
                    <section
                      className="relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-background/85 p-5 shadow-sm"
                      key={item.title}
                    >
                      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl border border-primary/15 bg-card text-primary">
                          <Icon className="size-4" />
                        </span>
                        <h4 className="text-base font-semibold text-foreground">
                          {item.title}
                        </h4>
                      </div>
                      <div className="mt-4 space-y-3">
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
            </CardContent>
          </Card>
        </RevealItem>
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
