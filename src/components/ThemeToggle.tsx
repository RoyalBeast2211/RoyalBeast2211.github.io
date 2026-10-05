"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  variant?: "desktop" | "mobile";
}

export default function ThemeToggle({ variant = "desktop" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  if (variant === "mobile") {
    return (
      <div className="space-y-2 font-mono text-xs select-none">
        <div className="flex justify-between items-center text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
          <span>THEME // ENVIRONMENT</span>
          <span className="text-[var(--accent)]">$ set --theme={resolvedTheme}</span>
        </div>
        <div className="grid grid-cols-3 gap-1 p-1 bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <button
            onClick={() => setTheme("light")}
            className={`py-1.5 text-center text-xs uppercase font-bold tracking-wider transition-colors ${
              theme === "light"
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            ☼ LIGHT
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`py-1.5 text-center text-xs uppercase font-bold tracking-wider transition-colors ${
              theme === "dark"
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            ☾ DARK
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`py-1.5 text-center text-xs uppercase font-bold tracking-wider transition-colors ${
              theme === "system"
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            SYS ({resolvedTheme.slice(0, 3)})
          </button>
        </div>
      </div>
    );
  }

  // Editorial Control
  return (
    <div
      className="flex items-center border border-[var(--border-color)] bg-[var(--bg-surface)]/90 backdrop-blur-md p-0.5 font-mono text-[10px] select-none shadow-xs"
      title={`Theme: ${resolvedTheme.toUpperCase()} (Click to toggle)`}
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`px-2 py-1 flex items-center gap-1 uppercase tracking-wider transition-colors ${
          resolvedTheme === "light"
            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold shadow-xs"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        }`}
        aria-label="Switch to light theme"
      >
        <span>☼</span>
        <span className="hidden md:inline">LGT</span>
      </button>

      <span className="text-[var(--border-color)] select-none px-0.5">·</span>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`px-2 py-1 flex items-center gap-1 uppercase tracking-wider transition-colors ${
          resolvedTheme === "dark"
            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold shadow-xs"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        }`}
        aria-label="Switch to dark theme"
      >
        <span>☾</span>
        <span className="hidden md:inline">DRK</span>
      </button>
    </div>
  );
}
