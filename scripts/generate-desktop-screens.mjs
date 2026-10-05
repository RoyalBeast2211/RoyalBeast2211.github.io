import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const SCRIPT_DIR = path.resolve(".");
const IMAGES_DIR = path.join(SCRIPT_DIR, "public", "images");

function renderSvgToJpg(svgContent, outputPath, width = 2560, height = 1440, quality = 95) {
  const tmpSvg = path.join("/tmp", `temp_desk_${Date.now()}_${Math.random().toString(36).substring(7)}.svg`);
  fs.writeFileSync(tmpSvg, svgContent);
  try {
    execSync(`magick -density 150 -background "#0A0A0A" "${tmpSvg}" -resize ${width}x${height}! -quality ${quality} "${outputPath}"`);
    console.log(`Rendered Desktop: ${outputPath} (${width}x${height})`);
  } catch (err) {
    console.error(`Error rendering ${outputPath}:`, err.message);
  } finally {
    if (fs.existsSync(tmpSvg)) fs.unlinkSync(tmpSvg);
  }
}

// =========================================================================
// 1. GITLIKE UI (2560 x 1440, exact 16:9)
// =========================================================================
const gitlikeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440" style="background:#0D1117;font-family:'DejaVu Sans Mono',monospace;">
  <defs>
    <linearGradient id="gitTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#161B22"/>
      <stop offset="100%" stop-color="#0D1117"/>
    </linearGradient>
    <linearGradient id="paneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#161B22"/>
      <stop offset="100%" stop-color="#0E131A"/>
    </linearGradient>
  </defs>

  <rect width="2560" height="1440" fill="#090D13"/>

  <!-- Top Application Window Bar -->
  <rect width="2560" height="80" fill="url(#gitTopGrad)" stroke="#30363D" stroke-width="2"/>
  <!-- Traffic Light Window Dots -->
  <circle cx="60" cy="40" r="14" fill="#FF5F56"/>
  <circle cx="105" cy="40" r="14" fill="#FFBD2E"/>
  <circle cx="150" cy="40" r="14" fill="#27C93F"/>

  <!-- Window Title -->
  <text x="210" y="48" fill="#F0F6FC" font-size="28" font-weight="bold">GITLIKE v1.4.2 // SHA-1 CONTENT-ADDRESSABLE OBJECT STORE &amp; VCS</text>
  <rect x="1800" y="20" width="400" height="42" rx="10" fill="#21262D" stroke="#30363D"/>
  <text x="2000" y="48" fill="#58A6FF" font-size="22" font-weight="bold" text-anchor="middle">HEAD -> refs/heads/master [9a4f28c]</text>
  <text x="2480" y="48" fill="#7EE787" font-size="24" font-weight="bold" text-anchor="end">STATUS: CLEAN</text>

  <!-- ==================== LEFT PANE: DAG COMMIT GRAPH ==================== -->
  <g transform="translate(40, 120)">
    <rect width="660" height="1180" rx="16" fill="url(#paneGrad)" stroke="#30363D" stroke-width="2"/>
    <rect width="660" height="60" rx="16" fill="#21262D"/>
    <text x="30" y="40" fill="#F0F6FC" font-size="24" font-weight="bold">DAG COMMIT ANCESTRY GRAPH</text>
    <text x="630" y="40" fill="#8B949E" font-size="20" text-anchor="end">4 COMMITS</text>

    <!-- Branch line -->
    <line x1="70" y1="130" x2="70" y2="800" stroke="#FF7B72" stroke-width="6"/>

    <!-- Commit Node 1: HEAD -->
    <g transform="translate(0, 110)">
      <circle cx="70" cy="40" r="16" fill="#58A6FF" stroke="#F0F6FC" stroke-width="4"/>
      <rect x="110" y="10" width="510" height="150" rx="12" fill="#0D1117" stroke="#58A6FF" stroke-width="2"/>
      <text x="130" y="45" fill="#58A6FF" font-size="24" font-weight="bold">9a4f28c (HEAD -> master)</text>
      <text x="130" y="80" fill="#F0F6FC" font-size="24">Add zlib blob compression</text>
      <text x="130" y="115" fill="#8B949E" font-size="20">Author: Omkar More · Tree: 3c8e19b</text>
      <text x="130" y="145" fill="#7EE787" font-size="18">+142 lines  -18 lines</text>
    </g>

    <!-- Commit Node 2 -->
    <g transform="translate(0, 310)">
      <circle cx="70" cy="40" r="14" fill="#3FB950" stroke="#F0F6FC" stroke-width="3"/>
      <rect x="110" y="10" width="510" height="140" rx="12" fill="#0D1117" stroke="#30363D" stroke-width="2"/>
      <text x="130" y="45" fill="#3FB950" font-size="24" font-weight="bold">3c8e19b [feat/tree-builder]</text>
      <text x="130" y="80" fill="#F0F6FC" font-size="24">Implement tree object serializer</text>
      <text x="130" y="115" fill="#8B949E" font-size="20">Recursive directory traversal</text>
    </g>

    <!-- Commit Node 3 -->
    <g transform="translate(0, 500)">
      <circle cx="70" cy="40" r="14" fill="#D29922" stroke="#F0F6FC" stroke-width="3"/>
      <rect x="110" y="10" width="510" height="140" rx="12" fill="#0D1117" stroke="#30363D" stroke-width="2"/>
      <text x="130" y="45" fill="#D29922" font-size="24" font-weight="bold">7f12a04 [staging-index]</text>
      <text x="130" y="80" fill="#F0F6FC" font-size="24">Staging binary cache &amp; .gitignore</text>
      <text x="130" y="115" fill="#8B949E" font-size="20">Binary index format parser</text>
    </g>

    <!-- Commit Node 4: Root -->
    <g transform="translate(0, 690)">
      <circle cx="70" cy="40" r="14" fill="#A371F7" stroke="#F0F6FC" stroke-width="3"/>
      <rect x="110" y="10" width="510" height="130" rx="12" fill="#0D1117" stroke="#30363D" stroke-width="2"/>
      <text x="130" y="45" fill="#A371F7" font-size="24" font-weight="bold">1d2c44a (tag: v0.1.0-init)</text>
      <text x="130" y="80" fill="#F0F6FC" font-size="24">Initial commit: storage engine</text>
      <text x="130" y="115" fill="#8B949E" font-size="20">Root commit node</text>
    </g>

    <!-- Git Branch Tags Widget -->
    <g transform="translate(30, 890)">
      <text x="0" y="30" fill="#8B949E" font-size="20" font-weight="bold">REPOSITORY REFERENCES</text>
      <rect x="0" y="50" width="600" height="200" rx="12" fill="#0D1117" stroke="#21262D"/>
      <text x="30" y="95" fill="#58A6FF" font-size="22">refs/heads/master  -> 9a4f28c</text>
      <text x="30" y="135" fill="#7EE787" font-size="22">refs/heads/dev     -> 3c8e19b</text>
      <text x="30" y="175" fill="#D29922" font-size="22">refs/tags/v1.0.0   -> 9a4f28c</text>
      <text x="30" y="215" fill="#8B949E" font-size="22">.gitlike/HEAD      -> ref: refs/heads/master</text>
    </g>
  </g>

  <!-- ==================== CENTER PANE: CODE & DIFF ==================== -->
  <g transform="translate(740, 120)">
    <rect width="1120" height="1180" rx="16" fill="url(#paneGrad)" stroke="#30363D" stroke-width="2"/>
    <rect width="1120" height="60" rx="16" fill="#21262D"/>
    <text x="30" y="40" fill="#F0F6FC" font-size="24" font-weight="bold">gitlike/core/storage.py — ZERO DEPENDENCIES</text>
    <text x="1090" y="40" fill="#7EE787" font-size="20" text-anchor="end">PYTHON 3.11</text>

    <!-- Code Block with Syntax Highlighting -->
    <g transform="translate(40, 100)" font-size="24" line-height="38">
      <text x="0" y="30" fill="#FF7B72">import</text><text x="100" y="30" fill="#F0F6FC"> hashlib, zlib, os, stat</text>
      <text x="0" y="70" fill="#FF7B72">from</text><text x="75" y="70" fill="#F0F6FC"> pathlib </text><text x="200" y="70" fill="#FF7B72">import</text><text x="300" y="70" fill="#F0F6FC"> Path</text>

      <text x="0" y="140" fill="#FF7B72">class</text><text x="90" y="140" fill="#FFA657"> ContentAddressableStorage</text><text x="470" y="140" fill="#F0F6FC">:</text>
      <text x="40" y="180" fill="#8B949E">"""Engine implementing Git content-addressable storage primitives."""</text>
      
      <text x="40" y="240" fill="#FF7B72">def</text><text x="100" y="240" fill="#D2A8FF"> __init__</text><text x="240" y="240" fill="#F0F6FC">(self, gitdir: Path):</text>
      <text x="80" y="280" fill="#F0F6FC">self.gitdir = gitdir</text>
      <text x="80" y="320" fill="#F0F6FC">self.objects = gitdir / </text><text x="420" y="320" fill="#A5D6FF">"objects"</text>

      <text x="40" y="390" fill="#FF7B72">def</text><text x="100" y="390" fill="#D2A8FF"> hash_object</text><text x="290" y="390" fill="#F0F6FC">(self, data: bytes, obj_type=</text><text x="720" y="390" fill="#A5D6FF">"blob"</text><text x="820" y="390" fill="#F0F6FC">) -> str:</text>
      <text x="80" y="430" fill="#8B949E"># Format header: &lt;type&gt; &lt;size&gt;\\0&lt;payload&gt;</text>
      <text x="80" y="470" fill="#F0F6FC">header = </text><text x="220" y="470" fill="#A5D6FF">f"{obj_type} {len(data)}\\0"</text><text x="640" y="470" fill="#F0F6FC">.encode()</text>
      <text x="80" y="510" fill="#F0F6FC">store = header + data</text>
      <text x="80" y="550" fill="#F0F6FC">sha1 = hashlib.sha1(store).hexdigest()</text>

      <text x="80" y="610" fill="#8B949E"># Two-level directory fanout (e.g. .gitlike/objects/4e/8b72...)</text>
      <text x="80" y="650" fill="#F0F6FC">dir_path = self.objects / sha1[:</text><text x="560" y="650" fill="#79C0FF">2</text><text x="580" y="650" fill="#F0F6FC">]</text>
      <text x="80" y="690" fill="#F0F6FC">dir_path.mkdir(parents=</text><text x="440" y="690" fill="#79C0FF">True</text><text x="520" y="690" fill="#F0F6FC">, exist_ok=</text><text x="680" y="690" fill="#79C0FF">True</text><text x="760" y="690" fill="#F0F6FC">)</text>
      <text x="80" y="730" fill="#F0F6FC">file_path = dir_path / sha1[</text><text x="560" y="730" fill="#79C0FF">2</text><text x="580" y="730" fill="#F0F6FC">:]</text>

      <text x="80" y="790" fill="#FF7B72">if not</text><text x="200" y="790" fill="#F0F6FC"> file_path.exists():</text>
      <text x="120" y="830" fill="#8B949E"># Compress payload with zlib deflate</text>
      <text x="120" y="870" fill="#F0F6FC">file_path.write_bytes(zlib.compress(store))</text>

      <text x="80" y="930" fill="#FF7B72">return</text><text x="190" y="930" fill="#F0F6FC"> sha1</text>
    </g>

    <!-- Bottom Embedded Terminal Snippet -->
    <g transform="translate(30, 960)">
      <rect width="1060" height="180" rx="12" fill="#0D1117" stroke="#30363D"/>
      <text x="30" y="45" fill="#7EE787" font-size="22">$ gitlike commit -m "Add zlib blob compression"</text>
      <text x="30" y="85" fill="#F0F6FC" font-size="22">[master 9a4f28c] Add zlib blob compression · 3 files changed, 142 insertions(+)</text>
      <text x="30" y="125" fill="#58A6FF" font-size="22">create mode 100644 src/zlib_engine.py (sha1: 4e8b72d6981a...)</text>
      <text x="30" y="155" fill="#8B949E" font-size="20">0.008s execution time · zlib compression ratio: 76.4%</text>
    </g>
  </g>

  <!-- ==================== RIGHT PANE: OBJECT INSPECTOR ==================== -->
  <g transform="translate(1900, 120)">
    <rect width="620" height="1180" rx="16" fill="url(#paneGrad)" stroke="#30363D" stroke-width="2"/>
    <rect width="620" height="60" rx="16" fill="#21262D"/>
    <text x="30" y="40" fill="#F0F6FC" font-size="24" font-weight="bold">OBJECT INSPECTOR</text>
    <text x="590" y="40" fill="#D29922" font-size="20" text-anchor="end">SHA-1 BLOB</text>

    <!-- Checksum Card -->
    <g transform="translate(30, 90)">
      <rect width="560" height="180" rx="12" fill="#0D1117" stroke="#58A6FF"/>
      <text x="25" y="45" fill="#8B949E" font-size="18">RAW OBJECT DIGEST (SHA-1)</text>
      <text x="25" y="85" fill="#58A6FF" font-size="22" font-weight="bold">4e8b72d6981a3c8e19b7...</text>
      <line x1="25" y1="110" x2="535" y2="110" stroke="#21262D"/>
      <text x="25" y="145" fill="#7EE787" font-size="20">Type: BLOB · Decompressed: 1,420 B</text>
    </g>

    <!-- Directory Fanout Representation -->
    <g transform="translate(30, 300)">
      <text x="0" y="30" fill="#8B949E" font-size="20" font-weight="bold">INTERNAL STORAGE LAYOUT</text>
      <rect x="0" y="50" width="560" height="340" rx="12" fill="#0D1117" stroke="#30363D"/>
      <g transform="translate(25, 40)" font-size="20">
        <text x="0" y="40" fill="#F0F6FC">.gitlike/</text>
        <text x="30" y="80" fill="#8B949E">|--|--|-- HEAD (refs/heads/master)</text>
        <text x="30" y="120" fill="#8B949E">|--|--|-- config (repository settings)</text>
        <text x="30" y="160" fill="#8B949E">|--|--|-- index (binary staging cache)</text>
        <text x="30" y="200" fill="#58A6FF">|--|--|-- objects/</text>
        <text x="60" y="240" fill="#58A6FF">|--   |--|--|-- 4e/8b72d6981a... (blob)</text>
        <text x="60" y="280" fill="#7EE787">|--   |--|--|-- 9a/4f28c11e03... (commit)</text>
        <text x="60" y="320" fill="#D29922">|--   |--|--|-- 3c/8e19b55f1a... (tree)</text>
      </g>
    </g>

    <!-- Telemetry Stats -->
    <g transform="translate(30, 720)">
      <text x="0" y="30" fill="#8B949E" font-size="20" font-weight="bold">PERFORMANCE BENCHMARKS</text>
      <rect x="0" y="50" width="560" height="260" rx="12" fill="#0D1117" stroke="#30363D"/>
      <g transform="translate(25, 40)" font-size="22">
        <text x="0" y="40" fill="#8B949E">Commit Execution:</text>
        <text x="510" y="40" fill="#7EE787" font-weight="bold" text-anchor="end">8.2 ms</text>
        <text x="0" y="90" fill="#8B949E">Tree Traversal Rate:</text>
        <text x="510" y="90" fill="#7EE787" font-weight="bold" text-anchor="end">48,000 files/s</text>
        <text x="0" y="140" fill="#8B949E">Compression Savings:</text>
        <text x="510" y="140" fill="#58A6FF" font-weight="bold" text-anchor="end">76.4% Deflate</text>
        <text x="0" y="190" fill="#8B949E">Memory Footprint:</text>
        <text x="510" y="190" fill="#F0F6FC" font-weight="bold" text-anchor="end">14.6 MB Peak</text>
      </g>
    </g>

    <!-- Git Specification Badge -->
    <g transform="translate(30, 1070)">
      <rect width="560" height="70" rx="12" fill="#1C1E24" stroke="#7EE787"/>
      <text x="280" y="45" fill="#7EE787" font-size="22" font-weight="bold" text-anchor="middle">✓ 100% GIT DATA COMPLIANT</text>
    </g>
  </g>

  <!-- Bottom System Status Strip -->
  <g transform="translate(0, 1370)">
    <rect width="2560" height="70" fill="#161B22" stroke="#30363D" stroke-width="2"/>
    <text x="60" y="45" fill="#8B949E" font-size="22">OMKAR MORE // SYSTEMS &amp; INFRASTRUCTURE</text>
    <text x="1280" y="45" fill="#58A6FF" font-size="22" text-anchor="middle">15+ GIT COMMANDS (init, commit, log, cat-file, branch, checkout, diff)</text>
    <text x="2500" y="45" fill="#7EE787" font-size="22" text-anchor="end">STABLE BUILD · PYTHON 3.11</text>
  </g>
</svg>
`;

// =========================================================================
// 2. ALGOLIZER STUDIO UI (2560 x 1440, exact 16:9)
// =========================================================================
const algolizerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440" style="background:#090A0F;font-family:'DejaVu Sans Mono',monospace;">
  <defs>
    <linearGradient id="algoTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1A1325"/>
      <stop offset="100%" stop-color="#0E0C17"/>
    </linearGradient>
    <linearGradient id="algoCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#15121F"/>
      <stop offset="100%" stop-color="#0D0A14"/>
    </linearGradient>
  </defs>

  <rect width="2560" height="1440" fill="#090A0F"/>

  <!-- Top Console Header -->
  <rect width="2560" height="85" fill="url(#algoTopGrad)" stroke="#2B213A" stroke-width="2"/>
  <circle cx="60" cy="42" r="14" fill="#FF5F56"/>
  <circle cx="105" cy="42" r="14" fill="#FFBD2E"/>
  <circle cx="150" cy="42" r="14" fill="#27C93F"/>

  <text x="210" y="52" fill="#F5F3FF" font-size="30" font-weight="900">ALGOLIZER // REAL-TIME ALGORITHM VISUALIZATION &amp; BENCHMARK STUDIO</text>
  
  <rect x="1800" y="20" width="340" height="46" rx="10" fill="#4C1D95" stroke="#7C3AED"/>
  <text x="1970" y="52" fill="#E9D5FF" font-size="22" font-weight="bold" text-anchor="middle">ENGINE: V8 60 FPS CANVAS</text>
  <text x="2480" y="52" fill="#10B981" font-size="24" font-weight="bold" text-anchor="end">● RUNNING</text>

  <!-- Controls Bar -->
  <g transform="translate(60, 115)">
    <rect width="2440" height="80" rx="14" fill="#120E1D" stroke="#2B213A" stroke-width="2"/>
    <text x="30" y="48" fill="#A78BFA" font-size="24" font-weight="bold">ACTIVE ALGORITHM:</text>

    <!-- Algo Selector Pills -->
    <rect x="280" y="16" width="320" height="48" rx="8" fill="#FF3B00"/>
    <text x="440" y="48" fill="#111111" font-size="22" font-weight="bold" text-anchor="middle">QUICKSORT (O(N log N))</text>

    <rect x="620" y="16" width="320" height="48" rx="8" fill="#1F1A2D" stroke="#3D3256"/>
    <text x="780" y="48" fill="#C4B5FD" font-size="22" font-weight="bold" text-anchor="middle">MERGESORT (O(N log N))</text>

    <rect x="960" y="16" width="300" height="48" rx="8" fill="#1F1A2D" stroke="#3D3256"/>
    <text x="1110" y="48" fill="#C4B5FD" font-size="22" font-weight="bold" text-anchor="middle">HEAPSORT (O(N log N))</text>

    <rect x="1280" y="16" width="300" height="48" rx="8" fill="#1F1A2D" stroke="#3D3256"/>
    <text x="1430" y="48" fill="#C4B5FD" font-size="22" font-weight="bold" text-anchor="middle">RADIX SORT (O(N·K))</text>

    <!-- Speed / Array Sliders -->
    <text x="1750" y="48" fill="#9CA3AF" font-size="22">ARRAY SIZE: <tspan fill="#FFFFFF" font-weight="bold">N = 64</tspan></text>
    <text x="2100" y="48" fill="#9CA3AF" font-size="22">SPEED: <tspan fill="#10B981" font-weight="bold">60 FPS (1x)</tspan></text>
  </g>

  <!-- ==================== MAIN CANVAS: SORTING BARS ==================== -->
  <g transform="translate(60, 225)">
    <rect width="1860" height="860" rx="16" fill="url(#algoCardGrad)" stroke="#2B213A" stroke-width="2"/>
    
    <!-- Top Canvas Telemetry Line -->
    <text x="40" y="55" fill="#A78BFA" font-size="24" font-weight="bold">LIVE EXECUTION TRACE: PARTITION BOUNDS [LOW: 0, HIGH: 63]</text>
    <text x="1820" y="55" fill="#F59E0B" font-size="24" font-weight="bold" text-anchor="end">PIVOT ELEMENT: arr[63] = 420</text>
    <line x1="40" y1="80" x2="1820" y2="80" stroke="#2B213A" stroke-width="1.5"/>

    <!-- 64 Animated Sorting Bars Container -->
    <g transform="translate(40, 110)">
      <!-- Render 64 stylized bars with varying heights -->
      ${Array.from({ length: 64 }, (_, i) => {
        const height = Math.sin((i / 63) * Math.PI) * 580 + (i % 7) * 18 + 50;
        const x = i * 27.5;
        const y = 680 - height;
        let fill = "#4B5563"; // default
        let isPivot = i === 42;
        let isComparing = i === 18 || i === 19;
        let isSorted = i > 48;
        if (isPivot) fill = "#F59E0B";
        else if (isComparing) fill = "#FF3B00";
        else if (isSorted) fill = "#10B981";
        else if (i < 20) fill = "#818CF8";

        return `
          <g transform="translate(${x}, ${y})">
            <rect width="21" height="${height}" rx="3" fill="${fill}" opacity="${isComparing || isPivot ? '1.0' : '0.85'}"/>
            ${isPivot ? `<text x="10" y="-15" fill="#F59E0B" font-size="20" font-weight="bold" text-anchor="middle">👑 PIVOT</text>` : ''}
            ${isComparing ? `<text x="10" y="-15" fill="#FF3B00" font-size="20" font-weight="bold" text-anchor="middle">▼</text>` : ''}
          </g>
        `;
      }).join("\n")}
    </g>

    <!-- Bottom Canvas Scale Legend -->
    <g transform="translate(40, 810)">
      <line x1="0" y1="0" x2="1780" y2="0" stroke="#2B213A" stroke-width="2"/>
      <text x="0" y="32" fill="#8B949E" font-size="20">0 (START)</text>
      <text x="890" y="32" fill="#8B949E" font-size="20" text-anchor="middle">32 (MEDIAN)</text>
      <text x="1780" y="32" fill="#8B949E" font-size="20" text-anchor="end">63 (END)</text>
    </g>
  </g>

  <!-- ==================== RIGHT PANEL: TELEMETRY & HUD ==================== -->
  <g transform="translate(1960, 225)">
    <rect width="540" height="860" rx="16" fill="url(#algoCardGrad)" stroke="#2B213A" stroke-width="2"/>
    <rect width="540" height="60" rx="16" fill="#1B1428"/>
    <text x="30" y="40" fill="#F5F3FF" font-size="24" font-weight="bold">TELEMETRY &amp; METRICS</text>

    <!-- Counters -->
    <g transform="translate(30, 90)">
      <rect width="480" height="110" rx="12" fill="#0E0C17" stroke="#FF3B00"/>
      <text x="25" y="40" fill="#9CA3AF" font-size="18">ELEMENT COMPARISONS</text>
      <text x="25" y="88" fill="#FF3B00" font-size="44" font-weight="900">1,248</text>
      <text x="450" y="88" fill="#8B949E" font-size="20" text-anchor="end">O(N log N)</text>
    </g>

    <g transform="translate(30, 220)">
      <rect width="480" height="110" rx="12" fill="#0E0C17" stroke="#10B981"/>
      <text x="25" y="40" fill="#9CA3AF" font-size="18">ELEMENT SWAPS / WRITES</text>
      <text x="25" y="88" fill="#10B981" font-size="44" font-weight="900">384</text>
      <text x="450" y="88" fill="#8B949E" font-size="20" text-anchor="end">IN-PLACE</text>
    </g>

    <g transform="translate(30, 350)">
      <rect width="480" height="110" rx="12" fill="#0E0C17" stroke="#3B82F6"/>
      <text x="25" y="40" fill="#9CA3AF" font-size="18">RECURSION DEPTH</text>
      <text x="25" y="88" fill="#3B82F6" font-size="44" font-weight="900">6 LEVELS</text>
      <text x="450" y="88" fill="#8B949E" font-size="20" text-anchor="end">log₂(64) = 6</text>
    </g>

    <g transform="translate(30, 480)">
      <rect width="480" height="110" rx="12" fill="#0E0C17" stroke="#F59E0B"/>
      <text x="25" y="40" fill="#9CA3AF" font-size="18">CACHE LOCALITY SCORE</text>
      <text x="25" y="88" fill="#F59E0B" font-size="44" font-weight="900">94.2%</text>
      <text x="450" y="88" fill="#8B949E" font-size="20" text-anchor="end">HIGH HIT RATE</text>
    </g>

    <!-- Complexity Breakdown -->
    <g transform="translate(30, 620)">
      <text x="0" y="30" fill="#8B949E" font-size="20" font-weight="bold">COMPLEXITY GUARANTEES</text>
      <rect x="0" y="50" width="480" height="160" rx="12" fill="#0E0C17" stroke="#2B213A"/>
      <text x="25" y="90" fill="#F5F3FF" font-size="22">Best Case: <tspan fill="#10B981" font-weight="bold">Ω(N log N)</tspan></text>
      <text x="25" y="130" fill="#F5F3FF" font-size="22">Average: <tspan fill="#3B82F6" font-weight="bold">Θ(N log N)</tspan></text>
      <text x="25" y="170" fill="#F5F3FF" font-size="22">Aux Space: <tspan fill="#A78BFA" font-weight="bold">O(log N) stack</tspan></text>
    </g>
  </g>

  <!-- ==================== BOTTOM TERMINAL & BENCHMARK LOG ==================== -->
  <g transform="translate(60, 1115)">
    <rect width="2440" height="240" rx="16" fill="url(#algoCardGrad)" stroke="#2B213A" stroke-width="2"/>
    <rect width="2440" height="50" rx="16" fill="#1B1428"/>
    <text x="30" y="35" fill="#F5F3FF" font-size="22" font-weight="bold">REAL-TIME STEP AUDIT LOG</text>
    
    <g transform="translate(30, 75)" font-size="20">
      <text x="0" y="30" fill="#818CF8">[0.002s] Partition low=0, high=63: Selected median-of-three pivot = 420 (index 42)</text>
      <text x="0" y="65" fill="#10B981">[0.005s] Swapped arr[18] (512) and arr[19] (148) -> Reduced inverted pairs by 1</text>
      <text x="0" y="100" fill="#F59E0B">[0.009s] Sub-array [0..31] sorted successfully. Spawning right branch partition [33..63]</text>
      <text x="0" y="135" fill="#38BDF8">[0.014s] QuickSort partition complete in 1,248 comparisons. Zero memory leaks detected.</text>
    </g>
  </g>

  <!-- Bottom System Status -->
  <g transform="translate(0, 1380)">
    <rect width="2560" height="60" fill="#0C0A14" stroke="#2B213A" stroke-width="1.5"/>
    <text x="60" y="38" fill="#8B949E" font-size="20">ALGOLIZER // BUILT WITH HTML5 CANVAS, JAVASCRIPT &amp; V8 RUNTIME</text>
    <text x="2500" y="38" fill="#A78BFA" font-size="20" text-anchor="end">OMKAR MORE · ALGORITHMS &amp; DATA STRUCTURES</text>
  </g>
</svg>
`;

// =========================================================================
// 3. ALGOLIZER 4-QUADRANT BENCHMARKS (2560 x 1440, exact 16:9)
// =========================================================================
const algolizerAnalyticsSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2560 1440" width="2560" height="1440" style="background:#090A0F;font-family:'DejaVu Sans Mono',monospace;">
  <defs>
    <linearGradient id="anTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1A1325"/>
      <stop offset="100%" stop-color="#0E0C17"/>
    </linearGradient>
    <linearGradient id="anCard" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#161220"/>
      <stop offset="100%" stop-color="#0D0A14"/>
    </linearGradient>
  </defs>

  <rect width="2560" height="1440" fill="#090A0F"/>

  <!-- Top Bar -->
  <rect width="2560" height="85" fill="url(#anTopGrad)" stroke="#2B213A" stroke-width="2"/>
  <circle cx="60" cy="42" r="14" fill="#FF5F56"/>
  <circle cx="105" cy="42" r="14" fill="#FFBD2E"/>
  <circle cx="150" cy="42" r="14" fill="#27C93F"/>
  <text x="210" y="52" fill="#F5F3FF" font-size="30" font-weight="900">ALGOLIZER // 4-QUADRANT COMPARATIVE BENCHMARK MATRIX (N = 100,000)</text>
  <text x="2500" y="52" fill="#10B981" font-size="24" font-weight="bold" text-anchor="end">BENCHMARK COMPLETE</text>

  <!-- 4-Quadrant Grid -->
  <!-- Quadrant 1: QuickSort -->
  <g transform="translate(60, 120)">
    <rect width="1190" height="580" rx="16" fill="url(#anCard)" stroke="#3B82F6" stroke-width="2"/>
    <rect width="1190" height="60" rx="16" fill="#1E1B4B"/>
    <text x="40" y="42" fill="#93C5FD" font-size="28" font-weight="bold">QUADRANT 1: QUICKSORT (IN-PLACE PARTITION)</text>
    <text x="1150" y="42" fill="#60A5FA" font-size="22" font-weight="bold" text-anchor="end">12.4 ms</text>

    <g transform="translate(40, 100)" font-size="22">
      <text x="0" y="30" fill="#8B949E">Time Complexity:</text><text x="400" y="30" fill="#60A5FA" font-weight="bold">O(N log N) avg  |  O(N²) worst</text>
      <text x="0" y="70" fill="#8B949E">Auxiliary Space:</text><text x="400" y="70" fill="#60A5FA" font-weight="bold">O(log N) call stack</text>
      <text x="0" y="110" fill="#8B949E">Cache Performance:</text><text x="400" y="110" fill="#10B981" font-weight="bold">Optimal (Sequential Cache Hits)</text>
      <text x="0" y="150" fill="#8B949E">Stability:</text><text x="400" y="150" fill="#EF4444" font-weight="bold">Unstable</text>

      <!-- Mini Chart -->
      <rect x="0" y="190" width="1110" height="240" rx="12" fill="#0C0A14" stroke="#1E1B4B"/>
      <text x="30" y="230" fill="#93C5FD" font-size="20">EXECUTION TIME ACROSS DATA DISTRIBUTIONS:</text>
      <text x="30" y="270" fill="#F5F3FF" font-size="20">Random Uniform: <tspan fill="#10B981" font-weight="bold">12.4 ms</tspan></text>
      <text x="420" y="270" fill="#F5F3FF" font-size="20">Nearly Sorted: <tspan fill="#10B981" font-weight="bold">8.1 ms</tspan></text>
      <text x="780" y="270" fill="#F5F3FF" font-size="20">Reversed: <tspan fill="#F59E0B" font-weight="bold">15.2 ms</tspan></text>
      <rect x="30" y="300" width="1050" height="20" rx="10" fill="#1E293B"/>
      <rect x="30" y="300" width="750" height="20" rx="10" fill="#3B82F6"/>
    </g>
  </g>

  <!-- Quadrant 2: MergeSort -->
  <g transform="translate(1310, 120)">
    <rect width="1190" height="580" rx="16" fill="url(#anCard)" stroke="#10B981" stroke-width="2"/>
    <rect width="1190" height="60" rx="16" fill="#064E3B"/>
    <text x="40" y="42" fill="#6EE7B7" font-size="28" font-weight="bold">QUADRANT 2: MERGESORT (DIVIDE &amp; CONQUER)</text>
    <text x="1150" y="42" fill="#34D399" font-size="22" font-weight="bold" text-anchor="end">14.8 ms</text>

    <g transform="translate(40, 100)" font-size="22">
      <text x="0" y="30" fill="#8B949E">Time Complexity:</text><text x="400" y="30" fill="#34D399" font-weight="bold">O(N log N) guaranteed</text>
      <text x="0" y="70" fill="#8B949E">Auxiliary Space:</text><text x="400" y="70" fill="#F59E0B" font-weight="bold">O(N) memory allocation</text>
      <text x="0" y="110" fill="#8B949E">Cache Performance:</text><text x="400" y="110" fill="#F59E0B" font-weight="bold">Moderate (Buffer Copies)</text>
      <text x="0" y="150" fill="#8B949E">Stability:</text><text x="400" y="150" fill="#10B981" font-weight="bold">Stable (Preserves original order)</text>

      <rect x="0" y="190" width="1110" height="240" rx="12" fill="#0C0A14" stroke="#064E3B"/>
      <text x="30" y="230" fill="#6EE7B7" font-size="20">EXECUTION TIME ACROSS DATA DISTRIBUTIONS:</text>
      <text x="30" y="270" fill="#F5F3FF" font-size="20">Random Uniform: <tspan fill="#10B981" font-weight="bold">14.8 ms</tspan></text>
      <text x="420" y="270" fill="#F5F3FF" font-size="20">Nearly Sorted: <tspan fill="#10B981" font-weight="bold">11.2 ms</tspan></text>
      <text x="780" y="270" fill="#F5F3FF" font-size="20">Reversed: <tspan fill="#10B981" font-weight="bold">13.6 ms</tspan></text>
      <rect x="30" y="300" width="1050" height="20" rx="10" fill="#1E293B"/>
      <rect x="30" y="300" width="820" height="20" rx="10" fill="#10B981"/>
    </g>
  </g>

  <!-- Quadrant 3: HeapSort -->
  <g transform="translate(60, 740)">
    <rect width="1190" height="580" rx="16" fill="url(#anCard)" stroke="#F59E0B" stroke-width="2"/>
    <rect width="1190" height="60" rx="16" fill="#78350F"/>
    <text x="40" y="42" fill="#FDE68A" font-size="28" font-weight="bold">QUADRANT 3: HEAPSORT (BINARY MAX HEAP)</text>
    <text x="1150" y="42" fill="#FBBF24" font-size="22" font-weight="bold" text-anchor="end">18.6 ms</text>

    <g transform="translate(40, 100)" font-size="22">
      <text x="0" y="30" fill="#8B949E">Time Complexity:</text><text x="400" y="30" fill="#FBBF24" font-weight="bold">O(N log N) guaranteed</text>
      <text x="0" y="70" fill="#8B949E">Auxiliary Space:</text><text x="400" y="70" fill="#10B981" font-weight="bold">O(1) strictly in-place</text>
      <text x="0" y="110" fill="#8B949E">Cache Performance:</text><text x="400" y="110" fill="#EF4444" font-weight="bold">Poor (Tree node index jumps)</text>
      <text x="0" y="150" fill="#8B949E">Stability:</text><text x="400" y="150" fill="#EF4444" font-weight="bold">Unstable</text>

      <rect x="0" y="190" width="1110" height="240" rx="12" fill="#0C0A14" stroke="#78350F"/>
      <text x="30" y="230" fill="#FDE68A" font-size="20">EXECUTION TIME ACROSS DATA DISTRIBUTIONS:</text>
      <text x="30" y="270" fill="#F5F3FF" font-size="20">Random Uniform: <tspan fill="#FBBF24" font-weight="bold">18.6 ms</tspan></text>
      <text x="420" y="270" fill="#F5F3FF" font-size="20">Nearly Sorted: <tspan fill="#FBBF24" font-weight="bold">17.4 ms</tspan></text>
      <text x="780" y="270" fill="#F5F3FF" font-size="20">Reversed: <tspan fill="#FBBF24" font-weight="bold">16.8 ms</tspan></text>
      <rect x="30" y="300" width="1050" height="20" rx="10" fill="#1E293B"/>
      <rect x="30" y="300" width="940" height="20" rx="10" fill="#F59E0B"/>
    </g>
  </g>

  <!-- Quadrant 4: RadixSort -->
  <g transform="translate(1310, 740)">
    <rect width="1190" height="580" rx="16" fill="url(#anCard)" stroke="#A855F7" stroke-width="2"/>
    <rect width="1190" height="60" rx="16" fill="#581C87"/>
    <text x="40" y="42" fill="#E9D5FF" font-size="28" font-weight="bold">QUADRANT 4: RADIX SORT (NON-COMPARATIVE)</text>
    <text x="1150" y="42" fill="#C084FC" font-size="22" font-weight="bold" text-anchor="end">6.2 ms (FASTEST)</text>

    <g transform="translate(40, 100)" font-size="22">
      <text x="0" y="30" fill="#8B949E">Time Complexity:</text><text x="400" y="30" fill="#C084FC" font-weight="bold">O(N · K) linear integer time</text>
      <text x="0" y="70" fill="#8B949E">Auxiliary Space:</text><text x="400" y="70" fill="#F59E0B" font-weight="bold">O(N + K) bucket queues</text>
      <text x="0" y="110" fill="#8B949E">Cache Performance:</text><text x="400" y="110" fill="#10B981" font-weight="bold">Very High (Linear scanning)</text>
      <text x="0" y="150" fill="#8B949E">Stability:</text><text x="400" y="150" fill="#10B981" font-weight="bold">Stable</text>

      <rect x="0" y="190" width="1110" height="240" rx="12" fill="#0C0A14" stroke="#581C87"/>
      <text x="30" y="230" fill="#E9D5FF" font-size="20">EXECUTION TIME ACROSS DATA DISTRIBUTIONS:</text>
      <text x="30" y="270" fill="#F5F3FF" font-size="20">Random Uniform: <tspan fill="#10B981" font-weight="bold">6.2 ms</tspan></text>
      <text x="420" y="270" fill="#F5F3FF" font-size="20">Nearly Sorted: <tspan fill="#10B981" font-weight="bold">6.1 ms</tspan></text>
      <text x="780" y="270" fill="#F5F3FF" font-size="20">Reversed: <tspan fill="#10B981" font-weight="bold">6.3 ms</tspan></text>
      <rect x="30" y="300" width="1050" height="20" rx="10" fill="#1E293B"/>
      <rect x="30" y="300" width="380" height="20" rx="10" fill="#A855F7"/>
    </g>
  </g>

  <!-- Bottom Strip -->
  <g transform="translate(0, 1370)">
    <rect width="2560" height="70" fill="#0E0C17" stroke="#2B213A" stroke-width="2"/>
    <text x="60" y="45" fill="#8B949E" font-size="22">BENCHMARK RUNTIME: INTEL CORE i7 · 100k 32-BIT INTEGER KEYS · UNBIASED SEED</text>
    <text x="2500" y="45" fill="#10B981" font-size="22" text-anchor="end">ALGOLIZER BENCHMARK SUITE · OMKAR MORE</text>
  </g>
</svg>
`;

// Render Desktop Screens
console.log("Rendering 2560x1440 desktop screens...");
renderSvgToJpg(gitlikeSvg, path.join(IMAGES_DIR, "gitlike.jpg"), 2560, 1440);
renderSvgToJpg(gitlikeSvg, path.join(IMAGES_DIR, "gitlike-workbench.jpg"), 2560, 1440);
renderSvgToJpg(algolizerSvg, path.join(IMAGES_DIR, "algolizer.jpg"), 2560, 1440);
renderSvgToJpg(algolizerAnalyticsSvg, path.join(IMAGES_DIR, "algolizer-analytics.jpg"), 2560, 1440);

console.log("Desktop screens generation complete!");
