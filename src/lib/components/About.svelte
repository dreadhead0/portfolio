<script>
  import { onMount } from 'svelte';

  let el;
  onMount(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });
</script>

<section id="about" aria-label="About me">
  <div class="about-inner reveal" bind:this={el}>
    <div class="section-label">
      <span class="label-line"></span>
      <span class="label-text">about.md</span>
    </div>

    <div class="about-grid">
      <div class="about-text">
        <h2 class="section-heading">
          Crafting software<br/>
          <span class="heading-accent">with intention.</span>
        </h2>
        <p>
          I'm a full-stack engineer obsessed with the intersection of engineering rigour and design craft.
          I've shipped everything from real-time collaborative editors with custom Operational Transformation logic
          to high-throughput backend services handling 50k+ events per second.
        </p>
        <p>
          My philosophy: software should be fast by default, accessible always,
          and beautiful where it matters. I write code the way I'd want to read it.
        </p>
        <p>
          When I'm not pushing commits, I'm contributing to open source,
          writing about systems design, or exploring how AI can be woven thoughtfully into developer tooling.
        </p>

        <div class="about-stats">
          <div class="stat">
            <span class="stat-num">3+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat">
            <span class="stat-num">20+</span>
            <span class="stat-label">Projects Shipped</span>
          </div>
          <div class="stat">
            <span class="stat-num">∞</span>
            <span class="stat-label">Bugs Fixed</span>
          </div>
        </div>
      </div>

      <div class="about-visual" aria-hidden="true">
        <div class="avatar-wrap">
          <div class="avatar-ring"></div>
          <div class="avatar-inner">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="40" cy="30" r="16" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" stroke-width="1"/>
              <circle cx="40" cy="30" r="10" fill="var(--accent)" opacity="0.3"/>
              <path d="M15 65c0-13.807 11.193-25 25-25s25 11.193 25 25" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" stroke-width="1"/>
            </svg>
          </div>
        </div>
        <div class="floating-tags">
          <span class="tag" style="top:10%; left:-20%">TypeScript</span>
          <span class="tag" style="top:30%; right:-20%">Spring Boot</span>
          <span class="tag" style="bottom:25%; left:-15%">SvelteKit</span>
          <span class="tag" style="bottom:5%; right:-10%">PostgreSQL</span>
        </div>
      </div>
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
    margin-bottom: 3rem;
  }
  .label-line {
    display: block;
    width: 40px;
    height: 1px;
    background: var(--accent);
  }
  .label-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 0.6fr;
    gap: 5rem;
    align-items: center;
  }
  .about-text p {
    color: var(--text-muted);
    line-height: 1.8;
    margin-bottom: 1.25rem;
    font-size: 1.05rem;
  }
  .section-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }
  .heading-accent { color: var(--accent); }

  .about-stats {
    display: flex;
    gap: 2.5rem;
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
  }
  .stat { display: flex; flex-direction: column; }
  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: var(--accent);
    line-height: 1;
  }
  .stat-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 0.25rem;
  }

  .about-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
  }
  .avatar-wrap {
    position: relative;
    width: 180px;
    height: 180px;
  }
  .avatar-ring {
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    border: 1px solid var(--border-bright);
    animation: spin 20s linear infinite;
  }
  .avatar-ring::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 12px var(--accent);
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .avatar-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--bg-card);
    border: 1px solid var(--border-bright);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-shadow: 0 0 40px var(--accent-glow);
  }
  .floating-tags {
    position: absolute;
    inset: 0;
  }
  .tag {
    position: absolute;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    padding: 0.3rem 0.6rem;
    background: var(--bg-card);
    border: 1px solid var(--border-bright);
    border-radius: 4px;
    color: var(--accent);
    white-space: nowrap;
    animation: float 4s ease-in-out infinite;
  }
  .tag:nth-child(2) { animation-delay: 1s; }
  .tag:nth-child(3) { animation-delay: 2s; }
  .tag:nth-child(4) { animation-delay: 3s; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; }
    .about-visual { display: none; }
    .about-stats { flex-wrap: wrap; gap: 1.5rem; }
  }
</style>