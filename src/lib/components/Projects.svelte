<script>
  import { onMount } from "svelte";
  import { projects, categories } from "$lib/data/projects";
  import ProjectCard from "./ProjectCard.svelte";

  /** @type {HTMLElement | null} */
  let el = null;

  let activeCategory = "all";

  $: filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  onMount(() => {
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && el) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    obs.observe(el);

    return () => obs.disconnect();
  });
</script>

<section id="projects" aria-label="Projects">
  <div class="projects-inner reveal" bind:this={el}>
    <div class="projects-header">
      <div>
        <div class="section-label">
          <span class="label-line"></span>
          <span class="label-text">projects/</span>
        </div>
        <h2 class="section-heading">
          Things I've <span class="heading-accent">built.</span>
        </h2>
      </div>

      <div
        class="filter-tabs"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {#each categories as cat}
          <button
            role="tab"
            aria-selected={activeCategory === cat}
            class="filter-tab"
            class:active={activeCategory === cat}
            on:click={() => (activeCategory = cat)}
          >
            {cat}
          </button>
        {/each}
      </div>
    </div>

    <div class="projects-grid" role="tabpanel">
      {#each filtered as project, i (project.id)}
        <ProjectCard {project} index={i} />
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
  .projects-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }
  .section-label {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }
  .label-line {
    display: block;
    width: 40px;
    height: 1px;
    background: var(--accent);
  }
  .label-text {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .section-heading {
    font-family: "Syne", sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0;
  }
  .heading-accent {
    color: var(--accent);
  }

  .filter-tabs {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }
  .filter-tab {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    text-transform: lowercase;
    letter-spacing: 0.04em;
    padding: 0.4rem 0.875rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s;
  }
  .filter-tab:hover,
  .filter-tab.active {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-glow);
  }
  .filter-tab.active {
    font-weight: 600;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 600px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
    .projects-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
