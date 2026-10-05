"use client";

import React, { useEffect, useState, useRef } from "react";
import { useCinematicNavigation } from "@/context/CinematicNavigationContext";
import { animateIndicatorTravel } from "@/animations";

const QUICK_NAV_SECTIONS = [
  { id: "about", num: "01", label: "ABOUT" },
  { id: "experience", num: "02", label: "EXPERIENCE" },
  { id: "projects", num: "03", label: "PROJECTS" },
  { id: "stack", num: "04", label: "SKILLS" },
  { id: "contact", num: "05", label: "CONTACT" },
];

export default function PageProgress() {
  const { activeSection, navigateToSection } = useCinematicNavigation();
  const [scrollProgress, setScrollProgress] = useState(0);

  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Track global vertical scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(
          Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100)))
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section 08 & 23: One animated orange indicator that physically travels between sections
  // Duration: 250-400ms (300ms)
  useEffect(() => {
    const btn = buttonRefs.current[activeSection];
    const indicator = indicatorRef.current;
    const nav = navRef.current;

    if (!indicator || !nav) return;

    if (!btn) {
      // In home/hero section, fade out indicator
      indicator.style.opacity = "0";
      return;
    }

    indicator.style.opacity = "1";
    const targetY = btn.offsetTop + btn.offsetHeight - 2;

    animateIndicatorTravel(indicator, targetY, {
      duration: 300,
    });
  }, [activeSection]);

  return (
    <aside
      aria-label="Right Quick Navigation"
      className="hidden lg:flex fixed right-7 top-1/2 -translate-y-1/2 z-40 flex-col items-end font-mono select-none"
    >
      {/* Editorial Header */}
      <div className="hidden sm:flex items-center gap-1.5 text-[9px] text-[var(--text-muted)] tracking-widest uppercase mb-4 pr-1">
        <span>NAV</span>
        <span className="text-[var(--accent)] font-bold">{"//"}</span>
        <span>INDEX</span>
      </div>

      {/* Vertical Navigation Items (Section 07 & 08) */}
      <div ref={navRef} className="relative flex flex-col items-end gap-4 sm:gap-5 text-right">
        {/* Single Physically Traveling Orange Indicator (Section 08) */}
        <div
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute right-0 top-0 w-5 sm:w-7 h-[2px] bg-[var(--accent)] pointer-events-none will-change-transform opacity-0 transition-opacity duration-200"
          style={{ transformOrigin: "right center" }}
        />

        <nav aria-label="Section Quick Jump" className="flex flex-col items-end gap-3.5 sm:gap-5 text-right">
          {QUICK_NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                ref={(el) => {
                  buttonRefs.current[sec.id] = el;
                }}
                onClick={() => navigateToSection(sec.id)}
                className="group flex flex-col items-end focus:outline-none cursor-pointer text-right transition-transform duration-200 py-0.5 sm:py-0"
                title={`Jump to ${sec.num} / ${sec.label}`}
              >
                {/* Number Row with dynamic hover expansion line */}
                <div className="flex items-center gap-1.5 sm:gap-2 justify-end">
                  <span
                    className={`text-[10px] sm:text-[11px] tracking-wider transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--accent)] font-bold"
                        : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {sec.num}
                  </span>

                  {/* Hover line expansion: 03  ───── */}
                  <span
                    className={`h-[1px] transition-all duration-200 ${
                      isActive
                        ? "w-2.5 sm:w-3 bg-[var(--accent)]"
                        : "w-0 group-hover:w-2.5 sm:group-hover:w-3 bg-[var(--text-muted)]"
                    }`}
                  />
                </div>

                {/* Label Row with subtle horizontal motion: STACK → (Desktop only) */}
                <div
                  className={`hidden lg:flex items-center justify-end gap-1 text-[11px] font-bold tracking-tight transition-all duration-200 ${
                    isActive
                      ? "text-[var(--text-primary)] translate-x-0"
                      : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:-translate-x-1"
                  }`}
                >
                  <span className="group-hover:text-[var(--accent)] transition-colors duration-200">
                    {sec.label}
                  </span>
                  <span
                    className={`text-[10px] text-[var(--accent)] transition-all duration-200 ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  >
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Scroll Percentage Indicator */}
      <div className="mt-5 pt-3 border-t border-[var(--border-color)]/50 flex flex-col items-end pr-1 text-[9px] text-[var(--text-muted)]">
        <span className="font-bold text-[var(--text-primary)]">
          {scrollProgress}%
        </span>
        <span className="text-[8px] uppercase tracking-wider">SCROLL</span>
      </div>
    </aside>
  );
}
