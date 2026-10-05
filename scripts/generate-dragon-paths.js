const fs = require('fs');

// 48 Control points defining the continuous long wavy dragon spine from Hero to Footer
const spinePoints = [
  { x: 840, y: 240, w: 75 },   // 0. Neck origin behind head in Hero
  { x: 660, y: 220, w: 75 },   // 1.
  { x: 420, y: 340, w: 80 },   // 2. Loop behind OMKAR MORE
  { x: 300, y: 520, w: 82 },   // 3. Valley left in Hero
  { x: 340, y: 720, w: 82 },   // 4.
  { x: 480, y: 920, w: 80 },   // 5. Exiting Hero into Editorial
  { x: 720, y: 1120, w: 78 },  // 6. Sweeping across Editorial
  { x: 1020, y: 1320, w: 76 }, // 7.
  { x: 1140, y: 1480, w: 76 }, // 8. Crest right in Editorial (Claw 1)
  { x: 960, y: 1680, w: 75 },  // 9. Sweeping back left into Selected Work
  { x: 620, y: 1880, w: 75 },  // 10.
  { x: 360, y: 2060, w: 76 },  // 11. Valley left in GitLike (Claw 2)
  { x: 260, y: 2240, w: 76 },  // 12.
  { x: 380, y: 2440, w: 75 },  // 13. Sweeping across under GitLike
  { x: 720, y: 2660, w: 75 },  // 14.
  { x: 1080, y: 2880, w: 74 }, // 15. Sweeping right in RayTracer
  { x: 1180, y: 3040, w: 74 }, // 16. Crest right in RayTracer
  { x: 980, y: 3260, w: 72 },  // 17. Sweeping back left in Chatty
  { x: 640, y: 3480, w: 72 },  // 18.
  { x: 360, y: 3700, w: 72 },  // 19. Valley left in IEEE / IG (Claw 3)
  { x: 320, y: 3880, w: 70 },  // 20.
  { x: 540, y: 4100, w: 70 },  // 21. Sweeping into Experience
  { x: 880, y: 4320, w: 68 },  // 22.
  { x: 1160, y: 4520, w: 68 }, // 23. Crest right in Experience (Claw 4)
  { x: 1120, y: 4740, w: 66 }, // 24.
  { x: 820, y: 5000, w: 66 },  // 25. Sweeping back across Experience
  { x: 500, y: 5260, w: 65 },  // 26.
  { x: 340, y: 5480, w: 65 },  // 27. Valley left in Problem Solving
  { x: 420, y: 5700, w: 64 },  // 28.
  { x: 760, y: 5940, w: 64 },  // 29. Sweeping across Problem Solving
  { x: 1080, y: 6180, w: 62 }, // 30. Crest right in Problem Solving
  { x: 1140, y: 6360, w: 62 }, // 31.
  { x: 880, y: 6620, w: 60 },  // 32. Sweeping back into Stack
  { x: 540, y: 6860, w: 58 },  // 33.
  { x: 360, y: 7080, w: 56 },  // 34. Valley left in Stack
  { x: 440, y: 7300, w: 54 },  // 35.
  { x: 780, y: 7540, w: 52 },  // 36. Sweeping across into About
  { x: 1080, y: 7760, w: 50 }, // 37. Crest right in About
  { x: 1120, y: 7960, w: 48 }, // 38.
  { x: 860, y: 8220, w: 45 },  // 39. Sweeping back across About
  { x: 520, y: 8460, w: 42 },  // 40.
  { x: 380, y: 8680, w: 38 },  // 41. Valley left in Contact transition
  { x: 540, y: 8900, w: 34 },  // 42. Coiling tail loop in Contact
  { x: 860, y: 9100, w: 28 },  // 43.
  { x: 1040, y: 9280, w: 22 }, // 44. Tail flick right
  { x: 880, y: 9420, w: 16 },  // 45. Sweeping down-left into footer
  { x: 620, y: 9540, w: 10 },  // 46.
  { x: 460, y: 9600, w: 4 }    // 47. Final tail tip brushstroke
];

// Catmull-Rom spline converter
function catmullRomToBezier(pts) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i === 0 ? pts[0] : pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i + 2 < pts.length ? pts[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

// Resample spline into fine-grained equidistant steps along curve
function sampleSpline(pts, stepCount = 500) {
  const samples = [];
  // For each segment between p1 and p2:
  const segCount = pts.length - 1;
  const samplesPerSeg = Math.floor(stepCount / segCount);

  for (let i = 0; i < segCount; i++) {
    const p0 = i === 0 ? pts[0] : pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i + 2 < pts.length ? pts[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    for (let s = 0; s < samplesPerSeg; s++) {
      const t = s / samplesPerSeg;
      const t2 = t * t;
      const t3 = t2 * t;
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;

      const x = mt3 * p1.x + 3 * mt2 * t * cp1x + 3 * mt * t2 * cp2x + t3 * p2.x;
      const y = mt3 * p1.y + 3 * mt2 * t * cp1y + 3 * mt * t2 * cp2y + t3 * p2.y;

      // Tangent
      const dx = 3 * mt2 * (cp1x - p1.x) + 6 * mt * t * (cp2x - cp1x) + 3 * t2 * (p2.x - cp2x);
      const dy = 3 * mt2 * (cp1y - p1.y) + 6 * mt * t * (cp2y - cp1y) + 3 * t2 * (p2.y - cp2y);
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;

      const w = p1.w * (1 - t) + p2.w * t;

      samples.push({ x, y, nx, ny, dx: dx / len, dy: dy / len, w });
    }
  }
  // Add last point
  const last = pts[pts.length - 1];
  samples.push({ x: last.x, y: last.y, nx: 0, ny: 0, dx: 0, dy: 1, w: last.w });
  return samples;
}

const samples = sampleSpline(spinePoints, 600);

// Generate belly line (offset by w * 0.35)
const bellyPts = samples.map(s => ({
  x: Math.round(s.x + s.nx * s.w * 0.38),
  y: Math.round(s.y + s.ny * s.w * 0.38)
}));

// Generate back line (offset by -w * 0.38)
const backPts = samples.map(s => ({
  x: Math.round(s.x - s.nx * s.w * 0.38),
  y: Math.round(s.y - s.ny * s.w * 0.38)
}));

// Generate closed body outline polygon path
let bodyOutlineD = `M ${bellyPts[0].x} ${bellyPts[0].y}`;
for (let i = 1; i < bellyPts.length; i += 2) {
  bodyOutlineD += ` L ${bellyPts[i].x} ${bellyPts[i].y}`;
}
for (let i = backPts.length - 1; i >= 0; i -= 2) {
  bodyOutlineD += ` L ${backPts[i].x} ${backPts[i].y}`;
}
bodyOutlineD += ' Z';

// Generate transverse belly plate ribs (every 8th sample)
let bellyRibsD = '';
for (let i = 0; i < samples.length - 20; i += 7) {
  const s = samples[i];
  const bx = Math.round(s.x + s.nx * s.w * 0.38);
  const by = Math.round(s.y + s.ny * s.w * 0.38);
  const cx = Math.round(s.x + s.nx * s.w * 0.05);
  const cy = Math.round(s.y + s.ny * s.w * 0.05);
  bellyRibsD += `M ${bx} ${by} L ${cx} ${cy} `;
}

// Generate dorsal flame spines (sharp triangular fins along the back side)
let dorsalSpinesD = '';
for (let i = 5; i < samples.length - 35; i += 5) {
  const s = samples[i];
  // Base point on spine
  const b1x = Math.round(s.x - s.nx * s.w * 0.35);
  const b1y = Math.round(s.y - s.ny * s.w * 0.35);

  const nextS = samples[i + 2] || s;
  const b2x = Math.round(nextS.x - nextS.nx * nextS.w * 0.35);
  const b2y = Math.round(nextS.y - nextS.ny * nextS.w * 0.35);

  // Tip of spine (protruding outwards and slightly back against motion)
  const spineHeight = Math.min(32, s.w * 0.45);
  const tipX = Math.round(s.x - s.nx * (s.w * 0.35 + spineHeight) - s.dx * 8);
  const tipY = Math.round(s.y - s.ny * (s.w * 0.35 + spineHeight) - s.dy * 8);

  dorsalSpinesD += `M ${b1x} ${b1y} Q ${tipX} ${tipY}, ${b2x} ${b2y} `;
}

// Generate continuous spine line
const mainSpineD = catmullRomToBezier(spinePoints);

// Generate tail flames at bottom (y > 8800)
const tailFlames = [
  "M 1040 9280 C 1140 9320, 1260 9340, 1340 9300 S 1420 9220, 1460 9180",
  "M 980 9330 C 1080 9390, 1200 9420, 1280 9390 S 1380 9310, 1420 9260",
  "M 880 9420 C 960 9490, 1080 9540, 1180 9520 S 1280 9450, 1340 9400",
  "M 760 9490 C 840 9560, 940 9620, 1060 9620 S 1180 9580, 1240 9520",
  "M 620 9540 C 680 9600, 780 9640, 890 9640 S 1010 9620, 1090 9580",
  "M 460 9600 C 520 9640, 620 9670, 730 9660 S 860 9630, 950 9590"
];

// Claws data along the body
const claws = [
  {
    name: "Claw 1 (Editorial)",
    x: 1160,
    y: 1450,
    angle: 25,
    path: "M 0 0 C 35 -15, 75 -10, 110 15 S 145 60, 160 95 M 85 5 C 105 15, 135 15, 165 -5 M 100 25 C 125 40, 155 45, 180 30 M 110 50 C 135 70, 165 80, 190 70 M 70 45 C 80 75, 105 105, 130 120"
  },
  {
    name: "Claw 2 (Selected Work GitLike)",
    x: 240,
    y: 2200,
    angle: -145,
    path: "M 0 0 C 35 -15, 75 -10, 110 15 S 145 60, 160 95 M 85 5 C 105 15, 135 15, 165 -5 M 100 25 C 125 40, 155 45, 180 30 M 110 50 C 135 70, 165 80, 190 70 M 70 45 C 80 75, 105 105, 130 120"
  },
  {
    name: "Claw 3 (Selected Work IEEE/IG)",
    x: 320,
    y: 3750,
    angle: -135,
    path: "M 0 0 C 35 -15, 75 -10, 110 15 S 145 60, 160 95 M 85 5 C 105 15, 135 15, 165 -5 M 100 25 C 125 40, 155 45, 180 30 M 110 50 C 135 70, 165 80, 190 70 M 70 45 C 80 75, 105 105, 130 120"
  },
  {
    name: "Claw 4 (Experience Timeline)",
    x: 1180,
    y: 4500,
    angle: 30,
    path: "M 0 0 C 35 -15, 75 -10, 110 15 S 145 60, 160 95 M 85 5 C 105 15, 135 15, 165 -5 M 100 25 C 125 40, 155 45, 180 30 M 110 50 C 135 70, 165 80, 190 70 M 70 45 C 80 75, 105 105, 130 120"
  }
];

const dragonData = {
  mainSpineD,
  bodyOutlineD,
  bellyRibsD,
  dorsalSpinesD,
  tailFlames,
  claws
};

fs.writeFileSync('src/data/dragonSpineData.json', JSON.stringify(dragonData, null, 2));
console.log('Successfully generated dragonSpineData.json');
