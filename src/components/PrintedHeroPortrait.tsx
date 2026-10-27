"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/animations";

const PORTRAITS = [
  {
    src: "/images/omkar-portrait.jpeg",
    alt: "Omkar More — Portrait 01",
  },
  {
    src: "/images/omkar-portrait-2.jpg",
    alt: "Omkar More — Portrait 02",
  },
  {
    src: "/images/omkar-portrait-3.jpg",
    alt: "Omkar More — Portrait 03",
  },
];

interface PrintedHeroPortraitProps {
  className?: string;
  isMobile?: boolean;
}

export default function PrintedHeroPortrait({
  className = "",
}: PrintedHeroPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const carriageRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const rasterOverlayRef = useRef<HTMLDivElement>(null);
  const statusBadgeRef = useRef<HTMLSpanElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPrinting, setIsPrinting] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
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

    const duration = 1450;
    const delay = 350;
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

      const easedProgress =
        rawProgress < 0.08
          ? Math.pow(rawProgress / 0.08, 2) * 0.08
          : rawProgress > 0.92
          ? 0.92 + (1 - Math.pow((1 - rawProgress) / 0.08, 2)) * 0.08
          : rawProgress;

      const pct = (easedProgress * 100).toFixed(1);

      if (imageMaskRef.current) {
        imageMaskRef.current.style.clipPath = `inset(0 0 ${(100 - parseFloat(pct)).toFixed(1)}% 0)`;
      }

      if (carriageRef.current) {
        carriageRef.current.style.top = `${pct}%`;
      }

      if (readoutRef.current) {
        readoutRef.current.textContent = `${Math.round(parseFloat(pct))}%`;
      }

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
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

  // Initial print entrance
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      startPrintAnimation();
    });

    return () => {
      cancelAnimationFrame(handle);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startPrintAnimation]);

  // Automatic sequence cycling through portraits
  useEffect(() => {
    if (isPrinting || isPaused || prefersReducedMotion()) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PORTRAITS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPrinting, isPaused]);

  // Pause when tab is not active
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handleAdvance = () => {
    if (isPrinting) return;
    setCurrentIndex((prev) => (prev + 1) % PORTRAITS.length);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleAdvance}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full aspect-3/4 border-2 border-[var(--border-strong)] bg-[var(--image-bg)] overflow-hidden shadow-2xl z-10 cursor-pointer ${className}`}
      title="Click to view next portrait"
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

      {/* The Inked Image Layer (Revealed progressively on load, dissolves between images in sequence) */}
      <div
        ref={imageMaskRef}
        className="absolute inset-0 z-10 overflow-hidden will-change-[clip-path]"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        {PORTRAITS.map((portrait, idx) => (
          <div
            key={portrait.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              unoptimized
              priority
              className="object-cover grayscale contrast-115 hover:contrast-100 transition-all duration-700 select-none"
            />
          </div>
        ))}

        {/* Fine Scanline / Dot Matrix Overlay that dissolves once printed */}
        <div
          ref={rasterOverlayRef}
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.5)_2px,rgba(0,0,0,0.5)_4px)] transition-opacity duration-700 z-20"
        />
      </div>

      {/* The Physical Print Carriage & Laser Scanline (Initial Entrance) */}
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
          <span className="text-[var(--accent)] font-bold">
            PORTRAIT // 0{currentIndex + 1}
          </span>
          <span className="text-[var(--text-muted)] ml-1 hidden xs:inline">
            OMKAR MORE
          </span>
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
        </div>
      </div>
    </div>
  );
}
