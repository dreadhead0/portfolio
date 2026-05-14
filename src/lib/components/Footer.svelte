<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <span class="brand-bracket">[</span>dreadhead .dev<span
        class="brand-bracket">]</span
      >
    </div>
    <p class="footer-copy">
      Built with <span class="accent">SvelteKit</span> · Designed with intention
      · © 2026
    </p>
    <p class="footer-sub">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer"
        >Source on GitHub</a
      >
    </p>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
    padding: 3rem 2rem;
    background: var(--bg-secondary);
  }
  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
  }
  .footer-brand {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.9rem;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  .brand-bracket {
    color: var(--accent);
  }
  .footer-copy {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    color: var(--text-muted);
    margin: 0;
  }
  .accent {
    color: var(--accent);
  }
  .footer-sub {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    color: var(--text-muted);
    margin: 0;
    opacity: 0.5;
  }
  .footer-sub a {
    color: inherit;
    text-decoration: none;
  }
  .footer-sub a:hover {
    color: var(--accent);
    opacity: 1;
  }
</style>
