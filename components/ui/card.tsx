import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Displays a reusable shadcn-style card surface.
 */
const Card = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "glass-panel rounded-2xl text-card-foreground",
      className,
    )}
    {...props}
  />
);

/**
 * Displays the header region for a reusable card surface.
 */
const CardHeader = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

/**
 * Displays the heading text for a reusable card surface.
 */
const CardTitle = ({ className, ...props }: ComponentProps<"h3">) => (
  <h3
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

/**
 * Displays supporting copy for a reusable card surface.
 */
const CardDescription = ({ className, ...props }: ComponentProps<"p">) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

/**
 * Displays the body region for a reusable card surface.
 */
const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

/**
 * Displays the footer region for a reusable card surface.
 */
const CardFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
