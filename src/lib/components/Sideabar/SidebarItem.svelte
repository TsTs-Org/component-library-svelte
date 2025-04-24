<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { SidebarCtx } from "./Sidebar.svelte";

	type Props = {
		icon?: Snippet;
		children?: Snippet;
	} & HTMLAnchorAttributes;

	let { icon, children, ...restProps }: Props = $props();

	let active = $state(false);

	const ctx: SidebarCtx = getContext("SidebarCtx");
	const options = ctx.options;

	onMount(() => {
		return options.subscribe((x) => console.log(x));
	});
</script>

<a
	onclick={() => {
		active = true;
	}}
	class:active
	class="SidebarItem"
	{...restProps}
>
	{@render icon?.()}
	{@render children?.()}
</a>

<!--
@component
## Props
-->

<style lang="scss">
	a {
		display: flex;
		align-items: center;
		gap: var(--padding-xs);
		text-decoration: none;
		height: fit-content;
		color: var(--text-color);
		padding: var(--padding-xs);
		border-radius: var(--border-radius-s);
		font-size: var(--text-size-s);
		font-weight: 500;
		cursor: pointer;

		&:hover {
			background-color: var(--hover-color);
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
