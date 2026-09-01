"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type InteractiveConstellationProps = {
  className?: string;
};

type ConstellationPoint = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
};

const CONNECTION_DISTANCE = 190;
const POINTER_CONNECTION_DISTANCE = 245;
const POINT_DENSITY = 15_000;
const MAX_POINTS = 84;
const TARGET_FRAME_INTERVAL = 1000 / 60;
const FRAME_INTERVAL_TOLERANCE = 0.5;

/**
 * Draws a section-scoped field of drifting points that connect to nearby points and the visitor's pointer.
 */
export const InteractiveConstellation = ({
  className,
}: InteractiveConstellationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const precisePointerQuery = window.matchMedia("(pointer: fine)");
    const pointer = { x: 0, y: 0, active: false };
    const container = canvas.parentElement;

    if (!container) {
      return;
    }

    let points: ConstellationPoint[] = [];
    let animationFrame = 0;
    let positionFrame = 0;
    let isVisible = false;
    let lastFrameTime = 0;
    let width = 0;
    let height = 0;
    let pointColor = "";
    let lineColor = "";

    const readThemeColors = () => {
      const styles = getComputedStyle(canvas);
      const primaryColor =
        styles.getPropertyValue("--primary").trim() || styles.color;
      pointColor = primaryColor;
      lineColor = primaryColor;
    };

    const createPoints = () => {
      const pointCount = Math.max(
        29,
        Math.min(MAX_POINTS, Math.round((width * height) / POINT_DENSITY)),
      );

      points = Array.from({ length: pointCount }, (_, index) => {
        const columnCount = Math.max(5, Math.ceil(Math.sqrt(pointCount * 1.8)));
        const rowCount = Math.ceil(pointCount / columnCount);
        const column = index % columnCount;
        const row = Math.floor(index / columnCount);
        const cellWidth = width / columnCount;
        const cellHeight = height / rowCount;
        const x = cellWidth * (column + 0.2 + Math.random() * 0.6);
        const y = cellHeight * (row + 0.2 + Math.random() * 0.6);
        const travelAngle = Math.random() * Math.PI * 2;
        const travelSpeed = 0.14 + Math.random() * 0.18;

        return {
          x,
          y,
          velocityX: Math.cos(travelAngle) * travelSpeed,
          velocityY: Math.sin(travelAngle) * travelSpeed,
          radius: 1 + Math.random() * 1.2,
        };
      });
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createPoints();
      readThemeColors();
    };

    const drawLine = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      opacity: number,
      lineWidth = 0.7,
    ) => {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.strokeStyle = lineColor;
      context.globalAlpha = opacity;
      context.lineWidth = lineWidth;
      context.stroke();
    };

    const render = (currentTime = performance.now()) => {
      if (
        !reducedMotionQuery.matches &&
        currentTime - lastFrameTime <
          TARGET_FRAME_INTERVAL - FRAME_INTERVAL_TOLERANCE
      ) {
        animationFrame = window.requestAnimationFrame(render);
        return;
      }

      lastFrameTime = currentTime;
      context.clearRect(0, 0, width, height);
      const shouldMove = !reducedMotionQuery.matches;

      points.forEach((point, pointIndex) => {
        if (shouldMove) {
          point.x += point.velocityX;
          point.y += point.velocityY;

          if (
            (point.x <= point.radius && point.velocityX < 0) ||
            (point.x >= width - point.radius && point.velocityX > 0)
          ) {
            point.velocityX *= -1;
          }

          if (
            (point.y <= point.radius && point.velocityY < 0) ||
            (point.y >= height - point.radius && point.velocityY > 0)
          ) {
            point.velocityY *= -1;
          }

          point.x = Math.min(
            Math.max(point.x, point.radius),
            width - point.radius,
          );
          point.y = Math.min(
            Math.max(point.y, point.radius),
            height - point.radius,
          );
        }

        for (
          let neighborIndex = pointIndex + 1;
          neighborIndex < points.length;
          neighborIndex += 1
        ) {
          const neighbor = points[neighborIndex];
          const deltaX = point.x - neighbor.x;
          const deltaY = point.y - neighbor.y;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;

          if (distanceSquared < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const distance = Math.sqrt(distanceSquared);
            drawLine(
              point.x,
              point.y,
              neighbor.x,
              neighbor.y,
              (1 - distance / CONNECTION_DISTANCE) * 0.28,
            );
          }
        }

        if (pointer.active && precisePointerQuery.matches) {
          const pointerDeltaX = point.x - pointer.x;
          const pointerDeltaY = point.y - pointer.y;
          const pointerDistanceSquared =
            pointerDeltaX * pointerDeltaX + pointerDeltaY * pointerDeltaY;

          if (
            pointerDistanceSquared <
            POINTER_CONNECTION_DISTANCE * POINTER_CONNECTION_DISTANCE
          ) {
            const pointerDistance = Math.sqrt(pointerDistanceSquared);
            const connectionStrength =
              1 - pointerDistance / POINTER_CONNECTION_DISTANCE;
            drawLine(
              pointer.x,
              pointer.y,
              point.x,
              point.y,
              connectionStrength * 0.72,
              0.9,
            );
          }
        }

        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = pointColor;
        context.globalAlpha = pointer.active ? 0.72 : 0.46;
        context.fill();
      });

      if (pointer.active && precisePointerQuery.matches) {
        context.beginPath();
        context.arc(pointer.x, pointer.y, 2.2, 0, Math.PI * 2);
        context.fillStyle = pointColor;
        context.globalAlpha = 0.9;
        context.fill();
      }

      context.globalAlpha = 1;

      if (isVisible && !reducedMotionQuery.matches) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const isInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;

      pointer.active = isInside;

      if (isInside) {
        pointer.x = event.clientX - bounds.left;
        pointer.y = event.clientY - bounds.top;

        if (reducedMotionQuery.matches) {
          render();
        }
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const restartAnimation = () => {
      window.cancelAnimationFrame(animationFrame);
      lastFrameTime = 0;
      render();
    };

    const updateCanvasPosition = () => {
      const bounds = container.getBoundingClientRect();
      const maximumOffset = Math.max(0, bounds.height - window.innerHeight);
      const offset = Math.min(Math.max(-bounds.top, 0), maximumOffset);

      canvas.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const requestPositionUpdate = () => {
      if (!isVisible || positionFrame) {
        return;
      }

      positionFrame = window.requestAnimationFrame(() => {
        positionFrame = 0;
        updateCanvasPosition();
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!isVisible) {
        return;
      }

      updateCanvasPosition();
      resizeCanvas();
      restartAnimation();
    });
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          canvas.style.willChange = "transform";
          updateCanvasPosition();
          resizeCanvas();
          restartAnimation();
        } else {
          window.cancelAnimationFrame(animationFrame);
          canvas.style.willChange = "auto";
          points = [];
          canvas.width = 1;
          canvas.height = 1;
        }
      },
      { threshold: 0 },
    );
    const themeObserver = new MutationObserver(() => {
      if (isVisible) {
        readThemeColors();
      }
    });

    resizeObserver.observe(container);
    visibilityObserver.observe(container);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("scroll", requestPositionUpdate, {
      passive: true,
    });
    reducedMotionQuery.addEventListener("change", restartAnimation);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(positionFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("scroll", requestPositionUpdate);
      reducedMotionQuery.removeEventListener("change", restartAnimation);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none !absolute inset-0 size-full",
        className,
      )}
    >
      <canvas
        className="absolute left-0 top-0 block h-[100svh] w-full"
        ref={canvasRef}
      />
    </div>
  );
};
