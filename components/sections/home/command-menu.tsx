"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { navigationItems, profile, projects } from "@/constants/portfolio.constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCommandShortcut } from "@/hooks/use-command-shortcut";

const commandItems = [
  ...navigationItems.map((item) => ({
    label: item.label,
    href: item.href,
    group: "Navigation",
  })),
  ...projects.map((project) => ({
    label: project.title,
    href: `#${project.id}`,
    group: "Projects",
  })),
  {
    label: "Download Resume",
    href: profile.resumeUrl,
    group: "Actions",
  },
];

/**
 * Displays the keyboard-first quick search menu for portfolio navigation.
 */
export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setQuery("");
  };

  useCommandShortcut({
    onToggle: () => setIsOpen((current) => !current),
  });

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commandItems;
    }

    return commandItems.filter((item) =>
      `${item.group} ${item.label}`.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        className="hidden min-w-44 justify-between text-muted-foreground lg:inline-flex"
        onClick={() => setIsOpen(true)}
        type="button"
        variant="outline"
      >
        <span className="inline-flex items-center gap-2">
          <Search />
          Quick search
        </span>
        <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          Ctrl K
        </kbd>
      </Button>
      <Button
        aria-label="Open command menu"
        className="text-muted-foreground lg:hidden"
        onClick={() => setIsOpen(true)}
        size="icon"
        type="button"
        variant="ghost"
      >
        <Search />
      </Button>
      {isOpen ? (
        <>
          <div
            aria-modal="true"
            className="fixed inset-0 z-[55] bg-background/80 backdrop-blur-sm lg:hidden"
            role="dialog"
          >
            <div className="mx-auto flex min-h-full w-full max-w-7xl justify-center px-4 pt-20 sm:px-6 sm:pt-24">
              <Card className="w-full max-w-xl overflow-hidden border-border/70 shadow-2xl">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 border-b border-border p-4">
                    <Search className="size-4 text-muted-foreground" />
                    <Input
                      autoFocus
                      aria-label="Search portfolio"
                      className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search sections, projects, or actions..."
                      value={query}
                    />
                    <Button
                      aria-label="Close command menu"
                      onClick={closeMenu}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <X />
                    </Button>
                  </div>
                  <div className="max-h-[min(26rem,calc(100vh-8rem))] overflow-y-auto p-2">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <Button
                          asChild
                          className="h-auto w-full justify-between px-3 py-3 text-sm"
                          key={`${item.group}-${item.label}`}
                          variant="ghost"
                        >
                          <Link href={item.href} onClick={closeMenu}>
                            <span>{item.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.group}
                            </span>
                          </Link>
                        </Button>
                      ))
                    ) : (
                      <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                        No matching portfolio items.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card
            className={cn(
              "absolute right-0 top-full z-[65] mt-3 hidden w-[min(32rem,calc(100vw-2rem))] overflow-hidden border-border/70 shadow-2xl lg:block",
              "max-w-xl",
            )}
          >
            <CardContent className="p-0">
              <div className="flex items-center gap-3 border-b border-border p-4">
                <Search className="size-4 text-muted-foreground" />
                <Input
                  autoFocus
                  aria-label="Search portfolio"
                  className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search sections, projects, or actions..."
                  value={query}
                />
                <Button
                  aria-label="Close command menu"
                  onClick={closeMenu}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <X />
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <Button
                      asChild
                      className="h-auto w-full justify-between px-3 py-3 text-sm"
                      key={`${item.group}-${item.label}`}
                      variant="ghost"
                    >
                      <Link href={item.href} onClick={closeMenu}>
                        <span>{item.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.group}
                        </span>
                      </Link>
                    </Button>
                  ))
                ) : (
                  <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No matching portfolio items.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
};
