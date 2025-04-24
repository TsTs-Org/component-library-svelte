<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { onMount, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";
	import { Icon } from "$lib/index.js";
	import { page } from "$app/state";

	type Variant = "default" | "glass";

	type Props = {
		variant?: Variant;
		left?: Snippet;
		right?: Snippet;
		children?: Snippet;
	} & HTMLAttributes<any>;

	export type NavigationbarCtx = {
		selected: Writable<string>;
	};

	const ctx = {
		selected: writable(page.route.id),
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
	class="openNavButton"
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
		.openNavButton {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 100%;
			width: 4rem;
			height: 4rem;
			padding: 1rem;
		}
		nav {
			height: 100%;
			position: fixed;
			display: none;
			&.open {
				display: flex;
				flex-direction: column;
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
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			border-bottom: 1px solid var(--border-color);
		}
		.openNavButton {
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
		box-sizing: border-box;
		width: 100%;
		padding: var(--padding-s) var(--padding-m);
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
