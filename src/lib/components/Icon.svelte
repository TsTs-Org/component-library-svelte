<script lang="ts">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import type { BuiltinIcon } from "$lib/utils/builtinIcons.ts";
	import { getIcon } from "$lib/utils/builtinIcons.js";

	type Size = "s" | "m" | "l";

	type EitherChildrenOrBuiltinIcon =
		| { children: Snippet; iconName?: never }
		| { children?: never; iconName: BuiltinIcon };
	type Props = { size?: Size; fill?: string } & EitherChildrenOrBuiltinIcon & SVGAttributes<any>;

	let {
		size = "m",
		fill = "var(--text-color)",
		iconName,
		children,
		...restProps
	}: Props = $props();
</script>

<svg
	style={`fill: ${fill}`}
	class={[size]}
	{...restProps}
	viewBox="0 -960 960 960"
>
	{#if !!children}
		{@render children?.()}
	{:else if !!iconName}
		{@html getIcon(iconName)}
	{/if}
</svg>

<!--
@component
## Props
@prop size="m" - The size of the icon. Can be "s", "m", "l", or "xl".
@prop iconName="" - The name of the icon to be displayed. If provided, this will override the children prop.
-->

<style lang="scss">
	svg {
		pointer-events: none;
		flex-shrink: 0;
		display: block;

		&.s {
			height: var(--text-size-s);
			width: var(--text-size-s);
		}

		&.m {
			height: var(--text-size-m);
			width: var(--text-size-m);
		}
		&.l {
			height: var(--text-size-l);
			width: var(--text-size-l);
		}
		&.xl {
			height: var(--text-size-xl);
			width: var(--text-size-xl);
		}
	}
</style>
