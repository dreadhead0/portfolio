<script>
  import { onMount } from 'svelte';

  let el;
  let name = '', email = '', message = '';
  let errors = {};
  let status = 'idle'; // idle | sending | success | error

  onMount(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });

  function validate() {
    errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email';
    if (!message.trim()) errors.message = 'Message is required';
    else if (message.trim().length < 10) errors.message = 'Message too short';
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    status = 'sending';
    // Simulated send — replace with actual integration (e.g. Resend, EmailJS)
    await new Promise(r => setTimeout(r, 1500));
    status = 'success';
    name = ''; email = ''; message = '';
  }
</script>

<section id="contact" aria-label="Contact">
  <div class="contact-inner reveal" bind:this={el}>
    <div class="section-label">
      <span class="label-line"></span>
      <span class="label-text">contact.sh</span>
    </div>

    <div class="contact-grid">
      <div class="contact-left">
        <h2 class="section-heading">
          Let's build<br/>
          <span class="heading-accent">something.</span>
        </h2>
        <p class="contact-sub">
          Open to full-time roles, freelance projects, and interesting collaborations.
          If you have something exciting, I'd love to hear about it.
        </p>

        <div class="contact-details">
          <a href="mailto:alex@example.com" class="contact-item">
            <span class="item-icon" aria-hidden="true">@</span>
            <span>alex@example.com</span>
          </a>
          <a href="https://github.com/alexdev" target="_blank" rel="noopener noreferrer" class="contact-item">
            <span class="item-icon" aria-hidden="true">GH</span>
            <span>github.com/alexdev</span>
          </a>
          <a href="https://linkedin.com/in/alexdev" target="_blank" rel="noopener noreferrer" class="contact-item">
            <span class="item-icon" aria-hidden="true">LI</span>
            <span>linkedin.com/in/alexdev</span>
          </a>
        </div>
      </div>

      <div class="contact-form-wrap">
        {#if status === 'success'}
          <div class="success-msg" role="alert">
            <span class="success-icon" aria-hidden="true">✓</span>
            <strong>Message sent!</strong>
            <p>I'll get back to you within 24 hours.</p>
            <button class="send-again" on:click={() => status = 'idle'}>Send another</button>
          </div>
        {:else}
          <div class="contact-form" role="form" aria-label="Contact form">
            <div class="field">
              <label for="name" class="field-label">
                <span class="field-prefix" aria-hidden="true">$</span> name
              </label>
              <input
                id="name"
                type="text"
                bind:value={name}
                class="field-input"
                class:invalid={errors.name}
                placeholder="Your name"
                autocomplete="name"
                aria-required="true"
                aria-describedby={errors.name ? 'name-err' : undefined}
              />
              {#if errors.name}
                <span id="name-err" class="field-error" role="alert">{errors.name}</span>
              {/if}
            </div>

            <div class="field">
              <label for="email" class="field-label">
                <span class="field-prefix" aria-hidden="true">$</span> email
              </label>
              <input
                id="email"
                type="email"
                bind:value={email}
                class="field-input"
                class:invalid={errors.email}
                placeholder="you@company.com"
                autocomplete="email"
                aria-required="true"
                aria-describedby={errors.email ? 'email-err' : undefined}
              />
              {#if errors.email}
                <span id="email-err" class="field-error" role="alert">{errors.email}</span>
              {/if}
            </div>

            <div class="field">
              <label for="message" class="field-label">
                <span class="field-prefix" aria-hidden="true">$</span> message
              </label>
              <textarea
                id="message"
                bind:value={message}
                class="field-input field-textarea"
                class:invalid={errors.message}
                placeholder="Tell me about your project..."
                rows="5"
                aria-required="true"
                aria-describedby={errors.message ? 'msg-err' : undefined}
              ></textarea>
              {#if errors.message}
                <span id="msg-err" class="field-error" role="alert">{errors.message}</span>
              {/if}
            </div>

            <button
              class="submit-btn"
              on:click={handleSubmit}
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              {#if status === 'sending'}
                <span class="sending-dots" aria-label="Sending...">
                  <span>.</span><span>.</span><span>.</span>
                </span>
                Sending
              {:else}
                Send message →
              {/if}
            </button>
          </div>
        {/if}
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
  .label-line { display: block; width: 40px; height: 1px; background: var(--accent); }
  .label-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
  }

  .section-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    line-height: 1.1;
    margin-bottom: 1.25rem;
  }
  .heading-accent { color: var(--accent); }

  .contact-sub {
    color: var(--text-muted);
    line-height: 1.8;
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }

  .contact-details { display: flex; flex-direction: column; gap: 0.75rem; }
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg-card);
    transition: border-color 0.2s, background 0.2s, color 0.2s;
  }
  .contact-item:hover {
    border-color: var(--border-bright);
    background: var(--accent-glow);
    color: var(--accent);
  }
  .item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 1px solid var(--border-bright);
    border-radius: 4px;
    font-size: 0.65rem;
    color: var(--accent);
    flex-shrink: 0;
  }

  .contact-form-wrap {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 2rem;
  }
  .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }

  .field { display: flex; flex-direction: column; gap: 0.4rem; }
  .field-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    text-transform: lowercase;
    letter-spacing: 0.04em;
  }
  .field-prefix { color: var(--accent); }
  .field-input {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.65rem 0.875rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem;
    color: var(--text-primary);
    transition: border-color 0.2s, box-shadow 0.2s;
    resize: none;
    width: 100%;
  }
  .field-input::placeholder { color: var(--text-muted); opacity: 0.6; }
  .field-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
    outline: none;
  }
  .field-input.invalid { border-color: #ef4444; }
  .field-textarea { min-height: 120px; line-height: 1.6; }
  .field-error {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    color: #ef4444;
  }

  .submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--accent);
    color: #000;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.2s, opacity 0.2s;
    align-self: flex-start;
  }
  .submit-btn:hover:not(:disabled) {
    box-shadow: 0 0 24px rgba(245,158,11,0.5);
    transform: translateY(-1px);
  }
  .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

  .sending-dots span {
    animation: blink 1s step-end infinite;
    display: inline-block;
  }
  .sending-dots span:nth-child(2) { animation-delay: 0.2s; }
  .sending-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  .success-msg {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 3rem 1.5rem;
    gap: 0.75rem;
  }
  .success-icon {
    font-size: 2.5rem;
    color: #10b981;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 0 24px rgba(16,185,129,0.3);
  }
  .success-msg strong {
    font-family: 'Syne', sans-serif;
    font-size: 1.25rem;
    color: var(--text-primary);
  }
  .success-msg p { color: var(--text-muted); font-size: 0.9rem; margin: 0; }
  .send-again {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--accent);
    background: none;
    border: 1px solid var(--border-bright);
    border-radius: 4px;
    padding: 0.4rem 0.875rem;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.2s;
  }
  .send-again:hover { background: var(--accent-glow); }

  @media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  }
</style>