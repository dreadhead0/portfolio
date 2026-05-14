<script>
  import { onMount } from "svelte";

  /** @type {HTMLElement | null} */
  let el = null;

  const profileImage = "/profile.jpeg";

  onMount(() => {
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && el) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
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
          Building interfaces<br />
          <span class="heading-accent">that behave.</span>
        </h2>
        <p>
          I am a frontend systems engineer focused on building interfaces that
          stay fast, predictable, and usable under real interaction pressure. I
          care about the parts users notice — motion, responsiveness, clarity —
          and the parts they do not: state flow, accessibility, performance
          budgets, and failure handling.
        </p>

        <p>
          My work sits between product polish and engineering discipline. I have
          built task systems, profile cards, invoice workflows, Chrome
          extensions, real-time dashboards, encrypted messaging flows,
          collaborative editors, and this SvelteKit portfolio as an interactive
          developer experience.
        </p>

        <p>
          The goal is simple: make frontend work feel engineered. Clean
          architecture, readable components, accessible controls, smooth
          transitions, and interfaces that do not collapse when the data,
          viewport, or user behavior gets messy.
        </p>

        <div class="about-stats">
          <div class="stat">
            <span class="stat-num">8+</span>
            <span class="stat-label">Stage Projects</span>
          </div>
          <div class="stat">
            <span class="stat-num">5</span>
            <span class="stat-label">Core Focus Areas</span>
          </div>
          <div class="stat">
            <span class="stat-num">0</span>
            <span class="stat-label">Console Warnings Goal</span>
          </div>
        </div>
      </div>

      <div class="about-visual" aria-hidden="true">
        <div class="avatar-wrap">
          <div class="avatar-ring"></div>
          <div class="avatar-inner">
            <img
              src={profileImage}
              alt="Portrait of dreadhead"
              class="profile-img"
            />
          </div>
        </div>
        <div class="floating-tags">
          <span class="tag" style="top:10%; left:-20%">Real-time UI</span>
          <span class="tag" style="top:30%; right:-20%">Accessibility</span>
          <span class="tag" style="bottom:25%; left:-15%">SvelteKit</span>
          <span class="tag" style="bottom:5%; right:-10%">Performance</span>
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
    font-family: "JetBrains Mono", monospace;
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
    font-family: "Syne", sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }
  .heading-accent {
    color: var(--accent);
  }

  .about-stats {
    display: flex;
    gap: 2.5rem;
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
  }
  .stat {
    display: flex;
    flex-direction: column;
  }
  .stat-num {
    font-family: "Syne", sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: var(--accent);
    line-height: 1;
  }
  .stat-label {
    font-family: "JetBrains Mono", monospace;
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
    content: "";
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
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .avatar-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--bg-card);
    border: 1px solid var(--border-bright);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-shadow: 0 0 40px var(--accent-glow);
    overflow: hidden;
  }

  .profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .floating-tags {
    position: absolute;
    inset: 0;
  }
  .tag {
    position: absolute;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    padding: 0.3rem 0.6rem;
    background: var(--bg-card);
    border: 1px solid var(--border-bright);
    border-radius: 4px;
    color: var(--accent);
    white-space: nowrap;
    animation: float 4s ease-in-out infinite;
  }
  .tag:nth-child(2) {
    animation-delay: 1s;
  }
  .tag:nth-child(3) {
    animation-delay: 2s;
  }
  .tag:nth-child(4) {
    animation-delay: 3s;
  }
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @media (max-width: 768px) {
    section {
      padding: 5.5rem 1rem;
      overflow: hidden;
    }

    .section-label {
      margin-bottom: 2rem;
    }

    .about-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .about-visual {
      display: flex;
      flex-direction: column;
      height: auto;
      order: -1;
      gap: 1.25rem;
      overflow: visible;
    }

    .avatar-wrap {
      width: 150px;
      height: 150px;
    }

    .floating-tags {
      position: static;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding-inline: 0.5rem;
    }

    .tag {
      position: static;
      font-size: 0.6rem;
      animation: none;
    }

    .about-text {
      text-align: left;
    }

    .about-text p {
      font-size: 0.98rem;
      line-height: 1.75;
    }

    .about-stats {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .stat {
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.025);
    }
  }
</style>
