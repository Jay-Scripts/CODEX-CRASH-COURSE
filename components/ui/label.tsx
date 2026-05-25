import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type LabelProps = ComponentProps<"label">;

/**
 * Displays a reusable form label with shadcn-style typography and spacing.
 */
const Label = ({ className, ...props }: LabelProps) => (
  <label
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
);

export { Label };
