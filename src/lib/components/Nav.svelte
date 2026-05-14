<script>
  import { onMount } from "svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  let scrolled = false;
  let menuOpen = false;

  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#terminal", label: "Terminal" },
    { href: "#contact", label: "Contact" },
  ];

  onMount(() => {
    const handler = () => {
      scrolled = window.scrollY > 40;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  });

  function closeMenu() {
    menuOpen = false;
  }
</script>

<header class:scrolled>
  <nav class="nav-inner" aria-label="Main navigation">
    <a href="#hero" class="logo" aria-label="Home">
      <span class="logo-bracket">[</span>
      <span class="logo-text">dreadhead.dev</span>
      <span class="logo-bracket">]</span>
      <span class="cursor-blink" aria-hidden="true">_</span>
    </a>

    <ul class="nav-links" role="list">
      {#each links as link}
        <li>
          <a href={link.href} class="nav-link">
            <span class="link-num" aria-hidden="true">./</span>{link.label}
          </a>
        </li>
      {/each}
    </ul>

    <div class="nav-actions">
      <ThemeToggle />
      <a
        href="/resume.pdf"
        download
        class="resume-btn"
        aria-label="Download resume"
      >
        resume<span aria-hidden="true">.pdf</span>
      </a>

      <button
        class="hamburger"
        on:click={() => (menuOpen = !menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle menu"
      >
        <span class:open={menuOpen}></span>
        <span class:open={menuOpen}></span>
        <span class:open={menuOpen}></span>
      </button>
    </div>
  </nav>

  {#if menuOpen}
    <div
      id="mobile-menu"
      class="mobile-menu"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {#each links as link}
        <a href={link.href} class="mobile-link" on:click={closeMenu}
          >{link.label}</a
        >
      {/each}
      <a href="/resume.pdf" download class="mobile-resume" on:click={closeMenu}
        >Download Resume</a
      >
    </div>
  {/if}
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1.25rem 0;
    transition:
      background 0.3s ease,
      backdrop-filter 0.3s ease,
      border-color 0.3s ease,
      padding 0.3s ease;
    border-bottom: 1px solid transparent;
  }
  header.scrolled {
    background: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom-color: var(--border);
    padding: 0.875rem 0;
  }
  .nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .logo {
    font-family: "JetBrains Mono", monospace;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0;
    letter-spacing: -0.02em;
  }
  .logo-bracket {
    color: var(--accent);
  }
  .logo-text {
    color: var(--text-primary);
  }
  .cursor-blink {
    color: var(--accent);
    animation: blink 1s step-end infinite;
    font-weight: 300;
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

  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 0.25rem;
    margin-left: auto;
  }
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.4rem 0.75rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    color: var(--text-muted);
    text-decoration: none;
    border-radius: 4px;
    transition:
      color 0.2s,
      background 0.2s;
    letter-spacing: 0.02em;
  }
  .link-num {
    color: var(--accent);
    opacity: 0.6;
    margin-right: 2px;
    font-size: 0.7rem;
  }
  .nav-link:hover {
    color: var(--accent);
    background: var(--accent-glow);
  }
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .resume-btn {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    padding: 0.4rem 0.875rem;
    border: 1px solid var(--accent);
    border-radius: 4px;
    color: var(--accent);
    text-decoration: none;
    transition:
      background 0.2s,
      box-shadow 0.2s;
    white-space: nowrap;
  }
  .resume-btn span {
    opacity: 0.6;
  }
  .resume-btn:hover {
    background: var(--accent-glow);
    box-shadow: 0 0 16px var(--accent-glow);
  }
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .hamburger span {
    display: block;
    width: 20px;
    height: 1.5px;
    background: var(--accent);
    transition:
      transform 0.3s,
      opacity 0.3s;
  }
  .hamburger span.open:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }
  .hamburger span.open:nth-child(2) {
    opacity: 0;
  }
  .hamburger span.open:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem 1.5rem;
    border-top: 1px solid var(--border);
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(16px);
  }
  .mobile-link,
  .mobile-resume {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.875rem;
    color: var(--text-muted);
    text-decoration: none;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border);
    transition: color 0.2s;
  }
  .mobile-link:hover {
    color: var(--accent);
  }
  .mobile-resume {
    border: none;
    margin-top: 0.75rem;
    color: var(--accent);
  }

  @media (max-width: 768px) {
    .nav-inner {
      justify-content: flex-start;
      gap: 1rem;
    }

    .logo {
      margin-right: auto;
    }

    .nav-links {
      display: none;
    }

    .resume-btn {
      display: none;
    }

    .nav-actions {
      margin-left: 0;
      gap: 0.65rem;
    }

    .hamburger {
      display: flex;
    }
  }
  @media (min-width: 769px) {
    .mobile-menu {
      display: none !important;
    }
  }
</style>
