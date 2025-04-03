<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { onMount, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";
	import { Icon } from "$lib/index.js";
	import { scale, slide } from "svelte/transition";

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
	let open = $state();
	onMount(() => {
		return ctx.selected.subscribe(() => (open = false));
	});
</script>

<button
	class:open
	class="openNav"
	disabled={false}
	onclick={() => {
		open = !open;
	}}
>
	<Icon
		size="l"
		iconName={open ? "x" : "burgerMenu"}
	/>
</button>
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
	@media (max-width: 900px) {
		.openNav {
			position: fixed;
			z-index: 1200;
			top: 1rem;
			left: 1rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 100%;
			border: thin solid var(--border-color);
			width: 4rem;
			height: 4rem;
			background-color: var(--background-color);
			&:disabled {
				cursor: not-allowed;
				background-color: var(--neutral-hover-color);
			}
			&:hover {
				background-color: var(--hover-color);
			}
			&.open {
				transform: rotate(90deg);
			}
		}
		nav {
			height: 100%;
			position: fixed;
			display: none;
			&.open {
				display: flex;
				flex-direction: column-reverse;
				justify-content: space-between;
				.left,
				.right {
					display: flex;
					justify-content: space-evenly;
				}
				.left {
					margin-block: auto;
					flex-direction: column;
				}
			}
		}
		.left,
		.center,
		.right {
			display: none;
		}
	}
	@media (min-width: 900px) {
		nav {
			position: sticky;
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			border-bottom: 1px solid var(--border-color);
		}
		.openNav {
			display: none;
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
	}

	nav {
		top: 0;
		box-sizing: border-box;
		width: 100%;
		z-index: 1000;
		padding: var(--padding-m) var(--padding-l);
		&.default {
			background: var(--background-color);
		}
		&.glass {
			background: rgba($color: #000000, $alpha: 0.35);
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
		}
	}
</style>
