import { aboutEntries } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import LanyardCard from "@/components/common/lanyard-card";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { SectionHeading } from "@/components/common/section-heading";

const QUICK_FACTS = [
  { label: "Location", value: "Manila, Philippines" },
  { label: "Education", value: "BSIT, currently enrolled" },
  { label: "Role", value: "Junior Web Developer" },
] as const;

const TECH_TAGS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "PHP",
  "QA Testing",
] as const;

const LANYARD_GRAVITY: [number, number, number] = [0, -30, 0];

/**
 * Displays a recruiter-friendly profile overview with strengths, personal background, and goals.
 */
export const AboutSection = () => (
  <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="about">
    <RevealGroup className="relative mx-auto max-w-6xl">
      <SectionAccentBackdrop variant="left" />

      {/* Heading */}
      <RevealItem>
        <SectionHeading
          description="A clearer view of who I am, how I approach development, and where I want to grow."
          eyebrow="About"
          title="Personal details and long-term goals"
        />
      </RevealItem>

      {/* Bento grid */}
      <RevealGroup className="grid gap-3">
        {/* Top bento row */}
        <RevealItem>
          <div className="grid gap-3 lg:grid-cols-[1fr_19rem]">
            {/* Bio card — spans full height of top bento */}
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-7 shadow-sm shadow-primary/5 sm:p-8">
              {/* Subtle top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Personal details
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                I&apos;m Cornelio A. Gatbonton Jr., a BSIT student and Junior
                Web Developer based in Manila, Philippines. I build web
                applications using Next.js, React, Supabase/PostgreSQL, Tailwind
                CSS, PHP, and MySQL.
              </p>

              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                I have experience in frontend development, database design,
                authentication, RBAC, QA testing, technical documentation, and
                IT support. I enjoy building projects that are clear to use,
                reliable to maintain, and backed by thoughtful testing.
              </p>

              {/* Tech tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {TECH_TAGS.map((tag) => (
                  <span
                    className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right column: Lanyard + Quick facts */}
            <div className="flex flex-col gap-3">
              {/* Lanyard card */}
              <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-sm shadow-primary/5">
                <LanyardCard
                  frontImage="/jr-pic-transparent.png"
                  gravity={LANYARD_GRAVITY}
                  lanyardWidth={0.75}
                />
              </div>

              {/* Quick facts card */}
              <div
                className="relativerelative
h-[340px] sm:h-[380px] lg:h-[420px]
w-full overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-sm shadow-primary/5"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <ul className="divide-y divide-border/50">
                  {QUICK_FACTS.map(({ label, value }) => (
                    <li
                      className="flex items-center justify-between px-5 py-3.5"
                      key={label}
                    >
                      <span className="text-xs font-medium text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-xs font-semibold text-foreground">
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </RevealItem>

        {/* Bottom 2×2 entry cards */}
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
