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
  <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
    <Badge
      className="mb-3 px-3 py-1 uppercase tracking-[0.18em]"
      variant="outline"
    >
      {eyebrow}
    </Badge>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-muted-foreground">
      {description}
    </p>
  </div>
);
