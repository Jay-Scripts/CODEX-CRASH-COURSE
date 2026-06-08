import type { ReactElement } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  GitBranch,
  Mail,
} from "lucide-react";
import { profile } from "@/constants/portfolio.constants";

const footerTechStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
];

/**
 * Renders a mobile-first footer that scales smoothly from centered phone
 * layout to balanced tablet and desktop arrangements.
 */
export const SiteFooter = () => {
  const footerAccountLinks: Array<{
    href?: string;
    icon: ReactElement;
    isExternal: boolean;
    label: string;
  }> = [
    {
      href: profile.githubUrl,
      icon: <GitBranch className="size-3.5" />,
      isExternal: true,
      label: "GitHub",
    },
    {
      href: profile.linkedinUrl,
      icon: <BriefcaseBusiness className="size-3.5" />,
      isExternal: true,
      label: "LinkedIn",
    },
    {
      href: profile.facebookUrl,
      icon: (
        <span
          aria-hidden="true"
          className="inline-flex size-3.5 items-center justify-center text-[0.7rem] font-bold leading-none"
        >
          F
        </span>
      ),
      isExternal: true,
      label: "Facebook",
    },
    {
      href: `mailto:${profile.email}`,
      icon: <Mail className="size-3.5" />,
      isExternal: false,
      label: "Email",
    },
  ].filter(
    (
      link,
    ): link is {
      href: string;
      icon: ReactElement;
      isExternal: boolean;
      label: string;
    } => Boolean(link.href),
  );

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] md:items-start lg:gap-14">
          <section
            aria-labelledby="footer-identity"
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <p
              className="text-sm font-medium text-foreground"
              id="footer-identity"
            >
              {profile.name}
            </p>
         
            <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-foreground sm:max-w-lg md:max-w-md lg:max-w-xl">
              {profile.summary}
            </p>
          </section>

          <nav
            aria-label="Profile links"
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Links
            </p>
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2 md:grid-cols-1 lg:grid-cols-2">
              {footerAccountLinks.map(
                ({ href, icon, isExternal, label }) => (
                  <Link
                    key={label}
                    className="flex items-center justify-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:justify-start"
                    href={href!}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    target={isExternal ? "_blank" : undefined}
                  >
                    {icon}
                    {label}
                  </Link>
                ),
              )}
            </div>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-2 border-t border-border pt-5 text-center sm:mt-10 sm:gap-3 md:flex-row md:justify-between md:text-left">
          <p className="text-[11px] text-muted-foreground">
            Built with {footerTechStack.join(" · ")}
          </p>
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
