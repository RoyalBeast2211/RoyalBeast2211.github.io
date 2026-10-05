"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Globe, Lock, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface DesktopBrowserViewerProps {
  url?: string;
  title: string;
  image?: string;
  images?: string[];
  captions?: string[];
  children?: React.ReactNode;
  className?: string;
  onOpenModal?: () => void;
}

export default function DesktopBrowserViewer({
  url = "https://production.internal/app",
  title,
  image,
  images,
  captions,
  children,
  className = "",
  onOpenModal,
}: DesktopBrowserViewerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages = images && images.length > 0 ? images : image ? [image] : [];
  const totalImages = displayImages.length;
  const currentSrc = displayImages[activeImageIndex] || image;
  const currentCaption = captions?.[activeImageIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (totalImages <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (totalImages <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full flex flex-col font-mono text-xs select-none ${className}`}
    >
      {/* Spec Tag Top */}
      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pb-2 px-1">
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="font-semibold text-[var(--text-primary)]">WEB PLATFORM VIEW</span>
        </div>
        <div className="flex items-center gap-3">
          {totalImages > 1 && (
            <span className="text-[var(--accent)] font-bold">
              SCREEN {String(activeImageIndex + 1).padStart(2, "0")} / {String(totalImages).padStart(2, "0")}
            </span>
          )}
          {url.startsWith("http") && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
            >
              <span>VISIT SITE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Browser Window Frame */}
      <div
        className={`relative w-full rounded-md border border-[var(--border-strong)] bg-[#111111] overflow-hidden shadow-xl transition-all duration-300 ease-out ${
          isHovered ? "border-[var(--accent)]/60 -translate-y-1 shadow-2xl" : ""
        }`}
      >
        {/* Browser Top Window Bar */}
        <div className="bg-[#1C1C1C] px-3.5 py-2.5 flex items-center justify-between border-b border-[#2A2A2A] gap-4">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-md mx-auto bg-[#0F0F0F] border border-[#2D2D2D] rounded-xs px-2.5 py-1 flex items-center gap-2 text-[10px] text-[#A0A0A0] truncate">
            <Lock className="w-2.5 h-2.5 text-[#22C55E] shrink-0" />
            <span className="truncate">{url}</span>
          </div>

          {/* Status badge */}
          <div className="text-[10px] text-[#777777] uppercase font-mono tracking-wider shrink-0 hidden sm:block">
            HTTPS 2.0
          </div>
        </div>

        {/* Viewport Window Area (Exact 16:9 widescreen ratio matching 2560x1440 images) */}
        <div
          onClick={onOpenModal}
          className="relative w-full aspect-[16/9] bg-[#0A0A0A] overflow-hidden cursor-pointer group"
        >
          {children ? (
            children
          ) : currentSrc ? (
            <div className="relative w-full h-full">
              <Image
                src={currentSrc}
                alt={`${title} Interface Screen ${activeImageIndex + 1}`}
                fill
                unoptimized
                className="object-cover object-top transition-all duration-500 ease-out group-hover:scale-[1.01]"
                priority={activeImageIndex === 0}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

              {/* Multi-image Prev/Next Buttons */}
              {totalImages > 1 && (
                <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous screen"
                    className="pointer-events-auto w-8 h-8 rounded-full bg-black/85 hover:bg-[var(--accent)] hover:text-black text-white flex items-center justify-center border border-white/20 transition-all shadow-lg backdrop-blur-xs cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next screen"
                    className="pointer-events-auto w-8 h-8 rounded-full bg-black/85 hover:bg-[var(--accent)] hover:text-black text-white flex items-center justify-center border border-white/20 transition-all shadow-lg backdrop-blur-xs cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}

              {/* Multi-image Bottom Indicator Dots & Caption */}
              {totalImages > 1 && (
                <div className="absolute bottom-2 left-0 right-0 z-20 flex flex-col items-center gap-1.5 pointer-events-none px-4">
                  {currentCaption && (
                    <div className="px-2.5 py-0.5 bg-black/80 backdrop-blur-xs border border-white/10 text-[10px] text-[#DDDDDD] font-mono uppercase tracking-wider rounded-xs truncate max-w-full">
                      {currentCaption}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 pointer-events-auto">
                    {displayImages.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(i);
                        }}
                        aria-label={`Go to screen ${i + 1}`}
                        className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                          i === activeImageIndex
                            ? "w-5 bg-[var(--accent)] shadow-sm"
                            : "w-1.5 bg-white/40 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-muted)]">
              <Globe className="w-10 h-10 mb-2 stroke-1 text-[var(--accent)]" />
              <span>{title} INTERFACE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
