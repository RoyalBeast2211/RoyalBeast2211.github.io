"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";
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
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("omkar_theme_change", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function getThemeSnapshot(): Theme {
  return (localStorage.getItem("omkar_theme") as Theme) || "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function getSystemDarkSnapshot(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getSystemDarkServerSnapshot(): boolean {
  return true;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);
  const isSystemDark = useSyncExternalStore(subscribeTheme, getSystemDarkSnapshot, getSystemDarkServerSnapshot);

  const resolvedTheme: ResolvedTheme =
    theme === "light" ? "light" : theme === "system" ? (isSystemDark ? "dark" : "light") : "dark";

  useEffect(() => {
    applyDomTheme(resolvedTheme, false);
  }, [resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem("omkar_theme", newTheme);
    const isDark = newTheme === "light" ? false : true;
    applyDomTheme(isDark ? "dark" : "light", true);
    window.dispatchEvent(new Event("omkar_theme_change"));
  };

  const toggleTheme = () => {
    const next: Theme = resolvedTheme === "dark" ? "light" : "dark";
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
