export interface SkillProjectConnection {
  title: string;
  href: string;
}

export interface SkillItem {
  name: string;
  category: "LANGUAGES" | "APPLICATIONS" | "AI SYSTEMS" | "DATA" | "TOOLS";
  categoryNum: "01" | "02" | "03" | "04" | "05";
  categoryLabel: string;
  capabilities: string[];
  projects: SkillProjectConnection[];
  related: string[];
}

export interface SkillCategory {
  num: "01" | "02" | "03" | "04" | "05";
  title: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    num: "01",
    title: "LANGUAGES",
    skills: [
      {
        name: "C++",
        category: "LANGUAGES",
        categoryNum: "01",
        categoryLabel: "LANGUAGE / CORE",
        capabilities: [
          "Algorithms",
          "Systems",
          "Performance",
          "Optics & 3D Math",
        ],
        projects: [
          { title: "Raytracer", href: "/projects#raytracer" },
          { title: "GitLike", href: "/#gitlike" },
        ],
        related: ["Algorithms", "Systems", "Performance"],
      },
      {
        name: "Python",
        category: "LANGUAGES",
        categoryNum: "01",
        categoryLabel: "LANGUAGE / SYSTEMS",
        capabilities: [
          "Async Concurrency",
          "CLI Systems",
          "Enterprise Automation",
          "Object Serialization",
        ],
        projects: [
          { title: "Accenture SWE", href: "/#experience" },
          { title: "GitLike", href: "/#gitlike" },
        ],
        related: ["DeepAgents", "Concurrency", "GitLike"],
      },
      {
        name: "TypeScript",
        category: "LANGUAGES",
        categoryNum: "01",
        categoryLabel: "LANGUAGE / WEB",
        capabilities: [
          "Type-Safe Systems",
          "Component Architecture",
          "State Orchestration",
          "Full-Stack Web",
        ],
        projects: [
          { title: "Portfolio", href: "/#about" },
          { title: "Chatty", href: "/projects#chatty" },
        ],
        related: ["React.js", "Next.js", "Node.js"],
      },
      {
        name: "JavaScript",
        category: "LANGUAGES",
        categoryNum: "01",
        categoryLabel: "LANGUAGE / RUNTIME",
        capabilities: [
          "Real-Time Canvas",
          "Event Loop Mechanics",
          "Interactive DOM",
          "Sorting Telemetry",
        ],
        projects: [
          { title: "Algolizer", href: "/projects#algolizer" },
          { title: "Chatty", href: "/projects#chatty" },
          { title: "IEEE SeFet 2026", href: "/projects#ieee-conference" },
        ],
        related: ["Canvas 2D", "React.js", "Web APIs"],
      },
      {
        name: "Dart",
        category: "LANGUAGES",
        categoryNum: "01",
        categoryLabel: "LANGUAGE / MOBILE",
        capabilities: [
          "Cross-Platform UI",
          "Reactive Streams",
          "Local Persistence",
          "Platform Channels",
        ],
        projects: [
          { title: "IG App", href: "/#ig-app" },
          { title: "Teledir", href: "/projects#teledir" },
        ],
        related: ["Flutter", "Supabase", "Mobile OS"],
      },
      {
        name: "SQL",
        category: "LANGUAGES",
        categoryNum: "01",
        categoryLabel: "LANGUAGE / DATA",
        capabilities: [
          "Relational Schemas",
          "Complex Queries",
          "ACID Transactions",
          "Indexing & Plans",
        ],
        projects: [
          { title: "Teledir", href: "/projects#teledir" },
          { title: "Chatty", href: "/projects#chatty" },
        ],
        related: ["SQLite", "Schemas", "Relational DB"],
      },
    ],
  },
  {
    num: "02",
    title: "APPLICATIONS",
    skills: [
      {
        name: "React.js",
        category: "APPLICATIONS",
        categoryNum: "02",
        categoryLabel: "APPLICATIONS / UI",
        capabilities: [
          "UI",
          "State Management",
          "API Integration",
          "Product Development",
        ],
        projects: [
          { title: "IG App", href: "/#ig-app" },
          { title: "Chatty", href: "/projects#chatty" },
          { title: "ClubConnect", href: "/projects#clubconnect" },
        ],
        related: ["Next.js", "Node.js", "Express.js"],
      },
      {
        name: "Next.js",
        category: "APPLICATIONS",
        categoryNum: "02",
        categoryLabel: "APPLICATIONS / FULL-STACK",
        capabilities: [
          "Server-Side Rendering",
          "Turbopack Bundling",
          "Layout Architecture",
          "Zero-Chunk Tuning",
        ],
        projects: [
          { title: "Portfolio", href: "/#about" },
        ],
        related: ["React.js", "TypeScript", "Web APIs"],
      },
      {
        name: "Node.js",
        category: "APPLICATIONS",
        categoryNum: "02",
        categoryLabel: "APPLICATIONS / RUNTIME",
        capabilities: [
          "Asynchronous Runtimes",
          "Socket.io WebSockets",
          "Process Lifecycles",
          "Microservices",
        ],
        projects: [
          { title: "Chatty", href: "/projects#chatty" },
        ],
        related: ["Express.js", "MongoDB", "REST APIs"],
      },
      {
        name: "Express.js",
        category: "APPLICATIONS",
        categoryNum: "02",
        categoryLabel: "APPLICATIONS / BACKEND",
        capabilities: [
          "15+ RESTful Routes",
          "JWT Authentication",
          "Error Pipelines",
          "Middleware Stacks",
        ],
        projects: [
          { title: "Chatty", href: "/projects#chatty" },
        ],
        related: ["Node.js", "REST APIs", "Postman"],
      },
      {
        name: "Flutter",
        category: "APPLICATIONS",
        categoryNum: "02",
        categoryLabel: "APPLICATIONS / MOBILE",
        capabilities: [
          "Cross-Platform Mobile",
          "Offline-First Storage",
          "Realtime Streaming",
          "Native Telephony",
        ],
        projects: [
          { title: "IG App", href: "/#ig-app" },
          { title: "Teledir", href: "/projects#teledir" },
        ],
        related: ["Dart", "Mobile", "Supabase"],
      },
    ],
  },
  {
    num: "03",
    title: "AI SYSTEMS",
    skills: [
      {
        name: "LLM Agents",
        category: "AI SYSTEMS",
        categoryNum: "03",
        categoryLabel: "AI SYSTEMS / AGENTS",
        capabilities: [
          "Task Decomposition",
          "Tool Execution (MCP)",
          "Reasoning Loops",
          "Agent Evaluation",
        ],
        projects: [
          { title: "Accenture SWE", href: "/#experience" },
          { title: "DeepAgents", href: "/#experience" },
        ],
        related: ["Multi-Agent Systems", "RAG", "Python"],
      },
      {
        name: "Multi-Agent Systems",
        category: "AI SYSTEMS",
        categoryNum: "03",
        categoryLabel: "AI SYSTEMS / ORCHESTRATION",
        capabilities: [
          "Agent Specialization",
          "Inter-Agent Protocols",
          "Stateful Graphs",
          "Decoupled Architectures",
        ],
        projects: [
          { title: "Accenture QA Architecture", href: "/#experience" },
        ],
        related: ["LLM Agents", "AI Workflows", "AsyncIO"],
      },
      {
        name: "RAG",
        category: "AI SYSTEMS",
        categoryNum: "03",
        categoryLabel: "AI SYSTEMS / RETRIEVAL",
        capabilities: [
          "Retrieval Architectures",
          "Dense Vector Embeddings",
          "Context Budgeting",
          "Dynamic Re-Ranking",
        ],
        projects: [
          { title: "Accenture Workflows", href: "/#experience" },
        ],
        related: ["Vector Databases", "Embeddings", "Prompt Engineering"],
      },
      {
        name: "Prompt Engineering",
        category: "AI SYSTEMS",
        categoryNum: "03",
        categoryLabel: "AI SYSTEMS / DESIGN",
        capabilities: [
          "Few-Shot Specification",
          "JSON Schema Guardrails",
          "Chain-of-Thought Guidance",
          "System Hardening",
        ],
        projects: [
          { title: "Agentic Workflows", href: "/#experience" },
        ],
        related: ["LLM Agents", "Evaluation", "JSON Schema"],
      },
      {
        name: "AI Workflows",
        category: "AI SYSTEMS",
        categoryNum: "03",
        categoryLabel: "AI SYSTEMS / PIPELINES",
        capabilities: [
          "Production Pipelines",
          "File Search Primitives",
          "Databricks Integration",
          "Enterprise Access",
        ],
        projects: [
          { title: "Accenture Databricks Volume", href: "/#experience" },
        ],
        related: ["DeepAgents", "Databricks", "Python"],
      },
    ],
  },
  {
    num: "04",
    title: "DATA",
    skills: [
      {
        name: "MongoDB",
        category: "DATA",
        categoryNum: "04",
        categoryLabel: "DATA / DOCUMENT",
        capabilities: [
          "Document Modeling",
          "Aggregation Pipelines",
          "Dynamic Schemas",
          "User Persistence",
        ],
        projects: [
          { title: "Chatty", href: "/projects#chatty" },
        ],
        related: ["Express.js", "Node.js", "NoSQL"],
      },
      {
        name: "SQLite",
        category: "DATA",
        categoryNum: "04",
        categoryLabel: "DATA / EMBEDDED",
        capabilities: [
          "Embedded Storage",
          "Offline-First Caching",
          "Low-Latency Indexing",
          "Cache Invalidation",
        ],
        projects: [
          { title: "Teledir", href: "/projects#teledir" },
        ],
        related: ["SQL", "Mobile Storage", "Caching"],
      },
      {
        name: "REST APIs",
        category: "DATA",
        categoryNum: "04",
        categoryLabel: "DATA / INTERFACES",
        capabilities: [
          "RESTful Design",
          "Payload Serialization",
          "Error Contracts",
          "Rate Limiting & Auth",
        ],
        projects: [
          { title: "Chatty", href: "/projects#chatty" },
          { title: "Teledir", href: "/projects#teledir" },
        ],
        related: ["Express.js", "Postman", "HTTP"],
      },
      {
        name: "Vector Databases",
        category: "DATA",
        categoryNum: "04",
        categoryLabel: "DATA / EMBEDDINGS",
        capabilities: [
          "Vector Indexing",
          "Embedding Similarity",
          "KNN Metric Search",
          "Document Retrieval",
        ],
        projects: [
          { title: "RAG Pipelines", href: "/#experience" },
        ],
        related: ["RAG", "Embeddings", "Semantic Search"],
      },
    ],
  },
  {
    num: "05",
    title: "TOOLS",
    skills: [
      {
        name: "Git",
        category: "TOOLS",
        categoryNum: "05",
        categoryLabel: "TOOLS / VERSION CONTROL",
        capabilities: [
          "DAG Commit Internals",
          "Branching & Merging",
          "SHA-1 Storage Engine",
          "VCS Architecture",
        ],
        projects: [
          { title: "GitLike", href: "/#gitlike" },
        ],
        related: ["GitHub", "Linux", "Systems"],
      },
      {
        name: "GitHub",
        category: "TOOLS",
        categoryNum: "05",
        categoryLabel: "TOOLS / COLLABORATION",
        capabilities: [
          "PR Review Workflows",
          "CI/CD Automation",
          "Repository Releases",
          "Open Source",
        ],
        projects: [
          { title: "Open Source", href: "https://github.com/RoyalBeast2211" },
        ],
        related: ["Git", "Version Control", "CI/CD"],
      },
      {
        name: "Linux",
        category: "TOOLS",
        categoryNum: "05",
        categoryLabel: "TOOLS / OPERATING SYSTEM",
        capabilities: [
          "Bash Shell Scripting",
          "Process Signals & Pipes",
          "Headless Environments",
          "System Primitives",
        ],
        projects: [
          { title: "GitLike", href: "/#gitlike" },
          { title: "Development Workstation", href: "/#about" },
        ],
        related: ["Git", "Terminal", "Docker"],
      },
      {
        name: "Docker",
        category: "TOOLS",
        categoryNum: "05",
        categoryLabel: "TOOLS / CONTAINERS",
        capabilities: [
          "Isolated Runtimes",
          "Multi-Stage Dockerfiles",
          "Container Networks",
          "Reproducible Envs",
        ],
        projects: [
          { title: "Accenture Production", href: "/#experience" },
          { title: "Chatty", href: "/projects#chatty" },
        ],
        related: ["Linux", "Deployment", "Microservices"],
      },
      {
        name: "Postman",
        category: "TOOLS",
        categoryNum: "05",
        categoryLabel: "TOOLS / API TESTING",
        capabilities: [
          "Endpoint Automation",
          "Environment Profiles",
          "Payload Validation",
          "Contract Testing",
        ],
        projects: [
          { title: "Chatty", href: "/projects#chatty" },
        ],
        related: ["REST APIs", "Express.js", "Backend"],
      },
      {
        name: "VS Code",
        category: "TOOLS",
        categoryNum: "05",
        categoryLabel: "TOOLS / ENVIRONMENT",
        capabilities: [
          "TypeScript & Python Setup",
          "Native C++ Debugging",
          "Multi-Root Workspaces",
          "Extensions & Profiles",
        ],
        projects: [
          { title: "Primary Workspace", href: "/#about" },
        ],
        related: ["TypeScript", "Python", "C++"],
      },
      {
        name: "Android Studio",
        category: "TOOLS",
        categoryNum: "05",
        categoryLabel: "TOOLS / MOBILE SDK",
        capabilities: [
          "Emulator Profiling",
          "Gradle Build Pipelines",
          "Android Intent Debugging",
          "Mobile Performance",
        ],
        projects: [
          { title: "Teledir", href: "/projects#teledir" },
          { title: "IG App", href: "/#ig-app" },
        ],
        related: ["Flutter", "Dart", "Mobile OS"],
      },
    ],
  },
];

export const ALL_SKILLS_MAP: Record<string, SkillItem> = SKILL_CATEGORIES.flatMap(
  (c) => c.skills
).reduce((acc, skill) => {
  acc[skill.name.toLowerCase()] = skill;
  return acc;
}, {} as Record<string, SkillItem>);
