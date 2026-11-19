"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyDomTheme = (target: ResolvedTheme, animate = true) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (animate) {
    root.classList.add("theme-transitioning");
    setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 450);
  }

  if (target === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
  }
};

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("omkar_theme_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("omkar_theme_change", callback);
  };
}

function getThemeSnapshot(): Theme {
  try {
    const stored = localStorage.getItem("omkar_theme");
    // Only return light if explicitly set to light by the viewer; default is always dark
    if (stored === "light") {
      return "light";
    }
    // Clean up any stale legacy values (e.g. "system") so dark remains default
    if (stored && stored !== "dark") {
      localStorage.setItem("omkar_theme", "dark");
    }
    return "dark";
  } catch {
    return "dark";
  }
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);
  const resolvedTheme: ResolvedTheme = theme;

  useEffect(() => {
    applyDomTheme(resolvedTheme, false);
  }, [resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem("omkar_theme", newTheme);
    } catch {}
    applyDomTheme(newTheme, true);
    window.dispatchEvent(new Event("omkar_theme_change"));
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
