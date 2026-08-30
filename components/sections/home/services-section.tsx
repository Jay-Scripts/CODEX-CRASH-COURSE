import type { Variants } from "framer-motion";
import { serviceOfferings } from "@/constants/portfolio.constants";
import { AnimatedSection } from "@/components/common/animated-section";
import { RevealGroup, RevealItem } from "@/components/common/scroll-reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { smoothMotionEase } from "@/utils/animations.utils";

const serviceGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.14,
    },
  },
};

const createServiceCardVariants = (index: number): Variants => {
  const direction = index % 2 === 0 ? -1 : 1;

  return {
    hidden: {
      opacity: 0,
      rotateY: direction * 12,
      rotateZ: direction * 3,
      scale: 0.9,
      transformPerspective: 900,
      x: direction * 44,
      y: 34,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      transformPerspective: 900,
      x: 0,
      y: 0,
      transition: {
        duration: 0.68,
        ease: smoothMotionEase,
      },
    },
  };
};

/**
 * Displays the core contribution areas offered across development, support, testing, and QA work.
 */
export const ServicesSection = () => (
  <AnimatedSection
    className="services-neomorphic-section px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    id="services"
  >
    <RevealGroup className="relative mx-auto max-w-7xl">
      <RevealItem>
        <SectionHeading
          description="I can contribute across the software lifecycle by building reliable applications, resolving technical issues, testing user flows, strengthening quality, and documenting systems clearly."
          eyebrow="What I Can Provide"
          title="Skills & Areas of Contribution"
        />
      </RevealItem>
      <RevealGroup
        className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-7 lg:grid-cols-3 xl:grid-cols-5"
        variants={serviceGridVariants}
      >
        {serviceOfferings.map((offering, index) => {
          const Icon = offering.icon;

          return (
            <RevealItem
              className="h-full [transform-style:preserve-3d] last:col-span-2 last:mx-auto last:w-[calc(50%_-_0.5rem)] sm:last:w-[calc(50%_-_0.875rem)] lg:last:col-span-1 lg:last:mx-0 lg:last:w-auto"
              key={offering.title}
              variants={createServiceCardVariants(index)}
            >
              <article className="service-neomorphic-panel group relative flex h-full min-h-60 flex-col items-center rounded-xl px-3 py-5 text-center text-card-foreground sm:min-h-[17rem] sm:rounded-2xl sm:px-5 sm:py-7 xl:min-h-[19rem]">
                <div className="service-neomorphic-inset grid size-10 place-items-center rounded-lg text-primary sm:size-12 sm:rounded-xl">
                  <Icon className="size-4 sm:size-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-foreground sm:mt-4 sm:text-lg sm:font-medium">
                  {offering.title}
                </h3>
                <p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                  {offering.description}
                </p>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </RevealGroup>
  </AnimatedSection>
);
