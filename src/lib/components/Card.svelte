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
		applySafeAreaInset?: boolean;
	} & Omit<HTMLAttributes<any>, "title">;

	let {
		size = "m",
		title,
		iconLeft,
		iconRight,
		children,
		transparent = false,
		applySafeAreaInset = false,
		...restProps
	}: Props = $props();
</script>

<!-- TODO: min-width that is calculated from header-gap -->
<div
	class={["card", size, applySafeAreaInset && "respect-safe-areas"]}
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
		border-radius: var(--card-border-radius);
		padding: var(--card-padding);

		&.respect-safe-areas {
			padding-top: calc(env(safe-area-inset-top) + var(--card-padding));
			padding-bottom: calc(env(safe-area-inset-bottom) + var(--card-padding));
		}

		&.transparent {
			background-color: transparent;
		}

		/* TODO: xs variant */

		&.s {
			--card-border-radius: var(--border-radius-s);
			--card-padding: var(--padding-s);
			--card-header-gap: var(--padding-xs);
			--card-header-margin-bottom: var(--padding-xs);
			--card-header-title-font-size: var(--text-size-s);
		}

		&.m {
			--card-border-radius: var(--border-radius-m);
			--card-padding: var(--padding-m);
			--card-header-gap: var(--padding-s);
			--card-header-margin-bottom: var(--padding-s);
			--card-header-title-font-size: var(--text-size-m);
		}

		&.l {
			--card-border-radius: var(--border-radius-l);
			--card-padding: var(--padding-l);
			--card-header-gap: var(--padding-m);
			--card-header-margin-bottom: var(--padding-m);
			--card-header-title-font-size: var(--text-size-l);
		}

		& .header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: fit-content;
			min-width: 0;
			gap: var(--card-header-gap);
			margin-bottom: var(--card--header-margin-bottom);

			& .title {
				min-width: 0;
				text-overflow: ellipsis;
				overflow: hidden;
				text-wrap: nowrap;
				text-align: left;
				flex-grow: 1;
				flex-shrink: 1;
				font-size: var(--card-header-title-font-size);
			}
		}

		& .content {
			min-width: 0;
			min-height: 0;
		}
	}
</style>
