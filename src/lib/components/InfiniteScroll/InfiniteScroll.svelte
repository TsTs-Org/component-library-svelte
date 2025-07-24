<script
	lang="ts"
	generics="T"
>
	import type { Snippet } from "svelte";

	type Props = {
		content: T[];
		contentDisplay: Snippet<[T]>;
	};

	let { contentDisplay, content }: Props = $props();
</script>

<div
	class="infinite-scroller"
	style="--displayed-count:{2}; --content-amount:{content.length}"
>
	{#each content as con, index}
		<div
			class="scroll-item"
			style="--child-index: {index}"
		>
			{@render contentDisplay(con)}
		</div>
	{/each}
</div>

<style lang="scss">
	.infinite-scroller {
		//display: flex;
		display: grid;
		--gap: 2rem;
		--width-based-on-displayed-count: calc(100% / var(--displayed-count));
		--gap-size-subtractor: calc(var(--gap) * (var(--displayed-count) - 1) / var(--displayed-count));
		grid-auto-columns: calc(var(--width-based-on-displayed-count) - var(--gap-size-subtractor));
		gap: var(--gap);
		grid-auto-flow: column;

		overflow: hidden;

		background-color: mediumseagreen;
		width: 100%;
		box-sizing: border-box;
	}

	@keyframes scroll-left {
		from {
			translate: calc(
				((var(--content-amount) - var(--child-index) - 1) * 100%) +
					(var(--content-amount) - var(--child-index)) * var(--gap)
			);
		}
		to {
			translate: calc(-1 * (var(--child-index) * var(--gap) + (var(--child-index) + 1) * 100%));
		}
	}

	.scroll-item {
		display: inline-block;
		width: 100%;

		--animation-duration: 40s;

		animation-duration: var(--animation-duration);
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		animation-name: scroll-left;
		animation-delay: calc(
			-1 * var(--animation-duration) / var(--content-amount) *
				(var(--content-amount) - var(--child-index) - 1)
		);
	}
</style>
