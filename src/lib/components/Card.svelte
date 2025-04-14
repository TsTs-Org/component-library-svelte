<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Size = "s" | "m" | "l";

	type Props = {
		size?: Size;
		title?: Snippet;
		iconLeft?: Snippet<[Size]>;
		iconRight?: Snippet<[Size]>;
		children?: Snippet;
		transparent?: boolean;
	} & HTMLAttributes<any>;

	let {
		size = "m",
		title,
		iconLeft,
		iconRight,
		children,
		transparent = false,
		...restProps
	}: Props = $props();
</script>

<!-- TODO: min-width that is calculated from header-gap -->
<div
	class={["card", size]}
	class:transparent
	{...restProps}
>
	<div class="header">
		<!-- TODO: create component to hover ellipsed text to show full text 
			 & fix for buggy ellipsis (for example when setting width of card to 6rem with title and icon on the right)
			-->
		{#if !!iconLeft}
			<div>
				{@render iconLeft?.(size)}
			</div>
		{/if}
		<span class="title">{@render title?.()}</span>
		{#if !!iconRight}
			<div>
				{@render iconRight?.(size)}
			</div>
		{/if}
	</div>
	<div class="content">
		{@render children?.()}
	</div>
</div>

<!--
@component
## Props
@prop {string} size - The size of the card. Can be "s", "m", or "l"
-->

<style lang="scss">
	.card {
		width: 100%;
		height: 100%;
		border: 1px solid var(--border-color);
		box-sizing: border-box;
		background-color: var(--foreground-color);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto; /* 3 because there could be a bottom bar */

		&.transparent {
			background-color: transparent;
		}

		/* TODO: xs variant */

		&.s {
			border-radius: var(--border-radius-s);
			padding: var(--padding-s);
			& > .header {
				gap: var(--padding-xs);
				margin-bottom: var(--padding-xs);
				& > .title {
					font-size: var(--text-size-s);
				}
			}
		}

		&.m {
			border-radius: var(--border-radius-m);
			padding: var(--padding-m);
			& > .header {
				gap: var(--padding-s);
				margin-bottom: var(--padding-s);
				& > .title {
					font-size: var(--text-size-m);
				}
			}
		}

		&.l {
			border-radius: var(--border-radius-l);
			padding: var(--padding-l);
			& > .header {
				gap: var(--padding-m);
				margin-bottom: var(--padding-m);
				& > .title {
					font-size: var(--text-size-l);
				}
			}
		}

		& .header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: fit-content;
			min-width: 0;

			& .title {
				min-width: 0;
				text-overflow: ellipsis;
				overflow: hidden;
				text-wrap: nowrap;
				text-align: left;
				flex-grow: 1;
				flex-shrink: 1;
			}
		}
	}
</style>
