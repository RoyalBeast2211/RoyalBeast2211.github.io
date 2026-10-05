"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import SectionHeader from "./SectionHeader";
import {
  SKILL_CATEGORIES,
  SkillItem,
} from "@/data/skillsData";
import { observeScrollReveal, EASES, prefersReducedMotion } from "@/animations";
import { animate } from "animejs";

export default function StackSection() {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);
  const [hoveredCategoryNum, setHoveredCategoryNum] = useState<string | null>(null);
  const [mobileActiveSkill, setMobileActiveSkill] = useState<SkillItem | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);
  const inspectorContentRef = useRef<HTMLDivElement>(null);
  const prevActiveSkillRef = useRef<string | null>(null);

  // Sync active technology with document attribute for subtle project response (Section 13)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const currentName = activeSkill?.name || mobileActiveSkill?.name;
    if (currentName) {
      document.documentElement.setAttribute("data-active-tech", currentName);
    } else {
      document.documentElement.removeAttribute("data-active-tech");
    }
    return () => {
      document.documentElement.removeAttribute("data-active-tech");
    };
  }, [activeSkill, mobileActiveSkill]);

  // Section 17 & 18: Section Entry Animation
  // Sequence: 04 / SKILLS -> Category dividers draw -> Skills stagger in
  useEffect(() => {
    if (!containerRef.current) return;

    const cleanup = observeScrollReveal(
      containerRef.current,
      () => {
        if (prefersReducedMotion()) return;

        // Draw category lines left -> right (Section 18)
        const lines = containerRef.current
          ? Array.from(containerRef.current.querySelectorAll<HTMLElement>("[data-cat-line]"))
          : [];
        if (lines.length > 0) {
          lines.forEach((line) => {
            line.style.transformOrigin = "left center";
          });
          animate(lines as any, {
            scaleX: [0, 1],
            opacity: [0, 1],
            duration: 850,
            delay: (_el: any, i: number) => 150 + i * 90,
            ease: EASES.brutal,
          } as any);
        }

        // Stagger individual skills reveal (Section 17: translateY 10-15px, opacity 0 -> 1, stagger 30-50ms)
        const skillItems = containerRef.current
          ? Array.from(containerRef.current.querySelectorAll<HTMLElement>("[data-skill-item]"))
          : [];
        if (skillItems.length > 0) {
          animate(skillItems as any, {
            translateY: [12, 0],
            opacity: [0, 1],
            duration: 750,
            delay: (_el: any, i: number) => 220 + i * 45,
            ease: "outCubic",
          } as any);
        }
      },
      { threshold: 0.1 }
    );

    return cleanup;
  }, []);

  // Section 09, 20, 21: Inspector sliding entry and smooth horizontal content transition
  useEffect(() => {
    if (!inspectorRef.current) return;

    if (!activeSkill) {
      prevActiveSkillRef.current = null;
      return;
    }

    if (prefersReducedMotion()) {
      inspectorRef.current.style.opacity = "1";
      inspectorRef.current.style.transform = "none";
      return;
    }

    if (!prevActiveSkillRef.current) {
      // First skill hovered: slide in from right (Section 09: opacity 0 -> 1, translateX 30px -> 0)
      animate(inspectorRef.current as any, {
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 520,
        ease: "outCubic",
      } as any);
    } else if (inspectorContentRef.current) {
      // Moving between skills: smooth horizontal transition (Section 20 & 21: 200-260ms)
      animate(inspectorContentRef.current as any, {
        opacity: [0.35, 1],
        translateX: [14, 0],
        duration: 440,
        ease: "outCubic",
      } as any);
    }

    prevActiveSkillRef.current = activeSkill.name;
  }, [activeSkill]);

  // Section 23: Keyboard Accessibility (Tab, Enter, Space, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveSkill(null);
        setMobileActiveSkill(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSkillHover = useCallback((skill: SkillItem) => {
    setActiveSkill(skill);
  }, []);

  const handleSkillsMouseLeave = useCallback(() => {
    setActiveSkill(null);
  }, []);

  const handleSkillClick = useCallback((skill: SkillItem) => {
    // Touch/mobile toggle (Section 22 & 24)
    setMobileActiveSkill((prev) => (prev?.name === skill.name ? null : skill));
  }, []);

  const currentHoveredName = activeSkill?.name;
  const activeCategoryNum = activeSkill?.categoryNum || mobileActiveSkill?.categoryNum || hoveredCategoryNum;

  return (
    <section
      ref={containerRef}
      id="stack"
      className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 pb-28 scroll-mt-20"
    >
      {/* 04 / SKILLS Technical Section Divider */}
      <SectionHeader
        number="04"
        title="SKILLS"
      />

      {/* Main Editorial Skill Index Layout */}
      <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Editorial Typographic Categories */}
        <div
          onMouseLeave={handleSkillsMouseLeave}
          className="lg:col-span-7 xl:col-span-8 space-y-12"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const isCategoryActive = activeCategoryNum === cat.num;

            return (
              <div key={cat.num} className="space-y-4">
                {/* Category Header with Section 16 Focus Behavior */}
                <div
                  onMouseEnter={() => setHoveredCategoryNum(cat.num)}
                  onMouseLeave={() => setHoveredCategoryNum(null)}
                  className="flex items-baseline gap-3 pb-2 border-b border-[var(--border-color)]/60 select-none cursor-default group/cat"
                >
                  {/* Subtle Skill Index Number */}
                  <span
                    className={`font-mono text-xs font-bold transition-colors duration-200 ${
                      isCategoryActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] group-hover/cat:text-[var(--accent)]"
                    }`}
                  >
                    {cat.num}
                  </span>

                  {/* Monospace Metadata Label */}
                  <span
                    className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                      isCategoryActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] group-hover/cat:text-[var(--text-primary)]"
                    }`}
                  >
                    / {cat.title}
                  </span>

                  {/* Category Horizontal Rule (Section 18) */}
                  <div
                    data-cat-line="true"
                    className="flex-1 h-[1px] bg-[var(--border-color)]/40 ml-2 will-change-transform origin-left"
                  />
                </div>

                {/* Editorial Typography Skills (Section 03, 04, 05, 06, 07, 08, 11) */}
                <div className="flex flex-wrap items-baseline gap-x-6 sm:gap-x-8 gap-y-4 pt-2 pb-2">
                  {cat.skills.map((skill) => {
                    const isSelectedDesktop = currentHoveredName === skill.name;
                    const isSelectedMobile = mobileActiveSkill?.name === skill.name;
                    const isSelected = isSelectedDesktop || isSelectedMobile;
                    const isOtherMuted = currentHoveredName !== undefined && currentHoveredName !== null && !isSelectedDesktop;
                    const isCategoryHighlighted = hoveredCategoryNum === cat.num && !currentHoveredName;

                    return (
                      <button
                        key={skill.name}
                        data-skill-item="true"
                        onMouseEnter={() => handleSkillHover(skill)}
                        onFocus={() => handleSkillHover(skill)}
                        onClick={() => handleSkillClick(skill)}
                        className={`group text-left relative focus:outline-none cursor-pointer transition-all duration-200 select-none ${
                          isSelected
                            ? "translate-x-2 text-[var(--text-primary)]"
                            : isOtherMuted
                            ? "opacity-40 text-[var(--text-secondary)] hover:opacity-100 hover:text-[var(--text-primary)]"
                            : isCategoryHighlighted
                            ? "opacity-100 text-[var(--text-primary)]"
                            : "opacity-100 text-[var(--text-primary)]"
                        }`}
                        title={`Inspect ${skill.name} capabilities`}
                      >
                        {/* Selected Skill Typography with Subtle Scale (Section 08: 1.0 -> 1.06) */}
                        <span
                          className={`inline-block font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight transition-all duration-200 origin-left ${
                            isSelected
                              ? "text-[var(--accent)] scale-[1.06]"
                              : "text-[var(--text-primary)] group-hover:text-[var(--accent)]"
                          }`}
                        >
                          {skill.name}
                        </span>

                        {/* Thin Orange Accent Line (Section 07: animates from width 0 to ~30-60px) */}
                        <span
                          className={`block h-[2px] bg-[var(--accent)] transition-all duration-200 mt-1 origin-left ${
                            isSelected ? "w-10 sm:w-12 opacity-100" : "w-0 opacity-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Section 22: Mobile Inline Focused Inspector */}
                {mobileActiveSkill && mobileActiveSkill.categoryNum === cat.num && (
                  <div className="block lg:hidden mt-4 p-5 sm:p-6 border-2 border-[var(--border-strong)] bg-[var(--bg-surface)] font-mono space-y-5 animate-in fade-in slide-in-from-top-2 duration-200 select-none shadow-xl">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] tracking-widest uppercase mb-1">
                        <span>{mobileActiveSkill.categoryLabel}</span>
                        <button
                          onClick={() => setMobileActiveSkill(null)}
                          className="text-[10px] text-[var(--accent)] hover:underline font-bold"
                        >
                          [CLOSE ✕]
                        </button>
                      </div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] uppercase tracking-tight">
                        {mobileActiveSkill.name}
                      </h3>
                      <div className="h-[1px] w-full bg-[var(--border-color)] mt-2" />
                    </div>

                    {/* Capabilities */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-[var(--text-muted)] tracking-widest uppercase block font-semibold">
                        CAPABILITIES
                      </span>
                      <div className="space-y-1 text-xs text-[var(--text-primary)]">
                        {mobileActiveSkill.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2">
                            <span className="text-[var(--accent)] font-bold select-none">─</span>
                            <span className="font-semibold tracking-wide">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Evidence */}
                    <div className="space-y-2 pt-3 border-t border-[var(--border-color)]/60">
                      <span className="text-[10px] text-[var(--text-muted)] tracking-widest uppercase block font-semibold">
                        USED IN
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {mobileActiveSkill.projects.map((proj) => {
                          const isExternal = proj.href.startsWith("http");
                          return (
                            <a
                              key={proj.title}
                              href={proj.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noopener noreferrer" : undefined}
                              className="flex items-center justify-between py-2 px-3 bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs"
                            >
                              <span className="font-bold uppercase tracking-wide text-[var(--text-primary)]">
                                {proj.title}
                              </span>
                              <span className="text-[10px] text-[var(--accent)] font-bold">
                                {isExternal ? "VISIT ↗" : "INSPECT →"}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Related Stack Line */}
                    {mobileActiveSkill.related.length > 0 && (
                      <div className="pt-2 border-t border-[var(--border-color)]/60 flex items-baseline gap-2 text-[10px]">
                        <span className="text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                          RELATED:
                        </span>
                        <span className="text-[var(--text-secondary)] font-mono">
                          {mobileActiveSkill.related.join(" · ")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Desktop Focused Skill Inspector (Section 09, 10, 11, 15, 20, 21) */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
          <div className="sticky top-28">
            {activeSkill ? (
              <div
                ref={inspectorRef}
                className="p-6 sm:p-7 border-2 border-[var(--border-strong)] bg-[var(--bg-surface)] font-mono space-y-6 select-none shadow-2xl will-change-transform"
              >
                <div ref={inspectorContentRef} className="space-y-6">
                  {/* Skill Title & Category (Section 10) */}
                  <div>
                    <h3 className="font-display font-black text-3xl xl:text-4xl text-[var(--text-primary)] uppercase tracking-tight">
                      {activeSkill.name}
                    </h3>
                    <div className="mt-1 text-xs text-[var(--text-muted)] tracking-widest uppercase font-semibold">
                      {activeSkill.categoryLabel}
                    </div>
                    <div className="h-[1px] w-full bg-[var(--border-color)] mt-3" />
                  </div>

                  {/* Level 1: CAPABILITIES (What the skill enables) */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-[var(--text-muted)] tracking-widest uppercase block font-semibold">
                      CAPABILITIES
                    </span>
                    <div className="space-y-1.5 text-xs text-[var(--text-primary)]">
                      {activeSkill.capabilities.map((cap) => (
                        <div key={cap} className="flex items-start gap-2.5">
                          <span className="text-[var(--accent)] font-bold select-none">─</span>
                          <span className="font-semibold tracking-wide">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Level 2: PROJECT EVIDENCE (USED IN) */}
                  <div className="space-y-2 pt-4 border-t border-[var(--border-color)]/60">
                    <span className="text-[10px] text-[var(--text-muted)] tracking-widest uppercase block font-semibold">
                      USED IN
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {activeSkill.projects.map((proj) => {
                        const isExternal = proj.href.startsWith("http");
                        return (
                          <a
                            key={proj.title}
                            href={proj.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="group/proj flex items-center justify-between py-2 px-3 bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent)] transition-all text-xs"
                          >
                            <span className="font-bold uppercase tracking-wide text-[var(--text-primary)] group-hover/proj:text-[var(--accent)] transition-colors">
                              {proj.title}
                            </span>
                            <span className="text-[10px] text-[var(--accent)] opacity-60 group-hover/proj:opacity-100 group-hover/proj:translate-x-1 transition-all font-bold">
                              {isExternal ? "VISIT ↗" : "INSPECT →"}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Level 3: RELATED SKILLS (Section 12) */}
                  {activeSkill.related.length > 0 && (
                    <div className="pt-3 border-t border-[var(--border-color)]/60 flex items-baseline gap-2 text-[10px]">
                      <span className="text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                        RELATED:
                      </span>
                      <span className="text-[var(--text-secondary)] font-mono">
                        {activeSkill.related.join(" · ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Section 15: Quiet Minimal Empty State */
              <div className="py-24 px-6 border border-[var(--border-color)]/40 bg-[var(--bg-surface)]/20 flex flex-col items-center justify-center text-center font-mono select-none">
                <span className="text-[10px] text-[var(--text-muted)] tracking-widest uppercase opacity-60">
                  HOVER A SKILL
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
