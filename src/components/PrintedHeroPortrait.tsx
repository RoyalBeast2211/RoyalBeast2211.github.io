"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/animations";

interface PrintedHeroPortraitProps {
  className?: string;
  isMobile?: boolean;
}

export default function PrintedHeroPortrait({
  className = "",
  isMobile: _isMobile = false,
}: PrintedHeroPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const carriageRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const rasterOverlayRef = useRef<HTMLDivElement>(null);
  const statusBadgeRef = useRef<HTMLSpanElement>(null);

  const [isPrinting, setIsPrinting] = useState<boolean>(true);
  const animationFrameRef = useRef<number | null>(null);

  const startPrintAnimation = useCallback(() => {
    if (prefersReducedMotion()) {
      if (imageMaskRef.current) imageMaskRef.current.style.clipPath = "inset(0 0 0 0)";
      if (carriageRef.current) carriageRef.current.style.opacity = "0";
      if (readoutRef.current) readoutRef.current.textContent = "100%";
      setIsPrinting(false);
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsPrinting(true);

    // Initial state: paper blank, carriage at top
    if (imageMaskRef.current) imageMaskRef.current.style.clipPath = "inset(0 0 100% 0)";
    if (carriageRef.current) {
      carriageRef.current.style.top = "0%";
      carriageRef.current.style.opacity = "1";
    }
    if (readoutRef.current) readoutRef.current.textContent = "0%";
    if (rasterOverlayRef.current) rasterOverlayRef.current.style.opacity = "0.45";

    const duration = 1450; // ms to print the full frame
    const delay = 350; // wait 350ms so user clearly perceives the paper before carriage strikes
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      if (elapsed < delay) {
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      const activeElapsed = elapsed - delay;
      const rawProgress = Math.min(1, activeElapsed / duration);

      // Smooth mechanical print curve: steady linear with gentle ease at lead-in and finish
      const easedProgress =
        rawProgress < 0.08
          ? Math.pow(rawProgress / 0.08, 2) * 0.08
          : rawProgress > 0.92
          ? 0.92 + (1 - Math.pow((1 - rawProgress) / 0.08, 2)) * 0.08
          : rawProgress;

      const pct = (easedProgress * 100).toFixed(1);

      // 1. Reveal image line by line from top to bottom
      if (imageMaskRef.current) {
        imageMaskRef.current.style.clipPath = `inset(0 0 ${(100 - parseFloat(pct)).toFixed(1)}% 0)`;
      }

      // 2. Drive the physical laser/print carriage line
      if (carriageRef.current) {
        carriageRef.current.style.top = `${pct}%`;
      }

      // 3. Live print HUD percentage readout
      if (readoutRef.current) {
        readoutRef.current.textContent = `${Math.round(parseFloat(pct))}%`;
      }

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Complete print:
        if (imageMaskRef.current) {
          imageMaskRef.current.style.clipPath = "inset(0 0 0 0)";
        }
        if (readoutRef.current) {
          readoutRef.current.textContent = "100%";
        }
        if (carriageRef.current) {
          carriageRef.current.style.opacity = "0";
        }
        if (rasterOverlayRef.current) {
          rasterOverlayRef.current.style.opacity = "0";
        }
        setIsPrinting(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    startPrintAnimation();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startPrintAnimation]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-3/4 border-2 border-[var(--border-strong)] bg-[var(--image-bg)] overflow-hidden shadow-2xl z-10 ${className}`}
    >
      {/* Raw Print Paper Texture & Alignment Crosshairs (Visible before and under print) */}
      <div className="absolute inset-0 bg-[var(--image-bg)] pointer-events-none z-0">
        {/* Subtle technical paper grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_31px,var(--border-color)_32px)] [background-size:100%_32px] opacity-15" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_31px,var(--border-color)_32px)] [background-size:32px_100%] opacity-15" />

        {/* 4 Corner Registration Crosshairs [+] */}
        <span className="absolute top-2 left-2.5 font-mono text-[9px] text-[var(--text-muted)] select-none opacity-40">┼</span>
        <span className="absolute top-2 right-2.5 font-mono text-[9px] text-[var(--text-muted)] select-none opacity-40">┼</span>
        <span className="absolute bottom-12 left-2.5 font-mono text-[9px] text-[var(--text-muted)] select-none opacity-40">┼</span>
        <span className="absolute bottom-12 right-2.5 font-mono text-[9px] text-[var(--text-muted)] select-none opacity-40">┼</span>

        {/* Technical Watermark Background */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 font-mono text-[10px] tracking-widest text-[var(--text-muted)] space-y-1">
          <span>{"// PRINT_BUFFER //"}</span>
          <span className="text-[8px]">PRESS_RAW_STOCK_01</span>
        </div>
      </div>

      {/* The Inked Image Layer (Revealed progressively top to bottom) */}
      <div
        ref={imageMaskRef}
        className="absolute inset-0 z-10 overflow-hidden will-change-[clip-path]"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <Image
          src="/images/omkar-portrait.jpeg"
          alt="Omkar More — Software Engineer"
          fill
          unoptimized
          priority
          className="object-cover grayscale contrast-115 hover:contrast-100 transition-all duration-700 select-none"
        />

        {/* Fine Scanline / Dot Matrix Overlay that dissolves once printed */}
        <div
          ref={rasterOverlayRef}
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.5)_2px,rgba(0,0,0,0.5)_4px)] transition-opacity duration-700"
        />
      </div>

      {/* The Physical Print Carriage & Laser Scanline */}
      <div
        ref={carriageRef}
        className="absolute left-0 right-0 z-30 pointer-events-none transition-opacity duration-300"
        style={{ top: "0%", opacity: 0 }}
      >
        {/* Fresh Thermal / Inking Glow trailing directly behind the print head */}
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[var(--accent)]/30 via-[var(--accent)]/10 to-transparent pointer-events-none" />

        {/* Razor-sharp Laser / Print Carriage Line */}
        <div className="relative w-full h-[2.5px] bg-[var(--accent)] shadow-[0_0_12px_var(--accent),0_0_24px_var(--accent)]" />

        {/* Left & Right Mechanical Frame Registration Notches */}
        <div className="absolute -left-1 -top-2 w-2.5 h-4.5 border-l-2 border-t-2 border-b-2 border-[var(--accent)] bg-[var(--terminal-bg)]" />
        <div className="absolute -right-1 -top-2 w-2.5 h-4.5 border-r-2 border-t-2 border-b-2 border-[var(--accent)] bg-[var(--terminal-bg)]" />

        {/* Floating Print Status HUD attached to the carriage head */}
        <div className="absolute right-2 -top-6 px-2 py-0.5 bg-[var(--terminal-bg)] border border-[var(--accent)] font-mono text-[9px] font-bold text-[var(--accent)] tracking-widest flex items-center gap-1.5 shadow-xl select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span>PRINTING //</span>
          <span ref={readoutRef}>0%</span>
        </div>
      </div>

      {/* Bottom Editorial Technical Metadata Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-[var(--terminal-bg)]/90 backdrop-blur-xs p-3 sm:p-3.5 border-t border-[var(--border-color)] font-mono text-[11px] text-[var(--terminal-text)] flex justify-between items-center z-20 select-none">
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent)] font-bold">PORTRAIT // 01</span>
          <span className="text-[var(--text-muted)] ml-1 hidden xs:inline">OMKAR MORE</span>
        </div>

        <div className="flex items-center gap-3">
          <span
            ref={statusBadgeRef}
            className="text-[10px] text-[var(--text-muted)] tracking-wider"
          >
            {isPrinting ? (
              <span className="text-[var(--accent)] animate-pulse">● INKING</span>
            ) : (
              <span>21.1458° N, 79.0882° E</span>
            )}
          </span>

          {/* Micro Re-Print Action */}
          <button
            type="button"
            onClick={startPrintAnimation}
            title="Re-run image print sequence"
            className="text-[9px] text-[var(--accent)] hover:text-white px-1.5 py-0.5 border border-[var(--border-color)]/80 hover:border-[var(--accent)] bg-[var(--terminal-bg)] transition-colors cursor-pointer"
          >
            {isPrinting ? "..." : "↺ REPRINT"}
          </button>
        </div>
      </div>
    </div>
  );
}
