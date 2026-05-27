import { GitBranch } from "lucide-react";
import Link from "next/link";
import { profile } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getGitHubActivity } from "@/lib/github-activity";

/**
 * Displays the loading shell for the GitHub activity section.
 */
export const GitHubActivitySkeleton = () => (
  <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
    <Skeleton className="h-72" />
    <Skeleton className="h-72" />
  </div>
);

/**
 * Displays async GitHub activity, repository, and technical focus signals.
 */
export const GitHubActivitySection = async () => {
  const activity = await getGitHubActivity();

  return (
    <AnimatedSection className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" id="github">
      <RevealGroup className="mx-auto max-w-7xl">
        <RevealItem>
          <SectionHeading
            description="A recruiter-friendly snapshot of repository activity, technical focus, and code organization signals."
            eyebrow="GitHub Activity"
            title="Repository activity and technical signals"
          />
        </RevealItem>
        <RevealItem className="mb-8 flex justify-center">
          <Button asChild variant="outline">
            <Link
              href={profile.githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitBranch />
              View GitHub Profile
            </Link>
          </Button>
        </RevealItem>
        <RevealGroup className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealItem>
            <Card>
              <CardContent className="p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-semibold sm:text-lg">
                    Contribution graph placeholder
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    12 weeks
                  </span>
                </div>
                <div className="-mx-1 overflow-x-auto pb-2">
                  <div className="grid min-w-[32rem] grid-cols-12 gap-2 px-1">
                    {activity.contributionWeeks.map((value, index) => (
                      <div
                        className="flex h-28 items-end rounded-md bg-muted p-1 sm:h-32"
                        key={`${value}-${index}`}
                      >
                        <div
                          className="w-full rounded-sm bg-primary"
                          style={{ height: `${value}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </RevealItem>
          <RevealGroup className="grid gap-4">
            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {activity.techStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <RevealItem key={stat.label}>
                    <Card>
                      <CardContent className="p-4 sm:p-5">
                        <Icon className="mb-4 size-5 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="mt-1 font-semibold">{stat.value}</p>
                      </CardContent>
                    </Card>
                  </RevealItem>
                );
              })}
            </RevealGroup>
            <RevealItem>
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <h3 className="mb-4 text-base font-semibold sm:text-lg">
                    Recent repositories
                  </h3>
                  <RevealGroup className="space-y-4">
                    {activity.recentRepositories.map((repository) => (
                      <RevealItem key={repository.name}>
                        <article className="rounded-lg border border-border bg-background p-4">
                          <p className="break-words font-mono text-sm font-semibold">
                            {repository.name}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {repository.description}
                          </p>
                          <p className="mt-3 text-xs text-primary">
                            {repository.stack}
                          </p>
                        </article>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </CardContent>
              </Card>
            </RevealItem>
          </RevealGroup>
        </RevealGroup>
      </RevealGroup>
    </AnimatedSection>
  );
};
