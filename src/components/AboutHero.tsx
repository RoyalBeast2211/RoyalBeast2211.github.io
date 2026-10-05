"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { animate } from "animejs";
import { EASES, prefersReducedMotion, initMagneticElement } from "@/animations";
import PrintedHeroPortrait from "./PrintedHeroPortrait";

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const nameLine1Ref = useRef<HTMLSpanElement>(null);
  const nameLine2Ref = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const resumeBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Magnetic link effects
    const cleanups: (() => void)[] = [];
    if (resumeBtnRef.current) {
      cleanups.push(initMagneticElement(resumeBtnRef.current, ".magnetic-target", 6));
    }


    if (prefersReducedMotion()) {
      if (nameLine1Ref.current) nameLine1Ref.current.style.transform = "none";
      if (nameLine2Ref.current) nameLine2Ref.current.style.transform = "none";
      return () => cleanups.forEach((c) => c());
    }

    // Choreographed entrance:
    // Name enters from left with overshoot, narrative & role stagger in, portrait prints onto screen
    if (photoContainerRef.current) {
      animate(photoContainerRef.current as any, {
        opacity: [0, 1],
        duration: 600,
        delay: 100,
        ease: "linear",
      } as any);
    }

    if (nameLine1Ref.current) {
      animate(nameLine1Ref.current as any, {
        translateX: [-80, 0],
        opacity: [0, 1],
        duration: 1650,
        delay: 200,
        ease: "outCubic",
      } as any);
    }

    if (nameLine2Ref.current) {
      animate(nameLine2Ref.current as any, {
        translateX: [-80, 0],
        opacity: [0, 1],
        duration: 1650,
        delay: 380,
        ease: "outCubic",
      } as any);
    }

    if (roleRef.current) {
      animate(roleRef.current as any, {
        translateY: [25, 0],
        opacity: [0, 1],
        duration: 1400,
        delay: 650,
        ease: "outCubic",
      } as any);
    }

    if (narrativeRef.current) {
      animate(narrativeRef.current as any, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 1450,
        delay: 850,
        ease: "outCubic",
      } as any);
    }



    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-[90vh] flex flex-col justify-between pt-4 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1520px] mx-auto border-b border-[var(--border-color)] scroll-mt-20"
    >
      {/* Chapter Indicator Bar */}
      <div className="flex items-center justify-between font-mono text-xs border-b border-[var(--border-color)] pb-3 min-h-[28px] select-none tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-bold">CHAPTER // 01</span>
          <span className="text-[var(--border-color)]">·</span>
          <span className="text-[var(--text-primary)] font-semibold">ABOUT</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] pr-28 sm:pr-32 lg:pr-36">
          <span className="hidden sm:inline tracking-widest text-[11px] uppercase">NAGPUR, INDIA</span>
          <span className="text-[var(--border-color)] hidden sm:inline">·</span>
          <span className="text-[var(--text-primary)] font-semibold tracking-wide uppercase">VNIT NAGPUR</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
        </div>
      </div>

      {/* Main Editorial Composition: Identity Left, Portrait Right */}
      <div className="my-auto py-8 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
        {/* Mobile-first: Photograph displayed on top on mobile, on right on desktop */}
        <div className="block lg:hidden order-1 w-full max-w-[320px] mx-auto">
          <PrintedHeroPortrait isMobile />
        </div>

        {/* Left Column: Monumental Identity & Concise Context */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
          {/* Monumental Name */}
          <div className="space-y-1">
            <h1 className="font-display font-black tracking-tighter text-[var(--text-primary)] leading-[0.88] select-none text-[clamp(3.5rem,8vw,8rem)] uppercase">
              <span
                ref={nameLine1Ref}
                className="inline-block will-change-transform"
                style={{ opacity: 0 }}
              >
                OMKAR
              </span>
              <br />
              <span
                ref={nameLine2Ref}
                className="inline-block text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300 will-change-transform"
                style={{ opacity: 0 }}
              >
                MORE
              </span>
            </h1>
          </div>

          {/* Role & Academic Affiliation */}
          <div
            ref={roleRef}
            className="font-mono border-t border-[var(--border-strong)] pt-3 will-change-transform"
            style={{ opacity: 0 }}
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold tracking-wider uppercase text-[var(--text-primary)]">
              <span className="text-[var(--accent)]">SOFTWARE ENGINEER</span>
              <span className="text-[var(--border-color)]">·</span>
              <span>VNIT NAGPUR</span>
              <span className="text-xs text-[var(--text-muted)] font-normal tracking-wide normal-case sm:uppercase font-sans">
                [B.Tech 2023–2027]
              </span>
            </div>
          </div>

          {/* Engineering Narrative */}
          <div
            ref={narrativeRef}
            className="space-y-3.5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl will-change-transform font-sans"
            style={{ opacity: 0 }}
          >
            <p className="font-normal text-[var(--text-primary)] text-lg sm:text-xl leading-relaxed">
              Ever since I can remember, I&apos;ve been driven by an innate curiosity to understand how things work — the quiet joy of getting lost in a puzzle, taking ideas apart, and staying with a problem until the pieces finally fall into place.
            </p>
            <p className="leading-relaxed text-[var(--text-secondary)] font-normal">
              That obsession with understanding systems from first principles grew into a deep dedication to software. Today, whether I&apos;m dissecting complex algorithms, architecting resilient backends, or shipping end-to-end applications, I build with technical rigor, precision, and an uncompromising focus on engineering craft.
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] tracking-wide font-mono">
              Driven by algorithmic problem-solving, clean architecture, and building software that is fast, dependable, and built to scale.
            </p>
          </div>

          {/* Sincere Human & Academic Credentials (STUDENT MENTOR removed) */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
            <span className="px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold">
              SWE INTERN @ ACCENTURE
            </span>
            <span className="px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--accent)] font-bold">
              LEETCODE KNIGHT · 980+ SOLVED
            </span>
            <span className="px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)]">
              PRESIDENT · SYNTAX CODING CLUB
            </span>
          </div>

          {/* Clean High-End Resume Action */}
          <div className="pt-2">
            <a
              ref={resumeBtnRef}
              href={PERSONAL_INFO.resumePdf}
              target="_blank"
              rel="noreferrer"
              data-magnetic="true"
              className="group relative inline-flex items-center gap-3.5 px-6 py-3.5 border-2 border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--accent)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[#0a0a0a] transition-all duration-200 font-mono text-xs font-bold tracking-wider select-none overflow-hidden shadow-xs cursor-pointer"
              title="View Omkar More Resume"
            >
              {/* Technical Corner Brackets */}
              <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-[var(--accent)] pointer-events-none group-hover:border-[#0a0a0a] transition-colors" />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-[var(--accent)] pointer-events-none group-hover:border-[#0a0a0a] transition-colors" />

              <span className="magnetic-target inline-flex items-center gap-3 will-change-transform">
                <span className="w-5 h-5 flex items-center justify-center border border-[var(--border-color)] group-hover:border-[#0a0a0a] text-[var(--accent)] group-hover:text-[#0a0a0a] transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>

                <span className="tracking-widest uppercase">VIEW RESUME</span>
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Editorial Photograph (Desktop) */}
        <div
          ref={photoContainerRef}
          className="hidden lg:block lg:col-span-5 relative order-1 lg:order-2"
        >
          {/* Subtle brutalist offset decorative box */}
          <div className="absolute -inset-2.5 border border-[var(--border-color)]/70 pointer-events-none translate-x-2 translate-y-2 z-0" />

          <PrintedHeroPortrait />
        </div>
      </div>


    </section>
  );
}
