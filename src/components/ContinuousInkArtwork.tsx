"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function ContinuousInkArtwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const whiskerRef1 = useRef<SVGGElement>(null);
  const whiskerRef2 = useRef<SVGGElement>(null);

  useEffect(() => {
    // Respect user's motion preferences or mobile performance (Section 42 & 47)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || (typeof window !== "undefined" && window.innerWidth < 1024)) return;

    let rafId: number;
    let lastScrollY = -1;

    // Macro Scroll Motion Handler (Subtle Parallax)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < 0.5) return;
      lastScrollY = scrollY;

      // Parallax anchor drift for subtle depth
      if (panelsRef.current) {
        panelsRef.current.style.transform = `translate3d(0, ${scrollY * -0.005}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="tattoo-container absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
    >
      <div
        ref={panelsRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none will-change-transform"
      >
        {/* ========================================================
            HERO SECTION DRAGON (Kept in its entirety!)
            Monumental East Asian dragon head, stag horns, wild mane,
            piercing gaze, whiskers, upper neck coils, moon & clouds
            ======================================================== */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1520px] aspect-[16/9] max-h-[920px] pointer-events-none opacity-35 lg:opacity-100"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              opacity: "var(--dragon-opacity)",
              mixBlendMode: "var(--dragon-blend)" as any,
              filter: "var(--dragon-filter)",
            }}
          >
            <Image
              src="/images/dragon-hero-v2.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1520px) 100vw, 1520px"
              className="object-contain object-top"
            />
          </div>
        </div>

        {/* ========================================================
            HERO SECTION LIVING WHISKERS (Vector Overlays around dragon muzzle)
            ======================================================== */}
        <svg
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1520px] aspect-[16/9] max-h-[920px] block pointer-events-none select-none z-20"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMin meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g ref={whiskerRef1} className="ink-ambient-whisker-1">
            <path
              d="M 760 220 C 860 250, 1020 230, 1160 300 S 1320 420, 1420 460"
              stroke="var(--tattoo-ink-accent)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M 740 240 C 830 280, 960 310, 1080 370 S 1240 480, 1340 520"
              stroke="var(--tattoo-ink)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </g>

          <g ref={whiskerRef2} className="ink-ambient-whisker-2">
            <path
              d="M 710 210 C 640 180, 520 190, 420 250 S 340 360, 280 400"
              stroke="var(--tattoo-ink-accent)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M 690 230 C 610 210, 500 230, 410 290 S 340 390, 290 430"
              stroke="var(--tattoo-ink)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* ========================================================
            EXTENSIVE NON-REPEATING ASIAN TATTOO ART SYSTEM (75 Bespoke Motifs)
            Authentic Japanese / East Asian ink & tattoo flash motifs
            Randomly & organically distributed down the page gutters & margins
            Subtle, non-blocking, non-distracting background layer
            ======================================================== */}

        {/* 01. DRAGON CLAW CLUTCHING SACRED PEARL (HOJU) (~980px, Right) */}
        <div className="hidden lg:block">
          <div
            className="absolute right-[3%] xl:right-[6%] pointer-events-none select-none opacity-[0.85]"
            style={{ top: "980px", width: "240px", height: "240px" }}
          >
          <svg viewBox="0 0 240 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="120" cy="120" r="32" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <circle cx="120" cy="120" r="24" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <path d="M 120 70 C 135 90, 110 100, 120 120" stroke="var(--tattoo-ink-accent)" strokeWidth="1.5" />
            <path d="M 128 78 C 145 92, 132 105, 124 116" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            {/* 3 Scaled Dragon Talons Gripping Sphere */}
            <path d="M 60 70 C 85 90, 105 105, 95 125 C 90 135, 80 130, 85 115" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 60 140 C 80 135, 105 130, 110 145 C 115 155, 100 155, 90 145" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 160 80 C 145 100, 135 110, 135 130 C 140 140, 150 130, 145 115" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />
            {/* Talon Claws */}
            <polygon points="95,125 105,122 98,132" fill="var(--tattoo-ink)" />
            <polygon points="110,145 118,140 114,152" fill="var(--tattoo-ink)" />
            <polygon points="135,130 128,135 130,122" fill="var(--tattoo-ink)" />
            {/* Flame Wisps */}
            <path d="M 115 65 C 110 45, 125 35, 120 20 C 130 35, 140 50, 125 65 Z" stroke="var(--tattoo-ink)" strokeWidth="1.4" fill="var(--tattoo-fill-wash)" />
          </svg>
        </div>

        {/* 02. MITSUDOMOE SHINTO VORTEX (~1050px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "1050px", width: "240px", height: "240px" }}
        >
          <svg viewBox="0 0 240 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="120" cy="120" r="105" stroke="var(--tattoo-ink)" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="120" cy="120" r="95" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <path d="M 120 40 C 150 40, 175 65, 175 95 C 175 125, 145 135, 120 120 C 120 80, 100 65, 120 40 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <path d="M 189 160 C 174 186, 142 196, 116 181 C 90 166, 92 135, 120 120 C 155 120, 168 98, 189 160 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <path d="M 51 160 C 36 134, 46 102, 72 87 C 98 72, 123 90, 120 120 C 85 120, 92 147, 51 160 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <circle cx="120" cy="120" r="6" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 03. KITSUNE SPIRIT FOX MASK (~1180px, Left [8%], rot -8deg) */}
        <div
          className="absolute left-[7%] xl:left-[9%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "1180px", width: "200px", height: "240px", transform: "rotate(-8deg)" }}
        >
          <svg viewBox="0 0 200 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 30 C 130 50, 160 80, 160 140 C 160 190, 125 220, 100 220 C 75 220, 40 190, 40 140 C 40 80, 70 50, 100 30 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Pointed Fox Ears */}
            <polygon points="50,90 25,35 70,60" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <polygon points="150,90 175,35 130,60" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            {/* Slanted Eyes */}
            <path d="M 60 125 C 75 115, 88 120, 90 128 C 85 135, 70 135, 60 125 Z" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-ink)" fillOpacity="0.4" />
            <path d="M 140 125 C 125 115, 112 120, 110 128 C 115 135, 130 135, 140 125 Z" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-ink)" fillOpacity="0.4" />
            {/* Red Vermilion Accent Whisker Marks */}
            <path d="M 45 150 C 60 155, 75 150, 85 145" stroke="var(--accent)" strokeWidth="1.8" strokeOpacity="0.45" strokeLinecap="round" />
            <path d="M 42 165 C 58 170, 72 165, 82 158" stroke="var(--accent)" strokeWidth="1.8" strokeOpacity="0.45" strokeLinecap="round" />
            <path d="M 155 150 C 140 155, 125 150, 115 145" stroke="var(--accent)" strokeWidth="1.8" strokeOpacity="0.45" strokeLinecap="round" />
            <path d="M 158 165 C 142 170, 128 165, 118 158" stroke="var(--accent)" strokeWidth="1.8" strokeOpacity="0.45" strokeLinecap="round" />
            {/* Snout & Nose */}
            <circle cx="100" cy="180" r="4" fill="var(--tattoo-ink)" />
            <path d="M 94 195 C 100 200, 106 200, 106 195" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
          </svg>
        </div>

        {/* 04. ZEN ENSO BRUSH RING & SPLATTER (~1280px, Right) */}
        <div
          className="absolute right-[4%] xl:right-[8%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "1280px", width: "320px", height: "320px" }}
        >
          <svg viewBox="0 0 340 340" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="170" cy="170" r="145" stroke="var(--tattoo-ink-faint)" strokeWidth="0.8" strokeDasharray="3 6" />
            <line x1="170" y1="15" x2="170" y2="325" stroke="var(--tattoo-ink-subtle)" strokeWidth="0.8" strokeDasharray="6 4" />
            <line x1="15" y1="170" x2="325" y2="170" stroke="var(--tattoo-ink-subtle)" strokeWidth="0.8" strokeDasharray="6 4" />
            <path d="M 170 38 C 240 38, 298 96, 298 170 C 298 244, 240 298, 166 298 C 96 298, 42 242, 42 170 C 42 110, 84 56, 142 42" stroke="var(--tattoo-ink)" strokeWidth="12" strokeLinecap="round" />
            <path d="M 175 42 C 235 44, 288 92, 288 168 C 288 238, 235 288, 168 288 C 104 288, 54 238, 54 172 C 54 120, 90 70, 140 50" stroke="var(--tattoo-ink-accent)" strokeWidth="3" strokeLinecap="round" />
            {[
              { cx: 305, cy: 110, r: 2.2 }, { cx: 315, cy: 140, r: 1.6 }, { cx: 295, cy: 260, r: 2.8 },
              { cx: 275, cy: 285, r: 1.8 }, { cx: 250, cy: 310, r: 2.2 }, { cx: 120, cy: 312, r: 2.0 },
              { cx: 30, cy: 210, r: 2.2 }, { cx: 50, cy: 80, r: 1.8 }
            ].map((d, i) => (
              <circle key={`enso-d-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="var(--tattoo-ink)" opacity="0.6" />
            ))}
          </svg>
        </div>

        {/* 05. FOUR-POINT IRON SHURIKEN (HIRA-SHURIKEN) (~1460px, Left [2%], rot 18deg) */}
        <div
          className="absolute left-[2%] xl:left-[4%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "1460px", width: "130px", height: "130px", transform: "rotate(18deg)" }}
        >
          <svg viewBox="0 0 130 130" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="65,10 75,55 120,65 75,75 65,120 55,75 10,65 55,55" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <circle cx="65" cy="65" r="14" stroke="var(--tattoo-ink)" strokeWidth="1.4" fill="var(--tattoo-fill-wash)" />
            <rect x="58" y="58" width="14" height="14" stroke="var(--tattoo-ink-accent)" strokeWidth="1.2" />
            {/* Bevel Edge Lines */}
            <line x1="65" y1="10" x2="65" y2="51" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <line x1="120" y1="65" x2="79" y2="65" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <line x1="65" y1="120" x2="65" y2="79" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <line x1="10" y1="65" x2="51" y2="65" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
          </svg>
        </div>

        {/* 06. SAMURAI KABUTO CREST HELMET (~1620px, Right [5%]) */}
        <div
          className="absolute right-[3%] xl:right-[6%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "1620px", width: "240px", height: "260px" }}
        >
          <svg viewBox="0 0 240 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Sweeping Kuwagata Antler Horn Crest */}
            <path d="M 120 70 C 100 40, 60 20, 20 25 C 40 45, 80 65, 110 80 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <path d="M 120 70 C 140 40, 180 20, 220 25 C 200 45, 160 65, 130 80 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Central Sun Crest Emblem (Maedate) */}
            <circle cx="120" cy="72" r="16" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <circle cx="120" cy="72" r="6" fill="var(--tattoo-ink)" />
            {/* Helmet Bowl (Hachi) */}
            <path d="M 60 120 C 60 85, 180 85, 180 120 C 180 140, 60 140, 60 120 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            {/* Shikoro Neck Guard Scales */}
            {[140, 160, 180, 200].map((y, i) => (
              <path key={`kabuto-s-${i}`} d={`M ${50 - i * 6} ${y} C 120 ${y + 8}, 120 ${y + 8}, ${190 + i * 6} ${y}`} stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="none" />
            ))}
            {/* Fukigaeshi Ear Flanges */}
            <polygon points="50,115 35,145 60,140" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <polygon points="190,115 205,145 180,140" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
          </svg>
        </div>

        {/* 07. TORII SACRED GATE IN MOUNTAIN MIST (~1850px, Left) */}
        <div
          className="absolute left-[2%] xl:left-[5%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "1850px", width: "260px", height: "240px" }}
        >
          <svg viewBox="0 0 260 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20 180 L 70 120 L 130 160 L 190 90 L 245 160" stroke="var(--tattoo-ink-faint)" strokeWidth="1.2" />
            <path d="M 30 55 C 80 50, 180 50, 230 55 L 225 68 C 175 64, 85 64, 35 68 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <rect x="45" y="88" width="170" height="9" stroke="var(--tattoo-ink)" strokeWidth="1.5" fill="var(--tattoo-fill-wash)" />
            <polygon points="75,68 85,68 88,210 72,210" stroke="var(--tattoo-ink-accent)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <polygon points="175,68 185,68 188,210 172,210" stroke="var(--tattoo-ink-accent)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <rect x="122" y="68" width="16" height="20" stroke="var(--tattoo-ink)" strokeWidth="1.2" />
            <path d="M 10 215 C 60 210, 120 220, 180 212 C 210 208, 240 218, 255 215" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" strokeDasharray="8 6" />
          </svg>
        </div>

        {/* 08. TWISTED ANCIENT BONSAI PINE (MATSU) (~2020px, Left [7%]) */}
        <div
          className="absolute left-[6%] xl:left-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "2020px", width: "240px", height: "260px" }}
        >
          <svg viewBox="0 0 240 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Gnarled Sinuous Trunk */}
            <path d="M 130 240 C 110 200, 140 160, 100 130 C 70 110, 90 70, 70 50" stroke="var(--tattoo-ink-accent)" strokeWidth="4.0" strokeLinecap="round" />
            <path d="M 100 130 C 130 120, 170 130, 180 110" stroke="var(--tattoo-ink-accent)" strokeWidth="2.8" strokeLinecap="round" />
            {/* Tiered Needle Cushions (Matsu Clouds) */}
            <path d="M 50 50 C 40 40, 90 30, 100 45 C 90 55, 60 60, 50 50 Z" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <path d="M 80 80 C 65 70, 120 60, 130 75 C 120 85, 95 90, 80 80 Z" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <path d="M 160 110 C 145 95, 205 90, 215 105 C 205 120, 175 125, 160 110 Z" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <path d="M 40 110 C 25 100, 75 90, 85 105 C 75 120, 55 120, 40 110 Z" stroke="var(--tattoo-ink)" strokeWidth="1.4" fill="var(--tattoo-fill-wash)" />
            {/* Fine Needle Radiance */}
            {[45, 75, 105, 135].map((x) => (
              <line key={`pine-n-${x}`} x1={x} y1="36" x2={x + 4} y2="28" stroke="var(--tattoo-ink-subtle)" strokeWidth="0.8" />
            ))}
          </svg>
        </div>

        {/* 09. SAMURAI KATANA BLADE & TSUKA WRAP (~2250px, Right) */}
        <div
          className="absolute right-[3%] xl:right-[7%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "2250px", width: "180px", height: "460px" }}
        >
          <svg viewBox="0 0 180 460" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 90 20 C 85 100, 78 220, 74 320 L 80 320 C 84 220, 92 100, 95 20 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <path d="M 88 35 C 84 75, 87 115, 82 155 C 86 195, 80 235, 83 275 C 78 295, 80 315, 76 320" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <line x1="90" y1="20" x2="80" y2="40" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <ellipse cx="77" cy="325" rx="30" ry="9" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="77" cy="325" r="4" fill="var(--tattoo-ink)" />
            <rect x="70" y="334" width="14" height="110" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            {[345, 360, 375, 390, 405, 420, 435].map((y) => (
              <g key={`tsuka-${y}`}>
                <line x1="70" y1={y} x2="84" y2={y + 8} stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
                <line x1="70" y1={y + 8} x2="84" y2={y} stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
              </g>
            ))}
            <rect x="68" y="444" width="18" height="8" rx="2" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <circle cx="120" cy="90" r="2" fill="var(--tattoo-ink)" opacity="0.6" />
            <circle cx="50" cy="180" r="1.5" fill="var(--tattoo-ink)" opacity="0.5" />
          </svg>
        </div>

        {/* 10. CHOCHIN PAPER LANTERN WITH KANJI '燈' (~2420px, Right [8%]) */}
        <div
          className="absolute right-[7%] xl:right-[10%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "2420px", width: "160px", height: "260px" }}
        >
          <svg viewBox="0 0 160 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="80" y1="10" x2="80" y2="40" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            <rect x="55" y="40" width="50" height="12" rx="2" stroke="var(--tattoo-ink-accent)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            {/* Ribbed Oval Paper Body */}
            <path d="M 55 52 C 25 70, 25 150, 55 170 L 105 170 C 135 150, 135 70, 105 52 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Rib Horizontals */}
            {[75, 95, 115, 135, 155].map((y) => (
              <line key={`chochin-r-${y}`} x1="36" y1={y} x2="124" y2={y} stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            ))}
            {/* Kanji Inscription: 燈 (Light) */}
            <path d="M 68 100 L 92 100 M 80 92 L 80 130 M 70 115 L 90 115 M 72 128 C 80 135, 88 135, 94 128" stroke="var(--tattoo-ink)" strokeWidth="1.8" strokeLinecap="round" />
            <rect x="60" y="170" width="40" height="10" rx="2" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            {/* Hanging Tassel */}
            <line x1="80" y1="180" x2="80" y2="230" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" />
            <circle cx="80" cy="186" r="4" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 11. ASCENDING KOI FISH & WATER VORTICES (~2600px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "2600px", width: "300px", height: "420px" }}
        >
          <svg viewBox="0 0 320 440" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 40 400 C 80 410, 150 380, 160 320 C 170 260, 100 230, 70 260 C 40 290, 70 340, 110 340" stroke="var(--tattoo-ink-faint)" strokeWidth="1.4" />
            <path d="M 160 50 C 130 80, 110 150, 125 230 C 135 280, 160 320, 170 370 M 170 370 C 155 390, 135 410, 125 430 M 170 370 C 185 390, 205 415, 220 430" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 160 50 C 175 35, 195 40, 200 58 C 205 75, 190 95, 175 100 Z" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <path d="M 195 42 C 220 30, 250 35, 270 50" stroke="var(--tattoo-ink)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 165 38 C 145 25, 120 30, 105 45" stroke="var(--tattoo-ink)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 175 100 C 210 140, 225 200, 215 260 C 205 310, 185 345, 170 370" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            {["M 145 140 Q 165 150, 185 140", "M 140 165 Q 165 175, 190 165", "M 142 190 Q 170 202, 195 190", "M 146 215 Q 172 228, 198 215", "M 150 240 Q 175 252, 195 240"].map((d, i) => (
              <path key={`koi-s-${i}`} d={d} stroke="var(--tattoo-ink-subtle)" strokeWidth="1.3" strokeLinecap="round" />
            ))}
            <path d="M 130 150 C 85 160, 60 200, 50 230 C 75 225, 110 200, 128 180" stroke="var(--tattoo-ink)" strokeWidth="1.5" fill="var(--tattoo-fill-wash)" />
            <path d="M 205 145 C 245 155, 275 185, 285 215 C 260 210, 230 190, 212 170" stroke="var(--tattoo-ink)" strokeWidth="1.5" fill="var(--tattoo-fill-wash)" />
          </svg>
        </div>

        {/* 12. KAMON CREST: CROSSED FALCON FEATHERS (~2850px, Right [5%]) */}
        <div
          className="absolute right-[4%] xl:right-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "2850px", width: "190px", height: "190px" }}
        >
          <svg viewBox="0 0 190 190" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="95" cy="95" r="85" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            <circle cx="95" cy="95" r="76" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            {/* Feather 1 (Top-Left to Bottom-Right) */}
            <path d="M 45 45 C 75 75, 115 115, 145 145 C 135 150, 125 140, 95 110 Z" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <line x1="45" y1="45" x2="145" y2="145" stroke="var(--tattoo-ink-accent)" strokeWidth="1.6" />
            {/* Feather 2 (Top-Right to Bottom-Left) */}
            <path d="M 145 45 C 115 75, 75 115, 45 145 C 55 150, 65 140, 95 110 Z" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <line x1="145" y1="45" x2="45" y2="145" stroke="var(--tattoo-ink-accent)" strokeWidth="1.6" />
          </svg>
        </div>

        {/* 13. OFUDA SHINTO TALISMAN CHARM (~2980px, Left [2%], rot -5deg) */}
        <div
          className="absolute left-[2%] xl:left-[4%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "2980px", width: "140px", height: "300px", transform: "rotate(-5deg)" }}
        >
          <svg viewBox="0 0 140 300" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="70,15 125,50 125,280 15,280 15,50" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <polygon points="70,25 115,55 115,270 25,270 25,55" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            {/* Lightning Incantation Header */}
            <path d="M 70 60 L 60 75 L 80 80 L 65 105 L 75 105" stroke="var(--tattoo-ink)" strokeWidth="1.8" strokeLinecap="round" />
            {/* Red Vermilion Chop */}
            <rect x="45" y="120" width="50" height="50" rx="3" stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            <circle cx="70" cy="145" r="14" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.40" />
            {/* Sacred Cryptic Characters */}
            <line x1="70" y1="185" x2="70" y2="245" stroke="var(--tattoo-ink)" strokeWidth="2.2" />
            <line x1="45" y1="205" x2="95" y2="205" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            <line x1="50" y1="225" x2="90" y2="225" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
          </svg>
        </div>

        {/* 14. STYLIZED ASIAN CLOUD SCROLLS (KUMO) (~3100px, Right) */}
        <div
          className="absolute right-[4%] xl:right-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "3100px", width: "320px", height: "200px" }}
        >
          <svg viewBox="0 0 320 200" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30 140 C 30 110, 60 90, 90 95 C 100 65, 135 50, 170 60 C 205 45, 245 60, 260 90 C 290 90, 310 115, 300 140 C 290 170, 260 175, 230 165 C 200 180, 150 185, 120 165 C 80 175, 30 170, 30 140 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <path d="M 90 95 C 95 115, 115 125, 135 120 C 150 115, 155 100, 145 85 C 135 70, 110 75, 110 90" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <path d="M 230 165 C 215 150, 205 130, 215 115 C 225 100, 245 105, 250 120" stroke="var(--tattoo-ink)" strokeWidth="1.2" />
            <line x1="10" y1="120" x2="60" y2="120" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            <line x1="260" y1="80" x2="315" y2="80" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            <line x1="270" y1="155" x2="310" y2="155" stroke="var(--tattoo-ink-faint)" strokeWidth="1.0" />
          </svg>
        </div>

        {/* 15. KUSARIGAMA SICKLE & STEEL CHAIN (~3380px, Left [5%]) */}
        <div
          className="absolute left-[4%] xl:left-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "3380px", width: "220px", height: "340px" }}
        >
          <svg viewBox="0 0 220 340" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="70" y1="60" x2="70" y2="240" stroke="var(--tattoo-ink)" strokeWidth="2.2" />
            <path d="M 70 70 C 100 50, 150 50, 180 80 C 140 85, 100 90, 70 95 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Looping Chain Links */}
            <path d="M 70 240 C 90 270, 130 270, 150 240 C 170 210, 130 170, 160 140" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.6" strokeDasharray="5 5" fill="none" />
            {/* Iron Ball Weight (Fundo) */}
            <circle cx="160" cy="140" r="14" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="160" cy="140" r="4" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 16. DARUMA DOLL ROUND OUTLINE & FOCUS GAZE (~3650px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "3650px", width: "240px", height: "260px" }}
        >
          <svg viewBox="0 0 240 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 120 30 C 170 30, 210 70, 210 130 C 210 195, 175 230, 120 230 C 65 230, 30 195, 30 130 C 30 70, 70 30, 120 30 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            <path d="M 70 90 C 70 65, 170 65, 170 90 C 170 120, 190 140, 170 170 C 150 190, 90 190, 70 170 C 50 140, 70 120, 70 90 Z" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            <path d="M 80 85 C 95 78, 110 82, 115 90 M 160 85 C 145 78, 130 82, 125 90" stroke="var(--tattoo-ink)" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="95" cy="108" r="14" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            <circle cx="95" cy="108" r="6" fill="var(--tattoo-ink)" />
            <circle cx="145" cy="108" r="14" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            <circle cx="145" cy="108" r="6" fill="var(--tattoo-ink)" />
            <path d="M 90 135 C 105 142, 135 142, 150 135 M 95 150 C 110 160, 130 160, 145 150" stroke="var(--tattoo-ink)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* 17. TENGU SPIRIT MOUNTAIN MASK (~3880px, Right [4%], rot 6deg) */}
        <div
          className="absolute right-[3%] xl:right-[6%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "3880px", width: "200px", height: "260px", transform: "rotate(6deg)" }}
        >
          <svg viewBox="0 0 200 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="100,20 115,40 85,40" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <path d="M 50 70 C 80 50, 120 50, 150 70 C 165 110, 150 190, 100 200 C 50 190, 35 110, 50 70 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Long Beak Nose */}
            <polygon points="90,110 100,165 110,110" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <ellipse cx="100" cy="165" rx="12" ry="7" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            {/* Fierce Eyes */}
            <circle cx="75" cy="115" r="9" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            <circle cx="75" cy="115" r="3.5" fill="var(--tattoo-ink)" />
            <circle cx="125" cy="115" r="9" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            <circle cx="125" cy="115" r="3.5" fill="var(--tattoo-ink)" />
            <path d="M 75 190 C 90 200, 110 200, 125 190" stroke="var(--tattoo-ink)" strokeWidth="2.0" />
          </svg>
        </div>

        {/* 18. KANJI SEAL CHOP '忍' (SHINOBI) (~4020px, Left [8%]) */}
        <div
          className="absolute left-[7%] xl:left-[9%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "4020px", width: "100px", height: "120px" }}
        >
          <svg viewBox="0 0 100 120" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="100" rx="6" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            <rect x="16" y="16" width="68" height="88" rx="3" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.30" />
            {/* Kanji 忍: 刃 over 心 */}
            <path d="M 30 35 L 70 35 M 48 24 L 48 55 M 34 50 L 66 50 M 60 42 L 64 48" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" strokeLinecap="round" />
            <path d="M 35 75 C 45 88, 55 90, 68 85 M 45 78 L 48 83 M 60 76 L 63 81" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" strokeLinecap="round" />
          </svg>
        </div>

        {/* 19. SACRED ASTROLABE & OPTICAL RAY MATRIX (~4200px, Right) */}
        <div
          className="absolute right-[4%] xl:right-[7%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "4200px", width: "350px", height: "350px" }}
        >
          <svg viewBox="0 0 360 360" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="180" cy="180" r="165" stroke="var(--tattoo-ink-faint)" strokeWidth="1" />
            <circle cx="180" cy="180" r="155" stroke="var(--tattoo-ink)" strokeWidth="1.2" strokeDasharray="4 8" />
            <circle cx="180" cy="180" r="130" stroke="var(--tattoo-ink-subtle)" strokeWidth="0.8" />
            <path d="M 180 30 L 192 145 L 305 180 L 192 215 L 180 330 L 168 215 L 55 180 L 168 145 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <polygon points="180,125 228,152 228,208 180,235 132,208 132,152" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <circle cx="180" cy="180" r="16" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" />
            <circle cx="180" cy="180" r="4" fill="var(--tattoo-ink)" />
            <line x1="30" y1="140" x2="132" y2="180" stroke="var(--tattoo-ink)" strokeWidth="1.2" />
            <line x1="228" y1="180" x2="330" y2="120" stroke="var(--tattoo-ink-accent)" strokeWidth="1.2" strokeDasharray="6 3" />
          </svg>
        </div>

        {/* 20. JAPANESE RIVER TOAD WITH COIN (KAERU) (~4480px, Left [4%]) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "4480px", width: "220px", height: "200px" }}
        >
          <svg viewBox="0 0 220 200" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 60 70 C 60 40, 160 40, 160 70 C 185 100, 185 150, 150 170 C 110 180, 80 180, 50 160 C 35 140, 35 100, 60 70 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Protruding Eyes */}
            <circle cx="75" cy="55" r="16" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <circle cx="75" cy="55" r="6" fill="var(--tattoo-ink)" />
            <circle cx="145" cy="55" r="16" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <circle cx="145" cy="55" r="6" fill="var(--tattoo-ink)" />
            {/* Square-Hole Coin in Mouth */}
            <circle cx="110" cy="115" r="22" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <rect x="102" y="107" width="16" height="16" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            {/* Webbed Feet Outline */}
            <path d="M 40 140 C 20 150, 20 170, 45 175" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            <path d="M 180 140 C 200 150, 200 170, 175 175" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
          </svg>
        </div>

        {/* 21. JAPANESE FOLDING FAN (SENSU) WITH RISING SUN (~4750px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "4750px", width: "320px", height: "240px" }}
        >
          <svg viewBox="0 0 320 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 160 210 L 40 80 C 80 40, 240 40, 280 80 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <path d="M 160 210 L 80 120 C 105 95, 215 95, 240 120 Z" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            {[60, 90, 120, 150, 180, 210, 240, 260].map((x, i) => (
              <line key={`fan-rib-${i}`} x1="160" y1="210" x2={x} y2={65} stroke="var(--tattoo-ink-faint)" strokeWidth="1.0" />
            ))}
            <circle cx="160" cy="95" r="28" stroke="var(--tattoo-accent)" strokeWidth="1.5" strokeOpacity="0.4" fill="var(--accent)" fillOpacity="0.04" />
            <circle cx="160" cy="210" r="5" fill="var(--tattoo-ink)" />
            <path d="M 160 215 C 155 228, 165 228, 160 238" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
          </svg>
        </div>

        {/* 22. SAMURAI TSUBA IRON HANDGUARD (~4980px, Right [7%], rot -12deg) */}
        <div
          className="absolute right-[5%] xl:right-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "4980px", width: "190px", height: "190px", transform: "rotate(-12deg)" }}
        >
          <svg viewBox="0 0 190 190" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="95" cy="95" rx="80" ry="86" stroke="var(--tattoo-ink-accent)" strokeWidth="2.4" fill="var(--tattoo-fill-wash)" />
            <ellipse cx="95" cy="95" rx="72" ry="78" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" strokeDasharray="4 6" />
            {/* Nakago-ana (Central Blade Hole) */}
            <path d="M 90 60 L 100 60 L 103 130 L 87 130 Z" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            {/* Inome Heart/Boar-Eye Piercing Cutouts */}
            <path d="M 55 95 C 50 85, 65 75, 70 85 C 75 75, 90 85, 85 95 C 78 105, 65 110, 55 95 Z" stroke="var(--tattoo-ink)" strokeWidth="1.4" fill="var(--tattoo-fill-wash)" />
            <path d="M 135 95 C 140 85, 125 75, 120 85 C 115 75, 100 85, 105 95 C 112 105, 125 110, 135 95 Z" stroke="var(--tattoo-ink)" strokeWidth="1.4" fill="var(--tattoo-fill-wash)" />
          </svg>
        </div>

        {/* 23. MOUNT FUJI WITH SUN & MIST STRATA (~5120px, Left [2%]) */}
        <div
          className="absolute left-[2%] xl:left-[4%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "5120px", width: "280px", height: "220px" }}
        >
          <svg viewBox="0 0 280 220" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Sun Disc */}
            <circle cx="140" cy="70" r="38" stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            {/* Symmetrical Mountain Profile */}
            <path d="M 20 180 C 80 170, 105 130, 120 70 L 160 70 C 175 130, 200 170, 260 180 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            {/* Snow Cap Jagged Line */}
            <path d="M 115 105 L 125 115 L 132 108 L 140 120 L 148 110 L 155 118 L 165 105" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            {/* Horizontal Clouds */}
            <line x1="10" y1="150" x2="90" y2="150" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            <line x1="190" y1="160" x2="270" y2="160" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* 24. SUMI-E TIGER (TORA) SHADOW & CLAW SLASHER (~5300px, Right) */}
        <div
          className="absolute right-[3%] xl:right-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "5300px", width: "280px", height: "300px" }}
        >
          <svg viewBox="0 0 280 300" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 60 C 90 90, 170 130, 240 160" stroke="var(--tattoo-ink-accent)" strokeWidth="3.0" strokeLinecap="round" />
            <path d="M 35 110 C 80 145, 160 190, 230 220" stroke="var(--tattoo-ink-accent)" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 55 165 C 100 200, 170 240, 225 270" stroke="var(--tattoo-ink-accent)" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M 140 40 L 140 90 M 120 50 L 105 80 M 160 50 L 175 80 M 110 95 L 90 120 M 170 95 L 190 120" stroke="var(--tattoo-ink)" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="140" cy="40" r="3" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 25. KANJI SEAL CHOP '龍' (RYU / DRAGON) (~5550px, Left [7%]) */}
        <div
          className="absolute left-[6%] xl:left-[8%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "5550px", width: "110px", height: "130px" }}
        >
          <svg viewBox="0 0 110 130" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="12" width="86" height="106" rx="8" stroke="var(--tattoo-ink)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <rect x="18" y="18" width="74" height="94" rx="4" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            {/* Calligraphic 龍 */}
            <path d="M 32 35 L 50 35 M 40 28 L 40 65 M 30 50 L 52 50 M 34 65 L 50 65" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 60 30 L 82 30 M 70 30 L 70 70 M 60 50 L 82 50 M 60 70 L 82 70" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 38 85 C 50 100, 70 100, 80 85 M 50 90 L 52 98 M 62 90 L 64 98" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" strokeLinecap="round" />
          </svg>
        </div>

        {/* 26. NAGINATA CURVED POLEARM WITH SILK STREAMER (~5680px, Right [2%]) */}
        <div
          className="absolute right-[2%] xl:right-[4%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "5680px", width: "160px", height: "420px" }}
        >
          <svg viewBox="0 0 160 420" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="80" y1="120" x2="80" y2="400" stroke="var(--tattoo-ink)" strokeWidth="2.2" />
            <path d="M 80 120 C 75 80, 85 45, 115 15 C 95 40, 88 80, 80 120 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <rect x="74" y="120" width="12" height="14" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            {/* Flowing Silk Ribbon */}
            <path d="M 80 134 C 110 145, 130 180, 100 200 C 70 220, 110 250, 130 280" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* 27. ORIGAMI FALCON IN FLIGHT (~5900px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[7%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "5900px", width: "320px", height: "280px" }}
        >
          <svg viewBox="0 0 340 300" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20 220 C 80 200, 160 210, 240 180 C 280 165, 310 140, 325 110" stroke="var(--tattoo-ink-faint)" strokeWidth="1.5" strokeDasharray="8 6" />
            <polygon points="285,115 320,110 290,130" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <polygon points="210,135 285,115 190,30" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <polygon points="190,30 210,135 150,85" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <polygon points="210,135 250,185 160,210" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <polygon points="210,135 120,160 80,185 105,150" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <circle cx="190" cy="30" r="3" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 28. KAMON CREST: MITSUUROKO (THREE DRAGON TRIANGLES) (~6180px, Right [7%]) */}
        <div
          className="absolute right-[5%] xl:right-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "6180px", width: "170px", height: "170px" }}
        >
          <svg viewBox="0 0 170 170" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="85" cy="85" r="75" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="85" cy="85" r="67" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            {/* Top Triangle */}
            <polygon points="85,35 115,85 55,85" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            {/* Bottom-Left Triangle */}
            <polygon points="55,85 85,135 25,135" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            {/* Bottom-Right Triangle */}
            <polygon points="115,85 145,135 85,135" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
          </svg>
        </div>

        {/* 29. JAPANESE GRANITE STONE LANTERN (TORO) (~6320px, Left [4%]) */}
        <div
          className="absolute left-[3%] xl:left-[5%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "6320px", width: "200px", height: "300px" }}
        >
          <svg viewBox="0 0 200 300" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="25" r="10" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            {/* Hexagonal Kasa Roof */}
            <polygon points="100,35 160,75 145,85 55,85 40,75" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Firebox (Hibukuro) */}
            <rect x="65" y="85" width="70" height="55" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <line x1="100" y1="85" x2="100" y2="140" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.4" />
            <circle cx="100" cy="112" r="12" stroke="var(--tattoo-ink-accent)" strokeWidth="1.4" />
            {/* Pedestal & Base */}
            <polygon points="50,140 150,140 135,160 65,160" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <rect x="80" y="160" width="40" height="85" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" />
            <rect x="55" y="245" width="90" height="30" rx="3" stroke="var(--tattoo-ink)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
          </svg>
        </div>

        {/* 30. SEIGAIHA OVERLAPPING SEA WAVES PATTERN (~6500px, Right) */}
        <div
          className="absolute right-[4%] xl:right-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "6500px", width: "280px", height: "240px" }}
        >
          <svg viewBox="0 0 280 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {[
              { cx: 70, cy: 80 }, { cx: 140, cy: 80 }, { cx: 210, cy: 80 },
              { cx: 35, cy: 130 }, { cx: 105, cy: 130 }, { cx: 175, cy: 130 }, { cx: 245, cy: 130 },
              { cx: 70, cy: 180 }, { cx: 140, cy: 180 }, { cx: 210, cy: 180 },
            ].map((w, idx) => (
              <g key={`seigaiha-${idx}`}>
                <path d={`M ${w.cx - 35} ${w.cy} A 35 35 0 0 1 ${w.cx + 35} ${w.cy}`} stroke="var(--tattoo-ink)" strokeWidth="1.4" />
                <path d={`M ${w.cx - 26} ${w.cy} A 26 26 0 0 1 ${w.cx + 26} ${w.cy}`} stroke="var(--tattoo-ink-subtle)" strokeWidth="1.1" />
                <path d={`M ${w.cx - 17} ${w.cy} A 17 17 0 0 1 ${w.cx + 17} ${w.cy}`} stroke="var(--tattoo-ink-subtle)" strokeWidth="0.9" />
                <path d={`M ${w.cx - 8} ${w.cy} A 8 8 0 0 1 ${w.cx + 8} ${w.cy}`} stroke="var(--tattoo-ink-faint)" strokeWidth="0.8" />
              </g>
            ))}
          </svg>
        </div>

        {/* 31. EIGHT-SPOKE WHEEL OF LAW (RINBO / DHARMA) (~6780px, Left [6%], rot 15deg) */}
        <div
          className="absolute left-[5%] xl:left-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "6780px", width: "200px", height: "200px", transform: "rotate(15deg)" }}
        >
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="85" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            <circle cx="100" cy="100" r="70" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <circle cx="100" cy="100" r="26" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="100" cy="100" r="8" fill="var(--tattoo-ink)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 100 + 26 * Math.cos(rad);
              const y1 = 100 + 26 * Math.sin(rad);
              const x2 = 100 + 70 * Math.cos(rad);
              const y2 = 100 + 70 * Math.sin(rad);
              return <line key={`rinbo-spoke-${deg}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--tattoo-ink)" strokeWidth="1.8" />;
            })}
          </svg>
        </div>

        {/* 32. TSUBAME SWALLOWS & WIND GUSTS (~6920px, Right [3%]) */}
        <div
          className="absolute right-[2%] xl:right-[5%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "6920px", width: "220px", height: "200px" }}
        >
          <svg viewBox="0 0 220 200" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Diving Swallow Silhouette */}
            <path d="M 60 120 C 85 90, 130 80, 160 50 C 145 75, 140 100, 155 120 C 130 115, 110 125, 90 145 L 80 180 L 95 155 L 70 160 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <line x1="20" y1="90" x2="90" y2="70" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" strokeDasharray="6 4" />
            <line x1="120" y1="40" x2="190" y2="25" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* 33. JAPANESE PAGODA TEMPLE SILHOUETTE (~7100px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.78]"
          style={{ top: "7100px", width: "240px", height: "360px" }}
        >
          <svg viewBox="0 0 240 360" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="120" y1="20" x2="120" y2="70" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" />
            <circle cx="120" cy="22" r="3" fill="var(--tattoo-ink)" />
            {[32, 40, 48, 56, 64].map((y) => (
              <ellipse key={`sorin-${y}`} cx="120" cy={y} rx="6" ry="2" stroke="var(--tattoo-ink)" strokeWidth="1.2" />
            ))}
            {[
              { y: 70, w: 70, h: 14 },
              { y: 110, w: 90, h: 16 },
              { y: 155, w: 115, h: 18 },
              { y: 205, w: 140, h: 22 },
              { y: 265, w: 170, h: 26 },
            ].map((r, i) => (
              <g key={`roof-${i}`}>
                <path d={`M ${120 - r.w / 2} ${r.y + r.h} C ${120 - r.w / 4} ${r.y + r.h - 5}, ${120 + r.w / 4} ${r.y + r.h - 5}, ${120 + r.w / 2} ${r.y + r.h} L ${120 + r.w / 2 - 12} ${r.y} L ${120 - r.w / 2 + 12} ${r.y} Z`} stroke="var(--tattoo-ink-accent)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
                <line x1={120 - r.w / 2} y1={r.y + r.h} x2={120 - r.w / 2 - 4} y2={r.y + r.h - 4} stroke="var(--tattoo-ink)" strokeWidth="1.4" />
                <line x1={120 + r.w / 2} y1={r.y + r.h} x2={120 + r.w / 2 + 4} y2={r.y + r.h - 4} stroke="var(--tattoo-ink)" strokeWidth="1.4" />
              </g>
            ))}
            <rect x="65" y="291" width="110" height="40" stroke="var(--tattoo-ink)" strokeWidth="1.5" />
            <line x1="120" y1="291" x2="120" y2="331" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* 34. HYOTAN SACRED GOURD OF INK (~7350px, Right [6%], rot -8deg) */}
        <div
          className="absolute right-[5%] xl:right-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "7350px", width: "160px", height: "260px", transform: "rotate(-8deg)" }}
        >
          <svg viewBox="0 0 160 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="74" y="20" width="12" height="15" rx="2" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            {/* Upper Chamber */}
            <circle cx="80" cy="70" r="32" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Tied Red Ribbon Cord */}
            <rect x="70" y="98" width="20" height="8" rx="2" stroke="var(--accent)" strokeWidth="1.8" strokeOpacity="0.5" fill="var(--accent)" fillOpacity="0.05" />
            {/* Lower Chamber */}
            <circle cx="80" cy="165" r="52" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            <circle cx="80" cy="165" r="42" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* 35. DUAL HANKO VERMILION SEAL & TECH VERIFICATION (~7600px, Right) */}
        <div
          className="absolute right-[4%] xl:right-[7%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "7600px", width: "260px", height: "300px" }}
        >
          <svg viewBox="0 0 260 300" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="30" width="120" height="120" rx="10" stroke="var(--accent)" strokeWidth="2.2" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.03" />
            <rect x="48" y="38" width="104" height="104" rx="6" stroke="var(--accent)" strokeWidth="1.0" strokeOpacity="0.30" />
            <path d="M 70 60 L 130 60 M 100 60 L 100 120 M 78 85 L 122 85 M 82 110 L 118 110" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="square" strokeOpacity="0.45" />
            <circle cx="100" cy="90" r="20" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.30" />
            <circle cx="155" cy="190" r="50" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            <circle cx="155" cy="190" r="44" stroke="var(--tattoo-ink-subtle)" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="155" y1="130" x2="155" y2="250" stroke="var(--tattoo-ink-subtle)" strokeWidth="0.8" />
            <line x1="95" y1="190" x2="215" y2="190" stroke="var(--tattoo-ink-subtle)" strokeWidth="0.8" />
            <circle cx="155" cy="190" r="5" stroke="var(--tattoo-ink-accent)" strokeWidth="1.4" />
            <text x="155" y="170" textAnchor="middle" fill="var(--tattoo-ink)" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.8">SPEC // 2026</text>
            <text x="155" y="218" textAnchor="middle" fill="var(--tattoo-ink)" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.8">VERIFIED</text>
          </svg>
        </div>

        {/* 36. KANJI SEAL CHOP '刃' (YAIBA / BLADE EDGE) (~7850px, Left [3%]) */}
        <div
          className="absolute left-[3%] xl:left-[5%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "7850px", width: "100px", height: "120px" }}
        >
          <svg viewBox="0 0 100 120" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="100" rx="8" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            <path d="M 30 35 L 68 35 M 50 25 L 50 85 M 32 60 L 68 60 M 34 85 L 66 85 M 58 45 L 64 52" stroke="var(--accent)" strokeWidth="2.2" strokeOpacity="0.45" strokeLinecap="round" />
          </svg>
        </div>

        {/* 37. KURIKARA FLAMING DRAGON SWORD (~8020px, Right [4%]) */}
        <div
          className="absolute right-[3%] xl:right-[6%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "8020px", width: "180px", height: "420px" }}
        >
          <svg viewBox="0 0 180 420" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="90,20 102,240 78,240" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <line x1="90" y1="30" x2="90" y2="235" stroke="var(--tattoo-ink)" strokeWidth="1.5" />
            {/* Coiling Serpent/Dragon Silhouette */}
            <path d="M 60 70 C 120 50, 130 110, 85 130 C 50 150, 130 180, 95 210" stroke="var(--tattoo-ink-accent)" strokeWidth="2.4" strokeLinecap="round" />
            {/* Roaring Flame Wreath */}
            <path d="M 70 40 C 45 60, 50 100, 65 110 M 110 50 C 135 70, 125 110, 110 120 M 120 150 C 145 170, 130 210, 115 220" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.6" />
            {/* Vajra Hilt */}
            <circle cx="90" cy="255" r="14" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <line x1="90" y1="269" x2="90" y2="350" stroke="var(--tattoo-ink)" strokeWidth="2.2" />
          </svg>
        </div>

        {/* 38. SUMI-E BAMBOO STALKS & INK LEAVES (TAKE) (~8250px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "8250px", width: "240px", height: "420px" }}
        >
          <svg viewBox="0 0 240 420" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {[
              { y: 30, h: 70, w: 14 },
              { y: 105, h: 80, w: 15 },
              { y: 190, h: 85, w: 16 },
              { y: 280, h: 90, w: 17 },
            ].map((st, i) => (
              <g key={`bamboo-${i}`}>
                <rect x={100 - st.w / 2} y={st.y} width={st.w} height={st.h} rx="2" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
                <ellipse cx="100" cy={st.y + st.h} rx={st.w / 2 + 3} ry="3" stroke="var(--tattoo-ink)" strokeWidth="2.0" />
              </g>
            ))}
            {[
              "M 105 105 C 130 110, 160 100, 195 90 C 170 105, 140 120, 105 110 Z",
              "M 105 108 C 125 125, 155 130, 185 135 C 160 138, 130 135, 105 115 Z",
              "M 95 190 C 70 185, 40 190, 15 175 C 40 192, 70 200, 95 195 Z",
              "M 95 195 C 65 210, 45 225, 20 245 C 50 230, 75 220, 95 200 Z",
              "M 105 280 C 135 270, 170 265, 205 250 C 175 270, 140 282, 105 285 Z",
            ].map((d, i) => (
              <path key={`bamboo-leaf-${i}`} d={d} stroke="var(--tattoo-ink)" strokeWidth="1.4" fill="var(--tattoo-fill-wash)" />
            ))}
          </svg>
        </div>

        {/* 39. ONI SPIKED IRON CLUB (KANABO) (~8520px, Left [5%], rot 12deg) */}
        <div
          className="absolute left-[4%] xl:left-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "8520px", width: "150px", height: "360px", transform: "rotate(12deg)" }}
        >
          <svg viewBox="0 0 150 360" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="65,30 85,30 95,260 55,260" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            {/* Heavy Studs */}
            {[50, 80, 110, 140, 170, 200, 230].map((y) => (
              <g key={`kanabo-stud-${y}`}>
                <circle cx="63" cy={y} r="3" fill="var(--tattoo-ink)" />
                <circle cx="75" cy={y} r="3.5" fill="var(--tattoo-ink)" />
                <circle cx="87" cy={y} r="3" fill="var(--tattoo-ink)" />
              </g>
            ))}
            <rect x="68" y="260" width="14" height="70" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            <circle cx="75" cy="338" r="8" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
          </svg>
        </div>

        {/* 40. RAIJIN THUNDER DRUM RING (TAIKO WITH TOMOE) (~8800px, Right) */}
        <div
          className="absolute right-[3%] xl:right-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "8800px", width: "300px", height: "300px" }}
        >
          <svg viewBox="0 0 300 300" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="120" stroke="var(--tattoo-ink-faint)" strokeWidth="1.2" strokeDasharray="4 6" />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const cx = 150 + 100 * Math.cos(rad);
              const cy = 150 + 100 * Math.sin(rad);
              return (
                <g key={`taiko-${deg}`}>
                  <circle cx={cx} cy={cy} r="22" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
                  <circle cx={cx} cy={cy} r="18" stroke="var(--tattoo-ink-subtle)" strokeWidth="0.8" />
                  <path d={`M ${cx} ${cy - 8} C ${cx + 7} ${cy - 8}, ${cx + 10} ${cy}, ${cx + 4} ${cy + 6} C ${cx - 2} ${cy + 10}, ${cx - 6} ${cy + 4}, ${cx - 4} ${cy - 2} Z`} stroke="var(--tattoo-ink)" strokeWidth="1.2" fill="var(--tattoo-ink)" fillOpacity="0.4" />
                </g>
              );
            })}
            <path d="M 150 115 L 145 145 L 160 148 L 150 185" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* 41. FURIN WIND CHIME WITH TANZAKU SLIP (~9050px, Left [2%]) */}
        <div
          className="absolute left-[2%] xl:left-[4%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "9050px", width: "140px", height: "260px" }}
        >
          <svg viewBox="0 0 140 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="70" y1="10" x2="70" y2="40" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <path d="M 40 80 C 40 45, 100 45, 100 80 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="70" cy="80" r="5" fill="var(--tattoo-ink)" />
            <line x1="70" y1="80" x2="70" y2="130" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            {/* Fluttering Paper Strip */}
            <rect x="58" y="130" width="24" height="100" stroke="var(--tattoo-ink-accent)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <line x1="70" y1="145" x2="70" y2="215" stroke="var(--tattoo-ink)" strokeWidth="1.4" strokeDasharray="6 4" />
          </svg>
        </div>

        {/* 42. KAMON CREST: KIKYO (FIVE-POINT BELLFLOWER) (~9180px, Right [7%]) */}
        <div
          className="absolute right-[5%] xl:right-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "9180px", width: "170px", height: "170px" }}
        >
          <svg viewBox="0 0 170 170" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="85" cy="85" r="75" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="85" cy="85" r="67" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            {/* 5 Symmetrical Petals */}
            {[0, 72, 144, 216, 288].map((deg) => {
              const rad = ((deg - 90) * Math.PI) / 180;
              const tipX = 85 + 55 * Math.cos(rad);
              const tipY = 85 + 55 * Math.sin(rad);
              return <line key={`kikyo-petal-${deg}`} x1="85" y1="85" x2={tipX} y2={tipY} stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />;
            })}
            <circle cx="85" cy="85" r="14" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
          </svg>
        </div>

        {/* 43. SACRED POLYHEDRON & ALGORITHM LATTICE (~9350px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[7%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "9350px", width: "340px", height: "340px" }}
        >
          <svg viewBox="0 0 360 360" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="180" cy="180" rx="160" ry="60" transform="rotate(-25 180 180)" stroke="var(--tattoo-ink-faint)" strokeWidth="1.2" strokeDasharray="6 6" />
            <polygon points="180,60 275,115 275,225 180,280 85,225 85,115" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <polygon points="180,110 235,205 125,205" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            <line x1="180" y1="60" x2="180" y2="110" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <line x1="275" y1="115" x2="180" y2="110" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <line x1="85" y1="115" x2="180" y2="110" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <line x1="275" y1="225" x2="235" y2="205" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <line x1="180" y1="280" x2="235" y2="205" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <line x1="180" y1="280" x2="125" y2="205" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <line x1="85" y1="225" x2="125" y2="205" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            {[
              { x: 180, y: 60 }, { x: 275, y: 115 }, { x: 275, y: 225 }, { x: 180, y: 280 },
              { x: 85, y: 225 }, { x: 85, y: 115 }, { x: 180, y: 110 }, { x: 235, y: 205 }, { x: 125, y: 205 }
            ].map((p, i) => (
              <circle key={`poly-n-${i}`} cx={p.x} cy={p.y} r="3.5" fill="var(--tattoo-ink)" />
            ))}
          </svg>
        </div>

        {/* 44. SAMURAI BATTLE SIGNAL FAN (GUNBAI) (~9620px, Right [3%], rot -10deg) */}
        <div
          className="absolute right-[2%] xl:right-[5%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "9620px", width: "200px", height: "260px", transform: "rotate(-10deg)" }}
        >
          <svg viewBox="0 0 200 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="100" y1="30" x2="100" y2="240" stroke="var(--tattoo-ink)" strokeWidth="2.2" />
            {/* Gourd-Shaped Rigid Fan Plate */}
            <path d="M 100 40 C 60 40, 45 75, 60 105 C 40 135, 55 180, 100 180 C 145 180, 160 135, 140 105 C 155 75, 140 40, 100 40 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            <circle cx="100" cy="110" r="16" stroke="var(--accent)" strokeWidth="1.8" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
          </svg>
        </div>

        {/* 45. KIKKO TORTOISE SHELL HEXAGONAL ARMOR (~9750px, Left [8%]) */}
        <div
          className="absolute left-[7%] xl:left-[9%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "9750px", width: "190px", height: "190px" }}
        >
          <svg viewBox="0 0 190 190" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="95,15 160,52 160,128 95,165 30,128 30,52" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <polygon points="95,30 145,58 145,122 95,150 45,122 45,58" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            <polygon points="95,45 130,65 130,115 95,135 60,115 60,65" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <circle cx="95" cy="90" r="5" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 46. TRADITIONAL HANNYA / ONI HORNED BROW MASK (~9950px, Right) */}
        <div
          className="absolute right-[3%] xl:right-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "9950px", width: "260px", height: "320px" }}
        >
          <svg viewBox="0 0 260 320" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 75 110 C 65 60, 45 35, 25 15 C 35 40, 50 75, 60 115 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            <path d="M 185 110 C 195 60, 215 35, 235 15 C 225 40, 210 75, 200 115 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            <line x1="48" y1="60" x2="58" y2="68" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <line x1="202" y1="68" x2="212" y2="60" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <path d="M 60 115 C 90 95, 170 95, 200 115 C 215 155, 195 195, 130 205 C 65 195, 45 155, 60 115 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <path d="M 75 135 C 95 125, 115 135, 110 145 C 95 150, 80 145, 75 135 Z" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-ink)" fillOpacity="0.3" />
            <path d="M 185 135 C 165 125, 145 135, 150 145 C 165 150, 180 145, 185 135 Z" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-ink)" fillOpacity="0.3" />
            <circle cx="95" cy="140" r="3" fill="var(--tattoo-ink)" />
            <circle cx="165" cy="140" r="3" fill="var(--tattoo-ink)" />
            <path d="M 105 175 L 130 165 L 155 175" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
            <polygon points="100,205 108,235 116,205" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <polygon points="144,205 152,235 160,205" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <path d="M 90 205 C 115 215, 145 215, 170 205" stroke="var(--tattoo-ink)" strokeWidth="2.0" />
          </svg>
        </div>

        {/* 47. KANJI SEAL CHOP '剛' (GO / STRENGTH) (~10200px, Left [2%]) */}
        <div
          className="absolute left-[2%] xl:left-[4%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "10200px", width: "100px", height: "120px" }}
        >
          <svg viewBox="0 0 100 120" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="100" rx="8" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            <path d="M 28 35 L 52 35 M 40 25 L 40 85 M 28 60 L 52 60 M 30 85 L 50 85 M 68 28 L 68 88 M 58 55 L 78 55" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" strokeLinecap="round" />
          </svg>
        </div>

        {/* 48. TWIN CARP SWIMMING IN RING (YIN-YANG KOI) (~10320px, Right [5%]) */}
        <div
          className="absolute right-[4%] xl:right-[7%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "10320px", width: "240px", height: "240px" }}
        >
          <svg viewBox="0 0 240 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="120" cy="120" r="105" stroke="var(--tattoo-ink-faint)" strokeWidth="1.2" strokeDasharray="6 4" />
            {/* Top-Right Koi Arcing Down */}
            <path d="M 80 50 C 140 40, 185 80, 185 140 C 185 170, 160 185, 140 180" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />
            <polygon points="140,180 150,195 130,190" stroke="var(--tattoo-ink)" strokeWidth="1.4" fill="var(--tattoo-fill-wash)" />
            {/* Bottom-Left Koi Arcing Up */}
            <path d="M 160 190 C 100 200, 55 160, 55 100 C 55 70, 80 55, 100 60" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />
            <polygon points="100,60 90,45 110,50" stroke="var(--tattoo-ink)" strokeWidth="1.4" fill="var(--tattoo-fill-wash)" />
          </svg>
        </div>

        {/* 49. SERPENTINE VIPER COILED AROUND SPEAR (~10500px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "10500px", width: "220px", height: "460px" }}
        >
          <svg viewBox="0 0 220 460" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="110" y1="20" x2="110" y2="440" stroke="var(--tattoo-ink)" strokeWidth="2.0" />
            <polygon points="110,20 120,60 100,60" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <path d="M 70 80 C 130 65, 160 110, 110 135 C 60 160, 60 210, 110 230 C 160 250, 150 300, 110 320 C 70 340, 80 390, 110 410" stroke="var(--tattoo-ink-accent)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 70 80 C 60 65, 80 50, 95 62 C 105 72, 85 90, 70 80 Z" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <circle cx="82" cy="68" r="2" fill="var(--tattoo-ink)" />
            <path d="M 62 60 L 50 50 M 50 50 L 42 45 M 50 50 L 42 55" stroke="var(--tattoo-ink)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* 50. SHIMENAWA SACRED ROPE WITH SHIDE STREAMERS (~10800px, Left [4%]) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "10800px", width: "260px", height: "180px" }}
        >
          <svg viewBox="0 0 260 180" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Thick Braided Straw Rope */}
            <path d="M 20 50 C 90 75, 170 75, 240 50" stroke="var(--tattoo-ink-accent)" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 25 54 C 95 79, 165 79, 235 54" stroke="var(--tattoo-ink)" strokeWidth="2.0" strokeDasharray="8 6" />
            {/* 3 Hanging Zigzag Shide Streamers */}
            {[70, 130, 190].map((x, i) => (
              <path key={`shide-${i}`} d={`M ${x} 70 L ${x - 8} 85 L ${x + 6} 100 L ${x - 10} 125 L ${x + 4} 145`} stroke="var(--tattoo-ink)" strokeWidth="1.8" strokeLinecap="square" fill="none" />
            ))}
          </svg>
        </div>

        {/* 51. BRUTALIST CEREMONIAL DAGGER (~11050px, Right) */}
        <div
          className="absolute right-[4%] xl:right-[7%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "11050px", width: "240px", height: "480px" }}
        >
          <svg viewBox="0 0 240 500" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="120,40 138,250 102,250" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            <line x1="120" y1="55" x2="120" y2="245" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            <polygon points="55,250 185,250 175,265 65,265" stroke="var(--tattoo-ink)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="65" cy="257" r="3" fill="var(--tattoo-ink)" />
            <circle cx="175" cy="257" r="3" fill="var(--tattoo-ink)" />
            <circle cx="120" cy="257" r="4" fill="var(--tattoo-ink-accent)" />
            <rect x="112" y="265" width="16" height="75" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            {[280, 295, 310, 325].map((y) => (
              <line key={`dag-hilt-${y}`} x1="112" y1={y} x2="128" y2={y} stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            ))}
            <polygon points="120,340 132,355 120,370 108,355" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <path d="M 60 120 C 95 100, 145 100, 180 120 C 200 132, 190 152, 160 160 C 120 170, 80 180, 60 195 C 40 210, 60 230, 100 230 C 130 230, 160 215, 185 195" stroke="var(--tattoo-ink)" strokeWidth="1.8" strokeLinecap="round" />
            {[{ x: 60, y: 80, s: 6 }, { x: 190, y: 70, s: 6 }, { x: 40, y: 160, s: 5 }].map((st, i) => (
              <g key={`dag-star-${i}`}>
                <line x1={st.x - st.s} y1={st.y} x2={st.x + st.s} y2={st.y} stroke="var(--tattoo-ink)" strokeWidth="1.2" />
                <line x1={st.x} y1={st.y - st.s} x2={st.x} y2={st.y + st.s} stroke="var(--tattoo-ink)" strokeWidth="1.2" />
              </g>
            ))}
          </svg>
        </div>

        {/* 52. SHOKI THE DEMON QUELLER'S SWORD & HAT (~11350px, Left [7%]) */}
        <div
          className="absolute left-[6%] xl:left-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "11350px", width: "200px", height: "240px" }}
        >
          <svg viewBox="0 0 200 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="60" rx="80" ry="25" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="100" cy="52" r="14" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            {/* Piercing Demon Sword */}
            <line x1="100" y1="40" x2="100" y2="210" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" />
            <line x1="80" y1="90" x2="120" y2="90" stroke="var(--tattoo-ink)" strokeWidth="2.0" />
            <polygon points="100,210 106,190 94,190" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 53. NARUTO SPIRALING OCEAN WHIRLPOOL (~11480px, Right [3%]) */}
        <div
          className="absolute right-[2%] xl:right-[5%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "11480px", width: "220px", height: "220px" }}
        >
          <svg viewBox="0 0 220 220" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 110 110 C 130 90, 160 110, 150 140 C 135 175, 80 160, 65 120 C 50 65, 125 45, 175 75 C 220 110, 190 190, 120 200" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 110 110 C 95 125, 75 110, 85 90 C 100 65, 145 75, 155 110" stroke="var(--tattoo-ink)" strokeWidth="1.6" strokeDasharray="4 6" fill="none" />
          </svg>
        </div>

        {/* 54. SACRED BRONZE SUN MIRROR (YATA NO KAGAMI) (~11650px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "11650px", width: "260px", height: "260px" }}
        >
          <svg viewBox="0 0 260 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="130" cy="130" r="115" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="130" cy="130" r="102" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" strokeDasharray="3 4" />
            <circle cx="130" cy="130" r="75" stroke="var(--tattoo-ink)" strokeWidth="1.5" />
            <circle cx="130" cy="130" r="30" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" />
            <circle cx="130" cy="130" r="8" fill="var(--tattoo-ink)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 130 + 35 * Math.cos(rad);
              const y1 = 130 + 35 * Math.sin(rad);
              const x2 = 130 + 70 * Math.cos(rad);
              const y2 = 130 + 70 * Math.sin(rad);
              return <line key={`mirror-ray-${deg}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--tattoo-ink)" strokeWidth="1.4" />;
            })}
          </svg>
        </div>

        {/* 55. KANJI SEAL CHOP '零' (REI / ZERO VOID) (~11950px, Right [8%]) */}
        <div
          className="absolute right-[7%] xl:right-[10%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "11950px", width: "100px", height: "120px" }}
        >
          <svg viewBox="0 0 100 120" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="100" rx="8" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            <path d="M 28 32 L 72 32 M 50 24 L 50 50 M 34 46 L 66 46 M 30 68 L 70 68 M 50 68 L 50 92 M 35 90 L 65 90" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" strokeLinecap="round" />
          </svg>
        </div>

        {/* 56. NOH FEMALE MASK (KO-OMOTE) (~12080px, Left [3%]) */}
        <div
          className="absolute left-[3%] xl:left-[5%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "12080px", width: "180px", height: "240px" }}
        >
          <svg viewBox="0 0 180 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 90 25 C 130 25, 155 60, 155 125 C 155 185, 125 215, 90 215 C 55 215, 25 185, 25 125 C 25 60, 50 25, 90 25 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Painted High Eyebrows */}
            <ellipse cx="65" cy="65" rx="8" ry="4" fill="var(--tattoo-ink)" />
            <ellipse cx="115" cy="65" rx="8" ry="4" fill="var(--tattoo-ink)" />
            {/* Slit Eyes */}
            <path d="M 55 110 L 75 110" stroke="var(--tattoo-ink)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 105 110 L 125 110" stroke="var(--tattoo-ink)" strokeWidth="2.2" strokeLinecap="round" />
            {/* Delicate Mouth */}
            <path d="M 80 175 C 90 180, 100 180, 110 175" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" strokeLinecap="round" />
          </svg>
        </div>

        {/* 57. ASANOHA SACRED GEOMETRIC HEMP LATTICE (~12250px, Right) */}
        <div
          className="absolute right-[4%] xl:right-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "12250px", width: "280px", height: "280px" }}
        >
          <svg viewBox="0 0 280 280" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="140,30 235,85 235,195 140,250 45,195 45,85" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <line x1="140" y1="30" x2="140" y2="250" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <line x1="45" y1="85" x2="235" y2="195" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <line x1="45" y1="195" x2="235" y2="85" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <polygon points="140,140 140,30 188,85" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <polygon points="140,140 235,85 188,140" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <polygon points="140,140 235,195 188,195" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <polygon points="140,140 140,250 92,195" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <polygon points="140,140 45,195 92,140" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <polygon points="140,140 45,85 92,85" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <circle cx="140" cy="140" r="5" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 58. EIGHT-POINT DIAMOND SHURIKEN & KUNAI (~12520px, Right [5%], rot -15deg) */}
        <div
          className="absolute right-[4%] xl:right-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "12520px", width: "180px", height: "280px", transform: "rotate(-15deg)" }}
        >
          <svg viewBox="0 0 180 280" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Kunai Dagger */}
            <polygon points="90,20 105,120 75,120" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <line x1="90" y1="30" x2="90" y2="120" stroke="var(--tattoo-ink)" strokeWidth="1.4" />
            <rect x="85" y="120" width="10" height="40" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            <circle cx="90" cy="170" r="10" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Shuriken Star Beside */}
            <polygon points="90,195 100,215 125,225 100,235 90,255 80,235 55,225 80,215" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <circle cx="90" cy="225" r="4" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 59. ALPINE MOUNTAIN PEAKS & ECLIPSE (~12750px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "12750px", width: "360px", height: "300px" }}
        >
          <svg viewBox="0 0 380 320" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="190" cy="90" r="45" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" />
            <circle cx="190" cy="90" r="40" stroke="var(--tattoo-ink-faint)" strokeWidth="0.8" strokeDasharray="4 4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 190 + 48 * Math.cos(rad);
              const y1 = 90 + 48 * Math.sin(rad);
              const x2 = 190 + 58 * Math.cos(rad);
              const y2 = 90 + 58 * Math.sin(rad);
              return <line key={`sun-r-${deg}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />;
            })}
            <path d="M 20 260 L 80 180 L 140 220 L 190 120 L 250 200 L 310 160 L 360 250" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            <path d="M 40 290 L 120 160 L 165 210 L 220 135 L 285 240 L 340 190 L 370 280" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            <path d="M 10 230 C 50 215, 90 245, 140 230 C 180 215, 230 235, 280 225 C 320 215, 350 235, 375 220" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.4" />
          </svg>
        </div>

        {/* 60. SACRED DRAGON PEARL WITH TRIPLE FLAME WISP (~13050px, Left [7%]) */}
        <div
          className="absolute left-[6%] xl:left-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "13050px", width: "160px", height: "180px" }}
        >
          <svg viewBox="0 0 160 180" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="110" r="38" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            <circle cx="80" cy="110" r="28" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <path d="M 80 72 C 60 45, 75 25, 80 15 C 88 30, 95 45, 80 72 Z" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <path d="M 60 85 C 40 65, 45 40, 52 35 C 58 50, 70 65, 60 85 Z" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.4" />
            <path d="M 100 85 C 120 65, 115 40, 108 35 C 102 50, 90 65, 100 85 Z" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.4" />
          </svg>
        </div>

        {/* 61. WINDSWEPT BONSAI BRANCH & SCHOLAR STONE (~13180px, Right [2%]) */}
        <div
          className="absolute right-[2%] xl:right-[5%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "13180px", width: "220px", height: "200px" }}
        >
          <svg viewBox="0 0 220 200" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <polygon points="120,180 80,180 90,140 140,150 160,180" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <path d="M 110 140 C 90 110, 60 90, 20 80" stroke="var(--tattoo-ink-accent)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 20 80 C 10 70, 50 65, 60 75 C 50 85, 30 90, 20 80 Z" stroke="var(--tattoo-ink)" strokeWidth="1.4" fill="var(--tattoo-fill-wash)" />
          </svg>
        </div>

        {/* 62. DUAL CROSSED SAMURAI KATANAS (~13350px, Right) */}
        <div
          className="absolute right-[3%] xl:right-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "13350px", width: "280px", height: "320px" }}
        >
          <svg viewBox="0 0 280 320" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="30" x2="250" y2="290" stroke="var(--tattoo-ink-accent)" strokeWidth="2.4" />
            <circle cx="180" cy="205" r="9" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <line x1="250" y1="30" x2="30" y2="290" stroke="var(--tattoo-ink-accent)" strokeWidth="2.4" />
            <circle cx="100" cy="205" r="9" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <circle cx="140" cy="160" r="28" stroke="var(--tattoo-ink)" strokeWidth="1.4" strokeDasharray="3 3" />
            <circle cx="140" cy="160" r="8" fill="var(--tattoo-ink)" />
          </svg>
        </div>

        {/* 63. KANJI SEAL CHOP '禅' (ZEN MIND) (~13680px, Left [3%]) */}
        <div
          className="absolute left-[3%] xl:left-[5%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "13680px", width: "100px", height: "120px" }}
        >
          <svg viewBox="0 0 100 120" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="100" rx="8" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            <path d="M 28 35 L 45 35 M 36 25 L 36 85 M 28 60 L 45 60 M 55 30 L 75 30 M 65 30 L 65 88 M 55 55 L 75 55 M 55 75 L 75 75" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" strokeLinecap="round" />
          </svg>
        </div>

        {/* 64. WARRIOR'S MENPO (HALF-FACE IRON ARMOR MASK) (~13780px, Right [6%]) */}
        <div
          className="absolute right-[5%] xl:right-[8%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "13780px", width: "220px", height: "220px" }}
        >
          <svg viewBox="0 0 220 220" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Iron Jaw Contour */}
            <path d="M 40 70 C 40 140, 70 180, 110 180 C 150 180, 180 140, 180 70 C 160 85, 130 90, 110 85 C 90 90, 60 85, 40 70 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" fill="var(--tattoo-fill-wash)" />
            {/* Fierce Mustache Linework */}
            <path d="M 70 110 C 90 105, 105 115, 110 125 C 115 115, 130 105, 150 110" stroke="var(--tattoo-ink)" strokeWidth="2.0" strokeLinecap="round" />
            {/* Clenched Grate Teeth */}
            <rect x="85" y="135" width="50" height="15" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            <line x1="97" y1="135" x2="97" y2="150" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            <line x1="110" y1="135" x2="110" y2="150" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
            <line x1="123" y1="135" x2="123" y2="150" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* 65. TRADITIONAL CALLIGRAPHY SEAL STAMP (KANJI 志 · 創) (~13950px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[7%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "13950px", width: "200px", height: "280px" }}
        >
          <svg viewBox="0 0 200 280" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="20" width="150" height="240" rx="8" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <rect x="35" y="30" width="130" height="220" rx="4" stroke="var(--tattoo-ink-subtle)" strokeWidth="0.8" />
            <path d="M 60 70 L 140 70 M 100 45 L 100 100 M 70 100 L 130 100 M 65 130 C 85 145, 115 145, 135 130" stroke="var(--tattoo-ink-accent)" strokeWidth="3.0" strokeLinecap="round" />
            <rect x="75" y="165" width="50" height="50" rx="4" stroke="var(--accent)" strokeWidth="1.8" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            <path d="M 90 180 L 110 180 M 100 180 L 100 200 M 92 195 L 108 195" stroke="var(--accent)" strokeWidth="1.8" strokeOpacity="0.45" />
          </svg>
        </div>

        {/* 66. CALLIGRAPHIC ENSO ECLIPSE WITH CRESCENT MOON (~14200px, Left [6%], rot 12deg) */}
        <div
          className="absolute left-[5%] xl:left-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "14200px", width: "220px", height: "220px", transform: "rotate(12deg)" }}
        >
          <svg viewBox="0 0 220 220" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 110 25 C 160 25, 195 65, 195 110 C 195 155, 155 195, 105 195 C 60 195, 25 155, 25 110 C 25 70, 55 35, 95 28" stroke="var(--tattoo-ink)" strokeWidth="7" strokeLinecap="round" fill="none" />
            {/* Slender Moon Silhouette Inside */}
            <path d="M 105 60 C 130 75, 130 135, 105 150 C 145 135, 145 75, 105 60 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="1.4" fill="var(--tattoo-ink)" fillOpacity="0.3" />
          </svg>
        </div>

        {/* 67. THE GREAT CRESTING WAVE (~14450px, Right) */}
        <div
          className="absolute right-[4%] xl:right-[8%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "14450px", width: "380px", height: "300px" }}
        >
          <svg viewBox="0 0 420 340" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30 320 C 120 310, 210 315, 280 260 C 340 210, 375 140, 320 80 C 285 40, 230 65, 225 110 C 220 150, 255 175, 290 165 C 320 155, 340 120, 325 90" stroke="var(--tattoo-ink-accent)" strokeWidth="2.4" fill="var(--tattoo-fill-wash)" />
            <path d="M 320 80 C 335 60, 355 65, 345 85 M 305 70 C 315 45, 335 48, 325 72 M 285 62 C 290 40, 308 42, 300 65" stroke="var(--tattoo-ink)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 60 335 C 140 325, 210 330, 270 290 C 320 255, 340 210, 315 175" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            {[
              { cx: 350, cy: 55, r: 2.2 }, { cx: 365, cy: 75, r: 1.8 }, { cx: 335, cy: 38, r: 2.5 },
              { cx: 285, cy: 25, r: 2.0 }, { cx: 220, cy: 50, r: 1.8 }, { cx: 360, cy: 110, r: 2.0 }
            ].map((f, i) => (
              <circle key={`w-spray-${i}`} cx={f.cx} cy={f.cy} r={f.r} fill="var(--tattoo-ink)" opacity="0.6" />
            ))}
          </svg>
        </div>

        {/* 68. WATER LILY PAD LEAF IN SWIRLING CURRENT (~14700px, Left [2%]) */}
        <div
          className="absolute left-[2%] xl:left-[4%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "14700px", width: "200px", height: "180px" }}
        >
          <svg viewBox="0 0 200 180" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 20 C 140 20, 175 55, 175 95 C 175 140, 140 170, 95 170 C 50 170, 20 135, 20 95 C 20 60, 50 25, 95 20 L 100 70 Z" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="var(--tattoo-fill-wash)" />
            {/* Veins */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x = 100 + 60 * Math.cos(rad);
              const y = 95 + 60 * Math.sin(rad);
              return <line key={`leaf-v-${deg}`} x1="100" y1="95" x2={x} y2={y} stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />;
            })}
          </svg>
        </div>

        {/* 69. SINGING BELL & DORJE VAJRA SCEPTER (~14780px, Right [5%], rot -20deg) */}
        <div
          className="absolute right-[4%] xl:right-[7%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "14780px", width: "160px", height: "260px", transform: "rotate(-20deg)" }}
        >
          <svg viewBox="0 0 160 260" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="130" r="14" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            {/* Top 3 Prongs */}
            <path d="M 80 116 L 80 30 M 70 116 C 55 90, 55 50, 80 30 M 90 116 C 105 90, 105 50, 80 30" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="none" />
            {/* Bottom 3 Prongs */}
            <path d="M 80 144 L 80 230 M 70 144 C 55 170, 55 210, 80 230 M 90 144 C 105 170, 105 210, 80 230" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" fill="none" />
          </svg>
        </div>

        {/* 70. WIND GOD FUJIN'S SWIRL VORTEX (~14950px, Left) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "14950px", width: "300px", height: "240px" }}
        >
          <svg viewBox="0 0 300 240" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 40 120 C 60 40, 160 30, 200 80 C 230 120, 220 180, 160 195 C 110 210, 80 160, 110 130 C 135 105, 175 120, 170 145" stroke="var(--tattoo-ink-accent)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 20 140 C 50 160, 100 170, 150 150 C 200 130, 260 140, 285 170" stroke="var(--tattoo-ink)" strokeWidth="1.4" strokeDasharray="8 6" />
            <path d="M 70 80 C 110 70, 170 75, 220 100" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
          </svg>
        </div>

        {/* 71. KANJI SEAL CHOP '創' (CREATION / CRAFT) (~15220px, Right [8%]) */}
        <div
          className="absolute right-[7%] xl:right-[10%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "15220px", width: "100px", height: "120px" }}
        >
          <svg viewBox="0 0 100 120" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="100" rx="8" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            <path d="M 30 35 L 50 35 M 40 25 L 40 85 M 28 55 L 52 55 M 30 85 L 50 85 M 68 30 L 68 90 M 58 55 L 78 55" stroke="var(--accent)" strokeWidth="2.0" strokeOpacity="0.45" strokeLinecap="round" />
          </svg>
        </div>

        {/* 72. SACRED CRANE (TSURU) ON PINE RIDGE (~15300px, Left [4%]) */}
        <div
          className="absolute left-[3%] xl:left-[6%] pointer-events-none select-none opacity-[0.82]"
          style={{ top: "15300px", width: "200px", height: "280px" }}
        >
          <svg viewBox="0 0 200 280" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Long Graceful S-Curved Neck & Beak */}
            <path d="M 140 40 L 110 60 C 90 75, 95 110, 105 130" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" strokeLinecap="round" />
            {/* Red Crown of Crane */}
            <circle cx="118" cy="55" r="4" fill="var(--accent)" fillOpacity="0.6" />
            {/* Wing Feather Plumage */}
            <path d="M 105 130 C 130 140, 160 160, 160 190 C 140 185, 110 175, 95 160 Z" stroke="var(--tattoo-ink)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            {/* Slender Stilt Legs */}
            <line x1="105" y1="160" x2="105" y2="250" stroke="var(--tattoo-ink-accent)" strokeWidth="2.0" />
            <line x1="105" y1="180" x2="120" y2="220" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            <line x1="105" y1="250" x2="90" y2="255" stroke="var(--tattoo-ink)" strokeWidth="1.8" />
          </svg>
        </div>

        {/* 73. NAUTICAL WIND ROSE & HORIZON FINIAL (~15420px, Center) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.82]"
          style={{ top: "15420px", width: "360px", height: "300px" }}
        >
          <svg viewBox="0 0 360 300" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="180" cy="150" r="120" stroke="var(--tattoo-ink-faint)" strokeWidth="1" />
            <circle cx="180" cy="150" r="95" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.2" strokeDasharray="6 6" />
            <circle cx="180" cy="150" r="70" stroke="var(--tattoo-ink-faint)" strokeWidth="0.8" />
            <polygon points="180,45 190,140 285,150 190,160 180,255 170,160 75,150 170,140" stroke="var(--tattoo-ink-accent)" strokeWidth="1.8" fill="var(--tattoo-fill-wash)" />
            <polygon points="180,150 240,90 180,150 240,210 180,150 120,210 180,150 120,90" stroke="var(--tattoo-ink)" strokeWidth="1.2" />
            <circle cx="180" cy="150" r="12" stroke="var(--tattoo-ink)" strokeWidth="1.6" fill="var(--tattoo-fill-wash)" />
            <circle cx="180" cy="150" r="3.5" fill="var(--tattoo-ink-accent)" />
            <line x1="30" y1="150" x2="75" y2="150" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <line x1="285" y1="150" x2="330" y2="150" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <line x1="60" y1="175" x2="300" y2="175" stroke="var(--tattoo-ink-faint)" strokeWidth="0.8" strokeDasharray="12 8" />
            <line x1="90" y1="200" x2="270" y2="200" stroke="var(--tattoo-ink-faint)" strokeWidth="0.8" strokeDasharray="8 6" />
          </svg>
        </div>

        {/* 74. SHOOTING METEOR & CLOUD TRAILS (RYUUSEI) (~15700px, Right [4%]) */}
        <div
          className="absolute right-[3%] xl:right-[6%] pointer-events-none select-none opacity-[0.80]"
          style={{ top: "15700px", width: "240px", height: "180px", transform: "rotate(-15deg)" }}
        >
          <svg viewBox="0 0 240 180" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="140" x2="200" y2="30" stroke="var(--tattoo-ink-accent)" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="40" y1="155" x2="170" y2="55" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.4" strokeDasharray="8 6" />
            <circle cx="200" cy="30" r="5" fill="var(--tattoo-ink)" />
            <path d="M 190 20 L 210 20 M 200 10 L 200 30" stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.5" />
          </svg>
        </div>

        {/* 75. FINAL SHINTO GATEWAY INSCRIPTION SEAL (~15850px, Left [6%]) */}
        <div
          className="absolute left-[5%] xl:left-[8%] pointer-events-none select-none opacity-[0.85]"
          style={{ top: "15850px", width: "120px", height: "120px" }}
        >
          <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="90" height="90" rx="8" stroke="var(--accent)" strokeWidth="2.2" strokeOpacity="0.45" fill="var(--accent)" fillOpacity="0.04" />
            <rect x="23" y="23" width="74" height="74" rx="4" stroke="var(--accent)" strokeWidth="1.0" strokeOpacity="0.30" />
            <circle cx="60" cy="60" r="22" stroke="var(--tattoo-ink)" strokeWidth="1.6" />
            <circle cx="60" cy="60" r="6" fill="var(--tattoo-ink)" />
            <line x1="60" y1="28" x2="60" y2="92" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
            <line x1="28" y1="60" x2="92" y2="60" stroke="var(--tattoo-ink-subtle)" strokeWidth="1.0" />
          </svg>
        </div>
        </div>

      </div>
    </div>
  );
}
