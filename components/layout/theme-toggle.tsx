"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

export const ThemeToggle = () => {
  const mounted = useMounted();
  const { setTheme, theme } = useTheme();

  if (!mounted) {
    return (
      <Button
        aria-label="Theme loading"
        className="text-muted-foreground"
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

  return (
    <Button
      aria-label={`Switch to ${nextTheme} mode`}
      className="text-muted-foreground"
      onClick={() => setTheme(nextTheme)}
      size="icon"
      type="button"
      variant="ghost"
    >
      <Icon />
    </Button>
  );
};
