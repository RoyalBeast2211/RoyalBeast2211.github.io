import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// We generate ultra-crisp, high-resolution SVG screens and render them to PNG/JPEG at 1080x2340 (exact 19.5:9 mobile ratio)
// and 2560x1440 (exact 16:9 desktop ratio) using ImageMagick.

const SCRIPT_DIR = path.resolve(".");
const IMAGES_DIR = path.join(SCRIPT_DIR, "public", "images");
const TELEDIR_DIR = path.join(IMAGES_DIR, "teledir");
const IGAPP_DIR = path.join(IMAGES_DIR, "ig-app");

fs.mkdirSync(TELEDIR_DIR, { recursive: true });
fs.mkdirSync(IGAPP_DIR, { recursive: true });

function renderSvgToJpg(svgContent, outputPath, width = 1080, height = 2340, quality = 95) {
  const tmpSvg = path.join("/tmp", `temp_${Date.now()}_${Math.random().toString(36).substring(7)}.svg`);
  fs.writeFileSync(tmpSvg, svgContent);
  try {
    execSync(`magick -density 150 -background "#0A0A0A" "${tmpSvg}" -resize ${width}x${height}! -quality ${quality} "${outputPath}"`);
    console.log(`Rendered: ${outputPath} (${width}x${height})`);
  } catch (err) {
    console.error(`Error rendering ${outputPath}:`, err.message);
  } finally {
    if (fs.existsSync(tmpSvg)) fs.unlinkSync(tmpSvg);
  }
}

// -------------------------------------------------------------
// 1. TELEDIR SCREENS (1080 x 2340, exact 19.5:9 iPhone/Android ratio)
// -------------------------------------------------------------

// Screen 1: Search & Faculty Directory
const teledirSearchSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#0F1115;font-family:'DejaVu Sans',sans-serif;">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141820"/>
      <stop offset="50%" stop-color="#0E1015"/>
      <stop offset="100%" stop-color="#090B0E"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A1F29"/>
      <stop offset="100%" stop-color="#131720"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="url(#bgGlow)"/>

  <!-- Top Status Bar (Safe Area) -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="90">9:41</text>
    <text x="920" y="90" text-anchor="end">5G  100%</text>
  </g>

  <!-- App Header -->
  <g transform="translate(60, 160)">
    <text x="0" y="50" fill="#10B981" font-size="28" font-weight="bold" letter-spacing="4">VNIT NAGPUR · DIRECTORY</text>
    <text x="0" y="115" fill="#FFFFFF" font-size="56" font-weight="900" letter-spacing="-1">Campus Contacts</text>
    <text x="0" y="165" fill="#9CA3AF" font-size="32">4,000+ Verified Institutional Extensions</text>

    <!-- Search Box -->
    <g transform="translate(0, 210)">
      <rect width="960" height="110" rx="24" fill="#181D26" stroke="#2D3748" stroke-width="2"/>
      <circle cx="55" cy="55" r="18" fill="none" stroke="#10B981" stroke-width="4"/>
      <line x1="68" y1="68" x2="84" y2="84" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>
      <text x="110" y="66" fill="#F3F4F6" font-size="34" font-weight="500">Dr. Kothari</text>
      <rect x="850" y="25" width="80" height="60" rx="12" fill="#242C3B"/>
      <text x="890" y="66" fill="#9CA3AF" font-size="26" text-anchor="middle">CLR</text>
    </g>

    <!-- Filter Pills -->
    <g transform="translate(0, 360)">
      <rect x="0" y="0" width="130" height="64" rx="32" fill="#10B981"/>
      <text x="65" y="42" fill="#0A1F18" font-size="26" font-weight="bold" text-anchor="middle">ALL</text>

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

  <!-- Contacts List -->
  <g transform="translate(60, 630)">
    <!-- Contact Card 1: Dr. A. G. Kothari -->
    <g transform="translate(0, 0)">
      <rect width="960" height="260" rx="28" fill="url(#cardGrad)" stroke="#10B981" stroke-width="2"/>
      <!-- Avatar -->
      <circle cx="80" cy="90" r="50" fill="#1E293B"/>
      <text x="80" y="105" fill="#10B981" font-size="38" font-weight="bold" text-anchor="middle">AK</text>
      <!-- Info -->
      <text x="160" y="75" fill="#FFFFFF" font-size="38" font-weight="bold">Dr. A. G. Kothari</text>
      <text x="160" y="120" fill="#10B981" font-size="28" font-weight="600">Professor &amp; Head, CSE Department</text>
      <text x="160" y="165" fill="#9CA3AF" font-size="26">Office: CS-204 · South Academic Block</text>
      <!-- Ext Badge -->
      <rect x="160" y="185" width="180" height="46" rx="10" fill="#064E3B"/>
      <text x="250" y="217" fill="#6EE7B7" font-size="24" font-weight="bold" text-anchor="middle">EXT: 1241</text>
      <!-- Call Button -->
      <rect x="760" y="70" width="160" height="85" rx="20" fill="url(#accentGrad)"/>
      <text x="840" y="124" fill="#042F2E" font-size="30" font-weight="bold" text-anchor="middle">CALL</text>
    </g>

    <!-- Contact Card 2: Dr. P. M. Padole -->
    <g transform="translate(0, 290)">
      <rect width="960" height="260" rx="28" fill="url(#cardGrad)" stroke="#262E3D" stroke-width="2"/>
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

    <!-- Contact Card 3: Dr. M. M. Dongre -->
    <g transform="translate(0, 580)">
      <rect width="960" height="260" rx="28" fill="url(#cardGrad)" stroke="#262E3D" stroke-width="2"/>
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

    <!-- Contact Card 4: Dr. S. R. Sathe -->
    <g transform="translate(0, 870)">
      <rect width="960" height="260" rx="28" fill="url(#cardGrad)" stroke="#262E3D" stroke-width="2"/>
      <circle cx="80" cy="90" r="50" fill="#1E293B"/>
      <text x="80" y="105" fill="#FBBF24" font-size="38" font-weight="bold" text-anchor="middle">SS</text>
      <text x="160" y="75" fill="#FFFFFF" font-size="38" font-weight="bold">Dr. S. R. Sathe</text>
      <text x="160" y="120" fill="#FBBF24" font-size="28" font-weight="600">Professor, Computer Science</text>
      <text x="160" y="165" fill="#9CA3AF" font-size="26">Office: CS-105 · Algorithms Lab</text>
      <rect x="160" y="185" width="180" height="46" rx="10" fill="#1E293B"/>
      <text x="250" y="217" fill="#FCD34D" font-size="24" font-weight="bold" text-anchor="middle">EXT: 1255</text>
      <rect x="760" y="70" width="160" height="85" rx="20" fill="#1F2937" stroke="#374151" stroke-width="2"/>
      <text x="840" y="124" fill="#E5E7EB" font-size="30" font-weight="bold" text-anchor="middle">CALL</text>
    </g>

    <!-- Contact Card 5: Campus Health Centre -->
    <g transform="translate(0, 1160)">
      <rect width="960" height="260" rx="28" fill="url(#cardGrad)" stroke="#DC2626" stroke-width="2"/>
      <circle cx="80" cy="90" r="50" fill="#7F1D1D"/>
      <text x="80" y="105" fill="#EF4444" font-size="38" font-weight="bold" text-anchor="middle">+</text>
      <text x="160" y="75" fill="#FFFFFF" font-size="38" font-weight="bold">Campus Medical Centre</text>
      <text x="160" y="120" fill="#EF4444" font-size="28" font-weight="600">24/7 Emergency Medical Response</text>
      <text x="160" y="165" fill="#9CA3AF" font-size="26">Health Centre Bldg · Main Gate</text>
      <rect x="160" y="185" width="220" height="46" rx="10" fill="#7F1D1D"/>
      <text x="270" y="217" fill="#FCA5A5" font-size="24" font-weight="bold" text-anchor="middle">EMERGENCY: 1999</text>
      <rect x="760" y="70" width="160" height="85" rx="20" fill="#DC2626"/>
      <text x="840" y="124" fill="#FFFFFF" font-size="30" font-weight="bold" text-anchor="middle">DIAL</text>
    </g>
  </g>

  <!-- Bottom Nav Bar -->
  <g transform="translate(0, 2160)">
    <rect width="1080" height="180" fill="#11141A" stroke="#262E3D" stroke-width="2"/>
    <text x="150" y="80" fill="#10B981" font-size="26" font-weight="bold" text-anchor="middle">DIRECTORY</text>
    <text x="410" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">DEPTS</text>
    <text x="670" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">FAVORITES</text>
    <text x="930" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">SETTINGS</text>
    <!-- Indicator bar -->
    <rect x="420" y="145" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>
`;

// Screen 2: Faculty Profile Dossier
const teledirFacultySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#0F1115;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="bgGlow2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141820"/>
      <stop offset="100%" stop-color="#090B0E"/>
    </linearGradient>
    <linearGradient id="accentGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A1F29"/>
      <stop offset="100%" stop-color="#131720"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="url(#bgGlow2)"/>

  <!-- Top Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="90">9:41</text>
    <text x="920" y="90" text-anchor="end">5G  100%</text>
  </g>

  <!-- Back Nav -->
  <g transform="translate(60, 160)">
    <rect width="90" height="90" rx="24" fill="#181D26" stroke="#2D3748" stroke-width="2"/>
    <text x="45" y="58" fill="#10B981" font-size="44" font-weight="bold" text-anchor="middle">←</text>
    <text x="120" y="60" fill="#9CA3AF" font-size="32" font-weight="bold">FACULTY PROFILE</text>
  </g>

  <!-- Profile Hero Banner -->
  <g transform="translate(60, 300)">
    <rect width="960" height="520" rx="36" fill="url(#cardGrad2)" stroke="#10B981" stroke-width="2"/>

    <!-- Avatar Glow -->
    <circle cx="480" cy="160" r="95" fill="#10B981" opacity="0.15"/>
    <circle cx="480" cy="160" r="80" fill="#1E293B" stroke="#10B981" stroke-width="4"/>
    <text x="480" y="185" fill="#10B981" font-size="64" font-weight="bold" text-anchor="middle">AK</text>

    <!-- Name & Title -->
    <text x="480" y="300" fill="#FFFFFF" font-size="52" font-weight="bold" text-anchor="middle">Dr. A. G. Kothari</text>
    <text x="480" y="355" fill="#10B981" font-size="32" font-weight="600" text-anchor="middle">Professor &amp; Head of Department</text>
    <text x="480" y="405" fill="#9CA3AF" font-size="28" text-anchor="middle">Computer Science &amp; Engineering · VNIT</text>

    <!-- Status Badge -->
    <rect x="360" y="440" width="240" height="48" rx="24" fill="#064E3B"/>
    <text x="480" y="473" fill="#6EE7B7" font-size="24" font-weight="bold" text-anchor="middle">ACTIVE ON EXT: 1241</text>
  </g>

  <!-- Quick Action Buttons -->
  <g transform="translate(60, 860)">
    <!-- Direct Call -->
    <rect x="0" y="0" width="460" height="130" rx="28" fill="url(#accentGrad2)"/>
    <text x="230" y="78" fill="#042F2E" font-size="34" font-weight="bold" text-anchor="middle">📞 DIAL EXT 1241</text>

    <!-- Email -->
    <rect x="500" y="0" width="460" height="130" rx="28" fill="#181D26" stroke="#2D3748" stroke-width="2"/>
    <text x="730" y="78" fill="#FFFFFF" font-size="34" font-weight="bold" text-anchor="middle">✉️ SEND EMAIL</text>
  </g>

  <!-- Institutional Details Section -->
  <g transform="translate(60, 1040)">
    <text x="0" y="40" fill="#9CA3AF" font-size="26" font-weight="bold" letter-spacing="3">OFFICIAL DOSSIER</text>

    <!-- Item 1: Office Location -->
    <g transform="translate(0, 70)">
      <rect width="960" height="160" rx="24" fill="url(#cardGrad2)" stroke="#262E3D" stroke-width="2"/>
      <text x="40" y="65" fill="#9CA3AF" font-size="24">OFFICE LOCATION</text>
      <text x="40" y="115" fill="#FFFFFF" font-size="34" font-weight="bold">Room CS-204, South Academic Wing</text>
    </g>

    <!-- Item 2: Direct Email -->
    <g transform="translate(0, 260)">
      <rect width="960" height="160" rx="24" fill="url(#cardGrad2)" stroke="#262E3D" stroke-width="2"/>
      <text x="40" y="65" fill="#9CA3AF" font-size="24">INSTITUTIONAL EMAIL</text>
      <text x="40" y="115" fill="#10B981" font-size="34" font-weight="bold">agkothari@cse.vnit.ac.in</text>
    </g>

    <!-- Item 3: Direct Landline -->
    <g transform="translate(0, 450)">
      <rect width="960" height="160" rx="24" fill="url(#cardGrad2)" stroke="#262E3D" stroke-width="2"/>
      <text x="40" y="65" fill="#9CA3AF" font-size="24">EPABX BOARD INTERCOM</text>
      <text x="40" y="115" fill="#FFFFFF" font-size="34" font-weight="bold">+91 712 280 1241 (Direct)</text>
    </g>

    <!-- Item 4: Research Areas -->
    <g transform="translate(0, 640)">
      <rect width="960" height="240" rx="24" fill="url(#cardGrad2)" stroke="#262E3D" stroke-width="2"/>
      <text x="40" y="65" fill="#9CA3AF" font-size="24">SPECIALIZATIONS &amp; RESEARCH</text>
      <text x="40" y="115" fill="#FFFFFF" font-size="32" font-weight="bold">Distributed Systems &amp; High-Perf Computing</text>
      <text x="40" y="165" fill="#9CA3AF" font-size="28">Computer Networks · Algorithm Architecture</text>
    </g>
  </g>

  <!-- Bottom Home Indicator -->
  <rect x="420" y="2300" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
</svg>
`;

// Screen 3: Academic Departments Directory
const teledirDeptSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#0F1115;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="bgGlow3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141820"/>
      <stop offset="100%" stop-color="#090B0E"/>
    </linearGradient>
    <linearGradient id="cardGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A1F29"/>
      <stop offset="100%" stop-color="#131720"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="url(#bgGlow3)"/>

  <!-- Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="90">9:41</text>
    <text x="920" y="90" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 160)">
    <text x="0" y="50" fill="#10B981" font-size="28" font-weight="bold" letter-spacing="4">VNIT DEPARTMENTS &amp; CELLS</text>
    <text x="0" y="115" fill="#FFFFFF" font-size="56" font-weight="900">Academic Catalog</text>
    <text x="0" y="165" fill="#9CA3AF" font-size="32">Departmental Offices, HOD Desks &amp; Labs</text>
  </g>

  <!-- Department List Cards -->
  <g transform="translate(60, 400)">
    <!-- Dept 1: CSE -->
    <g transform="translate(0, 0)">
      <rect width="960" height="240" rx="28" fill="url(#cardGrad3)" stroke="#10B981" stroke-width="2"/>
      <text x="50" y="75" fill="#FFFFFF" font-size="40" font-weight="bold">Computer Science &amp; Engineering</text>
      <text x="50" y="125" fill="#10B981" font-size="28">Head: Dr. A. G. Kothari · 32 Faculty</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="26">Office: CS Block · Ext: 1240 / 1241</text>
      <rect x="780" y="70" width="130" height="70" rx="16" fill="#10B981"/>
      <text x="845" y="115" fill="#042F2E" font-size="26" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 2: ECE -->
    <g transform="translate(0, 270)">
      <rect width="960" height="240" rx="28" fill="url(#cardGrad3)" stroke="#262E3D" stroke-width="2"/>
      <text x="50" y="75" fill="#FFFFFF" font-size="40" font-weight="bold">Electronics &amp; Communication Engg</text>
      <text x="50" y="125" fill="#60A5FA" font-size="28">Head: Dr. V. R. Satpute · 28 Faculty</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="26">Office: EC Block · Ext: 1350 / 1351</text>
      <rect x="780" y="70" width="130" height="70" rx="16" fill="#1E293B"/>
      <text x="845" y="115" fill="#E5E7EB" font-size="26" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 3: Mechanical -->
    <g transform="translate(0, 540)">
      <rect width="960" height="240" rx="28" fill="url(#cardGrad3)" stroke="#262E3D" stroke-width="2"/>
      <text x="50" y="75" fill="#FFFFFF" font-size="40" font-weight="bold">Mechanical Engineering</text>
      <text x="50" y="125" fill="#FBBF24" font-size="28">Head: Dr. A. M. Kuthe · 45 Faculty</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="26">Office: ME Block · Ext: 1100 / 1101</text>
      <rect x="780" y="70" width="130" height="70" rx="16" fill="#1E293B"/>
      <text x="845" y="115" fill="#E5E7EB" font-size="26" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 4: Electrical -->
    <g transform="translate(0, 810)">
      <rect width="960" height="240" rx="28" fill="url(#cardGrad3)" stroke="#262E3D" stroke-width="2"/>
      <text x="50" y="75" fill="#FFFFFF" font-size="40" font-weight="bold">Electrical Engineering</text>
      <text x="50" y="125" fill="#A78BFA" font-size="28">Head: Dr. M. V. Aware · 30 Faculty</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="26">Office: EE Block · Ext: 1150 / 1151</text>
      <rect x="780" y="70" width="130" height="70" rx="16" fill="#1E293B"/>
      <text x="845" y="115" fill="#E5E7EB" font-size="26" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 5: Central Library -->
    <g transform="translate(0, 1080)">
      <rect width="960" height="240" rx="28" fill="url(#cardGrad3)" stroke="#262E3D" stroke-width="2"/>
      <text x="50" y="75" fill="#FFFFFF" font-size="40" font-weight="bold">Central Library &amp; Learning Centre</text>
      <text x="50" y="125" fill="#F472B6" font-size="28">Chief Librarian · Circulation &amp; Digital Access</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="26">Main Library Bldg · Ext: 1800</text>
      <rect x="780" y="70" width="130" height="70" rx="16" fill="#1E293B"/>
      <text x="845" y="115" fill="#E5E7EB" font-size="26" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>

    <!-- Dept 6: Training & Placement -->
    <g transform="translate(0, 1350)">
      <rect width="960" height="240" rx="28" fill="url(#cardGrad3)" stroke="#262E3D" stroke-width="2"/>
      <text x="50" y="75" fill="#FFFFFF" font-size="40" font-weight="bold">Training &amp; Placement Cell</text>
      <text x="50" y="125" fill="#34D399" font-size="28">Head, T&amp;P · Corporate Relations Desk</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="26">Administrative Block · Ext: 1750</text>
      <rect x="780" y="70" width="130" height="70" rx="16" fill="#1E293B"/>
      <text x="845" y="115" fill="#E5E7EB" font-size="26" font-weight="bold" text-anchor="middle">VIEW</text>
    </g>
  </g>

  <!-- Bottom Nav Bar -->
  <g transform="translate(0, 2160)">
    <rect width="1080" height="180" fill="#11141A" stroke="#262E3D" stroke-width="2"/>
    <text x="150" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">DIRECTORY</text>
    <text x="410" y="80" fill="#10B981" font-size="26" font-weight="bold" text-anchor="middle">DEPTS</text>
    <text x="670" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">FAVORITES</text>
    <text x="930" y="80" fill="#6B7280" font-size="26" font-weight="bold" text-anchor="middle">SETTINGS</text>
    <rect x="420" y="145" width="240" height="8" rx="4" fill="#FFFFFF" opacity="0.6"/>
  </g>
</svg>
`;

// -------------------------------------------------------------
// 2. IG APP SCREENS (1080 x 2340, exact 19.5:9 mobile ratio)
// -------------------------------------------------------------

// Screen 1: Leaderboard with Podium
const igAppLeaderboardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B10;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="igBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#11131C"/>
      <stop offset="50%" stop-color="#0C0E14"/>
      <stop offset="100%" stop-color="#07080B"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
    <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
    <linearGradient id="igCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181C26"/>
      <stop offset="100%" stop-color="#10131A"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="url(#igBg)"/>

  <!-- Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="90">9:41</text>
    <text x="920" y="90" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 160)">
    <div style="display:flex;">
      <rect x="0" y="0" width="190" height="48" rx="24" fill="#6366F1" opacity="0.2"/>
      <text x="95" y="33" fill="#818CF8" font-size="22" font-weight="bold" text-anchor="middle">🟢 SUPABASE LIVE</text>
    </div>
    <text x="0" y="110" fill="#FFFFFF" font-size="58" font-weight="900" letter-spacing="-1">IG 2024 Leaderboard</text>
    <text x="0" y="160" fill="#9CA3AF" font-size="32">Institute Gathering · Department Standings</text>
  </g>

  <!-- Top 3 Podium (Visual Showcase) -->
  <g transform="translate(60, 420)">
    <!-- 2nd Place: CSE -->
    <g transform="translate(50, 80)">
      <rect width="240" height="280" rx="20" fill="url(#silverGrad)" opacity="0.25"/>
      <rect width="240" height="280" rx="20" fill="none" stroke="#94A3B8" stroke-width="2"/>
      <text x="120" y="70" fill="#E2E8F0" font-size="64" font-weight="900" text-anchor="middle">2</text>
      <text x="120" y="140" fill="#FFFFFF" font-size="38" font-weight="bold" text-anchor="middle">CSE</text>
      <text x="120" y="210" fill="#94A3B8" font-size="32" font-weight="bold" text-anchor="middle">840 PTS</text>
    </g>

    <!-- 1st Place: MINING (Champion) -->
    <g transform="translate(340, 0)">
      <rect width="280" height="360" rx="24" fill="url(#goldGrad)" opacity="0.3"/>
      <rect width="280" height="360" rx="24" fill="none" stroke="#F59E0B" stroke-width="3"/>
      <text x="140" y="-20" font-size="50" text-anchor="middle">👑</text>
      <text x="140" y="80" fill="#FCD34D" font-size="76" font-weight="900" text-anchor="middle">1</text>
      <text x="140" y="170" fill="#FFFFFF" font-size="44" font-weight="bold" text-anchor="middle">MINING</text>
      <text x="140" y="250" fill="#FBBF24" font-size="38" font-weight="bold" text-anchor="middle">880 PTS</text>
      <rect x="50" y="285" width="180" height="44" rx="22" fill="#D97706"/>
      <text x="140" y="316" fill="#FFFFFF" font-size="22" font-weight="bold" text-anchor="middle">LEADER</text>
    </g>

    <!-- 3rd Place: MECH -->
    <g transform="translate(670, 130)">
      <rect width="240" height="230" rx="20" fill="url(#bronzeGrad)" opacity="0.25"/>
      <rect width="240" height="230" rx="20" fill="none" stroke="#EA580C" stroke-width="2"/>
      <text x="120" y="70" fill="#FDBA74" font-size="64" font-weight="900" text-anchor="middle">3</text>
      <text x="120" y="130" fill="#FFFFFF" font-size="36" font-weight="bold" text-anchor="middle">MECH</text>
      <text x="120" y="190" fill="#FB923C" font-size="30" font-weight="bold" text-anchor="middle">790 PTS</text>
    </g>
  </g>

  <!-- Complete Standings Table -->
  <g transform="translate(60, 890)">
    <text x="0" y="40" fill="#9CA3AF" font-size="26" font-weight="bold" letter-spacing="3">COMPLETE STANDINGS (12 DEPARTMENTS)</text>

    <!-- Row 4: ELECTRICAL -->
    <g transform="translate(0, 70)">
      <rect width="960" height="150" rx="24" fill="url(#igCard)" stroke="#1F2937" stroke-width="2"/>
      <text x="50" y="90" fill="#9CA3AF" font-size="34" font-weight="bold">#4</text>
      <text x="130" y="90" fill="#FFFFFF" font-size="36" font-weight="bold">Electrical Engineering</text>
      <text x="650" y="90" fill="#9CA3AF" font-size="28">14 wins</text>
      <text x="890" y="90" fill="#6366F1" font-size="34" font-weight="bold" text-anchor="end">720 PTS</text>
    </g>

    <!-- Row 5: ECE -->
    <g transform="translate(0, 240)">
      <rect width="960" height="150" rx="24" fill="url(#igCard)" stroke="#1F2937" stroke-width="2"/>
      <text x="50" y="90" fill="#9CA3AF" font-size="34" font-weight="bold">#5</text>
      <text x="130" y="90" fill="#FFFFFF" font-size="36" font-weight="bold">Electronics &amp; Comm. (ECE)</text>
      <text x="650" y="90" fill="#9CA3AF" font-size="28">11 wins</text>
      <text x="890" y="90" fill="#6366F1" font-size="34" font-weight="bold" text-anchor="end">690 PTS</text>
    </g>

    <!-- Row 6: CIVIL -->
    <g transform="translate(0, 410)">
      <rect width="960" height="150" rx="24" fill="url(#igCard)" stroke="#1F2937" stroke-width="2"/>
      <text x="50" y="90" fill="#9CA3AF" font-size="34" font-weight="bold">#6</text>
      <text x="130" y="90" fill="#FFFFFF" font-size="36" font-weight="bold">Civil Engineering</text>
      <text x="650" y="90" fill="#9CA3AF" font-size="28">9 wins</text>
      <text x="890" y="90" fill="#6366F1" font-size="34" font-weight="bold" text-anchor="end">650 PTS</text>
    </g>

    <!-- Row 7: METALLURGY -->
    <g transform="translate(0, 580)">
      <rect width="960" height="150" rx="24" fill="url(#igCard)" stroke="#1F2937" stroke-width="2"/>
      <text x="50" y="90" fill="#9CA3AF" font-size="34" font-weight="bold">#7</text>
      <text x="130" y="90" fill="#FFFFFF" font-size="36" font-weight="bold">Materials &amp; Metallurgy</text>
      <text x="650" y="90" fill="#9CA3AF" font-size="28">8 wins</text>
      <text x="890" y="90" fill="#6366F1" font-size="34" font-weight="bold" text-anchor="end">610 PTS</text>
    </g>

    <!-- Row 8: CHEMICAL -->
    <g transform="translate(0, 750)">
      <rect width="960" height="150" rx="24" fill="url(#igCard)" stroke="#1F2937" stroke-width="2"/>
      <text x="50" y="90" fill="#9CA3AF" font-size="34" font-weight="bold">#8</text>
      <text x="130" y="90" fill="#FFFFFF" font-size="36" font-weight="bold">Chemical Engineering</text>
      <text x="650" y="90" fill="#9CA3AF" font-size="28">7 wins</text>
      <text x="890" y="90" fill="#6366F1" font-size="34" font-weight="bold" text-anchor="end">580 PTS</text>
    </g>

    <!-- Row 9: ARCHITECTURE -->
    <g transform="translate(0, 920)">
      <rect width="960" height="150" rx="24" fill="url(#igCard)" stroke="#1F2937" stroke-width="2"/>
      <text x="50" y="90" fill="#9CA3AF" font-size="34" font-weight="bold">#9</text>
      <text x="130" y="90" fill="#FFFFFF" font-size="36" font-weight="bold">Architecture &amp; Planning</text>
      <text x="650" y="90" fill="#9CA3AF" font-size="28">6 wins</text>
      <text x="890" y="90" fill="#6366F1" font-size="34" font-weight="bold" text-anchor="end">540 PTS</text>
    </g>
  </g>

  <!-- Bottom Tab Bar -->
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

// Screen 2: Fixtures & Schedule
const igAppScheduleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B10;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="schedCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181C26"/>
      <stop offset="100%" stop-color="#10131A"/>
    </linearGradient>
    <linearGradient id="liveBadge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#DC2626"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="#090B10"/>

  <!-- Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="90">9:41</text>
    <text x="920" y="90" text-anchor="end">5G  100%</text>
  </g>

  <!-- Header -->
  <g transform="translate(60, 160)">
    <text x="0" y="50" fill="#818CF8" font-size="28" font-weight="bold" letter-spacing="4">DAY 03 OF 04 · FINALS</text>
    <text x="0" y="115" fill="#FFFFFF" font-size="56" font-weight="900">Event Schedule</text>
    <text x="0" y="165" fill="#9CA3AF" font-size="32">Live Matches, Timelines &amp; Tournament Venues</text>
  </g>

  <!-- Match Cards -->
  <g transform="translate(60, 400)">
    <!-- Card 1: Basketball Live Finals -->
    <g transform="translate(0, 0)">
      <rect width="960" height="340" rx="32" fill="url(#schedCard)" stroke="#EF4444" stroke-width="2"/>
      <!-- Live Badge -->
      <rect x="50" y="45" width="140" height="46" rx="23" fill="url(#liveBadge)"/>
      <text x="120" y="77" fill="#FFFFFF" font-size="24" font-weight="bold" text-anchor="middle">● LIVE Q4</text>
      <text x="210" y="78" fill="#9CA3AF" font-size="26">Basketball Men's Finals · Court 1</text>

      <!-- Match Score Spread -->
      <text x="50" y="160" fill="#FFFFFF" font-size="44" font-weight="bold">CSE</text>
      <text x="260" y="160" fill="#EF4444" font-size="54" font-weight="900">68</text>
      <text x="360" y="160" fill="#6B7280" font-size="36">vs</text>
      <text x="440" y="160" fill="#EF4444" font-size="54" font-weight="900">64</text>
      <text x="550" y="160" fill="#FFFFFF" font-size="44" font-weight="bold">MECH</text>

      <line x1="50" y1="210" x2="910" y2="210" stroke="#2D3748" stroke-width="1.5"/>
      <text x="50" y="270" fill="#9CA3AF" font-size="26">Possession: CSE · 02:45 Remaining · Lead change: 8</text>
      <rect x="760" y="240" width="150" height="60" rx="16" fill="#312E81"/>
      <text x="835" y="278" fill="#A5B4FC" font-size="24" font-weight="bold" text-anchor="middle">STREAM</text>
    </g>

    <!-- Card 2: Upcoming Robotics -->
    <g transform="translate(0, 380)">
      <rect width="960" height="320" rx="32" fill="url(#schedCard)" stroke="#262E3D" stroke-width="2"/>
      <rect x="50" y="45" width="160" height="46" rx="23" fill="#1E293B"/>
      <text x="130" y="77" fill="#93C5FD" font-size="24" font-weight="bold" text-anchor="middle">16:30 IST</text>
      <text x="230" y="78" fill="#9CA3AF" font-size="26">Robotics Obstacle Arena · SAC Hall</text>

      <text x="50" y="160" fill="#FFFFFF" font-size="40" font-weight="bold">Autonomous Maze Solver Finals</text>
      <text x="50" y="210" fill="#818CF8" font-size="30">8 Qualified Teams · Speed &amp; Accuracy Run</text>

      <line x1="50" y1="240" x2="910" y2="240" stroke="#2D3748" stroke-width="1.5"/>
      <text x="50" y="285" fill="#9CA3AF" font-size="26">Chief Judges: Dr. Kothari, Dr. Satpute</text>
    </g>

    <!-- Card 3: Cricket Finals Result -->
    <g transform="translate(0, 740)">
      <rect width="960" height="320" rx="32" fill="url(#schedCard)" stroke="#10B981" stroke-width="2"/>
      <rect x="50" y="45" width="180" height="46" rx="23" fill="#064E3B"/>
      <text x="140" y="77" fill="#6EE7B7" font-size="24" font-weight="bold" text-anchor="middle">✓ COMPLETED</text>
      <text x="250" y="78" fill="#9CA3AF" font-size="26">Cricket Championship · Main Oval</text>

      <text x="50" y="160" fill="#FFFFFF" font-size="40" font-weight="bold">MINING WON BY 18 RUNS</text>
      <text x="50" y="210" fill="#10B981" font-size="30">Mining: 168/6 (20.0) · Civil: 150/9 (20.0)</text>

      <line x1="50" y1="240" x2="910" y2="240" stroke="#2D3748" stroke-width="1.5"/>
      <text x="50" y="285" fill="#9CA3AF" font-size="26">Man of Match: R. Sharma (+100 Pts to Mining)</text>
    </g>

    <!-- Card 4: Webathon & Coding Sprint -->
    <g transform="translate(0, 1100)">
      <rect width="960" height="320" rx="32" fill="url(#schedCard)" stroke="#262E3D" stroke-width="2"/>
      <rect x="50" y="45" width="160" height="46" rx="23" fill="#1E293B"/>
      <text x="130" y="77" fill="#FCD34D" font-size="24" font-weight="bold" text-anchor="middle">19:00 IST</text>
      <text x="230" y="78" fill="#9CA3AF" font-size="26">Algorithmic Relay Sprint · CS Lab 2</text>

      <text x="50" y="160" fill="#FFFFFF" font-size="40" font-weight="bold">Inter-Dept Speed Programming</text>
      <text x="50" y="210" fill="#FCD34D" font-size="30">3 Hours · 8 Problems · Real-Time Judged</text>

      <line x1="50" y1="240" x2="910" y2="240" stroke="#2D3748" stroke-width="1.5"/>
      <text x="50" y="285" fill="#9CA3AF" font-size="26">Top 3 Teams earn 80, 50, 30 points</text>
    </g>
  </g>

  <!-- Bottom Tab Bar -->
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

// Screen 3: Home Overview
const igAppHomeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2340" width="1080" height="2340" style="background:#090B10;font-family:'DejaVu Sans',sans-serif;">
  <defs>
    <linearGradient id="heroBanner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <linearGradient id="homeCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181C26"/>
      <stop offset="100%" stop-color="#10131A"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="2340" fill="#090B10"/>

  <!-- Status Bar -->
  <g fill="#9CA3AF" font-size="34" font-weight="bold">
    <text x="80" y="90">9:41</text>
    <text x="920" y="90" text-anchor="end">5G  100%</text>
  </g>

  <!-- Hero Festival Card -->
  <g transform="translate(60, 160)">
    <rect width="960" height="420" rx="36" fill="url(#heroBanner)"/>
    <text x="60" y="80" fill="#C7D2FE" font-size="26" font-weight="bold" letter-spacing="4">VNIT ANNUAL GATHERING 2024</text>
    <text x="60" y="160" fill="#FFFFFF" font-size="64" font-weight="900">Institute Gathering</text>
    <text x="60" y="220" fill="#E0E7FF" font-size="34">4,000+ University Students Live</text>

    <rect x="60" y="280" width="220" height="70" rx="20" fill="#FFFFFF"/>
    <text x="170" y="325" fill="#312E81" font-size="28" font-weight="bold" text-anchor="middle">EXPLORE</text>

    <text x="320" y="325" fill="#E0E7FF" font-size="28" font-weight="600">84 Medals · 12 Depts</text>
  </g>

  <!-- Metric Badges -->
  <g transform="translate(60, 620)">
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

  <!-- Announcements -->
  <g transform="translate(60, 840)">
    <text x="0" y="40" fill="#9CA3AF" font-size="26" font-weight="bold" letter-spacing="3">ANNOUNCEMENTS &amp; UPDATES</text>

    <g transform="translate(0, 70)">
      <rect width="960" height="240" rx="28" fill="url(#homeCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="50" y="65" fill="#EF4444" font-size="24" font-weight="bold">FINAL NIGHT RESULTS TODAY</text>
      <text x="50" y="120" fill="#FFFFFF" font-size="36" font-weight="bold">Auditorium Trophy Ceremony at 20:00 IST</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="28">Dean Student Welfare will award the overall Championship.</text>
    </g>

    <g transform="translate(0, 340)">
      <rect width="960" height="240" rx="28" fill="url(#homeCard)" stroke="#262E3D" stroke-width="2"/>
      <text x="50" y="65" fill="#10B981" font-size="24" font-weight="bold">SUPABASE REALTIME SYNC ACTIVE</text>
      <text x="50" y="120" fill="#FFFFFF" font-size="36" font-weight="bold">Point Tallies updated live after every heat</text>
      <text x="50" y="170" fill="#9CA3AF" font-size="28">Referees sync scores via designated official tablet portals.</text>
    </g>
  </g>

  <!-- Bottom Tab Bar -->
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

// -------------------------------------------------------------
// EXECUTE RENDERING
// -------------------------------------------------------------
console.log("Rendering ultra-sharp mobile screens...");
renderSvgToJpg(teledirSearchSvg, path.join(TELEDIR_DIR, "screen_01_search.jpg"));
renderSvgToJpg(teledirFacultySvg, path.join(TELEDIR_DIR, "screen_02_faculty.jpg"));
renderSvgToJpg(teledirDeptSvg, path.join(TELEDIR_DIR, "screen_03_departments.jpg"));
renderSvgToJpg(teledirSearchSvg, path.join(IMAGES_DIR, "vnit-directory.jpg"));

renderSvgToJpg(igAppLeaderboardSvg, path.join(IGAPP_DIR, "screen_01_leaderboard.jpg"));
renderSvgToJpg(igAppScheduleSvg, path.join(IGAPP_DIR, "screen_02_schedule.jpg"));
renderSvgToJpg(igAppHomeSvg, path.join(IGAPP_DIR, "screen_03_home.jpg"));
renderSvgToJpg(igAppHomeSvg, path.join(IMAGES_DIR, "ig-app.jpg"));

console.log("Mobile screens generation finished successfully!");
