"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { SECTIONS, useCinematicNavigation } from "@/context/CinematicNavigationContext";
import { useTheme } from "@/context/ThemeContext";
import { animate } from "animejs";
import { prefersReducedMotion } from "@/animations";

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const { activeSection, navigateToSection } = useCinematicNavigation();
  const { resolvedTheme, setTheme } = useTheme();

  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  // Live IST Clock for editorial bottom bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(istString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Anime.js entrance animation when menu opens (Prompt Section 10: 300-500ms)
  useEffect(() => {
    if (!menuOpen || !menuOverlayRef.current) return;

    if (prefersReducedMotion()) {
      menuOverlayRef.current.style.opacity = "1";
      return;
    }

    // Panel expands / fades in
    animate(menuOverlayRef.current, {
      opacity: [0, 1],
      duration: 250,
      ease: "easeOutQuad",
    } as any);

    // Menu items reveal sequentially
    if (menuItemsRef.current) {
      const items = menuItemsRef.current.querySelectorAll("[data-menu-item='true']");
      animate(Array.from(items) as any, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 320,
        delay: (_el: any, i: number) => 60 + i * 45,
        ease: "easeOutQuad",
      } as any);
    }
  }, [menuOpen]);

  const handleNavigate = (targetId: string) => {
    if (prefersReducedMotion() || !menuOverlayRef.current) {
      setMenuOpen(false);
      navigateToSection(targetId);
      return;
    }

    // Animate closing before executing jump
    animate(menuOverlayRef.current, {
      opacity: [1, 0],
      duration: 200,
      ease: "easeInQuad",
      onComplete: () => {
        setMenuOpen(false);
        navigateToSection(targetId);
      },
    } as any);
  };

  const activeMeta = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <>
      {/* Fixed Mobile Top Navigation Bar (Prompt Section 08) */}
      <header
        aria-label="Mobile Navigation"
        className="fixed top-0 left-0 right-0 z-40 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)] block lg:hidden select-none"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="h-13 px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Left */}
          <button
            type="button"
            onClick={() => handleNavigate("about")}
            className="flex items-center gap-1.5 font-display font-black text-sm tracking-tight text-[var(--text-primary)] cursor-pointer py-2 focus:outline-none"
            title="Return to Chapter 01 (About)"
          >
            <span className="font-mono text-xs text-[var(--accent)] font-bold">{"//"}</span>
            <span>OMKAR MORE</span>
          </button>

          {/* Right Controls: Chapter indicator + Quick theme toggle + Hamburger trigger */}
          <div className="flex items-center gap-2">
            {/* Active Chapter Indicator */}
            <div className="font-mono text-[11px] font-bold px-2 py-1 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)]">
              <span className="text-[var(--accent)]">{activeMeta.num}</span>
              <span className="text-[var(--border-color)] mx-1">/</span>
              <span>05</span>
            </div>

            {/* Quick 1-Tap Theme Toggle with 44px Touch Target */}
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-10 h-10 min-w-[40px] flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] cursor-pointer focus:outline-none"
              title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-[var(--accent)]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--text-primary)]" />
              )}
            </button>

            {/* Hamburger / Menu Trigger (44px+ touch area) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 min-w-[40px] flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] cursor-pointer focus:outline-none"
              aria-label={menuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Menu Overlay (Prompt Section 09, 10, 11) */}
      {menuOpen && (
        <div
          ref={menuOverlayRef}
          className="fixed inset-0 z-50 bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between overflow-y-auto block lg:hidden select-none"
          style={{
            paddingTop: "calc(env(safe-area-inset-top, 0px) + 1rem)",
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)",
            paddingLeft: "max(env(safe-area-inset-left, 0px), 1.25rem)",
            paddingRight: "max(env(safe-area-inset-right, 0px), 1.25rem)",
          }}
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[var(--accent)] font-bold">{"//"}</span>
              <span className="text-[var(--text-primary)] font-bold tracking-wider uppercase">
                INDEX // CHAPTERS
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 px-3 py-2 border border-[var(--border-color)] bg-[var(--bg-surface)] font-mono text-xs text-[var(--text-primary)] hover:border-[var(--accent)] cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-4 h-4 text-[var(--accent)]" />
              <span className="font-bold">CLOSE</span>
            </button>
          </div>

          {/* Central Editorial Navigation List */}
          <div ref={menuItemsRef} className="py-8 my-auto space-y-2">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  data-menu-item="true"
                  onClick={() => handleNavigate(sec.id)}
                  className="group flex items-baseline justify-between w-full py-3.5 border-b border-[var(--border-color)] text-left cursor-pointer min-h-[52px] focus:outline-none"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {sec.num}
                    </span>
                    <span
                      className={`font-display font-black text-3xl sm:text-4xl uppercase tracking-tight transition-colors ${
                        isActive
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-primary)] group-hover:text-[var(--accent)]"
                      }`}
                    >
                      {sec.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isActive ? (
                      <span className="font-mono text-[11px] font-bold text-[var(--accent)] tracking-wider">
                        [CURRENT]
                      </span>
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Area: Environment & Live Details & Resume Action */}
          <div className="space-y-4 pt-4 border-t border-[var(--border-color)] font-mono text-xs">
            {/* Live IST Status & Coordinates */}
            <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>ONLINE · VNIT NAGPUR</span>
              </span>
              <span className="text-[var(--accent)] font-bold">{currentTime} IST</span>
            </div>

            {/* View Resume Action with 44px+ height */}
            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="w-full min-h-[44px] py-3 bg-[var(--text-primary)] hover:bg-[var(--accent)] text-[var(--bg-primary)] hover:text-[#111111] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs"
            >
              <span>VIEW RESUME</span>
              <span>─</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
