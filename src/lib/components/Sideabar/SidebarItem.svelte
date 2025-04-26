<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { SidebarCtx } from "./Sidebar.svelte";
	import { page } from "$app/state";
	import { base } from "$app/paths";

	type size = "s" | "m" | "l";

	type Props = {
		active?: boolean;
		href?: string;
		size?: size;
		icon?: Snippet<[size]>;
		children?: Snippet;
	} & HTMLAnchorAttributes;

	let { icon, active, href, size = "m", children, ...restProps }: Props = $props();

	let _active = $derived(page.route.id == href);

	console.log(page.route.id, href);

	const ctx: SidebarCtx = getContext("SidebarCtx");
	const options = ctx;

	let sidebarClosed = $state(false);
	let sidebarCollapsed = $state(false);

	onMount(() => {
		return options.subscribe((x) => {
			sidebarClosed = x.closed;
			sidebarCollapsed = x.collapsed;
		});
	});
</script>

{#if !sidebarCollapsed || !!icon}
	<a
		class:_active={active == undefined ? _active : active}
		class:sidebarCollapsed
		class:sidebarClosed
		class={["SidebarItem", size]}
		{href}
		{...restProps}
	>
		{@render icon?.(sidebarCollapsed ? "l" : size)}
		{#if !sidebarCollapsed}
			<div class="content">
				{@render children?.()}
			</div>
		{/if}
	</a>
{/if}

<!--
@component
## Props
-->

<style lang="scss">
	a {
		display: flex;
		align-items: center;
		gap: var(--padding-s);
		text-decoration: none;
		height: fit-content;
		color: var(--text-color);
		padding: var(--padding-s);
		border-radius: var(--border-radius-s);
		font-weight: 500;
		cursor: pointer;
		fill: var(--text-color);

		&.sidebarCollapsed .content {
			display: none;
		}

		&._active {
			background-color: var(--primary-color);
			fill: var(--text-color-inverted);
			.content {
				color: var(--text-color-inverted);
			}
		}

		&:not(._active):hover {
			background-color: var(--hover-color);
		}

		&.s {
			padding: var(--padding-xs);
			border-radius: var(--border-radius-s);
			&.sidebarCollapsed {
				padding: var(--padding-s);
			}
		}
		&.l {
			padding: var(--padding-m);
			font-size: var(--text-size-m);
			border-radius: var(--border-radius-m);
			&.sidebarCollapsed {
				padding: var(--padding-s);
			}
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
