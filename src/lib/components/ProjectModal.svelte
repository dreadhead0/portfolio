<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let project;

  const dispatch = createEventDispatcher();

  let imageFailed = false;
  let imagePreviewOpen = false;

  /** @type {Record<string, string>} */
  const visualLabels = {
    security: "encrypted channel",
    task: "stateful task flow",
    profile: "semantic profile UI",
    invoice: "invoice workflow",
    pwa: "habit grid",
    extension: "browser extension",
    dashboard: "real-time dashboard",
    terminal: "system terminal",
  };

  $: hasLiveDemo = Boolean(project.link && project.liveStatus === "live");

  function close() {
    dispatch("close");
  }

  /** @param {KeyboardEvent} event */
  function handleKeydown(event) {
    if (event.key === "Escape") {
      close();
    }
  }

  onMount(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<div class="modal-backdrop" role="presentation">
  <button
    type="button"
    class="backdrop-close"
    aria-label="Close case study"
    on:click={close}
  ></button>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="project-modal-title"
  >
    <button
      type="button"
      class="close-btn"
      aria-label="Close case study"
      on:click={close}
    >
      ×
    </button>

    <div class="visual-shell">
      {#if project.image && !imageFailed}
        <button
          type="button"
          class="image-preview-btn"
          aria-label="Open full screenshot for {project.title}"
          on:click={() => (imagePreviewOpen = true)}
        >
          <img
            src={project.image}
            alt="Screenshot of {project.title}"
            class="project-image"
            loading="lazy"
            on:error={() => (imageFailed = true)}
          />
          <span class="image-hint">Click to expand</span>
        </button>
      {:else}
        <div class="visual-placeholder visual-{project.visual}">
          <div class="preview-topbar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="preview-body">
            <p class="preview-label">
              {visualLabels[project.visual] || "project preview"}
            </p>

            {#if project.visual === "dashboard"}
              <div class="fake-chart">
                <i></i><i></i><i></i><i></i><i></i>
              </div>
            {:else if project.visual === "task"}
              <div class="fake-task">
                <span></span>
                <div>
                  <strong>Interactive todo</strong>
                  <small>status · priority · due time</small>
                </div>
              </div>
            {:else if project.visual === "profile"}
              <div class="fake-profile">
                <span></span>
                <div>
                  <strong>Profile Card</strong>
                  <small>semantic · responsive · testable</small>
                </div>
              </div>
            {:else if project.visual === "security"}
              <div class="fake-security">
                <span>encrypted_payload</span>
                <code>AES-GCM / RSA-OAEP</code>
              </div>
            {:else}
              <div class="fake-terminal">
                <code>$ open {project.title.toLowerCase()}</code>
                <code>status: {project.status}</code>
                <code>type: {project.type}</code>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <div class="modal-content">
      <p class="case-index">
        CASE / {String(project.id).padStart(2, "0")}
      </p>
      <div class="modal-kicker">
        <span>{project.category}</span>
        <span>{project.type}</span>
        <span>{project.year}</span>
      </div>

      <h2 id="project-modal-title">{project.title}</h2>
      <p class="modal-desc">{project.description}</p>

      <div class="case-grid">
        <section>
          <h3>Problem</h3>
          <p>
            {project.problem ||
              "This project focused on translating strict product and technical requirements into a polished, testable interface."}
          </p>
        </section>

        <section>
          <h3>Build</h3>
          <p>{project.build || project.longDesc}</p>
        </section>

        <section>
          <h3>Impact</h3>
          <p>
            {project.impact ||
              "Demonstrates frontend engineering judgment across interaction design, accessibility, responsive layout, and reliable state behavior."}
          </p>
        </section>
      </div>

      <div class="tech-list" aria-label="Technologies used">
        {#each project.tech as item}
          <span>{item}</span>
        {/each}
      </div>

      <div class="modal-actions">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          class="modal-link"
        >
          GitHub repository →
        </a>

        {#if hasLiveDemo}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            class="modal-link primary"
          >
            Live demo →
          </a>
        {:else}
          <span class="demo-disabled">Live demo coming soon</span>
        {/if}
      </div>
    </div>
  </div>
  {#if imagePreviewOpen}
    <div class="screenshot-modal" role="presentation">
      <button
        type="button"
        class="screenshot-backdrop"
        aria-label="Close screenshot preview"
        on:click={() => (imagePreviewOpen = false)}
      ></button>

      <div
        class="screenshot-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Full screenshot preview"
      >
        <button
          type="button"
          class="screenshot-close"
          aria-label="Close screenshot preview"
          on:click={() => (imagePreviewOpen = false)}
        >
          ×
        </button>

        <img src={project.image} alt="Full screenshot of {project.title}" />
      </div>
    </div>
  {/if}
</div>

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    background: radial-gradient(
        circle at 50% 20%,
        var(--accent-glow),
        transparent 34%
      ),
      rgba(0, 0, 0, 0.78);
    backdrop-filter: blur(18px);
    animation: backdropIn 0.22s ease;
  }

  .case-index {
    margin: 0 0 0.75rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.7rem;
    color: var(--accent);
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .backdrop-close {
    position: absolute;
    inset: 0;
    border: 0;
    background: transparent;
    cursor: default;
  }

  .modal {
    position: relative;
    width: min(1040px, 100%);
    height: min(86vh, 820px);
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    overflow: hidden;
    border: 1px solid var(--border-bright);
    border-radius: 24px;
    background: linear-gradient(135deg, var(--accent-glow), transparent 30%),
      var(--bg-card);
    box-shadow:
      0 30px 120px rgba(0, 0, 0, 0.72),
      0 0 70px var(--accent-glow);
    animation: modalIn 0.26s ease;
  }

  @keyframes backdropIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 3;
    width: 38px;
    height: 38px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(0, 0, 0, 0.35);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1.4rem;
    line-height: 1;
    transition:
      color 0.2s,
      border-color 0.2s,
      background 0.2s;
  }

  .close-btn:hover {
    color: var(--accent);
    border-color: var(--border-bright);
    background: var(--accent-glow);
  }

  .visual-shell {
    min-height: 520px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent),
      #090909;
    border-right: 1px solid var(--border);
    display: grid;
    place-items: center;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .visual-shell::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 30%,
      var(--accent-glow),
      transparent 45%
    );
    pointer-events: none;
  }

  .project-image,
  .visual-placeholder {
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 18px;
    border: 1px solid var(--border-bright);
    object-fit: cover;
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.55);
  }

  .visual-placeholder {
    overflow: hidden;
    background: linear-gradient(135deg, var(--accent-glow), transparent 45%),
      repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.025),
        rgba(255, 255, 255, 0.025) 1px,
        transparent 1px,
        transparent 6px
      ),
      #0d0d0d;
  }

  .image-preview-btn {
    position: relative;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: zoom-in;
    border-radius: 18px;
  }

  .image-preview-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  .image-hint {
    position: absolute;
    right: 0.75rem;
    bottom: 0.75rem;
    padding: 0.35rem 0.6rem;
    border: 1px solid var(--border-bright);
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.55);
    color: var(--accent);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.65rem;
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  .image-preview-btn:hover .image-hint,
  .image-preview-btn:focus-visible .image-hint {
    opacity: 1;
    transform: translateY(0);
  }

  .screenshot-modal {
    position: fixed;
    inset: 0;
    z-index: 300;
    display: grid;
    place-items: center;
    padding: 1.5rem;
  }

  .screenshot-backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: radial-gradient(
        circle at center,
        var(--accent-glow),
        transparent 38%
      ),
      rgba(0, 0, 0, 0.88);
    backdrop-filter: blur(18px);
    cursor: zoom-out;
  }

  .screenshot-dialog {
    position: relative;
    width: min(1100px, 94vw);
    max-height: 88vh;
    border: 1px solid var(--border-bright);
    border-radius: 22px;
    overflow: hidden;
    background: var(--bg-card);
    box-shadow:
      0 30px 120px rgba(0, 0, 0, 0.75),
      0 0 70px var(--accent-glow);
  }

  .screenshot-dialog img {
    display: block;
    width: 100%;
    max-height: 88vh;
    object-fit: contain;
    background: #050505;
  }

  .screenshot-close {
    position: absolute;
    top: 0.85rem;
    right: 0.85rem;
    z-index: 2;
    width: 38px;
    height: 38px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(0, 0, 0, 0.5);
    color: var(--text-primary);
    cursor: pointer;
    font-size: 1.3rem;
  }

  .screenshot-close:hover {
    color: var(--accent);
    border-color: var(--border-bright);
    background: var(--accent-glow);
  }

  @media (max-width: 520px) {
    .screenshot-modal {
      padding: 0.75rem;
    }

    .screenshot-dialog {
      width: 96vw;
      border-radius: 16px;
    }

    .image-hint {
      opacity: 1;
      transform: none;
    }
  }

  .preview-topbar {
    display: flex;
    gap: 0.45rem;
    padding: 0.85rem;
    border-bottom: 1px solid var(--border);
  }

  .preview-topbar span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .preview-topbar span:nth-child(1) {
    background: #ff5f57;
  }
  .preview-topbar span:nth-child(2) {
    background: #febc2e;
  }
  .preview-topbar span:nth-child(3) {
    background: #28c840;
  }

  .preview-body {
    padding: 1.25rem;
  }

  .preview-label {
    margin: 0 0 1.2rem;
    color: var(--accent);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .fake-chart {
    display: flex;
    align-items: end;
    gap: 0.7rem;
    height: 180px;
  }

  .fake-chart i {
    flex: 1;
    border-radius: 999px 999px 0 0;
    background: linear-gradient(to top, var(--accent), transparent);
    box-shadow: 0 0 20px var(--accent-glow);
  }

  .fake-chart i:nth-child(1) {
    height: 42%;
  }
  .fake-chart i:nth-child(2) {
    height: 74%;
  }
  .fake-chart i:nth-child(3) {
    height: 58%;
  }
  .fake-chart i:nth-child(4) {
    height: 86%;
  }
  .fake-chart i:nth-child(5) {
    height: 63%;
  }

  .fake-task,
  .fake-profile {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.035);
  }

  .fake-task > span {
    width: 20px;
    height: 20px;
    border: 2px solid var(--accent);
    border-radius: 6px;
  }

  .fake-profile > span {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: var(--accent-glow);
    border: 1px solid var(--border-bright);
  }

  .fake-task strong,
  .fake-profile strong {
    display: block;
    color: var(--text-primary);
  }

  .fake-task small,
  .fake-profile small {
    color: var(--text-muted);
  }

  .fake-security,
  .fake-terminal {
    display: grid;
    gap: 0.65rem;
    font-family: "JetBrains Mono", monospace;
    color: var(--text-muted);
  }

  .fake-security span,
  .fake-security code,
  .fake-terminal code {
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.035);
  }

  .modal-content {
    min-height: 0;
    overflow-y: auto;
    padding: 2.5rem;

    scrollbar-width: thin;
    scrollbar-color: var(--accent) rgba(255, 255, 255, 0.04);
  }

  .modal-content::-webkit-scrollbar {
    width: 8px;
  }

  .modal-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.035);
  }

  .modal-content::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 999px;
    border: 2px solid var(--bg-card);
  }

  .modal-kicker {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-bottom: 1rem;
  }

  .modal-kicker span,
  .tech-list span {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    color: var(--accent);
    border: 1px solid var(--border-bright);
    background: var(--accent-glow);
    border-radius: 999px;
    padding: 0.32rem 0.62rem;
  }

  h2 {
    font-family: "Syne", sans-serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 1;
    letter-spacing: -0.05em;
    margin: 0 0 1rem;
    max-width: 720px;
    color: var(--text-primary);
  }

  .modal-desc {
    color: var(--text-muted);
    line-height: 1.7;
    font-size: 1rem;
  }

  .case-grid {
    display: grid;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .case-grid section {
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.025);
  }

  .case-grid h3 {
    margin: 0 0 0.5rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .case-grid p {
    margin: 0;
    color: var(--text-muted);
    line-height: 1.65;
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin: 1.5rem 0;
  }

  .modal-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }

  .modal-link,
  .demo-disabled {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.78rem;
    text-decoration: none;
  }

  .modal-link {
    color: var(--text-muted);
  }

  .modal-link:hover {
    color: var(--accent);
  }

  .modal-link.primary {
    color: #050505;
    background: var(--accent);
    border-radius: 999px;
    padding: 0.65rem 1rem;
    font-weight: 700;
  }

  .demo-disabled {
    color: var(--text-muted);
    opacity: 0.7;
  }

  @media (max-width: 820px) {
    .modal-backdrop {
      padding: 1rem;
      place-items: start center;
      overflow-y: auto;
    }

    .modal {
      grid-template-columns: 1fr;
      width: 100%;
      height: auto;
      max-height: none;
      margin-block: 1rem;
    }

    .visual-shell {
      min-height: auto;
      padding: 1rem;
      border-right: none;
      border-bottom: 1px solid var(--border);
    }

    .image-preview-btn,
    .project-image,
    .visual-placeholder {
      width: 100%;
    }

    .project-image,
    .visual-placeholder {
      aspect-ratio: 16 / 10;
      object-fit: cover;
    }

    .modal-content {
      min-height: 0;
      max-height: none;
      overflow: visible;
      padding: 1.35rem;
    }
  }

  @media (max-width: 520px) {
    .modal-backdrop {
      padding: 0.75rem;
    }

    .modal {
      border-radius: 18px;
    }

    .visual-shell {
      padding: 0.75rem;
    }

    .project-image,
    .visual-placeholder {
      border-radius: 14px;
    }

    h2 {
      font-size: clamp(1.9rem, 11vw, 2.6rem);
    }

    .modal-actions {
      align-items: stretch;
      flex-direction: column;
    }

    .modal-link.primary,
    .modal-link,
    .demo-disabled {
      width: 100%;
      text-align: center;
    }
  }
  @media (max-width: 520px) {
    .modal-backdrop {
      padding: 0.75rem;
      align-items: start;
      overflow-y: auto;
    }

    .modal {
      border-radius: 18px;
      max-height: none;
      height: auto;
      min-height: auto;
    }

    .visual-shell {
      display: grid;
      min-height: auto;
      padding: 0.75rem;
    }

    .project-image,
    .visual-placeholder {
      aspect-ratio: 16 / 10;
      border-radius: 14px;
    }

    .modal-content {
      padding: 1.2rem;
      max-height: none;
      overflow: visible;
    }
  }

  @media (max-width: 520px) {
    .screenshot-modal {
      padding: 0.75rem;
      place-items: center;
    }

    .screenshot-dialog {
      width: 100%;
      max-width: 100%;
      max-height: 86vh;
      border-radius: 16px;
    }

    .screenshot-dialog img {
      max-height: 86vh;
      object-fit: contain;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .modal,
    .modal-backdrop {
      animation: none;
    }
  }
</style>
