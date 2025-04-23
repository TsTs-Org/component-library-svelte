<script lang="ts">
	import { getContext, onMount, setContext, type Snippet } from "svelte";
	import Seperator from "../Seperator.svelte";
	import { writable, type Writable } from "svelte/store";
	import type { LayoutCtx } from "../Layout/Layout.svelte";

	type Variant = "default" | "glass";

	type Props = {
		sidebarCollapsed?: boolean;
		sidebarClosed?: boolean;
		center?: boolean;
		sidebarHeader?: Snippet<[isCollapsed: () => boolean]>;
		sidebarFooter?: Snippet<[isCollapsed: () => boolean]>;
		variant?: Variant;
		children?: Snippet;
	};

	export type SidebarCtx = Writable<{
		collapsed: boolean;
		closed: boolean;
	}>;
	let {
		sidebarCollapsed = false,
		sidebarClosed = false,
		center = false,
		sidebarHeader,
		sidebarFooter,
		variant = "default",
		children,
	}: Props = $props();

	let ctx: SidebarCtx = writable({
		collapsed: sidebarCollapsed,
		closed: sidebarClosed,
	});

	const layoutCtx: LayoutCtx | undefined = getContext("LayoutCtx");
	if (layoutCtx !== undefined) {
		ctx = layoutCtx.sidebarOptions;
	}
	setContext("SidebarCtx", ctx);

	$effect(() => {
		ctx.update((x) => {
			x.collapsed = sidebarCollapsed;
			x.closed = sidebarClosed;
			return x;
		});
	});

	let headerHandlesCollapsed = false;
	let footerHandlesCollapsed = false;
</script>

<div
	class={["Sidebar", variant]}
	class:sidebarCollapsed
	class:sidebarClosed
>
	<div
		class="Header"
		class:display={!sidebarCollapsed || headerHandlesCollapsed}
	>
		{@render sidebarHeader?.(() => {
			headerHandlesCollapsed = true;
			return sidebarCollapsed;
		})}
	</div>

	{#if !!sidebarHeader && !sidebarCollapsed}
		<Seperator horizontal></Seperator>
	{/if}
	<div
		class="Content"
		class:center
	>
		{@render children?.()}
	</div>
	{#if !!sidebarFooter && !sidebarCollapsed}
		<Seperator horizontal></Seperator>
	{/if}
	<div
		class="Footer"
		class:display={!sidebarCollapsed || footerHandlesCollapsed}
	>
		{@render sidebarFooter?.(() => {
			footerHandlesCollapsed = true;
			return sidebarCollapsed;
		})}
	</div>
</div>

<!--
@component
## Props
-->

<style lang="scss">
	.Sidebar {
		z-index: 900;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: max(min(300px, 25vw), 250px);
		border-right: thin solid var(--border-color);
		&.sidebarCollapsed {
			width: fit-content;
		}
		&.sidebarClosed {
			width: 0px;
			border: none;
		}

		&.default {
			background: var(--background-color);
		}
		&.glass {
			background: rgba(from var(--background-color) r g b / 0.65);
			backdrop-filter: blur(6px);
			-webkit-backdrop-filter: blur(6px);
		}

		.Content {
			display: flex;
			flex-direction: column;
			padding: var(--padding-s);
			gap: var(--padding-xs);
			flex: 1;
			&.center {
				justify-content: center;
			}
		}

		.Header,
		.Footer {
			display: flex;
			flex-direction: column;
			height: fit-content;
			width: calc(100% - 2 * var(--padding-s));
			padding: var(--padding-s);
			.display {
				display: none;
			}
		}
	}
</style>
