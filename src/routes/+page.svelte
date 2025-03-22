<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<script>
    import Button from "$lib/Button.svelte";
</script>

<style>

    .color-swatches {
        display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    padding: 1rem;
}
  
  .swatch {
      aspect-ratio: 1;
      width: 100%;
      min-width: 4rem;
      border-radius: 0.5rem;
      border: 1px solid oklch(50% 0 0 / 0.2);
      position: relative;
      overflow: hidden;
      background-color: var(--color);
    }
  
    .swatch::after {
    content: attr(data-color);
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: oklch(100% 0 0 / 0.8);
    padding: 0.25rem;
    font-family: monospace;
    font-size: 0.75rem;
    text-align: center;
}
</style>
  
  <div class="color-swatches">
    <div class="swatch" style="--color: var(--primary)" data-color="--primary"></div>
    <div class="swatch" style="--color: var(--primary-light)" data-color="--primary-light"></div>
    <div class="swatch" style="--color: var(--primary-dark)" data-color="--primary-dark"></div>
    
    <div class="swatch" style="--color: var(--secondary)" data-color="--secondary"></div>
    <div class="swatch" style="--color: var(--secondary-light)" data-color="--secondary-light"></div>
    <div class="swatch" style="--color: var(--secondary-dark)" data-color="--secondary-dark"></div>
  
    <div class="swatch" style="--color: var(--neutral-100)" data-color="--neutral-100"></div>
    <div class="swatch" style="--color: var(--neutral-200)" data-color="--neutral-200"></div>
    <div class="swatch" style="--color: var(--neutral-300)" data-color="--neutral-300"></div>
    <div class="swatch" style="--color: var(--neutral-400)" data-color="--neutral-400"></div>
    <div class="swatch" style="--color: var(--neutral-500)" data-color="--neutral-500"></div>
    <div class="swatch" style="--color: var(--neutral-600)" data-color="--neutral-600"></div>
    <div class="swatch" style="--color: var(--neutral-700)" data-color="--neutral-700"></div>
    <div class="swatch" style="--color: var(--neutral-800)" data-color="--neutral-800"></div>
    <div class="swatch" style="--color: var(--neutral-900)" data-color="--neutral-900"></div>
  </div>
  