import type { ReactElement } from "react";
import Link from "next/link";
import {
  ArrowUp,
  BriefcaseBusiness,
  GitBranch,
  Mail,
  MapPin,
} from "lucide-react";
import { navigationItems, profile } from "@/constants/portfolio.constants";

const footerTechStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
];

type FooterAccountLink = {
  href: string;
  icon: ReactElement;
  isExternal: boolean;
  label: string;
};

type OptionalFooterAccountLink = Omit<FooterAccountLink, "href"> & {
  href?: string;
};

const hasAccountHref = (
  link: OptionalFooterAccountLink,
): link is FooterAccountLink => typeof link.href === "string";

/**
 * Renders the recruiter-focused site footer with profile links and an IT role CTA.
 */
export const SiteFooter = () => {
  const optionalFooterAccountLinks: OptionalFooterAccountLink[] = [
    {
      href: profile.githubUrl,
      icon: <GitBranch className="size-4" />,
      isExternal: true,
      label: "GitHub",
    },
    {
      href: profile.linkedinUrl,
      icon: <BriefcaseBusiness className="size-4" />,
      isExternal: true,
      label: "LinkedIn",
    },
    {
      href: profile.facebookUrl,
      icon: (
        <span
          aria-hidden="true"
          className="inline-flex size-4 items-center justify-center text-xs font-bold leading-none"
        >
          F
        </span>
      ),
      isExternal: true,
      label: "Facebook",
    },
    {
      href: `mailto:${profile.email}`,
      icon: <Mail className="size-4" />,
      isExternal: false,
      label: "Email",
    },
  ];
  const footerAccountLinks = optionalFooterAccountLinks.filter(hasAccountHref);

  return (
    <footer className="site-chrome relative overflow-hidden border-t border-border bg-muted/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 size-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 pb-10 sm:pb-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <section aria-labelledby="footer-identity">
            <p
              className="text-lg font-semibold tracking-tight text-foreground"
              id="footer-identity"
            >
              {profile.name}
            </p>
            <p className="mt-2 text-sm font-medium text-primary">
              {profile.role}
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              A versatile IT professional helping teams troubleshoot, validate,
              document, improve, and build reliable digital systems.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              {profile.location}
            </p>
          </section>

          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Profile links">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              Connect
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:max-w-sm lg:grid-cols-1">
              {footerAccountLinks.map(({ href, icon, isExternal, label }) => (
                <li key={label}>
                  <Link
                    className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href={href}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    target={isExternal ? "_blank" : undefined}
                  >
                    <span className="grid size-8 place-items-center rounded-full border border-border bg-background transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                      {icon}
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <p aria-hidden="true" className="hidden sm:block">
              ·
            </p>
            <p>Built with {footerTechStack.join(" · ")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
