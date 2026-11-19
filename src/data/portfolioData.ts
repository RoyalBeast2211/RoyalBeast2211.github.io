export type ProjectCategory = "ALL" | "WEB" | "MOBILE" | "CLI" | "SYSTEMS" | "EXPERIMENTS";

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  tech: string[];
  techString: string;
  description: string;
  year: string;
  type: string;
  stackDetail: string;
  image?: string;
  images?: string[];
  captions?: string[];
  terminalCommand: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  featuredOrder?: number;
  featuredNumber?: string;
  category: "WEB" | "MOBILE" | "CLI" | "SYSTEMS" | "EXPERIMENTS";
  frameType?: "phone" | "terminal" | "browser";
  userCount?: string;
  status?: string;
}

export interface ExperienceItem {
  year: string;
  period: string;
  company: string;
  division: string;
  role: string;
  location: string;
  status: string;
  description: string;
  achievements: string[];
  tags: string[];
  command: string;
}

export interface LeadershipRole {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  progression: string[];
  progressionNote?: string;
  bullets: string[];
  isCurrent?: boolean;
}

export interface EducationData {
  institution: string;
  degree: string;
  period: string;
  cgpa: string;
  coursework: string[];
}

export interface RatingPlatform {
  platform: string;
  badge: string;
  rating: string;
  tier: string;
  handle: string;
  url: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  tag: string;
}

export interface AchievementItem {
  title: string;
  metric: string;
  detail: string;
  tag?: string;
  link?: string;
  linkText?: string;
}

export const PERSONAL_INFO = {
  name: "Omkar More",
  email: "theomkarmore@gmail.com",
  phone: "+91 9370832495",
  github: "https://github.com/RoyalBeast2211",
  githubUser: "RoyalBeast2211",
  linkedin: "https://www.linkedin.com/in/theomkarmore/",
  linkedinUser: "theomkarmore",
  leetcode: "https://leetcode.com/u/theomkarmore/",
  codechef: "https://www.codechef.com/users/theomkarmore",
  codolio: "https://codolio.com/profile/theomkarmore",
  resumePdf: "/Omkar_More_Resume.pdf",
};

export const EDUCATION: EducationData = {
  institution: "Visvesvaraya National Institute of Technology, Nagpur",
  degree: "Bachelor of Technology",
  period: "Aug 2023 – May 2027",
  cgpa: "8.25/10",
  coursework: [
    "Computer Programming",
    "Discrete Mathematics",
    "Data Structures",
    "Algorithms",
    "Material Data Science and Programming",
    "Object Oriented Programming",
    "Database Management System",
    "Operating System",
    "Computer Networks",
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "miniredis",
    number: "PROJECT_01",
    featuredNumber: "01",
    featured: true,
    featuredOrder: 1,
    category: "SYSTEMS",
    frameType: "terminal",
    status: "Production Ready",
    title: "MINIREDIS",
    subtitle: "DISTRIBUTED IN-MEMORY DATABASE",
    tagline: "High-throughput Redis-compatible in-memory store in Go with RESP wire parser, hybrid AOF/RDB durability & PSYNC replication",
    tech: ["Go", "TCP Sockets", "RESP Wire Protocol", "Append-Only File (AOF)", "RDB Snapshots", "PSYNC Replication", "LRU Eviction", "sync.RWMutex"],
    techString: "GO · TCP SOCKETS · RESP · AOF/RDB · PSYNC REPLICATION",
    description:
      "A high-throughput, Redis-compatible in-memory key-value database engineered from scratch in pure Go standard library. Features custom zero-dependency RESP wire protocol serialization, concurrent lock-striped storage with O(1) LRU eviction, hybrid durability via fsync-configurable Append-Only File (AOF) with online background compaction (BGREWRITEAOF), point-in-time binary RDB snapshots with CRC32 integrity validation, and primary-replica PSYNC replication with circular ring-buffer offset catch-up.",
    year: "2026",
    type: "Systems & Distributed DB",
    stackDetail: "GO / NETWORKING / PERSISTENCE / REPLICATION",
    terminalCommand: "$ go run . -port 6379 --aof=everysec",
    highlights: [
      "Zero-dependency RESP protocol with zero-alloc parsing benchmarked at 697,771 req/s (GET) and 682,785 req/s (SET).",
      "16-way lock-striped concurrent store achieving 34.7M ops/s parallel GET throughput and 32µs p50 queueing latency.",
      "Dual durability: non-blocking AOF with live BGREWRITEAOF compaction + atomic binary RDB snapshots with CRC32 integrity.",
      "Primary-replica PSYNC replication with 1MB circular backlog ring buffer and 7.22M sustained ops at 0% error rate.",
    ],
    metrics: [
      { label: "PEAK READ", value: "697,771 REQ/S" },
      { label: "PEAK WRITE", value: "682,785 REQ/S" },
      { label: "PARALLEL STORE", value: "34.7M OPS/SEC" },
      { label: "SUSTAINED RUN", value: "7.22M OPS (0 ERR)" },
    ],
    githubUrl: "https://github.com/RoyalBeast2211/miniredis",
    liveUrl: "https://github.com/RoyalBeast2211/miniredis",
  },
  {
    id: "agentic-code-migrator",
    number: "PROJECT_02",
    featuredNumber: "02",
    featured: true,
    featuredOrder: 2,
    category: "SYSTEMS",
    frameType: "terminal",
    status: "Production Ready",
    title: "AGENTIC CODE MIGRATOR",
    subtitle: "AUTONOMOUS CODEBASE MIGRATION // MULTI-AGENT & FORMAL VERIFICATION",
    tagline: "Deterministic AST decomposition, LangGraph agent orchestration & Docker differential sandbox verification",
    tech: ["Python", "LangGraph", "Docker", "LibCST", "Tree-Sitter", "MCP", "Differential Testing", "Groq / LLMs"],
    techString: "PYTHON · LANGGRAPH · DOCKER · LIBCST · MCP · GROQ",
    description:
      "A production-grade autonomous codebase migration and verification system migrating legacy enterprise repositories (Python 2 → Python 3 and Python → Java). Unlike naive LLM transpilations that only check compile errors, ACM enforces behavioral equivalence: it uses static analysis (LibCST & tree-sitter) to decompose codebases into topological call-graph fragments, orchestrates a LangGraph deterministic state machine with tiered LLM agents (Analyzer, Translator, Test-Gen, Repair), executes both legacy and migrated targets side-by-side in isolated Docker sandboxes with coverage-guided differential testing, and routes all agent actions through Model Context Protocol (MCP) servers.",
    year: "2026",
    type: "Multi-Agent Systems & Verification",
    stackDetail: "PYTHON / LANGGRAPH / DOCKER / LIBCST / MCP",
    terminalCommand: "$ python -m layer1 --layer2 agents --scope core_migration",
    highlights: [
      "Layer 0: LibCST & tree-sitter AST analysis verified across 13/13 static analysis tools on sample repos.",
      "Layer 1: Deterministic LangGraph state machine with 30/30 scenario checks passed, bounded retries (≤ 3) & HITL gates.",
      "Layer 2: Tiered multi-agent swarm (Translator, Test-Gen, Repair) on Groq open-weight models with 3 MCP servers.",
      "Dual Docker Sandbox: Side-by-side execution on identical inputs enforcing 100% byte-level behavioral parity (0B diff).",
    ],
    metrics: [
      { label: "PARITY", value: "100% BEHAVIORAL" },
      { label: "STATIC SUITE", value: "13/13 TOOLS VERIFIED" },
      { label: "STATE CHECKS", value: "30/30 SCENARIOS" },
      { label: "TOOL PROTOCOL", value: "3 MCP SERVERS" },
    ],
    githubUrl: "https://github.com/RoyalBeast2211/Agentic-Code-Migrator",
    liveUrl: "https://github.com/RoyalBeast2211/Agentic-Code-Migrator",
  },
  {
    id: "ig-app",
    number: "PROJECT_03",
    featured: false,
    category: "MOBILE",
    frameType: "phone",
    userCount: "4,000+",
    status: "Live / Active",
    title: "IG APP",
    subtitle: "SOCIAL APPLICATION",
    tagline: "Live departmental leaderboard & festival management mobile app for VNIT",
    tech: ["Flutter", "Dart", "Supabase", "GoRouter", "State Management", "Vercel"],
    techString: "FLUTTER · DART · SUPABASE · VERCEL",
    description:
      "Cross-platform mobile social application engineered for VNIT's flagship annual cultural and sports festival: Institute Gathering (IG). Features real-time departmental leaderboard scores powered by Supabase, live competition results, and interactive schedules.",
    year: "2024",
    type: "Mobile Application",
    stackDetail: "FLUTTER / DART / SUPABASE",
    image: "/images/ig-app.jpg",
    images: [
      "/images/ig-app/screen_03_home.jpg",
      "/images/ig-app/screen_01_leaderboard.jpg",
      "/images/ig-app/screen_02_schedule.jpg",
      "/images/ig-app/screen_04_badges.jpg",
      "/images/ig-app/screen_05_scores.jpg",
    ],
    captions: [
      "LIVE DASHBOARD & REALTIME SCORES",
      "DEPARTMENTAL LEADERBOARD",
      "EVENT SCHEDULE & TIMELINE",
      "USER PROFILE & BADGE SYSTEM",
      "TOURNAMENT RESULTS ENGINE",
    ],
    terminalCommand: "$ flutter run -d ig-app-vnit",
    highlights: [
      "Built real-time departmental leaderboard with live score synchronization via Supabase backend.",
      "Served 4,000+ active university users during peak tournament events with zero dropped connections.",
      "Implemented dynamic event schedules, department point breakdowns, and competition result tracking.",
      "Deployed cross-platform web demonstration on Vercel with smooth GoRouter navigation.",
    ],
    metrics: [
      { label: "REAL USERS", value: "4,000+" },
      { label: "BACKEND", value: "SUPABASE REALTIME" },
      { label: "STATUS", value: "LIVE / ACTIVE" },
    ],
    githubUrl: "https://github.com/RoyalBeast2211/IG_app",
    liveUrl: "https://ig-app-five.vercel.app",
  },
  {
    id: "gitlike",
    number: "PROJECT_04",
    featured: false,
    category: "CLI",
    frameType: "terminal",
    status: "Production Ready",
    title: "GITLIKE",
    subtitle: "VERSION CONTROL // CLI / SYSTEMS",
    tagline: "Content-addressable storage & custom VCS architecture from scratch",
    tech: ["Python", "Argparse", "Zlib", "SHA-1 hashing", "CLI"],
    techString: "PYTHON · ARGPARSE · ZLIB · SHA-1",
    description:
      "A command-line version control system developed from scratch in Python, implementing core repository management, staging, committing, branching, and low-level object storage.",
    year: "2024",
    type: "Systems CLI",
    stackDetail: "PYTHON / SYSTEMS / CRYPTO",
    image: "/images/gitlike.jpg",
    images: ["/images/gitlike.jpg", "/images/gitlike-workbench.jpg"],
    captions: [
      "DAG COMMIT GRAPH & OBJECT INSPECTOR",
      "DEVELOPER WORKBENCH & BRANCH MONITOR",
    ],
    terminalCommand: "$ gitlike init && gitlike commit -m 'initial tree'",
    highlights: [
      "Developed a command-line VCS implementing repository, staging, committing, branching from scratch.",
      "Added .gitignore parsing, reference management, and a staging index compatible with Git config formats.",
      "Engineered a SHA-1 object database with zlib compression and implemented 15+ Git commands (init, commit, log, cat-file, etc.) replicating Git's core workflows and data structures.",
    ],
    metrics: [
      { label: "COMMANDS", value: "15+ GIT TOOLS" },
      { label: "STORAGE", value: "ZLIB BLOBS" },
      { label: "PARADIGM", value: "SHA-1 DIRECT" },
    ],
    githubUrl: "https://github.com/RoyalBeast2211/GitLike",
    liveUrl: "https://github.com/RoyalBeast2211/GitLike",
  },
  {
    id: "raytracer",
    number: "PROJECT_05",
    featured: false,
    category: "SYSTEMS",
    frameType: "browser",
    status: "Completed",
    title: "RAYTRACER",
    subtitle: "RAY TRACING ENGINE",
    tagline: "First-principles physics-based rendering & optics engine in C++",
    tech: ["C++", "Object-Oriented Design", "Computer Graphics", "Optics"],
    techString: "C++ · OBJECT-ORIENTED DESIGN · GRAPHICS",
    description:
      "A software ray tracer developed from first principles in C++, simulating optical transport with recursive reflection, refraction, shadows, and Lambertian shading.",
    year: "2024",
    type: "Graphics & Systems",
    stackDetail: "C++ / OOP / GRAPHICS",
    image: "/images/raytracer.jpg",
    images: ["/images/raytracer.jpg", "/images/raytracer-spec.jpg"],
    captions: [
      "FIRST-PRINCIPLES C++ RAY TRACER PHOTOREALISTIC RENDER",
      "RECURSIVE OPTICS SPEC & BVH TRAVERSAL ARCHITECTURE",
    ],
    terminalCommand: "$ g++ -O3 raytracer.cpp && ./a.out --render",
    highlights: [
      "Created raytracer rendering spheres with recursive reflection, refraction, shadows, and Lambertian shading.",
      "Implemented ray-sphere intersection, Fresnel effect blending, and bias correction to avoid self-intersection.",
      "Built Vec3 class for 3D vector and color math supporting normalization, dot products, and component operations.",
    ],
    metrics: [
      { label: "OPTICS", value: "FRESNEL & SNELL" },
      { label: "MATH", value: "CUSTOM VEC3" },
      { label: "SHADING", value: "LAMBERTIAN" },
    ],
    githubUrl: "https://github.com/RoyalBeast2211/Raytracer",
    liveUrl: "#raytracer-spec",
  },
  {
    id: "chatty",
    number: "PROJECT_06",
    featured: false,
    category: "WEB",
    frameType: "browser",
    status: "Live Deployed",
    title: "CHATTY",
    subtitle: "REAL TIME CHAT APPLICATION",
    tagline: "Full-stack real-time messaging platform deployed on Render",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Cloudinary", "Render"],
    techString: "MERN · SOCKET.IO · RENDER · CLOUDINARY",
    description:
      "A full-stack chat application engineered with WebSockets enabling real-time bi-directional messaging between concurrent users, backed by 15+ REST endpoints and cloud asset pipelines.",
    year: "2025",
    type: "Full Stack Web",
    stackDetail: "MERN / SOCKET.IO / RENDER",
    image: "/images/chatty.jpg",
    terminalCommand: "$ cd /projects/chatty && npm run dev",
    highlights: [
      "Built a full-stack chat app with WebSockets enabling real-time messaging between concurrent users.",
      "Deployed on Render with 15+ REST APIs and Cloudinary integration for image uploads.",
      "Engineered real-time channels, presence detection, and persistent chat message histories.",
    ],
    metrics: [
      { label: "ENDPOINTS", value: "15+ REST APIs" },
      { label: "MEDIA", value: "CLOUDINARY" },
      { label: "DEPLOY", value: "RENDER LIVE" },
    ],
    githubUrl: "https://github.com/RoyalBeast2211/Chatty-Real-Time-Chat-Application",
    liveUrl: "https://chatapp-fdps.onrender.com/",
  },
  {
    id: "vnit-directory",
    number: "PROJECT_07",
    featured: false,
    category: "MOBILE",
    frameType: "phone",
    userCount: "5,000+",
    status: "Production Ready",
    title: "TELEDIR",
    subtitle: "VNIT PHONE DIRECTORY",
    tagline: "Campus telephone directory mobile app serving 5000+ students and faculty",
    tech: ["Flutter", "Dart", "Local Storage", "JSON Parsing"],
    techString: "FLUTTER · DART · OFFLINE CACHE",
    description:
      "Cross-platform telephone directory mobile application integrating 4,000+ department and faculty contacts with instant search and filtering, deployed across VNIT Nagpur.",
    year: "2024",
    type: "Mobile Application",
    stackDetail: "FLUTTER / DART / OFFLINE DB",
    image: "/images/teledir/screen_01_search.jpg",
    images: [
      "/images/teledir/screen_01_search.jpg",
      "/images/teledir/screen_02_faculty.jpg",
      "/images/teledir/screen_03_departments.jpg",
    ],
    captions: [
      "CAMPUS FACULTY SEARCH & EXTENSION LOOKUP",
      "FACULTY PROFILE DOSSIER & CALL ACTIONS",
      "ACADEMIC DEPARTMENTS DIRECTORY",
    ],
    terminalCommand: "$ flutter run -d campus-vnit-mobile",
    highlights: [
      "Created Telephone directory mobile app, integrating 4000+ department and faculty contacts with advanced search and filter features, benefiting 5000+ students and faculty.",
      "Improved lookup efficiency by 100% across institutional departments.",
      "Enabled offline access by parsing and transforming large JSON datasets into lightweight local storage.",
    ],
    metrics: [
      { label: "CONTACTS", value: "4,000+ LISTED" },
      { label: "USER BASE", value: "5,000+ USERS" },
      { label: "LOOKUP EFF.", value: "+100% BOOST" },
    ],
    githubUrl: "https://github.com/RoyalBeast2211/Vnit_telephone_directory/tree/master/telephone_directory",
    liveUrl: "#vnit-directory",
  },
  {
    id: "ieee-conference",
    number: "PROJECT_08",
    featured: false,
    category: "WEB",
    frameType: "browser",
    status: "Live Deployed",
    title: "IEEE SEFET 2026",
    subtitle: "CONFERENCE WEB PLATFORM",
    tagline: "Official web platform for 6th IEEE International Conference on Sustainable Energy",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "PDF Embeds", "IEEE"],
    techString: "HTML5 · CSS3 · JAVASCRIPT · IEEE",
    description:
      "Official production web portal engineered for the 6th IEEE International Conference on Sustainable Energy and Future Electric Transportation (IEEE SeFet 2026) hosted at VNIT Nagpur. Features paper submission tracks, speaker dossiers, call for papers downloads, and responsive multi-device layouts.",
    year: "2026",
    type: "Production Web",
    stackDetail: "HTML5 / CSS3 / JAVASCRIPT / IEEE",
    image: "/images/ieee-conference.jpg",
    terminalCommand: "$ curl -I https://vnit.ac.in/sefet26/",
    highlights: [
      "Engineered and deployed the official IEEE SeFet 2026 conference portal hosted at VNIT Nagpur.",
      "Architected keynote speaker showcases, call-for-papers distribution, and paper submission guidelines.",
      "Integrated conference committee registry, technical program tracks, and embedded PDF brochures.",
      "Delivered zero-dependency, ultra-fast responsive design serving international academic researchers.",
    ],
    metrics: [
      { label: "EDITION", value: "6TH IEEE SeFet" },
      { label: "HOST", value: "VNIT NAGPUR" },
      { label: "STATUS", value: "LIVE DEPLOYED" },
    ],
    githubUrl: "https://github.com/RoyalBeast2211/IEEE-Conference",
    liveUrl: "https://vnit.ac.in/sefet26/",
  },
  {
    id: "algolizer",
    number: "PROJECT_09",
    featured: false,
    category: "EXPERIMENTS",
    frameType: "browser",
    status: "Interactive",
    title: "ALGOLIZER",
    subtitle: "ALGORITHM VISUALIZATION TOOL",
    tagline: "Interactive algorithmic mechanics & sorting dynamics in the browser",
    tech: ["JavaScript", "HTML5 Canvas", "Algorithms", "CSS Architecture"],
    techString: "JAVASCRIPT · ALGORITHMS · VISUALIZATION",
    description:
      "An interactive platform for visualizing sorting and algorithmic processes. Designed to demystify complex data structures and execution traces through real-time step control, state mutations, and comparative complexity analysis.",
    year: "2024",
    type: "Interactive Web",
    stackDetail: "JAVASCRIPT / CANVAS / ALGORITHMS",
    image: "/images/algolizer.jpg",
    images: ["/images/algolizer.jpg", "/images/algolizer-analytics.jpg"],
    captions: [
      "REAL-TIME CANVAS SORTING TELEMETRY & POINTERS",
      "COMPARATIVE 4-QUADRANT ALGORITHM BENCHMARK MATRIX",
    ],
    terminalCommand: "$ run-algorithm --sort quicksort --visualize",
    highlights: [
      "Real-time visual comparison of QuickSort, MergeSort, HeapSort, and BubbleSort.",
      "Dynamic step-by-step execution control with variable speed throttling.",
      "Real-time pointer and swap highlighting with microsecond timestamps.",
      "Comparative time & space complexity breakdowns (O(N log N) vs O(N²)).",
    ],
    metrics: [
      { label: "COMPLEXITY", value: "O(N log N)" },
      { label: "ALGORITHMS", value: "MODELS" },
      { label: "ENGINE", value: "60 FPS CANVAS" },
    ],
    githubUrl: "https://github.com/RoyalBeast2211",
    liveUrl: "#algolizer-interactive",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    year: "2026",
    period: "May 2026 – Jul 2026",
    company: "ACCENTURE",
    division: "Software Engineering Group",
    role: "Software Engineering Intern",
    location: "Pune, India",
    status: "Internship",
    description:
      "Engineered high-throughput enterprise systems, multi-agent frameworks, and data platforms in production workflows.",
    achievements: [
      "Boosted media analysis throughput by 20×, cutting processing time from 15 min to 45 sec (95% reduction) using Python async concurrency, semaphores, and worker pools in production.",
      "Engineered a Databricks Volume backend for DeepAgents, implementing 8 production file search primitives to enable high-throughput enterprise data retrieval within agent workflows.",
      "Streamlined QA multi-agent architecture by replacing nested subagent hierarchies with 2 specialized agents, eliminating orchestration overhead and enhancing workflow maintainability.",
    ],
    tags: [
      "PYTHON CONCURRENCY",
      "ASYNCIO & SEMAPHORES",
      "DEEPAGENTS",
      "DATABRICKS VOLUME",
      "MULTI-AGENT SYSTEMS",
      "PRODUCTION WORKFLOWS",
    ],
    command: "$ cat experience/accenture-swe.json",
  },
];

export const POSITIONS_OF_RESPONSIBILITY: LeadershipRole[] = [
  {
    id: "syntax-president",
    title: "President",
    organization: "SyntaX Coding Club, VNIT",
    period: "June 2026 – Present",
    progression: ["Junior Developer (2024–25)", "Vice President (2025–26)", "President (2026–Present)"],
    progressionNote: "Promoted to President",
    isCurrent: true,
    description:
      "Leading technical initiatives, workshops, development activities, competitive programming sessions, and student hackathons across the university.",
    bullets: [
      "Directing university-wide technical initiatives, competitive programming bootcamps, and developer workshops.",
      "Leading executive operations, sponsor partnerships, and overseeing flagship hackathons for 500+ student participants.",
    ],
  },
  {
    id: "syntax-vp",
    title: "Vice President",
    organization: "SyntaX Coding Club, VNIT (formerly WAGC Club)",
    period: "Aug 2025 – May 2026",
    progression: ["Junior Developer (2024–25)", "Vice President (2025–26)", "President (2026–Present)"],
    progressionNote: "Elected Vice President",
    description:
      "Conducted workshops introducing programming and software development; organized SynHack, VNIT's flagship hackathon.",
    bullets: [
      "Conducted hands-on workshops introducing programming, algorithmic thinking, and modern software development to 200+ students.",
      "Organized SynHack, VNIT's flagship hackathon with institute-wide participation and industry problem statements.",
    ],
  },
  {
    id: "mme-mentor",
    title: "Student Mentor",
    organization: "MME Department, Student Mentor Programme (SMP), VNIT",
    period: "Apr 2025 – Present",
    progression: ["Class Representative (Jan–May 2024)", "Student Mentor (Apr 2025–Present)"],
    progressionNote: "Appointed Student Mentor",
    isCurrent: true,
    description:
      "Mentoring junior undergraduate students, providing academic guidance, technical onboarding, and career direction within VNIT.",
    bullets: [
      "Mentored 15+ first-year students in academics, technical skills, and extracurricular activities.",
      "Guided mentees towards internships and technical growth; several secured IIT and industry research internships.",
    ],
  },
  {
    id: "hostel-gs",
    title: "General Secretary",
    organization: "V.G. Bhide Boys Hostel, VNIT",
    period: "Aug 2024 – May 2025",
    progression: ["Technical Secretary (Sep 2023–Aug 2024)", "General Secretary (Aug 2024–May 2025)"],
    progressionNote: "Elected General Secretary",
    description:
      "Elected student representative managing hostel administration, student welfare, facilities, and campus residential logistics.",
    bullets: [
      "Organized the hostel's first-ever hackathon to develop software solutions for hostel-related residential challenges.",
      "Improved hostel sports facilities by adding new equipment including a complete Table Tennis setup.",
      "Resolved student grievances, mediated disputes, and coordinated with wardens and institute administration to enhance hostel facilities.",
    ],
  },
  {
    id: "syntax-jr-dev",
    title: "Junior Developer",
    organization: "SyntaX Coding Club, VNIT",
    period: "Aug 2024 – May 2025",
    progression: ["Junior Developer (2024–25)", "Vice President (2025–26)", "President (2026–Present)"],
    progressionNote: "Core Developer",
    description:
      "Contributed to internal club projects, open-source utilities, and technical event infrastructure for campus competitions.",
    bullets: [
      "Built web utilities and event registration workflows for club coding contests and workshops.",
      "Contributed to student open-source repositories and assisted in freshman technical onboarding sessions.",
    ],
  },
  {
    id: "mme-cr",
    title: "Class Representative",
    organization: "MME Department, VNIT",
    period: "Jan 2024 – May 2024",
    progression: ["Class Representative (Jan–May 2024)", "Student Mentor (Apr 2025–Present)"],
    progressionNote: "Elected Class Representative",
    description:
      "Coordinated between faculty and students for classes, laboratories, and examinations; led cohort to Enthu Trophy.",
    bullets: [
      "Coordinated between departmental faculty and students for lecture timetables, laboratory cohorts, and examination logistics.",
      "Led the class cohort to win the prestigious Enthu Trophy during Institute Gathering (IG) 2024.",
    ],
  },
  {
    id: "hostel-ts",
    title: "Technical Secretary",
    organization: "J.C. Bose Boys Hostel, VNIT",
    period: "Sep 2023 – Aug 2024",
    progression: ["Technical Secretary (Sep 2023–Aug 2024)", "General Secretary (Aug 2024–May 2025)"],
    progressionNote: "Appointed Technical Secretary",
    description:
      "Supervised technical maintenance, network connectivity, digital registry, and student technical infrastructure.",
    bullets: [
      "Implemented and maintained the fingerprint-based biometric hostel entry system for first-year students.",
      "Established the complete hostel computer laboratory including software and networking infrastructure.",
      "Provided continuous technical support for hostel digital infrastructure and connectivity.",
    ],
  },
];

export const RATINGS_DATA: RatingPlatform[] = [
  {
    platform: "LEETCODE",
    badge: "KNIGHT",
    rating: "1900+",
    tier: "TOP 5% GLOBALLY",
    handle: "theomkarmore",
    url: "https://leetcode.com/u/theomkarmore/",
    summary:
      "Knight badge holder ranked in the top 5% of competitive programmers globally (1900+ contest rating) with 835+ algorithmic solutions. Demonstrates high-speed algorithmic execution, consistent contest participation, and deep mastery of data structures.",
    highlights: [
      "Knight (1900+) contest rating",
      "835+ verified solutions (497 Medium, 119 Hard, 219 Easy)",
      "301 active days with 60-day maximum streak",
      "Dynamic programming, graph theory, trees & optimization",
    ],
    metrics: [
      { label: "SOLVED", value: "835" },
      { label: "RATING", value: "1900+" },
      { label: "BADGE", value: "KNIGHT" },
    ],
    tag: "CONTEST RATING",
  },
  {
    platform: "CODECHEF",
    badge: "3★ STAR",
    rating: "1600 (3-STAR)",
    tier: "DIVISION 2 RATED",
    handle: "theomkarmore",
    url: "https://www.codechef.com/users/theomkarmore",
    summary:
      "3-Star competitor (Rating: 1600) in Division 2, solving complex algorithmic challenges under strict time pressure with emphasis on mathematical proofs, number theory, and constructive logic.",
    highlights: [
      "3-Star ranked (1600 rating, Division 2)",
      "39 verified competitive solutions solved",
      "Discrete mathematics, combinatorics & number theory",
      "Time-pressured problem solving & complex constraints",
    ],
    metrics: [
      { label: "RATING", value: "1600" },
      { label: "PEAK", value: "1623" },
      { label: "TIER", value: "3★ STAR" },
    ],
    tag: "GLOBAL RATED",
  },
  {
    platform: "CODOLIO",
    badge: "950+ SOLVED",
    rating: "950+",
    tier: "VERIFIED TOTAL",
    handle: "theomkarmore",
    url: "https://codolio.com/profile/theomkarmore",
    summary:
      "Comprehensive verified track record of 950+ algorithmic problems solved across LeetCode, GeeksforGeeks, and CodeChef, verifying sustained dedication to algorithmic problem solving.",
    highlights: [
      "950+ verified solutions aggregated across platforms",
      "LeetCode: 835+ | GeeksforGeeks: 106+ | CodeChef: 39+",
      "Real-time synchronized portfolio profile",
      "Breadth of data structures, algorithms & systems problems",
    ],
    metrics: [
      { label: "LEETCODE", value: "835+" },
      { label: "GFG", value: "106+" },
      { label: "TOTAL", value: "950+" },
    ],
    tag: "CROSS-PLATFORM",
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "FLIPKART GRID 7.0",
    metric: "SEMIFINALIST",
    tag: "FLAGSHIP CHALLENGE",
    detail:
      "Semifinalists across India in Flipkart GRID 7.0 flagship engineering challenge, competing against premier institutions nationwide in advanced engineering problem statements.",
  },
  {
    title: "JEE MAINS EXAMINATION",
    metric: "TOP 5% NATIONWIDE",
    tag: "NATIONAL ENTRANCE",
    detail:
      "Secured rank in the Top 5% nationwide out of over 1,000,000 candidates in the Joint Entrance Examination (JEE Mains), earning admission to VNIT Nagpur.",
  },
  {
    title: "NATIONAL CYBER OLYMPIAD",
    metric: "SILVER MEDALIST",
    tag: "STEM OLYMPIAD",
    detail:
      "Awarded Silver Medal in the National Cyber Olympiad (school level), recognized for excellence in computer science fundamentals, cyber principles, and logical reasoning.",
  },
];

export const PROBLEM_SOLVING_STATS = {
  totalSolved: "950+",
  headline: "PROBLEMS SOLVED",
  leetcode: {
    title: "LEETCODE",
    badge: "KNIGHT",
    rating: "1900+",
    percentile: "Top 5% Globally (Knight)",
    url: "https://leetcode.com/u/theomkarmore/",
    totalSolved: 835,
    easy: 219,
    medium: 497,
    hard: 119,
    activeDays: 301,
    maxStreak: 60,
  },
  codechef: {
    title: "CODECHEF",
    badge: "3★ STAR",
    rating: "1600",
    peakRating: "1623",
    division: "Division 2",
    url: "https://www.codechef.com/users/theomkarmore",
    totalSolved: 39,
  },
  geeksforgeeks: {
    title: "GEEKSFORGEEKS",
    handle: "pokemaxguwqp",
    totalSolved: 106,
    easy: 34,
    medium: 47,
    hard: 3,
    url: "https://www.geeksforgeeks.org/user/pokemaxguwqp/",
  },
  codolio: {
    title: "CODOLIO",
    badge: "950+ SOLVED",
    rating: "950+",
    division: "Verified Profile",
    url: "https://codolio.com/profile/theomkarmore",
    profileViews: 204,
  },
};

export const TECH_STACK = {
  LANGUAGES: [
    { name: "Go", related: ["miniredis", "concurrency", "systems"] },
    { name: "C", related: ["systems", "coursework"] },
    { name: "C++", related: ["raytracer", "problem-solving"] },
    { name: "Python", related: ["agentic-code-migrator", "gitlike", "accenture-concurrency"] },
    { name: "JavaScript", related: ["chatty", "algolizer"] },
    { name: "TypeScript", related: ["portfolio", "chatty"] },
    { name: "Dart", related: ["vnit-directory", "ig-app"] },
    { name: "SQL", related: ["vnit-directory", "chatty"] },
  ],
  FRAMEWORKS: [
    { name: "LangGraph", related: ["agentic-code-migrator", "agent-orchestration"] },
    { name: "LangChain", related: ["agentic-workflows"] },
    { name: "DeepAgents", related: ["accenture-databricks"] },
    { name: "MCP", related: ["agentic-code-migrator", "model-context-protocol"] },
    { name: "React.js", related: ["chatty", "portfolio"] },
    { name: "Next.js", related: ["portfolio"] },
    { name: "Express.js", related: ["chatty"] },
    { name: "Node.js", related: ["chatty"] },
  ],
  AI_AGENTS: [
    { name: "LLM Agents", related: ["agentic-code-migrator", "deepagents", "accenture"] },
    { name: "Multi-Agent Systems", related: ["agentic-code-migrator", "qa-multi-agent", "accenture"] },
    { name: "RAG", related: ["agent-workflows"] },
    { name: "Prompt Engineering", related: ["agent-eval"] },
    { name: "AI Workflows", related: ["deepagents-search", "agentic-code-migrator"] },
  ],
  DATABASES_PLATFORMS: [
    { name: "MiniRedis", related: ["miniredis", "in-memory-db"] },
    { name: "MongoDB", related: ["chatty"] },
    { name: "Supabase", related: ["ig-app"] },
    { name: "Databricks", related: ["accenture-volume-backend"] },
    { name: "Vector Databases", related: ["rag-pipelines"] },
    { name: "REST APIs", related: ["chatty", "vnit-directory"] },
    { name: "SQLite", related: ["vnit-directory"] },
  ],
  TOOLS: [
    { name: "Docker", related: ["agentic-sandbox", "containerized-apps"] },
    { name: "Git", related: ["gitlike", "version-control"] },
    { name: "GitHub", related: ["open-source", "repositories"] },
    { name: "Linux", related: ["cli-systems", "production"] },
    { name: "Postman", related: ["rest-api-testing"] },
    { name: "VS Code", related: ["primary-ide"] },
    { name: "Android Studio", related: ["flutter-mobile"] },
  ],
};

export const TECH_USAGE_MAP: Record<string, string[]> = {
  Go: [
    "MINIREDIS IN-MEMORY DATABASE",
    "CUSTOM RESP WIRE PROTOCOL",
    "HYBRID AOF + RDB DURABILITY",
    "DISTRIBUTED PSYNC REPLICATION",
  ],
  C: ["SYSTEMS PROGRAMMING", "ACADEMIC COURSEWORK", "LOW LEVEL PRIMITIVES"],
  "C++": ["RAYTRACER RENDERING ENGINE", "COMPETITIVE PROGRAMMING", "DATA STRUCTURES"],
  Python: [
    "AGENTIC CODE MIGRATOR (ACM)",
    "ACCENTURE CONCURRENCY (20× SPEEDUP)",
    "GITLIKE VCS ENGINE",
    "ASYNC WORKFLOWS",
  ],
  JavaScript: [
    "IEEE SEFET 2026 CONFERENCE",
    "CHATTY REAL-TIME APP",
    "ALGOLIZER SORT VISUALIZER",
  ],
  TypeScript: ["NEXT.JS PORTFOLIO", "PRODUCTION APPS", "MODERN WEB ARCHITECTURE"],
  Dart: [
    "TELEDIR CAMPUS DIRECTORY",
    "IG APP (INSTITUTE GATHERING)",
    "FLUTTER MOBILE APPS",
  ],
  SQL: ["DATABASE MANAGEMENT SYSTEMS", "RELATIONAL SCHEMAS", "DATA QUERIES"],
  LangChain: ["AI WORKFLOWS", "LLM AGENT CHAINS", "PROMPT PIPELINES"],
  LangGraph: [
    "AGENTIC CODE MIGRATOR",
    "STATEFUL MULTI-AGENT GRAPHS",
    "DETERMINISTIC RETRY BOUNDS",
  ],
  DeepAgents: ["ACCENTURE PRODUCTION AGENTS", "DATABRICKS VOLUME BACKEND"],
  MCP: [
    "ACM-ANALYSIS (AST TOOLS)",
    "ACM-WORKSPACE (FS MUTATIONS)",
    "ACM-SANDBOX (DOCKER HARNESS)",
  ],
  "React.js": ["CHATTY MERN CLIENT", "COMPONENT ARCHITECTURES"],
  "Next.js": ["PORTFOLIO PRODUCTION", "SERVER-SIDE ARCHITECTURE"],
  "Express.js": ["CHATTY 15+ REST APIS", "BACKEND MIDDLEWARE PIPELINES"],
  "Node.js": ["CHATTY RUNTIME", "SOCKET.IO BI-DIRECTIONAL SERVICES"],
  "LLM Agents": ["AGENTIC CODE MIGRATOR", "ACCENTURE ENTERPRISE AGENTS", "TASK AUTOMATION"],
  "Multi-Agent Systems": ["ACM 3-LAYER HIERARCHY", "ACCENTURE QA 2-AGENT ARCHITECTURE"],
  RAG: ["RETRIEVAL AUGMENTED GENERATION", "VECTOR KNOWLEDGE WORKFLOWS"],
  "Prompt Engineering": ["AGENT EVALUATION", "STRUCTURED MODEL OUTPUTS"],
  "AI Workflows": ["DEEPAGENTS PIPELINES", "DATABRICKS FILE SEARCH"],
  MiniRedis: ["RESP TCP SERVER", "O(1) LRU EVICTION", "CIRCULAR REPLICATION BACKLOG"],
  MongoDB: ["CHATTY PERSISTENCE", "NOSQL DOCUMENT STORAGE"],
  Supabase: [
    "IG APP REALTIME LEADERBOARD",
    "LIVE POINT MUTATIONS",
    "EVENT STREAMS",
  ],
  Databricks: ["DATABRICKS VOLUME BACKEND (ACCENTURE)", "ENTERPRISE DATA"],
  "Vector Databases": ["RAG SEARCH PIPELINES", "EMBEDDING STORES"],
  "REST APIs": ["CHATTY 15+ ENDPOINTS", "TELEDIR DATA FEEDS"],
  SQLite: ["TELEDIR OFFLINE STORAGE", "EMBEDDED LOCAL CACHE"],
  Git: ["GITLIKE CUSTOM ENGINE", "COLLABORATIVE WORKFLOWS"],
  GitHub: ["SOURCE CODE HOSTING", "CI/CD & VERSION ARCHIVE"],
  Linux: ["BASH & TERMINAL WORKSTATION", "SYSTEMS RUNTIMES"],
  Postman: ["REST API TESTING", "SOCKET VERIFICATION"],
  "VS Code": ["DEVELOPMENT WORKFLOWS", "EXTENSIONS & DEBUGGING"],
  "Android Studio": ["FLUTTER TELEDIR COMPILATION", "EMULATOR TESTING"],
  Docker: [
    "ACM DIFFERENTIAL SANDBOX",
    "ISOLATED PYTHON/JAVA CONTAINERS",
    "DETERMINISTIC HARNESS",
  ],
};
