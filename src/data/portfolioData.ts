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
  title: string;
  organization: string;
  period: string;
  description: string;
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
    id: "ig-app",
    number: "PROJECT_01",
    featuredNumber: "01",
    featured: true,
    featuredOrder: 1,
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
    number: "PROJECT_02",
    featuredNumber: "02",
    featured: true,
    featuredOrder: 2,
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
    number: "PROJECT_03",
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
    number: "PROJECT_04",
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
    number: "PROJECT_05",
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
    number: "PROJECT_06",
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
    number: "PROJECT_07",
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
      "Improved media analysis throughput by 20×, reducing processing time for 100+ images from 15 min to 45 sec (95% reduction) using Python async concurrency, semaphores, and parallel execution in a production.",
      "Engineered a Databricks Volume backend for DeepAgents, implementing 8 production grade file search primitives and enabling enterprise scale data access directly from agent workflows.",
      "Redesigned a QA multi agent architecture by replacing a complex subagent hierarchy with 2 specialized agents, reducing orchestration complexity while improving modularity and workflow maintainability.",
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
    title: "President",
    organization: "SyntaX Coding Club, VNIT",
    period: "June 2026 – Present",
    description:
      "Leading technical initiatives, workshops, development activities, competitive programming sessions, and student hackathons across the university.",
  },
  {
    title: "Student Mentor",
    organization: "Student Mentor Programme (SMP), VNIT",
    period: "Apr 2025 – Present",
    description:
      "Mentoring junior undergraduate students, providing academic guidance, technical onboarding, and career direction within VNIT.",
  },
  {
    title: "General Secretary",
    organization: "V.G. Bhide Boys Hostel, Hostel Section, VNIT",
    period: "Aug 2024 – Aug 2025",
    description:
      "Elected student representative managing hostel administration, student welfare, facilities, and campus residential logistics.",
  },
  {
    title: "Technical Secretary",
    organization: "J.C. Bose Boys Hostel, Hostel Section, VNIT",
    period: "Aug 2023 – Aug 2024",
    description:
      "Supervised technical maintenance, network connectivity, digital registry, and student technical infrastructure.",
  },
];

export const RATINGS_DATA: RatingPlatform[] = [
  {
    platform: "LEETCODE",
    badge: "KNIGHT",
    rating: "1860",
    tier: "TOP 5% GLOBALLY",
    handle: "theomkarmore",
    url: "https://leetcode.com/u/theomkarmore/",
    summary:
      "Knight badge holder ranked in the top 5% of competitive programmers globally with 835+ algorithmic solutions. Demonstrates high-speed algorithmic execution, consistent contest participation, and deep mastery of data structures.",
    highlights: [
      "835+ verified solutions (497 Medium, 119 Hard, 219 Easy)",
      "Knight Title achieved through rated contest consistency",
      "301 active days with 60-day maximum streak",
      "Dynamic programming, graph theory, trees & optimization",
    ],
    metrics: [
      { label: "SOLVED", value: "835" },
      { label: "RATING", value: "1860" },
      { label: "BADGE", value: "KNIGHT" },
    ],
    tag: "CONTEST RATING",
  },
  {
    platform: "CODECHEF",
    badge: "2★ STAR",
    rating: "1623 MAX / 1590",
    tier: "DIVISION 2 RATED",
    handle: "theomkarmore",
    url: "https://www.codechef.com/users/theomkarmore",
    summary:
      "2-Star competitor in Division 2, solving complex algorithmic challenges under strict time pressure with emphasis on mathematical proofs, number theory, and constructive logic.",
    highlights: [
      "1623 peak rating achieving Division 2 status",
      "39 verified competitive solutions solved",
      "Discrete mathematics, combinatorics & number theory",
      "Time-pressured problem solving & complex constraints",
    ],
    metrics: [
      { label: "CURRENT", value: "1590" },
      { label: "PEAK", value: "1623" },
      { label: "TIER", value: "2★ STAR" },
    ],
    tag: "GLOBAL RATED",
  },
  {
    platform: "CODOLIO",
    badge: "980+ SOLVED",
    rating: "980+",
    tier: "VERIFIED TOTAL",
    handle: "theomkarmore",
    url: "https://codolio.com/profile/theomkarmore",
    summary:
      "Comprehensive verified track record of 980+ algorithmic solutions aggregated across LeetCode (835), GeeksforGeeks (106), and CodeChef (39), verifying sustained dedication to algorithmic problem solving.",
    highlights: [
      "980+ verified solutions aggregated across platforms",
      "LeetCode: 835 | GeeksforGeeks: 106 | CodeChef: 39",
      "Real-time synchronized portfolio profile",
      "Breadth of data structures, algorithms & systems problems",
    ],
    metrics: [
      { label: "LEETCODE", value: "835" },
      { label: "GFG", value: "106" },
      { label: "TOTAL", value: "980+" },
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
  totalSolved: "980+",
  headline: "PROBLEMS SOLVED",
  leetcode: {
    title: "LEETCODE",
    badge: "KNIGHT",
    rating: "1860",
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
    badge: "2★ STAR",
    rating: "1590",
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
    badge: "980+ SOLVED",
    rating: "980+",
    division: "Verified Profile",
    url: "https://codolio.com/profile/theomkarmore",
    profileViews: 204,
  },
};

export const TECH_STACK = {
  LANGUAGES: [
    { name: "C", related: ["systems", "coursework"] },
    { name: "C++", related: ["raytracer", "problem-solving"] },
    { name: "Python", related: ["gitlike", "accenture-concurrency"] },
    { name: "JavaScript", related: ["chatty", "algolizer"] },
    { name: "TypeScript", related: ["portfolio", "chatty"] },
    { name: "Dart", related: ["vnit-directory"] },
    { name: "SQL", related: ["vnit-directory", "chatty"] },
  ],
  FRAMEWORKS: [
    { name: "LangChain", related: ["agentic-workflows"] },
    { name: "LangGraph", related: ["agent-orchestration"] },
    { name: "DeepAgents", related: ["accenture-databricks"] },
    { name: "MCP", related: ["model-context-protocol"] },
    { name: "React.js", related: ["chatty", "portfolio"] },
    { name: "Next.js", related: ["portfolio"] },
    { name: "Express.js", related: ["chatty"] },
    { name: "Node.js", related: ["chatty"] },
  ],
  AI_AGENTS: [
    { name: "LLM Agents", related: ["deepagents", "accenture"] },
    { name: "Multi-Agent Systems", related: ["qa-multi-agent", "accenture"] },
    { name: "RAG", related: ["agent-workflows"] },
    { name: "Prompt Engineering", related: ["agent-eval"] },
    { name: "AI Workflows", related: ["deepagents-search"] },
  ],
  DATABASES_PLATFORMS: [
    { name: "MongoDB", related: ["chatty"] },
    { name: "Supabase", related: ["ig-app"] },
    { name: "Databricks", related: ["accenture-volume-backend"] },
    { name: "Vector Databases", related: ["rag-pipelines"] },
    { name: "REST APIs", related: ["chatty", "vnit-directory"] },
    { name: "SQLite", related: ["vnit-directory"] },
  ],
  TOOLS: [
    { name: "Git", related: ["gitlike", "version-control"] },
    { name: "GitHub", related: ["open-source", "repositories"] },
    { name: "Linux", related: ["cli-systems", "production"] },
    { name: "Postman", related: ["rest-api-testing"] },
    { name: "VS Code", related: ["primary-ide"] },
    { name: "Android Studio", related: ["flutter-mobile"] },
    { name: "Docker", related: ["containerized-apps"] },
  ],
};

export const TECH_USAGE_MAP: Record<string, string[]> = {
  C: ["SYSTEMS PROGRAMMING", "ACADEMIC COURSEWORK", "LOW LEVEL PRIMITIVES"],
  "C++": ["RAYTRACER RENDERING ENGINE", "COMPETITIVE PROGRAMMING", "DATA STRUCTURES"],
  Python: [
    "ACCENTURE CONCURRENCY (20× SPEEDUP)",
    "GITLIKE VCS",
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
  LangGraph: ["MULTI-AGENT GRAPHS", "STATEFUL AGENT ORCHESTRATION"],
  DeepAgents: ["ACCENTURE PRODUCTION AGENTS", "DATABRICKS VOLUME BACKEND"],
  MCP: ["MODEL CONTEXT PROTOCOL TOOLS", "AGENT INTEGRATIONS"],
  "React.js": ["CHATTY MERN CLIENT", "COMPONENT ARCHITECTURES"],
  "Next.js": ["PORTFOLIO PRODUCTION", "SERVER-SIDE ARCHITECTURE"],
  "Express.js": ["CHATTY 15+ REST APIS", "BACKEND MIDDLEWARE PIPELINES"],
  "Node.js": ["CHATTY RUNTIME", "SOCKET.IO BI-DIRECTIONAL SERVICES"],
  "LLM Agents": ["ACCENTURE ENTERPRISE AGENTS", "TASK AUTOMATION"],
  "Multi-Agent Systems": ["ACCENTURE QA 2-AGENT ARCHITECTURE", "ORCHESTRATION"],
  RAG: ["RETRIEVAL AUGMENTED GENERATION", "VECTOR KNOWLEDGE WORKFLOWS"],
  "Prompt Engineering": ["AGENT EVALUATION", "STRUCTURED MODEL OUTPUTS"],
  "AI Workflows": ["DEEPAGENTS PIPELINES", "DATABRICKS FILE SEARCH"],
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
  Docker: ["CONTAINERIZED WORKFLOWS", "ISOLATED RUNTIMES"],
};
