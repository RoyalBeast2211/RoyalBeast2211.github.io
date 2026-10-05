"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";

export interface MobileProjectViewerProps {
  images: string[];
  title: string;
  captions?: string[];
  className?: string;
  userCount?: string;
}

const DEFAULT_CAPTIONS = [
  "LIVE DASHBOARD & REALTIME SCORES",
  "DEPARTMENTAL LEADERBOARD",
  "EVENT SCHEDULE & TIMELINE",
  "USER PROFILE & BADGE SYSTEM",
  "TOURNAMENT RESULTS ENGINE",
];

export default function MobileProjectViewer({
  images,
  title,
  captions = DEFAULT_CAPTIONS,
  className = "",
  userCount,
}: MobileProjectViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const isHorizontalGestureRef = useRef<boolean | null>(null);
  const lastInteractionRef = useRef(Date.now());
  const autoplayDoneRef = useRef(false);

  const total = images.length;

  // Slide transition without library animation conflicts
  const goToSlide = useCallback(
    (targetIndex: number) => {
      const nextIdx = Math.max(0, Math.min(targetIndex, total - 1));
      setCurrentIndex(nextIdx);
      setDragOffset(0);
      lastInteractionRef.current = Date.now();
    },
    [total]
  );

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    if (currentIndex < total - 1) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  }, [currentIndex, total, goToSlide]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(total - 1);
    }
  }, [currentIndex, total, goToSlide]);

  // Touch Handlers for mobile swipe with vertical scroll immunity
  const handleTouchStart = (e: React.TouchEvent) => {
    if (total <= 1) return;
    isPointerDownRef.current = true;
    isHorizontalGestureRef.current = null;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartYRef.current = e.touches[0].clientY;
    lastInteractionRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPointerDownRef.current || total <= 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - dragStartXRef.current;
    const deltaY = currentY - dragStartYRef.current;

    // Detect gesture intention: if moving more vertically than horizontally, allow native scroll
    if (isHorizontalGestureRef.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          isHorizontalGestureRef.current = false;
          return;
        } else {
          isHorizontalGestureRef.current = true;
          setIsDragging(true);
        }
      } else {
        return;
      }
    }

    if (!isHorizontalGestureRef.current) return;

    // Edge dampening
    if ((currentIndex === 0 && deltaX > 0) || (currentIndex === total - 1 && deltaX < 0)) {
      setDragOffset(deltaX * 0.3);
    } else {
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    if (isHorizontalGestureRef.current) {
      const threshold = 35; // px threshold for slide change
      if (dragOffset < -threshold && currentIndex < total - 1) {
        goToSlide(currentIndex + 1);
      } else if (dragOffset > threshold && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else {
        setDragOffset(0);
      }
    } else {
      setDragOffset(0);
    }
    isHorizontalGestureRef.current = null;
  };

  // Mouse drag handlers for desktop with window-level tracking
  const handleMouseDown = (e: React.MouseEvent) => {
    if (total <= 1) return;
    isPointerDownRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    lastInteractionRef.current = Date.now();
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isPointerDownRef.current || total <= 1) return;
      const delta = e.clientX - dragStartXRef.current;
      if ((currentIndex === 0 && delta > 0) || (currentIndex === total - 1 && delta < 0)) {
        setDragOffset(delta * 0.3);
      } else {
        setDragOffset(delta);
      }
    };

    const handleGlobalMouseUp = () => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;
      setIsDragging(false);

      const threshold = 35;
      if (dragOffset < -threshold && currentIndex < total - 1) {
        goToSlide(currentIndex + 1);
      } else if (dragOffset > threshold && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else {
        setDragOffset(0);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, currentIndex, dragOffset, total, goToSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  // Gentle inactivity single advance (runs once after 6s idle if not interacted)
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      const idleTime = Date.now() - lastInteractionRef.current;
      if (idleTime > 6500 && !autoplayDoneRef.current && !isHovered) {
        autoplayDoneRef.current = true;
        setCurrentIndex((prev) => (prev + 1) % total);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [total, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={`${title} interactive mobile preview`}
    >
      {/* Editorial Tech Badge Top */}
      <div className="w-full max-w-[320px] sm:max-w-[340px] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pb-3 px-2">
        <span className="flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="font-semibold text-[var(--text-primary)]">MOBILE PRODUCT</span>
        </span>
        <span className="text-[var(--accent)] font-bold tracking-wider">
          {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Realistic Minimalist Smartphone Frame (Chassis wrapping exact 9:19.5 inner screen) */}
      <div
        className={`relative w-[280px] sm:w-[320px] md:w-[335px] rounded-[44px] p-2.5 sm:p-3 bg-[#141414] border-[3px] border-[#2C2C2C] shadow-2xl transition-all duration-300 ease-out will-change-transform ${
          isHovered
            ? "md:-translate-y-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[var(--accent)]/50"
            : "shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Physical Edge Details (Volume & Power Buttons on sides) */}
        <div className="absolute -left-[5px] top-24 w-[3px] h-9 bg-[#3A3A3A] rounded-l-xs" />
        <div className="absolute -left-[5px] top-36 w-[3px] h-12 bg-[#3A3A3A] rounded-l-xs" />
        <div className="absolute -right-[5px] top-28 w-[3px] h-14 bg-[#3A3A3A] rounded-r-xs" />

        {/* Screen Bezel Frame (Exact 9:19.5 matching 1080x2340 images edge-to-edge) */}
        <div
          className="relative w-full aspect-[9/19.5] rounded-[32px] overflow-hidden bg-[#0A0A0A] border border-[#222222] flex flex-col cursor-grab active:cursor-grabbing touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          {/* Subtle Top Speaker Slit */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="w-16 h-1 bg-[#1F1F1F] rounded-full" />
          </div>

          {/* Sliding Screens Track: Smooth GPU hardware transform */}
          <div
            className="relative w-full h-full flex will-change-transform"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {images.map((src, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={idx}
                  className="relative shrink-0 w-full h-full select-none overflow-hidden bg-[#0A0A0A]"
                  aria-hidden={!isActive}
                >
                  <Image
                    src={src}
                    alt={`${title} screenshot ${idx + 1}`}
                    fill
                    unoptimized
                    draggable={false}
                    className={`object-cover object-top transition-transform duration-300 pointer-events-none ${
                      isActive ? "scale-100 opacity-100" : "scale-[0.99] opacity-85"
                    }`}
                    priority={idx === 0}
                  />
                  {/* Subtle screen reflection gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Subtle Carousel Arrow Overlays (Always visible on mobile, hover on desktop) */}
          {total > 1 && (
            <div
              className={`absolute inset-y-0 left-2 right-2 z-40 flex items-center justify-between pointer-events-none transition-opacity duration-200 ${
                isHovered ? "opacity-100" : "opacity-80 md:opacity-0 md:group-hover:opacity-100"
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous screenshot"
                className="pointer-events-auto w-8 h-8 rounded-full bg-black/85 hover:bg-[var(--accent)] hover:text-black text-white flex items-center justify-center border border-white/20 transition-all shadow-lg backdrop-blur-xs cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next screenshot"
                className="pointer-events-auto w-8 h-8 rounded-full bg-black/85 hover:bg-[var(--accent)] hover:text-black text-white flex items-center justify-center border border-white/20 transition-all shadow-lg backdrop-blur-xs cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Minimalist Phone UI Indicator & Caption */}
      <div className="mt-4 flex flex-col items-center gap-2 text-center w-full max-w-[340px]">
        {/* Caption */}
        <div className="font-mono text-[11px] text-[var(--text-secondary)] font-medium tracking-wide uppercase truncate max-w-[280px] sm:max-w-none">
          {captions[currentIndex] || `${title} — VIEW ${currentIndex + 1}`}
        </div>

        {/* Minimalist Indicator Dots with Orange Active Accent & Accessible Tap Areas */}
        {total > 1 && (
          <div className="flex items-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(i);
                }}
                aria-label={`Go to screenshot ${i + 1}`}
                className="p-2 flex items-center justify-center cursor-pointer group"
              >
                <span
                  className={`h-1.5 transition-all duration-300 rounded-full block ${
                    i === currentIndex
                      ? "w-6 bg-[var(--accent)] shadow-sm"
                      : "w-1.5 bg-[var(--border-color)] group-hover:bg-[var(--text-secondary)]"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Swipe / Drag Hint */}
        {total > 1 && (
          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
            <span className="hidden sm:inline">[ SWIPE, DRAG OR USE ARROW KEYS ]</span>
            <span className="sm:hidden">[ SWIPE TO EXPLORE SCREENS ]</span>
          </div>
        )}
      </div>
    </div>
  );
}
