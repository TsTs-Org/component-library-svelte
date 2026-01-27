<script>
	const variations = ["neutral", "primary"];
</script>

<div class="mockup-page">
	<div
		class="light-mode"
		style="padding: var(--padding-xl)"
	>
		<h1>Variable Showcase</h1>

		{#each variations as variation}
			<h3>{variation}</h3>
			<div class="color-swatches">
				{#each Array.from({ length: 9 }, (_, i) => i + 1) as shade}
					<div
						class="swatch"
						style="--color: var(--{variation}-{shade}00)"
						data-color={`${variation}-${shade}00`}
					></div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.mockup-page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	@media (max-width: 1200px) {
		.mockup-page {
			grid-template-columns: 1fr;
			background-color: var(--background-color-dark);
		}
	}

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
		border: 1px solid var(--border-color);
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
	.container {
		background-color: var(--foreground-color);
		padding: var(--padding-xl);
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
