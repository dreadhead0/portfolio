<script>
  import { onMount } from "svelte";

  let visible = false;
  let typedText = "";
  const phrases = [
    "frontend systems engineer.",
    "real-time interface builder.",
    "performance-focused developer.",
    "accessibility-minded UI engineer.",
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  onMount(() => {
    setTimeout(() => (visible = true), 100);

    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let timeout;
    function type() {
      const phrase = phrases[phraseIdx];
      if (!deleting) {
        typedText = phrase.slice(0, ++charIdx);
        if (charIdx === phrase.length) {
          deleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        typedText = phrase.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      timeout = setTimeout(type, deleting ? 40 : 80);
    }
    timeout = setTimeout(type, 1200);
    return () => clearTimeout(timeout);
  });

  const socials = [
    { name: "GitHub", href: "https://github.com", label: "GH" },
    { name: "LinkedIn", href: "https://linkedin.com", label: "LI" },
    { name: "Twitter", href: "https://twitter.com", label: "TW" },
    { name: "Email", href: "mailto:alex@example.com", label: "EM" },
  ];
</script>

<section class="hero" aria-label="Introduction" id="hero">
  <!-- Animated grid bg -->
  <div class="grid-bg" aria-hidden="true">
    <div class="grid-lines"></div>
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
  </div>

  <div class="hero-content" class:visible>
    <div class="status-bar" aria-hidden="true">
      <span class="status-dot"></span>
      <span>available for work</span>
    </div>

    <h1 class="hero-name">
      <span class="name-line">system.boot / identity</span>
      <span class="name-main">dread<span class="name-accent">.</span></span>
    </h1>

    <p class="hero-role" aria-live="polite">
      <span class="role-prefix">I build as a </span>
      <span class="role-typed">{typedText}</span>
      <span class="role-cursor" aria-hidden="true">|</span>
    </p>

    <p class="hero-desc">
      I engineer <strong>real-time interfaces</strong>,
      <strong>frontend systems</strong>, and
      <strong>polished web experiences</strong> with performance, accessibility,
      and interaction quality treated as core architecture — not decoration.
    </p>
    <div class="hero-actions">
      <a href="#projects" class="btn-primary">
        <span>Inspect projects</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" /><polyline
            points="12 5 19 12 12 19"
          />
        </svg>
      </a>
      <a href="#terminal" class="btn-ghost">Open terminal</a>
    </div>

    <div class="hero-signals" aria-label="Engineering focus areas">
      <span>real-time systems</span>
      <span>frontend architecture</span>
      <span>performance</span>
      <span>accessibility</span>
    </div>

    <div class="hero-socials">
      {#each socials as s}
        <a
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          class="social-link"
        >
          {s.label}
        </a>
      {/each}
    </div>
  </div>

  <!-- Floating code snippet -->
  <div class="code-float" aria-hidden="true">
    <div class="code-card">
      <div class="code-header">
        <span class="dot r"></span><span class="dot y"></span><span
          class="dot g"
        ></span>
        <span class="code-file">systems.profile.ts</span>
      </div>
      <pre class="code-body"><code
          ><span class="kw">const</span> <span class="var">dev</span> = <span
            class="punct">&#123;</span
          >
  <span class="key">name</span><span class="punct">:</span> <span class="str"
            >"dreadhead"</span
          >
          ><span class="punct"
            >,<span class="key">role</span><span class="punct">:</span> <span
              class="str">"Frontend Systems"</span
            ><span class="punct">,</span>
  <span class="key">stack</span><span class="punct">:</span> <span class="punct"
              >[</span
            >
    <span class="str">"SvelteKit"</span><span class="punct">,</span>
    <span class="str">"Vue"</span><span class="punct">,</span>
    <span class="str">"React"</span><span class="punct">,</span>
    <span class="str">"Nextjs"</span><span class="punct">,</span>
  <span class="punct">],</span>
  <span class="key">available</span><span class="punct">:</span> <span
              class="bool">true</span
            >
<span class="punct">&#125;</span></span
          ></code
        ></pre>
    </div>
  </div>

  <div class="scroll-hint" aria-hidden="true">
    <span>scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 8rem 2rem 4rem;
    position: relative;
    gap: 4rem;
  }

  /* Background */
  .grid-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .grid-lines {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(
      ellipse 80% 80% at 50% 50%,
      black 30%,
      transparent 100%
    );
    opacity: 0.4;
  }
  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
  }
  .orb-1 {
    width: 500px;
    height: 500px;
    background: var(--accent);
    top: -100px;
    left: -100px;
    animation: float 8s ease-in-out infinite;
  }
  .orb-2 {
    width: 400px;
    height: 400px;
    background: #6366f1;
    bottom: 0;
    right: 0;
    animation: float 10s ease-in-out infinite reverse;
  }
  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(20px, -30px);
    }
  }

  /* Content */
  .hero-content {
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(40px);
    transition:
      opacity 0.9s ease,
      transform 0.9s ease;
  }
  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .status-bar {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    padding: 0.3rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    backdrop-filter: blur(8px);
  }
  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 8px #10b981;
    animation: pulse 2s ease infinite;
  }
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  .hero-name {
    display: flex;
    flex-direction: column;
    margin: 0 0 1rem;
  }
  .name-line {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.875rem;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }
  .name-main {
    font-family: "Syne", sans-serif;
    font-size: clamp(3.5rem, 8vw, 6rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--text-primary);
  }
  .name-accent {
    color: var(--accent);
  }

  .hero-role {
    font-family: "JetBrains Mono", monospace;
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    color: var(--text-muted);
    margin: 0 0 1.5rem;
    min-height: 1.8em;
  }
  .role-prefix {
    color: var(--text-muted);
  }
  .role-typed {
    color: var(--accent);
  }
  .role-cursor {
    color: var(--accent);
    animation: blink 1s step-end infinite;
    margin-left: 1px;
  }
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  .hero-desc {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 480px;
    margin-bottom: 2.5rem;
  }
  .hero-desc strong {
    color: var(--text-primary);
    font-weight: 500;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    background: var(--accent);
    color: #000;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 6px;
    transition:
      box-shadow 0.2s,
      transform 0.2s;
  }
  .btn-primary:hover {
    box-shadow: 0 0 24px var(--accent-glow);
    transform: translateY(-1px);
  }
  .btn-ghost {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.75rem;
    border: 1px solid var(--border-bright);
    color: var(--text-primary);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.85rem;
    text-decoration: none;
    border-radius: 6px;
    transition:
      border-color 0.2s,
      background 0.2s;
  }
  .btn-ghost:hover {
    border-color: var(--accent);
    background: var(--accent-glow);
    color: var(--accent);
  }

  .hero-signals {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .hero-signals span {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    color: var(--text-muted);
    padding: 0.35rem 0.65rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.025);
  }

  .hero-signals span:hover {
    color: var(--accent);
    border-color: var(--border-bright);
    background: var(--accent-glow);
  }

  .hero-socials {
    display: flex;
    gap: 0.5rem;
  }
  .social-link {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    text-decoration: none;
    padding: 0.35rem 0.65rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    transition:
      color 0.2s,
      border-color 0.2s,
      background 0.2s;
  }
  .social-link:hover {
    color: var(--accent);
    border-color: var(--border-bright);
    background: var(--accent-glow);
  }

  /* Code float */
  .code-float {
    position: relative;
    z-index: 1;
    animation: float 6s ease-in-out infinite;
    transition-delay: 0.3s;
  }
  .code-card {
    background: var(--bg-card);
    border: 1px solid var(--border-bright);
    border-radius: 12px;
    overflow: hidden;
    box-shadow:
      0 24px 60px rgba(0, 0, 0, 0.5),
      0 0 40px var(--accent-glow);
  }
  .code-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid var(--border);
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .dot.r {
    background: #ff5f57;
  }
  .dot.y {
    background: #febc2e;
  }
  .dot.g {
    background: #28c840;
  }
  .code-file {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-left: auto;
  }
  .code-body {
    padding: 1.25rem 1.5rem;
    margin: 0;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.82rem;
    line-height: 1.75;
    overflow: hidden;
  }
  .kw {
    color: #c792ea;
  }
  .var {
    color: #82aaff;
  }
  .punct {
    color: var(--text-muted);
  }
  .key {
    color: #f07178;
  }
  .str {
    color: #c3e88d;
  }
  .bool {
    color: #ff9cac;
  }

  /* Scroll hint */
  .scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-muted);
    opacity: 0.5;
  }
  .scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scrollAnim 2s ease infinite;
  }
  @keyframes scrollAnim {
    0% {
      transform: scaleY(0);
      transform-origin: top;
    }
    50% {
      transform: scaleY(1);
      transform-origin: top;
    }
    51% {
      transform: scaleY(1);
      transform-origin: bottom;
    }
    100% {
      transform: scaleY(0);
      transform-origin: bottom;
    }
  }

  @media (max-width: 900px) {
    .hero {
      grid-template-columns: 1fr;
      text-align: center;
      padding-top: 7rem;
      gap: 2rem;
    }
    .hero-actions {
      justify-content: center;
    }
    .hero-socials {
      justify-content: center;
    }
    .hero-desc {
      margin-left: auto;
      margin-right: auto;
    }
    .hero-signals {
      justify-content: center;
    }
    .code-float {
      display: none;
    }
    .scroll-hint {
      display: none;
    }
    .status-bar {
      font-size: 0.65rem;
    }
  }
</style>
