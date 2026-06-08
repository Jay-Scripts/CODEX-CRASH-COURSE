import { aboutEntries, aboutHighlights, profile } from "@/constants/portfolio.constants";
import { SectionAccentBackdrop } from "@/components/common/section-accent-backdrop";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
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

      <RevealGroup className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <RevealItem>
          <Card className="h-full border-border/70 bg-card/95 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <article className="flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{profile.role}</Badge>
                  <Badge variant="outline">{profile.location}</Badge>
                </div>

                <h3 className="mt-5 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Built to grow into a dependable full-stack teammate with strong quality instincts.
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {profile.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {aboutHighlights.map((highlight) => (
                    <Badge className="rounded-full px-3 py-1" key={highlight} variant="outline">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {aboutEntries.map((item) => {
                    const Icon = item.icon;

                    return (
                      <section
                        className="rounded-2xl border border-border/70 bg-background/80 p-5 shadow-sm"
                        key={item.title}
                      >
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-xl border border-border/70 bg-card text-primary">
                            <Icon className="size-4" />
                          </span>
                          <h4 className="text-base font-semibold text-foreground">
                            {item.title}
                          </h4>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                          {item.description[0]}
                        </p>
                      </section>
                    );
                  })}
                </div>
              </article>
            </CardContent>
          </Card>
        </RevealItem>

        <RevealGroup className="grid gap-4">
          {aboutEntries.map((item) => {
            const Icon = item.icon;

            return (
              <RevealItem key={`${item.title}-detail`}>
                <Card className="border-border/70 bg-card/95 shadow-sm">
                  <CardContent className="p-6 sm:p-7">
                    <article>
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl border border-border/70 bg-background/80 text-primary shadow-sm">
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            Profile focus
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-foreground sm:text-xl">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        {item.description.map((paragraph) => (
                          <p
                            className="text-sm leading-7 text-muted-foreground sm:text-base"
                            key={paragraph}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </article>
                  </CardContent>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
