"use client";

import { useEffect, useRef } from "react";

type IconPoint = {
  strength: number;
  x: number;
  y: number;
};

const POINTER_REACH = 290;
const ICON_CONNECTION_REACH = 380;
const MAX_ACTIVE_ICONS = 7;

/**
 * Connects the hero pointer to nearby floating technology icons without adding particle dots.
 */
export const HeroIconConnections = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;

    if (!canvas || !hero) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const precisePointerQuery = window.matchMedia("(pointer: fine)");
    const pointer = { active: false, x: 0, y: 0 };
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let lineColor = "";

    const readThemeColor = () => {
      const styles = getComputedStyle(canvas);
      lineColor = styles.getPropertyValue("--primary").trim() || styles.color;
    };

    const resizeCanvas = () => {
      const bounds = hero.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      readThemeColor();
    };

    const drawLine = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      opacity: number,
      lineWidth: number,
    ) => {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.strokeStyle = lineColor;
      context.globalAlpha = opacity;
      context.lineWidth = lineWidth;
      context.stroke();
    };

    const getActiveIcons = () => {
      const heroBounds = hero.getBoundingClientRect();
      const iconElements = Array.from(
        hero.querySelectorAll<HTMLElement>("[data-hero-floating-icon]"),
      );

      return iconElements
        .map((icon): IconPoint | null => {
          const bounds = icon.getBoundingClientRect();

          if (bounds.width === 0 || bounds.height === 0) {
            return null;
          }

          const x = bounds.left - heroBounds.left + bounds.width / 2;
          const y = bounds.top - heroBounds.top + bounds.height / 2;
          const pointerDistance = Math.hypot(x - pointer.x, y - pointer.y);

          if (pointerDistance >= POINTER_REACH) {
            return null;
          }

          return {
            strength: 1 - pointerDistance / POINTER_REACH,
            x,
            y,
          };
        })
        .filter((icon): icon is IconPoint => icon !== null)
        .sort((first, second) => second.strength - first.strength)
        .slice(0, MAX_ACTIVE_ICONS);
    };

    const drawConnections = () => {
      context.clearRect(0, 0, width, height);

      if (!pointer.active || !precisePointerQuery.matches) {
        return;
      }

      const activeIcons = getActiveIcons();

      activeIcons.forEach((icon, iconIndex) => {
        drawLine(
          pointer.x,
          pointer.y,
          icon.x,
          icon.y,
          icon.strength * 0.82,
          1.15,
        );

        for (
          let neighborIndex = iconIndex + 1;
          neighborIndex < activeIcons.length;
          neighborIndex += 1
        ) {
          const neighbor = activeIcons[neighborIndex];
          const iconDistance = Math.hypot(
            icon.x - neighbor.x,
            icon.y - neighbor.y,
          );

          if (iconDistance < ICON_CONNECTION_REACH) {
            const distanceStrength =
              1 - iconDistance / ICON_CONNECTION_REACH;
            drawLine(
              icon.x,
              icon.y,
              neighbor.x,
              neighbor.y,
              Math.min(icon.strength, neighbor.strength) *
                distanceStrength *
                0.5,
              0.8,
            );
          }
        }
      });

      context.globalAlpha = 1;
    };

    const requestDraw = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(drawConnections);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      pointer.active =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      requestDraw();
    };

    const clearConnections = () => {
      pointer.active = false;
      requestDraw();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      requestDraw();
    });
    const themeObserver = new MutationObserver(() => {
      readThemeColor();
      requestDraw();
    });

    resizeObserver.observe(hero);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", clearConnections);
    document.addEventListener("mouseleave", clearConnections);
    resizeCanvas();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", clearConnections);
      document.removeEventListener("mouseleave", clearConnections);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] size-full"
      ref={canvasRef}
    />
  );
};
