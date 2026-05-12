<script>
  import { theme, THEMES } from "$lib/stores/theme";

  /** @type {Record<string, string>} */
  const labels = {
    red: "Blood red",
    green: "Toxic green",
    blue: "Ice blue",
    violet: "Violet",
    purple: "Purple",
  };
</script>

<div class="theme-picker" aria-label="Accent theme picker">
  {#each THEMES as item}
    <button
      type="button"
      class="theme-swatch theme-{item}"
      class:active={$theme === item}
      on:click={() => theme.setTheme(item)}
      aria-label={`Use ${labels[item]} theme`}
      aria-pressed={$theme === item}
      title={labels[item]}
    ></button>
  {/each}
</div>

<style>
  .theme-picker {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.025);
    backdrop-filter: blur(12px);
  }

  .theme-swatch {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      border-color 0.2s ease;
  }

  .theme-swatch:hover,
  .theme-swatch.active {
    transform: scale(1.12);
    border-color: var(--text-primary);
    box-shadow: 0 0 16px currentColor;
  }

  .theme-red {
    background: #ef1b1b;
    color: #ef1b1b;
  }

  .theme-green {
    background: #00ff66;
    color: #00ff66;
  }

  .theme-blue {
    background: #38bdf8;
    color: #38bdf8;
  }

  .theme-violet {
    background: #8b5cf6;
    color: #8b5cf6;
  }

  .theme-purple {
    background: #c026d3;
    color: #c026d3;
  }

  @media (max-width: 420px) {
    .theme-picker {
      gap: 0.25rem;
      padding: 0.25rem;
    }

    .theme-swatch {
      width: 16px;
      height: 16px;
    }
  }
</style>
