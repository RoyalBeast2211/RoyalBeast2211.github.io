"use client";

import React from "react";
import dynamic from "next/dynamic";
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });
import CustomCursor from "@/components/CustomCursor";
import PageProgress from "@/components/PageProgress";
import ThemeToggle from "@/components/ThemeToggle";
import AboutHero from "@/components/AboutHero";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SelectedWork from "@/components/SelectedWork";
import StackSection from "@/components/StackSection";
import ContactFooter from "@/components/ContactFooter";
import {
  CinematicNavigationProvider,
  useCinematicNavigation,
} from "@/context/CinematicNavigationContext";
import CinematicTransitionOverlay from "@/components/CinematicTransitionOverlay";
import ContinuousInkArtwork from "@/components/ContinuousInkArtwork";

function PortfolioContent() {
  const { viewportRef } = useCinematicNavigation();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const target = params.get("goto");
      if (target) {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "instant" });
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden selection:bg-[var(--accent)] selection:text-[var(--bg-primary)]">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Desktop Custom Contextual Cursor */}
      <CustomCursor />

      {/* Cinematic Horizontal Whip & Film-Strip Transition Overlay */}
      <CinematicTransitionOverlay />

      {/* Floating Corner Theme Switcher */}
      <div className="fixed top-4 right-4 sm:right-6 lg:right-8 z-40">
        <ThemeToggle />
      </div>

      {/* Persistent Page Progress Nav Bar (Right-Side 5-Chapter Navigation) */}
      <PageProgress />

      {/* Physical Viewport Camera Container (pulls horizontally during transitions) */}
      <main
        ref={viewportRef}
        className="w-full relative"
      >
        {/* Continuous Raw Brutalist Ink Artwork System */}
        <ContinuousInkArtwork />

        {/* 01 / ABOUT (Merged Hero + Photo + Identity) */}
        <AboutHero />

        {/* 02 / EXPERIENCE */}
        <ExperienceTimeline />

        {/* 03 / PROJECTS (IG App + GitLike) */}
        <SelectedWork />

        {/* 04 / SKILLS */}
        <StackSection />

        {/* 05 / CONTACT */}
        <ContactFooter />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <CinematicNavigationProvider>
      <PortfolioContent />
    </CinematicNavigationProvider>
  );
}
