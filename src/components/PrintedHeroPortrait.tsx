"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/animations";

interface PortraitItem {
  id: string;
  src: string;
  alt: string;
  label: string;
  subLabel: string;
  location: string;
  code: string;
}

const PORTRAITS: PortraitItem[] = [
  {
    id: "01",
    src: "/images/omkar-portrait.jpeg",
    alt: "Omkar More — Software Engineer Portrait 01",
    label: "PORTRAIT // 01",
    subLabel: "OMKAR MORE",
    location: "21.1458° N, 79.0882° E",
    code: "VNIT_NAGPUR",
  },
  {
    id: "02",
    src: "/images/omkar-portrait-2.jpg",
    alt: "Omkar More — Software Engineer Portrait 02",
    label: "PORTRAIT // 02",
    subLabel: "TACTICAL NIGHT",
    location: "MIG-27 // 21.14°N",
    code: "AIR_DEFENSE",
  },
  {
    id: "03",
    src: "/images/omkar-portrait-3.jpg",
    alt: "Omkar More — Software Engineer Portrait 03",
    label: "PORTRAIT // 03",
    subLabel: "SAHYADRI RIDGE",
    location: "17.9237° N, 73.6586° E",
    code: "WESTERN_GHATS",
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
  const [incomingIndex, setIncomingIndex] = useState<number | null>(0);
  const [hasCompletedFirstPrint, setHasCompletedFirstPrint] = useState<boolean>(false);
  const [isPrinting, setIsPrinting] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const animationFrameRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const runCarriageAnimation = useCallback((targetIndex: number, isInitial = false) => {
    if (prefersReducedMotion()) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setCurrentIndex(targetIndex);
      setIncomingIndex(null);
      setHasCompletedFirstPrint(true);
      setIsPrinting(false);
      if (readoutRef.current) readoutRef.current.textContent = "100%";
      if (carriageRef.current) carriageRef.current.style.opacity = "0";
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Initial state: incoming layer blank, carriage at top
    if (imageMaskRef.current) imageMaskRef.current.style.clipPath = "inset(0 0 100% 0)";
    if (carriageRef.current) {
      carriageRef.current.style.top = "0%";
      carriageRef.current.style.opacity = "1";
    }
    if (readoutRef.current) readoutRef.current.textContent = "0%";
    if (rasterOverlayRef.current) rasterOverlayRef.current.style.opacity = "0.45";

    const duration = isInitial ? 1400 : 950;
    const delay = isInitial ? 300 : 40;
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
        setCurrentIndex(targetIndex);
        setIncomingIndex(null);
        setIsPrinting(false);
        setHasCompletedFirstPrint(true);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const triggerPrintToIndex = useCallback(
    (targetIndex: number) => {
      setIncomingIndex(targetIndex);
      setIsPrinting(true);
      runCarriageAnimation(targetIndex, false);
    },
    [runCarriageAnimation]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % PORTRAITS.length;
    triggerPrintToIndex(nextIdx);
  }, [currentIndex, triggerPrintToIndex]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + PORTRAITS.length) % PORTRAITS.length;
    triggerPrintToIndex(prevIdx);
  }, [currentIndex, triggerPrintToIndex]);

  // Initial print on mount
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      runCarriageAnimation(0, true);
    });

    return () => {
      cancelAnimationFrame(handle);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [runCarriageAnimation]);

  // Auto-advance sequence timer (5.5s dwell when not hovered/paused/printing)
  useEffect(() => {
    if (isPrinting || isPaused || prefersReducedMotion()) return;

    const timer = setTimeout(() => {
      const nextIdx = (currentIndex + 1) % PORTRAITS.length;
      triggerPrintToIndex(nextIdx);
    }, 5500);

    return () => clearTimeout(timer);
  }, [currentIndex, isPrinting, isPaused, triggerPrintToIndex]);

  // Pause sequence when document is in background tab
  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Mobile horizontal swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const activeIncomingIndex = incomingIndex ?? currentIndex;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Omkar More portrait gallery"
      className={`group relative w-full aspect-3/4 border-2 border-[var(--border-strong)] bg-[var(--image-bg)] overflow-hidden shadow-2xl z-10 focus:outline-hidden ${className}`}
    >
      {/* Hidden preloader for instant zero-latency sequence switches */}
      <div className="hidden" aria-hidden="true">
        {PORTRAITS.map((p) => (
          <Image
            key={p.id}
            src={p.src}
            alt=""
            width={10}
            height={10}
            unoptimized
            priority
          />
        ))}
      </div>

      {/* Subtle Top Sequence Frame Indicator */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-black/40 z-20 pointer-events-none overflow-hidden">
        <div
          className="h-full bg-[var(--accent)] origin-left"
          style={{
            width: isPrinting ? "100%" : `${((currentIndex + 1) / PORTRAITS.length) * 100}%`,
            opacity: isPaused ? 0.4 : 0.85,
            transition: "width 0.35s ease",
          }}
        />
      </div>

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
          <span className="text-[8px]">
            {`PRESS_RAW_STOCK_${PORTRAITS[activeIncomingIndex].id}`}
          </span>
        </div>
      </div>

      {/* Base Layer: Currently Settled Image (Shown once initial print is complete) */}
      {hasCompletedFirstPrint && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          <Image
            src={PORTRAITS[currentIndex].src}
            alt={PORTRAITS[currentIndex].alt}
            fill
            unoptimized
            priority
            className="object-cover grayscale contrast-115 hover:contrast-100 transition-all duration-700 select-none"
          />
        </div>
      )}

      {/* Incoming / Inking Image Layer (Revealed progressively top to bottom by print carriage) */}
      <div
        ref={imageMaskRef}
        className="absolute inset-0 z-15 overflow-hidden will-change-[clip-path]"
        style={{
          clipPath: "inset(0 0 100% 0)",
          opacity: isPrinting ? 1 : 0,
        }}
      >
        <Image
          src={PORTRAITS[activeIncomingIndex].src}
          alt={PORTRAITS[activeIncomingIndex].alt}
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

      {/* Side Quick-Step Chevrons (Fade in on hover on desktop) */}
      <div className="absolute inset-y-0 inset-x-2 z-20 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous portrait"
          className="pointer-events-auto w-7 h-7 bg-[var(--terminal-bg)]/85 hover:bg-[var(--accent)] hover:text-black text-[var(--text-primary)] border border-[var(--border-color)] flex items-center justify-center font-mono text-xs transition-colors backdrop-blur-xs shadow-md active:scale-95 cursor-pointer"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next portrait"
          className="pointer-events-auto w-7 h-7 bg-[var(--terminal-bg)]/85 hover:bg-[var(--accent)] hover:text-black text-[var(--text-primary)] border border-[var(--border-color)] flex items-center justify-center font-mono text-xs transition-colors backdrop-blur-xs shadow-md active:scale-95 cursor-pointer"
        >
          ›
        </button>
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
      <div className="absolute bottom-0 inset-x-0 bg-[var(--terminal-bg)]/90 backdrop-blur-xs p-2.5 sm:p-3.5 border-t border-[var(--border-color)] font-mono text-[11px] text-[var(--terminal-text)] flex justify-between items-center z-20 select-none gap-2">
        {/* Sequence & Portrait Label */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="text-[var(--accent)] font-bold whitespace-nowrap">
            {PORTRAITS[currentIndex].label}
          </span>
          <span className="text-[var(--text-muted)] text-[10px] whitespace-nowrap">
            / 0{PORTRAITS.length}
          </span>
          <span className="text-[var(--text-muted)] ml-1 hidden md:inline truncate">
            {PORTRAITS[currentIndex].subLabel}
          </span>
        </div>

        {/* Sequence Controls & Technical Status */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Step Prev */}
          <button
            type="button"
            onClick={handlePrev}
            title="Previous portrait (←)"
            aria-label="Previous portrait"
            className="w-5 h-5 flex items-center justify-center text-[11px] text-[var(--terminal-text)] hover:text-white hover:border-[var(--accent)] border border-[var(--border-color)]/80 bg-[var(--terminal-bg)] transition-colors cursor-pointer active:scale-95"
          >
            ‹
          </button>

          {/* Sequence Pills */}
          <div className="flex items-center gap-1">
            {PORTRAITS.map((p, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => triggerPrintToIndex(idx)}
                  title={`Show portrait ${p.id} (${p.subLabel})`}
                  aria-label={`Show portrait ${p.id} - ${p.subLabel}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`px-1.5 py-0.5 text-[9px] font-mono border transition-all cursor-pointer ${
                    isActive
                      ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/15 font-bold shadow-xs"
                      : "border-[var(--border-color)]/60 text-[var(--text-muted)] hover:text-white hover:border-[var(--border-color)]"
                  }`}
                >
                  {p.id}
                </button>
              );
            })}
          </div>

          {/* Step Next */}
          <button
            type="button"
            onClick={handleNext}
            title="Next portrait (→)"
            aria-label="Next portrait"
            className="w-5 h-5 flex items-center justify-center text-[11px] text-[var(--terminal-text)] hover:text-white hover:border-[var(--accent)] border border-[var(--border-color)]/80 bg-[var(--terminal-bg)] transition-colors cursor-pointer active:scale-95"
          >
            ›
          </button>

          {/* Location / Inking Status */}
          <span
            ref={statusBadgeRef}
            className="text-[10px] text-[var(--text-muted)] tracking-wider hidden sm:inline ml-1"
          >
            {isPrinting ? (
              <span className="text-[var(--accent)] animate-pulse">● INKING</span>
            ) : (
              <span>{PORTRAITS[currentIndex].location}</span>
            )}
          </span>

          {/* Micro Re-Print Action */}
          <button
            type="button"
            onClick={() => triggerPrintToIndex(currentIndex)}
            title="Re-run image print sequence"
            className="text-[9px] text-[var(--accent)] hover:text-white px-1.5 py-0.5 border border-[var(--border-color)]/80 hover:border-[var(--accent)] bg-[var(--terminal-bg)] transition-colors cursor-pointer ml-0.5"
          >
            {isPrinting ? "..." : "↺ REPRINT"}
          </button>
        </div>
      </div>
    </div>
  );
}
