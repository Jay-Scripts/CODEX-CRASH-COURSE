"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { profile, navigationItems } from "@/constants/portfolio.constants";
import { cn } from "@/lib/utils";
import { CommandMenu } from "./command-menu";
import { ThemeToggle } from "./theme-toggle";

const smoothEase = [0.22, 1, 0.36, 1] as const;
const crispEase = [0.4, 0, 0.2, 1] as const;

const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -14,
    height: 0,
    transition: {
      duration: 0.22,
      ease: crispEase,
      when: "afterChildren",
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      duration: 0.28,
      ease: smoothEase,
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

const mobileItemVariants: Variants = {
  closed: {
    opacity: 0,
    y: -8,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: smoothEase,
    },
  },
};

/**
 * Displays the sticky site header with responsive navigation, search, and theme controls.
 */
export const SiteHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSectionNavigation = (href: string) => {
    const section = document.querySelector<HTMLElement>(href);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", href);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMobileMenu();
      }
    };

    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            className="flex items-center gap-3"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              handleSectionNavigation("#top");
            }}
          >
            <span className="flex size-15 items-center justify-center ">
              <Image
                alt={profile.logoAlt}
                className="h-auto w-full"
                height={500}
                priority
                src={profile.logoSrc}
                width={500}
              />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-lg font-semibold">
                {profile.name}
              </span>
            </span>
          </Link>
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigationItems.map((item) => (
              <Button asChild key={item.href} size="sm" variant="ghost">
                <Link
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSectionNavigation(item.href);
                  }}
                >
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <CommandMenu />
            <ThemeToggle />
            <Button
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              className={cn(
                "text-muted-foreground transition-colors lg:hidden",
                isMobileMenuOpen && "bg-accent text-foreground",
              )}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              size="icon"
              type="button"
              variant="ghost"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out",
                    isMobileMenuOpen && "top-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out",
                    isMobileMenuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out",
                    isMobileMenuOpen && "top-1.5 -rotate-45",
                  )}
                />
              </span>
            </Button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {isMobileMenuOpen ? (
            <motion.div
              animate="open"
              className="absolute inset-x-4 top-full overflow-hidden rounded-b-lg border border-t-0 border-border/70 bg-background/95 shadow-2xl backdrop-blur-2xl sm:inset-x-6 lg:hidden"
              exit="closed"
              id="mobile-navigation"
              initial="closed"
              variants={mobileMenuVariants}
            >
              <motion.div
                className="border-b border-border/70 px-4 pb-3 pt-4"
                variants={mobileItemVariants}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Navigation
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Explore my work, experience, and the best way to reach me.
                </p>
              </motion.div>
              <nav aria-label="Mobile navigation" className="grid gap-1 p-3">
                {navigationItems.map((item) => (
                  <motion.div key={item.href} variants={mobileItemVariants}>
                    <Button
                      asChild
                      className="h-11 w-full justify-start rounded-2xl px-4 text-base"
                      variant="ghost"
                    >
                      <Link
                        href={item.href}
                        onClick={(event) => {
                          event.preventDefault();
                          handleSectionNavigation(item.href);
                          closeMobileMenu();
                        }}
                      >
                        {item.label}
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
};
