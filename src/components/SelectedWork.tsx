"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS, ProjectItem } from "@/data/portfolioData";
import SectionHeader from "./SectionHeader";
import MiniRedisTechnicalVisual from "./MiniRedisTechnicalVisual";
import AgenticMigratorTechnicalVisual from "./AgenticMigratorTechnicalVisual";
import { observeScrollReveal, initMagneticElement } from "@/animations";
import { animate } from "animejs";
import LiquidReveal from "./LiquidReveal";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Count-up animation for throughput / metrics
function CountUpNumber({ target = 100000, suffix = "+" }: { target?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!ref.current || animatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const duration = 800; // ms
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              // Out Cubic easing
              const ease = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.round(ease * target);
              setCount(currentVal);
              if (progress < 1) {
                requestAnimationFrame(step);
              }
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function SelectedWork() {
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Top 2 Curated Featured Projects: MiniRedis & Agentic Code Migrator
  const featuredProjects = PROJECTS.filter((p) => p.featured).sort(
    (a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0)
  );

  const miniRedis = featuredProjects.find((p) => p.id === "miniredis") || PROJECTS[0];
  const agenticMigrator = featuredProjects.find((p) => p.id === "agentic-code-migrator") || PROJECTS[1];

  const miniRedisCardRef = useRef<HTMLElement>(null);
  const miniRedisVisualRef = useRef<HTMLDivElement>(null);
  const miniRedisMetaRef = useRef<HTMLDivElement>(null);

  const migratorCardRef = useRef<HTMLElement>(null);
  const migratorVisualRef = useRef<HTMLDivElement>(null);
  const migratorMetaRef = useRef<HTMLDivElement>(null);

  // Magnetic button effects
  const miniRedisCodeBtnRef = useRef<HTMLAnchorElement>(null);
  const migratorCodeBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    if (miniRedisCodeBtnRef.current) cleanups.push(initMagneticElement(miniRedisCodeBtnRef.current, ".magnetic-target", 6));
    if (migratorCodeBtnRef.current) cleanups.push(initMagneticElement(migratorCodeBtnRef.current, ".magnetic-target", 6));
    return () => cleanups.forEach((c) => c());
  }, []);

  // Close active project modal on Escape key & lock scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProjectModal(null);
      }
    };
    if (activeProjectModal) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProjectModal]);

  // MiniRedis Entrance Stagger Sequence
  useEffect(() => {
    if (!miniRedisCardRef.current) return;
    const cleanup = observeScrollReveal(
      miniRedisCardRef.current,
      () => {
        if (miniRedisMetaRef.current) {
          animate(miniRedisMetaRef.current, {
            opacity: [0, 1],
            translateY: [25, 0],
            duration: 1250,
            ease: "outCubic",
          } as any);
        }
        if (miniRedisVisualRef.current) {
          animate(miniRedisVisualRef.current, {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1350,
            delay: 180,
            ease: "outCubic",
          } as any);
        }
      },
      { threshold: 0.15 }
    );
    return cleanup;
  }, []);

  // Agentic Code Migrator Entrance Stagger
  useEffect(() => {
    if (!migratorCardRef.current) return;
    const cleanup = observeScrollReveal(
      migratorCardRef.current,
      () => {
        if (migratorVisualRef.current) {
          animate(migratorVisualRef.current, {
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 1250,
            ease: "outCubic",
          } as any);
        }
        if (migratorMetaRef.current) {
          animate(migratorMetaRef.current, {
            opacity: [0, 1],
            translateX: [30, 0],
            duration: 1250,
            delay: 180,
            ease: "outCubic",
          } as any);
        }
      },
      { threshold: 0.15 }
    );
    return cleanup;
  }, []);

  return (
    <section id="projects" className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 scroll-mt-20">
      {/* 03 / PROJECTS Header */}
      <SectionHeader
        number="03"
        title="PROJECTS"
        tagline="CURATED PRODUCTION BUILDS"
        badge="FEATURED"
      />

      {/* TWO CURATED FEATURED PROJECTS */}
      <div className="space-y-24 lg:space-y-36">
        {/* ========================================================= */}
        {/* PROJECT 01: MINIREDIS (Systems / Distributed / Go) */}
        {/* ========================================================= */}
        <article
          ref={miniRedisCardRef}
          id="miniredis"
          data-project-card="true"
          className="group relative border-b border-[var(--border-color)] pb-16 lg:pb-24"
        >
          {/* Top Meta Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)] pb-6 border-b border-[var(--border-color)]/60">
            <div className="flex items-center gap-3">
              <span className="text-[var(--accent)] font-bold">PROJECT_01</span>
              <span className="text-[var(--border-color)]">/</span>
              <span className="tracking-widest uppercase text-[var(--text-primary)] font-semibold">
                DISTRIBUTED IN-MEMORY DATABASE // GO SYSTEMS
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[var(--text-secondary)]">{miniRedis.techString}</span>
              <span className="text-[var(--border-color)]">|</span>
              <span className="text-[var(--text-primary)] font-bold">{miniRedis.year}</span>
            </div>
          </div>

          {/* Desktop Grid Spread: Text on Left, Visual Terminal Workbench on Right */}
          <div className="hidden lg:grid mt-14 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: MiniRedis Narrative & Benchmark Throughput */}
            <div ref={miniRedisMetaRef} className="lg:col-span-6 space-y-6">
              {/* Type pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-[11px] border border-[var(--border-color)]">
                <span className="text-[var(--accent)] font-bold">{"//"}</span>
                <span>GO HIGH-CONCURRENCY STORAGE ENGINE</span>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <h3 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter text-[var(--text-primary)] uppercase">
                  {miniRedis.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[var(--accent)] font-semibold tracking-wider uppercase">
                  {miniRedis.subtitle}
                </p>
              </div>

              {/* PROMINENT FACT: 100K+ OPS/SEC THROUGHPUT */}
              <div className="p-5 sm:p-6 bg-[var(--bg-surface)] border-2 border-[var(--accent)]/40 relative overflow-hidden space-y-1 shadow-lg">
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest font-bold">
                  SCALE &amp; BENCHMARK THROUGHPUT
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[var(--accent)] tracking-tight">
                  <CountUpNumber target={100000} suffix="+" />
                </div>
                <div className="font-display font-bold text-base sm:text-lg tracking-wide uppercase text-[var(--text-primary)]">
                  OPERATIONS / SECOND // P99 &lt; 1.5MS
                </div>
                <p className="font-mono text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  High-throughput, Redis-compatible in-memory key-value database built from first principles in pure Go. Engineered with zero-dependency RESP wire protocol serialization, concurrent lock-striped storage with O(1) LRU eviction, hybrid AOF/RDB durability, and PSYNC primary-replica streaming.
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {miniRedis.description}
              </p>

              {/* Compact Technical Specification */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[var(--border-color)]/60 font-mono text-xs">
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">TYPE</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">Systems DB</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">THROUGHPUT</span>
                  <span className="font-bold text-[var(--accent)] block mt-0.5">100K+ req/s</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">DURABILITY</span>
                  <span className="font-bold text-[#10B981] block mt-0.5">AOF + RDB</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">PROTOCOL</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">RESP Wire</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs text-[var(--text-secondary)]">
                {miniRedis.highlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">↳</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
                {miniRedis.githubUrl && (
                  <a
                    ref={miniRedisCodeBtnRef}
                    href={miniRedis.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="SOURCE ↗"
                    data-magnetic="true"
                    className="editorial-link inline-flex items-center gap-2 px-5 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-bold uppercase tracking-wider transition-colors relative overflow-hidden"
                  >
                    <span className="magnetic-target inline-flex items-center gap-2">
                      <GithubIcon className="w-4 h-4" />
                      <span>AUDIT REPO ON GITHUB</span>
                      <span>─</span>
                      <span>↗</span>
                    </span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setActiveProjectModal(miniRedis)}
                  className="px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  VIEW DOSSIER ↗
                </button>
              </div>
            </div>

            {/* Right Column: MiniRedis Technical Workbench */}
            <div ref={miniRedisVisualRef} className="lg:col-span-6 w-full">
              <MiniRedisTechnicalVisual />
            </div>
          </div>

          {/* Mobile Composition: Condensed Presentation + Liquid Reveal */}
          <div className="block lg:hidden mt-8 space-y-6">
            {/* Type pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-[11px] border border-[var(--border-color)]">
              <span className="text-[var(--accent)] font-bold">{"//"}</span>
              <span>GO SYSTEMS ENGINE</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-[var(--text-primary)] uppercase">
                {miniRedis.title}
              </h3>
              <p className="font-mono text-xs text-[var(--accent)] font-semibold tracking-wider uppercase">
                {miniRedis.subtitle}
              </p>
            </div>

            {/* Prominent Real Metric */}
            <div className="p-4 sm:p-5 bg-[var(--bg-surface)] border-2 border-[var(--accent)]/40 relative overflow-hidden space-y-1 shadow-md">
              <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest font-bold">
                SCALE &amp; BENCHMARK THROUGHPUT
              </div>
              <div className="text-4xl sm:text-5xl font-display font-black text-[var(--accent)] tracking-tight">
                <CountUpNumber target={100000} suffix="+" />
              </div>
              <div className="font-display font-bold text-sm tracking-wide uppercase text-[var(--text-primary)]">
                OPERATIONS / SECOND // P99 &lt; 1.5MS
              </div>
            </div>

            {/* Interactive Visual (Mobile responsive) */}
            <div className="w-full overflow-hidden">
              <MiniRedisTechnicalVisual />
            </div>

            {/* Liquid Reveal for Hidden Information */}
            <LiquidReveal
              isOpen={expandedProjectId === "miniredis"}
              onToggle={() =>
                setExpandedProjectId((prev) => (prev === "miniredis" ? null : "miniredis"))
              }
              openLabel="VIEW DETAILS"
              closeLabel="HIDE DETAILS"
              badge="ENGINE SPECS"
            >
              <div className="space-y-5 pt-2 border-l-2 border-[var(--accent)] pl-3.5">
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block font-bold mb-1">
                    DESCRIPTION:
                  </span>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {miniRedis.description}
                  </p>
                </div>

                {/* Compact Technical Specs */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs">
                  <div className="bg-[var(--bg-surface)] p-2 border border-[var(--border-color)]">
                    <span className="text-[9px] text-[var(--text-muted)] block uppercase">TYPE</span>
                    <span className="font-bold text-[var(--text-primary)] block mt-0.5">Systems DB</span>
                  </div>
                  <div className="bg-[var(--bg-surface)] p-2 border border-[var(--border-color)]">
                    <span className="text-[9px] text-[var(--text-muted)] block uppercase">THROUGHPUT</span>
                    <span className="font-bold text-[var(--accent)] block mt-0.5">100K+ req/s</span>
                  </div>
                  <div className="bg-[var(--bg-surface)] p-2 border border-[var(--border-color)]">
                    <span className="text-[9px] text-[var(--text-muted)] block uppercase">DURABILITY</span>
                    <span className="font-bold text-[#10B981] block mt-0.5">AOF + RDB</span>
                  </div>
                  <div className="bg-[var(--bg-surface)] p-2 border border-[var(--border-color)]">
                    <span className="text-[9px] text-[var(--text-muted)] block uppercase">PROTOCOL</span>
                    <span className="font-bold text-[var(--text-primary)] block mt-0.5">RESP Wire</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs text-[var(--text-secondary)]">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-bold mb-1">
                    KEY ACHIEVEMENTS:
                  </span>
                  {miniRedis.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] font-bold">↳</span>
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col gap-2.5 font-mono text-xs">
                  {miniRedis.githubUrl && (
                    <a
                      href={miniRedis.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>AUDIT REPO ON GITHUB</span>
                      <span>↗</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(miniRedis)}
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 border border-[var(--border-color)] text-[var(--text-primary)] font-bold uppercase tracking-wider"
                  >
                    <span>VIEW DOSSIER ↗</span>
                  </button>
                </div>
              </div>
            </LiquidReveal>
          </div>
        </article>

        {/* ========================================================= */}
        {/* PROJECT 02: AGENTIC CODE MIGRATOR (Multi-Agent / Formal Verification) */}
        {/* ========================================================= */}
        <article
          ref={migratorCardRef}
          id="agentic-code-migrator"
          data-project-card="true"
          className="group relative border-b border-[var(--border-color)] pb-16 lg:pb-24"
        >
          {/* Top Meta Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)] pb-6 border-b border-[var(--border-color)]/60">
            <div className="flex items-center gap-3">
              <span className="text-[var(--accent)] font-bold">PROJECT_02</span>
              <span className="text-[var(--border-color)]">/</span>
              <span className="tracking-widest uppercase text-[var(--text-primary)] font-semibold">
                AUTONOMOUS CODEBASE MIGRATION // MULTI-AGENT &amp; FORMAL VERIFICATION
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[var(--text-secondary)]">{agenticMigrator.techString}</span>
              <span className="text-[var(--border-color)]">|</span>
              <span className="text-[var(--text-primary)] font-bold">{agenticMigrator.year}</span>
            </div>
          </div>

          {/* Desktop Grid Spread: Reversed Composition! Visual on Left, Narrative on Right */}
          <div className="hidden lg:grid mt-14 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Multi-Agent Architecture & Differential Sandbox Visual */}
            <div ref={migratorVisualRef} className="lg:col-span-6 order-2 lg:order-1">
              <AgenticMigratorTechnicalVisual />
            </div>

            {/* Right Column: Multi-Agent Narrative & Specifications */}
            <div ref={migratorMetaRef} className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              {/* Type pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-[11px] border border-[var(--border-color)]">
                <span className="text-[var(--accent)] font-bold">{"//"}</span>
                <span>LANGGRAPH MULTI-AGENT &amp; DOCKER DIFFERENTIAL ENGINE</span>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <h3 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter text-[var(--text-primary)] uppercase">
                  {agenticMigrator.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[var(--accent)] font-semibold tracking-wider uppercase">
                  {agenticMigrator.subtitle}
                </p>
              </div>

              {/* Tagline */}
              <p className="font-mono text-xs sm:text-sm text-[var(--text-primary)] font-bold tracking-wide uppercase border-l-2 border-[var(--accent)] pl-3">
                {agenticMigrator.tagline}
              </p>

              {/* PROMINENT FACT: 100% BEHAVIORAL EQUIVALENCE */}
              <div className="p-5 sm:p-6 bg-[var(--bg-surface)] border-2 border-[var(--accent)]/40 relative overflow-hidden space-y-1 shadow-lg">
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest font-bold">
                  VERIFICATION GUARANTEE
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[var(--accent)] tracking-tight">
                  100%
                </div>
                <div className="font-display font-bold text-base sm:text-lg tracking-wide uppercase text-[var(--text-primary)]">
                  BEHAVIORAL OUTPUT PARITY (DOCKER SANDBOX)
                </div>
                <p className="font-mono text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  Goes beyond mere syntactic compilation by running source (Python 2 / Python) and target (Python 3 / Java) side-by-side in isolated Docker containers with coverage-guided differential testing, ensuring byte-identical runtime outputs.
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {agenticMigrator.description}
              </p>

              {/* Compact Technical Specification */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[var(--border-color)]/60 font-mono text-xs">
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">ORCHESTRATOR</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">LangGraph</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">VERIFICATION</span>
                  <span className="font-bold text-[#10B981] block mt-0.5">Differential</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">SANDBOX</span>
                  <span className="font-bold text-[var(--accent)] block mt-0.5">Docker Dual</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">TOOL PROTOCOL</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">3 MCP Servers</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs text-[var(--text-secondary)]">
                {agenticMigrator.highlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">↳</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
                {agenticMigrator.githubUrl && (
                  <a
                    ref={migratorCodeBtnRef}
                    href={agenticMigrator.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic="true"
                    data-cursor="SOURCE ↗"
                    className="editorial-link inline-flex items-center gap-2 px-5 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-bold uppercase tracking-wider transition-colors relative overflow-hidden"
                  >
                    <span className="magnetic-target inline-flex items-center gap-2">
                      <GithubIcon className="w-4 h-4" />
                      <span>AUDIT AGENTIC REPO</span>
                      <span>─</span>
                      <span>↗</span>
                    </span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setActiveProjectModal(agenticMigrator)}
                  className="px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  VIEW DOSSIER ↗
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Composition: Condensed Presentation + Liquid Reveal */}
          <div className="block lg:hidden mt-8 space-y-6">
            {/* Type pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-[11px] border border-[var(--border-color)]">
              <span className="text-[var(--accent)] font-bold">{"//"}</span>
              <span>LANGGRAPH MULTI-AGENT &amp; DOCKER</span>
            </div>

            {/* Title & Category */}
            <div className="space-y-1">
              <h3 className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-[var(--text-primary)] uppercase">
                {agenticMigrator.title}
              </h3>
              <p className="font-mono text-xs text-[var(--accent)] font-semibold tracking-wider uppercase">
                FORMAL VERIFICATION ENGINE
              </p>
            </div>

            {/* Prominent Verification Stat */}
            <div className="p-4 sm:p-5 bg-[var(--bg-surface)] border-2 border-[var(--accent)]/40 relative overflow-hidden space-y-1 shadow-md">
              <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest font-bold">
                VERIFICATION GUARANTEE
              </div>
              <div className="text-4xl sm:text-5xl font-display font-black text-[var(--accent)] tracking-tight">
                100%
              </div>
              <div className="font-display font-bold text-sm tracking-wide uppercase text-[var(--text-primary)]">
                BEHAVIORAL OUTPUT PARITY (DOCKER SANDBOX)
              </div>
            </div>

            {/* Visual (Mobile responsive) */}
            <div className="w-full overflow-hidden">
              <AgenticMigratorTechnicalVisual />
            </div>

            {/* Liquid Reveal for Hidden Information */}
            <LiquidReveal
              isOpen={expandedProjectId === "agentic-code-migrator"}
              onToggle={() =>
                setExpandedProjectId((prev) => (prev === "agentic-code-migrator" ? null : "agentic-code-migrator"))
              }
              openLabel="VIEW DETAILS"
              closeLabel="HIDE DETAILS"
              badge="MIGRATOR SPECS"
            >
              <div className="space-y-5 pt-2 border-l-2 border-[var(--accent)] pl-3.5">
                {/* Tagline */}
                <p className="font-mono text-xs text-[var(--text-primary)] font-bold tracking-wide uppercase border-l-2 border-[var(--accent)] pl-2">
                  {agenticMigrator.tagline}
                </p>

                {/* Description */}
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block font-bold mb-1">
                    DESCRIPTION:
                  </span>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {agenticMigrator.description}
                  </p>
                </div>

                {/* Compact Technical Specs */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs">
                  <div className="bg-[var(--bg-surface)] p-2 border border-[var(--border-color)]">
                    <span className="text-[9px] text-[var(--text-muted)] block uppercase">ORCHESTRATOR</span>
                    <span className="font-bold text-[var(--text-primary)] block mt-0.5">LangGraph</span>
                  </div>
                  <div className="bg-[var(--bg-surface)] p-2 border border-[var(--border-color)]">
                    <span className="text-[9px] text-[var(--text-muted)] block uppercase">VERIFICATION</span>
                    <span className="font-bold text-[#10B981] block mt-0.5">Differential</span>
                  </div>
                  <div className="bg-[var(--bg-surface)] p-2 border border-[var(--border-color)]">
                    <span className="text-[9px] text-[var(--text-muted)] block uppercase">SANDBOX</span>
                    <span className="font-bold text-[var(--accent)] block mt-0.5">Docker Dual</span>
                  </div>
                  <div className="bg-[var(--bg-surface)] p-2 border border-[var(--border-color)]">
                    <span className="text-[9px] text-[var(--text-muted)] block uppercase">PROTOCOL</span>
                    <span className="font-bold text-[var(--text-primary)] block mt-0.5">3 MCP Servers</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs text-[var(--text-secondary)]">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block font-bold mb-1">
                    KEY TECHNICAL HIGHLIGHTS:
                  </span>
                  {agenticMigrator.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] font-bold">↳</span>
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col gap-2.5 font-mono text-xs">
                  {agenticMigrator.githubUrl && (
                    <a
                      href={agenticMigrator.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>AUDIT AGENTIC REPO</span>
                      <span>↗</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(agenticMigrator)}
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 border border-[var(--border-color)] text-[var(--text-primary)] font-bold uppercase tracking-wider"
                  >
                    <span>VIEW DOSSIER ↗</span>
                  </button>
                </div>
              </div>
            </LiquidReveal>
          </div>
        </article>
      </div>

      {/* ========================================================= */}
      {/* EXPANDED ENGINEERING REPERTOIRE (OTHER PROJECTS 03 - 09) */}
      {/* ========================================================= */}
      <div className="mt-16 lg:mt-24 pt-12 border-t-2 border-[var(--border-color)] space-y-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono">
          <div>
            <span className="text-xs text-[var(--accent)] font-bold tracking-widest block uppercase">
              {"// EXPANDED REPERTOIRE"}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] tracking-tight uppercase mt-1">
              ADDITIONAL PRODUCTIONS &amp; SYSTEMS
            </h3>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            7 SPECIALIZED PLATFORMS &amp; ENGINES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {PROJECTS.filter((p) => !p.featured).map((proj) => (
            <div
              key={proj.id}
              className="group p-6 bg-[var(--bg-surface)] border-2 border-[var(--border-color)] hover:border-[var(--border-strong)] flex flex-col justify-between space-y-5 transition-all duration-200 relative shadow-xs hover:shadow-md"
            >
              <div className="space-y-3.5">
                {/* Card Top: Number, Category & Status */}
                <div className="flex items-center justify-between text-xs border-b border-[var(--border-color)] pb-3">
                  <span className="text-[var(--accent)] font-bold text-[11px]">
                    {proj.number}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] uppercase">
                    {proj.category}
                  </span>
                  <span className="text-[10px] text-[#10B981] font-semibold">
                    {proj.status || "Completed"}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h4 className="font-display font-black text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors uppercase tracking-tight">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-[var(--accent)] font-semibold tracking-wider uppercase mt-0.5">
                    {proj.subtitle}
                  </p>
                </div>

                {/* Tagline & Description */}
                <p className="text-xs text-[var(--text-primary)] font-semibold leading-snug border-l-2 border-[var(--accent)] pl-2.5">
                  {proj.tagline}
                </p>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-color)]/60 text-[10px]">
                  {proj.tech.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[var(--text-muted)] text-[9px]">
                      +{proj.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(proj)}
                  className="flex-1 py-2.5 px-3 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-bold text-center uppercase tracking-wider transition-all duration-150 active:scale-[0.98] cursor-pointer"
                >
                  DOSSIER ↗
                </button>

                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] transition-all duration-150 active:scale-[0.95]"
                    title="Audit Source Code on GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Bottom Subtle Accent Stripe on Hover */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[var(--accent)] transition-all duration-200" />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW ALL PROJECTS CTA */}
      {/* ========================================================= */}
      <div className="mt-16 lg:mt-24 pt-12 border-t-2 border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-mono text-xs">
        <div>
          <span className="text-[var(--accent)] font-bold block uppercase tracking-wider text-[11px]">
            ARCHIVE // 09 TOTAL PROJECTS
          </span>
          <span className="text-[var(--text-secondary)] text-xs mt-1 block">
            Go Distributed DB · Multi-Agent Orchestration · Mobile · Systems CLI · C++ Optics · WebSockets
          </span>
        </div>

        <Link
          href="/projects"
          data-cursor="OPEN ARCHIVE"
          className="view-all-projects-cta group inline-flex items-center gap-3 px-6 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-bold text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.98] self-start sm:self-auto shadow-md"
        >
          <span>VIEW ALL PROJECTS</span>
          <span className="inline-flex items-center transition-transform duration-200 group-hover:translate-x-1">
            <span className="inline-block transition-all duration-200 w-2 group-hover:w-6 overflow-hidden align-middle">
              ───
            </span>
            <span>↗</span>
          </span>
        </Link>
      </div>

      {/* Project Detail Modal Overlay */}
      {activeProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveProjectModal(null);
            }
          }}
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center select-text animate-in fade-in duration-200"
        >
          <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-2 border-[var(--border-strong)] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 p-2 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-mono text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer"
            >
              CLOSE [ESC]
            </button>

            <div className="space-y-1 font-mono text-xs">
              <span className="text-[var(--accent)] font-bold">{activeProjectModal.number}</span>
              <span className="text-[var(--text-muted)]">{" // ARCHITECTURAL DOSSIER"}</span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] uppercase">
                {activeProjectModal.title}
              </h3>
              <p className="text-[var(--text-secondary)]">{activeProjectModal.subtitle}</p>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {activeProjectModal.description}
            </p>

            <div className="pt-2 border-t border-[var(--border-color)] space-y-3 font-mono text-xs">
              <span className="text-[var(--accent)] font-bold uppercase tracking-wider block">
                CORE SYSTEM CAPABILITIES:
              </span>
              <ul className="space-y-1.5 text-[var(--text-secondary)]">
                {activeProjectModal.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)]">↳</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeProjectModal.metrics && (
              <div className="pt-2 border-t border-[var(--border-color)] font-mono text-xs">
                <span className="text-[10px] text-[var(--text-muted)] uppercase block mb-2 font-bold tracking-wider">
                  VERIFIED SYSTEM METRICS:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeProjectModal.metrics.map((m, i) => (
                    <div key={i} className="bg-[var(--bg-surface)] p-3 border border-[var(--border-color)]">
                      <span className="text-[9px] text-[var(--text-muted)] uppercase block">
                        {m.label}
                      </span>
                      <span className="text-sm font-bold text-[var(--text-primary)] block mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[var(--border-strong)] flex flex-wrap gap-4 font-mono text-xs">
              {activeProjectModal.liveUrl?.startsWith("http") && (
                <a
                  href={activeProjectModal.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-[var(--text-primary)] hover:bg-[var(--accent)] text-[var(--bg-primary)] hover:text-[#111111] font-bold uppercase tracking-wider"
                >
                  VISIT DEPLOYED APPLICATION ↗
                </a>
              )}
              {activeProjectModal.githubUrl && (
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 border border-[var(--border-strong)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold uppercase tracking-wider"
                >
                  AUDIT SOURCE CODE REPOSITORY ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
