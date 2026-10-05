/**
 * Section & Content Reveal Animations
 * Handles choreographed section header reveals, oversized section numbers,
 * horizontal image clipping unmasks, and the editorial statement animation.
 * Conforms to Sections 11, 13, 14, 16, 17, 19.
 */

import { animate } from "animejs";
import { prefersReducedMotion, EASES, cleanParams, animateLineDraw } from "./utilities";

/**
 * Robust Intersection Observer with once: true
 */
export function observeScrollReveal(
  element: HTMLElement | null,
  onReveal: () => void,
  options: {
    threshold?: number;
    rootMargin?: string;
  } = {}
) {
  if (typeof window === "undefined" || !element) return () => {};

  const threshold = options.threshold ?? 0.15;
  const rootMargin = options.rootMargin ?? "0px 0px -60px 0px";

  // Check if IntersectionObserver is supported
  if (!("IntersectionObserver" in window)) {
    onReveal();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onReveal();
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold, rootMargin }
  );

  observer.observe(element);
  return () => observer.disconnect();
}

/**
 * Section Header Reveal Sequence (Section 13, 14, 16)
 * 1. Oversized background section number (e.g. "01") scales down into position (400-600ms)
 * 2. Section label appears
 * 3. Horizontal rule draws itself (left -> right)
 * 4. Section content unlocks
 */
export function animateSectionHeaderReveal(elements: {
  label?: HTMLElement | null;
  line?: HTMLElement | null;
  oversizedNumber?: HTMLElement | null;
  content?: HTMLElement | null;
  onComplete?: () => void;
}) {
  if (typeof window === "undefined") return;

  const { label, line, oversizedNumber, content, onComplete } = elements;

  if (prefersReducedMotion()) {
    if (label) label.style.opacity = "1";
    if (line) {
      line.style.opacity = "1";
      line.style.transform = "none";
    }
    if (oversizedNumber) oversizedNumber.style.opacity = "0.08";
    if (content) content.style.opacity = "1";
    if (onComplete) onComplete();
    return;
  }

  // Step 1: Oversized background section number briefly dramatic (Section 16)
  if (oversizedNumber) {
    animate(oversizedNumber as any, {
      scale: [1.6, 1],
      opacity: [0.35, 0.08],
      duration: 950,
      ease: EASES.brutal,
    } as any);
  }

  // Step 2: Section label appears
  if (label) {
    animate(label as any, {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 750,
      ease: EASES.snap,
    } as any);
  }

  // Step 3: Horizontal rule draws from left -> right (Section 14)
  if (line) {
    animateLineDraw(line, {
      direction: "left",
      duration: 750,
      delay: 180,
    });
  }

  // Step 4: Section content appears
  if (content) {
    const contentParams: Record<string, any> = {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 950,
      delay: 350,
      ease: EASES.snap,
    };
    if (onComplete) {
      contentParams.onComplete = onComplete;
    }
    animate(content as any, contentParams as any);
  }
}


/**
 * Horizontal Image Clipping Unmask (Section 19)
 * Progressively uncovers portrait or image from left -> right using clip-path.
 */
export function animateImageUnmask(
  container: HTMLElement | string,
  options: {
    duration?: number;
    delay?: number;
    onComplete?: () => void;
  } = {}
) {
  if (typeof window === "undefined") return null;

  const duration = options.duration ?? 750;
  const delay = options.delay ?? 0;

  if (prefersReducedMotion()) {
    return animate(
      container as any,
      cleanParams({
        opacity: [0, 1],
        duration: 350,
        delay,
        ease: EASES.linear,
        onComplete: options.onComplete,
      })
    );
  }

  const animProps: Record<string, any> = {
    clipPath: [
      "inset(0 100% 0 0)", // Completely clipped from right
      "inset(0 0% 0 0)",   // Fully revealed
    ],
    opacity: [0.85, 1],
    duration,
    delay,
    ease: EASES.brutal,
  };
  if (options.onComplete) {
    animProps.onComplete = options.onComplete;
  }

  return animate(container as any, animProps as any);
}
