<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

	type Size = "s" | "m" | "l";

	type EitherChildrenOrBuiltinIcon =
		| { children: Snippet; iconName?: never, }
		| { children?: never; iconName: string };
	type Props = { size?: Size; color?: string, filled?: boolean } & EitherChildrenOrBuiltinIcon & SVGAttributes<any>;

	let {
		size = "m",
		color = "var(--text-color)",
		filled = false,
		iconName,
		children,
		...restProps
	}: Props = $props();

</script>

{#if !!children}
<svg
	style={`fill: ${color}`}
	class={[size]}
	{...restProps}
	viewBox="0 -960 960 960"
>
	{@render children?.()}
</svg>
{:else if !!iconName}
	<i 
		style={`color: ${color}`}
		class={[filled ? "icon-filled" : "icon", size]}
		{...restProps}
	>{iconName}</i>
{/if}

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

	.icon, .icon-filled {
		font-family: 'Material Icons Outlined';
		font-weight: normal;
		font-style: normal;
		font-size: var(--text-size-l);  /* Adjust as needed */
		display: inline-block;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		white-space: nowrap;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
		width: var(--text-size-l);
		height: var(--text-size-l);
		overflow: hidden;
		&.s {
			height: var(--text-size-m);
			width: var(--text-size-m);
			font-size: var(--text-size-m);
		}

		&.m {
			height: calc(var(--text-size-l) * .85);
			width: calc(var(--text-size-l) * .85);
			font-size: calc(var(--text-size-l) * .85);
		}
		&.l {
			height: var(--text-size-l);
			width: var(--text-size-l);
			font-size: var(--text-size-l);
		}
		&.xl {
			height: var(--text-size-xl);
			width: var(--text-size-xl);
			font-size: var(--text-size-xl);
		}
	}

	.icon-filled {
		font-family: 'Material Icons Filled', "Material Icons Fallback";
	}

</style>
