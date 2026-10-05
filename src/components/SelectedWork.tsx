"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS, ProjectItem } from "@/data/portfolioData";
import MobileProjectViewer from "./MobileProjectViewer";
import GitlikeTechnicalVisual from "./GitlikeTechnicalVisual";
import SectionHeader from "./SectionHeader";
import { observeScrollReveal, initMagneticElement } from "@/animations";
import { animate } from "animejs";

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

// Prompt Section 16: Count-up animation for 4,000+ (700-900ms, runs once)
function CountUpNumber({ target = 4000, suffix = "+" }: { target?: number; suffix?: string }) {
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

  // Featured projects: IG App & GitLike ONLY
  const featuredProjects = PROJECTS.filter((p) => p.featured).sort(
    (a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0)
  );

  const igApp = featuredProjects.find((p) => p.id === "ig-app") || PROJECTS[0];
  const gitlike = featuredProjects.find((p) => p.id === "gitlike") || PROJECTS[1];

  const igCardRef = useRef<HTMLElement>(null);
  const igPhoneRef = useRef<HTMLDivElement>(null);
  const igMetaRef = useRef<HTMLDivElement>(null);
  const gitlikeCardRef = useRef<HTMLElement>(null);
  const gitlikeTerminalRef = useRef<HTMLDivElement>(null);
  const gitlikeMetaRef = useRef<HTMLDivElement>(null);

  // Magnetic button effects
  const igLiveBtnRef = useRef<HTMLAnchorElement>(null);
  const igCodeBtnRef = useRef<HTMLAnchorElement>(null);
  const gitCodeBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    if (igLiveBtnRef.current) cleanups.push(initMagneticElement(igLiveBtnRef.current, ".magnetic-target", 6));
    if (igCodeBtnRef.current) cleanups.push(initMagneticElement(igCodeBtnRef.current, ".magnetic-target", 6));
    if (gitCodeBtnRef.current) cleanups.push(initMagneticElement(gitCodeBtnRef.current, ".magnetic-target", 6));
    return () => cleanups.forEach((c) => c());
  }, []);

  // Section 16: IG App Entrance Stagger Sequence
  useEffect(() => {
    if (!igCardRef.current) return;
    const cleanup = observeScrollReveal(
      igCardRef.current,
      () => {
        if (igMetaRef.current) {
          animate(igMetaRef.current, {
            opacity: [0, 1],
            translateY: [25, 0],
            duration: 1250,
            ease: "outCubic",
          } as any);
        }
        if (igPhoneRef.current) {
          animate(igPhoneRef.current, {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1350,
            delay: 200,
            ease: "outCubic",
          } as any);
        }
      },
      { threshold: 0.15 }
    );
    return cleanup;
  }, []);

  // Gitlike Entrance Stagger
  useEffect(() => {
    if (!gitlikeCardRef.current) return;
    const cleanup = observeScrollReveal(
      gitlikeCardRef.current,
      () => {
        if (gitlikeTerminalRef.current) {
          animate(gitlikeTerminalRef.current, {
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 1250,
            ease: "outCubic",
          } as any);
        }
        if (gitlikeMetaRef.current) {
          animate(gitlikeMetaRef.current, {
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
    <section id="projects" className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 scroll-mt-20">
      {/* 03 / PROJECTS Header per Prompt Section 19 */}
      <SectionHeader
        number="03"
        title="PROJECTS"
        tagline="CURATED PRODUCTION BUILDS"
        badge="FEATURED"
      />

      {/* TWO CURATED FEATURED PROJECTS ONLY */}
      <div className="space-y-24 lg:space-y-36">
        {/* ========================================================= */}
        {/* PROJECT 01: IG APP (Product / Mobile / Human) */}
        {/* ========================================================= */}
        <article
          ref={igCardRef}
          id="ig-app"
          data-project-card="true"
          className="group relative border-b border-[var(--border-color)] pb-16 lg:pb-24"
        >
          {/* Top Meta Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)] pb-6 border-b border-[var(--border-color)]/60">
            <div className="flex items-center gap-3">
              <span className="text-[var(--accent)] font-bold">PROJECT_01</span>
              <span className="text-[var(--border-color)]">/</span>
              <span className="tracking-widest uppercase text-[var(--text-primary)] font-semibold">
                SOCIAL APPLICATION
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[var(--text-secondary)]">{igApp.techString}</span>
              <span className="text-[var(--border-color)]">|</span>
              <span className="text-[var(--text-primary)] font-bold">{igApp.year}</span>
            </div>
          </div>

          {/* Main Grid Spread: Text on Left, Phone on Right (Prompt Section 22) */}
          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: IG App Narrative & Prominent User Stats */}
            <div ref={igMetaRef} className="lg:col-span-6 space-y-6">
              {/* Type pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-[11px] border border-[var(--border-color)]">
                <span className="text-[var(--accent)] font-bold">{"//"}</span>
                <span>CROSS-PLATFORM MOBILE</span>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <h3 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter text-[var(--text-primary)] uppercase">
                  {igApp.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[var(--accent)] font-semibold tracking-wider uppercase">
                  {igApp.subtitle}
                </p>
              </div>

              {/* PROMINENT FACT: 4,000+ REAL USERS (Prompt Section 04, 14, 16) */}
              <div className="p-5 sm:p-6 bg-[var(--bg-surface)] border-2 border-[var(--accent)]/40 relative overflow-hidden space-y-1 shadow-lg">
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest font-bold">
                  SCALE & PRODUCTION TRACTION
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[var(--accent)] tracking-tight">
                  <CountUpNumber target={4000} suffix="+" />
                </div>
                <div className="font-display font-bold text-base sm:text-lg tracking-wide uppercase text-[var(--text-primary)]">
                  REAL UNIVERSITY USERS
                </div>
                <p className="font-mono text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  Engineered and deployed as a real product for VNIT&apos;s annual festival, serving 4,000+ students and faculty with live departmental leaderboard updates, competition brackets, and sub-second push notifications.
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {igApp.description}
              </p>

              {/* Compact Technical Specification (Prompt Section 15) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[var(--border-color)]/60 font-mono text-xs">
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">TYPE</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">Mobile App</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">USERS</span>
                  <span className="font-bold text-[var(--accent)] block mt-0.5">4,000+</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">STATUS</span>
                  <span className="font-bold text-[#10B981] block mt-0.5">Live / Active</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">STACK</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">Flutter·Dart</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs text-[var(--text-secondary)]">
                {igApp.highlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">↳</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
                {igApp.liveUrl && (
                  <a
                    ref={igLiveBtnRef}
                    href={igApp.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="LIVE APP ↗"
                    data-magnetic="true"
                    className="editorial-link inline-flex items-center gap-2 px-5 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-bold uppercase tracking-wider transition-colors relative overflow-hidden"
                  >
                    <span className="magnetic-target inline-flex items-center gap-2">
                      <span>VISIT LIVE DEMO</span>
                      <span>─</span>
                      <span>↗</span>
                    </span>
                  </a>
                )}

                {igApp.githubUrl && (
                  <a
                    ref={igCodeBtnRef}
                    href={igApp.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic="true"
                    data-cursor="SOURCE ↗"
                    className="editorial-link inline-flex items-center gap-1.5 px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] transition-colors"
                  >
                    <span className="magnetic-target inline-flex items-center gap-1.5">
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>SOURCE CODE</span>
                      <span>─</span>
                      <span>↗</span>
                    </span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setActiveProjectModal(igApp)}
                  className="px-3 py-3 text-[var(--text-muted)] hover:text-[var(--accent)] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  [ VIEW ARCHITECTURAL DOSSIER ]
                </button>
              </div>
            </div>

            {/* Right Column: Reusable Physical Smartphone Mockup with Horizontal Carousel */}
            <div ref={igPhoneRef} className="lg:col-span-6 flex justify-center lg:justify-end">
              <MobileProjectViewer
                images={
                  igApp.images && igApp.images.length > 0
                    ? igApp.images
                    : ["/images/ig-app.jpg"]
                }
                title={igApp.title}
                userCount={igApp.userCount}
              />
            </div>
          </div>
        </article>

        {/* ========================================================= */}
        {/* PROJECT 02: GITLIKE (Systems / Terminal / Technical) */}
        {/* ========================================================= */}
        <article
          ref={gitlikeCardRef}
          id="gitlike"
          data-project-card="true"
          className="group relative border-b border-[var(--border-color)] pb-16 lg:pb-24"
        >
          {/* Top Meta Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)] pb-6 border-b border-[var(--border-color)]/60">
            <div className="flex items-center gap-3">
              <span className="text-[var(--accent)] font-bold">PROJECT_02</span>
              <span className="text-[var(--border-color)]">/</span>
              <span className="tracking-widest uppercase text-[var(--text-primary)] font-semibold">
                VERSION CONTROL // CLI / SYSTEMS
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[var(--text-secondary)]">{gitlike.techString}</span>
              <span className="text-[var(--border-color)]">|</span>
              <span className="text-[var(--text-primary)] font-bold">{gitlike.year}</span>
            </div>
          </div>

          {/* Main Grid Spread: Reversed Composition! Terminal on Left, Text on Right (Prompt Section 22) */}
          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Systems Architecture & Code Inspector */}
            <div ref={gitlikeTerminalRef} className="lg:col-span-6 order-2 lg:order-1">
              <GitlikeTechnicalVisual />
            </div>

            {/* Right Column: Systems Narrative & Technical Specifications */}
            <div ref={gitlikeMetaRef} className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              {/* Type pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--bg-surface)] text-[var(--text-primary)] font-mono text-[11px] border border-[var(--border-color)]">
                <span className="text-[var(--accent)] font-bold">{"//"}</span>
                <span>CONTENT-ADDRESSABLE STORAGE ENGINE</span>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <h3 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl tracking-tighter text-[var(--text-primary)] uppercase">
                  {gitlike.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[var(--accent)] font-semibold tracking-wider uppercase">
                  {gitlike.subtitle}
                </p>
              </div>

              {/* Tagline */}
              <p className="font-mono text-xs sm:text-sm text-[var(--text-primary)] font-bold tracking-wide uppercase border-l-2 border-[var(--accent)] pl-3">
                {gitlike.tagline}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {gitlike.description}
              </p>

              {/* Compact Technical Specification */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[var(--border-color)]/60 font-mono text-xs">
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">TYPE</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">Systems CLI</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">STORAGE</span>
                  <span className="font-bold text-[var(--text-primary)] block mt-0.5">Zlib Blobs</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">CRYPTO</span>
                  <span className="font-bold text-[var(--accent)] block mt-0.5">SHA-1 Direct</span>
                </div>
                <div className="bg-[var(--bg-surface)] p-2.5 border border-[var(--border-color)]">
                  <span className="text-[9px] text-[var(--text-muted)] block uppercase">STATUS</span>
                  <span className="font-bold text-[#10B981] block mt-0.5">Production</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]/60 font-mono text-xs text-[var(--text-secondary)]">
                {gitlike.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">↳</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
                {gitlike.githubUrl && (
                  <a
                    ref={gitCodeBtnRef}
                    href={gitlike.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic="true"
                    data-cursor="SOURCE ↗"
                    className="editorial-link inline-flex items-center gap-2 px-5 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-bold uppercase tracking-wider transition-colors relative overflow-hidden"
                  >
                    <span className="magnetic-target inline-flex items-center gap-2">
                      <GithubIcon className="w-4 h-4" />
                      <span>AUDIT VCS SOURCE</span>
                      <span>─</span>
                      <span>↗</span>
                    </span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setActiveProjectModal(gitlike)}
                  className="px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  VIEW DOSSIER ↗
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* ========================================================= */}
      {/* VIEW ALL PROJECTS CTA */}
      {/* ========================================================= */}
      <div className="mt-16 lg:mt-24 pt-12 border-t-2 border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-mono text-xs">
        <div>
          <span className="text-[var(--accent)] font-bold block uppercase tracking-wider text-[11px]">
            ARCHIVE // 07 TOTAL PROJECTS
          </span>
          <span className="text-[var(--text-secondary)] text-xs mt-1 block">
            C++ Optics · WebSockets · Systems CLI · Mobile · Academic Platforms
          </span>
        </div>

        <Link
          href="/projects"
          data-cursor="OPEN ARCHIVE"
          className="view-all-projects-cta group inline-flex items-center gap-3 px-6 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-bold text-xs uppercase tracking-wider transition-colors duration-200 self-start sm:self-auto shadow-md"
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
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center select-text"
        >
          <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-2 border-[var(--border-strong)] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative space-y-6 shadow-2xl">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 p-2 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-mono text-xs font-bold transition-colors cursor-pointer"
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
                <div className="grid grid-cols-3 gap-3">
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
