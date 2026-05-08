"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navigationItems, profile, projects } from "@/features/portfolio/data";
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

export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  useCommandShortcut({
    onToggle: () => setIsOpen((current) => !current),
  });

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
    <>
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
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-start bg-background/80 px-4 py-24 backdrop-blur-sm sm:place-items-center sm:py-4"
          role="dialog"
        >
          <div className="w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
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
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    href={item.href}
                    key={`${item.group}-${item.label}`}
                    onClick={closeMenu}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.group}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No matching portfolio items.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
