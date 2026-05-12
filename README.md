# Alex Dev — Portfolio

A highly interactive, production-grade developer portfolio built with **SvelteKit**.

🔗 **Live Demo**: [your-deployed-url.vercel.app](https://your-deployed-url.vercel.app)  
📦 **Repo**: [github.com/you/my-portfolio](https://github.com)

---

## Setup

```bash
npm install
npm run dev       # development server at localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

Deploy to Vercel:
```bash
npx vercel
```

---

## Architecture

### Stack
- **SvelteKit** — SSR + static generation via `adapter-auto`
- **TailwindCSS** — utility classes, extended with custom design tokens
- **CSS Custom Properties** — theme system (dark/light) via CSS variables
- **JetBrains Mono + Syne + DM Sans** — typography system

### Structure
src/
├── lib/
│   ├── components/   # All UI components (Nav, Hero, Projects, Terminal…)
│   ├── stores/       # Svelte stores (theme persistence)
│   └── data/         # Project data and skills config
└── routes/
├── +layout.svelte  # Global layout (Nav, Footer, CursorGlow)
└── +page.svelte    # Home page composition

### Component Design
Each section is a self-contained Svelte component. Data flows down via props or is imported directly from `$lib/data`. Theme state is managed via a writable store synced to `localStorage`.

---

## Animation Decisions

- **Scroll reveals**: `IntersectionObserver` triggers CSS class transitions — no heavy library needed, zero jank
- **Typewriter effect**: Pure Svelte reactive state with `setTimeout` loop — frame-perfect
- **Floating elements**: Pure CSS `@keyframes` — GPU-composited, no JS
- **Cursor glow**: Follows `mousemove`, uses `radial-gradient` + `transform: translate(-50%, -50%)` for smooth 60fps tracking
- **Scanline overlay**: CSS `repeating-linear-gradient` — adds atmosphere at near-zero cost
- **Interactive terminal**: Svelte reactive state machine, tab-completion, command history with arrow keys

---

## Performance Optimization

- ✅ Google Fonts with `display=swap` and `preconnect`
- ✅ `IntersectionObserver` for deferred reveal animations (no animation until in view)
- ✅ `{ passive: true }` on scroll listeners
- ✅ CSS-only animations for all decorative motion (GPU compositing)
- ✅ No heavy animation libraries — GSAP-free, Framer Motion-free
- ✅ `will-change: left, top` on cursor glow element
- ✅ Conditional component rendering (terminal splash saves DOM nodes)
- ✅ SvelteKit automatic code splitting per route
- ✅ Svelte's compile-time reactivity (no Virtual DOM overhead)

---

## Accessibility

- ✅ Skip navigation link (`#main-content`)
- ✅ Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ All interactive elements have `aria-label` or visible labels
- ✅ Form inputs have associated `<label>` elements
- ✅ Error messages use `role="alert"` and `aria-describedby`
- ✅ Terminal output uses `role="log"` with `aria-live="polite"`
- ✅ Project filter uses `role="tablist"` / `role="tab"` / `aria-selected`
- ✅ `prefers-reduced-motion` media query disables all animations
- ✅ Keyboard navigation throughout (Tab, Enter, Escape, Arrow keys in terminal)
- ✅ Visible focus states via `:focus-visible`
- ✅ Colour contrast meets WCAG AA (amber on dark backgrounds)

---

## Trade-offs

| Decision | Reason |
|---|---|
| No GSAP/Motion One | CSS animations + IntersectionObserver covers all requirements with far less JS |
| Single-page layout | Portfolio content is shallow — routing overhead not justified |
| Simulated form submit | No backend required; swap `handleSubmit` for Resend/EmailJS for production |
| CSS variables over Tailwind theming | CSS vars propagate instantly on class toggle, no re-render needed |
| No Three.js/WebGL | Terminal is a stronger, more differentiating creative feature for a dev portfolio |

How to Get It Running

Create the project:

bashnpm create svelte@latest my-portfolio
# Choose: Skeleton project, TypeScript: No, ESLint: Yes, Prettier: Yes
cd my-portfolio

Install dependencies:

bashnpm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Place every file above in the exact path shown (e.g. src/lib/components/Hero.svelte, tailwind.config.js, etc.)
Run:

bashnpm run dev

Deploy to Vercel:

bashnpm install -g vercel
vercel