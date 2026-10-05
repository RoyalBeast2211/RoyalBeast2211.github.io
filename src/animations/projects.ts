/**
 * Project Editorial Animation System
 * Part 2: Project reveal, alternating clipping unmasks, weighted image movement,
 * and brutalist frame escape hover interactions.
 * Conforms to Sections 01, 02, 03, 04, 05, 06.
 */

import { animate } from "animejs";
import { prefersReducedMotion, EASES, DURATIONS, animateLineDraw } from "./utilities";

export interface ProjectRevealElements {
  card: HTMLElement;
  number?: HTMLElement | null;
  title?: HTMLElement | null;
  meta?: HTMLElement | null;
  border?: HTMLElement | null;
  imageWrapper?: HTMLElement | null;
  imageInner?: HTMLElement | null;
}

/**
 * Animate a project case study as it enters the viewport (Section 01, 02, 03, 06)
 * Staggered sequence:
 * 1. Project number appears
 * 2. Title enters (with alternating direction velocity: 30-50px)
 * 3. Metadata appears
 * 4. Border draws (constructs left -> right)
 * 5. Image reveals via alternating clipping mask (L->R or R->L) + weighted movement
 */
export function animateProjectCardReveal(
  elements: ProjectRevealElements,
  index: number,
  options: { onComplete?: () => void } = {}
) {
  if (typeof window === "undefined" || !elements.card) return;

  const reduced = prefersReducedMotion();
  const { number, title, meta, border, imageWrapper, imageInner } = elements;

  if (reduced) {
    if (number) number.style.opacity = "1";
    if (title) title.style.opacity = "1";
    if (meta) meta.style.opacity = "1";
    if (border) border.style.opacity = "1";
    if (imageWrapper) {
      imageWrapper.style.opacity = "1";
      imageWrapper.style.clipPath = "none";
    }
    if (imageInner) {
      imageInner.style.opacity = "1";
      imageInner.style.transform = "none";
    }
    if (options.onComplete) options.onComplete();
    return;
  }

  // Section 06: Alternate entrance direction based on index
  // Even projects (0, 2): enters from right (translateX: 40 -> 0)
  // Odd projects (1, 3): enters from left (translateX: -40 -> 0)
  const isEven = index % 2 === 0;
  const velocityX = isEven ? 40 : -40;

  // Step 1: Project number appears
  if (number) {
    animate(number as any, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 750,
      ease: EASES.snap,
    } as any);
  }

  // Step 2: Title enters with directional velocity
  if (title) {
    animate(title as any, {
      opacity: [0, 1],
      translateX: [velocityX, 0],
      duration: 950,
      delay: 150,
      ease: EASES.brutal,
    } as any);
  }

  // Step 3: Metadata appears
  if (meta) {
    animate(meta as any, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 850,
      delay: 280,
      ease: EASES.snap,
    } as any);
  }

  // Step 4: Border draws left -> right
  if (border) {
    animateLineDraw(border, {
      direction: "left",
      duration: 450,
      delay: 260,
    });
  }

  // Step 5 & 6: Image reveal using clipping & weighted movement (Section 02 & 03)
  // Alternating clipping direction:
  // Even: left -> right ('inset(0 100% 0 0)' to 'inset(0 0% 0 0)')
  // Odd:  right -> left ('inset(0 0 0 100%)' to 'inset(0 0 0 0%)')
  const clipFrom = isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
  const clipTo = isEven ? "inset(0 0% 0 0)" : "inset(0 0 0 0%)";

  if (imageWrapper) {
    animate(imageWrapper as any, {
      clipPath: [clipFrom, clipTo],
      duration: 650,
      delay: 340,
      ease: EASES.brutal,
    } as any);
  }

  if (imageInner) {
    // Section 03: Small weighted translation & scale
    animate(imageInner as any, {
      translateX: [30, 0],
      scale: [1.03, 1],
      opacity: [0, 1],
      duration: 700,
      delay: 340,
      ease: EASES.brutal,
      onComplete: options.onComplete,
    } as any);
  }
}
