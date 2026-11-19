"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { EXPERIENCES, LEADERSHIP_TRACKS, ExperienceItem } from "@/data/portfolioData";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { observeScrollReveal, animateTextReveal, animateLineDraw } from "@/animations";
import LiquidReveal from "./LiquidReveal";

function ExperienceRow({
  exp,
  idx,
  isExpandedMobile,
  onToggleMobile,
}: {
  exp: ExperienceItem;
  idx: number;
  isExpandedMobile: boolean;
  onToggleMobile: () => void;
}) {
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
      className="group py-8 lg:py-20 relative"
    >
      {/* Desktop Layout (Untouched: hidden on mobile, visible on desktop) */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-12 w-full">
        {/* Left: Oversized Year, Period & Status */}
        <div ref={yearRef} className="lg:col-span-3 space-y-2 lg:space-y-3 font-mono will-change-transform">
          <div className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
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
      </div>

      {/* Mobile Layout (Condensed Editorial Timeline + Progressive Liquid Reveal) */}
      <div className="block lg:hidden space-y-4 w-full">
        {/* Mobile Header Facts: Year, Division, Status */}
        <div className="flex items-center justify-between font-mono text-xs border-b border-[var(--border-color)]/50 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)]">
              {exp.year}
            </span>
            <span className="px-2 py-0.5 bg-[var(--bg-surface)] text-[var(--accent)] text-[10px] font-semibold border border-[var(--border-color)]">
              {exp.division}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="uppercase text-[11px] font-semibold">{exp.status}</span>
          </div>
        </div>

        {/* Company, Role, Period & Location */}
        <div className="space-y-1.5">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight uppercase">
            {exp.company}
          </h3>
          <div className="font-mono text-xs sm:text-sm font-bold text-[var(--accent)] tracking-wide uppercase">
            {exp.role}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[var(--accent)]" />
              <span>{exp.period}</span>
            </div>
            <span className="text-[var(--border-color)]">·</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[var(--accent)]" />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        {/* Liquid Reveal for Detailed Context on Mobile */}
        <LiquidReveal
          isOpen={isExpandedMobile}
          onToggle={onToggleMobile}
          openLabel="VIEW DETAILS"
          closeLabel="HIDE DETAILS"
          badge="CONTEXT & SPECS"
        >
          <div className="space-y-4 pt-2 border-l-2 border-[var(--accent)] pl-3.5">
            {/* Narrative Description */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {exp.description}
            </p>

            {/* Key Contributions */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs">
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-bold">
                KEY PRODUCTION CONTRIBUTIONS:
              </span>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">↳</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="pt-2 border-t border-[var(--border-color)]/60 font-mono">
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-bold mb-1.5">
                TECHNOLOGIES:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)] uppercase text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </LiquidReveal>
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
  // Mobile accordion behavior: only one expanded at a time to prevent endless scroll
  const [expandedExpIdx, setExpandedExpIdx] = useState<number | null>(null);

  const handleToggleMobile = (idx: number) => {
    setExpandedExpIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="experience" className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 scroll-mt-20">
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
          <ExperienceRow
            key={idx}
            exp={exp}
            idx={idx}
            isExpandedMobile={expandedExpIdx === idx}
            onToggleMobile={() => handleToggleMobile(idx)}
          />
        ))}
      </div>

      {/* Positions of Responsibility Sub-section with Track Progression */}
      <div className="mt-16 pt-12 border-t-2 border-[var(--border-strong)] space-y-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono">
          <div>
            <span className="text-xs text-[var(--accent)] font-bold tracking-widest block uppercase">
              {"// CAMPUS LEADERSHIP & PROGRESSION"}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight uppercase mt-1">
              POSITIONS OF RESPONSIBILITY
            </h3>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            VNIT NAGPUR // PROVEN LEADERSHIP TRAJECTORIES
          </span>
        </div>

        {/* Leadership Tracks */}
        <div className="space-y-10">
          {LEADERSHIP_TRACKS.map((track, trackIdx) => (
            <div
              key={track.id}
              className="p-6 sm:p-8 bg-[var(--bg-surface)]/60 border-2 border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all space-y-6 font-mono relative shadow-xs"
            >
              {/* Track Header & Progression Stepper */}
              <div className="space-y-3 pb-5 border-b border-[var(--border-color)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-[var(--accent)] tracking-wider block">
                      TRACK 0{trackIdx + 1} // {track.subtitle}
                    </span>
                    <h4 className="font-display font-black text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight uppercase mt-0.5">
                      {track.trackName}
                    </h4>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold">
                    {track.roles.length} ROLES RECORDED
                  </span>
                </div>

                {/* Progression Stepper Ribbon */}
                <div className="pt-2">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                    PROVEN TRAJECTORY & PROMOTIONS:
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {track.progression.map((step, sIdx) => {
                      const isLast = sIdx === track.progression.length - 1;
                      return (
                        <React.Fragment key={sIdx}>
                          <span
                            className={`px-2.5 py-1 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 border ${
                              isLast
                                ? "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/60 font-bold"
                                : "bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-color)]"
                            }`}
                          >
                            <span className="opacity-60 text-[10px]">0{sIdx + 1}.</span>
                            <span>{step}</span>
                            {isLast && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                            )}
                          </span>
                          {!isLast && (
                            <ChevronRight className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 hidden sm:inline" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Roles Cards Grid */}
              <div
                className={`grid grid-cols-1 ${
                  track.roles.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"
                } gap-5`}
              >
                {track.roles.map((role, rIdx) => (
                  <div
                    key={rIdx}
                    className={`p-5 border transition-all flex flex-col justify-between space-y-4 ${
                      role.isCurrent
                        ? "bg-[var(--bg-primary)] border-[var(--accent)]/70 shadow-sm"
                        : "bg-[var(--bg-primary)]/70 border-[var(--border-color)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          {role.progressionNote && (
                            <span className="text-[10px] font-bold text-[var(--accent)] block uppercase tracking-wider">
                              {role.progressionNote}
                            </span>
                          )}
                          <h5 className="font-display font-extrabold text-lg text-[var(--text-primary)] tracking-tight uppercase">
                            {role.title}
                          </h5>
                        </div>
                        {role.isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-[var(--accent)] text-[#111111] uppercase whitespace-nowrap">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        <span>{role.period}</span>
                      </div>

                      <div className="text-xs text-[var(--text-muted)] font-medium">
                        {role.organization}
                      </div>

                      {/* Accomplishment Bullets */}
                      <ul className="space-y-2 pt-2 border-t border-[var(--border-color)]/60 text-xs text-[var(--text-secondary)]">
                        {role.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-[var(--accent)] font-bold shrink-0">↳</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
