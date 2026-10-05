/**
 * Brutalist Hero Loading & Boot Sequence
 * Choreographed boot sequence conforming to Sections 05, 06, 07, 08, 09, 10.
 */

import { animate } from "animejs";
import { prefersReducedMotion, EASES } from "./utilities";
import { animateHeroHeadlineAssembly, animateStaggerLabels } from "./typography";

export interface HeroElements {
  container?: HTMLElement | null;
  logo?: HTMLElement | null;
  grid?: HTMLElement | null;
  metaHeader?: HTMLElement | null;
  whoami?: HTMLElement | null;
  omkar?: HTMLElement | null;
  more?: HTMLElement | null;
  software?: HTMLElement | null;
  engineer?: HTMLElement | null;
  subLabels?: HTMLElement[] | null;
  terminal?: HTMLElement | null;
  bottomBar?: HTMLElement | null;
}

/**
 * Execute the Hero Boot Sequence matching the exact millisecond timeline from Section 05:
 *
 * 0ms     background appears
 * 100ms   OM / logo appears
 * 200ms   grid structure begins
 * 350ms   small metadata appears
 * 450ms   $ whoami appears
 * 600ms   OMKAR appears (left assembly + overshoot)
 * 750ms   MORE appears (right assembly + overshoot)
 * 900ms   SOFTWARE appears (vertical clip reveal)
 * 1050ms  ENGINEER appears (vertical clip reveal)
 * 1200ms  terminal begins initialization
 * 1450ms  hero statement / subtext begins
 * 1700ms  navigation / bottom bar becomes visible
 * 1900ms  system ready
 */
export function runHeroBootSequence(
  elements: HeroElements,
  options: {
    onTerminalInit?: () => void;
    onSystemReady?: () => void;
  } = {}
) {
  if (typeof window === "undefined") return;

  const reduced = prefersReducedMotion();

  // If reduced motion is requested, reveal all elements cleanly and quickly
  if (reduced) {
    if (elements.logo) elements.logo.style.opacity = "1";
    if (elements.grid) elements.grid.style.opacity = "1";
    if (elements.metaHeader) elements.metaHeader.style.opacity = "1";
    if (elements.whoami) elements.whoami.style.opacity = "1";
    if (elements.omkar) elements.omkar.style.opacity = "1";
    if (elements.more) elements.more.style.opacity = "1";
    if (elements.software) elements.software.style.opacity = "1";
    if (elements.engineer) elements.engineer.style.opacity = "1";
    if (elements.terminal) elements.terminal.style.opacity = "1";
    if (elements.bottomBar) elements.bottomBar.style.opacity = "1";

    if (options.onTerminalInit) options.onTerminalInit();
    if (options.onSystemReady) options.onSystemReady();
    return;
  }

  // 100ms: OM / logo appears
  setTimeout(() => {
    if (elements.logo) {
      animate(elements.logo, {
        opacity: [0, 1],
        duration: 300,
        ease: EASES.snap,
      });
    }
  }, 100);

  // 200ms: Grid structure begins (lines scale in)
  setTimeout(() => {
    if (elements.grid) {
      animate(elements.grid, {
        opacity: [0, 0.4],
        duration: 400,
        ease: EASES.linear,
      });
    }
  }, 200);

  // 350ms: Small metadata appears
  setTimeout(() => {
    if (elements.metaHeader) {
      animate(elements.metaHeader, {
        opacity: [0, 1],
        translateY: [-6, 0],
        duration: 350,
        ease: EASES.snap,
      });
    }
  }, 350);

  // 450ms: $ whoami appears
  setTimeout(() => {
    if (elements.whoami) {
      animate(elements.whoami, {
        opacity: [0, 1],
        translateX: [-10, 0],
        duration: 300,
        ease: EASES.snap,
      });
    }
  }, 450);

  // 600ms - 1050ms: Headline Physical Assembly (OMKAR, MORE, SOFTWARE, ENGINEER)
  setTimeout(() => {
    animateHeroHeadlineAssembly({
      omkar: elements.omkar ?? null,
      more: elements.more ?? null,
      software: elements.software ?? null,
      engineer: elements.engineer ?? null,
    });
  }, 600);

  // Stagger metadata labels (e.g., 01 / SOFTWARE ENGINEER, 02 / PROBLEM SOLVER, etc.)
  if (elements.subLabels && elements.subLabels.length > 0) {
    setTimeout(() => {
      animateStaggerLabels(elements.subLabels!, {
        delay: 0,
        staggerMs: 85,
      });
    }, 1100);
  }

  // 1200ms: Terminal begins initialization
  setTimeout(() => {
    if (elements.terminal) {
      animate(elements.terminal, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        ease: EASES.brutal,
      });
    }
    if (options.onTerminalInit) {
      options.onTerminalInit();
    }
  }, 1200);

  // 1700ms: Navigation & bottom bar becomes visible
  setTimeout(() => {
    if (elements.bottomBar) {
      animate(elements.bottomBar, {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 350,
        ease: EASES.snap,
      });
    }
  }, 1700);

  // 1900ms: System Ready
  setTimeout(() => {
    if (options.onSystemReady) {
      options.onSystemReady();
    }
  }, 1900);
}

/**
 * Animate the machine indicator terminal status dot (Section 10)
 * Very slow, machine-like breath (0.5 -> 1.0 -> 0.5) without neon glow.
 */
export function animateTerminalDot(dotElement: HTMLElement | string) {
  if (typeof window === "undefined") return null;

  return animate(dotElement, {
    opacity: [0.45, 1, 0.45],
    duration: 3200,
    loop: true,
    ease: EASES.linear,
  });
}
