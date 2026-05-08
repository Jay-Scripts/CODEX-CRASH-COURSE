import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "@/features/portfolio/components/command-menu";
import { navigationItems, profile } from "@/features/portfolio/data";
import { ThemeToggle } from "./theme-toggle";

export const SiteHeader = () => (
  <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
    <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link className="flex items-center gap-3" href="#top">
        <span className="grid size-9 place-items-center rounded-md bg-primary font-mono text-sm font-semibold text-primary-foreground">
          CJ
        </span>
        <span className="hidden leading-tight sm:block">
          <span className="block text-sm font-semibold">{profile.name}</span>
          <span className="block text-xs text-muted-foreground">
            Junior Full-Stack Developer
          </span>
        </span>
      </Link>
      <nav
        aria-label="Primary navigation"
        className="hidden items-center gap-1 lg:flex"
      >
        {navigationItems.map((item) => (
          <Button asChild key={item.href} size="sm" variant="ghost">
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <CommandMenu />
        <ThemeToggle />
      </div>
    </div>
  </header>
);
