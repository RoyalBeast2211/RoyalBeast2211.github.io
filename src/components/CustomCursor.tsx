"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPosRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on fine pointer desktop devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const lerpFactor = 0.35; // Section 18: Tiny amount of interpolation, attached to pointer

    const renderLoop = () => {
      const target = targetPosRef.current;
      const current = currentPosRef.current;

      current.x += (target.x - current.x) * lerpFactor;
      current.y += (target.y - current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    const onMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Section 17: Contextual Cursor Labels
      const cursorAttrEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorAttrEl) {
        setCursorText(cursorAttrEl.dataset.cursor || null);
        setIsPointer(true);
        return;
      }

      // 1. PROJECT: VIEW ↗
      if (target.closest(".project-card") || target.closest("[data-project-card]")) {
        setCursorText("VIEW ↗");
        setIsPointer(true);
      }
      // 2. EXTERNAL: OPEN ↗
      else if (
        target.closest("a[target='_blank']") ||
        target.closest("a[href^='http']") ||
        target.closest("a[href^='mailto:']") ||
        target.closest("a[href^='tel:']")
      ) {
        setCursorText("OPEN ↗");
        setIsPointer(true);
      }
      // General clickable
      else if (
        target.closest("button") ||
        target.closest("a") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      ) {
        setCursorText("OPEN ↗");
        setIsPointer(true);
      } else {
        setCursorText(null);
        setIsPointer(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setCursorText(null);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-50 select-none hidden lg:block will-change-transform"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        left: 0,
        top: 0,
      }}
    >
      {cursorText ? (
        <div className="-translate-x-1/2 -translate-y-1/2 px-2 py-0.5 bg-[var(--accent)] text-[#111111] font-mono text-[9px] font-bold tracking-wider uppercase border border-[var(--border-strong)] shadow-md animate-in fade-in duration-100">
          {cursorText}
        </div>
      ) : (
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Subtle crosshair with theme adaptive border */}
          <div
            className={`w-3.5 h-3.5 border border-[var(--text-primary)] rounded-full flex items-center justify-center bg-transparent transition-transform duration-150 ${
              isPointer ? "scale-125 bg-[var(--accent)]/15 border-[var(--accent)]" : ""
            }`}
          >
            <div className="w-1 h-1 bg-[var(--accent)] rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}
