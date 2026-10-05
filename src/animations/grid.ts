/**
 * Brutalist Grid Line Animations (Section 15)
 * 1. Vertical lines appear
 * 2. Horizontal lines appear
 * 3. Content locks into grid
 * Duration: 300-500ms, subtle low opacity.
 */

import { animate, stagger } from "animejs";
import { prefersReducedMotion, EASES } from "./utilities";

export interface GridRevealElements {
  verticalLines?: (HTMLElement | null)[] | NodeListOf<HTMLElement> | string;
  horizontalLines?: (HTMLElement | null)[] | NodeListOf<HTMLElement> | string;
  content?: HTMLElement | null;
}

export function animateGridReveal(
  elements: GridRevealElements,
  options: {
    duration?: number;
    delay?: number;
    onComplete?: () => void;
  } = {}
) {
  if (typeof window === "undefined") return;

  const duration = options.duration ?? 420; // 300-500ms
  const delay = options.delay ?? 0;

  if (prefersReducedMotion()) {
    if (elements.content) elements.content.style.opacity = "1";
    if (options.onComplete) options.onComplete();
    return;
  }

  // Step 1: Vertical lines appear (scaleY from top to bottom)
  if (elements.verticalLines) {
    animate(elements.verticalLines as any, {
      scaleY: [0, 1],
      opacity: [0, 0.45],
      duration: duration * 0.7,
      delay: stagger(40, { start: delay }),
      ease: EASES.brutal,
    } as any);
  }

  // Step 2: Horizontal line appears (scaleX from left to right)
  if (elements.horizontalLines) {
    animate(elements.horizontalLines as any, {
      scaleX: [0, 1],
      opacity: [0, 0.45],
      duration: duration * 0.7,
      delay: delay + 120,
      ease: EASES.brutal,
    } as any);
  }

  // Step 3: Content locks into grid
  if (elements.content) {
    const contentParams: Record<string, any> = {
      opacity: [0, 1],
      duration: duration * 0.8,
      delay: delay + 220,
      ease: EASES.snap,
    };
    if (options.onComplete) {
      contentParams.onComplete = options.onComplete;
    }
    animate(elements.content as any, contentParams as any);
  }
}
