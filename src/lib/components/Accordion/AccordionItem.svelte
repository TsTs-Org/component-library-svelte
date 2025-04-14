<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	import Icon from "../Icon.svelte";
	import { slide } from "svelte/transition";
	import type { AccordionCtx } from "./Accordion.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Variant = "default" | "ghost";

	type Props = {
		title: string;
		open?: boolean;
		variant?: Variant;
		children: Snippet;
	} & HTMLAttributes<any>;

	let { title, open = false, variant = "default", children, ...restProps }: Props = $props();

	const ctx: AccordionCtx = getContext("ctx");
	const selected = ctx.selected;

	const self = {};
	let _open = open;

	onMount(() => {
		if (_open) selected.set(self);
		return selected.subscribe((x) => (open = x === self));
	});
</script>

<div
	class={variant + " AccordionItem"}
	{...restProps}
>
	<button
		onclick={() => selected.set(open ? {} : self)}
		class="AccordionItemTrigger"
	>
		<h4>{title}</h4>
		<Icon
			iconName={open ? "arrowUp" : "arrowDown"}
			size="m"
		/>
	</button>
	{#if open}
		<div
			class="AccordionItemPortal"
			transition:slide={{ duration: 190 }}
		>
			{@render children?.()}
		</div>
	{/if}
</div>

<!--
@component
## Props
@prop {string} title - The title of the accordion item.
@prop {boolean} [open=false] - Whether the accordion item is open or not.
@prop {string} [variant="default"] - The variant of the accordion item. Can be "default" or "ghost".
-->

<style lang="scss">
	.AccordionItem {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		border-bottom: thin solid var(--border-color);
		width: 100%;
		padding: var(--padding-s);
		&.ghost {
			background-color: transparent;
			border: none;
		}
		&:last-child {
			border: none;
		}
	}

	.AccordionItemTrigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: transparent;
		border: none;
		outline: none;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}

	.AccordionItemPortal {
		margin-top: var(--padding-s);
	}
</style>
