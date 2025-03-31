<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Loader from "./Loader.svelte";

	type Variant = "primary" | "bordered";
	type Size = "s" | "m" | "l";

	type Props = {
		loading?: boolean;
		variant?: Variant;
		size?: Size;
		icon?: Snippet;
		children: Snippet;
	} & HTMLButtonAttributes;

	let {
		variant = "primary",
		size = "m",
		loading = false,
		icon,
		children,
		...restProps
	}: Props = $props();
</script>

<button
	class={[variant, size]}
	disabled={loading}
	class:loading
	{...restProps}
>
	{#if loading}
		<Loader size="s" />
	{:else}
		{#if !!icon}
			<div class="icon">{@render icon?.()}</div>
		{/if}
		<div class={[!icon ? "no-icon" : "", "content"]}>
			{@render children?.()}
		</div>
	{/if}
</button>

<!--
@component
## Props
@prop {boolean} loading - If true, the button will show a loading state.
@prop {string} variant - The variant of the button. Can be "primary" or "bordered".
@prop {string} size - The size of the button. Can be "s", "m", or "l".
@prop {Snippet} icon - The icon to be displayed in the button.
-->

<style lang="scss">
	button {
		width: 100%;
		min-width: fit-content;
		border: none;
		white-space: nowrap;
		display: grid;
		grid-template-columns: 1fr auto 1fr; // 3rd cell empty but needed to center the content
		align-items: center;

		& .no-icon {
			grid-column-start: 2;
		}

		& .icon {
			width: fit-content;
		}
		& .content {
			margin-left: auto;
			color: var(--text-color-inverted);
		}

		&.s {
			padding: var(--padding-s);
			border-radius: var(--border-radius-s);
			gap: var(--padding-s);
		}
		&.m {
			padding: var(--padding-m);
			border-radius: var(--border-radius-m);
			gap: var(--padding-m);
		}
		&.l {
			padding: var(--padding-m);
			border-radius: var(--border-radius-m);
			gap: var(--padding-m);
			font-size: var(--text-size-m);
			font-weight: 600;
		}

		&.loading {
			display: flex;
			justify-content: center;
			padding: 0;
		}

		&.primary {
			background-color: var(--primary-color);
		}
		&.bordered {
			background-color: var(--foreground-color);
			border: 1px solid var(--border-color);
			&:hover {
				background-color: var(--neutral-hover-color);
			}
			.content {
				color: var(--text-color);
			}
		}

		&:not(:disabled):hover {
			background-color: var(--hover-color);
			scale: 99.5%;
			cursor: pointer;
		}

		&:disabled:hover {
			cursor: not-allowed;
		}

		&:not(:disabled):active {
			scale: 98%;
		}
	}
</style>
