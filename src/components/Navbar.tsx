"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import ThemeToggle from "@/components/ThemeToggle";
import { useCinematicNavigation } from "@/context/CinematicNavigationContext";
import { animate } from "animejs";
import { EASES, prefersReducedMotion } from "@/animations";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { activeSection, navigateToSection } = useCinematicNavigation();
  const logoRef = useRef<HTMLAnchorElement>(null);

  // Logo entrance
  useEffect(() => {
    if (!logoRef.current) return;
    if (prefersReducedMotion()) {
      logoRef.current.style.opacity = "1";
      return;
    }

    animate(logoRef.current as any, {
      opacity: [0, 1],
      translateY: [-6, 0],
      duration: 320,
      delay: 100,
      ease: EASES.snap,
    } as any);
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5 Chapter Navigation strictly matching Section 12
  const navLinks = [
    { num: "01", label: "ABOUT", href: "#about", id: "about" },
    { num: "02", label: "EXPERIENCE", href: "#experience", id: "experience" },
    { num: "03", label: "PROJECTS", href: "#projects", id: "projects" },
    { num: "04", label: "STACK", href: "#stack", id: "stack" },
    { num: "05", label: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-200 border-b border-[var(--border-color)] ${
          isScrolled
            ? "bg-[var(--header-bg)] backdrop-blur-md shadow-xs"
            : "bg-[var(--bg-primary)]"
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Brand Left */}
          <div className="flex items-center gap-4">
            <a
              ref={logoRef}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection("about");
              }}
              className="group flex items-baseline gap-2 text-sm sm:text-base font-bold tracking-tight font-display text-[var(--text-primary)] cursor-pointer will-change-transform"
              title="Return to Chapter 01 (About)"
            >
              <span className="font-mono text-xs sm:text-sm text-[var(--accent)] group-hover:translate-x-0.5 transition-transform">
                {"//"}
              </span>
              <span className="hidden sm:inline">OMKAR MORE</span>
              <span className="sm:hidden font-mono font-bold tracking-widest">OM</span>
              <span className="hidden md:inline text-xs font-mono text-[var(--text-muted)] font-normal">
                [SWE]
              </span>
            </a>

            {/* Status dot & Live IST Clock */}
            <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-[var(--border-color)] text-[11px] font-mono text-[var(--text-secondary)]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>ONLINE</span>
              <span className="text-[var(--border-color)]">·</span>
              <span>21.1458° N, 79.0882° E</span>
              <span className="text-[var(--border-color)]">·</span>
              <span>{currentTime ? `${currentTime} IST` : "LIVE"}</span>
            </div>
          </div>

          {/* Desktop Nav Links (Chapters 01 - 05) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-xs font-medium"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.num}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(link.id);
                  }}
                  className={`group flex items-center gap-1.5 transition-colors py-1 relative cursor-pointer ${
                    isActive
                      ? "text-[var(--accent)] font-bold"
                      : "text-[var(--text-primary)] hover:text-[var(--accent)]"
                  }`}
                >
                  <span
                    className={`text-[10px] transition-colors ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] group-hover:text-[var(--accent)]"
                    }`}
                  >
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--accent)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Far Right Theme Toggle & Resume Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Minimal Editorial Monospace Theme Toggle */}
            <ThemeToggle variant="desktop" />

            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--text-primary)] hover:bg-[var(--accent)] text-[var(--bg-primary)] hover:text-[#111111] font-mono text-xs font-bold transition-all duration-150 uppercase"
              title="Official LaTeX Resume (PDF)"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--accent)] group-hover:text-[#111111]" />
              <span className="hidden sm:inline">RESUME (PDF)</span>
              <span className="sm:hidden font-mono text-xs">PDF</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--text-primary)] hover:text-[var(--accent)] border border-[var(--border-color)] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Editorial Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 flex flex-col justify-between overflow-y-auto lg:hidden">
          <div className="space-y-6 pt-2">
            <div className="text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border-color)] pb-2 flex justify-between">
              <span>INDEX // CHAPTERS</span>
              <span className="text-[var(--accent)]">01 – 05</span>
            </div>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.num}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    navigateToSection(link.id);
                  }}
                  className="group flex items-baseline justify-between py-2 border-b border-[var(--border-color)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-[var(--accent)]">{link.num}</span>
                    <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[var(--border-color)] font-mono text-xs text-[var(--text-secondary)] space-y-4">
            <ThemeToggle variant="mobile" />

            <div className="flex justify-between items-center text-[11px]">
              <span>STATUS: ONLINE</span>
              <span className="text-[var(--accent)]">{currentTime} IST</span>
            </div>

            <a
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-[var(--accent)] text-[#111111] font-bold uppercase tracking-wider flex items-center justify-center gap-2 font-mono text-xs"
            >
              <FileText className="w-4 h-4 text-[#111111]" />
              <span>OFFICIAL RESUME (PDF) ↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
