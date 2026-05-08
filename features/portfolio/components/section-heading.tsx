type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export const SectionHeading = ({
  description,
  eyebrow,
  title,
}: SectionHeadingProps) => (
  <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
    <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
      {eyebrow}
    </p>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-muted-foreground">
      {description}
    </p>
  </div>
);
