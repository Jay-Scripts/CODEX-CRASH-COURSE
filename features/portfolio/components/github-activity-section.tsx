import { GitBranch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { profile } from "@/features/portfolio/data";
import { getGitHubActivity } from "@/features/portfolio/services/github-activity";
import { AnimatedSection } from "./animated-section";
import { SectionHeading } from "./section-heading";

export const GitHubActivitySkeleton = () => (
  <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
    <Skeleton className="h-72" />
    <Skeleton className="h-72" />
  </div>
);

export const GitHubActivitySection = async () => {
  const activity = await getGitHubActivity();

  return (
    <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-8" id="github">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          description="A recruiter-friendly snapshot of repository activity, technical focus, and code organization signals."
          eyebrow="GitHub Activity"
          title="Repository activity and technical signals"
        />
        <div className="mb-8 flex justify-center">
          <Button asChild variant="outline">
            <Link href={profile.githubUrl} rel="noreferrer" target="_blank">
              <GitBranch />
              View GitHub Profile
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {activity.techStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <Card key={stat.label}>
                    <CardContent className="p-5">
                      <Icon className="mb-4 size-5 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-1 font-semibold">{stat.value}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Recent repositories
                </h3>
                <div className="space-y-4">
                  {activity.recentRepositories.map((repository) => (
                    <div
                      className="rounded-md border border-border bg-background p-4"
                      key={repository.name}
                    >
                      <p className="font-mono text-sm font-semibold">
                        {repository.name}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {repository.description}
                      </p>
                      <p className="mt-3 text-xs text-primary">
                        {repository.stack}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
