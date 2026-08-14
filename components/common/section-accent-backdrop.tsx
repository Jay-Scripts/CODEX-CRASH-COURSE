import { cn } from "@/lib/utils";

type SectionAccentBackdropProps = {
  className?: string;
  variant?: "center" | "left" | "right";
};

const accentLayouts: Record<
  NonNullable<SectionAccentBackdropProps["variant"]>,
  [string, string]
> = {
  center: [
    "-left-28 top-[12%] h-48 w-80 -rotate-12",
    "-right-32 bottom-[8%] h-56 w-96 rotate-12",
  ],
  left: [
    "-left-36 top-[14%] h-56 w-96 -rotate-12",
    "right-[4%] bottom-[10%] h-36 w-60 rotate-6",
  ],
  right: [
    "-right-36 top-[14%] h-56 w-96 rotate-12",
    "left-[4%] bottom-[10%] h-36 w-60 -rotate-6",
  ],
};

/**
 * Displays viewport-wide fluid-glass lenses behind section content.
 */
export const SectionAccentBackdrop = ({
  className,
  variant = "center",
}: SectionAccentBackdropProps) => (
  <div
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden opacity-70",
      className,
    )}
  >
    {accentLayouts[variant].map((layout, index) => (
      <span
        className={cn(
          "section-glass-lens absolute hidden rounded-full md:block",
          index === 1 && "section-glass-lens--delayed",
          layout,
        )}
        key={layout}
      />
    ))}
  </div>
);
