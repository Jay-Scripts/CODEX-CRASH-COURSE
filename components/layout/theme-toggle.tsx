"use client";

import { useReducedMotion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Displays the light and dark mode toggle used in the site header.
 */
export const ThemeToggle = () => {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();
  const isTransitioningRef = useRef(false);
  const { setTheme, theme } = useTheme();

  if (!mounted) {
    return (
      <Button
        aria-label="Theme loading"
        className="cursor-default text-muted-foreground"
        disabled
        size="icon"
        type="button"
        variant="ghost"
      >
        <Monitor />
      </Button>
    );
  }

  const nextTheme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Moon : Sun;

  const handleThemeChange = () => {
    if (isTransitioningRef.current) {
      return;
    }

    if (shouldReduceMotion || !document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    isTransitioningRef.current = true;

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    const finishTransition = () => {
      isTransitioningRef.current = false;
    };

    void transition.finished.then(finishTransition, finishTransition);
  };

  return (
    <Button
      aria-label={`Switch to ${nextTheme} mode`}
      className="text-muted-foreground hover:cursor-pointer"
      onClick={handleThemeChange}
      size="icon"
      type="button"
      variant="ghost"
    >
      <Icon />
    </Button>
  );
};
