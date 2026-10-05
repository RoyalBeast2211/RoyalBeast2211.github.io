/**
 * Brutalist Animation Utilities
 * Foundation for Anime.js animations adhering to physical, engineered, editorial principles.
 */

import { animate } from "animejs";

/**
 * Check if user prefers reduced motion (accessibility first)
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Editorial Brutalist Easing Curves
 * Rigid, snappy, precise transitions instead of floaty or springy curves.
 */
export const EASES = {
  brutal: "outExpo" as const,
  snap: "outQuad" as const,
  precise: "outCubic" as const,
  linear: "linear" as const,
  inOut: "inOutCubic" as const,
  mechanical: "steps(6)" as const,
};

/**
 * Standard Speeds conforming to Section 04 Guidelines
 */
export const DURATIONS = {
  micro: 380,       // slowed from 220
  fast: 420,        // slowed from 200
  normal: 950,      // slowed from 520
  hero: 1600,       // slowed from 1000
  transition: 950,  // slowed from 600
};

/**
 * Clean parameters helper to avoid undefined keys incompatible with Anime.js v4 types
 */
export function cleanParams<T extends Record<string, any>>(params: T): any {
  const clean: Record<string, any> = {};
  for (const key of Object.keys(params)) {
    if (params[key] !== undefined) {
      clean[key] = params[key];
    }
  }
  return clean;
}

/**
 * Animate a Brutalist Line Construction (left -> right or top -> bottom)
 * Used for major section borders and boundary constructions (Section 14).
 */
export function animateLineDraw(
  target: HTMLElement | SVGElement | string,
  options: {
    duration?: number;
    delay?: number;
    direction?: "left" | "right" | "top" | "bottom";
    onComplete?: () => void;
  } = {}
) {
  if (typeof window === "undefined") return null;

  const duration = options.duration ?? DURATIONS.normal;
  const delay = options.delay ?? 0;
  const direction = options.direction ?? "left";

  if (prefersReducedMotion()) {
    return animate(
      target as any,
      cleanParams({
        opacity: [0, 1],
        duration: Math.min(250, duration),
        delay,
        ease: EASES.linear,
        onComplete: options.onComplete,
      })
    );
  }

  // Handle line construction via transform scale
  const isVertical = direction === "top" || direction === "bottom";
  const origin =
    direction === "left"
      ? "left center"
      : direction === "right"
      ? "right center"
      : direction === "top"
      ? "center top"
      : "center bottom";

  if (typeof target === "string") {
    const els = document.querySelectorAll<HTMLElement>(target);
    els.forEach((el) => {
      el.style.transformOrigin = origin;
    });
  } else if ("style" in target) {
    (target as HTMLElement).style.transformOrigin = origin;
  }

  const animProps: Record<string, any> = {
    [isVertical ? "scaleY" : "scaleX"]: [0, 1],
    opacity: [0.3, 1],
    duration,
    delay,
    ease: EASES.brutal,
  };
  if (options.onComplete) {
    animProps.onComplete = options.onComplete;
  }

  return animate(target as any, animProps as any);
}

/**
 * Animate a Mechanical Number Counter (Section 10 & 21)
 * E.g., counting from 0 to 500+ or 980+ mechanically with stepped increments (0, 50, 100, 200... 500+).
 * Duration: 600–900ms.
 */
export function animateCounter(
  target: HTMLElement | string,
  options: {
    start?: number;
    end: number;
    duration?: number;
    delay?: number;
    suffix?: string;
    prefix?: string;
    stepInterval?: number;
    onComplete?: () => void;
  }
) {
  if (typeof window === "undefined") return null;

  const start = options.start ?? 0;
  const end = options.end;
  const duration = options.duration ?? 750; // 600–900ms per Section 10
  const delay = options.delay ?? 0;
  const suffix = options.suffix ?? "";
  const prefix = options.prefix ?? "";

  const element =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;

  if (!element) return null;

  if (prefersReducedMotion()) {
    element.textContent = `${prefix}${end}${suffix}`;
    if (options.onComplete) options.onComplete();
    return null;
  }

  const counterObj = { count: start };
  const stepInterval = options.stepInterval ?? (end >= 400 ? 50 : end >= 100 ? 20 : 5);

  return animate(
    counterObj as any,
    cleanParams({
      count: end,
      duration,
      delay,
      ease: EASES.precise,
      onUpdate: () => {
        const raw = counterObj.count;
        // Step mechanically in increments unless near the end
        const stepped =
          raw >= end - stepInterval ? Math.floor(raw) : Math.floor(raw / stepInterval) * stepInterval;
        element.textContent = `${prefix}${stepped}${suffix}`;
      },
      onComplete: () => {
        element.textContent = `${prefix}${end}${suffix}`;
        if (options.onComplete) options.onComplete();
      },
    })
  );
}
