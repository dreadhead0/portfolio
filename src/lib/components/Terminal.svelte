<script>
  import { onMount, tick } from "svelte";

  /** @type {HTMLElement | null} */
  let el = null;

  /** @type {HTMLInputElement | null} */
  let inputEl = null;

  /** @type {HTMLDivElement | null} */
  let outputEl = null;
  /**
   * @typedef {"prompt" | "info" | "cmd" | "output" | "success" | "error"} LineType
   * @typedef {{ type: LineType, text: string }} TerminalLine
   */

  let input = "";

  /** @type {TerminalLine[]} */
  let lines = [];

  let historyIdx = -1;

  /** @type {string[]} */
  let cmdHistory = [];

  let started = false;

  const PROMPT = "dreadhead@portfolio:~$ ";

  /** @type {Record<string, () => TerminalLine[]>} */
  const COMMANDS = {
    help: () => [
      { type: "cmd", text: "  whoami       — identity + focus" },
      { type: "cmd", text: "  skills       — engineering toolkit" },
      { type: "cmd", text: "  projects     — shipped stage work" },
      { type: "cmd", text: "  focus        — what recruiters should remember" },
      { type: "cmd", text: "  contact      — transmission channels" },
      { type: "cmd", text: "  resume       — download resume" },
      { type: "cmd", text: "  clear        — clear terminal" },
      { type: "cmd", text: "  easter-egg   — classified" },
      { type: "cmd", text: "  exit         — close terminal" },
    ],
    whoami: () => [
      { type: "output", text: "Frontend Systems Engineer" },
      {
        type: "output",
        text: "Specializing in: real-time systems, frontend architecture, performance, accessibility, UI polish",
      },
      {
        type: "output",
        text: "Currently: building interactive portfolio systems with SvelteKit",
      },
      {
        type: "output",
        text: "Mode: clean UI / terminal energy / production mindset",
      },
    ],
    skills: () => [
      { type: "info", text: "── Engineering Toolkit ─────────────────" },
      {
        type: "output",
        text: "Languages  : JavaScript · TypeScript · Solidity",
      },
      {
        type: "output",
        text: "Frontend   : SvelteKit · Vue · React · Next.js · TailwindCSS",
      },
      {
        type: "output",
        text: "Systems    : Real-time UI · PWA · Chrome Extensions · E2EE flows",
      },
      {
        type: "output",
        text: "Quality    : Accessibility · Performance · Testing · Responsive UI",
      },
      { type: "info", text: "───────────────────────────────────────" },
    ],
    projects: () => [
      { type: "info", text: "drwxr-xr-x  stage-work/" },
      {
        type: "output",
        text: "-rw-r--r--  E2EE Messaging App         [encrypted messaging]",
      },
      {
        type: "output",
        text: "-rw-r--r--  Todo Card                  [stateful accessible UI]",
      },
      {
        type: "output",
        text: "-rw-r--r--  Profile Card               [Responsive accessible UI]",
      },
      {
        type: "output",
        text: "-rw-r--r--  Invoice Management App     [React CRUD workflow]",
      },
      {
        type: "output",
        text: "-rw-r--r--  Habit Tracker PWA          [spec-driven app]",
      },
      {
        type: "output",
        text: "-rw-r--r--  AI Page Summarizer         [Chrome extension]",
      },

      {
        type: "output",
        text: "-rw-r--r--  Data Visualization Platform   [real-time dashboard]",
      },
      {
        type: "output",
        text: "-rw-r--r--  Interactive Developer Portfolio    [An immersive portfolio]",
      },
    ],
    focus: () => [
      { type: "info", text: "Recruiter memory targets:" },
      { type: "success", text: "✓ Real-time systems" },
      { type: "success", text: "✓ Frontend architecture" },
      { type: "success", text: "✓ Performance optimization" },
      { type: "success", text: "✓ UI polish" },
      { type: "success", text: "✓ Accessibility" },
    ],
    contact: () => [
      { type: "info", text: "Transmission Channels" },
      { type: "output", text: "Email    : your.email@example.com" },
      { type: "output", text: "GitHub   : github.com/your-username" },
      { type: "output", text: "LinkedIn : linkedin.com/in/your-profile" },
    ],
    resume: () => [
      { type: "output", text: "Initiating download..." },
      {
        type: "success",
        text: "✓ resume.pdf ready — check your downloads folder",
      },
    ],
    "easter-egg": () => [
      { type: "success", text: "🥚 You found it!" },
      { type: "output", text: "" },
      { type: "output", text: "    ██████╗ ███████╗██╗   ██╗" },
      { type: "output", text: "    ██╔══██╗██╔════╝██║   ██║" },
      { type: "output", text: "    ██║  ██║█████╗  ██║   ██║" },
      { type: "output", text: "    ██║  ██║██╔══╝  ╚██╗ ██╔╝" },
      { type: "output", text: "    ██████╔╝███████╗ ╚████╔╝ " },
      { type: "output", text: "    ╚═════╝ ╚══════╝  ╚═══╝  " },
      { type: "output", text: "" },
      { type: "info", text: "Thanks for poking around 🙂 — hire me!" },
    ],
    clear: () => {
      lines = [];
      return [];
    },
    exit: () => {
      started = false;
      return [];
    },
  };

  /** @param {TerminalLine[]} newLines */
  function pushLines(newLines) {
    lines = [...lines, ...newLines];
  }

  /** @param {string} cmd */
  async function runCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    lines = [...lines, { type: "prompt", text: PROMPT + cmd }];

    if (trimmed === "") {
      // noop
    } else if (COMMANDS[trimmed]) {
      const result = COMMANDS[trimmed]();
      if (result && result.length > 0) pushLines(result);
    } else {
      pushLines([
        {
          type: "error",
          text: `bash: ${trimmed}: command not found. Type 'help' for available commands.`,
        },
      ]);
    }

    input = "";
    historyIdx = -1;
    await tick();
    if (outputEl) outputEl.scrollTop = outputEl.scrollHeight;
  }

  /** @param {KeyboardEvent} e */
  function handleKeydown(e) {
    if (e.key === "Enter") {
      if (input.trim()) cmdHistory = [input, ...cmdHistory.slice(0, 49)];
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      historyIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[historyIdx]) input = cmdHistory[historyIdx];
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      historyIdx = Math.max(historyIdx - 1, -1);
      input = historyIdx >= 0 ? cmdHistory[historyIdx] : "";
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(input));
      if (match) input = match;
    }
  }

  async function startTerminal() {
    started = true;
    lines = [];
    await tick();
    pushLines([
      { type: "info", text: "╔════════════════════════════════════════╗" },
      { type: "info", text: "║   alex@portfolio — interactive shell   ║" },
      { type: "info", text: "╚════════════════════════════════════════╝" },
      { type: "output", text: "Type 'help' for available commands." },
      { type: "output", text: "" },
    ]);
    await tick();
    inputEl?.focus();
  }

  onMount(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (el) {
      obs.observe(el);
    }
    return () => obs.disconnect();
  });
</script>

<section id="terminal" aria-label="Interactive terminal">
  <div class="terminal-section" bind:this={el}>
    <div class="section-label">
      <span class="label-line"></span>
      <span class="label-text">terminal.sh</span>
    </div>
    <h2 class="section-heading">
      Try the <span class="heading-accent">terminal.</span>
    </h2>
    <p class="terminal-desc">
      An interactive shell to explore my portfolio. Type <code>help</code> to start.
    </p>

    <div class="terminal-wrap" aria-label="Interactive portfolio terminal">
      <div class="term-titlebar" aria-hidden="true">
        <div class="term-dots">
          <span class="tdot r"></span>
          <span class="tdot y"></span>
          <span class="tdot g"></span>
        </div>
        <span class="term-title">dreadhead@portfolio: ~</span>
        <span></span>
      </div>

      {#if !started}
        <div class="term-splash">
          <p class="splash-text">
            <span class="splash-icon" aria-hidden="true">&gt;_</span>
            Interactive Terminal
          </p>
          <p class="splash-sub">Navigate the portfolio like a system shell</p>
          <button class="splash-btn" on:click={startTerminal}>
            System Terminal
          </button>
        </div>
      {:else}
        <div class="term-body">
          <div
            class="term-output"
            bind:this={outputEl}
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
          >
            {#each lines as line}
              <div class="term-line line-{line.type}">{line.text}</div>
            {/each}
          </div>
          <div class="term-input-row">
            <span class="term-prompt" aria-hidden="true">{PROMPT}</span>
            <input
              bind:this={inputEl}
              bind:value={input}
              on:keydown={handleKeydown}
              class="term-input"
              aria-label="Terminal input"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              type="text"
            />
          </div>
        </div>
      {/if}
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
    margin-bottom: 0.75rem;
  }
  .heading-accent {
    color: var(--accent);
  }
  .terminal-desc {
    color: var(--text-muted);
    font-size: 0.95rem;
    margin-bottom: 2.5rem;
  }
  .terminal-desc code {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.85em;
    color: var(--accent);
    background: var(--accent-glow);
    padding: 0.1em 0.35em;
    border-radius: 3px;
  }

  .terminal-wrap {
    border: 1px solid var(--border-bright);
    border-radius: 10px;
    overflow: hidden;
    box-shadow:
      0 24px 60px rgba(0, 0, 0, 0.5),
      0 0 40px var(--accent-glow);
    max-width: 800px;
  }
  .term-titlebar {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    padding: 0.65rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid var(--border);
  }
  .term-dots {
    display: flex;
    gap: 0.4rem;
  }
  .tdot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .tdot.r {
    background: #ff5f57;
  }
  .tdot.y {
    background: #febc2e;
  }
  .tdot.g {
    background: #28c840;
  }
  .term-title {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    color: var(--text-muted);
    text-align: center;
  }

  .term-splash {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background: var(--bg-card);
    gap: 1rem;
  }
  .splash-text {
    font-family: "JetBrains Mono", monospace;
    font-size: 1.25rem;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0;
  }
  .splash-icon {
    font-size: 1.75rem;
    font-weight: 700;
  }
  .splash-sub {
    font-family: "DM Sans", sans-serif;
    font-size: 0.875rem;
    color: var(--text-muted);
    margin: 0;
  }
  .splash-btn {
    margin-top: 0.5rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    padding: 0.6rem 1.5rem;
    background: var(--accent);
    color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition:
      box-shadow 0.2s,
      transform 0.2s;
  }
  .splash-btn:hover {
    box-shadow: 0 0 20px var(--accent-glow);
    transform: translateY(-1px);
  }

  .term-body {
    background: #0d0d0d;
    display: flex;
    flex-direction: column;
    min-height: 340px;
    max-height: 440px;
  }
  .term-output {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 1.25rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    line-height: 1.7;

    scrollbar-width: thin;
    scrollbar-color: var(--accent) rgba(255, 255, 255, 0.04);
  }

  .term-output::-webkit-scrollbar {
    width: 8px;
  }

  .term-output::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.035);
    border-left: 1px solid var(--border);
  }

  .term-output::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      var(--accent),
      color-mix(in srgb, var(--accent) 45%, transparent)
    );
    border-radius: 999px;
    border: 2px solid #0d0d0d;
  }

  .term-output::-webkit-scrollbar-thumb:hover {
    background: var(--accent);
  }
  .term-line {
    white-space: pre-wrap;
    word-break: break-all;
  }
  .line-prompt {
    color: var(--accent);
  }
  .line-output {
    color: #a3a3a3;
  }
  .line-info {
    color: #6366f1;
  }
  .line-success {
    color: #10b981;
  }
  .line-error {
    color: #ef4444;
  }
  .line-cmd {
    color: #60a5fa;
  }

  .term-input-row {
    display: flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.02);
  }
  .term-prompt {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    color: var(--accent);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .term-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    color: var(--text-primary);
    caret-color: var(--accent);
    padding-left: 0.25rem;
  }
</style>
