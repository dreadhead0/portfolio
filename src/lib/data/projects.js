export const projects = [
  {
    id: 1,
    title: "NotesTogether",
    category: "fullstack",
    description:
      "Real-time collaborative document editor with Operational Transformation, review mode, and audit trails. Built with Spring Boot, WebSocket/STOMP, and Next.js 14.",
    longDesc:
      "A production-grade collaborative note editor featuring real-time sync via OT, granular accept/reject review workflows, and full attribution tracking. Handles concurrent edits across users with conflict-free convergence guarantees.",
    tech: [
      "Next.js 14",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "ActiveMQ Artemis",
      "WebSocket",
      "Quill.js",
      "TypeScript",
    ],
    color: "#EF1B1B",
    link: "https://github.com",
    github: "https://github.com",
    featured: true,
    year: 2024,
  },
  {
    id: 2,
    title: "FlowState",
    category: "frontend",
    description:
      "A kanban-style project management tool with drag-and-drop, live collaboration, and AI-powered task estimation.",
    longDesc:
      "Drag-and-drop kanban with real-time multi-user cursors, AI task breakdown suggestions, and smart sprint planning.",
    tech: ["SvelteKit", "Supabase", "TailwindCSS", "DnD Kit", "OpenAI API"],
    color: "#10b981",
    link: "https://github.com",
    github: "https://github.com",
    featured: true,
    year: 2024,
  },
  {
    id: 3,
    title: "Beacon API",
    category: "backend",
    description:
      "High-throughput event ingestion microservice processing 50k+ events/sec with intelligent rate limiting and fan-out.",
    longDesc:
      "Built to handle analytics ingestion at scale — horizontally scalable Spring Boot service with Kafka fan-out, Redis-backed rate limiting, and sub-10ms p99 latency.",
    tech: [
      "Spring Boot",
      "Kafka",
      "Redis",
      "Docker",
      "Kubernetes",
      "Prometheus",
    ],
    color: "#6366f1",
    link: "https://github.com",
    github: "https://github.com",
    featured: false,
    year: 2023,
  },
  {
    id: 4,
    title: "Luminary UI",
    category: "frontend",
    description:
      "An open-source design system with 40+ accessible components, dark mode, and TypeScript-first API.",
    longDesc:
      "A fully accessible component library with WCAG 2.1 AA compliance, zero-dependency core, and tree-shakeable exports.",
    tech: [
      "React",
      "TypeScript",
      "Radix UI",
      "CSS Modules",
      "Storybook",
      "Vitest",
    ],
    color: "#ec4899",
    link: "https://github.com",
    github: "https://github.com",
    featured: false,
    year: 2023,
  },
  {
    id: 5,
    title: "Prism Search",
    category: "fullstack",
    description:
      "Semantic search engine for developer documentation with vector embeddings and natural language queries.",
    longDesc:
      "Indexes docs from 200+ libraries using text embeddings, enabling natural language search with contextual ranking.",
    tech: ["Next.js", "FastAPI", "pgvector", "OpenAI Embeddings", "PostgreSQL"],
    color: "#f97316",
    link: "https://github.com",
    github: "https://github.com",
    featured: false,
    year: 2023,
  },
  {
    id: 6,
    title: "DevMetrics",
    category: "backend",
    description:
      "Personal engineering productivity tracker — integrates GitHub, Linear, and calendar to surface velocity insights.",
    longDesc:
      "Aggregates data from GitHub, Linear, and Google Calendar to give developers weekly engineering rhythm insights.",
    tech: [
      "Go",
      "PostgreSQL",
      "OAuth2",
      "GitHub API",
      "Linear API",
      "Chart.js",
    ],
    color: "#14b8a6",
    link: "https://github.com",
    github: "https://github.com",
    featured: false,
    year: 2022,
  },
];

export const skills = {
  Languages: ["TypeScript", "JavaScript", "Java", "Python", "Go", "SQL"],
  Frontend: [
    "Next.js",
    "SvelteKit",
    "React",
    "Quill.js",
    "TailwindCSS",
    "GSAP",
  ],
  Backend: [
    "Spring Boot",
    "FastAPI",
    "Node.js",
    "GraphQL",
    "REST",
    "WebSocket",
  ],
  "Data & Infra": [
    "PostgreSQL",
    "Redis",
    "Kafka",
    "Docker",
    "Kubernetes",
    "AWS",
  ],
  Tools: ["Git", "Figma", "Postman", "Linear", "Vercel", "GitHub Actions"],
};

export const categories = ["all", "fullstack", "frontend", "backend"];
