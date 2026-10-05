"use client";

import React, { useEffect, useRef } from "react";
import SectionHeader from "./SectionHeader";
import { EXPERIENCES, POSITIONS_OF_RESPONSIBILITY, ExperienceItem } from "@/data/portfolioData";
import { MapPin, Calendar } from "lucide-react";
import { observeScrollReveal, animateTextReveal, animateLineDraw } from "@/animations";

function ExperienceRow({ exp, idx }: { exp: ExperienceItem; idx: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;

    const cleanup = observeScrollReveal(
      rowRef.current,
      () => {
        if (yearRef.current) {
          animateTextReveal(yearRef.current, {
            direction: idx % 2 === 0 ? "right" : "left",
            distance: 25,
            duration: 950,
          });
        }
        if (contentRef.current) {
          animateTextReveal(contentRef.current, {
            direction: "up",
            distance: 18,
            duration: 950,
            delay: 180,
          });
        }
        if (borderRef.current) {
          animateLineDraw(borderRef.current, {
            direction: "left",
            duration: 750,
            delay: 300,
          });
        }
      },
      { threshold: 0.15 }
    );

    return cleanup;
  }, [idx]);

  return (
    <div
      ref={rowRef}
      className="group py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative"
    >
      {/* Left: Oversized Year, Period & Status */}
      <div ref={yearRef} className="lg:col-span-3 space-y-3 font-mono will-change-transform">
        <div className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
          {exp.year}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="uppercase">{exp.status}</span>
          </div>
          <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{exp.period}</span>
          </div>
        </div>

        <div className="inline-block px-2.5 py-1 bg-[var(--bg-surface)] text-[var(--accent)] font-mono text-[11px] font-semibold border border-[var(--border-color)]">
          {exp.division}
        </div>
      </div>

      {/* Right: Company, Role & Accomplishments */}
      <div ref={contentRef} className="lg:col-span-9 space-y-6 will-change-transform">
        {/* Company & Role Header */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] tracking-tight uppercase">
              {exp.company}
            </h3>
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{exp.location}</span>
            </div>
          </div>

          <div className="font-mono text-sm sm:text-base font-bold text-[var(--accent)] tracking-wide uppercase">
            {exp.role} — {exp.division}
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          {exp.description}
        </p>

        {/* Concrete Deliverables Bullet Points */}
        <div className="space-y-2 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-bold">
            KEY PRODUCTION CONTRIBUTIONS:
          </span>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            {exp.achievements.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[var(--accent)] font-bold">↳</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2 pt-2 font-mono">
          {exp.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)] uppercase text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Row border & hover accent line */}
      <div
        ref={borderRef}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--border-color)]/50 will-change-transform"
        style={{ transformOrigin: "left center" }}
      />
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[var(--accent)] transition-all duration-400 ease-out" />
    </div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 scroll-mt-20">
      {/* Technical Section Divider */}
      <SectionHeader
        number="02"
        title="EXPERIENCE"
        tagline="PROFESSIONAL TIMELINE & POSITIONS OF RESPONSIBILITY"
        badge="TIMELINE"
      />

      {/* Professional Experience Section */}
      <div className="pt-8 divide-y divide-[var(--border-strong)]">
        {EXPERIENCES.map((exp, idx) => (
          <ExperienceRow key={idx} exp={exp} idx={idx} />
        ))}
      </div>

      {/* Positions of Responsibility Sub-section */}
      <div className="mt-16 pt-12 border-t-2 border-[var(--border-strong)] space-y-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono">
          <div>
            <span className="text-xs text-[var(--accent)] font-bold tracking-widest block uppercase">
              {"// CAMPUS LEADERSHIP"}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight uppercase mt-1">
              POSITIONS OF RESPONSIBILITY
            </h3>
          </div>
          <span className="text-xs text-[var(--text-muted)]">VNIT NAGPUR CAMPUS ORGANIZATIONS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {POSITIONS_OF_RESPONSIBILITY.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[var(--bg-surface)]/60 border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-colors space-y-3 font-mono relative group"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wide">
                  {item.title}
                </span>
                <span className="text-[11px] text-[var(--accent)] font-semibold whitespace-nowrap">
                  {item.period}
                </span>
              </div>

              <div className="text-xs font-semibold text-[var(--text-secondary)]">
                {item.organization}
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--border-color)]/60">
                {item.description}
              </p>

              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[var(--accent)] transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
