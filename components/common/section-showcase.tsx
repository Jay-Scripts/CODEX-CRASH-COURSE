import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShowcaseProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  glowPosition?: "center" | "left" | "right";
};

const glowPositionClassNames: Record<
  NonNullable<SectionShowcaseProps["glowPosition"]>,
  { primary: string; secondary: string }
> = {
  center: {
    primary: "-left-12 top-12",
    secondary: "-right-14 bottom-0",
  },
  left: {
    primary: "-left-10 top-10",
    secondary: "right-8 bottom-0",
  },
  right: {
    primary: "left-10 top-8",
    secondary: "-right-10 bottom-0",
  },
};

/**
 * Displays a reusable framed surface with ambient glows so home sections feel more layered and lively.
 */
export const SectionShowcase = ({
  children,
  className,
  glowPosition = "center",
  ...props
}: SectionShowcaseProps) => {
  const glowClasses = glowPositionClassNames[glowPosition];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 p-5 shadow-xl shadow-primary/5 backdrop-blur-sm sm:p-7 lg:p-8",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute size-36 rounded-full bg-primary/10 blur-3xl sm:size-44",
          glowClasses.primary,
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute size-40 rounded-full bg-primary/10 blur-3xl sm:size-52",
          glowClasses.secondary,
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-[1.45rem] border border-border/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
