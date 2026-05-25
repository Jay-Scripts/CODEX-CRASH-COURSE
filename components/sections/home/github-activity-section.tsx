import { GitBranch } from "lucide-react";
import Link from "next/link";
import { profile } from "@/constants/portfolio.constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getGitHubActivity } from "@/lib/github-activity";
import { AnimatedSection } from "./animated-section";
import { RevealGroup, RevealItem } from "./scroll-reveal";
import { SectionHeading } from "./section-heading";

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
    <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-8" id="github">
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
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Contribution graph placeholder
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    12 weeks
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  {activity.contributionWeeks.map((value, index) => (
                    <div
                      className="flex h-32 items-end rounded-md bg-muted p-1"
                      key={`${value}-${index}`}
                    >
                      <div
                        className="w-full rounded-sm bg-primary"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                  ))}
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
                      <CardContent className="p-5">
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
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">
                    Recent repositories
                  </h3>
                  <RevealGroup className="space-y-4">
                    {activity.recentRepositories.map((repository) => (
                      <RevealItem key={repository.name}>
                        <Card className="bg-background shadow-none">
                          <CardContent className="p-4">
                            <p className="font-mono text-sm font-semibold">
                              {repository.name}
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {repository.description}
                            </p>
                            <p className="mt-3 text-xs text-primary">
                              {repository.stack}
                            </p>
                          </CardContent>
                        </Card>
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
