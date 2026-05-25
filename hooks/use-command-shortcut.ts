"use client";

import { useEffect } from "react";

type UseCommandShortcutOptions = {
  enabled?: boolean;
  onToggle: () => void;
};

/**
 * Registers a Ctrl/Cmd + K shortcut that toggles the command menu.
 */
export const useCommandShortcut = ({
  enabled = true,
  onToggle,
}: UseCommandShortcutOptions) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const isCommandKey = event.metaKey || event.ctrlKey;

      if (isCommandKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onToggle]);
};
