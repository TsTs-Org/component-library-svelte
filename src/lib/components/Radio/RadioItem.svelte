<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	import type { RadioCtx } from "./Radiogroup.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Variant = "default" | "ghost";
	type ofType = "default" | "button" | "color";

	type Props = {
		value: string;
		selected?: boolean;
		variant?: Variant;
		ofType?: ofType;
		children?: Snippet;
	} & HTMLAttributes<any>;

	let { value, variant = "default", ofType = "default", children, ...restProps }: Props = $props();

	const ctx: RadioCtx = getContext("ctx");
	const _selected = ctx.selected;
	let selected = $state(false);

	onMount(() => {
		return _selected.subscribe((x) => (selected = x === value));
	});
</script>

<div
	class={variant + " RadioItem"}
	{...restProps}
>
	{#if !(ofType == "button")}
		<h5>{@render children?.()}</h5>
	{/if}
	<button
		onclick={() => _selected.set(value)}
		class:selected
		style={`--color: ${value}`}
		class={[ofType]}
	>
		<span
			class={["selected-indicator", ofType]}
			class:selected
		></span>
		{#if ofType == "button"}
			<h5>{@render children?.()}</h5>
		{/if}
	</button>
</div>

<!--
@component
## Props
@prop {string} title - The title of the Radio item.
@prop {string} [variant="default"] - The variant of the Radio item. Can be "default" or "ghost".
-->

<style lang="scss">
	.RadioItem {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--padding-xs);
		box-sizing: border-box;

		&.ghost {
			background-color: transparent;
			border: none;
		}
	}

	button {
		border: 2px solid var(--border-color);
		&.default,
		&.color {
			border-radius: 100%;
			width: 1.15rem;
			height: 1.15rem;
			&.selected {
				border-color: transparent;
				outline: 2px solid var(--border-color);
			}
		}
		&.color {
			background-color: var(--color);
			border-color: var(--color);
			&.selected {
				background-color: transparent;
				outline: 2px solid var(--color);
			}
		}
		&.button {
			border-width: 1px;
			padding: var(--padding-xs);
			border-radius: var(--border-radius-s);
			min-width: 2.5rem;
			&.selected {
				background-color: var(--neutral-hover-color);
			}
			&:hover {
				background-color: var(--neutral-hover-color);
			}
		}
	}

	.selected-indicator {
		display: none;
		height: 100%;
		width: 100%;
		border-radius: 100%;
		&.selected {
			display: block;
			&.default {
				background-color: var(--border-color);
			}
			&.color {
				background-color: var(--color);
			}
		}
	}
</style>
