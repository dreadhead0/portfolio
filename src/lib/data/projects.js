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
  link: "https://whisperbox-six.vercel.app/",
  github: "https://github.com/dreadhead0/whisperbox",
  featured: true,
  year: 2026,
  visual: "security",
  status: "case-study",
  type: "FullStack",
  image: "/projects/e2ee-messaging.png",
  liveStatus: "coming-soon",
  problem:
  "Messaging apps usually require users to trust the backend with sensitive content. This project focused on proving that private messages can be encrypted before they ever reach the server.",
  build:
  "Built a secure messaging flow with client-side key generation, encrypted payload handling, AES-GCM message encryption, RSA-OAEP key exchange, authentication, encrypted backend storage, and UI states for protected messages and decryption failures.",
  impact:
  "Demonstrates security-aware frontend architecture, Web Crypto API usage, client/server trust boundaries, and the ability to explain encryption decisions clearly through product UI.",
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
    link: "https://todo-card-hng-stage-0.vercel.app/",
    github: "https://github.com/dreadhead0/Todo-Card-HNG-Stage-0",
    featured: false,
    year: 2026,
    visual: "task",
    status: "case-study",
    type: "Frontend System",
    image: "/projects/todo-card.jpeg",
    liveStatus: "live",
    problem:
      "The task required a single todo card to behave like a real app component, with editing, status transitions, priority changes, collapsible content, and accurate time state.",
    build:
      "Built a stateful card with synchronized checkbox/status logic, editable fields, priority indicators, overdue detection, keyboard-accessible expand/collapse behavior, and responsive form layouts.",
    impact:
      "Demonstrates deterministic frontend state management, accessibility discipline, test-friendly markup, and the ability to turn a small UI requirement into a polished interactive system.",
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
    link: "https://profile-card-hng-14.vercel.app/",
    github: "https://github.com/dreadhead0/Profile-card-HNG-14",
    featured: false,
    year: 2026,
    visual: "profile",
    status: "case-study",
    type: "Frontend System",
    image: "/projects/profile-card.jpeg",
    liveStatus: "live",
    problem:
    "The challenge was to build a simple profile card that was not only visually responsive, but also semantic, accessible, and easy for automated tests to inspect.",
    build:
    "Implemented a semantic profile card with structured sections, accessible avatar alt text, social links, hobbies and dislikes lists, current epoch time display, responsive layout behavior, and strict data-testid coverage.",
    impact:
    "Shows attention to HTML semantics, accessibility, responsive UI foundations, and building interfaces that are reliable for both users and automated testing.",
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
    link: "https://invoice-app-omega-bice.vercel.app/",
    github: "https://github.com/dreadhead0/invoice-app",
    featured: true,
    year: 2026,
    visual: "invoice",
    status: "case-study",
    type: "Frontend System",
    image: "/projects/invoice-app.jpeg",
    liveStatus: "live",
    problem:
      "The app needed to handle a complete invoice workflow with multiple status rules, form validation, draft behavior, filtering, persistence, and responsive layouts.",
    build:
      "Built invoice CRUD flows, validation states, draft saving, paid-state transitions, status filtering, confirmation modals, persistent local state, theme handling, and responsive form/list/detail views.",
    impact:
    "Demonstrates product-level state management, business logic handling, accessible forms, modal interactions, and the ability to structure a larger frontend application cleanly.",
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
    link: "https://habit-tracker-pwa-ashen.vercel.app/",
    github: "https://github.com/dreadhead0/habit-tracker-pwa",
    featured: false,
    year: 2026,
    visual: "pwa",
    status: "case-study",
    type: "Frontend System",
    image: "/projects/habit-tracker.jpeg",
    liveStatus: "live",
    problem:
      "The project required implementing a Progressive Web App from a strict technical requirements document with exact routes, naming rules, persistence behavior, selectors, and test expectations.",
    build:
      "Implemented the habit tracker according to the specification, including required structure, local persistence, PWA behavior, installability support, required selectors, and automated tests matching the expected titles and behavior.",
    impact:
      "Shows engineering discipline, spec compliance, test awareness, and the ability to build from formal requirements instead of assumptions.",
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
    link: "https://ai-page-summarizer-doy6.onrender.com",
    github: "https://github.com/dreadhead0/ai-page-summarizer",
    featured: true,
    year: 2026,
    visual: "extension",
    status: "case-study",
    type: "FullStack",
    image: "/projects/ai-extension.png",
    liveStatus: "coming-soon",
    problem:
    "Users need a fast way to understand long webpages, but browser extensions must handle page extraction, AI requests, caching, and security without exposing secrets.",
    build:
    "Built a Manifest V3 Chrome extension with popup UI, content script extraction, background service worker messaging, AI summarization flow, loading and error states, cached summaries, and clean separation between extension layers.",
    impact:
    "Demonstrates browser API knowledge, secure AI integration thinking, Chrome extension architecture, message passing, and useful product-focused tooling.",
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
    link: "https://real-time-data-visualization-platfo.vercel.app/",
    github: "https://github.com/dreadhead0/real-time-data-visualization-platform",
    featured: true,
    year: 2026,
    visual: "dashboard",
    status: "case-study",
    type: "Frontend System",
    image: "/projects/realtime-dashboard.jpeg",
    liveStatus: "live",
    problem:
    "Real-time dashboards must update continuously without becoming noisy, slow, or unreadable. The challenge was to make streaming data feel alive while keeping the interface clear and performant.",
    build:
    "Built a Vue analytics dashboard with simulated live data, metric cards, line/bar/area charts, process tables, activity feeds, filtering controls, responsive layouts, and performance-conscious update behavior.",
    impact:
    "Shows real-time interface thinking, data visualization polish, responsive dashboard design, and attention to performance under continuous UI updates.",
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
    link: "https://portfolio-eta-virid-77.vercel.app/",
    github: "https://github.com/dreadhead0/portfolio",
    featured: true,
    year: 2026,
    visual: "terminal",
    status: "case-study",
    type: "Fullstack",
    image: "/projects/portfolio.jpeg",
    liveStatus: "live",
    problem:
    "A developer portfolio can easily feel like a static template. The goal was to build an immersive SvelteKit experience that proves frontend skill through interaction, performance, accessibility, and visual identity.",
    build:
    "Built a portfolio with dynamic accent themes, theme persistence, responsive hero layout, animated sections, interactive terminal, Groq-powered AI assistant, cinematic project modals, accessible navigation, and production build cleanup.",
    impact:
    "Demonstrates SvelteKit composition, interaction engineering, UI polish, accessibility, performance awareness, and originality through a portfolio that behaves like a product experience.",
  },
];

export const skills = {
  Languages: ["JavaScript", "TypeScript", "Solidity"],
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