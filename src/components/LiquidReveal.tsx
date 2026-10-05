"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { prefersReducedMotion } from "@/animations";

export interface LiquidRevealProps {
  isOpen: boolean;
  onToggle: () => void;
  openLabel?: string;
  closeLabel?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export default function LiquidReveal({
  isOpen,
  onToggle,
  openLabel = "VIEW DETAILS",
  closeLabel = "HIDE DETAILS",
  badge,
  children,
  className = "",
}: LiquidRevealProps) {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);
  const liquidSvgRef = useRef<SVGSVGElement>(null);
  const liquidPathRef = useRef<SVGPathElement>(null);

  // Animation phases: "closed" | "opening" | "open" | "closing"
  const [phase, setPhase] = useState<"closed" | "opening" | "open" | "closing">(
    isOpen ? "open" : "closed"
  );

  const animationFrameRef = useRef<number | null>(null);

  // Helper to generate an organic, viscous liquid wave path across 0..100 width and height
  const generateWavePath = useCallback((progress: number, direction: "down" | "up" = "down") => {
    // progress is 0 to 1
    const p = Math.max(0, Math.min(1, progress));
    
    // Wave front position
    const yFront = direction === "down" ? p * 110 : (1 - p) * 110;
    
    // Viscous fluid curve offsets with organic phase oscillation
    const offset1 = Math.sin(p * Math.PI) * 12;
    const offset2 = Math.cos(p * Math.PI) * 10;
    const offset3 = Math.sin(p * Math.PI * 1.5) * 8;

    if (direction === "down") {
      // Liquid entering from top (y=0) and surging downward to yFront
      const cp1Y = Math.min(115, Math.max(0, yFront + offset1));
      const cp2Y = Math.min(115, Math.max(0, yFront - offset2));
      const cp3Y = Math.min(115, Math.max(0, yFront + offset3));

      return `M 0 0 
              L 100 0 
              L 100 ${Math.min(110, yFront)} 
              C 75 ${cp1Y}, 50 ${cp2Y}, 25 ${cp3Y} 
              L 0 ${Math.min(110, yFront)} 
              Z`;
    } else {
      // Liquid receding back upward toward y=0
      const cp1Y = Math.min(115, Math.max(0, yFront + offset1));
      const cp2Y = Math.min(115, Math.max(0, yFront - offset2));
      return `M 0 0 
              L 100 0 
              L 100 ${yFront} 
              C 70 ${cp1Y}, 35 ${cp2Y}, 0 ${yFront} 
              Z`;
    }
  }, []);

  // Drive opening animation (approx 520ms)
  const runOpenAnimation = useCallback(() => {
    const wrapper = contentWrapperRef.current;
    const inner = contentInnerRef.current;
    const path = liquidPathRef.current;
    const svg = liquidSvgRef.current;

    if (!wrapper || !inner) return;

    if (prefersReducedMotion()) {
      setPhase("open");
      wrapper.style.height = "auto";
      wrapper.style.opacity = "1";
      if (svg) svg.style.display = "none";
      return;
    }

    setPhase("opening");
    if (svg) {
      svg.style.display = "block";
      svg.style.opacity = "1";
    }

    // Measure required content height
    inner.style.visibility = "visible";
    const targetHeight = inner.scrollHeight;
    wrapper.style.height = "0px";
    wrapper.style.opacity = "1";

    const duration = 520; // ms
    const startTime = performance.now();

    // Secondary subtle content fade/slide
    inner.style.opacity = "0";
    inner.style.transform = "translateY(8px)";

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Custom smooth fluid ease
      // In-out cubic-esque flow with visceral snap
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // 1. Expand wrapper height
      wrapper.style.height = `${eased * targetHeight}px`;

      // 2. Animate organic red fluid wave
      if (path) {
        path.setAttribute("d", generateWavePath(eased, "down"));
      }

      // 3. Reveal content progressively behind the wave front
      if (progress > 0.35) {
        const contentP = (progress - 0.35) / 0.65;
        inner.style.opacity = `${contentP}`;
        inner.style.transform = `translateY(${Math.max(0, (1 - contentP) * 8)}px)`;
      }

      // 4. Liquid recedes / dissolves as wave reaches bottom
      if (svg && progress > 0.65) {
        const dissolveP = (progress - 0.65) / 0.35;
        svg.style.opacity = `${1 - dissolveP}`;
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Complete opening
        setPhase("open");
        wrapper.style.height = "auto";
        inner.style.opacity = "1";
        inner.style.transform = "none";
        if (svg) {
          svg.style.display = "none";
          svg.style.opacity = "0";
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  }, [generateWavePath]);

  // Drive closing animation (approx 440ms)
  const runCloseAnimation = useCallback(() => {
    const wrapper = contentWrapperRef.current;
    const inner = contentInnerRef.current;
    const path = liquidPathRef.current;
    const svg = liquidSvgRef.current;

    if (!wrapper || !inner) return;

    if (prefersReducedMotion()) {
      setPhase("closed");
      wrapper.style.height = "0px";
      wrapper.style.opacity = "0";
      if (svg) svg.style.display = "none";
      return;
    }

    setPhase("closing");
    if (svg) {
      svg.style.display = "block";
      svg.style.opacity = "0.9";
    }

    // Lock start height from current scrollHeight
    const startHeight = inner.scrollHeight;
    wrapper.style.height = `${startHeight}px`;

    const duration = 440; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Fast deceleration curve
      const eased = 1 - Math.pow(1 - progress, 3);

      // 1. Shrink wrapper height
      wrapper.style.height = `${(1 - eased) * startHeight}px`;

      // 2. Liquid sweeps back upward
      if (path) {
        path.setAttribute("d", generateWavePath(1 - eased, "up"));
      }

      // 3. Fade content out quickly
      inner.style.opacity = `${Math.max(0, 1 - progress * 1.8)}`;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Complete closing
        setPhase("closed");
        wrapper.style.height = "0px";
        wrapper.style.opacity = "0";
        inner.style.opacity = "0";
        if (svg) {
          svg.style.display = "none";
          svg.style.opacity = "0";
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  }, [generateWavePath]);

  // Respond to external `isOpen` prop changes
  useEffect(() => {
    if (isOpen && (phase === "closed" || phase === "closing")) {
      runOpenAnimation();
    } else if (!isOpen && (phase === "open" || phase === "opening")) {
      runCloseAnimation();
    }
  }, [isOpen, phase, runOpenAnimation, runCloseAnimation]);

  // Clean up rAF on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const isExpanded = phase === "open" || phase === "opening";

  return (
    <div className={`w-full ${className}`}>
      {/* Editorial Toggle Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        className="group relative inline-flex items-center justify-between w-full sm:w-auto gap-4 py-2.5 px-4 min-h-[44px] bg-[var(--bg-surface)] hover:bg-[var(--accent)] text-[var(--text-primary)] hover:text-[#0A0A0A] border border-[var(--border-color)] hover:border-[var(--accent)] font-mono text-xs font-bold tracking-wider transition-all duration-200 select-none cursor-pointer shadow-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          {/* Accent square indicator */}
          <span
            className={`w-1.5 h-1.5 transition-colors duration-200 ${
              isExpanded
                ? "bg-[var(--accent)] group-hover:bg-[#0A0A0A]"
                : "bg-[var(--accent)] group-hover:bg-[#0A0A0A]"
            }`}
          />
          <span className="uppercase">{isExpanded ? closeLabel : openLabel}</span>
          {badge && (
            <span className="text-[10px] text-[var(--text-muted)] group-hover:text-[#0A0A0A]/80 font-normal">
              {badge}
            </span>
          )}
        </div>

        {/* Dynamic directional glyph */}
        <span
          className={`font-mono text-xs text-[var(--accent)] group-hover:text-[#0A0A0A] transition-transform duration-300 font-black ${
            isExpanded ? "rotate-45" : "group-hover:translate-y-0.5"
          }`}
        >
          {isExpanded ? "✕" : "↳"}
        </span>
      </button>

      {/* Progressively Disclosed Content Wrapper with Fluid Red Liquid Wave */}
      <div
        ref={contentWrapperRef}
        className="relative overflow-hidden transition-[opacity] duration-200 will-change-[height]"
        style={{
          height: isOpen ? "auto" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Organic Red Liquid Animation Layer */}
        <svg
          ref={liquidSvgRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-20 will-change-transform"
          viewBox="0 0 100 110"
          preserveAspectRatio="none"
          style={{ display: "none" }}
        >
          <defs>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
              <stop offset="85%" stopColor="var(--accent)" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#C02600" stopOpacity="0.98" />
            </linearGradient>
          </defs>
          <path
            ref={liquidPathRef}
            d="M 0 0 L 100 0 L 100 0 Z"
            fill="url(#liquidGrad)"
          />
        </svg>

        {/* Revealed Document Content (Participates in normal layout flow once open) */}
        <div
          ref={contentInnerRef}
          className="pt-4 pb-2 relative z-10 will-change-transform"
          style={{
            visibility: phase === "closed" ? "hidden" : "visible",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
