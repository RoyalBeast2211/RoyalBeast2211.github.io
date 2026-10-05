"use client";

import React, { useEffect, useRef } from "react";
import { observeScrollReveal, animateSectionHeaderReveal, triggerGlitchText } from "@/animations";

interface SectionHeaderProps {
  number: string;
  title: string;
  tagline?: string;
  badge?: string;
  id?: string;
}

export default function SectionHeader({
  number,
  title,
  tagline,
  badge,
  id,
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const oversizedRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cleanup = observeScrollReveal(
      containerRef.current,
      () => {
        animateSectionHeaderReveal({
          label: labelRef.current,
          line: lineRef.current,
          oversizedNumber: oversizedRef.current,
        });

        if (title === "EXPERIENCE" && titleTextRef.current) {
          setTimeout(() => {
            if (titleTextRef.current) {
              triggerGlitchText(titleTextRef.current, "EXPERIENCE", "EXP█RIENCE", 75);
            }
          }, 240);
        }
      },
      { threshold: 0.15 }
    );

    return cleanup;
  }, [title]);

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full pt-16 pb-8 font-mono select-none overflow-hidden"
    >
      {/* Oversized section number briefly animated behind header */}
      <div
        ref={oversizedRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 font-display font-black text-[clamp(6rem,14vw,14rem)] text-[var(--text-primary)] opacity-0 select-none leading-none z-0"
      >
        {number}
      </div>

      <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
        {/* Left: Section Label */}
        <div ref={labelRef} className="space-y-1 will-change-transform">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] tracking-widest uppercase">
            <span className="text-[var(--accent)] font-bold">CHAPTER //</span>
            <span>{number}</span>
            {tagline && (
              <>
                <span className="text-[var(--border-color)]">·</span>
                <span className="text-[var(--text-secondary)]">{tagline}</span>
              </>
            )}
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--text-primary)] uppercase">
            {number} / <span ref={titleTextRef}>{title}</span>
          </h2>
        </div>

        {/* Right: Editorial Badge */}
        {badge && (
          <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-mono">
            <span className="text-[var(--accent)] font-bold">{"//"}</span>
            <span>{badge}</span>
          </div>
        )}
      </div>

      {/* Section 14: Brutalist Horizontal Line Drawing (draws left -> right) */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--border-color)] will-change-transform"
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}
