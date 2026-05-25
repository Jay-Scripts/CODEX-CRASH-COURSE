import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Displays a reusable shadcn-style visual separator.
 */
const Separator = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("h-px w-full bg-border", className)} {...props} />
);

export { Separator };
