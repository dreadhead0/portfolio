<script>
  import { onMount } from 'svelte';
  import { skills } from '$lib/data/projects';

  let el;
  onMount(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section id="skills" aria-label="Skills">
  <div class="skills-inner reveal" bind:this={el}>
    <div class="section-label">
      <span class="label-line"></span>
      <span class="label-text">stack.json</span>
    </div>

    <h2 class="section-heading">
      My <span class="heading-accent">toolkit.</span>
    </h2>

    <div class="skills-grid">
      {#each Object.entries(skills) as [category, items], i}
        <div class="skill-group" style="animation-delay:{i * 0.08}s">
          <div class="group-header">
            <span class="group-icon" aria-hidden="true">//</span>
            <h3 class="group-title">{category}</h3>
          </div>
          <div class="skill-pills">
            {#each items as skill}
              <span class="pill">{skill}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    padding: 7rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .section-label {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .label-line { display: block; width: 40px; height: 1px; background: var(--accent); }
  .label-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .section-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 3rem;
    color: var(--text-primary);
  }
  .heading-accent { color: var(--accent); }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  .skill-group {
    padding: 1.5rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  }
  .skill-group:hover {
    border-color: var(--border-bright);
    box-shadow: 0 0 24px var(--accent-glow);
    transform: translateY(-2px);
  }
  .group-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .group-icon {
    font-family: 'JetBrains Mono', monospace;
    color: var(--accent);
    font-size: 0.85rem;
    opacity: 0.6;
  }
  .group-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 400;
    margin: 0;
  }
  .skill-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    padding: 0.25rem 0.6rem;
    background: var(--accent-glow);
    border: 1px solid var(--border-bright);
    border-radius: 4px;
    color: var(--text-primary);
    transition: background 0.2s, color 0.2s;
  }
  .pill:hover {
    background: var(--accent);
    color: #000;
    border-color: var(--accent);
  }
</style>