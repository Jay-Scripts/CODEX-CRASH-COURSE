import { cn } from "@/lib/utils";

type AccentLayout = {
  boxClassName: string;
  delay: string;
  duration: string;
  innerClassName: string;
  innerSizeClassName: string;
  rotate: string;
  spin: "section-orbit" | "section-orbit-reverse";
};

type SectionAccentBackdropProps = {
  className?: string;
  variant?: "center" | "left" | "right";
};

const accentLayouts: Record<
  NonNullable<SectionAccentBackdropProps["variant"]>,
  AccentLayout[]
> = {
  center: [
    {
      boxClassName: "left-[8%] top-10 size-16 sm:size-20 lg:size-24",
      delay: "-2s",
      duration: "22s",
      innerClassName: "left-2 top-2",
      innerSizeClassName: "size-7 sm:size-8",
      rotate: "-10deg",
      spin: "section-orbit",
    },
    {
      boxClassName: "right-[10%] top-24 size-14 sm:size-[4.5rem] lg:size-20",
      delay: "-6s",
      duration: "18s",
      innerClassName: "right-1.5 top-1.5",
      innerSizeClassName: "size-6 sm:size-7",
      rotate: "14deg",
      spin: "section-orbit-reverse",
    },
    {
      boxClassName: "bottom-14 left-[18%] size-20 sm:size-24 lg:size-28",
      delay: "-4s",
      duration: "26s",
      innerClassName: "bottom-2 right-2",
      innerSizeClassName: "size-8 sm:size-10",
      rotate: "6deg",
      spin: "section-orbit-reverse",
    },
    {
      boxClassName: "bottom-10 right-[20%] size-16 sm:size-20 lg:size-24",
      delay: "-8s",
      duration: "20s",
      innerClassName: "bottom-2 left-2",
      innerSizeClassName: "size-7 sm:size-8",
      rotate: "-8deg",
      spin: "section-orbit",
    },
  ],
  left: [
    {
      boxClassName: "left-[4%] top-12 size-16 sm:size-20 lg:size-24",
      delay: "-5s",
      duration: "24s",
      innerClassName: "left-2 top-2",
      innerSizeClassName: "size-7 sm:size-8",
      rotate: "-12deg",
      spin: "section-orbit",
    },
    {
      boxClassName: "left-[12%] bottom-12 size-20 sm:size-24 lg:size-28",
      delay: "-1s",
      duration: "28s",
      innerClassName: "bottom-2 right-2",
      innerSizeClassName: "size-8 sm:size-10",
      rotate: "10deg",
      spin: "section-orbit-reverse",
    },
    {
      boxClassName: "right-[14%] top-28 size-14 sm:size-16 lg:size-20",
      delay: "-7s",
      duration: "18s",
      innerClassName: "right-1.5 top-1.5",
      innerSizeClassName: "size-6 sm:size-7",
      rotate: "8deg",
      spin: "section-orbit",
    },
  ],
  right: [
    {
      boxClassName: "right-[4%] top-12 size-16 sm:size-20 lg:size-24",
      delay: "-3s",
      duration: "24s",
      innerClassName: "right-2 top-2",
      innerSizeClassName: "size-7 sm:size-8",
      rotate: "12deg",
      spin: "section-orbit-reverse",
    },
    {
      boxClassName: "right-[12%] bottom-12 size-20 sm:size-24 lg:size-28",
      delay: "-6s",
      duration: "28s",
      innerClassName: "bottom-2 left-2",
      innerSizeClassName: "size-8 sm:size-10",
      rotate: "-8deg",
      spin: "section-orbit",
    },
    {
      boxClassName: "left-[14%] top-28 size-14 sm:size-16 lg:size-20",
      delay: "-2s",
      duration: "18s",
      innerClassName: "left-1.5 top-1.5",
      innerSizeClassName: "size-6 sm:size-7",
      rotate: "-10deg",
      spin: "section-orbit",
    },
  ],
};

/**
 * Displays subtle rotating dashed-box accents behind section content without overpowering the layout.
 */
export const SectionAccentBackdrop = ({
  className,
  variant = "center",
}: SectionAccentBackdropProps) => (
  <div
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute inset-0 overflow-hidden opacity-70",
      className,
    )}
  >
    {accentLayouts[variant].map((layout) => (
      <div
        className={cn("absolute hidden md:block", layout.boxClassName)}
        key={layout.boxClassName}
        style={{
          animation: `section-drift ${layout.duration} ease-in-out infinite`,
          animationDelay: layout.delay,
          transform: `rotate(${layout.rotate})`,
        }}
      >
        <div
          className="relative size-full rounded-[1.25rem] border border-dashed"
          style={{
            animation: `${layout.spin} ${layout.duration} linear infinite`,
            animationDelay: layout.delay,
            backgroundColor: "var(--section-accent-surface)",
            borderColor: "var(--section-accent-border)",
          }}
        >
          <span
            className={cn(
              "absolute rounded-[0.9rem] border border-dashed",
              layout.innerClassName,
              layout.innerSizeClassName,
            )}
            style={{
              animation: `${layout.spin === "section-orbit" ? "section-orbit-reverse" : "section-orbit"} ${layout.duration} linear infinite`,
              animationDelay: layout.delay,
              borderColor: "var(--section-accent-detail)",
            }}
          />
        </div>
      </div>
    ))}
    <span
      className="absolute left-[10%] top-1/3 hidden size-2 rounded-full md:block"
      style={{
        animation: "section-drift 12s ease-in-out infinite",
        backgroundColor: "var(--section-accent-detail)",
      }}
    />
    <span
      className="absolute bottom-1/4 right-[12%] hidden size-2 rounded-full lg:block"
      style={{
        animation: "section-drift 14s ease-in-out infinite",
        animationDelay: "-4s",
        backgroundColor: "var(--section-accent-detail)",
      }}
    />
  </div>
);
