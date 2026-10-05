"use client";

import React, { useEffect, useRef } from "react";
import SectionHeader from "./SectionHeader";
import {
  RATINGS_DATA,
  ACHIEVEMENTS,
} from "@/data/portfolioData";
import { ArrowUpRight, Trophy, ExternalLink, Activity } from "lucide-react";
import { useCodolio } from "@/context/CodolioContext";
import { observeScrollReveal, animateCounter } from "@/animations";

export default function ProblemSolving() {
  const { data: codolio, isLive } = useCodolio();
  const containerRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Section 21: Short mechanical counting animation on scroll entrance
  useEffect(() => {
    if (!containerRef.current || !counterRef.current) return;

    const rawString = codolio?.totalSolvedString || "980+";
    const targetNumber = parseInt(rawString.replace(/\D/g, ""), 10) || 980;

    const cleanup = observeScrollReveal(
      containerRef.current,
      () => {
        if (counterRef.current) {
          animateCounter(counterRef.current, {
            start: 0,
            end: targetNumber,
            duration: 750,
            suffix: "+",
          });
        }
      },
      { threshold: 0.15 }
    );

    return cleanup;
  }, [codolio?.totalSolvedString]);

  // Create enriched platform cards using live Codolio stats when available
  const displayPlatforms = RATINGS_DATA.map((plat) => {
    if (plat.platform === "LEETCODE" && codolio?.platforms?.leetcode) {
      const lc = codolio.platforms.leetcode;
      return {
        ...plat,
        badge: lc.badge.toUpperCase(),
        rating: String(lc.rating),
        metrics: [
          { label: "SOLVED", value: String(lc.totalSolved) },
          { label: "RATING", value: String(lc.rating) },
          { label: "BADGE", value: lc.badge.toUpperCase() },
        ],
        highlights: [
          `${lc.totalSolved}+ verified solutions (${lc.medium} Medium, ${lc.hard} Hard, ${lc.easy} Easy)`,
          `${lc.badge} Title achieved through rated contest consistency`,
          `${lc.activeDays} active days with ${lc.maxStreak}-day maximum streak`,
          "Dynamic programming, graph theory, trees & optimization",
        ],
      };
    }
    if (plat.platform === "CODECHEF" && codolio?.platforms?.codechef) {
      const cc = codolio.platforms.codechef;
      return {
        ...plat,
        badge: `${cc.starsString} STAR`,
        rating: `${cc.maxRating} MAX / ${cc.rating}`,
        metrics: [
          { label: "CURRENT", value: String(cc.rating) },
          { label: "PEAK", value: String(cc.maxRating) },
          { label: "TIER", value: cc.starsString },
        ],
        highlights: [
          `${cc.maxRating} peak rating achieving Division 2 status`,
          `${cc.totalSolved} verified competitive solutions solved`,
          "Discrete mathematics, combinatorics & number theory",
          "Time-pressured problem solving & complex constraints",
        ],
      };
    }
    if (plat.platform === "CODOLIO" && codolio?.platforms) {
      const { leetcode: lc, codechef: cc, geeksforgeeks: gfg } = codolio.platforms;
      return {
        ...plat,
        badge: `${codolio.totalSolvedString} SOLVED`,
        rating: codolio.totalSolvedString,
        metrics: [
          { label: "LEETCODE", value: String(lc.totalSolved) },
          { label: "GFG", value: String(gfg.totalSolved) },
          { label: "CODECHEF", value: String(cc.totalSolved) },
        ],
        highlights: [
          `${codolio.totalSolvedString} verified solutions aggregated across platforms`,
          `LeetCode: ${lc.totalSolved} | GeeksforGeeks: ${gfg.totalSolved} | CodeChef: ${cc.totalSolved}`,
          `GFG Solved: ${gfg.totalSolved} (${gfg.medium} Med, ${gfg.easy} Easy, ${gfg.hard} Hard)`,
          `Codolio verified profile with ${codolio.profileViews}+ views`,
        ],
      };
    }
    return plat;
  });

  return (
    <section
      ref={containerRef}
      id="problems"
      className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 scroll-mt-20"
    >
      {/* Technical Section Divider */}
      <SectionHeader
        number="03"
        title="PROBLEM SOLVING"
        tagline="COMPETITIVE PROGRAMMING, RATINGS & HONORS"
        badge="980+ SOLVED"
      />

      {/* Dramatic Typography Hero Block */}
      <div className="py-16 lg:py-20 border-b border-[var(--border-color)] editorial-grid relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          {/* Left: Oversized Number 980+ */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
                <span className="text-[var(--accent)] font-bold">TOTAL VERIFIED SOLUTIONS //</span>
                <span>DATA STRUCTURES & ALGORITHMS</span>
              </div>

              {/* Live Sync Badge */}
              <a
                href={codolio?.codolioUrl || "https://codolio.com/profile/theomkarmore"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[var(--terminal-bg)] border border-[var(--terminal-border)] hover:border-[var(--accent)] text-[10px] font-mono text-[var(--terminal-text)] transition-colors group"
                title="Always fetched live from Codolio public profile"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-[#10B981] animate-pulse" : "bg-[var(--accent)]"}`} />
                <span className="group-hover:text-[var(--accent)] transition-colors">
                  {isLive ? "LIVE CODOLIO SYNC" : "CODOLIO VERIFIED"}
                </span>
                <Activity className="w-3 h-3 text-[var(--accent)]" />
              </a>
            </div>

            <div
              ref={counterRef}
              className="font-display font-black text-[var(--text-primary)] leading-[0.8] tracking-tighter text-[clamp(5.5rem,16vw,17rem)] select-none hover:text-[var(--accent)] transition-colors duration-400"
            >
              {codolio?.totalSolvedString || "980+"}
            </div>

            <div className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight uppercase">
              PROBLEMS SOLVED
            </div>

            <p className="font-mono text-xs text-[var(--text-secondary)] pt-1 flex flex-wrap items-center gap-2">
              <span>Aggregated across LeetCode ({codolio?.platforms?.leetcode?.totalSolved || 835}), GeeksforGeeks ({codolio?.platforms?.geeksforgeeks?.totalSolved || 106}), and CodeChef ({codolio?.platforms?.codechef?.totalSolved || 39}).</span>
              <a
                href={codolio?.codolioUrl || "https://codolio.com/profile/theomkarmore"}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent)] underline hover:no-underline font-bold inline-flex items-center gap-0.5"
              >
                <span>Inspect Codolio Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          {/* Right: Quick Highlights Summary */}
          <div className="lg:col-span-5 space-y-3 font-mono">
            <div className="p-4 bg-[var(--terminal-bg)] text-[var(--terminal-text)] border border-[var(--terminal-border)] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase block">LEETCODE</span>
                <span className="font-display font-extrabold text-2xl text-[var(--text-primary)]">
                  {codolio?.platforms?.leetcode?.rating || "1860"} {codolio?.platforms?.leetcode?.badge?.toUpperCase() || "KNIGHT"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs bg-[var(--accent)] text-[#111111] font-bold px-2 py-0.5 block">TOP 5%</span>
                <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                  {codolio?.platforms?.leetcode?.totalSolved || 835} SOLVED
                </span>
              </div>
            </div>

            <div className="p-4 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[var(--text-secondary)] uppercase block">CODECHEF</span>
                <span className="font-display font-extrabold text-2xl text-[var(--text-primary)]">
                  {codolio?.platforms?.codechef?.rating || "1590"} RATING
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[var(--text-primary)] border border-[var(--border-strong)] px-2 py-0.5 block">
                  {codolio?.platforms?.codechef?.starsString || "2★"} STAR
                </span>
                <span className="text-[10px] text-[var(--text-secondary)] mt-1 block">
                  PEAK {codolio?.platforms?.codechef?.maxRating || 1623}
                </span>
              </div>
            </div>

            <div className="p-4 bg-[var(--terminal-bg)] text-[var(--terminal-text)] border border-[var(--terminal-border)] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase block">CODOLIO AGGREGATE</span>
                <span className="font-display font-extrabold text-2xl text-[var(--text-primary)]">
                  {codolio?.totalSolvedString || "980+"} SOLVED
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[var(--accent)] font-bold">
                  {codolio?.profileViews || 204}+ VIEWS
                </span>
                <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">3 PLATFORMS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Competitive Programming Ratings Section */}
      <div className="pt-16 space-y-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono pb-4 border-b border-[var(--border-color)]/60">
          <div>
            <span className="text-xs text-[var(--accent)] font-bold tracking-widest block uppercase">
              {"// COMPETITIVE PROFILES"}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight uppercase mt-1">
              RATINGS & CONTEST BENCHMARKS
            </h3>
          </div>
          <a
            href={codolio?.codolioUrl || "https://codolio.com/profile/theomkarmore"}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
          >
            <span>LIVE AUDITED ON CODOLIO.COM</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Detailed Rating Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
          {displayPlatforms.map((plat) => (
            <div
              key={plat.platform}
              className="bg-[var(--bg-surface)]/60 border-2 border-[var(--border-strong)] p-6 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Top Meta Line */}
                <div className="flex items-center justify-between text-xs border-b border-[var(--border-color)] pb-3">
                  <span className="px-2 py-0.5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-bold tracking-wider">
                    {plat.tag}
                  </span>
                  <a
                    href={plat.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--text-primary)] hover:text-[var(--accent)] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]"
                  >
                    <span>{plat.handle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                  </a>
                </div>

                {/* Platform Header & Big Rating Number */}
                <div className="space-y-1">
                  <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                    {plat.tier}
                  </div>
                  <h4 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight uppercase">
                    {plat.badge}
                  </h4>
                  <div className="text-sm font-bold text-[var(--accent)]">
                    PEAK RATING: {plat.rating}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {plat.summary}
                </p>

                {/* Highlight Bullets */}
                <div className="space-y-1.5 pt-3 border-t border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase block tracking-wider font-bold">
                    SPECIFICATION HIGHLIGHTS:
                  </span>
                  <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                    {plat.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[var(--accent)] font-bold">↳</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom 3-Column Metrics Badges & Profile Button */}
              <div className="space-y-4 pt-4 border-t border-[var(--border-strong)]">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {plat.metrics.map((m, i) => (
                    <div key={i} className="bg-[var(--terminal-bg)] text-[var(--terminal-text)] p-2 border border-[var(--terminal-border)]">
                      <span className="text-[9px] text-[var(--text-muted)] block uppercase">
                        {m.label}
                      </span>
                      <span className="text-[11px] font-bold text-[var(--accent)] block mt-0.5 whitespace-nowrap">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={plat.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-[var(--text-primary)] hover:bg-[var(--accent)] text-[var(--bg-primary)] hover:text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>VISIT {plat.platform} PROFILE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Hover Bottom Accent */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[3px] bg-[var(--accent)] transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Achievements & Honors Section */}
      <div className="mt-16 pt-12 border-t-2 border-[var(--border-strong)] space-y-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono">
          <div>
            <span className="text-xs text-[var(--accent)] font-bold tracking-widest block uppercase">
              {"// COMPETITIVE HONORS"}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight uppercase mt-1">
              ACHIEVEMENTS & NATIONAL RECOGNITION
            </h3>
          </div>
          <span className="text-xs text-[var(--text-muted)]">VERIFIED ASSETS & COMPETITIONS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {ACHIEVEMENTS.map((ach, idx) => (
            <div
              key={idx}
              className="p-6 bg-[var(--bg-surface)]/60 border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all space-y-4 flex flex-col justify-between relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 bg-[var(--accent)] text-[#111111] font-bold tracking-wider uppercase">
                    {ach.tag}
                  </span>
                  <Trophy className="w-4 h-4 text-[var(--accent)]" />
                </div>

                <div>
                  <div className="text-sm font-mono text-[var(--text-muted)] uppercase">
                    {ach.metric}
                  </div>
                  <h4 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] uppercase tracking-tight mt-0.5">
                    {ach.title}
                  </h4>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--border-color)]/60">
                  {ach.detail}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[var(--accent)] transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
