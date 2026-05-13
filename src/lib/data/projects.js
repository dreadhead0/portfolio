export const projects = [
{
  id: 1,
  title: "E2EE Messaging App",
  category: "fullstack",
  description:
    "A secure messaging app where messages are encrypted on the client before reaching the backend.",
  longDesc:
    "Built an end-to-end encrypted messaging experience with client-side key generation, public/private key handling, AES-GCM message encryption, secure key exchange, authentication, encrypted backend storage, decryption failure states, and clear UI indicators showing when content is protected. The project focused on security architecture, Web Crypto API usage, and proving that the server never receives plaintext.",
  tech: [
    "Web Crypto API",
    "AES-GCM",
    "RSA-OAEP",
    "IndexedDB",
    "JWT Auth",
    "Secure Messaging",
    "API Integration",
  ],
  link: "https://github.com",
  github: "https://github.com/dreadhead0/whisperbox",
  featured: true,
  year: 2026,
  visual: "security",
  status: "case-study",
  type: "FullStack",
},

  {
    id: 2,
    title: "Interactive Todo Card",
    category: "frontend",
    description:
      "A stateful todo card with editing, status transitions, priority handling, collapsible content, and live due-time logic.",
    longDesc:
      "Built an accessible, testable todo component with edit mode, synchronized checkbox/status behavior, priority indicators, overdue detection, keyboard-friendly expand/collapse controls, and time updates that react to task state. This project focused on deterministic UI behavior, accessibility, and clean state management.",
    tech: ["HTML", "CSS", "JavaScript", "Accessibility", "State Management"],
    link: "https://github.com",
    github: "https://github.com/dreadhead0/Todo-Card-HNG-Stage-0",
    featured: false,
    year: 2026,
    visual: "task",
    status: "case-study",
    type: "Frontend System",
  },
  {
    id: 3,
    title: "Testable Profile Card",
    category: "frontend",
    description:
      "A semantic, responsive profile card built with strict data-testid requirements and accessibility-first markup.",
    longDesc:
      "Implemented a profile card using semantic HTML, responsive CSS, accessible avatar text, keyboard-focusable social links, live epoch time display, and structured hobbies/dislikes sections. The focus was building UI that automated tests could reliably inspect while still feeling polished.",
    tech: ["HTML", "CSS", "JavaScript", "Semantic HTML", "Responsive Design"],
    link: "https://github.com",
    github: "https://github.com/dreadhead0/Profile-card-HNG-14",
    featured: false,
    year: 2026,
    visual: "profile",
    status: "case-study",
    type: "Frontend System",
  },
  {
    id: 4,
    title: "Invoice Management App",
    category: "fullstack",
    description:
      "A React invoice app with CRUD flows, validation, filtering, draft handling, payment states, and persistent data.",
    longDesc:
      "Built a full invoice workflow with create, read, update, delete, draft saving, paid-state transitions, status filtering, confirmation modals, form validation, theme persistence, and responsive layouts. The project emphasized business logic, state consistency, and accessible form interactions.",
    tech: ["React", "JavaScript", "LocalStorage", "Forms", "Responsive UI"],
    link: "https://github.com",
    github: "https://github.com/dreadhead0/invoice-app",
    featured: true,
    year: 2026,
    visual: "invoice",
    status: "case-study",
    type: "Frontend System",
  },
  {
    id: 5,
    title: "Habit Tracker PWA",
    category: "frontend",
    description:
      "A technical-spec-driven PWA with strict routes, persistence rules, required tests, and installable app behavior.",
    longDesc:
      "Implemented a habit tracking Progressive Web App from a formal requirements document, following exact file structure, selectors, naming conventions, persistence behavior, PWA requirements, and automated test expectations. This project focused on engineering discipline and spec compliance.",
    tech: ["PWA", "JavaScript", "Testing", "LocalStorage", "Service Worker"],
    link: "https://github.com",
    github: "https://github.com/dreadhead0/habit-tracker-pwa",
    featured: false,
    year: 2026,
    visual: "pwa",
    status: "case-study",
    type: "Frontend System",
  },
  {
    id: 6,
    title: "AI Page Summarizer Extension",
    category: "frontend",
    description:
      "A Manifest V3 Chrome extension that extracts webpage content, summarizes it, and caches summaries per URL.",
    longDesc:
      "Built a real Chrome extension with popup UI, background service worker, content script extraction, secure AI request flow, loading and error states, chrome.storage caching, and clean extension architecture. The focus was browser APIs, message passing, security, and useful UX.",
    tech: ["Chrome Extension", "Manifest V3", "JavaScript", "AI API", "Security"],
    link: "https://github.com",
    github: "https://github.com/dreadhead0/ai-page-summarizer",
    featured: true,
    year: 2026,
    visual: "extension",
    status: "case-study",
    type: "FullStack",
  },
  {
    id: 7,
    title: "Real-time Data Visualization Platform",
    category: "frontend",
    description:
      "A real-time Vue analytics dashboard with live metrics, charts, process tables, activity feed, and dashboard controls.",
    longDesc:
      "Designed and built a production-style monitoring dashboard with simulated real-time data, line/bar/area charts, metric cards, process inspection, activity feed updates, filtering controls, and responsive layouts. The main challenge was making dense streaming data feel readable, alive, and performant.",
    tech: ["Vue", "Vite", "TypeScript", "Charts", "Realtime UI", "Performance"],
    link: "https://github.com",
    github: "https://github.com/dreadhead0/real-time-data-visualization-platform",
    featured: true,
    year: 2026,
    visual: "dashboard",
    status: "case-study",
    type: "Frontend System",
  },
  {
    id: 8,
    title: "Interactive Developer Portfolio",
    category: "frontend",
    description:
      "A SvelteKit portfolio with dynamic accent themes, terminal navigation, animated sections, and accessibility polish.",
    longDesc:
      "Built as an immersive portfolio experience rather than a static resume page. It includes persistent custom accent themes, an interactive terminal, animated reveals, keyboard-accessible controls, responsive sections, reduced-motion support, and a clean production build.",
    tech: ["SvelteKit", "Svelte", "TailwindCSS", "GSAP", "Lenis", "Accessibility"],
    link: "https://github.com",
    github: "https://github.com/dreadhead0/portfolio",
    featured: true,
    year: 2026,
    visual: "terminal",
    status: "case-study",
    type: "Fullstack",
  },
];

export const skills = {
  Languages: ["JavaScript", "TypeScript", "Java", "SQL"],
  Frontend: ["SvelteKit", "Vue", "React", "Next.js", "TailwindCSS"],
  "Browser & Platform": ["Chrome Extensions", "PWA", "Service Workers", "LocalStorage"],
  "UI Engineering": [
    "Responsive Design",
    "Accessibility",
    "Animation",
    "Design Systems",
    "Performance",
  ],
  Testing: ["data-testid", "Automated Tests", "Spec Compliance", "Debugging"],
  Tools: ["Git", "Vite", "Vercel", "GitHub Actions", "Figma"],
};

export const categories = ["all", "frontend", "fullstack"];