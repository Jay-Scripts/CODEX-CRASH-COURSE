"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type InteractiveConstellationProps = {
  className?: string;
};

type ConstellationPoint = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  velocityX: number;
  velocityY: number;
  radius: number;
};

const CONNECTION_DISTANCE = 225;
const POINTER_CONNECTION_DISTANCE = 245;
const POINT_DENSITY = 15_000;

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
    let points: ConstellationPoint[] = [];
    let animationFrame = 0;
    let isVisible = true;
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
        Math.min(84, Math.round((width * height) / POINT_DENSITY)),
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

        return {
          x,
          y,
          originX: x,
          originY: y,
          velocityX: (Math.random() - 0.5) * 0.16,
          velocityY: (Math.random() - 0.5) * 0.16,
          radius: 1 + Math.random() * 1.2,
        };
      });
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
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

    const render = () => {
      context.clearRect(0, 0, width, height);
      const shouldMove = !reducedMotionQuery.matches;

      points.forEach((point, pointIndex) => {
        if (shouldMove) {
          point.x += point.velocityX;
          point.y += point.velocityY;

          if (Math.abs(point.x - point.originX) > 24) {
            point.velocityX *= -1;
          }

          if (Math.abs(point.y - point.originY) > 24) {
            point.velocityY *= -1;
          }
        }

        for (
          let neighborIndex = pointIndex + 1;
          neighborIndex < points.length;
          neighborIndex += 1
        ) {
          const neighbor = points[neighborIndex];
          const distance = Math.hypot(
            point.x - neighbor.x,
            point.y - neighbor.y,
          );

          if (distance < CONNECTION_DISTANCE) {
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
          const pointerDistance = Math.hypot(
            point.x - pointer.x,
            point.y - pointer.y,
          );

          if (pointerDistance < POINTER_CONNECTION_DISTANCE) {
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
      render();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      restartAnimation();
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;

      if (isVisible) {
        restartAnimation();
      } else {
        window.cancelAnimationFrame(animationFrame);
      }
    });
    const themeObserver = new MutationObserver(() => {
      readThemeColors();
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    reducedMotionQuery.addEventListener("change", restartAnimation);

    resizeCanvas();
    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      reducedMotionQuery.removeEventListener("change", restartAnimation);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className={cn(
        "pointer-events-none !absolute inset-0 size-full",
        className,
      )}
      ref={canvasRef}
    />
  );
};
