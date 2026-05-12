<script>
  export let project;
  export let index = 0;

  let expanded = false;

  function handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      expanded = !expanded;
    }
    if (e.key === 'Escape') expanded = false;
  }
</script>

<article
  class="card"
  class:featured={project.featured}
  style="animation-delay:{index * 0.08}s"
  aria-label="Project: {project.title}"
>
  <div class="card-top">
    <div class="card-meta">
      <span class="card-category">{project.category}</span>
      <span class="card-year">{project.year}</span>
    </div>
    <div class="card-color-dot" style="background:{project.color}; box-shadow: 0 0 10px {project.color}40" aria-hidden="true"></div>
  </div>

  <h3 class="card-title">
    {project.title}
    {#if project.featured}
      <span class="featured-badge" aria-label="Featured project">★</span>
    {/if}
  </h3>

  <p class="card-desc">{project.description}</p>

  {#if expanded}
    <p class="card-long" role="region" aria-label="Extended description">{project.longDesc}</p>
  {/if}

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
      class="expand-btn"
      on:click={() => expanded = !expanded}
      on:keydown={handleKeydown}
      aria-expanded={expanded}
      aria-label="{expanded ? 'Collapse' : 'Expand'} project details"
    >
      {expanded ? '− less' : '+ more'}
    </button>
    <div class="card-links">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        class="card-link"
        aria-label="View {project.title} on GitHub"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        class="card-link primary"
        aria-label="View live demo of {project.title}"
      >
        Live →
      </a>
    </div>
  </div>
</article>

<style>
  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
    position: relative;
    overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--accent-glow) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .card:hover {
    border-color: var(--border-bright);
    box-shadow: 0 8px 40px rgba(0,0,0,0.3), 0 0 30px var(--accent-glow);
    transform: translateY(-4px);
  }
  .card:hover::before { opacity: 1; }
  .card.featured { border-color: var(--border-bright); }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-meta { display: flex; align-items: center; gap: 0.75rem; }
  .card-category {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    padding: 0.15rem 0.5rem;
    border: 1px solid var(--border-bright);
    border-radius: 3px;
  }
  .card-year {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: var(--text-muted);
  }
  .card-color-dot {
    width: 10px; height: 10px; border-radius: 50%;
  }

  .card-title {
    font-family: 'Syne', sans-serif;
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
  .card-long {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.65;
    margin: 0;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

  .card-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: auto;
  }
  .tech-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    padding: 0.2rem 0.45rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--text-muted);
  }
  .tech-tag.more { color: var(--accent); border-color: var(--border-bright); }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
  }
  .expand-btn {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--text-muted);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  }
  .expand-btn:hover { color: var(--accent); }
  .card-links { display: flex; gap: 0.75rem; align-items: center; }
  .card-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .card-link:hover { color: var(--accent); }
  .card-link.primary {
    color: var(--accent);
    padding: 0.25rem 0.65rem;
    border: 1px solid var(--border-bright);
    border-radius: 4px;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .card-link.primary:hover {
    background: var(--accent-glow);
    box-shadow: 0 0 12px var(--accent-glow);
  }
</style>