<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	// import Icon from "../Icon.svelte";
	import type { SelectCtx } from "./Select.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Variant = "default" | "ghost";

	type Props = {
		value: string;
		label: string;
		variant?: Variant;
		children?: Snippet;
	} & HTMLAttributes<any>;

	let { value, label, variant = "default", children, ...restProps }: Props = $props();

	const ctx: SelectCtx = getContext("SelectCtx");
	const selected = ctx.selected;

	let isActive = $state(false);
	onMount(() => {
		return selected.subscribe((x) => {
			isActive = x.value === self.value;
		});
	});

	const self = { value, label };
</script>

<button
	class={variant + " SelectItem"}
	class:isActive
	onclick={() => selected.set(self)}
	{...restProps}
>
	<p>{self.label}</p>
	<div class="SelectItemPortal">
		{@render children?.()}
	</div>
</button>

<!--
@component
## Props
@prop {string} value - The value of the item.
@prop {string} label - The label of the item.
@prop {string} variant - The variant of the item. Can be "default" or "ghost". Default is "default".
-->

<style lang="scss">
	.SelectItem {
		display: flex;
		box-sizing: border-box;
		border-bottom: thin solid var(--border-color);
		width: 100%;
		padding: var(--padding-s);
		&:hover {
			background-color: var(--neutral-hover-color);
		}
		&.isActive {
			background-color: var(--hover-color);
		}
		&.ghost {
			background-color: transparent;
			border: none;
		}
		&:last-child {
			border: none;
		}
	}
</style>
