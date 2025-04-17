<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	import type { NavigationbarCtx } from "./Navigationbar.svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	type Variant = "ghost" | "bordered" | "colored";

	type Size = "s" | "m" | "l";
	type Props = {
		variant?: Variant;
		size?: Size;
		icon?: Snippet;
		children?: Snippet;
	} & HTMLAnchorAttributes;

	let { variant, size, icon, children, ...restProps }: Props = $props();

	const ctx: NavigationbarCtx = getContext("ctx");
	const selected = ctx.selected;

	const self = restProps.href ?? "unset";
	let active = $state(false);

	onMount(() => {
		return selected.subscribe((x) => (active = x === self));
	});
</script>

<a
	onclick={() => {
		selected.set(self);
	}}
	class:active
	class={[variant, size]}
	{...restProps}
>
	{@render children?.()}
</a>

<!--
@component
## Props
-->

<style lang="scss">
	a {
		text-align: center;
		text-decoration: none;
		height: fit-content;
		color: var(--text-color-muted);
		padding: var(--padding-s);
		border-radius: var(--border-radius-m);
		font-size: var(--text-size-s);
		font-weight: 600;
		cursor: pointer;
		&.active {
			color: var(--text-color);
		}

		&.s {
			padding: var(--padding-s);
			border-radius: var(--border-radius-s);
		}
		&.l {
			padding: var(--padding-l);
			font-size: var(--text-size-l);
			border-radius: var(--border-radius-l);
		}

		&.ghost {
			background-color: none;
			border: none;
		}

		&.bordered {
			border: 1px solid var(--border-color);
		}

		&.colored {
			border: none;
			background-color: var(--primary-color);
			color: var(--text-color-inverted);
			// &:hover {
			// 	background-color: var(--hover-color);
			// }
		}
	}
</style>
