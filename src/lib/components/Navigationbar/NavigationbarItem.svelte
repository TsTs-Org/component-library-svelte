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

	const self = {};
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
@prop {string} title - The title of the accordion item.
@prop {boolean} [open=false] - Whether the accordion item is open or not.
@prop {string} [variant="default"] - The variant of the accordion item. Can be "default" or "ghost".
-->

<style lang="scss">
	a {
		text-align: center;
		text-decoration: none;
		height: fit-content;
		color: var(--text-color);
		padding: var(--padding-m);
		border-radius: var(--border-radius-m);
		font-size: 0.9rem;
		&.active {
			text-decoration: underline;
		}

		&.s {
			padding: var(--padding-s);
			border-radius: var(--border-radius-s);
		}
		&.l {
			padding: var(--padding-l);
			font-size: 1rem;
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
			&:hover {
				background-color: var(--hover-color);
			}
		}
	}
	a:hover {
		background-color: var(--neutral-hover-color);
		cursor: pointer;
	}
</style>
