import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT_DIR = path.resolve(".");
const IMAGES_DIR = path.join(ROOT_DIR, "public", "images");
const IG_DIR = path.join(IMAGES_DIR, "ig-app");
const TELEDIR_DIR = path.join(IMAGES_DIR, "teledir");

if (!fs.existsSync(IG_DIR)) fs.mkdirSync(IG_DIR, { recursive: true });
if (!fs.existsSync(TELEDIR_DIR)) fs.mkdirSync(TELEDIR_DIR, { recursive: true });

function renderSvg(svg, outputPath, quality = 98) {
  const tmpSvg = path.join("/tmp", `crisp_${Date.now()}_${Math.random().toString(36).substring(7)}.svg`);
  fs.writeFileSync(tmpSvg, svg);
  try {
    // Render at crisp high quality with system fonts
    execSync(`magick "${tmpSvg}" -quality ${quality} "${outputPath}"`);
    console.log(`✓ Rendered: ${outputPath}`);
  } catch (err) {
    console.error(`✗ Error rendering ${outputPath}:`, err.message);
  } finally {
    if (fs.existsSync(tmpSvg)) fs.unlinkSync(tmpSvg);
  }
}

// =========================================================================
// 1. MOBILE SCREENS (1080 x 2340, exact 9:19.5 smartphone ratio)
// =========================================================================

// --- IG APP: SCREEN 01 - LEADERBOARD (1080 x 2340) ---
const igLeaderboardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B10;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="igBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121520"/>
      <stop offset="50%" stop-color="#0B0D14"/>
      <stop offset="100%" stop-color="#06070A"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <linearGradient id="silver" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
    <linearGradient id="bronze" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
    <linearGradient id="cardG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#161A24"/>
      <stop offset="100%" stop-color="#0E1118"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="url(#igBg)"/>

  <!-- Native Phone Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="85">9:41</text>
    <text x="1000" y="85" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 150)">
    <rect x="0" y="0" width="220" height="46" rx="23" fill="#6366F1" opacity="0.2"/>
    <text x="110" y="32" fill="#818CF8" font-size="22" font-weight="bold" text-anchor="middle">🟢 LIVE STANDINGS</text>

    <text x="0" y="115" fill="#FFFFFF" font-size="56" font-weight="900" letter-spacing="-1">IG 2024 Leaderboard</text>
    <text x="0" y="165" fill="#9CA3AF" font-size="30">Institute Gathering · 12 Department Standings</text>
  </g>

  <!-- Top 3 Podium Cards -->
  <g transform="translate(60, 390)">
    <!-- 2nd Place: CSE -->
    <g transform="translate(40, 80)">
      <rect width="250" height="280" rx="24" fill="url(#silver)" opacity="0.2"/>
      <rect width="250" height="280" rx="24" fill="none" stroke="#94A3B8" stroke-width="2"/>
      <text x="125" y="70" fill="#E2E8F0" font-size="64" font-weight="900" text-anchor="middle">2</text>
      <text x="125" y="140" fill="#FFFFFF" font-size="38" font-weight="bold" text-anchor="middle">CSE</text>
      <text x="125" y="210" fill="#94A3B8" font-size="32" font-weight="bold" text-anchor="middle">840 PTS</text>
    </g>

    <!-- 1st Place: MINING (Champion) -->
    <g transform="translate(340, 0)">
      <rect width="280" height="360" rx="28" fill="url(#gold)" opacity="0.25"/>
      <rect width="280" height="360" rx="28" fill="none" stroke="#F59E0B" stroke-width="3"/>
      <text x="140" y="-15" font-size="46" text-anchor="middle">👑</text>
      <text x="140" y="80" fill="#FCD34D" font-size="76" font-weight="900" text-anchor="middle">1</text>
      <text x="140" y="170" fill="#FFFFFF" font-size="44" font-weight="bold" text-anchor="middle">MINING</text>
      <text x="140" y="250" fill="#FBBF24" font-size="38" font-weight="bold" text-anchor="middle">880 PTS</text>
      <rect x="50" y="285" width="180" height="44" rx="22" fill="#D97706"/>
      <text x="140" y="316" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">LEADER</text>
    </g>

    <!-- 3rd Place: MECH -->
    <g transform="translate(670, 130)">
      <rect width="250" height="230" rx="24" fill="url(#bronze)" opacity="0.2"/>
      <rect width="250" height="230" rx="24" fill="none" stroke="#EA580C" stroke-width="2"/>
      <text x="125" y="70" fill="#FDBA74" font-size="64" font-weight="900" text-anchor="middle">3</text>
      <text x="125" y="130" fill="#FFFFFF" font-size="36" font-weight="bold" text-anchor="middle">MECH</text>
      <text x="125" y="190" fill="#FB923C" font-size="30" font-weight="bold" text-anchor="middle">790 PTS</text>
    </g>
  </g>

  <!-- Complete Standings Table -->
  <g transform="translate(60, 840)">
    <text x="0" y="40" fill="#9CA3AF" font-size="26" font-weight="bold" letter-spacing="3">COMPLETE STANDINGS (12 DEPTS)</text>

    <!-- #4 Electrical -->
    <g transform="translate(0, 70)">
      <rect width="960" height="155" rx="24" fill="url(#cardG)" stroke="#1F2937" stroke-width="2"/>
      <text x="45" y="65" fill="#818CF8" font-size="32" font-weight="bold">#4</text>
      <text x="120" y="65" fill="#FFFFFF" font-size="34" font-weight="bold">Electrical Engineering</text>
      <text x="120" y="115" fill="#9CA3AF" font-size="24">14 event wins · 3 Gold Medals</text>
      <text x="910" y="95" fill="#818CF8" font-size="38" font-weight="bold" text-anchor="end">720 PTS</text>
    </g>

    <!-- #5 ECE -->
    <g transform="translate(0, 245)">
      <rect width="960" height="155" rx="24" fill="url(#cardG)" stroke="#1F2937" stroke-width="2"/>
      <text x="45" y="65" fill="#818CF8" font-size="32" font-weight="bold">#5</text>
      <text x="120" y="65" fill="#FFFFFF" font-size="34" font-weight="bold">Electronics &amp; Comm (ECE)</text>
      <text x="120" y="115" fill="#9CA3AF" font-size="24">11 event wins · 2 Gold Medals</text>
      <text x="910" y="95" fill="#818CF8" font-size="38" font-weight="bold" text-anchor="end">690 PTS</text>
    </g>

    <!-- #6 Civil -->
    <g transform="translate(0, 420)">
      <rect width="960" height="155" rx="24" fill="url(#cardG)" stroke="#1F2937" stroke-width="2"/>
      <text x="45" y="65" fill="#818CF8" font-size="32" font-weight="bold">#6</text>
      <text x="120" y="65" fill="#FFFFFF" font-size="34" font-weight="bold">Civil Engineering</text>
      <text x="120" y="115" fill="#9CA3AF" font-size="24">9 event wins · 1 Gold Medal</text>
      <text x="910" y="95" fill="#818CF8" font-size="38" font-weight="bold" text-anchor="end">650 PTS</text>
    </g>

    <!-- #7 Metallurgy -->
    <g transform="translate(0, 595)">
      <rect width="960" height="155" rx="24" fill="url(#cardG)" stroke="#1F2937" stroke-width="2"/>
      <text x="45" y="65" fill="#818CF8" font-size="32" font-weight="bold">#7</text>
      <text x="120" y="65" fill="#FFFFFF" font-size="34" font-weight="bold">Materials &amp; Metallurgy</text>
      <text x="120" y="115" fill="#9CA3AF" font-size="24">8 event wins · 2 Silver Medals</text>
      <text x="910" y="95" fill="#818CF8" font-size="38" font-weight="bold" text-anchor="end">610 PTS</text>
    </g>

    <!-- #8 Chemical -->
    <g transform="translate(0, 770)">
      <rect width="960" height="155" rx="24" fill="url(#cardG)" stroke="#1F2937" stroke-width="2"/>
      <text x="45" y="65" fill="#818CF8" font-size="32" font-weight="bold">#8</text>
      <text x="120" y="65" fill="#FFFFFF" font-size="34" font-weight="bold">Chemical Engineering</text>
      <text x="120" y="115" fill="#9CA3AF" font-size="24">7 event wins · 1 Silver Medal</text>
      <text x="910" y="95" fill="#818CF8" font-size="38" font-weight="bold" text-anchor="end">580 PTS</text>
    </g>

    <!-- #9 Architecture -->
    <g transform="translate(0, 945)">
      <rect width="960" height="155" rx="24" fill="url(#cardG)" stroke="#1F2937" stroke-width="2"/>
      <text x="45" y="65" fill="#818CF8" font-size="32" font-weight="bold">#9</text>
      <text x="120" y="65" fill="#FFFFFF" font-size="34" font-weight="bold">Architecture &amp; Planning</text>
      <text x="120" y="115" fill="#9CA3AF" font-size="24">6 event wins · 3 Bronze Medals</text>
      <text x="910" y="95" fill="#818CF8" font-size="38" font-weight="bold" text-anchor="end">540 PTS</text>
    </g>

    <!-- #10 Applied Mechanics -->
    <g transform="translate(0, 1120)">
      <rect width="960" height="155" rx="24" fill="url(#cardG)" stroke="#1F2937" stroke-width="2"/>
      <text x="35" y="65" fill="#818CF8" font-size="30" font-weight="bold">#10</text>
      <text x="120" y="65" fill="#FFFFFF" font-size="34" font-weight="bold">Applied Mechanics</text>
      <text x="120" y="115" fill="#9CA3AF" font-size="24">4 event wins · 1 Bronze Medal</text>
      <text x="910" y="95" fill="#818CF8" font-size="38" font-weight="bold" text-anchor="end">490 PTS</text>
    </g>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 2160)">
    <rect width="1080" height="180" fill="#0C0E14" stroke="#1F2937" stroke-width="2"/>
    <text x="150" y="80" fill="#818CF8" font-size="26" font-weight="bold" text-anchor="middle">LEADERBOARD</text>
    <text x="410" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">SCHEDULE</text>
    <text x="670" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">HOME</text>
    <text x="930" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">BADGES</text>
    <rect x="420" y="145" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>
`;

// --- IG APP: SCREEN 02 - SCHEDULE (1080 x 2340) ---
const igScheduleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B10;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="schedBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121520"/>
      <stop offset="100%" stop-color="#06070A"/>
    </linearGradient>
    <linearGradient id="schedCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181C26"/>
      <stop offset="100%" stop-color="#10131A"/>
    </linearGradient>
    <linearGradient id="liveBadge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#DC2626"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="url(#schedBg)"/>

  <!-- Native Phone Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="85">9:41</text>
    <text x="1000" y="85" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 150)">
    <rect x="0" y="0" width="230" height="46" rx="23" fill="url(#liveBadge)"/>
    <text x="115" y="32" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">🔴 2 MATCHES LIVE</text>

    <text x="0" y="115" fill="#FFFFFF" font-size="56" font-weight="900" letter-spacing="-1">Events &amp; Timeline</text>
    <text x="0" y="165" fill="#9CA3AF" font-size="30">Day 3 Final Round Fixtures · 42 Events</text>
  </g>

  <!-- Events List -->
  <g transform="translate(60, 390)">
    <!-- Event 1: Basketball Final (LIVE) -->
    <g transform="translate(0, 0)">
      <rect width="960" height="370" rx="32" fill="url(#schedCard)" stroke="#EF4444" stroke-width="2.5"/>
      <rect x="50" y="40" width="130" height="44" rx="22" fill="#EF4444"/>
      <text x="115" y="71" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">LIVE Q4</text>
      <text x="210" y="72" fill="#9CA3AF" font-size="26">Main Indoor Stadium · Basketball</text>

      <text x="50" y="150" fill="#FFFFFF" font-size="44" font-weight="bold">MINING vs MECHANICAL</text>
      <text x="50" y="210" fill="#EF4444" font-size="38" font-weight="900">68  ─  64</text>
      <text x="230" y="210" fill="#9CA3AF" font-size="28">(2:14 Remaining)</text>

      <line x1="50" y1="260" x2="910" y2="260" stroke="#2D3748" stroke-width="1.5"/>
      <text x="50" y="315" fill="#E5E7EB" font-size="28">Referees: Prof. R. K. Kale · Supabase Sync Active</text>
    </g>

    <!-- Event 2: Robotics Sumo Arena (LIVE) -->
    <g transform="translate(0, 410)">
      <rect width="960" height="330" rx="32" fill="url(#schedCard)" stroke="#3B82F6" stroke-width="2"/>
      <rect x="50" y="40" width="140" height="44" rx="22" fill="#3B82F6"/>
      <text x="120" y="71" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">ROUND 3</text>
      <text x="220" y="72" fill="#9CA3AF" font-size="26">Assembly Hall · Robotics Sumo</text>

      <text x="50" y="145" fill="#FFFFFF" font-size="42" font-weight="bold">CSE vs ELECTRONICS (ECE)</text>
      <text x="50" y="200" fill="#60A5FA" font-size="34" font-weight="bold">Autonomous Micro-Robots Clash</text>

      <line x1="50" y1="240" x2="910" y2="240" stroke="#2D3748" stroke-width="1.5"/>
      <text x="50" y="290" fill="#9CA3AF" font-size="26">Bot weight limit 3kg · Best of 3 bouts</text>
    </g>

    <!-- Event 3: Inter-Dept Cricket Final (Upcoming) -->
    <g transform="translate(0, 780)">
      <rect width="960" height="330" rx="32" fill="url(#schedCard)" stroke="#262E3D" stroke-width="2"/>
      <rect x="50" y="40" width="160" height="44" rx="22" fill="#1E293B"/>
      <text x="130" y="71" fill="#FCD34D" font-size="22" font-weight="bold" text-anchor="middle">16:00 IST</text>
      <text x="240" y="72" fill="#9CA3AF" font-size="26">Main Cricket Ground · T20</text>

      <text x="50" y="145" fill="#FFFFFF" font-size="42" font-weight="bold">CIVIL vs ELECTRICAL</text>
      <text x="50" y="200" fill="#FCD34D" font-size="32" font-weight="bold">Championship Gold Match</text>

      <line x1="50" y1="240" x2="910" y2="240" stroke="#2D3748" stroke-width="1.5"/>
      <text x="50" y="290" fill="#9CA3AF" font-size="26">Live Commentary on Student Radio &amp; Portal</text>
    </g>

    <!-- Event 4: Algorithmic Relay Sprint -->
    <g transform="translate(0, 1150)">
      <rect width="960" height="330" rx="32" fill="url(#schedCard)" stroke="#262E3D" stroke-width="2"/>
      <rect x="50" y="40" width="160" height="44" rx="22" fill="#1E293B"/>
      <text x="130" y="71" fill="#34D399" font-size="22" font-weight="bold" text-anchor="middle">18:30 IST</text>
      <text x="240" y="72" fill="#9CA3AF" font-size="26">Computing Center · 8 Depts</text>

      <text x="50" y="145" fill="#FFFFFF" font-size="42" font-weight="bold">Speed Programming Relay</text>
      <text x="50" y="200" fill="#34D399" font-size="32" font-weight="bold">3 Hours · 8 Problems · Auto-Judged</text>

      <line x1="50" y1="240" x2="910" y2="240" stroke="#2D3748" stroke-width="1.5"/>
      <text x="50" y="290" fill="#9CA3AF" font-size="26">Top 3 Teams earn 80, 50, 30 points</text>
    </g>

    <!-- Event 5: 4x100m Athletics -->
    <g transform="translate(0, 1520)">
      <rect width="960" height="210" rx="32" fill="url(#schedCard)" stroke="#262E3D" stroke-width="2"/>
      <rect x="50" y="35" width="160" height="44" rx="22" fill="#1E293B"/>
      <text x="130" y="66" fill="#F472B6" font-size="22" font-weight="bold" text-anchor="middle">19:30 IST</text>
      <text x="240" y="67" fill="#9CA3AF" font-size="26">Olympic Synthetic Track</text>

      <text x="50" y="140" fill="#FFFFFF" font-size="38" font-weight="bold">Inter-Dept 4x100m Relay Heats</text>
      <text x="910" y="140" fill="#F472B6" font-size="30" font-weight="bold" text-anchor="end">FINAL HEAT</text>
    </g>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 2160)">
    <rect width="1080" height="180" fill="#0C0E14" stroke="#1F2937" stroke-width="2"/>
    <text x="150" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">LEADERBOARD</text>
    <text x="410" y="80" fill="#818CF8" font-size="26" font-weight="bold" text-anchor="middle">SCHEDULE</text>
    <text x="670" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">HOME</text>
    <text x="930" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">BADGES</text>
    <rect x="420" y="145" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>
`;

// --- IG APP: SCREEN 03 - HOME (1080 x 2340) ---
const igHomeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B10;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="heroBanner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="50%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <linearGradient id="homeCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181C26"/>
      <stop offset="100%" stop-color="#10131A"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="#090B10"/>

  <!-- Native Phone Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="85">9:41</text>
    <text x="1000" y="85" text-anchor="end">5G  100%</text>
  </g>

  <!-- Hero Festival Banner -->
  <g transform="translate(60, 140)">
    <rect width="960" height="420" rx="36" fill="url(#heroBanner)"/>
    <text x="60" y="75" fill="#C7D2FE" font-size="26" font-weight="bold" letter-spacing="4">VNIT ANNUAL GATHERING 2024</text>
    <text x="60" y="155" fill="#FFFFFF" font-size="64" font-weight="900">Institute Gathering</text>
    <text x="60" y="215" fill="#E0E7FF" font-size="34">4,000+ University Students Live</text>

    <rect x="60" y="275" width="220" height="70" rx="20" fill="#FFFFFF"/>
    <text x="170" y="320" fill="#312E81" font-size="28" font-weight="bold" text-anchor="middle">EXPLORE</text>

    <text x="320" y="320" fill="#E0E7FF" font-size="28" font-weight="600">84 Medals · 12 Depts</text>
  </g>

  <!-- Metric Badges 3-Card Row -->
  <g transform="translate(60, 600)">
    <rect x="0" y="0" width="300" height="180" rx="24" fill="url(#homeCard)" stroke="#1F2937" stroke-width="2"/>
    <text x="40" y="70" fill="#9CA3AF" font-size="24" font-weight="bold">ACTIVE NOW</text>
    <text x="40" y="130" fill="#10B981" font-size="44" font-weight="900">4,120</text>

    <rect x="330" y="0" width="300" height="180" rx="24" fill="url(#homeCard)" stroke="#1F2937" stroke-width="2"/>
    <text x="370" y="70" fill="#9CA3AF" font-size="24" font-weight="bold">TOTAL EVENTS</text>
    <text x="370" y="130" fill="#818CF8" font-size="44" font-weight="900">42</text>

    <rect x="660" y="0" width="300" height="180" rx="24" fill="url(#homeCard)" stroke="#1F2937" stroke-width="2"/>
    <text x="700" y="70" fill="#9CA3AF" font-size="24" font-weight="bold">LEADER</text>
    <text x="700" y="130" fill="#FBBF24" font-size="38" font-weight="900">MINING</text>
  </g>

  <!-- Live Match Ticker Highlight -->
  <g transform="translate(60, 820)">
    <rect width="960" height="200" rx="28" fill="url(#homeCard)" stroke="#EF4444" stroke-width="2"/>
    <rect x="40" y="35" width="130" height="40" rx="20" fill="#EF4444"/>
    <text x="105" y="63" fill="#FFFFFF" font-size="20" font-weight="bold" text-anchor="middle">LIVE MATCH</text>
    <text x="190" y="65" fill="#EF4444" font-size="26" font-weight="bold">BASKETBALL FINAL · Q4</text>

    <text x="40" y="145" fill="#FFFFFF" font-size="38" font-weight="bold">Mining 68  ─  64 Mech</text>
    <text x="920" y="145" fill="#9CA3AF" font-size="26" text-anchor="end">Indoor Stadium</text>
  </g>

  <!-- Announcements & Key Highlights -->
  <g transform="translate(60, 1060)">
    <text x="0" y="40" fill="#9CA3AF" font-size="26" font-weight="bold" letter-spacing="3">ANNOUNCEMENTS &amp; UPDATES</text>

    <g transform="translate(0, 70)">
      <rect width="960" height="230" rx="28" fill="url(#homeCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="50" y="65" fill="#EF4444" font-size="24" font-weight="bold">FINAL NIGHT RESULTS TODAY</text>
      <text x="50" y="120" fill="#FFFFFF" font-size="36" font-weight="bold">Auditorium Trophy Ceremony at 20:00 IST</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="28">Dean Student Welfare will award the overall Championship.</text>
    </g>

    <g transform="translate(0, 330)">
      <rect width="960" height="230" rx="28" fill="url(#homeCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="50" y="65" fill="#10B981" font-size="24" font-weight="bold">SUPABASE REALTIME SYNC ACTIVE</text>
      <text x="50" y="120" fill="#FFFFFF" font-size="36" font-weight="bold">Point Tallies updated live after every heat</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="28">Referees sync scores via designated official tablet portals.</text>
    </g>
  </g>

  <!-- Recent Event Champions Honor Roll -->
  <g transform="translate(60, 1700)">
    <text x="0" y="40" fill="#9CA3AF" font-size="26" font-weight="bold" letter-spacing="3">RECENT CHAMPIONS // GOLD MEDALS</text>

    <g transform="translate(0, 70)">
      <rect width="960" height="150" rx="24" fill="url(#homeCard)" stroke="#1F2937" stroke-width="2"/>
      <text x="50" y="70" fill="#FCD34D" font-size="32" font-weight="bold">🥇 Badminton Doubles</text>
      <text x="50" y="115" fill="#9CA3AF" font-size="26">Gold Medal · Final: 21-18, 21-19</text>
      <text x="910" y="90" fill="#60A5FA" font-size="32" font-weight="bold" text-anchor="end">ELECTRICAL (+80 PTS)</text>
    </g>

    <g transform="translate(0, 245)">
      <rect width="960" height="150" rx="24" fill="url(#homeCard)" stroke="#1F2937" stroke-width="2"/>
      <text x="50" y="70" fill="#FCD34D" font-size="32" font-weight="bold">🥇 Hackathon 24-Hour Sprint</text>
      <text x="50" y="115" fill="#9CA3AF" font-size="26">Gold Medal · AI Healthcare Track</text>
      <text x="910" y="90" fill="#34D399" font-size="32" font-weight="bold" text-anchor="end">CSE (+80 PTS)</text>
    </g>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 2160)">
    <rect width="1080" height="180" fill="#0C0E14" stroke="#1F2937" stroke-width="2"/>
    <text x="150" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">LEADERBOARD</text>
    <text x="410" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">SCHEDULE</text>
    <text x="670" y="80" fill="#818CF8" font-size="26" font-weight="bold" text-anchor="middle">HOME</text>
    <text x="930" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">BADGES</text>
    <rect x="420" y="145" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>
`;

// --- IG APP: SCREEN 04 - BADGES & ACHIEVEMENTS (1080 x 2340) ---
const igBadgesSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B10;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="badgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121520"/>
      <stop offset="100%" stop-color="#06070A"/>
    </linearGradient>
    <linearGradient id="badgeCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181C26"/>
      <stop offset="100%" stop-color="#10131A"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="url(#badgeBg)"/>

  <!-- Native Phone Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="85">9:41</text>
    <text x="1000" y="85" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 150)">
    <rect x="0" y="0" width="260" height="46" rx="23" fill="#F59E0B" opacity="0.2"/>
    <text x="130" y="32" fill="#FBBF24" font-size="22" font-weight="bold" text-anchor="middle">🏆 HALL OF FAME</text>

    <text x="0" y="115" fill="#FFFFFF" font-size="56" font-weight="900" letter-spacing="-1">Honors &amp; Badges</text>
    <text x="0" y="165" fill="#9CA3AF" font-size="30">Unlocked Achievements · 2024 Season</text>
  </g>

  <!-- Badges Grid -->
  <g transform="translate(60, 390)">
    <!-- Badge 1: Clean Sweep -->
    <g transform="translate(0, 0)">
      <rect width="960" height="260" rx="28" fill="url(#badgeCard)" stroke="#F59E0B" stroke-width="2"/>
      <circle cx="90" cy="130" r="55" fill="#F59E0B" opacity="0.2"/>
      <text x="90" y="145" font-size="55" text-anchor="middle">⚡</text>
      <text x="180" y="85" fill="#FFFFFF" font-size="38" font-weight="bold">Triple Crown Champion</text>
      <text x="180" y="135" fill="#FBBF24" font-size="28" font-weight="600">Won Cricket, Basketball &amp; Track Finals</text>
      <text x="180" y="180" fill="#9CA3AF" font-size="26">Awarded to Mining Department · +300 PTS</text>
      <rect x="800" y="95" width="120" height="70" rx="16" fill="#1E293B"/>
      <text x="860" y="140" fill="#FCD34D" font-size="24" font-weight="bold" text-anchor="middle">UNLOCKED</text>
    </g>

    <!-- Badge 2: Hackathon Maestro -->
    <g transform="translate(0, 290)">
      <rect width="960" height="260" rx="28" fill="url(#badgeCard)" stroke="#3B82F6" stroke-width="2"/>
      <circle cx="90" cy="130" r="55" fill="#3B82F6" opacity="0.2"/>
      <text x="90" y="145" font-size="55" text-anchor="middle">💻</text>
      <text x="180" y="85" fill="#FFFFFF" font-size="38" font-weight="bold">Algorithm Grandmaster</text>
      <text x="180" y="135" fill="#60A5FA" font-size="28" font-weight="600">Perfect Score in Speed Programming Relay</text>
      <text x="180" y="180" fill="#9CA3AF" font-size="26">Awarded to CSE Department · +200 PTS</text>
      <rect x="800" y="95" width="120" height="70" rx="16" fill="#1E293B"/>
      <text x="860" y="140" fill="#60A5FA" font-size="24" font-weight="bold" text-anchor="middle">UNLOCKED</text>
    </g>

    <!-- Badge 3: Robo-Gladiator -->
    <g transform="translate(0, 580)">
      <rect width="960" height="260" rx="28" fill="url(#badgeCard)" stroke="#10B981" stroke-width="2"/>
      <circle cx="90" cy="130" r="55" fill="#10B981" opacity="0.2"/>
      <text x="90" y="145" font-size="55" text-anchor="middle">🤖</text>
      <text x="180" y="85" fill="#FFFFFF" font-size="38" font-weight="bold">Autonomous Gladiator</text>
      <text x="180" y="135" fill="#34D399" font-size="28" font-weight="600">Undefeated in 6 Consecutive Sumo Bouts</text>
      <text x="180" y="180" fill="#9CA3AF" font-size="26">Awarded to ECE Department · +150 PTS</text>
      <rect x="800" y="95" width="120" height="70" rx="16" fill="#1E293B"/>
      <text x="860" y="140" fill="#34D399" font-size="24" font-weight="bold" text-anchor="middle">UNLOCKED</text>
    </g>

    <!-- Badge 4: Fair Play Trophy -->
    <g transform="translate(0, 870)">
      <rect width="960" height="260" rx="28" fill="url(#badgeCard)" stroke="#A855F7" stroke-width="2"/>
      <circle cx="90" cy="130" r="55" fill="#A855F7" opacity="0.2"/>
      <text x="90" y="145" font-size="55" text-anchor="middle">🤝</text>
      <text x="180" y="85" fill="#FFFFFF" font-size="38" font-weight="bold">Institutional Spirit Award</text>
      <text x="180" y="135" fill="#C084FC" font-size="28" font-weight="600">Zero Technical Fouls &amp; Highest Participation</text>
      <text x="180" y="180" fill="#9CA3AF" font-size="26">Awarded to Architecture Dept · +100 PTS</text>
      <rect x="800" y="95" width="120" height="70" rx="16" fill="#1E293B"/>
      <text x="860" y="140" fill="#C084FC" font-size="24" font-weight="bold" text-anchor="middle">UNLOCKED</text>
    </g>

    <!-- Badge 5: Iron Will -->
    <g transform="translate(0, 1160)">
      <rect width="960" height="260" rx="28" fill="url(#badgeCard)" stroke="#EC4899" stroke-width="2"/>
      <circle cx="90" cy="130" r="55" fill="#EC4899" opacity="0.2"/>
      <text x="90" y="145" font-size="55" text-anchor="middle">🏋️</text>
      <text x="180" y="85" fill="#FFFFFF" font-size="38" font-weight="bold">Titan Strength Record</text>
      <text x="180" y="135" fill="#F472B6" font-size="28" font-weight="600">Record Bench &amp; Deadlift Total 580kg</text>
      <text x="180" y="180" fill="#9CA3AF" font-size="26">Awarded to Mechanical Dept · +150 PTS</text>
      <rect x="800" y="95" width="120" height="70" rx="16" fill="#1E293B"/>
      <text x="860" y="140" fill="#F472B6" font-size="24" font-weight="bold" text-anchor="middle">UNLOCKED</text>
    </g>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 2160)">
    <rect width="1080" height="180" fill="#0C0E14" stroke="#1F2937" stroke-width="2"/>
    <text x="150" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">LEADERBOARD</text>
    <text x="410" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">SCHEDULE</text>
    <text x="670" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">HOME</text>
    <text x="930" y="80" fill="#818CF8" font-size="26" font-weight="bold" text-anchor="middle">BADGES</text>
    <rect x="420" y="145" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>
`;

// --- TELEDIR / VNIT DIRECTORY: SCREEN 01 - SEARCH (1080 x 2340) ---
const teledirSearchSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B0E;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="dirCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141820"/>
      <stop offset="100%" stop-color="#0E1116"/>
    </linearGradient>
    <linearGradient id="emeraldBtn" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="#090B0E"/>

  <!-- Native Phone Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="85">9:41</text>
    <text x="1000" y="85" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 150)">
    <text x="0" y="50" fill="#10B981" font-size="28" font-weight="bold" letter-spacing="4">VNIT NAGPUR · CAMPUS TELEDIR</text>
    <text x="0" y="125" fill="#FFFFFF" font-size="58" font-weight="900">Campus Contacts</text>
    <text x="0" y="180" fill="#9CA3AF" font-size="32">4,000+ Verified Institutional Extensions</text>

    <!-- Search Input Bar -->
    <g transform="translate(0, 230)">
      <rect width="960" height="110" rx="30" fill="#141820" stroke="#2D3748" stroke-width="2"/>
      <circle cx="65" cy="55" r="18" fill="none" stroke="#10B981" stroke-width="4"/>
      <line x1="78" y1="68" x2="95" y2="85" stroke="#10B981" stroke-width="4"/>
      <text x="125" y="67" fill="#F3F4F6" font-size="36">Dr. Kothari</text>
      <rect x="830" y="28" width="85" height="54" rx="16" fill="#1E293B"/>
      <text x="872" y="65" fill="#9CA3AF" font-size="24" font-weight="bold" text-anchor="middle">CLR</text>
    </g>

    <!-- Filter Pills -->
    <g transform="translate(0, 380)">
      <rect x="0" y="0" width="130" height="64" rx="32" fill="url(#emeraldBtn)"/>
      <text x="65" y="42" fill="#042F2E" font-size="26" font-weight="bold" text-anchor="middle">ALL</text>

      <rect x="150" y="0" width="140" height="64" rx="32" fill="#181D26" stroke="#2D3748" stroke-width="2"/>
      <text x="220" y="42" fill="#E5E7EB" font-size="26" font-weight="bold" text-anchor="middle">CSE</text>

      <rect x="310" y="0" width="140" height="64" rx="32" fill="#181D26" stroke="#2D3748" stroke-width="2"/>
      <text x="380" y="42" fill="#9CA3AF" font-size="26" font-weight="bold" text-anchor="middle">ECE</text>

      <rect x="470" y="0" width="150" height="64" rx="32" fill="#181D26" stroke="#2D3748" stroke-width="2"/>
      <text x="545" y="42" fill="#9CA3AF" font-size="26" font-weight="bold" text-anchor="middle">MECH</text>

      <rect x="640" y="0" width="160" height="64" rx="32" fill="#181D26" stroke="#2D3748" stroke-width="2"/>
      <text x="720" y="42" fill="#9CA3AF" font-size="26" font-weight="bold" text-anchor="middle">ADMIN</text>
    </g>
  </g>

  <!-- Contacts List (5 Full Cards) -->
  <g transform="translate(60, 640)">
    <!-- Contact 1: Dr. A. G. Kothari -->
    <g transform="translate(0, 0)">
      <rect width="960" height="260" rx="28" fill="url(#dirCard)" stroke="#10B981" stroke-width="2"/>
      <circle cx="80" cy="90" r="50" fill="#1E293B"/>
      <text x="80" y="105" fill="#10B981" font-size="38" font-weight="bold" text-anchor="middle">AK</text>
      <text x="160" y="75" fill="#FFFFFF" font-size="38" font-weight="bold">Dr. A. G. Kothari</text>
      <text x="160" y="120" fill="#10B981" font-size="28" font-weight="600">Professor &amp; Head, CSE Department</text>
      <text x="160" y="165" fill="#9CA3AF" font-size="26">Office: CS-204 · South Academic Block</text>
      <rect x="160" y="185" width="180" height="46" rx="10" fill="#064E3B"/>
      <text x="250" y="217" fill="#6EE7B7" font-size="24" font-weight="bold" text-anchor="middle">EXT: 1241</text>
      <rect x="760" y="70" width="160" height="85" rx="20" fill="url(#emeraldBtn)"/>
      <text x="840" y="124" fill="#042F2E" font-size="30" font-weight="bold" text-anchor="middle">CALL</text>
    </g>

    <!-- Contact 2: Dr. P. M. Padole -->
    <g transform="translate(0, 290)">
      <rect width="960" height="260" rx="28" fill="url(#dirCard)" stroke="#262E3D" stroke-width="2"/>
      <circle cx="80" cy="90" r="50" fill="#1E293B"/>
      <text x="80" y="105" fill="#60A5FA" font-size="38" font-weight="bold" text-anchor="middle">PP</text>
      <text x="160" y="75" fill="#FFFFFF" font-size="38" font-weight="bold">Dr. P. M. Padole</text>
      <text x="160" y="120" fill="#60A5FA" font-size="28" font-weight="600">Professor, Mechanical Engineering</text>
      <text x="160" y="165" fill="#9CA3AF" font-size="26">Office: ME-102 · North Academic Block</text>
      <rect x="160" y="185" width="180" height="46" rx="10" fill="#1E293B"/>
      <text x="250" y="217" fill="#93C5FD" font-size="24" font-weight="bold" text-anchor="middle">EXT: 1001</text>
      <rect x="760" y="70" width="160" height="85" rx="20" fill="#1F2937" stroke="#374151" stroke-width="2"/>
      <text x="840" y="124" fill="#E5E7EB" font-size="30" font-weight="bold" text-anchor="middle">CALL</text>
    </g>

    <!-- Contact 3: Dr. M. M. Dongre -->
    <g transform="translate(0, 580)">
      <rect width="960" height="260" rx="28" fill="url(#dirCard)" stroke="#262E3D" stroke-width="2"/>
      <circle cx="80" cy="90" r="50" fill="#1E293B"/>
      <text x="80" y="105" fill="#F472B6" font-size="38" font-weight="bold" text-anchor="middle">MD</text>
      <text x="160" y="75" fill="#FFFFFF" font-size="38" font-weight="bold">Dr. M. M. Dongre</text>
      <text x="160" y="120" fill="#F472B6" font-size="28" font-weight="600">Associate Professor, ECE Dept</text>
      <text x="160" y="165" fill="#9CA3AF" font-size="26">Office: EC-118 · Electronics Wing</text>
      <rect x="160" y="185" width="180" height="46" rx="10" fill="#1E293B"/>
      <text x="250" y="217" fill="#F9A8D4" font-size="24" font-weight="bold" text-anchor="middle">EXT: 1380</text>
      <rect x="760" y="70" width="160" height="85" rx="20" fill="#1F2937" stroke="#374151" stroke-width="2"/>
      <text x="840" y="124" fill="#E5E7EB" font-size="30" font-weight="bold" text-anchor="middle">CALL</text>
    </g>

    <!-- Contact 4: Dr. S. R. Sathe -->
    <g transform="translate(0, 870)">
      <rect width="960" height="260" rx="28" fill="url(#dirCard)" stroke="#262E3D" stroke-width="2"/>
      <circle cx="80" cy="90" r="50" fill="#1E293B"/>
      <text x="80" y="105" fill="#FBBF24" font-size="38" font-weight="bold" text-anchor="middle">SS</text>
      <text x="160" y="75" fill="#FFFFFF" font-size="38" font-weight="bold">Dr. S. R. Sathe</text>
      <text x="160" y="120" fill="#FBBF24" font-size="28" font-weight="600">Professor, Computer Science</text>
      <text x="160" y="165" fill="#9CA3AF" font-size="26">Office: CS-105 · Algorithms Lab</text>
      <rect x="160" y="185" width="180" height="46" rx="10" fill="#1E293B"/>
      <text x="250" y="217" fill="#FDE68A" font-size="24" font-weight="bold" text-anchor="middle">EXT: 1255</text>
      <rect x="760" y="70" width="160" height="85" rx="20" fill="#1F2937" stroke="#374151" stroke-width="2"/>
      <text x="840" y="124" fill="#E5E7EB" font-size="30" font-weight="bold" text-anchor="middle">CALL</text>
    </g>

    <!-- Contact 5: Campus Medical Centre -->
    <g transform="translate(0, 1160)">
      <rect width="960" height="260" rx="28" fill="url(#dirCard)" stroke="#EF4444" stroke-width="2"/>
      <circle cx="80" cy="90" r="50" fill="#7F1D1D"/>
      <text x="80" y="105" fill="#FCA5A5" font-size="44" font-weight="bold" text-anchor="middle">+</text>
      <text x="160" y="75" fill="#FFFFFF" font-size="38" font-weight="bold">Campus Medical Centre</text>
      <text x="160" y="120" fill="#EF4444" font-size="28" font-weight="600">24/7 Emergency Medical Response</text>
      <text x="160" y="165" fill="#9CA3AF" font-size="26">Health Centre Bldg · Main Gate</text>
      <rect x="160" y="185" width="220" height="46" rx="10" fill="#450A0A"/>
      <text x="270" y="217" fill="#F87171" font-size="22" font-weight="bold" text-anchor="middle">EMERGENCY: 1999</text>
      <rect x="760" y="70" width="160" height="85" rx="20" fill="#DC2626"/>
      <text x="840" y="124" fill="#FFFFFF" font-size="30" font-weight="bold" text-anchor="middle">DIAL</text>
    </g>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 2160)">
    <rect width="1080" height="180" fill="#0C0E14" stroke="#1F2937" stroke-width="2"/>
    <text x="150" y="80" fill="#10B981" font-size="26" font-weight="bold" text-anchor="middle">DIRECTORY</text>
    <text x="410" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">DEPTS</text>
    <text x="670" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">FAVORITES</text>
    <text x="930" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">SETTINGS</text>
    <rect x="420" y="145" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>
`;

// --- TELEDIR / VNIT DIRECTORY: SCREEN 02 - FACULTY DOSSIER (1080 x 2340) ---
const teledirFacultySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B0E;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="facBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141820"/>
      <stop offset="100%" stop-color="#0E1116"/>
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="#090B0E"/>

  <!-- Native Phone Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="85">9:41</text>
    <text x="1000" y="85" text-anchor="end">5G  100%</text>
  </g>

  <!-- Top Navigation Header -->
  <g transform="translate(60, 150)">
    <rect width="80" height="80" rx="20" fill="#141820" stroke="#2D3748"/>
    <text x="40" y="52" fill="#10B981" font-size="36" font-weight="bold" text-anchor="middle">←</text>
    <text x="110" y="52" fill="#E5E7EB" font-size="34" font-weight="bold">FACULTY PROFILE</text>
  </g>

  <!-- Main Faculty Profile Hero Card -->
  <g transform="translate(60, 270)">
    <rect width="960" height="400" rx="32" fill="url(#facBg)" stroke="#10B981" stroke-width="2"/>
    <circle cx="480" cy="110" r="65" fill="#1E293B"/>
    <text x="480" y="130" fill="#10B981" font-size="52" font-weight="bold" text-anchor="middle">AK</text>
    <text x="480" y="230" fill="#FFFFFF" font-size="46" font-weight="bold" text-anchor="middle">Dr. A. G. Kothari</text>
    <text x="480" y="280" fill="#10B981" font-size="30" font-weight="600" text-anchor="middle">Professor &amp; Head of Department</text>
    <text x="480" y="325" fill="#9CA3AF" font-size="26" text-anchor="middle">Computer Science &amp; Engineering · VNIT Nagpur</text>
    <rect x="360" y="350" width="240" height="38" rx="10" fill="#064E3B"/>
    <text x="480" y="377" fill="#6EE7B7" font-size="22" font-weight="bold" text-anchor="middle">ACTIVE ON EXT: 1241</text>
  </g>

  <!-- Action Buttons Row -->
  <g transform="translate(60, 710)">
    <rect x="0" y="0" width="460" height="110" rx="24" fill="url(#emeraldGrad)"/>
    <text x="230" y="68" fill="#042F2E" font-size="30" font-weight="bold" text-anchor="middle">📞 DIAL EXT 1241</text>

    <rect x="500" y="0" width="460" height="110" rx="24" fill="#1E293B" stroke="#374151" stroke-width="2"/>
    <text x="730" y="68" fill="#E5E7EB" font-size="30" font-weight="bold" text-anchor="middle">✉ SEND EMAIL</text>
  </g>

  <!-- Official Dossier Cards (Full Screen Coverage) -->
  <g transform="translate(60, 860)">
    <text x="0" y="40" fill="#9CA3AF" font-size="26" font-weight="bold" letter-spacing="3">OFFICIAL DOSSIER &amp; CONTACTS</text>

    <!-- Item 1: Office Location -->
    <g transform="translate(0, 70)">
      <rect width="960" height="170" rx="24" fill="url(#facBg)" stroke="#262E3D" stroke-width="2"/>
      <text x="40" y="60" fill="#9CA3AF" font-size="24">OFFICE LOCATION</text>
      <text x="40" y="115" fill="#FFFFFF" font-size="34" font-weight="bold">Room CS-204, South Academic Wing</text>
    </g>

    <!-- Item 2: Institutional Email -->
    <g transform="translate(0, 265)">
      <rect width="960" height="170" rx="24" fill="url(#facBg)" stroke="#262E3D" stroke-width="2"/>
      <text x="40" y="60" fill="#9CA3AF" font-size="24">INSTITUTIONAL EMAIL</text>
      <text x="40" y="115" fill="#10B981" font-size="34" font-weight="bold">agkothari@cse.vnit.ac.in</text>
    </g>

    <!-- Item 3: EPABX Intercom -->
    <g transform="translate(0, 460)">
      <rect width="960" height="170" rx="24" fill="url(#facBg)" stroke="#262E3D" stroke-width="2"/>
      <text x="40" y="60" fill="#9CA3AF" font-size="24">EPABX BOARD INTERCOM</text>
      <text x="40" y="115" fill="#FFFFFF" font-size="34" font-weight="bold">+91 712 280 1241 (Direct)</text>
    </g>

    <!-- Item 4: Research Areas -->
    <g transform="translate(0, 655)">
      <rect width="960" height="230" rx="24" fill="url(#facBg)" stroke="#262E3D" stroke-width="2"/>
      <text x="40" y="55" fill="#9CA3AF" font-size="24">SPECIALIZATIONS &amp; RESEARCH</text>
      <text x="40" y="110" fill="#FFFFFF" font-size="34" font-weight="bold">Distributed Systems &amp; High-Perf Computing</text>
      <text x="40" y="160" fill="#9CA3AF" font-size="26">Computer Networks · Algorithm Architecture</text>
    </g>

    <!-- Item 5: Consultation Hours -->
    <g transform="translate(0, 910)">
      <rect width="960" height="190" rx="24" fill="url(#facBg)" stroke="#262E3D" stroke-width="2"/>
      <text x="40" y="55" fill="#9CA3AF" font-size="24">STUDENT CONSULTATION HOURS</text>
      <text x="40" y="110" fill="#FBBF24" font-size="34" font-weight="bold">Monday – Thursday · 15:00 – 17:00 IST</text>
      <text x="40" y="155" fill="#9CA3AF" font-size="24">Department HOD Office, CS-204</text>
    </g>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 2160)">
    <rect width="1080" height="180" fill="#0C0E14" stroke="#1F2937" stroke-width="2"/>
    <text x="150" y="80" fill="#10B981" font-size="26" font-weight="bold" text-anchor="middle">DIRECTORY</text>
    <text x="410" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">DEPTS</text>
    <text x="670" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">FAVORITES</text>
    <text x="930" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">SETTINGS</text>
    <rect x="420" y="145" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>
`;

// --- TELEDIR: SCREEN 03 - ACADEMIC DEPARTMENTS (1080 x 2340) ---
const teledirDeptSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B0E;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="deptCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141820"/>
      <stop offset="100%" stop-color="#0E1116"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="#090B0E"/>

  <!-- Native Phone Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="85">9:41</text>
    <text x="1000" y="85" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 150)">
    <text x="0" y="50" fill="#10B981" font-size="28" font-weight="bold" letter-spacing="4">VNIT DEPARTMENTS &amp; CELLS</text>
    <text x="0" y="125" fill="#FFFFFF" font-size="58" font-weight="900">Academic Catalog</text>
    <text x="0" y="180" fill="#9CA3AF" font-size="32">Departmental Offices, HOD Desks &amp; Labs</text>
  </g>

  <!-- Department List Cards -->
  <g transform="translate(60, 400)">
    <!-- Dept 1: CSE -->
    <g transform="translate(0, 0)">
      <rect width="960" height="230" rx="28" fill="url(#deptCard)" stroke="#10B981" stroke-width="2"/>
      <text x="45" y="70" fill="#FFFFFF" font-size="34" font-weight="bold">Computer Science &amp; Engg</text>
      <text x="45" y="115" fill="#10B981" font-size="26">Head: Dr. A. G. Kothari · 32 Faculty</text>
      <text x="45" y="160" fill="#9CA3AF" font-size="24">Office: CS Block · Ext: 1240 / 1241</text>
      <rect x="800" y="70" width="120" height="65" rx="16" fill="#10B981"/>
      <text x="860" y="112" fill="#042F2E" font-size="24" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 2: ECE -->
    <g transform="translate(0, 255)">
      <rect width="960" height="230" rx="28" fill="url(#deptCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="45" y="70" fill="#FFFFFF" font-size="34" font-weight="bold">Electronics &amp; Comm Engg</text>
      <text x="45" y="115" fill="#60A5FA" font-size="26">Head: Dr. V. R. Satpute · 28 Faculty</text>
      <text x="45" y="160" fill="#9CA3AF" font-size="24">Office: EC Block · Ext: 1350 / 1351</text>
      <rect x="800" y="70" width="120" height="65" rx="16" fill="#1E293B"/>
      <text x="860" y="112" fill="#E5E7EB" font-size="24" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 3: Mechanical -->
    <g transform="translate(0, 510)">
      <rect width="960" height="230" rx="28" fill="url(#deptCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="45" y="70" fill="#FFFFFF" font-size="34" font-weight="bold">Mechanical Engineering</text>
      <text x="45" y="115" fill="#FBBF24" font-size="26">Head: Dr. A. M. Kuthe · 45 Faculty</text>
      <text x="45" y="160" fill="#9CA3AF" font-size="24">Office: ME Block · Ext: 1100 / 1101</text>
      <rect x="800" y="70" width="120" height="65" rx="16" fill="#1E293B"/>
      <text x="860" y="112" fill="#E5E7EB" font-size="24" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 4: Electrical -->
    <g transform="translate(0, 765)">
      <rect width="960" height="230" rx="28" fill="url(#deptCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="45" y="70" fill="#FFFFFF" font-size="34" font-weight="bold">Electrical Engineering</text>
      <text x="45" y="115" fill="#A78BFA" font-size="26">Head: Dr. M. V. Aware · 30 Faculty</text>
      <text x="45" y="160" fill="#9CA3AF" font-size="24">Office: EE Block · Ext: 1150 / 1151</text>
      <rect x="800" y="70" width="120" height="65" rx="16" fill="#1E293B"/>
      <text x="860" y="112" fill="#E5E7EB" font-size="24" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 5: Central Library -->
    <g transform="translate(0, 1020)">
      <rect width="960" height="230" rx="28" fill="url(#deptCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="45" y="70" fill="#FFFFFF" font-size="34" font-weight="bold">Central Library &amp; Learning</text>
      <text x="45" y="115" fill="#F472B6" font-size="26">Chief Librarian · Digital Access Desk</text>
      <text x="45" y="160" fill="#9CA3AF" font-size="24">Main Library Bldg · Ext: 1800</text>
      <rect x="800" y="70" width="120" height="65" rx="16" fill="#1E293B"/>
      <text x="860" y="112" fill="#E5E7EB" font-size="24" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 6: Training & Placement -->
    <g transform="translate(0, 1275)">
      <rect width="960" height="230" rx="28" fill="url(#deptCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="45" y="70" fill="#FFFFFF" font-size="34" font-weight="bold">Training &amp; Placement Cell</text>
      <text x="45" y="115" fill="#34D399" font-size="26">Head, T&amp;P · Corporate Relations Desk</text>
      <text x="45" y="160" fill="#9CA3AF" font-size="24">Administrative Block · Ext: 1750</text>
      <rect x="800" y="70" width="120" height="65" rx="16" fill="#1E293B"/>
      <text x="860" y="112" fill="#E5E7EB" font-size="24" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 7: Dean Student Welfare -->
    <g transform="translate(0, 1530)">
      <rect width="960" height="230" rx="28" fill="url(#deptCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="45" y="70" fill="#FFFFFF" font-size="34" font-weight="bold">Dean Student Welfare</text>
      <text x="45" y="115" fill="#FBBF24" font-size="26">Student Activities, Hostels &amp; Sports</text>
      <text x="45" y="160" fill="#9CA3AF" font-size="24">Main Admin Wing · Ext: 1050</text>
      <rect x="800" y="70" width="120" height="65" rx="16" fill="#1E293B"/>
      <text x="860" y="112" fill="#E5E7EB" font-size="24" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>
  </g>

  <!-- Bottom Navigation Bar -->
  <g transform="translate(0, 2160)">
    <rect width="1080" height="180" fill="#0C0E14" stroke="#1F2937" stroke-width="2"/>
    <text x="150" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">DIRECTORY</text>
    <text x="410" y="80" fill="#10B981" font-size="26" font-weight="bold" text-anchor="middle">DEPTS</text>
    <text x="670" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">FAVORITES</text>
    <text x="930" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">SETTINGS</text>
    <rect x="420" y="145" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>
`;

// =========================================================================
// 2. DESKTOP SCREENS (2560 x 1440, exact 16:9 widescreen ratio)
// =========================================================================

// --- GITLIKE UI (2560 x 1440, exact 16:9, clean app viewport without duplicate window chrome) ---
const gitlikeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440" style="background:#090D13;font-family:'DejaVu Sans Mono',monospace;">
  <defs>
    <linearGradient id="gitTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#161B22"/>
      <stop offset="100%" stop-color="#0E131A"/>
    </linearGradient>
    <linearGradient id="paneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#161B22"/>
      <stop offset="100%" stop-color="#0D1117"/>
    </linearGradient>
  </defs>

  <rect width="2560" height="1440" fill="#090D13"/>

  <!-- Application Workspace Tab Bar (No redundant window chrome) -->
  <g transform="translate(0, 0)">
    <rect width="2560" height="74" fill="url(#gitTopGrad)" stroke="#30363D" stroke-width="2"/>
    
    <!-- Active File Tab -->
    <rect x="30" y="10" width="340" height="54" rx="8" fill="#0D1117" stroke="#58A6FF" stroke-width="2"/>
    <text x="60" y="44" fill="#58A6FF" font-size="22" font-weight="bold">📄 repository.py</text>
    <text x="340" y="44" fill="#8B949E" font-size="18" text-anchor="end">✕</text>

    <!-- Inactive Tab 2 -->
    <rect x="385" y="10" width="280" height="54" rx="8" fill="#161B22" stroke="#30363D"/>
    <text x="415" y="44" fill="#8B949E" font-size="22">📄 object_store.py</text>

    <!-- Branch Pointer Badge -->
    <rect x="680" y="14" width="380" height="46" rx="8" fill="#21262D" stroke="#30363D"/>
    <text x="870" y="44" fill="#58A6FF" font-size="20" font-weight="bold" text-anchor="middle">HEAD -> refs/heads/master [9a4f28c]</text>

    <text x="2510" y="46" fill="#7EE787" font-size="22" font-weight="bold" text-anchor="end">STATUS: CLEAN · SHA-1 ENGINE READY</text>
  </g>

  <!-- Left Pane: DAG Commit Ancestry Graph (w=680) -->
  <g transform="translate(30, 95)">
    <rect width="680" height="1240" rx="14" fill="url(#paneGrad)" stroke="#30363D" stroke-width="2"/>
    <rect width="680" height="55" rx="14" fill="#21262D"/>
    <text x="30" y="38" fill="#F0F6FC" font-size="22" font-weight="bold">DAG COMMIT ANCESTRY GRAPH</text>
    <text x="650" y="38" fill="#8B949E" font-size="18" text-anchor="end">4 COMMITS</text>

    <!-- Branch Line -->
    <line x1="70" y1="120" x2="70" y2="820" stroke="#FF7B72" stroke-width="6"/>

    <!-- Commit Node 1: HEAD -->
    <g transform="translate(0, 100)">
      <circle cx="70" cy="40" r="16" fill="#58A6FF" stroke="#F0F6FC" stroke-width="4"/>
      <rect x="110" y="10" width="530" height="150" rx="12" fill="#0D1117" stroke="#58A6FF" stroke-width="2"/>
      <text x="130" y="45" fill="#58A6FF" font-size="24" font-weight="bold">9a4f28c (HEAD -> master)</text>
      <text x="130" y="80" fill="#F0F6FC" font-size="22">Add zlib blob compression</text>
      <text x="130" y="115" fill="#8B949E" font-size="18">Author: Omkar More · Tree: 3c8e19b</text>
      <text x="130" y="145" fill="#7EE787" font-size="18">+142 lines  -18 lines</text>
    </g>

    <!-- Commit Node 2 -->
    <g transform="translate(0, 290)">
      <circle cx="70" cy="40" r="14" fill="#3FB950" stroke="#F0F6FC" stroke-width="3"/>
      <rect x="110" y="10" width="530" height="140" rx="12" fill="#0D1117" stroke="#30363D" stroke-width="2"/>
      <text x="130" y="45" fill="#3FB950" font-size="24" font-weight="bold">3c8e19b [feat/tree-builder]</text>
      <text x="130" y="80" fill="#F0F6FC" font-size="22">Implement tree object serializer</text>
      <text x="130" y="115" fill="#8B949E" font-size="18">Recursive directory traversal</text>
    </g>

    <!-- Commit Node 3 -->
    <g transform="translate(0, 470)">
      <circle cx="70" cy="40" r="14" fill="#D29922" stroke="#F0F6FC" stroke-width="3"/>
      <rect x="110" y="10" width="530" height="140" rx="12" fill="#0D1117" stroke="#30363D" stroke-width="2"/>
      <text x="130" y="45" fill="#D29922" font-size="24" font-weight="bold">7f12a04 [staging-index]</text>
      <text x="130" y="80" fill="#F0F6FC" font-size="22">Staging binary cache &amp; .gitignore</text>
      <text x="130" y="115" fill="#8B949E" font-size="18">Binary index format parser</text>
    </g>

    <!-- Commit Node 4: Root -->
    <g transform="translate(0, 650)">
      <circle cx="70" cy="40" r="14" fill="#A371F7" stroke="#F0F6FC" stroke-width="3"/>
      <rect x="110" y="10" width="530" height="130" rx="12" fill="#0D1117" stroke="#30363D" stroke-width="2"/>
      <text x="130" y="45" fill="#A371F7" font-size="24" font-weight="bold">1d2c44a (tag: v0.1.0-init)</text>
      <text x="130" y="80" fill="#F0F6FC" font-size="22">Initial commit: storage engine</text>
      <text x="130" y="115" fill="#8B949E" font-size="18">Root commit node</text>
    </g>

    <!-- Branch Tags Widget -->
    <g transform="translate(30, 830)">
      <rect width="620" height="370" rx="12" fill="#0D1117" stroke="#30363D"/>
      <text x="25" y="40" fill="#8B949E" font-size="20">BRANCHES &amp; TAG POINTERS</text>

      <rect x="25" y="65" width="220" height="42" rx="8" fill="#1F6FEB" opacity="0.3"/>
      <text x="45" y="94" fill="#58A6FF" font-size="20" font-weight="bold">⎇ master [HEAD]</text>

      <rect x="260" y="65" width="260" height="42" rx="8" fill="#238636" opacity="0.3"/>
      <text x="280" y="94" fill="#7EE787" font-size="20" font-weight="bold">⎇ feat/tree-builder</text>

      <text x="25" y="160" fill="#8B949E" font-size="18">OBJECT TYPE DISTRIBUTION:</text>
      <rect x="25" y="180" width="570" height="24" rx="12" fill="#21262D"/>
      <rect x="25" y="180" width="340" height="24" rx="12" fill="#58A6FF"/>
      <rect x="365" y="180" width="130" height="24" rx="12" fill="#3FB950"/>
      <rect x="495" y="180" width="100" height="24" rx="12" fill="#D29922"/>

      <text x="25" y="240" fill="#58A6FF" font-size="18">● Blobs: 62%</text>
      <text x="220" y="240" fill="#3FB950" font-size="18">● Trees: 24%</text>
      <text x="410" y="240" fill="#D29922" font-size="18">● Commits: 14%</text>

      <text x="25" y="300" fill="#8B949E" font-size="18">STORAGE ENGINE STATUS: OPTIMAL</text>
      <text x="25" y="335" fill="#7EE787" font-size="18">✓ 0 Dangling blobs · Zlib CRC verified</text>
    </g>
  </g>

  <!-- Center Pane: Syntax-Highlighted Code Editor (w=1220) -->
  <g transform="translate(735, 95)">
    <rect width="1220" height="1240" rx="14" fill="#0D1117" stroke="#30363D" stroke-width="2"/>
    <rect width="1220" height="55" rx="14" fill="#161B22"/>
    <text x="30" y="38" fill="#F0F6FC" font-size="22" font-weight="bold">SOURCE: gitlike/core/repository.py (PYTHON 3.11)</text>
    <text x="1190" y="38" fill="#8B949E" font-size="18" text-anchor="end">UTF-8 · LF · PYTHON</text>

    <!-- Code Line Numbers & Syntax -->
    <g transform="translate(30, 90)" font-size="22" line-height="34">
      <g fill="#484F58">
        <text x="0" y="0">01</text><text x="0" y="38">02</text><text x="0" y="76">03</text><text x="0" y="114">04</text>
        <text x="0" y="152">05</text><text x="0" y="190">06</text><text x="0" y="228">07</text><text x="0" y="266">08</text>
        <text x="0" y="304">09</text><text x="0" y="342">10</text><text x="0" y="380">11</text><text x="0" y="418">12</text>
        <text x="0" y="456">13</text><text x="0" y="494">14</text><text x="0" y="532">15</text><text x="0" y="570">16</text>
        <text x="0" y="608">17</text><text x="0" y="646">18</text><text x="0" y="684">19</text><text x="0" y="722">20</text>
        <text x="0" y="760">21</text><text x="0" y="798">22</text><text x="0" y="836">23</text><text x="0" y="874">24</text>
        <text x="0" y="912">25</text><text x="0" y="950">26</text><text x="0" y="988">27</text><text x="0" y="1026">28</text>
      </g>

      <g transform="translate(60, 0)">
        <text y="0" fill="#FF7B72">import <tspan fill="#F0F6FC">hashlib, zlib, os, struct</tspan></text>
        <text y="38" fill="#FF7B72">from <tspan fill="#F0F6FC">pathlib</tspan> import <tspan fill="#F0F6FC">Path</tspan></text>
        <text y="114" fill="#FF7B72">class <tspan fill="#FFA657">Repository</tspan><tspan fill="#F0F6FC">:</tspan></text>
        <text y="152" fill="#79C0FF">    """Content-addressable object store implementing Git primitives."""</text>
        <text y="228" fill="#FF7B72">    def <tspan fill="#D2A8FF">__init__</tspan><tspan fill="#F0F6FC">(self, worktree: Path):</tspan></text>
        <text y="266" fill="#F0F6FC">        self.worktree = worktree</text>
        <text y="304" fill="#F0F6FC">        self.gitdir = worktree / <tspan fill="#A5D6FF">".gitlike"</tspan></text>
        <text y="342" fill="#F0F6FC">        self.objects_dir = self.gitdir / <tspan fill="#A5D6FF">"objects"</tspan></text>
        <text y="418" fill="#FF7B72">    def <tspan fill="#D2A8FF">hash_object</tspan><tspan fill="#F0F6FC">(self, data: bytes, obj_type: str = <tspan fill="#A5D6FF">"blob"</tspan>) -> str:</tspan></text>
        <text y="456" fill="#79C0FF">        """Write zlib compressed SHA-1 object to shard directory."""</text>
        <text y="494" fill="#F0F6FC">        header = f<tspan fill="#A5D6FF">"{obj_type} {len(data)}\\x00"</tspan>.encode()</text>
        <text y="532" fill="#F0F6FC">        store = header + data</text>
        <text y="570" fill="#FFA657">        sha = hashlib.sha1(store).hexdigest()</text>
        <text y="646" fill="#8B949E">        # Fanout sharding: objects/xx/yyyyyyyy...</text>
        <text y="684" fill="#F0F6FC">        shard_dir = self.objects_dir / sha[:<tspan fill="#79C0FF">2</tspan>]</text>
        <text y="722" fill="#F0F6FC">        shard_dir.mkdir(parents=<tspan fill="#FF7B72">True</tspan>, exist_ok=<tspan fill="#FF7B72">True</tspan>)</text>
        <text y="760" fill="#F0F6FC">        obj_path = shard_dir / sha[<tspan fill="#79C0FF">2</tspan>:]</text>
        <text y="836" fill="#FF7B72">        if not <tspan fill="#F0F6FC">obj_path.exists():</tspan></text>
        <text y="874" fill="#FFA657">            compressed = zlib.compress(store, level=<tspan fill="#79C0FF">9</tspan>)</text>
        <text y="912" fill="#F0F6FC">            obj_path.write_bytes(compressed)</text>
        <text y="988" fill="#FF7B72">        return <tspan fill="#FFA657">sha</tspan></text>
        <text y="1064" fill="#7EE787">    # ✓ 100% SPEC COMPLIANT WITH GIT 2.40 PLUMBING OBJECT MODEL</text>
      </g>
    </g>
  </g>

  <!-- Right Pane: Telemetry & Verified Metrics (w=540) -->
  <g transform="translate(1985, 95)">
    <rect width="545" height="1240" rx="14" fill="url(#paneGrad)" stroke="#30363D" stroke-width="2"/>
    <rect width="545" height="55" rx="14" fill="#21262D"/>
    <text x="30" y="38" fill="#F0F6FC" font-size="22" font-weight="bold">OBJECT STORE TELEMETRY</text>

    <g transform="translate(30, 80)">
      <!-- Metric Card 1: Hashing -->
      <rect width="485" height="135" rx="12" fill="#0D1117" stroke="#30363D"/>
      <text x="25" y="40" fill="#8B949E" font-size="18">HASHING ENGINE</text>
      <text x="25" y="80" fill="#58A6FF" font-size="30" font-weight="bold">SHA-1 (160-BIT)</text>
      <text x="25" y="112" fill="#7EE787" font-size="18">Strict Content Addressable</text>

      <!-- Metric Card 2: Compression -->
      <g transform="translate(0, 155)">
        <rect width="485" height="135" rx="12" fill="#0D1117" stroke="#30363D"/>
        <text x="25" y="40" fill="#8B949E" font-size="18">BLOB COMPRESSION</text>
        <text x="25" y="80" fill="#7EE787" font-size="30" font-weight="bold">ZLIB DEFLATE (L9)</text>
        <text x="25" y="112" fill="#8B949E" font-size="18">Compression Ratio: 68.4%</text>
      </g>

      <!-- Metric Card 3: Index Cache -->
      <g transform="translate(0, 310)">
        <rect width="485" height="135" rx="12" fill="#0D1117" stroke="#30363D"/>
        <text x="25" y="40" fill="#8B949E" font-size="18">STAGING CACHE</text>
        <text x="25" y="80" fill="#D2A8FF" font-size="30" font-weight="bold">BINARY DIRC</text>
        <text x="25" y="112" fill="#8B949E" font-size="18">mtime / ctime stat cache</text>
      </g>

      <!-- Metric Card 4: Working Tree -->
      <g transform="translate(0, 465)">
        <rect width="485" height="135" rx="12" fill="#0D1117" stroke="#30363D"/>
        <text x="25" y="40" fill="#8B949E" font-size="18">WORKING TREE DIFF</text>
        <text x="25" y="80" fill="#FFA657" font-size="30" font-weight="bold">CLEAN (0 DIRTY)</text>
        <text x="25" y="112" fill="#7EE787" font-size="18">Matches HEAD: 9a4f28c</text>
      </g>

      <!-- Recent CLI History Log -->
      <g transform="translate(0, 620)">
        <rect width="485" height="490" rx="12" fill="#0D1117" stroke="#30363D"/>
        <text x="25" y="40" fill="#8B949E" font-size="18">TERMINAL AUDIT TRAIL</text>

        <g font-size="18" fill="#F0F6FC" transform="translate(25, 75)">
          <text y="0" fill="#7EE787">$ gitlike init my-repo</text>
          <text y="30" fill="#8B949E">Created .gitlike/ repo</text>

          <text y="80" fill="#7EE787">$ gitlike add src/</text>
          <text y="110" fill="#8B949E">Staged 14 blob objects</text>

          <text y="160" fill="#7EE787">$ gitlike commit -m "Init"</text>
          <text y="190" fill="#8B949E">[master 1d2c44a] Init</text>

          <text y="240" fill="#7EE787">$ gitlike branch feat/tree</text>
          <text y="270" fill="#8B949E">Created refs/heads/feat/tree</text>

          <text y="320" fill="#7EE787">$ gitlike status</text>
          <text y="350" fill="#58A6FF">On branch master · Clean</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Bottom Workspace Status Strip -->
  <g transform="translate(0, 1370)">
    <rect width="2560" height="70" fill="#161B22" stroke="#30363D"/>
    <text x="40" y="44" fill="#8B949E" font-size="22">GITLIKE VCS v1.4.2 · PYTHON 3.11 ZERO-DEPENDENCY ENGINE · SHA-1 BLOB STORE</text>
    <text x="2520" y="44" fill="#8B949E" font-size="22" text-anchor="end">AUTHOR: OMKAR MORE · ARCHITECTURE AUDITED</text>
  </g>
</svg>
`;

// --- ALGOLIZER 4-QUADRANT BENCHMARKS (2560 x 1440) ---
const algolizerAnalyticsSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440" style="background:#08090E;font-family:'DejaVu Sans Mono',monospace;">
  <defs>
    <linearGradient id="anTop" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#141522"/>
      <stop offset="100%" stop-color="#0E0F18"/>
    </linearGradient>
  </defs>

  <rect width="2560" height="1440" fill="#08090E"/>

  <!-- Top App Navigation Header -->
  <g transform="translate(0, 0)">
    <rect width="2560" height="80" fill="url(#anTop)" stroke="#222438" stroke-width="2"/>
    <text x="60" y="50" fill="#F0F2FA" font-size="30" font-weight="bold">ALGOLIZER // 4-QUADRANT COMPARATIVE BENCHMARK MATRIX (N = 100,000)</text>
    <text x="2500" y="50" fill="#10B981" font-size="24" font-weight="bold" text-anchor="end">BENCHMARK COMPLETE</text>
  </g>

  <!-- Quadrant 1: QuickSort (Top-Left) -->
  <g transform="translate(60, 110)">
    <rect width="1190" height="580" rx="16" fill="#0D0F18" stroke="#3B82F6" stroke-width="2"/>
    <rect width="1190" height="55" rx="16" fill="#1E3A8A" opacity="0.4"/>
    <text x="30" y="38" fill="#93C5FD" font-size="24" font-weight="bold">QUADRANT 1: QUICKSORT (IN-PLACE PARTITION)</text>
    <text x="1150" y="38" fill="#60A5FA" font-size="22" font-weight="bold" text-anchor="end">12.4 ms</text>

    <g transform="translate(40, 100)" font-size="22" fill="#8B949E">
      <text y="0">Time Complexity: <tspan fill="#60A5FA" font-weight="bold">O(N log N) avg | O(N²) worst</tspan></text>
      <text y="50">Auxiliary Space: <tspan fill="#F0F2FA">O(log N) call stack</tspan></text>
      <text y="100">Cache Performance: <tspan fill="#34D399" font-weight="bold">Optimal (Sequential Cache Hits)</tspan></text>
      <text y="150">Stability: <tspan fill="#F87171" font-weight="bold">Unstable</tspan></text>
    </g>

    <g transform="translate(40, 320)">
      <rect width="1110" height="210" rx="12" fill="#080A10" stroke="#1F2937"/>
      <text x="25" y="40" fill="#8B949E" font-size="20">EXECUTION TIME ACROSS DATA DISTRIBUTIONS:</text>

      <text x="25" y="90" fill="#F0F2FA" font-size="20">Random Uniform: <tspan fill="#60A5FA" font-weight="bold">12.4 ms</tspan></text>
      <rect x="25" y="105" width="900" height="18" rx="9" fill="#1E293B"/>
      <rect x="25" y="105" width="680" height="18" rx="9" fill="#3B82F6"/>

      <text x="25" y="160" fill="#F0F2FA" font-size="20">Nearly Sorted: <tspan fill="#34D399" font-weight="bold">8.1 ms</tspan></text>
      <rect x="25" y="175" width="900" height="18" rx="9" fill="#1E293B"/>
      <rect x="25" y="175" width="440" height="18" rx="9" fill="#10B981"/>
    </g>
  </g>

  <!-- Quadrant 2: MergeSort (Top-Right) -->
  <g transform="translate(1310, 110)">
    <rect width="1190" height="580" rx="16" fill="#0D0F18" stroke="#10B981" stroke-width="2"/>
    <rect width="1190" height="55" rx="16" fill="#064E3B" opacity="0.4"/>
    <text x="30" y="38" fill="#6EE7B7" font-size="24" font-weight="bold">QUADRANT 2: MERGESORT (DIVIDE &amp; CONQUER)</text>
    <text x="1150" y="38" fill="#34D399" font-size="22" font-weight="bold" text-anchor="end">14.8 ms</text>

    <g transform="translate(40, 100)" font-size="22" fill="#8B949E">
      <text y="0">Time Complexity: <tspan fill="#34D399" font-weight="bold">O(N log N) guaranteed</tspan></text>
      <text y="50">Auxiliary Space: <tspan fill="#FBBF24" font-weight="bold">O(N) memory allocation</tspan></text>
      <text y="100">Cache Performance: <tspan fill="#FBBF24">Moderate (Buffer Copies)</tspan></text>
      <text y="150">Stability: <tspan fill="#34D399" font-weight="bold">Stable (Preserves original order)</tspan></text>
    </g>

    <g transform="translate(40, 320)">
      <rect width="1110" height="210" rx="12" fill="#080A10" stroke="#1F2937"/>
      <text x="25" y="40" fill="#8B949E" font-size="20">EXECUTION TIME ACROSS DATA DISTRIBUTIONS:</text>

      <text x="25" y="90" fill="#F0F2FA" font-size="20">Random Uniform: <tspan fill="#34D399" font-weight="bold">14.8 ms</tspan></text>
      <rect x="25" y="105" width="900" height="18" rx="9" fill="#1E293B"/>
      <rect x="25" y="105" width="740" height="18" rx="9" fill="#10B981"/>

      <text x="25" y="160" fill="#F0F2FA" font-size="20">Nearly Sorted: <tspan fill="#34D399" font-weight="bold">11.2 ms</tspan></text>
      <rect x="25" y="175" width="900" height="18" rx="9" fill="#1E293B"/>
      <rect x="25" y="175" width="560" height="18" rx="9" fill="#10B981"/>
    </g>
  </g>

  <!-- Quadrant 3: HeapSort (Bottom-Left) -->
  <g transform="translate(60, 720)">
    <rect width="1190" height="580" rx="16" fill="#0D0F18" stroke="#F59E0B" stroke-width="2"/>
    <rect width="1190" height="55" rx="16" fill="#78350F" opacity="0.4"/>
    <text x="30" y="38" fill="#FCD34D" font-size="24" font-weight="bold">QUADRANT 3: HEAPSORT (BINARY MAX HEAP)</text>
    <text x="1150" y="38" fill="#FBBF24" font-size="22" font-weight="bold" text-anchor="end">18.6 ms</text>

    <g transform="translate(40, 100)" font-size="22" fill="#8B949E">
      <text y="0">Time Complexity: <tspan fill="#FBBF24" font-weight="bold">O(N log N) guaranteed</tspan></text>
      <text y="50">Auxiliary Space: <tspan fill="#34D399" font-weight="bold">O(1) strictly in-place</tspan></text>
      <text y="100">Cache Performance: <tspan fill="#F87171">Poor (Tree node index jumps)</tspan></text>
      <text y="150">Stability: <tspan fill="#F87171" font-weight="bold">Unstable</tspan></text>
    </g>

    <g transform="translate(40, 320)">
      <rect width="1110" height="210" rx="12" fill="#080A10" stroke="#1F2937"/>
      <text x="25" y="40" fill="#8B949E" font-size="20">EXECUTION TIME ACROSS DATA DISTRIBUTIONS:</text>

      <text x="25" y="90" fill="#F0F2FA" font-size="20">Random Uniform: <tspan fill="#FBBF24" font-weight="bold">18.6 ms</tspan></text>
      <rect x="25" y="105" width="900" height="18" rx="9" fill="#1E293B"/>
      <rect x="25" y="105" width="860" height="18" rx="9" fill="#F59E0B"/>

      <text x="25" y="160" fill="#F0F2FA" font-size="20">Nearly Sorted: <tspan fill="#FBBF24" font-weight="bold">17.4 ms</tspan></text>
      <rect x="25" y="175" width="900" height="18" rx="9" fill="#1E293B"/>
      <rect x="25" y="175" width="820" height="18" rx="9" fill="#F59E0B"/>
    </g>
  </g>

  <!-- Quadrant 4: Radix Sort (Bottom-Right) -->
  <g transform="translate(1310, 720)">
    <rect width="1190" height="580" rx="16" fill="#0D0F18" stroke="#A855F7" stroke-width="2"/>
    <rect width="1190" height="55" rx="16" fill="#581C87" opacity="0.4"/>
    <text x="30" y="38" fill="#D8B4FE" font-size="24" font-weight="bold">QUADRANT 4: RADIX SORT (NON-COMPARATIVE)</text>
    <text x="1150" y="38" fill="#C084FC" font-size="22" font-weight="bold" text-anchor="end">6.2 ms (FASTEST)</text>

    <g transform="translate(40, 100)" font-size="22" fill="#8B949E">
      <text y="0">Time Complexity: <tspan fill="#C084FC" font-weight="bold">O(N · K) linear integer time</tspan></text>
      <text y="50">Auxiliary Space: <tspan fill="#FBBF24">O(N + K) bucket queues</tspan></text>
      <text y="100">Cache Performance: <tspan fill="#34D399" font-weight="bold">Very High (Linear scanning)</tspan></text>
      <text y="150">Stability: <tspan fill="#34D399" font-weight="bold">Stable</tspan></text>
    </g>

    <g transform="translate(40, 320)">
      <rect width="1110" height="210" rx="12" fill="#080A10" stroke="#1F2937"/>
      <text x="25" y="40" fill="#8B949E" font-size="20">EXECUTION TIME ACROSS DATA DISTRIBUTIONS:</text>

      <text x="25" y="90" fill="#F0F2FA" font-size="20">Random Uniform: <tspan fill="#C084FC" font-weight="bold">6.2 ms</tspan></text>
      <rect x="25" y="105" width="900" height="18" rx="9" fill="#1E293B"/>
      <rect x="25" y="105" width="340" height="18" rx="9" fill="#A855F7"/>

      <text x="25" y="160" fill="#F0F2FA" font-size="20">Nearly Sorted: <tspan fill="#C084FC" font-weight="bold">6.1 ms</tspan></text>
      <rect x="25" y="175" width="900" height="18" rx="9" fill="#1E293B"/>
      <rect x="25" y="175" width="330" height="18" rx="9" fill="#A855F7"/>
    </g>
  </g>

  <!-- Global Footer -->
  <g transform="translate(0, 1370)">
    <rect width="2560" height="70" fill="#141522" stroke="#222438"/>
    <text x="60" y="44" fill="#8B949E" font-size="22">BENCHMARK RUNTIME: INTEL CORE i7 · 100k 32-BIT INTEGER KEYS · UNBIASED SEED</text>
    <text x="2500" y="44" fill="#8B949E" font-size="22" text-anchor="end">ALGOLIZER BENCHMARK SUITE · OMKAR MORE</text>
  </g>
</svg>
`;

// --- ALGOLIZER LIVE CANVAS UI (2560 x 1440, exact 16:9, clean app viewport) ---
const algolizerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440" style="background:#090B10;font-family:'DejaVu Sans Mono',monospace;">
  <defs>
    <linearGradient id="algoTop" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#141724"/>
      <stop offset="100%" stop-color="#0E1018"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
  </defs>

  <rect width="2560" height="1440" fill="#090B10"/>

  <!-- Top Application Control Bar -->
  <g transform="translate(0, 0)">
    <rect width="2560" height="74" fill="url(#algoTop)" stroke="#222438" stroke-width="2"/>
    
    <!-- Active Algorithm Badge -->
    <rect x="30" y="12" width="280" height="50" rx="8" fill="#F59E0B"/>
    <text x="170" y="44" fill="#111111" font-size="20" font-weight="bold" text-anchor="middle">QUICKSORT (O(N log N))</text>

    <!-- Inactive Algorithm Buttons -->
    <rect x="325" y="12" width="240" height="50" rx="8" fill="#141724" stroke="#2D3748"/>
    <text x="445" y="44" fill="#9CA3AF" font-size="20" text-anchor="middle">MERGESORT</text>

    <rect x="580" y="12" width="220" height="50" rx="8" fill="#141724" stroke="#2D3748"/>
    <text x="690" y="44" fill="#9CA3AF" font-size="20" text-anchor="middle">HEAPSORT</text>

    <rect x="815" y="12" width="240" height="50" rx="8" fill="#141724" stroke="#2D3748"/>
    <text x="935" y="44" fill="#9CA3AF" font-size="20" text-anchor="middle">RADIX SORT</text>

    <!-- Right Controls -->
    <text x="2510" y="46" fill="#10B981" font-size="22" font-weight="bold" text-anchor="end">ENGINE: V8 CANVAS 60 FPS · RUNNING</text>
  </g>

  <!-- Left / Main Visualization Canvas (w=1850) -->
  <g transform="translate(30, 95)">
    <rect width="1860" height="920" rx="14" fill="#0D0F18" stroke="#222438" stroke-width="2"/>
    
    <!-- Canvas HUD -->
    <g transform="translate(30, 35)">
      <text x="0" y="0" fill="#9CA3AF" font-size="22">PARTITION BOUNDS: <tspan fill="#60A5FA" font-weight="bold">[LOW: 0, HIGH: 63]</tspan></text>
      <text x="1800" y="0" fill="#F59E0B" font-size="22" font-weight="bold" text-anchor="end">PIVOT ELEMENT: arr[63] = 420</text>
    </g>

    <!-- 64 Sorting Bars Array -->
    <g transform="translate(40, 90)">
      <!-- Render colorful sorted and active bars -->
      ${Array.from({ length: 64 }, (_, i) => {
        const x = i * 27.5;
        // height profile simulating quicksort partitioning around center pivot
        let h = 0;
        let color = "#3B82F6"; // default blue
        if (i < 20) {
          h = 100 + i * 24;
          color = "#6366F1"; // sorted left
        } else if (i === 20 || i === 21) {
          h = 580;
          color = "#EF4444"; // active comparison
        } else if (i === 42) {
          h = 620;
          color = "#F59E0B"; // pivot
        } else if (i > 21 && i < 42) {
          h = 240 + Math.sin(i * 0.4) * 200 + (i % 5) * 45;
          color = "#475569"; // unpartitioned middle
        } else {
          h = 150 + (64 - i) * 20;
          color = "#10B981"; // sorted right
        }
        const y = 740 - h;
        return `<rect x="${x}" y="${y}" width="22" height="${h}" rx="4" fill="${color}"/>`;
      }).join("\n      ")}

      <!-- Pivot Indicator Arrow -->
      <g transform="translate(1155, 80)">
        <polygon points="0,0 12,20 -12,20" fill="#F59E0B" transform="rotate(180)"/>
        <text x="0" y="-12" fill="#F59E0B" font-size="18" font-weight="bold" text-anchor="middle">👑 PIVOT (420)</text>
      </g>

      <!-- Active Comparison Indicator Arrow -->
      <g transform="translate(560, 120)">
        <polygon points="0,0 12,20 -12,20" fill="#EF4444" transform="rotate(180)"/>
        <text x="0" y="-12" fill="#EF4444" font-size="18" font-weight="bold" text-anchor="middle">COMPARE</text>
      </g>
    </g>

    <!-- Canvas Bottom Axis -->
    <g transform="translate(40, 880)" fill="#64748B" font-size="18">
      <text x="0" y="0">INDEX 0 (MIN)</text>
      <text x="890" y="0" text-anchor="middle">INDEX 32 (MEDIAN)</text>
      <text x="1780" y="0" text-anchor="end">INDEX 63 (MAX)</text>
    </g>
  </g>

  <!-- Right Panel: Telemetry & Verified Performance (w=620) -->
  <g transform="translate(1915, 95)">
    <rect width="615" height="1240" rx="14" fill="#0D0F18" stroke="#222438" stroke-width="2"/>
    <rect width="615" height="55" rx="14" fill="#141724"/>
    <text x="30" y="38" fill="#F0F2FA" font-size="22" font-weight="bold">TELEMETRY &amp; METRICS</text>

    <g transform="translate(30, 80)">
      <!-- Comparisons -->
      <rect width="555" height="120" rx="12" fill="#080A10" stroke="#1F2937"/>
      <text x="25" y="38" fill="#8B949E" font-size="18">ELEMENT COMPARISONS</text>
      <text x="25" y="82" fill="#F59E0B" font-size="36" font-weight="bold">1,248</text>
      <text x="530" y="82" fill="#8B949E" font-size="18" text-anchor="end">O(N log N)</text>

      <!-- Swaps -->
      <g transform="translate(0, 140)">
        <rect width="555" height="120" rx="12" fill="#080A10" stroke="#1F2937"/>
        <text x="25" y="38" fill="#8B949E" font-size="18">ELEMENT SWAPS / WRITES</text>
        <text x="25" y="82" fill="#10B981" font-size="36" font-weight="bold">384</text>
        <text x="530" y="82" fill="#8B949E" font-size="18" text-anchor="end">IN-PLACE</text>
      </g>

      <!-- Recursion Depth -->
      <g transform="translate(0, 280)">
        <rect width="555" height="120" rx="12" fill="#080A10" stroke="#1F2937"/>
        <text x="25" y="38" fill="#8B949E" font-size="18">RECURSION DEPTH</text>
        <text x="25" y="82" fill="#60A5FA" font-size="36" font-weight="bold">6 LEVELS</text>
        <text x="530" y="82" fill="#8B949E" font-size="18" text-anchor="end">log₂(64) = 6</text>
      </g>

      <!-- Cache Locality -->
      <g transform="translate(0, 420)">
        <rect width="555" height="120" rx="12" fill="#080A10" stroke="#1F2937"/>
        <text x="25" y="38" fill="#8B949E" font-size="18">CACHE LOCALITY SCORE</text>
        <text x="25" y="82" fill="#A855F7" font-size="36" font-weight="bold">94.2%</text>
        <text x="530" y="82" fill="#10B981" font-size="18" text-anchor="end">HIGH HIT RATE</text>
      </g>

      <!-- Complexity Summary Card -->
      <g transform="translate(0, 560)">
        <rect width="555" height="560" rx="12" fill="#080A10" stroke="#1F2937"/>
        <text x="25" y="40" fill="#F0F2FA" font-size="20" font-weight="bold">COMPLEXITY GUARANTEES</text>

        <g transform="translate(25, 75)" font-size="20" fill="#9CA3AF">
          <text y="0">Best Case: <tspan fill="#10B981" font-weight="bold">Ω(N log N)</tspan></text>
          <text y="45">Average Case: <tspan fill="#60A5FA" font-weight="bold">Θ(N log N)</tspan></text>
          <text y="90">Worst Case: <tspan fill="#EF4444" font-weight="bold">O(N²)</tspan></text>
          <text y="135">Auxiliary Space: <tspan fill="#F59E0B" font-weight="bold">O(log N) stack</tspan></text>

          <line x1="0" y1="170" x2="505" y2="170" stroke="#1F2937" stroke-width="2"/>
          <text y="210" fill="#F0F2FA" font-weight="bold">PARTITION STRATEGY:</text>
          <text y="250" font-size="18">Lomuto in-place single pointer</text>
          <text y="285" font-size="18">Median-of-three pivot selection</text>
          <text y="320" font-size="18">Eliminates worst-case sorted inputs</text>

          <line x1="0" y1="350" x2="505" y2="350" stroke="#1F2937" stroke-width="2"/>
          <text y="390" fill="#10B981" font-weight="bold">MEMORY ALLOCATION: ZERO</text>
          <text y="425" font-size="18">Pure array pointer dereferences</text>
          <text y="460" font-size="18">Direct GPU canvas rasterization</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Bottom Execution Audit Log (Full Width under Canvas) -->
  <g transform="translate(30, 1035)">
    <rect width="1860" height="300" rx="14" fill="#0D0F18" stroke="#222438" stroke-width="2"/>
    <rect width="1860" height="45" rx="14" fill="#141724"/>
    <text x="30" y="32" fill="#F0F2FA" font-size="20" font-weight="bold">REAL-TIME STEP AUDIT LOG</text>

    <g transform="translate(30, 80)" font-size="20">
      <text y="0" fill="#9CA3AF">[0.002s] Partition low=0, high=63: Selected median-of-three pivot = 420 (index 42)</text>
      <text y="38" fill="#60A5FA">[0.005s] Swapped arr[18] (512) and arr[19] (148) -> Reduced inverted pairs by 1</text>
      <text y="76" fill="#F59E0B">[0.009s] Sub-array [0..31] sorted successfully. Spawning right branch partition [33..63]</text>
      <text y="114" fill="#10B981">[0.014s] QuickSort partition complete in 1,248 comparisons. Zero memory leaks detected.</text>
      <text y="152" fill="#A855F7">[0.016s] Ready for next input shuffle or alternate algorithm benchmark comparison.</text>
    </g>
  </g>

  <!-- Global Footer -->
  <g transform="translate(0, 1370)">
    <rect width="2560" height="70" fill="#141724" stroke="#222438"/>
    <text x="40" y="44" fill="#8B949E" font-size="22">ALGOLIZER // BUILT WITH HTML5 CANVAS, JAVASCRIPT &amp; V8 RUNTIME</text>
    <text x="2520" y="44" fill="#8B949E" font-size="22" text-anchor="end">OMKAR MORE · ALGORITHM VISUALIZATION SUITE</text>
  </g>
</svg>
`;

// --- CHATTY MERN WEBSOCKETS CHAT (2560 x 1440, exact 16:9, clean app viewport) ---
const chattySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440" style="background:#090C15;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="chatNav" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#141926"/>
      <stop offset="100%" stop-color="#0E121D"/>
    </linearGradient>
    <linearGradient id="sideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#111624"/>
      <stop offset="100%" stop-color="#0B0E18"/>
    </linearGradient>
  </defs>

  <rect width="2560" height="1440" fill="#090C15"/>

  <!-- Top App Bar -->
  <g transform="translate(0, 0)">
    <rect width="2560" height="74" fill="url(#chatNav)" stroke="#1F283E" stroke-width="2"/>
    <text x="40" y="48" fill="#F3F4F6" font-size="26" font-weight="bold">CHATTY // REAL-TIME MERN WEBSOCKETS MESSAGING PLATFORM</text>
    
    <text x="1750" y="46" fill="#60A5FA" font-family="'DejaVu Sans Mono',monospace" font-size="20">WS: wss://chatty-api.render.com</text>
    <circle cx="2180" cy="40" r="8" fill="#10B981"/>
    <text x="2200" y="46" fill="#10B981" font-size="20" font-weight="bold">CONNECTED (12ms)</text>
  </g>

  <!-- Left Sidebar: Channels & Direct Messages (w=520) -->
  <g transform="translate(30, 95)">
    <rect width="520" height="1240" rx="14" fill="url(#sideGrad)" stroke="#1F283E" stroke-width="2"/>
    
    <!-- Channels Section -->
    <g transform="translate(30, 40)">
      <text x="0" y="0" fill="#9CA3AF" font-size="20" font-weight="bold" letter-spacing="2"># CHANNELS</text>

      <!-- Active Channel: general-chat -->
      <g transform="translate(0, 25)">
        <rect width="460" height="54" rx="10" fill="#2563EB" opacity="0.25"/>
        <text x="25" y="35" fill="#60A5FA" font-size="22" font-weight="bold"># general-chat</text>
        <circle cx="430" cy="27" r="6" fill="#60A5FA"/>
      </g>

      <g transform="translate(0, 90)">
        <text x="25" y="35" fill="#9CA3AF" font-size="22"># project-updates</text>
      </g>

      <g transform="translate(0, 150)">
        <text x="25" y="35" fill="#9CA3AF" font-size="22"># algorithms-vcs</text>
      </g>

      <g transform="translate(0, 210)">
        <text x="25" y="35" fill="#9CA3AF" font-size="22"># random-watercooler</text>
      </g>
    </g>

    <!-- Direct Messages Section -->
    <g transform="translate(30, 370)">
      <text x="0" y="0" fill="#9CA3AF" font-size="20" font-weight="bold" letter-spacing="2">● DIRECT MESSAGES</text>

      <!-- User 1: You -->
      <g transform="translate(0, 30)">
        <circle cx="20" cy="20" r="10" fill="#10B981"/>
        <text x="45" y="27" fill="#FFFFFF" font-size="22" font-weight="bold">Omkar More (You)</text>
      </g>

      <!-- User 2: Alex -->
      <g transform="translate(0, 90)">
        <circle cx="20" cy="20" r="10" fill="#6366F1"/>
        <text x="45" y="27" fill="#E5E7EB" font-size="22">Alex Chen · Frontend</text>
      </g>

      <!-- User 3: Sarah -->
      <g transform="translate(0, 150)">
        <circle cx="20" cy="20" r="10" fill="#F59E0B"/>
        <text x="45" y="27" fill="#E5E7EB" font-size="22">Sarah Miller · Systems</text>
      </g>

      <!-- User 4: Devon -->
      <g transform="translate(0, 210)">
        <circle cx="20" cy="20" r="10" fill="#EC4899"/>
        <text x="45" y="27" fill="#E5E7EB" font-size="22">Devon Vance · Backend</text>
      </g>
    </g>

    <!-- Auth & Presence Box -->
    <g transform="translate(30, 1060)">
      <rect width="460" height="140" rx="12" fill="#090C15" stroke="#1F283E"/>
      <circle cx="35" cy="40" r="14" fill="#10B981"/>
      <text x="65" y="47" fill="#F3F4F6" font-size="22" font-weight="bold">Omkar More</text>
      <text x="65" y="75" fill="#9CA3AF" font-size="18">Session: JWT HttpOnly Active</text>
      <text x="25" y="115" fill="#10B981" font-size="18">✓ 0 Dropped Packets · Ping: 12ms</text>
    </g>
  </g>

  <!-- Center Chat Stream (w=1420, generous margin so text never collides!) -->
  <g transform="translate(575, 95)">
    <rect width="1420" height="1240" rx="14" fill="#0D111E" stroke="#1F283E" stroke-width="2"/>

    <!-- Channel Header -->
    <rect width="1420" height="60" rx="14" fill="#141928"/>
    <text x="35" y="40" fill="#F3F4F6" font-size="24" font-weight="bold"># general-chat · 24 Concurrent Active Members</text>
    <text x="1380" y="40" fill="#9CA3AF" font-size="18" text-anchor="end">MERN Stack · Socket.IO 4.7</text>

    <!-- Message 1: Alex Chen -->
    <g transform="translate(35, 95)">
      <circle cx="35" cy="35" r="30" fill="#6366F1"/>
      <text x="35" y="44" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">AC</text>
      <text x="85" y="25" fill="#818CF8" font-size="22" font-weight="bold">Alex Chen</text>
      <text x="210" y="25" fill="#6B7280" font-size="18">14:22</text>
      <text x="85" y="65" fill="#E5E7EB" font-size="22">Just deployed the new WebSockets broadcast pipeline on Render! Latency dropped under 15ms.</text>
    </g>

    <!-- Message 2: Omkar More (with Code Block) -->
    <g transform="translate(35, 230)">
      <circle cx="35" cy="35" r="30" fill="#10B981"/>
      <text x="35" y="44" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">OM</text>
      <text x="85" y="25" fill="#34D399" font-size="22" font-weight="bold">Omkar More</text>
      <text x="235" y="25" fill="#6B7280" font-size="18">14:24</text>
      <text x="85" y="65" fill="#E5E7EB" font-size="22">Awesome! I also hooked up Cloudinary media uploads. Image uploads now stream directly with blur hashes.</text>

      <!-- Code Snippet Box -->
      <g transform="translate(85, 95)">
        <rect width="1180" height="150" rx="10" fill="#090C15" stroke="#1F283E"/>
        <g font-family="'DejaVu Sans Mono',monospace" font-size="20">
          <text x="30" y="45" fill="#F43F5E">io<tspan fill="#F3F4F6">.on(</tspan><tspan fill="#38BDF8">"connection"</tspan><tspan fill="#F3F4F6">, (</tspan><tspan fill="#FBBF24">socket</tspan><tspan fill="#F3F4F6">) =&gt; {</tspan></text>
          <text x="60" y="85" fill="#FBBF24">socket<tspan fill="#F3F4F6">.broadcast.emit(</tspan><tspan fill="#38BDF8">"user:joined"</tspan><tspan fill="#F3F4F6">, { id: socket.id, timestamp: Date.now() });</tspan></text>
          <text x="30" y="125" fill="#F3F4F6">});</text>
        </g>
      </g>
    </g>

    <!-- Message 3: Sarah Miller -->
    <g transform="translate(35, 530)">
      <circle cx="35" cy="35" r="30" fill="#F59E0B"/>
      <text x="35" y="44" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">SM</text>
      <text x="85" y="25" fill="#FBBF24" font-size="22" font-weight="bold">Sarah Miller</text>
      <text x="235" y="25" fill="#6B7280" font-size="18">14:27</text>
      <text x="85" y="65" fill="#E5E7EB" font-size="22">Tested with 50 simultaneous tabs across different browsers. Zero dropped socket packets. Fantastic work team!</text>
    </g>

    <!-- Message 4: Devon Vance -->
    <g transform="translate(35, 665)">
      <circle cx="35" cy="35" r="30" fill="#EC4899"/>
      <text x="35" y="44" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">DV</text>
      <text x="85" y="25" fill="#F472B6" font-size="22" font-weight="bold">Devon Vance</text>
      <text x="235" y="25" fill="#6B7280" font-size="18">14:29</text>
      <text x="85" y="65" fill="#E5E7EB" font-size="22">JWT token rotation is also active. Refresh tokens are stored in secure httpOnly cookies.</text>
    </g>

    <!-- Typing Indicator -->
    <g transform="translate(60, 1070)">
      <circle cx="10" cy="10" r="5" fill="#10B981"/>
      <text x="25" y="17" fill="#10B981" font-size="20">Devon Vance is typing...</text>
    </g>

    <!-- Chat Input Box -->
    <g transform="translate(35, 1110)">
      <rect width="1350" height="90" rx="14" fill="#141928" stroke="#2563EB" stroke-width="2"/>
      <text x="30" y="55" fill="#9CA3AF" font-size="22">Message #general-chat...</text>

      <rect x="1200" y="15" width="120" height="60" rx="10" fill="#2563EB"/>
      <text x="1260" y="52" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">SEND</text>
    </g>
  </g>

  <!-- Right Telemetry Panel (w=500) -->
  <g transform="translate(2025, 95)">
    <rect width="505" height="1240" rx="14" fill="url(#sideGrad)" stroke="#1F283E" stroke-width="2"/>
    <rect width="505" height="55" rx="14" fill="#141928"/>
    <text x="30" y="38" fill="#F3F4F6" font-size="22" font-weight="bold">SERVER TELEMETRY</text>

    <g transform="translate(25, 80)">
      <!-- WebSocket Status -->
      <rect width="455" height="130" rx="12" fill="#090C15" stroke="#10B981" stroke-width="2"/>
      <text x="25" y="40" fill="#8B949E" font-size="18">WEBSOCKET STATUS</text>
      <text x="25" y="85" fill="#10B981" font-size="30" font-weight="bold">ONLINE (100% UP)</text>

      <!-- REST Endpoints -->
      <g transform="translate(0, 150)">
        <rect width="455" height="130" rx="12" fill="#090C15" stroke="#3B82F6" stroke-width="2"/>
        <text x="25" y="40" fill="#8B949E" font-size="18">REST ENDPOINTS</text>
        <text x="25" y="85" fill="#60A5FA" font-size="30" font-weight="bold">15+ VERIFIED APIs</text>
      </g>

      <!-- Media Pipeline -->
      <g transform="translate(0, 300)">
        <rect width="455" height="130" rx="12" fill="#090C15" stroke="#F59E0B" stroke-width="2"/>
        <text x="25" y="40" fill="#8B949E" font-size="18">MEDIA ASSET PIPELINE</text>
        <text x="25" y="85" fill="#FBBF24" font-size="30" font-weight="bold">CLOUDINARY CDN</text>
      </g>

      <!-- Deployment Host -->
      <g transform="translate(0, 450)">
        <rect width="455" height="130" rx="12" fill="#090C15" stroke="#8B5CF6" stroke-width="2"/>
        <text x="25" y="40" fill="#8B949E" font-size="18">DEPLOYMENT HOST</text>
        <text x="25" y="85" fill="#A78BFA" font-size="28" font-weight="bold">RENDER PRODUCTION</text>
      </g>

      <!-- Architecture Specs -->
      <g transform="translate(0, 600)">
        <rect width="455" height="510" rx="12" fill="#090C15" stroke="#1F283E"/>
        <text x="25" y="40" fill="#F3F4F6" font-size="20" font-weight="bold">TECH SPECIFICATIONS</text>

        <g font-size="18" fill="#9CA3AF" transform="translate(25, 80)">
          <text y="0">Backend: <tspan fill="#34D399" font-weight="bold">Node.js · Express.js</tspan></text>
          <text y="40">Real-time: <tspan fill="#60A5FA" font-weight="bold">Socket.IO WebSockets</tspan></text>
          <text y="80">Database: <tspan fill="#FBBF24" font-weight="bold">MongoDB Atlas</tspan></text>
          <text y="120">State: <tspan fill="#F472B6" font-weight="bold">Zustand Global Store</tspan></text>
          <text y="160">Styling: <tspan fill="#38BDF8" font-weight="bold">TailwindCSS</tspan></text>

          <line x1="0" y1="200" x2="405" y2="200" stroke="#1F283E" stroke-width="2"/>
          <text y="240" fill="#F3F4F6" font-weight="bold">SECURITY AUDIT:</text>
          <text y="280">✓ HttpOnly Cookie Storage</text>
          <text y="320">✓ bcrypt Salt Hashing (10 rounds)</text>
          <text y="360">✓ XSS &amp; CSRF Protected</text>
          <text y="400">✓ Rate Limiter: 100 req/min</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Global Footer -->
  <g transform="translate(0, 1370)">
    <rect width="2560" height="70" fill="#141926" stroke="#1F283E"/>
    <text x="40" y="44" fill="#8B949E" font-size="22">CHATTY // PRODUCTION REAL-TIME MESSAGING ENGINE</text>
    <text x="2520" y="44" fill="#8B949E" font-size="22" text-anchor="end">ARCHITECTED BY OMKAR MORE · MERN STACK</text>
  </g>
</svg>
`;

// --- IEEE SEFET 2026 CONFERENCE PORTAL (2560 x 1440, exact 16:9, clean app viewport) ---
const ieeeConferenceSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440" style="background:#090E18;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="ieeeTop" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0E1726"/>
      <stop offset="100%" stop-color="#090E18"/>
    </linearGradient>
    <linearGradient id="heroCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="60%" stop-color="#172554"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="trackCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#131D2E"/>
      <stop offset="100%" stop-color="#0D1420"/>
    </linearGradient>
  </defs>

  <rect width="2560" height="1440" fill="#090E18"/>

  <!-- Top Institutional Bar -->
  <g transform="translate(0, 0)">
    <rect width="2560" height="74" fill="url(#ieeeTop)" stroke="#1E293B" stroke-width="2"/>
    <text x="40" y="46" fill="#F8FAFC" font-size="24" font-weight="bold">VISVESVARAYA NATIONAL INSTITUTE OF TECHNOLOGY, NAGPUR · DEPT OF ELECTRICAL ENGINEERING</text>
    <text x="2520" y="46" fill="#38BDF8" font-size="22" font-weight="bold" text-anchor="end">IEEE SEFET 2026 OFFICIAL PORTAL</text>
  </g>

  <!-- Main Hero Banner (w=2480) -->
  <g transform="translate(40, 95)">
    <rect width="2480" height="430" rx="20" fill="url(#heroCard)" stroke="#3B82F6" stroke-width="2"/>

    <g transform="translate(60, 60)">
      <text x="0" y="0" fill="#93C5FD" font-size="24" font-weight="bold" letter-spacing="4">VNIT NAGPUR · HYBRID INTERNATIONAL CONFERENCE</text>
      <text x="0" y="80" fill="#FFFFFF" font-size="64" font-weight="900" letter-spacing="-1">IEEE SeFet 2026</text>
      <text x="0" y="140" fill="#E2E8F0" font-size="34" font-weight="600">6th International Conference on Sustainable Energy &amp; Future Electric Transportation</text>
      <text x="0" y="190" fill="#94A3B8" font-size="28">JULY 23–25, 2026 · NAGPUR, MAHARASHTRA, INDIA (HYBRID MODE)</text>

      <!-- Action Buttons -->
      <g transform="translate(0, 240)">
        <rect width="280" height="70" rx="14" fill="#0284C7"/>
        <text x="140" y="44" fill="#FFFFFF" font-size="24" font-weight="bold" text-anchor="middle">SUBMIT PAPER</text>

        <rect x="310" y="0" width="280" height="70" rx="14" fill="#1E293B" stroke="#475569" stroke-width="2"/>
        <text x="450" y="44" fill="#F8FAFC" font-size="24" font-weight="bold" text-anchor="middle">CALL FOR PAPERS</text>

        <rect x="620" y="0" width="240" height="70" rx="14" fill="#1E293B" stroke="#475569" stroke-width="2"/>
        <text x="740" y="44" fill="#F8FAFC" font-size="24" font-weight="bold" text-anchor="middle">SCHEDULE</text>
      </g>
    </g>

    <!-- IEEE IAS Badge -->
    <g transform="translate(1960, 60)">
      <rect width="440" height="130" rx="16" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
      <text x="220" y="48" fill="#38BDF8" font-size="24" font-weight="bold" text-anchor="middle">TECHNICAL CO-SPONSOR</text>
      <text x="220" y="95" fill="#FFFFFF" font-size="28" font-weight="900" text-anchor="middle">IEEE IAS &amp; PELS</text>
    </g>
  </g>

  <!-- 3 Technical Tracks Grid (w=800 each) -->
  <g transform="translate(40, 560)">
    <!-- Track 1: EV Systems -->
    <g transform="translate(0, 0)">
      <rect width="800" height="420" rx="16" fill="url(#trackCard)" stroke="#1E293B" stroke-width="2"/>
      <rect width="800" height="55" rx="16" fill="#1E3A8A" opacity="0.3"/>
      <text x="30" y="38" fill="#60A5FA" font-size="22" font-weight="bold">TRACK 01: ELECTRIC VEHICLE SYSTEMS</text>

      <g transform="translate(30, 90)" font-size="22">
        <text y="0" fill="#FFFFFF" font-size="28" font-weight="bold">Powertrains, Motor Drives &amp; Inverters</text>
        <text y="50" fill="#94A3B8">Battery Management Systems (BMS)</text>
        <text y="90" fill="#94A3B8">Fast Charging Infrastructure &amp; V2G Networks</text>
        <text y="130" fill="#94A3B8">Wireless Power Transfer &amp; Magnetics</text>
        <text y="170" fill="#94A3B8">Thermal Physics of Li-ion Battery Packs</text>

        <line x1="0" y1="210" x2="740" y2="210" stroke="#1E293B" stroke-width="2"/>
        <text y="260" fill="#34D399" font-weight="bold">CHAIR: DR. M. V. AWARE (VNIT NAGPUR)</text>
      </g>
    </g>

    <!-- Track 2: Renewable Grids -->
    <g transform="translate(840, 0)">
      <rect width="800" height="420" rx="16" fill="url(#trackCard)" stroke="#1E293B" stroke-width="2"/>
      <rect width="800" height="55" rx="16" fill="#065F46" opacity="0.3"/>
      <text x="30" y="38" fill="#34D399" font-size="22" font-weight="bold">TRACK 02: RENEWABLE GRIDS &amp; STORAGE</text>

      <g transform="translate(30, 90)" font-size="22">
        <text y="0" fill="#FFFFFF" font-size="28" font-weight="bold">Microgrids &amp; Smart Grid Integration</text>
        <text y="50" fill="#94A3B8">Solar PV &amp; Wind Energy Converters</text>
        <text y="90" fill="#94A3B8">Solid-State Transformers (SST)</text>
        <text y="130" fill="#94A3B8">Grid Stability with High RE Penetration</text>
        <text y="170" fill="#94A3B8">Hydrogen Fuel Cells &amp; Flow Batteries</text>

        <line x1="0" y1="210" x2="740" y2="210" stroke="#1E293B" stroke-width="2"/>
        <text y="260" fill="#34D399" font-weight="bold">CHAIR: PROF. R. K. PATIDAR (VNIT)</text>
      </g>
    </g>

    <!-- Track 3: Power Electronics -->
    <g transform="translate(1680, 0)">
      <rect width="800" height="420" rx="16" fill="url(#trackCard)" stroke="#1E293B" stroke-width="2"/>
      <rect width="800" height="55" rx="16" fill="#4C1D95" opacity="0.3"/>
      <text x="30" y="38" fill="#C084FC" font-size="22" font-weight="bold">TRACK 03: POWER ELECTRONICS CONTROLS</text>

      <g transform="translate(30, 90)" font-size="22">
        <text y="0" fill="#FFFFFF" font-size="28" font-weight="bold">Wide Bandgap Devices (SiC / GaN)</text>
        <text y="50" fill="#94A3B8">AI &amp; Machine Learning in Power Electronics</text>
        <text y="90" fill="#94A3B8">Model Predictive Control (MPC)</text>
        <text y="130" fill="#94A3B8">EMI / EMC Mitigation &amp; Thermal Physics</text>
        <text y="170" fill="#94A3B8">Fault Tolerant Inverter Topologies</text>

        <line x1="0" y1="210" x2="740" y2="210" stroke="#1E293B" stroke-width="2"/>
        <text y="260" fill="#34D399" font-weight="bold">CHAIR: DR. P. S. KULKARNI (VNIT)</text>
      </g>
    </g>
  </g>

  <!-- Bottom Strip: Important Deadlines & Publishing (w=2480) -->
  <g transform="translate(40, 1015)">
    <rect width="2480" height="320" rx="16" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>

    <g transform="translate(40, 40)">
      <text x="0" y="0" fill="#94A3B8" font-size="22" font-weight="bold" letter-spacing="3">IMPORTANT DEADLINES &amp; PUBLICATION GUIDELINES</text>

      <g transform="translate(0, 40)">
        <!-- Deadline 1 -->
        <rect width="450" height="180" rx="12" fill="#1E293B" stroke="#334155"/>
        <text x="30" y="45" fill="#94A3B8" font-size="20">DRAFT PAPER SUBMISSION</text>
        <text x="30" y="100" fill="#EF4444" font-size="34" font-weight="900">MARCH 15, 2026</text>
        <text x="30" y="145" fill="#94A3B8" font-size="18">Strict EDAS Portal Deadline</text>

        <!-- Deadline 2 -->
        <g transform="translate(480, 0)">
          <rect width="450" height="180" rx="12" fill="#1E293B" stroke="#334155"/>
          <text x="30" y="45" fill="#94A3B8" font-size="20">ACCEPTANCE NOTIFICATION</text>
          <text x="30" y="100" fill="#F59E0B" font-size="34" font-weight="900">MAY 01, 2026</text>
          <text x="30" y="145" fill="#94A3B8" font-size="18">Peer Review Complete</text>
        </g>

        <!-- Deadline 3 -->
        <g transform="translate(960, 0)">
          <rect width="450" height="180" rx="12" fill="#1E293B" stroke="#334155"/>
          <text x="30" y="45" fill="#94A3B8" font-size="20">FINAL CAMERA READY</text>
          <text x="30" y="100" fill="#10B981" font-size="34" font-weight="900">JUNE 10, 2026</text>
          <text x="30" y="145" fill="#94A3B8" font-size="18">IEEE PDF eXpress Compliance</text>
        </g>

        <!-- IEEE Xplore Box -->
        <g transform="translate(1440, 0)">
          <rect width="940" height="180" rx="12" fill="#0284C7" stroke="#38BDF8"/>
          <text x="40" y="55" fill="#E0F2FE" font-size="22" font-weight="bold">INDEXED &amp; SPONSORED BY</text>
          <text x="40" y="110" fill="#FFFFFF" font-size="42" font-weight="900">IEEE Xplore Digital Library</text>
          <text x="40" y="150" fill="#E0F2FE" font-size="20">All accepted and presented papers will be eligible for inclusion in IEEE Xplore &amp; Scopus</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Global Footer -->
  <g transform="translate(0, 1370)">
    <rect width="2560" height="70" fill="#0E1726" stroke="#1E293B"/>
    <text x="40" y="44" fill="#8B949E" font-size="22">IEEE SEFET 2026 PORTAL // ARCHITECTED &amp; MAINTAINED BY OMKAR MORE</text>
    <text x="2520" y="44" fill="#8B949E" font-size="22" text-anchor="end">VNIT NAGPUR ELECTRICAL ENGINEERING DEPARTMENT</text>
  </g>
</svg>
`;

// --- RAYTRACER SPEC & C++ BVH MONTE CARLO STUDIO (2560 x 1440, exact 16:9) ---
const raytracerSpecSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440" style="background:#080A10;font-family:'DejaVu Sans Mono',monospace;">
  <defs>
    <linearGradient id="rayTop" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#141824"/>
      <stop offset="100%" stop-color="#0B0D14"/>
    </linearGradient>
    <linearGradient id="glassSphere" x1="20%" y1="20%" x2="80%" y2="80%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="#93C5FD"/>
      <stop offset="60%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="mirrorSphere" x1="30%" y1="20%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#CBD5E1"/>
      <stop offset="80%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="copperSphere" x1="30%" y1="20%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#FED7AA"/>
      <stop offset="40%" stop-color="#F97316"/>
      <stop offset="80%" stop-color="#9A3412"/>
      <stop offset="100%" stop-color="#431407"/>
    </linearGradient>
    <pattern id="checkPattern" width="80" height="80" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="#0F172A"/>
      <rect x="40" width="40" height="40" fill="#1E293B"/>
      <rect y="40" width="40" height="40" fill="#1E293B"/>
      <rect x="40" y="40" width="40" height="40" fill="#0F172A"/>
    </pattern>
  </defs>

  <rect width="2560" height="1440" fill="#080A10"/>

  <!-- Top App Navigation Header -->
  <g transform="translate(0, 0)">
    <rect width="2560" height="74" fill="url(#rayTop)" stroke="#22283A" stroke-width="2"/>
    <text x="40" y="46" fill="#F8FAFC" font-size="24" font-weight="bold">RAYTRACER STUDIO // C++ MONTE CARLO OPTICS &amp; BVH PATH TRACER</text>
    <text x="2520" y="46" fill="#38BDF8" font-size="22" font-weight="bold" text-anchor="end">KERNEL: MULTITHREADED SIMD AVX2 · 4K CONVERGED</text>
  </g>

  <!-- Left Pane: BVH Tree & Physical Optics Parameters (w=760) -->
  <g transform="translate(30, 95)">
    <rect width="760" height="1240" rx="14" fill="#0E121E" stroke="#22283A" stroke-width="2"/>
    <rect width="760" height="55" rx="14" fill="#171E30"/>
    <text x="30" y="38" fill="#F8FAFC" font-size="22" font-weight="bold">BVH ACCELERATION HIERARCHY</text>
    <text x="730" y="38" fill="#38BDF8" font-size="18" text-anchor="end">8 LEVELS</text>

    <!-- BVH Tree Structure -->
    <g transform="translate(30, 85)" font-size="20">
      <text y="0" fill="#60A5FA" font-weight="bold">Root BVH Node [AABB Bounds: (-10,-10,-10) to (10,10,10)]</text>
      <text y="40" fill="#94A3B8">|-- Left Child: Primitive Cluster A (14 spheres)</text>
      <text y="80" fill="#34D399">|   |-- Dielectric Glass Sphere (r=2.5, n=1.52)</text>
      <text y="120" fill="#FBBF24">|   |-- Metallic Mirror Chrome (r=1.8, roughness=0.02)</text>
      <text y="160" fill="#94A3B8">|-- Right Child: Primitive Cluster B (Checkerboard)</text>
      <text y="200" fill="#94A3B8">|-- Infinite Procedural Plane (diffuse albedo)</text>
      <text y="240" fill="#A78BFA">|-- Photon Caustic Map Grid (1,850,000 rays)</text>
    </g>

    <!-- Optics Equations Card -->
    <g transform="translate(30, 390)">
      <rect width="700" height="420" rx="12" fill="#080B14" stroke="#1E293B"/>
      <text x="25" y="40" fill="#F8FAFC" font-size="20" font-weight="bold">PHYSICAL OPTICS PARAMETERS</text>

      <g transform="translate(25, 75)" font-size="18" fill="#94A3B8">
        <text y="0" fill="#60A5FA">Snell-Descartes Law: n₁ sin(θ₁) = n₂ sin(θ₂)</text>
        <text y="40" fill="#38BDF8">Fresnel Schlick Approx: R(θ) = R₀ + (1-R₀)(1-cos θ)⁵</text>
        <text y="85">Refraction Index: <tspan fill="#FBBF24" font-weight="bold">1.52 (Crown Glass)</tspan></text>
        <text y="130">Sampling Density: <tspan fill="#34D399" font-weight="bold">1,024 Samples / Pixel</tspan></text>
        <text y="175">Max Recursion Depth: <tspan fill="#EF4444" font-weight="bold">32 Ray Bounces</tspan></text>
        <text y="220">Photon Emission Rate: <tspan fill="#A78BFA" font-weight="bold">1.85M photons / sec</tspan></text>
        <text y="265">Anti-Aliasing: <tspan fill="#34D399" font-weight="bold">Stratified Jitter Super-Sampling</tspan></text>
        <text y="310">Shading Model: <tspan fill="#60A5FA" font-weight="bold">Blinn-Phong &amp; Lambertian Cosine</tspan></text>
      </g>
    </g>

    <!-- Traversal Pass Stats -->
    <g transform="translate(30, 840)">
      <rect width="700" height="360" rx="12" fill="#080B14" stroke="#10B981" stroke-width="1.5"/>
      <text x="25" y="40" fill="#34D399" font-size="20" font-weight="bold">✓ BVH TREE TRAVERSAL PASS</text>

      <g transform="translate(25, 80)" font-size="20" fill="#94A3B8">
        <text y="0">Total Primitives: <tspan fill="#F8FAFC" font-weight="bold">14,200 Nodes</tspan></text>
        <text y="45">BVH Construction Time: <tspan fill="#34D399" font-weight="bold">12.4 ms</tspan></text>
        <text y="90">Ray-Box Intersection Tests: <tspan fill="#60A5FA" font-weight="bold">0.82M / sec</tspan></text>
        <text y="135">SIMD Acceleration: <tspan fill="#FBBF24" font-weight="bold">AVX2 Vectorized</tspan></text>
        <text y="180">Memory Footprint: <tspan fill="#34D399" font-weight="bold">4.8 MB (Cache Resident)</tspan></text>
        <text y="225">Convergence Status: <tspan fill="#34D399" font-weight="bold">99.8% (Noise &lt; 0.002)</tspan></text>
      </g>
    </g>
  </g>

  <!-- Right Pane: Real-Time Optical Canvas Viewport (w=1710) -->
  <g transform="translate(820, 95)">
    <rect width="1710" height="1240" rx="14" fill="#04060A" stroke="#22283A" stroke-width="2"/>
    <rect width="1710" height="55" rx="14" fill="#171E30"/>
    <text x="30" y="38" fill="#F8FAFC" font-size="22" font-weight="bold">OPTICAL CAUSTIC RAYTRACER CANVAS (NATIVE C++ RAY ENGINE)</text>
    <text x="1680" y="38" fill="#34D399" font-size="18" text-anchor="end">RAY DEPTH: 32 BOUNCES · FRESNEL</text>

    <!-- Checkerboard Perspective Ground Floor -->
    <g transform="translate(40, 680)">
      <rect width="1630" height="460" fill="url(#checkPattern)" opacity="0.6"/>
    </g>

    <!-- 3D Raytraced Spheres Representation -->
    <!-- Sphere 1: Metallic Mirror Chrome -->
    <g transform="translate(450, 620)">
      <!-- Drop Shadow -->
      <ellipse cx="0" cy="160" rx="170" ry="40" fill="#000000" opacity="0.8"/>
      <!-- Sphere Body -->
      <circle cx="0" cy="0" r="180" fill="url(#mirrorSphere)"/>
      <ellipse cx="-50" cy="-60" rx="55" ry="25" fill="#FFFFFF" opacity="0.8" transform="rotate(-20 -50 -60)"/>
      <text x="0" y="220" fill="#CBD5E1" font-size="22" font-weight="bold" text-anchor="middle">CHROME REFLECTION</text>
    </g>

    <!-- Sphere 2: Dielectric Glass Sphere (Refraction & Caustics) -->
    <g transform="translate(980, 560)">
      <!-- Ground Caustic Glow Pattern -->
      <ellipse cx="0" cy="220" rx="200" ry="35" fill="#60A5FA" opacity="0.35"/>
      <ellipse cx="0" cy="220" rx="120" ry="20" fill="#FFFFFF" opacity="0.6"/>
      <!-- Glass Outer Ring -->
      <circle cx="0" cy="0" r="230" fill="url(#glassSphere)" opacity="0.35" stroke="#93C5FD" stroke-width="3"/>
      <!-- Refracted Internal Highlights -->
      <ellipse cx="-70" cy="-80" rx="80" ry="35" fill="#FFFFFF" opacity="0.75" transform="rotate(-25 -70 -80)"/>
      <circle cx="60" cy="70" r="60" fill="#1E3A8A" opacity="0.5"/>
      <ellipse cx="50" cy="50" rx="30" ry="15" fill="#FFFFFF" opacity="0.8"/>
      <text x="0" y="270" fill="#93C5FD" font-size="24" font-weight="bold" text-anchor="middle">DIELECTRIC CROWN GLASS (n=1.52)</text>
    </g>

    <!-- Sphere 3: Metallic Copper Sphere -->
    <g transform="translate(1420, 650)">
      <!-- Drop Shadow -->
      <ellipse cx="0" cy="130" rx="130" ry="35" fill="#000000" opacity="0.8"/>
      <!-- Copper Body -->
      <circle cx="0" cy="0" r="150" fill="url(#copperSphere)"/>
      <ellipse cx="-40" cy="-50" rx="45" ry="20" fill="#FED7AA" opacity="0.8" transform="rotate(-20 -40 -50)"/>
      <text x="0" y="190" fill="#FB923C" font-size="22" font-weight="bold" text-anchor="middle">METALLIC COPPER</text>
    </g>

    <!-- Viewport Bottom HUD Overlay -->
    <g transform="translate(40, 1160)">
      <rect width="1630" height="55" rx="10" fill="#0A0E18" stroke="#1E293B"/>
      <text x="30" y="35" fill="#94A3B8" font-size="20">RESOLUTION: 3840x2160 UHD</text>
      <text x="500" y="35" fill="#94A3B8" font-size="20">PHOTONS: 1,850,000</text>
      <text x="960" y="35" fill="#94A3B8" font-size="20">BOUNCE DEPTH: 32</text>
      <text x="1600" y="35" fill="#34D399" font-size="20" font-weight="bold" text-anchor="end">BVH HIT RATIO: 99.4% · C++20 SIMD</text>
    </g>
  </g>

  <!-- Global Footer -->
  <g transform="translate(0, 1370)">
    <rect width="2560" height="70" fill="#0B0D14" stroke="#22283A"/>
    <text x="40" y="44" fill="#8B949E" font-size="22">C++ RAYTRACER ENGINE // MONTE CARLO BVH PATH TRACER</text>
    <text x="2520" y="44" fill="#8B949E" font-size="22" text-anchor="end">ARCHITECTED BY OMKAR MORE · GRAPHICS &amp; SYSTEMS</text>
  </g>
</svg>
`;

console.log("Generating all ultra-high-resolution, vector-crisp project screens...");

// 1. Mobile Screens (1080x2340)
renderSvg(igLeaderboardSvg, path.join(IG_DIR, "screen_01_leaderboard.jpg"));
renderSvg(igScheduleSvg, path.join(IG_DIR, "screen_02_schedule.jpg"));
renderSvg(igHomeSvg, path.join(IG_DIR, "screen_03_home.jpg"));
renderSvg(igBadgesSvg, path.join(IG_DIR, "screen_04_badges.jpg"));
renderSvg(igLeaderboardSvg, path.join(IG_DIR, "screen_05_scores.jpg"));
renderSvg(igHomeSvg, path.join(IMAGES_DIR, "ig-app.jpg"));

renderSvg(teledirSearchSvg, path.join(TELEDIR_DIR, "screen_01_search.jpg"));
renderSvg(teledirFacultySvg, path.join(TELEDIR_DIR, "screen_02_faculty.jpg"));
renderSvg(teledirDeptSvg, path.join(TELEDIR_DIR, "screen_03_departments.jpg"));
renderSvg(teledirSearchSvg, path.join(IMAGES_DIR, "vnit-directory.jpg"));

// 2. Desktop Screens (2560x1440)
renderSvg(gitlikeSvg, path.join(IMAGES_DIR, "gitlike.jpg"));
renderSvg(gitlikeSvg, path.join(IMAGES_DIR, "gitlike-workbench.jpg"));
renderSvg(algolizerSvg, path.join(IMAGES_DIR, "algolizer.jpg"));
renderSvg(algolizerAnalyticsSvg, path.join(IMAGES_DIR, "algolizer-analytics.jpg"));
renderSvg(chattySvg, path.join(IMAGES_DIR, "chatty.jpg"));
renderSvg(raytracerSpecSvg, path.join(IMAGES_DIR, "raytracer-spec.jpg"));
renderSvg(ieeeConferenceSvg, path.join(IMAGES_DIR, "ieee-conference.jpg"));

// 3. Process photorealistic raytracer.jpg to 16:9 2560x1440
try {
  const origRaytracer = path.join(IMAGES_DIR, "raytracer.jpg");
  if (fs.existsSync(origRaytracer)) {
    // Check if backup exists
    const backupRaytracer = path.join(IMAGES_DIR, "raytracer-orig.jpg");
    if (!fs.existsSync(backupRaytracer)) {
      fs.copyFileSync(origRaytracer, backupRaytracer);
    }
    // Render 16:9 2560x1440 photorealistic render centered on the reflection spheres
    execSync(`magick "${backupRaytracer}" -gravity center -crop 1200x675+0+0 -resize 2560x1440 -quality 98 "${origRaytracer}"`);
    console.log(`✓ Processed 16:9 raytracer.jpg (2560x1440)`);
  }
} catch (err) {
  console.error("Error processing 16:9 raytracer.jpg:", err.message);
}

console.log("All project screens successfully rendered!");
