"use client";

import { useReducedMotion } from "framer-motion";
import { TestTube2 } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Badge } from "@/components/ui/badge";
import {
  skillLogoMap,
  type SkillLogoMeta,
} from "@/constants/skill-logos.constants";
import { cn } from "@/lib/utils";

const COPY_COUNT = 3;
const GAP_PX = 12;
const BASE_SPEED_PX_PER_SECOND = 30;
const MAX_DRAG_SPEED_PX_PER_SECOND = BASE_SPEED_PX_PER_SECOND * 4;

type SkillItem = SkillLogoMeta & {
  group: string;
  name: string;
};

type SkillLogoPillProps = {
  isDuplicate?: boolean;
  skill: SkillItem;
};

const SkillLogoPill = ({ isDuplicate = false, skill }: SkillLogoPillProps) => {
  const Icon = skill.icon ?? TestTube2;

  return (
    <Badge
      aria-hidden={isDuplicate || undefined}
      className="glass-chip h-9 shrink-0 gap-2 px-3 py-0 text-sm font-medium text-foreground"
      variant="outline"
    >
      <span className="glass-inset grid size-6 shrink-0 place-items-center rounded-md text-primary">
        {skill.logo ? (
          <>
            <Image
              alt=""
              className={cn(
                "size-4 object-contain",
                skill.darkLogo && "dark:hidden",
                skill.logoClassName,
              )}
              height={16}
              loading="lazy"
              src={skill.logo}
              unoptimized
              width={16}
            />
            {skill.darkLogo ? (
              <Image
                alt=""
                className="hidden size-4 object-contain dark:block"
                height={16}
                loading="lazy"
                src={skill.darkLogo}
                unoptimized
                width={16}
              />
            ) : null}
          </>
        ) : (
          <Icon aria-hidden="true" className="size-3.5" />
        )}
      </span>
      <span className="whitespace-nowrap">{skill.name}</span>
    </Badge>
  );
};

type SkillsCarouselRowProps = {
  direction: "left" | "right";
  group: string;
  skills: readonly string[];
};

/** Displays one draggable, continuously looping row of skill badges. */
export const SkillsCarouselRow = ({
  direction,
  group,
  skills,
}: SkillsCarouselRowProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const movesRight = direction === "right";
  const skillItems = skills.map((name) => ({
    group,
    name,
    ...skillLogoMap[name],
  }));

  const stateRef = useRef({
    isDragging: false,
    isFocused: false,
    isHovered: false,
    lastFrameTime: 0,
    lastPointerTime: 0,
    lastPointerX: 0,
    offset: 0,
    singleWidth: 0,
    startOffset: 0,
    startPointerX: 0,
    velocity: 0,
  });

  const measure = useCallback(() => {
    const firstCopy = trackRef.current?.children[0] as HTMLElement | undefined;
    if (firstCopy) {
      stateRef.current.singleWidth = firstCopy.offsetWidth + GAP_PX;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (shouldReduceMotion) {
      if (track) track.style.transform = "translate3d(0, 0, 0)";
      return undefined;
    }

    let animationFrameId = 0;
    const speed =
      skills.length > 6
        ? BASE_SPEED_PX_PER_SECOND
        : BASE_SPEED_PX_PER_SECOND * 0.7;

    const tick = (currentTime: number) => {
      const state = stateRef.current;
      if (!state.singleWidth) measure();

      const elapsedSeconds = state.lastFrameTime
        ? Math.min((currentTime - state.lastFrameTime) / 1000, 0.05)
        : 0;
      state.lastFrameTime = currentTime;

      if (!state.isDragging) {
        const isPaused = state.isFocused || state.isHovered;
        const targetSpeed = isPaused ? 0 : speed;
        const smoothing = 1 - Math.pow(0.94, elapsedSeconds * 60);
        state.velocity += (targetSpeed - state.velocity) * smoothing;
        if (isPaused && Math.abs(state.velocity) < 0.05) {
          state.velocity = 0;
        }
        state.offset += state.velocity * elapsedSeconds;
      }

      if (state.singleWidth > 0) {
        state.offset =
          ((state.offset % state.singleWidth) + state.singleWidth) %
          state.singleWidth;
      }

      const displayOffset = movesRight
        ? state.singleWidth - state.offset
        : state.offset;
      if (track) {
        track.style.transform = `translate3d(${-displayOffset}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [measure, movesRight, shouldReduceMotion, skills.length]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(measure);
    if (outerRef.current) resizeObserver.observe(outerRef.current);
    return () => resizeObserver.disconnect();
  }, [measure]);

  const finishDragging = () => {
    const state = stateRef.current;
    if (!state.isDragging) return;
    state.isDragging = false;
    state.velocity = Math.max(0, state.velocity);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !event.isPrimary || event.button !== 0) return;

    const state = stateRef.current;
    state.isDragging = true;
    state.startPointerX = event.clientX;
    state.startOffset = state.offset;
    state.lastPointerX = event.clientX;
    state.lastPointerTime = performance.now();
    state.velocity = 0;
    outerRef.current?.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state.isDragging) return;

    const currentTime = performance.now();
    const deltaX = event.clientX - state.lastPointerX;
    const elapsedMilliseconds = currentTime - state.lastPointerTime || 1;
    const phaseDirection = movesRight ? 1 : -1;
    const dragVelocity =
      (phaseDirection * deltaX * 1000) / elapsedMilliseconds;
    state.velocity = Math.max(
      -MAX_DRAG_SPEED_PX_PER_SECOND,
      Math.min(MAX_DRAG_SPEED_PX_PER_SECOND, dragVelocity),
    );
    state.offset =
      state.startOffset +
      phaseDirection * (event.clientX - state.startPointerX);
    state.lastPointerX = event.clientX;
    state.lastPointerTime = currentTime;
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const carousel = outerRef.current;
    if (carousel?.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId);
    }
    finishDragging();
  };

  return (
    <div
      ref={outerRef}
      aria-label={
        shouldReduceMotion
          ? `${group} skills`
          : `${group} skills carousel, moving ${direction}. Focus to pause.`
      }
      className={cn(
        "skills-carousel-mask w-full min-w-0 max-w-full overflow-hidden rounded-xl",
        shouldReduceMotion
          ? "select-auto"
          : "cursor-grab touch-pan-y select-none active:cursor-grabbing",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
      )}
      role="region"
      tabIndex={shouldReduceMotion ? undefined : 0}
      onBlur={() => {
        stateRef.current.isFocused = false;
      }}
      onFocus={() => {
        stateRef.current.isFocused = true;
      }}
      onLostPointerCapture={finishDragging}
      onMouseEnter={() => {
        stateRef.current.isHovered = true;
      }}
      onMouseLeave={() => {
        stateRef.current.isHovered = false;
      }}
      onPointerCancel={onPointerEnd}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
    >
      <div
        ref={trackRef}
        className="flex w-max backface-hidden will-change-transform motion-reduce:will-change-auto"
        style={{ gap: GAP_PX }}
      >
        {Array.from({ length: COPY_COUNT }, (_, copyIndex) => (
          <div
            aria-hidden={copyIndex > 0 || undefined}
            className="flex shrink-0 py-1"
            key={copyIndex}
            style={{ gap: GAP_PX }}
          >
            {skillItems.map((skill) => (
              <SkillLogoPill
                isDuplicate={copyIndex > 0}
                key={`${skill.group}-${skill.name}-${copyIndex}`}
                skill={skill}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
