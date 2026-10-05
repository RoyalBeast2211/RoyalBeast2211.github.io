/**
 * Brutalist Typography Animation System
 * Physical assembly, weighted overshoot, clip-path reveals, and metadata staggers.
 * Conforms to Sections 06, 07, 08 of the specification.
 */

import { animate, stagger } from "animejs";
import { prefersReducedMotion, EASES, DURATIONS, cleanParams } from "./utilities";

export interface TextRevealOptions {
  direction?: "left" | "right" | "up" | "down" | "none";
  overshoot?: boolean;
  distance?: number;
  duration?: number;
  delay?: number;
  clip?: boolean;
  staggerMs?: number;
  onComplete?: () => void;
}

/**
 * Animate text with physical weight and optional overshoot
 */
export function animateTextReveal(
  target: HTMLElement | (HTMLElement | null)[] | string,
  options: TextRevealOptions = {}
) {
  if (typeof window === "undefined") return null;

  const direction = options.direction ?? "up";
  const overshoot = options.overshoot ?? false;
  const distance = options.distance ?? (overshoot ? 40 : 25);
  const duration = options.duration ?? DURATIONS.normal;
  const delay = options.delay ?? 0;
  const clip = options.clip ?? false;
  const staggerMs = options.staggerMs ?? 0;

  // Filter valid targets if array
  const cleanTarget = Array.isArray(target)
    ? target.filter((el): el is HTMLElement => Boolean(el))
    : target;

  if (Array.isArray(cleanTarget) && cleanTarget.length === 0) return null;

  if (prefersReducedMotion()) {
    return animate(
      cleanTarget as any,
      cleanParams({
        opacity: [0, 1],
        duration: Math.min(250, duration),
        delay: delay ? delay : staggerMs ? stagger(staggerMs) : 0,
        ease: EASES.linear,
        onComplete: options.onComplete,
      })
    );
  }

  const animationProps: Record<string, any> = {
    opacity: [0, 1],
    duration,
    delay: staggerMs ? stagger(staggerMs, { start: delay }) : delay,
    ease: EASES.brutal,
  };

  if (options.onComplete) {
    animationProps.onComplete = options.onComplete;
  }

  if (clip) {
    animationProps.clipPath = [
      "inset(100% 0 0 0)",
      "inset(0% 0 0 0)",
    ];
  }

  // Calculate physical translation with subtle overshoot
  if (direction === "left") {
    animationProps.translateX = overshoot
      ? [-distance, 4, 0]
      : [-distance, 0];
  } else if (direction === "right") {
    animationProps.translateX = overshoot
      ? [distance, -4, 0]
      : [distance, 0];
  } else if (direction === "up") {
    animationProps.translateY = overshoot
      ? [distance, -3, 0]
      : [distance, 0];
  } else if (direction === "down") {
    animationProps.translateY = overshoot
      ? [-distance, 3, 0]
      : [-distance, 0];
  }

  return animate(cleanTarget as any, animationProps as any);
}

/**
 * Animate Hero Typography Assembly (Section 06 & 07)
 * - OMKAR enters from left (-40px -> +4px -> 0)
 * - MORE enters from right (+40px -> -4px -> 0)
 * - SOFTWARE & ENGINEER reveal vertically using clipping
 */
export function animateHeroHeadlineAssembly(elements: {
  omkar: HTMLElement | null;
  more: HTMLElement | null;
  software?: HTMLElement | null;
  engineer?: HTMLElement | null;
  onComplete?: () => void;
}) {
  if (typeof window === "undefined") return;

  const { omkar, more, software, engineer, onComplete } = elements;

  if (prefersReducedMotion()) {
    const targets = [omkar, more, software, engineer].filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (targets.length === 0) return;
    animate(
      targets as any,
      cleanParams({
        opacity: [0, 1],
        duration: 350,
        ease: EASES.linear,
        onComplete,
      })
    );
    return;
  }

  if (omkar) {
    animate(omkar as any, {
      opacity: [0, 1],
      translateX: [-40, 4, 0],
      duration: 1350,
      delay: 0,
      ease: EASES.brutal,
    } as any);
  }

  if (more) {
    animate(more as any, {
      opacity: [0, 1],
      translateX: [40, -4, 0],
      duration: 1350,
      delay: 280,
      ease: EASES.brutal,
    } as any);
  }

  if (software) {
    animate(software as any, {
      opacity: [0, 1],
      translateY: [20, 0],
      clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
      duration: 1100,
      delay: 500,
      ease: EASES.brutal,
    } as any);
  }

  const engineerParams: Record<string, any> = {
    opacity: [0, 1],
    translateY: [20, 0],
    clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
    duration: 1100,
    delay: 750,
    ease: EASES.brutal,
  };
  if (onComplete) {
    engineerParams.onComplete = onComplete;
  }

  if (engineer) {
    animate(engineer as any, engineerParams as any);
  }
}

/**
 * Animate Hero Metadata Items with Precise Stagger (Section 08)
 * Stagger approximately 70-120ms between items.
 */
export function animateStaggerLabels(
  targets: HTMLElement[] | NodeListOf<HTMLElement> | string,
  options: {
    delay?: number;
    staggerMs?: number;
    distance?: number;
    onComplete?: () => void;
  } = {}
) {
  if (typeof window === "undefined") return null;

  const delay = options.delay ?? 0;
  const staggerMs = options.staggerMs ?? 140;
  const distance = options.distance ?? 12;

  if (prefersReducedMotion()) {
    return animate(
      targets as any,
      cleanParams({
        opacity: [0, 1],
        duration: 350,
        delay: stagger(staggerMs, { start: delay }),
        ease: EASES.linear,
        onComplete: options.onComplete,
      })
    );
  }

  const params: Record<string, any> = {
    opacity: [0, 1],
    translateY: [distance, 0],
    duration: 750,
    delay: stagger(staggerMs, { start: delay }),
    ease: EASES.snap,
  };
  if (options.onComplete) {
    params.onComplete = options.onComplete;
  }

  return animate(targets as any, params as any);
}
