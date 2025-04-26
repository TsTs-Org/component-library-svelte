<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	// import Icon from "../Icon.svelte";
	import type { MultiselectCtx } from "./Multiselect.svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import Checkbox from "../Checkbox.svelte";

	type Variant = "default" | "ghost";

	type Props = {
		onchange?: (newValue: boolean) => void;
		value: string | number;
		label: string;
		variant?: Variant;
		children?: Snippet;
	} & HTMLAttributes<any>;

	let {
		onchange = () => {},
		value,
		label,
		variant = "default",
		children,
		...restProps
	}: Props = $props();

	const ctx: MultiselectCtx = getContext("MultiselectCtx");
	const selected = ctx.selected;

	let isActive = $state(false);
	onMount(() => {
		return selected.subscribe((x) => {
			isActive = x.includes(self.value);
		});
	});

	function swapSelected() {
		selected.update((curr) => {
			if (curr.includes(self.value)) {
				return curr.filter((val) => val != self.value);
			} else {
				curr.push(self.value);
			}
			return curr;
		});
	}

	const self = { value, label };
</script>

<div
	class={variant + " SelectItem"}
	class:isActive
	{...restProps}
>
	{self.label}
	<Checkbox
		bind:checked={isActive}
		onchange={() => {
			onchange(isActive);
			swapSelected();
		}}
	/>
</div>

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
		justify-content: space-between;
		gap: var(--padding-s);
		box-sizing: border-box;
		border-bottom: thin solid var(--border-color);
		width: 100%;
		padding: var(--padding-s);
		&:hover {
			background-color: var(--neutral-hover-color);
		}
		// &.isActive {
		// 	background-color: var(--hover-color);
		// }
		&.ghost {
			background-color: transparent;
			border: none;
		}
		&:last-child {
			border: none;
		}
	}
</style>
