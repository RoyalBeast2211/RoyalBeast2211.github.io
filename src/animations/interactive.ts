import { animate } from "animejs";
import { prefersReducedMotion, EASES, DURATIONS, cleanParams } from "./utilities";

/**
 * Section 07 & 08: Magnetic Links
 * Rigid container + fluid content.
 * Cursor proximity pulls the inner text by 5–10px towards the cursor.
 * Container and border remain stable.
 */
export function initMagneticElement(
  containerEl: HTMLElement,
  targetSelector: string = ".magnetic-target",
  maxPull: number = 8
): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return () => {};
  }

  const target = (containerEl.querySelector(targetSelector) as HTMLElement) || containerEl;

  let animationFrameId: number | null = null;
  let isHovered = false;

  const onMouseMove = (e: MouseEvent) => {
    isHovered = true;
    const rect = containerEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Proportional pull clamped between -maxPull and +maxPull
    const pullX = Math.max(-maxPull, Math.min(maxPull, deltaX * 0.3));
    const pullY = Math.max(-maxPull, Math.min(maxPull, deltaY * 0.3));

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => {
      target.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
      target.style.transition = "transform 60ms linear";
    });
  };

  const onMouseLeave = () => {
    isHovered = false;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    target.style.transition = `transform ${DURATIONS.fast}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    target.style.transform = "translate3d(0, 0, 0)";

    setTimeout(() => {
      if (!isHovered) {
        target.style.transition = "";
      }
    }, DURATIONS.fast);
  };

  containerEl.addEventListener("mousemove", onMouseMove);
  containerEl.addEventListener("mouseleave", onMouseLeave);

  return () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    containerEl.removeEventListener("mousemove", onMouseMove);
    containerEl.removeEventListener("mouseleave", onMouseLeave);
  };
}

/**
 * Section 13: About Portrait Scan Line Reveal
 * A thin orange scan line passes over the image once (top: 0% -> 100%).
 * The image becomes visible behind it via clipping.
 * Then the line disappears. No permanent overlay.
 */
export function animatePortraitScanLine(
  lineEl: HTMLElement,
  imageWrapperEl: HTMLElement,
  options?: {
    duration?: number;
    delay?: number;
    onComplete?: () => void;
  }
) {
  if (typeof window === "undefined") return null;

  const duration = options?.duration ?? 850;
  const delay = options?.delay ?? 100;

  if (prefersReducedMotion()) {
    lineEl.style.display = "none";
    imageWrapperEl.style.clipPath = "inset(0 0 0% 0)";
    if (options?.onComplete) options.onComplete();
    return null;
  }

  // Initial state: scan line at top, image clipped from bottom
  lineEl.style.top = "0%";
  lineEl.style.opacity = "1";
  lineEl.style.display = "block";
  imageWrapperEl.style.clipPath = "inset(0 0 100% 0)";

  const scanState = { progress: 0 };

  return animate(
    scanState as any,
    cleanParams({
      progress: 100,
      duration,
      delay,
      ease: EASES.precise,
      onUpdate: () => {
        const p = scanState.progress;
        lineEl.style.top = `${p}%`;
        imageWrapperEl.style.clipPath = `inset(0 0 ${(100 - p).toFixed(1)}% 0)`;
      },
      onComplete: () => {
        // Line disappears once scan finishes
        animate(
          lineEl,
          cleanParams({
            opacity: [1, 0],
            duration: 150,
            ease: "linear",
            onComplete: () => {
              lineEl.style.display = "none";
              imageWrapperEl.style.clipPath = "inset(0 0 0% 0)";
              if (options?.onComplete) options.onComplete();
            },
          })
        );
      },
    })
  );
}

/**
 * Section 16: One Glitch Only
 * A single printing-error / glitch moment.
 * For example: "EXPERIENCE" briefly becomes "EXP█RIENCE" for 50-100ms, then returns.
 * No RGB splitting, no cyberpunk effects.
 */
let hasGlitchedOnce = false;

export function triggerGlitchText(
  element: HTMLElement,
  originalText: string = "EXPERIENCE",
  glitchedText: string = "EXP█RIENCE",
  duration: number = 75
) {
  if (hasGlitchedOnce || typeof window === "undefined" || prefersReducedMotion()) {
    return;
  }

  hasGlitchedOnce = true;
  element.textContent = glitchedText;

  setTimeout(() => {
    element.textContent = originalText;
  }, duration);
}
