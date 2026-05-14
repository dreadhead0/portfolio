<script>
  import { createEventDispatcher } from "svelte";

  export let project;
  export let index = 0;

  const dispatch = createEventDispatcher();

  function openProject() {
    dispatch("open");
  }
</script>

<article
  class="card"
  class:featured={project.featured}
  style="animation-delay:{index * 0.08}s"
  aria-label="Project: {project.title}"
>
  <div class="preview-mini preview-{project.visual}" aria-hidden="true">
    <div class="preview-bar">
      <span></span><span></span><span></span>
    </div>
    <div class="preview-content">
      <span class="preview-label">{project.visual}</span>

      {#if project.visual === "security"}
        <div class="mini-security">
          <span class="mini-lock" aria-hidden="true">
            <span class="lock-shackle"></span>
            <span class="lock-body"></span>
          </span>
          <code>ciphertext_only</code>
          <small>client-side encryption</small>
        </div>
      {:else if project.visual === "task"}
        <div class="mini-task">
          <span class="mini-checkbox"></span>
          <div>
            <strong>Todo Card</strong>
            <small>edit · status · priority · due time</small>
          </div>
        </div>
      {:else if project.visual === "profile"}
        <div class="mini-profile">
          <span class="mini-avatar"></span>
          <div>
            <strong>Profile Card</strong>
            <small>semantic · responsive · testable</small>
          </div>
        </div>
      {:else if project.visual === "invoice"}
        <div class="mini-invoice">
          <div class="invoice-row">
            <strong>INV-2026</strong>
            <span>Pending</span>
          </div>
          <small>CRUD · validation · draft flow</small>
        </div>
      {:else if project.visual === "pwa"}
        <div class="mini-grid">
          {#each Array(12) as _}
            <span></span>
          {/each}
        </div>
      {:else if project.visual === "extension"}
        <div class="mini-extension">
          <strong>Summarize Page</strong>
          <small>content script → AI summary</small>
          <span>cached per URL</span>
        </div>
      {:else if project.visual === "dashboard"}
        <div class="mini-chart">
          <i></i><i></i><i></i><i></i><i></i>
        </div>
      {:else}
        <div class="mini-terminal">
          <code>$ inspect portfolio</code>
          <code>theme: dynamic</code>
          <code>assistant: online</code>
        </div>
      {/if}
    </div>
  </div>

  <div class="card-top">
    <div class="card-meta">
      <span class="card-category">{project.category}</span>
      <span class="card-year">{project.year}</span>
    </div>
    <div class="card-color-dot" aria-hidden="true"></div>
  </div>

  <div class="card-type-row">
    <span>{project.type}</span>
    <span>{project.status}</span>
  </div>

  <h3 class="card-title">
    {project.title}
    {#if project.featured}
      <span class="featured-badge" aria-label="Featured project">★</span>
    {/if}
  </h3>

  <p class="card-desc">{project.description}</p>

  <div class="card-tech">
    {#each project.tech.slice(0, 4) as t}
      <span class="tech-tag">{t}</span>
    {/each}
    {#if project.tech.length > 4}
      <span class="tech-tag more">+{project.tech.length - 4}</span>
    {/if}
  </div>

  <div class="card-footer">
    <button
      type="button"
      class="case-btn"
      on:click={openProject}
      aria-label="Open case study for {project.title}"
    >
      Case study →
    </button>

    <div class="card-side-links">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        class="card-link"
        aria-label="View {project.title} on GitHub"
      >
        GitHub
      </a>

      {#if project.liveStatus === "live" && project.link}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          class="card-link live"
          aria-label="View live demo of {project.title}"
        >
          Live
        </a>
      {:else}
        <span class="coming-soon">Demo soon</span>
      {/if}
    </div>
  </div>
</article>

<style>
  .card {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.035),
        transparent 28%
      ),
      var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1rem;
    display: flex;
    min-height: 540px;
    flex-direction: column;
    gap: 0.95rem;
    transition:
      border-color 0.3s,
      box-shadow 0.3s,
      transform 0.25s;
    position: relative;
    overflow: hidden;
    outline: none;
  }

  .card {
    min-width: 0;
  }

  .card-title,
  .card-desc,
  .tech-tag,
  .card-link,
  .coming-soon {
    overflow-wrap: anywhere;
  }

  .card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 20% 0%,
      var(--accent-glow),
      transparent 42%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  .card:hover,
  .card:focus-visible {
    border-color: var(--border-bright);
    box-shadow:
      0 18px 60px rgba(0, 0, 0, 0.38),
      0 0 34px var(--accent-glow);
    transform: translateY(-5px);
  }

  .card:hover::before,
  .card:focus-visible::before {
    opacity: 1;
  }

  .card.featured {
    border-color: var(--border-bright);
  }

  .card-side-links {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    flex-wrap: wrap;
  }

  .coming-soon {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    color: var(--text-muted);
    opacity: 0.75;
  }

  .card-link.live {
    color: var(--accent);
  }

  .mini-security,
  .mini-task,
  .mini-profile,
  .mini-extension,
  .mini-terminal {
    display: grid;
    gap: 0.35rem;
    padding: 0.7rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.035);
    max-height: 96px;
    overflow: hidden;
  }

  .mini-lock {
    position: relative;
    display: inline-flex;
    width: 24px;
    height: 28px;
    align-items: flex-end;
    justify-content: center;
  }

  .lock-shackle {
    position: absolute;
    top: 1px;
    width: 15px;
    height: 15px;
    border: 2px solid var(--accent);
    border-bottom: 0;
    border-radius: 999px 999px 0 0;
    box-shadow: 0 0 12px var(--accent-glow);
  }

  .lock-body {
    width: 22px;
    height: 16px;
    border-radius: 5px;
    background: var(--accent);
    box-shadow: 0 0 16px var(--accent-glow);
  }

  .lock-body::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 5px;
    width: 4px;
    height: 6px;
    border-radius: 999px;
    background: #050505;
    transform: translateX(-50%);
  }

  .mini-security code,
  .mini-terminal code {
    color: var(--text-muted);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.62rem;
  }

  .mini-security small,
  .mini-task small,
  .mini-profile small,
  .mini-invoice small,
  .mini-extension small {
    color: var(--text-muted);
    font-size: 0.68rem;
  }

  .mini-security {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.85rem;
    min-height: 76px;
    max-height: none;
    overflow: hidden;
  }

  .mini-security code {
    color: var(--text-muted);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.62rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mini-security small {
    grid-column: 2;
    color: var(--text-muted);
    font-size: 0.66rem;
    white-space: nowrap;
  }

  .mini-invoice {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.45rem;
    min-height: 76px;
    max-height: none;
    overflow: hidden;
  }

  .invoice-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .mini-invoice strong {
    line-height: 1;
    color: var(--text-primary);
    font-size: 0.82rem;
    white-space: nowrap;
  }

  .mini-invoice span {
    color: var(--accent);
    border: 1px solid var(--border-bright);
    border-radius: 999px;
    padding: 0.2rem 0.5rem;
    font-size: 0.62rem;
    line-height: 1;
    white-space: nowrap;
  }

  .mini-invoice small {
    color: var(--text-muted);
    font-size: 0.66rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mini-extension {
    align-content: center;
  }

  .mini-extension strong,
  .mini-extension span {
    line-height: 1.2;
  }

  .mini-task,
  .mini-profile {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .mini-checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent);
    border-radius: 6px;
    box-shadow: 0 0 14px var(--accent-glow);
  }

  .mini-avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: var(--accent-glow);
    border: 1px solid var(--border-bright);
  }

  .mini-task strong,
  .mini-profile strong,
  .mini-invoice strong,
  .mini-extension strong {
    display: block;
    color: var(--text-primary);
    font-size: 0.86rem;
  }

  .mini-invoice span {
    width: fit-content;
    color: var(--accent);
    border: 1px solid var(--border-bright);
    border-radius: 999px;
    padding: 0.2rem 0.5rem;
    font-size: 0.65rem;
  }

  .mini-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.35rem;
  }

  .mini-grid span {
    aspect-ratio: 1;
    border-radius: 5px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.04);
  }

  .mini-grid span:nth-child(3n) {
    background: var(--accent-glow);
    border-color: var(--border-bright);
  }

  .mini-chart {
    display: flex;
    align-items: end;
    gap: 0.45rem;
    height: 90px;
  }

  .mini-chart i {
    flex: 1;
    border-radius: 999px 999px 0 0;
    background: linear-gradient(to top, var(--accent), transparent);
    box-shadow: 0 0 16px var(--accent-glow);
  }

  .mini-chart i:nth-child(1) {
    height: 35%;
  }
  .mini-chart i:nth-child(2) {
    height: 70%;
  }
  .mini-chart i:nth-child(3) {
    height: 50%;
  }
  .mini-chart i:nth-child(4) {
    height: 88%;
  }
  .mini-chart i:nth-child(5) {
    height: 60%;
  }

  .preview-mini {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 8.8;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 6px
      ),
      #0b0b0b;
  }

  .preview-bar {
    display: flex;
    gap: 0.35rem;
    padding: 0.65rem;
    border-bottom: 1px solid var(--border);
  }

  .preview-bar span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .preview-bar span:nth-child(1) {
    background: #ff5f57;
  }
  .preview-bar span:nth-child(2) {
    background: #febc2e;
  }
  .preview-bar span:nth-child(3) {
    background: #28c840;
  }

  .preview-content {
    padding: 0.85rem;
    height: calc(100% - 34px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .preview-label {
    display: inline-flex;
    margin-bottom: 0.85rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.62rem;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .preview-line.strong {
    width: 52%;
    background: var(--accent);
    box-shadow: 0 0 18px var(--accent-glow);
  }

  .preview-line.short {
    width: 38%;
  }

  .preview-dashboard .preview-content::after,
  .preview-invoice .preview-content::after,
  .preview-pwa .preview-content::after {
    content: "";
    display: block;
    height: 44px;
    margin-top: 0.8rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: linear-gradient(90deg, var(--accent-glow), transparent);
  }

  .preview-security .preview-content::after {
    content: "ciphertext://AES-GCM";
    display: block;
    margin-top: 0.8rem;
    padding: 0.55rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.65rem;
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-meta,
  .card-type-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .card-category,
  .card-type-row span {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    padding: 0.18rem 0.5rem;
    border: 1px solid var(--border-bright);
    border-radius: 999px;
    background: var(--accent-glow);
  }

  .card-year {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.65rem;
    color: var(--text-muted);
  }

  .card-type-row span {
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.03);
    border-color: var(--border);
  }

  .card-title {
    font-family: "Syne", sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .featured-badge {
    font-size: 0.75rem;
    color: var(--accent);
  }

  .card-desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  .card-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: auto;
    min-height: 2.1rem;
  }

  .tech-tag {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.65rem;
    padding: 0.2rem 0.45rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-muted);
  }

  .tech-tag.more {
    color: var(--accent);
    border-color: var(--border-bright);
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.8rem;
    border-top: 1px solid var(--border);
  }

  .case-btn {
    border: none;
    border-radius: 999px;
    background: var(--accent);
    color: #050505;
    padding: 0.48rem 0.85rem;
    cursor: pointer;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    font-weight: 700;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .case-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 20px var(--accent-glow);
  }

  .card-link {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .card-link:hover {
    color: var(--accent);
  }

  .card-color-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }

  @media (max-width: 420px) {
    .card {
      padding: 0.85rem;
    }

    .card-footer {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>
