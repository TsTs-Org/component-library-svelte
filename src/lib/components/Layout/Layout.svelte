<script lang="ts">
	import { onMount, setContext, type Snippet } from "svelte";
	import type { SidebarCtx } from "../Sideabar/Sidebar.svelte";
	import { writable } from "svelte/store";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = {
		mainLayout?: boolean;
		leftSidebar?: Snippet;
		// rightSidebar?: Snippet;
		topnav?: Snippet;
		// bottomnav?: Snippet;
		// rightnav?: Snippet;
		// leftnav?: Snippet;
		sidebarOverNav?: boolean;
		children?: Snippet;
	} & HTMLAttributes<any>;

	let {
		mainLayout = false,
		leftSidebar,
		// rightSidebar,
		topnav,
		// bottomnav,
		// rightnav,
		// leftnav,
		sidebarOverNav = false,
		children,
		...restProps
	}: Props = $props();

	export type LayoutCtx = {
		sidebarOptions: SidebarCtx;
	};

	const ctx = {
		sidebarOptions: writable({
			collapsed: undefined,
			closed: undefined,
		}),
	};

	const sidebarOptions = ctx.sidebarOptions;

	setContext("LayoutCtx", ctx);
</script>

<div
	class="Layout"
	class:mainLayout
	class:sidebarOverNav
	class:noSidebar={!leftSidebar || $sidebarOptions.closed}
	{...restProps}
>
	<div
		class="nav"
		style="grid-area: topnav"
	>
		{@render topnav?.()}
	</div>

	<div style={`grid-area: leftSidebar;}`}>
		{@render leftSidebar?.()}
	</div>

	<div
		class="Content"
		style="grid-area: content"
	>
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.Layout {
		height: 100%;
		width: 100%;
		overflow: hidden;
		display: grid;
		grid-template-areas:
			"topnav topnav topnav"
			"leftSidebar content content"
			"leftSidebar content content";
		grid-template-columns: min-content auto auto;
		grid-template-rows: min-content auto auto;
		&.sidebarOverNav {
			grid-template-areas:
				"leftSidebar topnav topnav"
				"leftSidebar content content"
				"leftSidebar content content";
		}
		&.mainLayout {
			height: 100dvh;
		}
		&.noSidebar {
			grid-template-columns: 0px auto;
		}
	}
	.Content {
		background-color: var(--background-color);
		overflow: auto;
	}
</style>
