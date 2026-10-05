/**
 * Horizontal Cinematic Navigation Animation System
 * Coordinates camera whip cuts, multi-layer depth, typography stretch,
 * traveling active indicators, film frame flashes, and orange transition lines.
 * Conforms to Sections 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18.
 */

import { animate } from "animejs";
import { prefersReducedMotion, EASES, DURATIONS } from "./utilities";

export type TransitionDirection = "forward" | "backward";

/**
 * Animate the single active navigation indicator traveling smoothly
 * between vertical navigation items (Section 08).
 * Duration: 250-400ms.
 */
export function animateIndicatorTravel(
  indicator: HTMLElement,
  targetTop: number,
  options: { duration?: number; onComplete?: () => void } = {}
) {
  if (typeof window === "undefined" || !indicator) return null;

  const duration = options.duration ?? 320;

  if (prefersReducedMotion()) {
    indicator.style.transform = `translate3d(0, ${targetTop}px, 0)`;
    if (options.onComplete) options.onComplete();
    return null;
  }

  return animate(indicator as any, {
    translateY: targetTop,
    duration,
    ease: EASES.snap,
    onComplete: options.onComplete,
  } as any);
}

/**
 * Animate multi-layer camera movement on the viewport container (Section 10, 11, 12, 13, 14, 17)
 */
export function animateCinematicCameraWhip(
  viewport: HTMLElement,
  direction: TransitionDirection,
  options: {
    phase: "whip-out" | "switch" | "whip-in" | "settle";
    onComplete?: () => void;
  }
) {
  if (typeof window === "undefined" || !viewport) return;

  const { phase, onComplete } = options;
  const isForward = direction === "forward";

  if (prefersReducedMotion()) {
    viewport.style.transform = "none";
    viewport.style.filter = "none";
    viewport.style.opacity = "1";
    if (onComplete) onComplete();
    return;
  }

  // Large typography targets to subtly stretch (Section 13)
  const bigTitles = viewport.querySelectorAll<HTMLElement>("h1, h2, .font-display");

  if (phase === "whip-out") {
    // Current section accelerates sideways out of the viewport
    // Forward: pulls left (-26vw)
    // Backward: pulls right (+26vw)
    const outX = isForward ? "-24vw" : "24vw";

    // Viewport camera whip
    animate(viewport as any, {
      translateX: outX,
      scale: [1, 0.985],
      opacity: [1, 0.75],
      duration: 210,
      ease: EASES.brutal,
    } as any);

    // Section 13: Large typography stretches slightly during movement
    if (bigTitles.length > 0) {
      animate(bigTitles as any, {
        scaleX: [1, 1.025],
        duration: 350,
        ease: EASES.linear,
      } as any);
    }
  } else if (phase === "switch") {
    // Zero-duration reposition to opposite side under cover of motion blur
    const inStartX = isForward ? "24vw" : "-24vw";
    viewport.style.transform = `translate3d(${inStartX}, 0, 0) scale(1.02)`;
    viewport.style.opacity = "0.85";

    if (bigTitles.length > 0) {
      bigTitles.forEach((el) => {
        el.style.transform = "scaleX(1.025)";
      });
    }
  } else if (phase === "whip-in") {
    // Section 17: Target arrives with strong deceleration: scale 1.02 -> 1, opacity 0.85 -> 1
    animate(viewport as any, {
      translateX: 0,
      scale: 1,
      opacity: 1,
      duration: 520,
      ease: EASES.brutal,
      onComplete,
    } as any);

    // Typography settles back from slight stretch to 1
    if (bigTitles.length > 0) {
      animate(bigTitles as any, {
        scaleX: 1,
        duration: 550,
        ease: EASES.snap,
      } as any);
    }
  }
}

/**
 * Animate the orange traveling point across the horizontal transition line (Section 16)
 * A thin line with a point that travels quickly across the screen and disappears.
 */
export function animateOrangeTraveler(
  line: HTMLElement,
  point: HTMLElement,
  direction: TransitionDirection,
  options: { duration?: number; onComplete?: () => void } = {}
) {
  if (typeof window === "undefined" || !line || !point) return;

  const duration = options.duration ?? 450;
  const isForward = direction === "forward";

  if (prefersReducedMotion()) {
    line.style.opacity = "0";
    if (options.onComplete) options.onComplete();
    return;
  }

  // Reveal thin line
  line.style.opacity = "1";

  // Point travels from 0% to 100% or 100% to 0%
  const startX = isForward ? "-10vw" : "110vw";
  const endX = isForward ? "110vw" : "-10vw";

  animate(point as any, {
    translateX: [startX, endX],
    duration,
    ease: EASES.brutal,
    onComplete: () => {
      line.style.opacity = "0";
      if (options.onComplete) options.onComplete();
    },
  } as any);
}
