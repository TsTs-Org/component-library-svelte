<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Variant = "default" | "glass";

	type Props = {
		variant?: Variant;
		left?: Snippet;
		right?: Snippet;
		children?: Snippet;
	} & HTMLAttributes<any>;

	let { variant = "default", left, right, children, ...restProps }: Props = $props();
</script>

<nav
	class:open
	class={"Navigationbar " + variant}
	{...restProps}
>
	<div class="left">
		{@render left?.()}
	</div>
	<div class="center">
		{@render children?.()}
	</div>
	<div class="right">
		{@render right?.()}
	</div>
</nav>

<!--
@component
## Props
@prop variant: "default" | "ghost" = "default"
@prop children: Snippet
-->

<style lang="scss">
	.left,
	.center,
	.right {
		display: flex;
		align-items: center;
	}

	.right {
		justify-content: end;
	}

	nav {
		z-index: 100;
		box-sizing: border-box;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		border-bottom: 1px solid var(--border-color);
		padding: var(--padding-xs);
		&.default {
			background: var(--background-color);
		}
		&.glass {
			background: rgba(from var(--background-color) r g b / 0.65);
			backdrop-filter: blur(6px);
			-webkit-backdrop-filter: blur(6px);
		}
	}
</style>
