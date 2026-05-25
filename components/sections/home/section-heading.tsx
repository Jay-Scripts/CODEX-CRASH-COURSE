import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  description: string;
  eyebrow: string;
  title: string;
};

/**
 * Displays the shared heading pattern used across home page sections.
 */
export const SectionHeading = ({
  description,
  eyebrow,
  title,
}: SectionHeadingProps) => (
  <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12">
    <Badge
      className="mb-3 px-3 py-1 text-[11px] uppercase tracking-[0.18em] sm:text-xs"
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
  </div>
);
