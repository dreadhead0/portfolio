<script>
  import { onMount } from 'svelte';

  let x = 0, y = 0;
  let visible = false;

  onMount(() => {
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      visible = true;
    };
    const leave = () => { visible = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  });
</script>

<div
  class="cursor-glow"
  style="left:{x}px; top:{y}px; opacity:{visible ? 1 : 0};"
  aria-hidden="true"
/>

<style>
  .cursor-glow {
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: left, top;
  }
  @media (prefers-reduced-motion: reduce) {
    .cursor-glow { display: none; }
  }
</style>