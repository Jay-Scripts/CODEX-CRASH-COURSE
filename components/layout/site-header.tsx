"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { profile, navigationItems } from "@/constants/portfolio.constants";
import { cn } from "@/lib/utils";
import { smoothMotionEase } from "@/utils/animations.utils";
import { CommandMenu } from "./command-menu";
import { ThemeToggle } from "./theme-toggle";

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
      duration: 0.5,
      ease: smoothMotionEase,
      when: "beforeChildren",
      staggerChildren: 0.01,
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
      ease: smoothMotionEase,
    },
  },
};

const navbarItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
    rotateX: 22,
    transformOrigin: "50% 0%",
    transformPerspective: 800,
  },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformOrigin: "50% 50%",
    transformPerspective: 800,
    transition: {
      duration: 0.55,
      delay: index * 0.2,
      ease: smoothMotionEase,
    },
  }),
};

/**
 * Displays the sticky site header with responsive navigation, search, and theme controls.
 */
export const SiteHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoMarkup, setLogoMarkup] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let isActive = true;

    fetch(profile.logoSrc)
      .then((response) => response.text())
      .then((markup) => {
        if (isActive) {
          setLogoMarkup(markup);
        }
      })
      .catch(() => {
        // Keep the regular image fallback if the inline SVG cannot be loaded.
      });

    return () => {
      isActive = false;
    };
  }, []);

  const themedLogoMarkup = logoMarkup
    ?.replace("<svg ", '<svg class="h-full w-full" ')
    .replace(
      'fill="#14233a"',
      resolvedTheme === "dark" ? 'fill="#f8fafc"' : 'fill="#14233a"',
    );

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
    <>
      <header className="site-chrome sticky top-0 z-50 border-b border-border bg-background">
        <div className="relative ">
          <motion.div
            animate="visible"
            className="flex h-16 w-full items-center justify-between px-4 [perspective:800px] transition-[padding] duration-500 ease-out sm:px-6 lg:px-8"
            initial="hidden"
          >
            <motion.div
              className="[transform-style:preserve-3d]"
              custom={0}
              variants={navbarItemVariants}
            >
              <Link
                className="flex items-center gap-3"
                href="#top"
                onClick={(event) => {
                  event.preventDefault();
                  handleSectionNavigation("#top");
                }}
              >
                <span className="flex size-15 items-center justify-center ">
                  {themedLogoMarkup ? (
                    <span
                      aria-label={profile.logoAlt}
                      className="block h-full w-full"
                      dangerouslySetInnerHTML={{
                        __html: themedLogoMarkup,
                      }}
                      role="img"
                    />
                  ) : (
                    <Image
                      alt={profile.logoAlt}
                      className="h-auto w-full"
                      height={500}
                      src={profile.logoSrc}
                      width={500}
                    />
                  )}
                </span>
                <span
                  aria-label={profile.name}
                  className="hidden items-baseline gap-x-1 leading-none sm:flex"
                >
                  <span className="text-lg font-black tracking-[-0.04em] text-foreground sm:text-xl">
                    Cornelio
                  </span>
                  <span className="bg-linear-to-r from-[#5268ff] via-[#6374ff] to-[#7882ef] bg-clip-text text-lg font-black tracking-[-0.04em] text-transparent sm:text-xl">
                    A.
                  </span>
                  <span className="bg-linear-to-r from-[#5268ff] via-[#6374ff] to-[#7882ef] bg-clip-text text-lg font-black tracking-[-0.04em] text-transparent sm:text-xl">
                    Gatbonton
                  </span>
                  <span className="bg-linear-to-r from-[#7882ef] to-[#969cf4] bg-clip-text text-lg font-black tracking-[-0.04em] text-transparent sm:text-xl">
                    Jr
                  </span>
                </span>
              </Link>
            </motion.div>
            <nav aria-label="Primary navigation" className="flex">
              <div className="hidden items-center gap-1 lg:flex">
                {navigationItems.map((item, index) => (
                  <motion.div
                    className="[transform-style:preserve-3d]"
                    custom={index + 1}
                    key={item.href}
                    variants={navbarItemVariants}
                  >
                  <Button asChild size="sm" variant="ghost">
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
                  </motion.div>
                ))}
              </div>
              <div className="flex  items-center gap-2">
                <motion.div
                  custom={navigationItems.length + 1}
                  variants={navbarItemVariants}
                >
                  <CommandMenu />
                </motion.div>
                <motion.div
                  custom={navigationItems.length + 2}
                  variants={navbarItemVariants}
                >
                  <ThemeToggle />
                </motion.div>
                <motion.div
                  className="[transform-style:preserve-3d] lg:hidden"
                  custom={navigationItems.length + 3}
                  variants={navbarItemVariants}
                >
                  <Button
                    aria-controls="mobile-navigation"
                    aria-expanded={isMobileMenuOpen}
                    aria-label={
                      isMobileMenuOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                    }
                    className={cn(
                      "text-muted-foreground transition-colors",
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
                </motion.div>
              </div>
            </nav>
          </motion.div>
          <AnimatePresence initial={false}>
            {isMobileMenuOpen ? (
              <motion.div
                animate="open"
                className="glass-panel absolute inset-x-4 top-full overflow-hidden rounded-b-lg border border-t-0 sm:inset-x-6 lg:hidden"
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
    </>
  );
};
