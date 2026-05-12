<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import Nav from '$lib/components/Nav.svelte';
  import CursorGlow from '$lib/components/CursorGlow.svelte';
  import Footer from '$lib/components/Footer.svelte';

  onMount(() => {
    theme.init();
  });
</script>

<a href="#main-content" class="skip-nav">Skip to main content</a>
<CursorGlow />
<Nav />

<main id="main-content">
  <slot />
</main>

<Footer />