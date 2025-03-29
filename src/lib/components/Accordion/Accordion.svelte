<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";

	type Variant = "default" | "ghost";

	type Props = {
		variant?: Variant;
		children: Snippet;
	} & HTMLAttributes<any>;

	export type AccordionCtx = {
		selected: Writable<object>;
	};

	const ctx = {
		selected: writable(),
	};

	let { variant = "default", children, ...restProps }: Props = $props();

	setContext("ctx", ctx);
</script>

<div
	class={"Accordion " + variant}
	{...restProps}
>
	{@render children?.()}
</div>

<style lang="scss">
	.Accordion {
		display: flex;
		flex-direction: column;
		width: 100%;
		border: thin solid var(--border-color);
		border-radius: var(--border-radius-s);
		padding: var(--padding-m);
		&.ghost {
			background-color: transparent;
			border: none;
		}
	}
</style>
