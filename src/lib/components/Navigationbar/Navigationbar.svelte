<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";

	type Variant = "default" | "glass";

	type Props = {
		variant?: Variant;
		left?: Snippet;
		right?: Snippet;
		children?: Snippet;
	} & HTMLAttributes<any>;

	export type NavigationbarCtx = {
		selected: Writable<object>;
	};

	const ctx = {
		selected: writable(),
	};

	let { variant = "default", left, right, children, ...restProps }: Props = $props();

	setContext("ctx", ctx);
</script>

<nav
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
	nav {
		position: sticky;
		top: 0;
		box-sizing: border-box;
		width: 100%;
		z-index: 1000;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		padding: var(--padding-m) var(--padding-l);
		border-bottom: 1px solid var(--border-color);
		&.default {
			background: var(--background-color);
		}
		&.glass {
			background: rgba($color: #000000, $alpha: 0.35);
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
		}
	}

	.left,
	.center,
	.right {
		display: flex;
		align-items: center;
	}

	.right {
		justify-content: end;
	}
</style>
