<script>
  import { onMount } from "svelte";
  import { projects, categories } from "$lib/data/projects";
  import ProjectCard from "./ProjectCard.svelte";
  import ProjectModal from "./ProjectModal.svelte";

  /** @type {HTMLElement | null} */
  let el = null;

  /** @type {any} */
  let selectedProject = null;

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

  function closeModal() {
    selectedProject = null;
  }
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
        <p class="section-subtitle">
          Case studies from staged frontend systems, real-time interfaces,
          browser tooling, security flows, and this interactive SvelteKit
          portfolio.
        </p>
      </div>

      <div
        class="filter-tabs"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {#each categories as cat}
          <button
            type="button"
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

    {#if filtered.length > 0}
      <div class="projects-grid" role="tabpanel">
        {#each filtered as project, i (project.id)}
          <ProjectCard
            {project}
            index={i}
            on:open={() => (selectedProject = project)}
          />
        {/each}
      </div>
    {:else}
      <div class="empty-state">
        <p>No projects found for this filter.</p>
      </div>
    {/if}
  </div>
</section>

{#if selectedProject}
  <ProjectModal project={selectedProject} on:close={closeModal} />
{/if}

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

  .section-subtitle {
    max-width: 640px;
    color: var(--text-muted);
    line-height: 1.7;
    margin: 1rem 0 0;
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
    border-radius: 999px;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    transition:
      border-color 0.2s,
      color 0.2s,
      background 0.2s,
      transform 0.2s;
  }

  .filter-tab:hover,
  .filter-tab.active {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-glow);
    transform: translateY(-1px);
  }

  .filter-tab.active {
    font-weight: 600;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .empty-state {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    background: var(--bg-card);
    color: var(--text-muted);
    text-align: center;
  }

  @media (max-width: 600px) {
    section {
      padding-inline: 1rem;
      overflow: hidden;
    }

    .projects-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .projects-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .filter-tabs {
      width: 100%;
      overflow-x: auto;
      flex-wrap: nowrap;
      padding-bottom: 0.25rem;
    }

    .filter-tab {
      flex: 0 0 auto;
    }
  }
</style>
