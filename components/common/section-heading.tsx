import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  className?: string;
  description: string;
  eyebrow: string;
  title: string;
};

/**
 * Displays the shared heading pattern used across home page sections.
 */
export const SectionHeading = ({
  className,
  description,
  eyebrow,
  title,
}: SectionHeadingProps) => (
  <header
    className={cn(
      "mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12",
      className,
    )}
  >
    <div className="mb-4 flex justify-center">
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </div>
    <Badge
      className="glass-chip mb-4 rounded-full px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.24em]"
      variant="outline"
    >
      {eyebrow}
    </Badge>
    <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
      {title}
    </h2>
    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
      {description}
    </p>
  </header>
);
