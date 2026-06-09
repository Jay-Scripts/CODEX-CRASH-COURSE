import { aboutEntries } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { SectionHeading } from "@/components/common/section-heading";

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
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
