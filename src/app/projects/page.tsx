"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PROJECTS, ProjectItem, ProjectCategory } from "@/data/portfolioData";
import MobileProjectViewer from "@/components/MobileProjectViewer";
import DesktopBrowserViewer from "@/components/DesktopBrowserViewer";
import GitlikeTechnicalVisual from "@/components/GitlikeTechnicalVisual";
import InteractiveSortingVisualizer from "@/components/InteractiveSortingVisualizer";
import ThemeToggle from "@/components/ThemeToggle";
import CustomCursor from "@/components/CustomCursor";
import { animate } from "animejs";
import { EASES, prefersReducedMotion } from "@/animations";

const CATEGORIES: ProjectCategory[] = ["ALL", "WEB", "MOBILE", "CLI", "SYSTEMS", "EXPERIMENTS"];

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

export default function ProjectsArchivePage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("ALL");
  const [activeModalProject, setActiveModalProject] = useState<(ProjectItem & { archiveNumber?: string }) | null>(null);
  const [, startTransition] = useTransition();

  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Archive ordering: Fresh unseen projects first, then already-seen featured projects (IG App, GitLike) last
  const orderedArchiveProjects = React.useMemo(() => {
    const seenIds = ["ig-app", "gitlike"];
    const unseen = PROJECTS.filter((p) => !seenIds.includes(p.id));
    const seen = PROJECTS.filter((p) => seenIds.includes(p.id));

    // Curated flow for unseen: Algolizer flagship first, then systems, web, and mobile
    const preferredOrder = [
      "algolizer",
      "raytracer",
      "chatty",
      "vnit-directory",
      "ieee-conference",
    ];

    unseen.sort((a, b) => {
      const idxA = preferredOrder.indexOf(a.id);
      const idxB = preferredOrder.indexOf(b.id);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });

    const combined = [...unseen, ...seen];
    return combined.map((proj, idx) => ({
      ...proj,
      archiveNumber: `PROJECT_${String(idx + 1).padStart(2, "0")}`,
    }));
  }, []);

  // Filter projects based on activeCategory
  const filteredProjects = orderedArchiveProjects.filter((p) => {
    if (activeCategory === "ALL") return true;
    if (activeCategory === "CLI") return p.category === "CLI" || p.id === "gitlike";
    if (activeCategory === "SYSTEMS")
      return p.category === "SYSTEMS" || p.id === "gitlike" || p.id === "raytracer";
    if (activeCategory === "MOBILE") return p.category === "MOBILE";
    if (activeCategory === "WEB") return p.category === "WEB";
    if (activeCategory === "EXPERIMENTS")
      return p.category === "EXPERIMENTS" || p.id === "algolizer" || p.id === "raytracer";
    return p.category === activeCategory;
  });

  // Filter transition with Anime.js (Prompt Section 33: 300-500ms)
  const handleCategoryChange = (cat: ProjectCategory) => {
    if (cat === activeCategory) return;

    if (gridContainerRef.current && !prefersReducedMotion()) {
      // Step 1: Fade slightly out
      animate(gridContainerRef.current, {
        opacity: [1, 0.4],
        translateY: [0, 8],
        duration: 160,
        ease: EASES.precise,
        onComplete: () => {
          startTransition(() => {
            setActiveCategory(cat);
          });
        },
      } as any);
    } else {
      setActiveCategory(cat);
    }
  };

  // Re-animate grid when filtered items update
  useEffect(() => {
    if (gridContainerRef.current && !prefersReducedMotion()) {
      animate(gridContainerRef.current, {
        opacity: [0.4, 1],
        translateY: [8, 0],
        duration: 320,
        ease: EASES.snap,
      } as any);
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-[var(--bg-primary)]">
      {/* Desktop Custom Contextual Cursor */}
      <CustomCursor />

      {/* Top Minimal Archive Header */}
      <header className="sticky top-0 z-40 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)]">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between font-mono text-xs">
          {/* Back to Home Link */}
          <Link
            href="/"
            data-cursor="HOME ↖"
            className="group flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO MAIN</span>
            <span className="text-[var(--text-muted)] font-normal hidden sm:inline">{"// INDEX"}</span>
          </Link>

          {/* Central Monospace Badge */}
          <div className="hidden md:flex items-center gap-2 text-[var(--text-muted)] text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-semibold text-[var(--text-primary)]">OMKAR MORE</span>
            <span>·</span>
            <span>COMPLETE PROJECT ARCHIVE</span>
          </div>

          {/* Theme Toggle & Status */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[var(--text-muted)] hidden lg:inline">
              07+ REGISTERED BUILDS
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 lg:py-24 space-y-12 lg:space-y-16">
        {/* ========================================================= */}
        {/* 26. PROJECT ARCHIVE HERO */}
        {/* ========================================================= */}
        <section className="space-y-6 border-b border-[var(--border-color)] pb-10 sm:pb-12">
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
            <span>INDEX // 01 — FULL ARCHIVE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
              <h1 className="font-display font-black text-4xl sm:text-7xl lg:text-8xl tracking-tighter uppercase text-[var(--text-primary)] leading-[0.9]">
                PROJECT ARCHIVE
              </h1>
              <p className="font-display font-bold text-xl sm:text-3xl text-[var(--text-secondary)] uppercase tracking-tight">
                SELECTED EXPERIMENTS,
                <br />
                PRODUCTS &amp; BUILDS.
              </p>
            </div>

            {/* Hero Small Metadata (Prompt Section 26) */}
            <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-xs space-y-1.5 shrink-0 max-w-sm">
              <div className="flex items-center justify-between text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-wider">
                <span>CATALOG INDEX</span>
                <span className="text-[var(--accent)]">ACTIVE REPO</span>
              </div>
              <div className="font-display font-extrabold text-2xl text-[var(--text-primary)]">
                07+ PROJECTS
              </div>
              <div className="text-[11px] text-[var(--text-secondary)] tracking-wider uppercase font-semibold">
                WEB · MOBILE · SYSTEMS · EXPERIMENTS
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 33. PROJECT ARCHIVE FILTERING */}
          {/* ========================================================= */}
          <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mr-2 font-bold w-full sm:w-auto mb-1 sm:mb-0">
              FILTER BY CATEGORY:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    data-cursor={cat}
                    className={`min-h-[40px] px-3.5 py-2 transition-all duration-200 uppercase font-bold tracking-wider cursor-pointer border ${
                      isActive
                        ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-sm"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 27. ARCHIVE EDITORIAL PROJECT GRID (Intentional Asymmetry) */}
        {/* ========================================================= */}
        <section ref={gridContainerRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {filteredProjects.map((project) => {
            // Intentional asymmetric column spans:
            // Flagships (IG App, GitLike, Algolizer) span full width (12 cols)
            // Raytracer & Chatty span 6 cols each
            // TeleDir & IEEE SeFet span 6 cols each
            const isFlagship = project.id === "ig-app" || project.id === "gitlike" || project.id === "algolizer";
            const colSpan = isFlagship ? "md:col-span-12" : "md:col-span-6";

            return (
              <article
                key={project.id}
                id={`archive-${project.id}`}
                className={`${colSpan} group relative bg-[var(--bg-surface)]/40 border border-[var(--border-color)] p-4 sm:p-8 flex flex-col justify-between hover:border-[var(--accent)] transition-colors duration-300 shadow-sm`}
              >
                {/* Top Meta Line: Monospace Category & Year (Prompt Section 28) */}
                <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] pb-4 border-b border-[var(--border-color)]/60">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent)] font-bold">{project.archiveNumber || project.number}</span>
                    <span className="text-[var(--border-color)]">/</span>
                    {/* Monospace tiny label without colorful badge */}
                    <span className="text-[11px] font-semibold text-[var(--text-primary)] tracking-widest uppercase">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {(project.id === "ig-app" || project.id === "gitlike") && (
                      <span className="text-[10px] text-[var(--accent)] font-mono font-bold uppercase tracking-wider hidden sm:inline">
                        [FEATURED ON HOME]
                      </span>
                    )}
                    <span className="text-[var(--text-secondary)] text-[11px]">{project.year}</span>
                    {project.status && (
                      <span className="text-[10px] text-[#10B981] font-bold uppercase hidden sm:inline">
                        [{project.status}]
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Center: Visual Mockup based on Project Frame Type (Prompt Section 31 & 32) */}
                <div className="my-6">
                  {project.id === "algolizer" ? (
                    // Algolizer: Live Interactive Visualizer directly (simple & responsive)
                    <div className="py-2">
                      <InteractiveSortingVisualizer />
                    </div>
                  ) : project.frameType === "phone" ? (
                    // Mobile Projects use Reusable Phone Frame (IG App & TeleDir)
                    <div className="flex justify-center py-4 bg-[var(--bg-primary)]/40 border border-[var(--border-color)]/40 rounded-sm">
                      <MobileProjectViewer
                        images={
                          project.images && project.images.length > 0
                            ? project.images
                            : project.image
                            ? [project.image]
                            : ["/images/ig-app.jpg"]
                        }
                        captions={project.captions}
                        title={project.title}
                        userCount={project.userCount}
                      />
                    </div>
                  ) : project.frameType === "terminal" ? (
                    // CLI / Systems Projects use Technical Visual Frame (GitLike)
                    <div className="py-2">
                      <GitlikeTechnicalVisual />
                    </div>
                  ) : (
                    // Web & Graphics Projects use Desktop Browser Frame (Chatty, Raytracer, IEEE)
                    <div className="py-2">
                      <DesktopBrowserViewer
                        url={project.liveUrl?.startsWith("http") ? project.liveUrl : `https://${project.id}.vnit.ac.in`}
                        title={project.title}
                        image={project.image}
                        images={project.images}
                        captions={project.captions}
                        onOpenModal={() => setActiveModalProject(project)}
                      />
                    </div>
                  )}
                </div>

                {/* Card Bottom: Editorial Information & Actions */}
                <div className="space-y-4 pt-4 border-t border-[var(--border-color)]/60">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-[var(--text-primary)] tracking-tight">
                        {project.title}
                      </h2>
                      {project.userCount && (
                        <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-wider">
                          {project.userCount} USERS
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-[var(--accent)] font-semibold tracking-wider uppercase">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1 font-mono text-[11px] text-[var(--text-secondary)]">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[var(--accent)] font-bold">↳</span>
                        <span className="line-clamp-2">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Buttons */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs border-t border-[var(--border-color)]/40">
                    <div className="flex items-center gap-3">
                      {project.liveUrl?.startsWith("http") && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-black font-bold uppercase transition-colors"
                        >
                          <span>LIVE DEMO</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 border border-[var(--border-color)] hover:border-[var(--text-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>CODE</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="text-[11px] text-[var(--text-muted)] hover:text-[var(--accent)] underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      [ FULL DOSSIER ]
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* ========================================================= */}
        {/* Footer Navigation Back to Main */}
        {/* ========================================================= */}
        <section className="pt-16 border-t-2 border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-black font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO HOME PAGE</span>
          </Link>

          <div className="text-[var(--text-muted)] text-[11px]">
            OMKAR MORE ARCHIVE // LICENSED UNDER MIT // {new Date().getFullYear()}
          </div>
        </section>
      </main>

      {/* Project Detail Modal Overlay */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center select-text"
        >
          <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-2 border-[var(--border-strong)] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative space-y-6 shadow-2xl">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#111111] font-mono text-xs font-bold transition-colors cursor-pointer"
            >
              CLOSE [ESC]
            </button>

            <div className="space-y-1 font-mono text-xs">
              <span className="text-[var(--accent)] font-bold">{activeModalProject.archiveNumber || activeModalProject.number}</span>
              <span className="text-[var(--text-muted)]">{" // ARCHITECTURAL DOSSIER"}</span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] uppercase">
                {activeModalProject.title}
              </h3>
              <p className="text-[var(--text-secondary)]">{activeModalProject.subtitle}</p>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {activeModalProject.description}
            </p>

            <div className="pt-2 border-t border-[var(--border-color)] space-y-3 font-mono text-xs">
              <span className="text-[var(--accent)] font-bold uppercase tracking-wider block">
                CORE SYSTEM CAPABILITIES:
              </span>
              <ul className="space-y-1.5 text-[var(--text-secondary)]">
                {activeModalProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent)]">↳</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeModalProject.metrics && (
              <div className="pt-2 border-t border-[var(--border-color)] font-mono text-xs">
                <span className="text-[10px] text-[var(--text-muted)] uppercase block mb-2 font-bold tracking-wider">
                  VERIFIED SYSTEM METRICS:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {activeModalProject.metrics.map((m, i) => (
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
              {activeModalProject.liveUrl?.startsWith("http") && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-[var(--text-primary)] hover:bg-[var(--accent)] text-[var(--bg-primary)] hover:text-[#111111] font-bold uppercase tracking-wider"
                >
                  VISIT DEPLOYED APPLICATION ↗
                </a>
              )}
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
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
    </div>
  );
}
