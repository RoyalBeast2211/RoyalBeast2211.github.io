"use client";

import { useEffect, useState, useRef } from "react";
import { useCinematicNavigation } from "@/context/CinematicNavigationContext";
import { animate } from "animejs";
import { EASES, prefersReducedMotion } from "@/animations";

export default function CinematicTransitionOverlay() {
  const { transitionState, viewportRef } = useCinematicNavigation();
  const { isTransitioning, phase, direction, intermediateSections } = transitionState;
  const [activeFilmFrame, setActiveFilmFrame] = useState<string | null>(null);

  const lineRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef<HTMLDivElement>(null);

  // Section 15: Film Frame Flash effect (50-100ms per frame)
  useEffect(() => {
    if (!isTransitioning || intermediateSections.length <= 1 || prefersReducedMotion()) {
      setActiveFilmFrame(null);
      return;
    }

    let frameIdx = 0;
    const interval = setInterval(() => {
      if (frameIdx < intermediateSections.length) {
        const sec = intermediateSections[frameIdx];
        setActiveFilmFrame(`${sec.num} / ${sec.label}`);
        frameIdx++;
      } else {
        setActiveFilmFrame(null);
        clearInterval(interval);
      }
    }, 75); // Flashes for 75ms per frame

    return () => clearInterval(interval);
  }, [isTransitioning, intermediateSections]);

  // Section 16: Orange Transition Line with traveling point
  useEffect(() => {
    if (!isTransitioning || prefersReducedMotion()) {
      if (lineRef.current) lineRef.current.style.opacity = "0";
      return;
    }

    if (lineRef.current && pointRef.current) {
      lineRef.current.style.opacity = "1";
      const isForward = direction === "forward";
      const startX = isForward ? -80 : window.innerWidth + 80;
      const endX = isForward ? window.innerWidth + 80 : -80;

      animate(pointRef.current as any, {
        translateX: [startX, endX],
        duration: 520,
        ease: EASES.brutal,
        onComplete: () => {
          if (lineRef.current) lineRef.current.style.opacity = "0";
        },
      } as any);
    }
  }, [isTransitioning, direction]);

  // Section 10, 11, 12, 13, 14, 17: Coordinated multi-layer horizontal camera cut
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    if (!isTransitioning || phase === "idle") {
      el.style.transform = "";
      el.style.filter = "";
      el.style.opacity = "";
      el.style.transition = "";
      el.style.willChange = "";
      return;
    }

    if (prefersReducedMotion()) {
      el.style.transform = "none";
      el.style.filter = "none";
      el.style.opacity = "1";
      return;
    }

    el.style.willChange = "transform, filter, opacity";
    const isForward = direction === "forward";

    if (phase === "prep") {
      el.style.transition = "transform 40ms ease-out";
      el.style.transform = "translate3d(0, 0, 0) scale(1)";
    } else if (phase === "whip-out") {
      // Rapid acceleration sideways (out of viewport)
      // Section 10: forward moves left (-24vw), Section 11: backward moves right (+24vw)
      const shiftX = isForward ? "-24vw" : "24vw";
      const shiftNum = isForward ? -24 : 24;
      el.style.transition =
        "transform 180ms cubic-bezier(0.5, 0, 0.8, 0.2), filter 160ms ease-in, opacity 180ms ease-in";
      el.style.transform = `translate3d(${shiftX}, 0, 0) scale(0.985)`;
      // Section 14: Subtle horizontal motion-blur impression during transition only
      el.style.filter = "blur(4px)";
      el.style.opacity = "0.78";

      // Section 12: Multi-layer depth parallax (GRID 1.25x, METADATA 1.15x, IMAGE 0.90x)
      const grids = el.querySelectorAll<HTMLElement>('[data-layer="grid"]');
      grids.forEach((g) => {
        g.style.transition = "transform 180ms cubic-bezier(0.5, 0, 0.8, 0.2)";
        g.style.transform = `translate3d(${shiftNum * 0.25}px, 0, 0)`;
      });

      const metas = el.querySelectorAll<HTMLElement>('[data-layer="meta"], .font-mono');
      metas.forEach((m) => {
        m.style.transition = "transform 180ms cubic-bezier(0.5, 0, 0.8, 0.2)";
        m.style.transform = `translate3d(${shiftNum * 0.15}px, 0, 0)`;
      });

      const images = el.querySelectorAll<HTMLElement>('[data-layer="image"], img');
      images.forEach((img) => {
        img.style.transition = "transform 180ms cubic-bezier(0.5, 0, 0.8, 0.2)";
        img.style.transform = `translate3d(${shiftNum * -0.10}px, 0, 0)`;
      });

      // Section 13: Large typography stretches slightly during movement
      const titles = el.querySelectorAll<HTMLElement>("h1, h2");
      titles.forEach((t) => {
        t.style.transform = "scaleX(1.025)";
        t.style.transition = "transform 160ms linear";
      });
    } else if (phase === "switch") {
      // Instant snap to opposite side (zero transition time under cover of blur)
      const shiftX = isForward ? "24vw" : "-24vw";
      el.style.transition = "none";
      el.style.transform = `translate3d(${shiftX}, 0, 0) scale(1.02)`;
      el.style.filter = "blur(4px)";
      el.style.opacity = "0.85";
      // Force layout reflow
      void el.offsetHeight;
    } else if (phase === "whip-in") {
      // Section 17: Decelerate quickly: scale 1.02 -> 1, opacity 0.85 -> 1
      el.style.transition =
        "transform 240ms cubic-bezier(0.16, 1, 0.3, 1), filter 220ms ease-out, opacity 220ms ease-out";
      el.style.transform = "translate3d(0, 0, 0) scale(1)";
      el.style.filter = "blur(0px)";
      el.style.opacity = "1";

      // Multi-layer returns to alignment
      const layers = el.querySelectorAll<HTMLElement>('[data-layer="grid"], [data-layer="meta"], [data-layer="image"], img, .font-mono');
      layers.forEach((l) => {
        l.style.transition = "transform 240ms cubic-bezier(0.16, 1, 0.3, 1)";
        l.style.transform = "translate3d(0, 0, 0)";
      });

      // Typography settles back
      const titles = el.querySelectorAll<HTMLElement>("h1, h2");
      titles.forEach((t) => {
        t.style.transform = "scaleX(1)";
        t.style.transition = "transform 200ms cubic-bezier(0.16, 1, 0.3, 1)";
      });
    } else if (phase === "settle") {
      el.style.transition = "transform 50ms ease-out";
      el.style.transform = "translate3d(0, 0, 0) scale(1)";
      el.style.filter = "none";
      el.style.opacity = "1";

      const allAnimated = el.querySelectorAll<HTMLElement>("h1, h2, [data-layer], img, .font-mono");
      allAnimated.forEach((t) => {
        t.style.transform = "";
        t.style.transition = "";
      });
    }
  }, [isTransitioning, phase, direction, viewportRef]);

  if (!isTransitioning) return null;

  return (
    <>
      {/* Section 16: Very thin orange line with rapid traveling point */}
      <div
        ref={lineRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 h-[1px] bg-[var(--border-color)]/30 opacity-0 transition-opacity duration-150 overflow-hidden"
      >
        <div
          ref={pointRef}
          className="w-4 h-4 -mt-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] will-change-transform"
        />
      </div>

      {/* Section 15: Film Frame Flash cards (50-100ms) */}
      {activeFilmFrame && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-4 py-2 bg-[var(--terminal-bg)]/95 border border-[var(--accent)] text-[var(--terminal-text)] font-mono text-xs font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2 animate-in fade-in zoom-in-95 duration-75 select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>FRAME // {activeFilmFrame}</span>
        </div>
      )}
    </>
  );
}
