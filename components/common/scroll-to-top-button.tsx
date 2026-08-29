"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SCROLL_VISIBILITY_OFFSET = 520;

/**
 * Displays a floating back-to-top button on the right side after the user scrolls down the page.
 */
export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_VISIBILITY_OFFSET);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      aria-label="Back to top"
      className={cn(
        "fixed bottom-5 right-4 z-[55] size-11 rounded-full border border-border/70 bg-background text-foreground shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-1 sm:bottom-6 sm:right-6",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
      onClick={handleBackToTop}
      size="icon"
      type="button"
      variant="outline"
    >
      <ArrowUp className="size-4" />
    </Button>
  );
};
