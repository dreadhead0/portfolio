<script>
  import { onMount, tick } from "svelte";
  import { browser } from "$app/environment";

  const STORAGE_KEY = "portfolio-assistant-messages";

  let open = false;
  let input = "";
  let loading = false;
  let error = "";
  let toast = "";
  let showClearConfirm = false;

  /** @type {HTMLDivElement | null} */
  let messagesEl = null;

  /**
   * @typedef {"assistant" | "user"} MessageRole
   * @typedef {{ role: MessageRole; text: string }} ChatMessage
   */

  /** @type {ChatMessage} */
  const defaultMessage = {
    role: "assistant",
    text: "System online. Ask me about projects, real-time work, accessibility, performance, or why this portfolio is built this way.",
  };

  /** @type {ChatMessage[]} */
  let messages = [defaultMessage];

  const prompts = [
    "What should recruiters remember?",
    "Recommend a project to inspect",
    "Show real-time systems work",
    "Explain the portfolio architecture",
    "What proves accessibility focus?",
  ];

  onMount(() => {
    if (!browser) return;

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
          messages = parsed;
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  });

  $: if (browser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }

  async function scrollMessagesToBottom() {
    await tick();

    if (messagesEl) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }

  /** @param {string} message */
  function showToast(message) {
    toast = message;

    window.setTimeout(() => {
      toast = "";
    }, 2200);
  }

  /**
   * @param {string} text
   * @returns {{ type: "text" | "link"; value: string }[]}
   */
  function linkifyText(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text
      .split(urlRegex)
      .filter(Boolean)
      .map((part) => {
        const isLink = /^https?:\/\/[^\s]+$/.test(part);
        const cleaned = isLink ? part.replace(/[),.]+$/, "") : part;

        return {
          type: isLink ? "link" : "text",
          value: cleaned,
        };
      });
  }

  function requestClearChat() {
    showClearConfirm = true;
  }

  function cancelClearChat() {
    showClearConfirm = false;
  }

  function confirmClearChat() {
    messages = [defaultMessage];
    error = "";
    showClearConfirm = false;

    if (browser) {
      localStorage.removeItem(STORAGE_KEY);
    }

    showToast("Chat cleared");
  }

  async function sendMessage(text = input) {
    const message = text.trim();
    if (!message || loading) return;

    error = "";
    showClearConfirm = false;
    input = "";
    messages = [...messages, { role: "user", text: message }];
    loading = true;

    await scrollMessagesToBottom();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Assistant request failed.");
      }

      messages = [
        ...messages,
        {
          role: "assistant",
          text: data.reply,
        },
      ];

      await scrollMessagesToBottom();
    } catch (err) {
      error =
        err instanceof Error ? err.message : "The assistant failed to respond.";
    } finally {
      loading = false;
      await scrollMessagesToBottom();
    }
  }

  /** @param {KeyboardEvent} event */
  function handleInputKeydown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }

    if (event.key === "Escape") {
      if (showClearConfirm) {
        showClearConfirm = false;
      } else {
        open = false;
      }
    }
  }
</script>

<div class="assistant-root">
  {#if open}
    <section
      class="assistant-panel"
      aria-label="AI portfolio assistant"
      aria-live="polite"
    >
      <div class="assistant-header">
        <div>
          <p class="eyebrow">portfolio intelligence</p>
          <h2>Ask the system</h2>
        </div>

        <div class="header-actions">
          <button
            type="button"
            class="ghost-action"
            aria-label="Clear chat"
            on:click={requestClearChat}
          >
            clear
          </button>

          <button
            type="button"
            class="close-btn"
            aria-label="Close assistant"
            on:click={() => (open = false)}
          >
            ×
          </button>
        </div>
      </div>

      <p class="assistant-subtitle">
        Query projects, skills, architecture, performance, accessibility, and
        contact paths.
      </p>

      {#if toast}
        <div class="assistant-toast" role="status">
          {toast}
        </div>
      {/if}

      {#if showClearConfirm}
        <div
          class="clear-confirm"
          role="alertdialog"
          aria-label="Confirm clear chat"
        >
          <p>Clear this chat history?</p>
          <div class="confirm-actions">
            <button type="button" on:click={confirmClearChat}>Yes, clear</button
            >
            <button type="button" class="muted" on:click={cancelClearChat}
              >Cancel</button
            >
          </div>
        </div>
      {/if}

      <div class="prompt-chips" aria-label="Suggested prompts">
        {#each prompts as prompt}
          <button
            type="button"
            class="chip"
            on:click={() => sendMessage(prompt)}
            disabled={loading}
          >
            {prompt}
          </button>
        {/each}
      </div>

      <div
        class="messages"
        bind:this={messagesEl}
        aria-label="Assistant messages"
      >
        {#each messages as message}
          <div class="message {message.role}">
            <span class="message-prefix">
              {message.role === "assistant" ? "AI" : "YOU"}
            </span>
            <p>
              {#each linkifyText(message.text) as part}
                {#if part.type === "link"}
                  <a
                    href={part.value}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {part.value}
                  </a>
                {:else}
                  {part.value}
                {/if}
              {/each}
            </p>
          </div>
        {/each}

        {#if loading}
          <div class="message assistant loading-msg">
            <span class="message-prefix">AI</span>
            <p>
              Thinking<span class="dots"
                ><span>.</span><span>.</span><span>.</span></span
              >
            </p>
          </div>
        {/if}

        {#if error}
          <div class="error-box" role="alert">
            {error}
          </div>
        {/if}
      </div>

      <form
        class="assistant-form"
        on:submit|preventDefault={() => sendMessage()}
      >
        <label for="assistant-input" class="sr-only"
          >Ask the portfolio assistant</label
        >
        <textarea
          id="assistant-input"
          bind:value={input}
          on:keydown={handleInputKeydown}
          rows="2"
          placeholder="Ask about projects, performance, accessibility..."
          disabled={loading}
        ></textarea>

        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </section>
  {/if}

  <button
    type="button"
    class="assistant-orb"
    aria-label={open
      ? "Close AI portfolio assistant"
      : "Open AI portfolio assistant"}
    aria-expanded={open}
    on:click={() => (open = !open)}
  >
    <span class="orb-core">AI</span>
    <span class="orb-ring"></span>
  </button>
</div>

<style>
  .assistant-root {
    position: fixed;
    right: 1.25rem;
    bottom: 1.25rem;
    z-index: 120;
    font-family: "JetBrains Mono", monospace;
  }

  .assistant-orb {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 999px;
    border: 1px solid var(--border-bright);
    background: radial-gradient(
        circle at 30% 20%,
        rgba(255, 255, 255, 0.12),
        transparent 35%
      ),
      var(--bg-card);
    color: var(--accent);
    cursor: pointer;
    box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.45),
      0 0 28px var(--accent-glow);
    display: grid;
    place-items: center;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .assistant-orb:hover {
    transform: translateY(-2px) scale(1.03);
    border-color: var(--accent);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.55),
      0 0 36px var(--accent-glow);
  }

  .orb-core {
    position: relative;
    z-index: 2;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .orb-ring {
    position: absolute;
    inset: -5px;
    border-radius: inherit;
    border: 1px solid var(--border);
    animation: pulseRing 2.5s ease-in-out infinite;
  }

  @keyframes pulseRing {
    0%,
    100% {
      opacity: 0.35;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.08);
    }
  }

  .assistant-panel {
    position: absolute;
    right: 0;
    bottom: 4.75rem;
    width: min(420px, calc(100vw - 2rem));
    max-height: min(680px, calc(100vh - 7rem));
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--border-bright);
    border-radius: 18px;
    background: linear-gradient(135deg, var(--accent-glow), transparent 28%),
      rgba(12, 12, 12, 0.88);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow:
      0 28px 90px rgba(0, 0, 0, 0.65),
      0 0 50px var(--accent-glow);
  }

  .assistant-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1rem 0.75rem;
    border-bottom: 1px solid var(--border);
  }

  .eyebrow {
    margin: 0 0 0.25rem;
    color: var(--accent);
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .assistant-header h2 {
    margin: 0;
    color: var(--text-primary);
    font-family: "Syne", sans-serif;
    font-size: 1.25rem;
    letter-spacing: -0.03em;
  }

  .close-btn {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1;
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .close-btn:hover {
    color: var(--accent);
    border-color: var(--border-bright);
    background: var(--accent-glow);
  }

  .assistant-subtitle {
    margin: 0;
    padding: 0.85rem 1rem 0;
    color: var(--text-muted);
    font-family: "DM Sans", sans-serif;
    font-size: 0.86rem;
    line-height: 1.6;
  }

  .prompt-chips {
    display: flex;
    gap: 0.45rem;
    overflow-x: auto;
    padding: 0.9rem 1rem;
    min-height: 52px;
    flex-shrink: 0;
    border-bottom: 1px solid var(--border);
    scrollbar-width: none;
  }

  .prompt-chips::-webkit-scrollbar {
    display: none;
  }

  .chip {
    flex: 0 0 auto;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-muted);
    padding: 0.4rem 0.65rem;
    font: inherit;
    font-size: 0.68rem;
    cursor: pointer;
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .chip:hover:not(:disabled) {
    color: var(--accent);
    border-color: var(--border-bright);
    background: var(--accent-glow);
  }

  .chip:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .messages {
    flex: 1;
    min-height: 220px;
    max-height: 310px;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .message {
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
  }

  .message.user {
    margin-left: 2rem;
    border-color: var(--border-bright);
    background: var(--accent-glow);
  }

  .message.assistant {
    margin-right: 2rem;
  }

  .message-prefix {
    display: block;
    margin-bottom: 0.35rem;
    color: var(--accent);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
  }

  .message p a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid var(--border-bright);
    word-break: break-all;
  }

  .message p a:hover {
    background: var(--accent-glow);
  }

  .message p {
    margin: 0;
    color: var(--text-primary);
    font-family: "DM Sans", sans-serif;
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .error-box {
    border: 1px solid rgba(239, 68, 68, 0.5);
    border-radius: 12px;
    padding: 0.75rem;
    color: #fecaca;
    background: rgba(239, 68, 68, 0.12);
    font-family: "DM Sans", sans-serif;
    font-size: 0.86rem;
  }

  .assistant-form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.65rem;
    padding: 1rem;
    border-top: 1px solid var(--border);
    background: rgba(0, 0, 0, 0.18);
  }

  .assistant-form textarea {
    min-height: 44px;
    max-height: 110px;
    resize: vertical;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--bg-secondary);
    color: var(--text-primary);
    padding: 0.75rem;
    font-family: "DM Sans", sans-serif;
    font-size: 0.9rem;
    line-height: 1.4;
    outline: none;
  }

  .assistant-form textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  .assistant-form button {
    align-self: end;
    border: none;
    border-radius: 12px;
    background: var(--accent);
    color: #050505;
    padding: 0 0.95rem;
    min-height: 44px;
    font: inherit;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      opacity 0.2s ease;
  }

  .assistant-form button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 0 24px var(--accent-glow);
  }

  .assistant-form button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .dots span {
    animation: dotBlink 1s step-end infinite;
  }

  .dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes dotBlink {
    50% {
      opacity: 0;
    }
  }

  @media (max-width: 520px) {
    .assistant-root {
      right: 1rem;
      bottom: 1rem;
    }

    .assistant-panel {
      position: fixed;
      left: 1rem;
      right: 1rem;
      bottom: 5rem;
      width: auto;
      max-height: calc(100vh - 7rem);
    }

    .messages {
      min-height: 190px;
      max-height: 280px;
    }

    .message.user,
    .message.assistant {
      margin-left: 0;
      margin-right: 0;
    }

    .assistant-form {
      grid-template-columns: 1fr;
    }

    .assistant-form button {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .orb-ring,
    .dots span {
      animation: none;
    }

    .assistant-orb,
    .chip,
    .close-btn,
    .assistant-form button {
      transition: none;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .ghost-action {
    height: 32px;
    padding: 0 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-muted);
    cursor: pointer;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .ghost-action:hover {
    color: var(--accent);
    border-color: var(--border-bright);
    background: var(--accent-glow);
  }

  .assistant-toast {
    margin: 0.75rem 1rem 0;
    padding: 0.65rem 0.8rem;
    border: 1px solid var(--border-bright);
    border-radius: 12px;
    background: var(--accent-glow);
    color: var(--accent);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
  }

  .clear-confirm {
    margin: 0.75rem 1rem 0;
    padding: 0.8rem;
    border: 1px solid rgba(239, 68, 68, 0.42);
    border-radius: 14px;
    background: rgba(239, 68, 68, 0.12);
  }

  .clear-confirm p {
    margin: 0 0 0.65rem;
    color: var(--text-primary);
    font-family: "DM Sans", sans-serif;
    font-size: 0.9rem;
  }

  .confirm-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .confirm-actions button {
    border: 1px solid var(--border-bright);
    border-radius: 999px;
    background: var(--accent);
    color: #050505;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    font-weight: 700;
  }

  .confirm-actions button.muted {
    background: transparent;
    color: var(--text-muted);
    border-color: var(--border);
  }

  .confirm-actions button:hover {
    box-shadow: 0 0 16px var(--accent-glow);
  }
</style>
