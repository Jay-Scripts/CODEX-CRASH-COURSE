import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Displays a reusable shadcn-style multiline form input.
 */
const Textarea = ({ className, ...props }: ComponentProps<"textarea">) => (
  <textarea
    className={cn(
      "glass-inset flex min-h-28 w-full rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
);

export { Textarea };
