import Link from "next/link";
import { BriefcaseBusiness, GitBranch, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/features/portfolio/data";

export const SiteFooter = () => (
  <footer className="border-t border-border bg-muted/30">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Separator />
      <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.
        </p>
        <div className="flex items-center gap-3">
          <Link
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
            href={profile.githubUrl}
          >
            <GitBranch className="size-4" />
          </Link>
          <Link
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
            href={profile.linkedinUrl}
          >
            <BriefcaseBusiness className="size-4" />
          </Link>
          <Link
            aria-label="Email"
            className="transition-colors hover:text-foreground"
            href={`mailto:${profile.email}`}
          >
            <Mail className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
