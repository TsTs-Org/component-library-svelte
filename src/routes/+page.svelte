<script>
	import Button from '$lib/components/Button.svelte';
	const variations = ['neutral', 'primary'];
</script>


<h1>CSS Variablen Test</h1>

<div class="container">
	<h2>Test Container</h2>
	<p>Dies ist ein Test-Container mit den definierten CSS-Variablen.</p>
	<button style="border-radius: var(--border-radius-l)">TEST BUTTON</button>
    <button style="border-radius: var(--border-radius-m)">Another Test Button</button>
    <button style="border-radius: var(--border-radius-s)">aaaand another test button</button>
</div>

<div class="variable-display" id="variableDisplay"></div>
<div class="color-swatches">
	{#each variations as variation}
		{#each Array.from({ length: 9 }, (_, i) => i + 1) as shade}
			<div
				class="swatch"
				style="--color: var(--{variation}-{shade}00)"
				data-color={`${variation}-${shade}00`}
			></div>
		{/each}
	{/each}
</div>

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
		background: var(--foreground-color);
		padding: 0.25rem;
		font-family: monospace;
		font-size: 0.75rem;
		text-align: center;
	}

	:global(body) {
		font-family: sans-serif;
		background-color: var(--background-color);
		color: var(--text-color);
		margin: 0;
		padding: 0px;
	}

	.container {
		background-color: var(--foreground-color);
		padding: 16px;
		border: 1px solid var(--border-color);
		margin: 16px;
        border-radius: var(--border-radius-xl);
	}

	button {
		background-color: var(--primary-color);
		color: var(--text-color-inverted); /* Oder eine andere Farbe, die gut zu Primary passt */
		border: 1px solid var(--border-color);
		padding: 10px 15px;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--hover-color);
	}
</style>
