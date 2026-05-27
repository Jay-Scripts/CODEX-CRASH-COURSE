import Link from "next/link";
import { BriefcaseBusiness, GitBranch, Mail } from "lucide-react";
import { profile } from "@/constants/portfolio.constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * Displays the footer stack summary and outbound profile links.
 */
export const SiteFooter = () => (
  <footer className="border-t border-border bg-muted/30">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Separator />
      <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.
        </p>
        <nav aria-label="Profile links" className="flex items-center gap-3">
          <Button asChild size="icon" variant="ghost">
            <Link
              aria-label="GitHub"
              href={profile.githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitBranch className="size-4" />
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost">
            <Link
              aria-label="LinkedIn"
              href={profile.linkedinUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <BriefcaseBusiness className="size-4" />
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost">
            <Link aria-label="Email" href={`mailto:${profile.email}`}>
              <Mail className="size-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  </footer>
);
