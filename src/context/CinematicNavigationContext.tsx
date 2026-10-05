"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";

export interface SectionMeta {
  id: string;
  num: string;
  label: string;
  fullName: string;
  index: number;
}

export const SECTIONS: SectionMeta[] = [
  { id: "about", num: "01", label: "ABOUT", fullName: "01 / ABOUT", index: 0 },
  { id: "experience", num: "02", label: "EXPERIENCE", fullName: "02 / EXPERIENCE", index: 1 },
  { id: "projects", num: "03", label: "PROJECTS", fullName: "03 / PROJECTS", index: 2 },
  { id: "stack", num: "04", label: "SKILLS", fullName: "04 / SKILLS", index: 3 },
  { id: "contact", num: "05", label: "CONTACT", fullName: "05 / CONTACT", index: 4 },
];

export type TransitionDirection = "forward" | "backward";
export type TransitionPhase = "idle" | "prep" | "whip-out" | "switch" | "whip-in" | "settle";

export interface TransitionState {
  isTransitioning: boolean;
  phase: TransitionPhase;
  direction: TransitionDirection;
  fromSection: SectionMeta;
  toSection: SectionMeta;
  intermediateSections: SectionMeta[];
}

interface CinematicNavigationContextType {
  activeSection: string;
  transitionState: TransitionState;
  navigateToSection: (targetId: string, updateHistory?: boolean) => void;
  setActiveSection: (id: string) => void;
  viewportRef: React.RefObject<HTMLDivElement | null>;
}

const defaultFrom = SECTIONS[0];
const defaultTo = SECTIONS[1];

const CinematicNavigationContext = createContext<CinematicNavigationContextType | undefined>(
  undefined
);

export function CinematicNavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [transitionState, setTransitionState] = useState<TransitionState>({
    isTransitioning: false,
    phase: "idle",
    direction: "forward",
    fromSection: defaultFrom,
    toSection: defaultTo,
    intermediateSections: [],
  });

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const isTransitioningRef = useRef(false);
  const activeSectionRef = useRef("about");

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Determine active section during natural vertical scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioningRef.current) return;

      const scrollY = window.scrollY;
      if (scrollY < 200) {
        setActiveSection("about");
        return;
      }

      // Check section bounding rects from bottom to top
      const checkSections = [...SECTIONS].reverse();
      for (const sec of checkSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sec.id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section 09 - 18: Main cinematic horizontal navigation engine
  const navigateToSection = useCallback((rawTargetId: string, updateHistory: boolean = true) => {
    // Normalize aliases
    let targetId = rawTargetId.replace(/^#/, "").toLowerCase();
    if (
      targetId === "" ||
      targetId === "top" ||
      targetId === "hero" ||
      targetId === "home" ||
      targetId === "bio"
    ) {
      targetId = "about";
    }
    if (targetId === "work" || targetId === "selected-work") {
      targetId = "projects";
    }
    if (targetId === "exp" || targetId === "timeline") {
      targetId = "experience";
    }
    if (targetId === "skills" || targetId === "technologies" || targetId === "tech") {
      targetId = "stack";
    }
    if (targetId === "email" || targetId === "footer") {
      targetId = "contact";
    }

    // Target section metadata
    const toSection = SECTIONS.find((s) => s.id === targetId);
    if (!toSection) {
      console.warn(`[CinematicNav] Target section not found: ${rawTargetId}`);
      return;
    }

    // Current section metadata
    const currentId = activeSectionRef.current;
    if (currentId === targetId && !isTransitioningRef.current) {
      // User clicked already active section, do a quick micro-settle scroll
      const el = targetId === "about" ? null : document.getElementById(targetId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Section 24: Disable navigation temporarily while transition is running
    if (isTransitioningRef.current) return;

    const fromSection = SECTIONS.find((s) => s.id === currentId) || SECTIONS[0];
    // Section 10 & 11: Forward/backward direction calculation
    const direction: TransitionDirection = toSection.index >= fromSection.index ? "forward" : "backward";

    // Section 15: Compute intermediate sections in film reel order
    let intermediateSections: SectionMeta[] = [];
    if (direction === "forward") {
      intermediateSections = SECTIONS.filter(
        (s) => s.index >= fromSection.index && s.index <= toSection.index
      );
    } else {
      intermediateSections = SECTIONS.filter(
        (s) => s.index <= fromSection.index && s.index >= toSection.index
      ).reverse();
    }

    isTransitioningRef.current = true;
    setActiveSection(targetId);

    // Section 21: Maintain browser history (push state with hash)
    if (updateHistory && typeof window !== "undefined") {
      const newHash = targetId === "about" ? "" : `#${targetId}`;
      window.history.pushState({ section: targetId }, "", newHash || window.location.pathname);
    }

    // Total sequence: 540ms (strictly within Section 18 target of 450-750ms)
    // Phase 1: Prep & initiation (0ms - 40ms)
    setTransitionState({
      isTransitioning: true,
      phase: "prep",
      direction,
      fromSection,
      toSection,
      intermediateSections,
    });

    // Phase 2: Whip-Out (40ms - 220ms) - Viewport rapidly pulls sideways
    const timerWhipOut = setTimeout(() => {
      setTransitionState((prev) => ({ ...prev, phase: "whip-out" }));
    }, 40);

    // Phase 3: Switch Cut (220ms - 240ms) - Instant snap vertical reposition under blur
    const timerSwitch = setTimeout(() => {
      setTransitionState((prev) => ({ ...prev, phase: "switch" }));

      // Instant jump without visible vertical motion
      if (targetId === "about") {
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - 24;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "instant" });
        }
      }
    }, 220);

    // Phase 4: Whip-In (240ms - 460ms) - Target arrives from opposite side & locks
    const timerWhipIn = setTimeout(() => {
      setTransitionState((prev) => ({ ...prev, phase: "whip-in" }));
    }, 240);

    // Phase 5: Settle & Completion (460ms - 540ms)
    const timerSettle = setTimeout(() => {
      setTransitionState((prev) => ({ ...prev, phase: "settle" }));
    }, 460);

    const timerComplete = setTimeout(() => {
      setTransitionState({
        isTransitioning: false,
        phase: "idle",
        direction: "forward",
        fromSection: toSection,
        toSection,
        intermediateSections: [],
      });
      isTransitioningRef.current = false;
    }, 540);

    return () => {
      clearTimeout(timerWhipOut);
      clearTimeout(timerSwitch);
      clearTimeout(timerWhipIn);
      clearTimeout(timerSettle);
      clearTimeout(timerComplete);
    };
  }, []);

  // Section 21: Browser Back/Forward navigation support (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace(/^#/, "");
        navigateToSection(hash || "about", false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigateToSection]);

  // Section 20: Global link interception for anchor clicks targeting internal sections
  // External links such as GitHub, LinkedIn, Live URL MUST NOT trigger the transition
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external or non-anchor links
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.getAttribute("target") === "_blank"
      ) {
        return;
      }

      if (href.startsWith("#")) {
        const sectionId = href.replace(/^#/, "");
        if (SECTIONS.some((s) => s.id === sectionId) || sectionId === "") {
          e.preventDefault();
          navigateToSection(sectionId || "about");
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => document.removeEventListener("click", handleGlobalClick, { capture: true });
  }, [navigateToSection]);

  return (
    <CinematicNavigationContext.Provider
      value={{
        activeSection,
        transitionState,
        navigateToSection,
        setActiveSection,
        viewportRef,
      }}
    >
      {children}
    </CinematicNavigationContext.Provider>
  );
}

export function useCinematicNavigation() {
  const context = useContext(CinematicNavigationContext);
  if (!context) {
    throw new Error(
      "useCinematicNavigation must be used within a CinematicNavigationProvider"
    );
  }
  return context;
}
