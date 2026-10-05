"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionHeader from "./SectionHeader";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUpRight, Copy, Check, Send, Mail, Phone } from "lucide-react";
import {
  observeScrollReveal,
  animateTextReveal,
  animateStaggerLabels,
  initMagneticElement,
} from "@/animations";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);

  const email = PERSONAL_INFO.email;
  const phone = PERSONAL_INFO.phone;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Section 14: Sequential Editorial Reveal
  // 1. DIRECT
  // 2. CONTACT.
  // 3. Staggered reveal of channels (EMAIL, GITHUB, LINKEDIN)
  useEffect(() => {
    if (!containerRef.current) return;

    // Attach Section 07 magnetic effect to all channel links
    const cleanups: (() => void)[] = [];
    if (channelsRef.current) {
      const links = channelsRef.current.querySelectorAll<HTMLElement>("[data-magnetic='true']");
      links.forEach((link) => {
        cleanups.push(initMagneticElement(link, ".magnetic-target", 8));
      });
    }

    const cleanupReveal = observeScrollReveal(
      containerRef.current,
      () => {
        // Line 1: DIRECT
        if (line1Ref.current) {
          animateTextReveal(line1Ref.current, {
            direction: "up",
            distance: 40,
            duration: 950,
            delay: 150,
          });
        }

        // Line 2: CONTACT.
        if (line2Ref.current) {
          animateTextReveal(line2Ref.current, {
            direction: "up",
            distance: 40,
            duration: 950,
            delay: 350,
          });
        }

        // Channels staggered reveal
        if (channelsRef.current) {
          const items = Array.from(channelsRef.current.children) as HTMLElement[];
          animateStaggerLabels(items, {
            distance: 16,
            staggerMs: 120,
            delay: 580,
          });
        }
      },
      { threshold: 0.15 }
    );

    return () => {
      cleanups.forEach((c) => c());
      cleanupReveal();
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 pb-16 scroll-mt-20"
    >
      {/* Technical Section Divider */}
      <SectionHeader
        number="05"
        title="CONTACT"
        tagline="DIRECT CHANNELS & PROFILES"
        badge="GET IN TOUCH"
      />

      {/* Main Footer Block */}
      <div className="py-20 lg:py-28 border-b border-[var(--border-strong)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Giant Typographic Call-To-Action (Section 14) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1 overflow-hidden">
              <div ref={line1Ref} className="overflow-hidden will-change-transform">
                <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-[var(--text-primary)] leading-[0.88] uppercase select-none">
                  DIRECT
                </h2>
              </div>
              <div ref={line2Ref} className="overflow-hidden will-change-transform">
                <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-[var(--accent)] leading-[0.88] uppercase select-none">
                  CONTACT.
                </h2>
              </div>
            </div>

            {/* Staggered Channels with Section 07 Magnetic Links */}
            <div
              ref={channelsRef}
              className="pt-6 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-sm sm:text-base font-bold"
            >
              <a
                href={`mailto:${email}`}
                data-magnetic="true"
                className="editorial-link group inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors relative"
              >
                <span className="magnetic-target inline-flex items-center gap-1 will-change-transform">
                  <span className="link-text">EMAIL</span>
                  <span className="link-dash">─</span>
                  <ArrowUpRight className="link-arrow w-4 h-4 text-[var(--accent)]" />
                </span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                data-magnetic="true"
                className="editorial-link group inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors relative"
              >
                <span className="magnetic-target inline-flex items-center gap-1 will-change-transform">
                  <span className="link-text">GITHUB</span>
                  <span className="link-dash">─</span>
                  <ArrowUpRight className="link-arrow w-4 h-4 text-[var(--accent)]" />
                </span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                data-magnetic="true"
                className="editorial-link group inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors relative"
              >
                <span className="magnetic-target inline-flex items-center gap-1 will-change-transform">
                  <span className="link-text">LINKEDIN</span>
                  <span className="link-dash">─</span>
                  <ArrowUpRight className="link-arrow w-4 h-4 text-[var(--accent)]" />
                </span>
              </a>

              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noreferrer"
                data-magnetic="true"
                className="editorial-link group inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors relative"
              >
                <span className="magnetic-target inline-flex items-center gap-1 will-change-transform">
                  <span className="link-text">LEETCODE</span>
                  <span className="link-dash">─</span>
                  <ArrowUpRight className="link-arrow w-4 h-4 text-[var(--accent)]" />
                </span>
              </a>

              <a
                href={PERSONAL_INFO.resumePdf}
                download="Omkar_More_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                data-magnetic="true"
                className="editorial-link group inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors relative"
              >
                <span className="magnetic-target inline-flex items-center gap-1 will-change-transform">
                  <span className="link-text">RESUME [PDF]</span>
                  <span className="link-dash">─</span>
                  <ArrowUpRight className="link-arrow w-4 h-4 text-[var(--accent)]" />
                </span>
              </a>
            </div>

            {/* Quick Contact Info Box (Email & Phone from Resume) */}
            <div className="pt-4 max-w-md space-y-2">
              <div className="flex items-center justify-between p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-xs">
                <div className="flex items-center gap-2 text-[var(--text-primary)]">
                  <Mail className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-semibold">{email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-2.5 py-1 bg-[var(--text-primary)] hover:bg-[var(--accent)] text-[var(--bg-primary)] hover:text-[#111111] text-[11px] font-bold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[var(--bg-surface)]/60 border border-[var(--border-color)] font-mono text-xs">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Phone className="w-4 h-4 text-[var(--accent)]" />
                  <span>{phone}</span>
                </div>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="text-[11px] text-[var(--text-primary)] hover:text-[var(--accent)] font-bold"
                >
                  CALL DIRECT ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right: Quick Brutalist Dispatch Form */}
          <div className="lg:col-span-5 bg-[var(--terminal-bg)] text-[var(--terminal-text)] p-6 sm:p-8 border border-[var(--terminal-border)] shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-color)]/30 font-mono text-xs">
              <span className="text-[var(--accent)] font-bold">SEND MESSAGE DIRECT</span>
              <span className="text-[var(--text-muted)]">[ENCRYPTED]</span>
            </div>

            {formSent ? (
              <div className="py-12 text-center space-y-3 font-mono">
                <div className="w-10 h-10 mx-auto rounded-full bg-[var(--accent)] flex items-center justify-center text-[#111111] font-bold">
                  ✓
                </div>
                <p className="text-sm font-bold text-[var(--terminal-text)]">MESSAGE PACKET DISPATCHED</p>
                <p className="text-xs text-[var(--text-muted)]">Thank you. I will reply within 24 hours.</p>
                <button
                  onClick={() => setFormSent(false)}
                  className="text-xs text-[var(--accent)] underline pt-2 block mx-auto"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] text-[var(--text-muted)] uppercase block">
                    NAME // SENDER
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] px-3 py-2 text-[var(--terminal-text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[var(--text-muted)] uppercase block">
                    EMAIL // RETURN ROUTE
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@computing.org"
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] px-3 py-2 text-[var(--terminal-text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[var(--text-muted)] uppercase block">
                    MESSAGE // PAYLOAD
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hey Omkar, let's talk about..."
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] px-3 py-2 text-[var(--terminal-text)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[var(--accent)] hover:bg-[var(--text-primary)] text-[#111111] hover:text-[var(--bg-primary)] font-bold uppercase tracking-wider transition-colors duration-150 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Credits & Terminal Joke */}
      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[var(--text-secondary)]">
        <div>
          <span className="font-bold text-[var(--text-primary)]">OMKAR MORE</span>
          <span className="text-[var(--border-color)] mx-2">/</span>
          <span>SOFTWARE ENGINEER</span>
          <span className="text-[var(--border-color)] mx-2">/</span>
          <span>2026</span>
        </div>

        <div>
          <span>© 2026 Omkar More. All rights reserved.</span>
        </div>

        {/* Factual Geographic / Status Stamp */}
        <div className="min-w-[180px] text-left sm:text-right">
          <span className="text-[var(--text-muted)] font-mono text-[11px] tracking-wider">
            VNIT NAGPUR · INDIA
          </span>
        </div>
      </div>
    </footer>
  );
}
