<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import Seperator from "../Seperator.svelte";
	import { writable, type Writable } from "svelte/store";

	type Variant = "default" | "glass";

	type Props = {
		sidebarCollapsed?: boolean;
		sidebarClosed?: boolean;
		center?: boolean;
		sidebarHeader?: Snippet;
		sidebarFooter?: Snippet;
		variant?: Variant;
		children?: Snippet;
	};

	export type SidebarCtx = {
		options: Writable<{
			collapsed: boolean;
			closed: boolean;
		}>;
	};

	let {
		sidebarCollapsed = false,
		sidebarClosed = false,
		center = false,
		sidebarHeader,
		sidebarFooter,
		variant = "default",
		children,
	}: Props = $props();

	const ctx = {
		options: writable({
			collapsed: sidebarCollapsed,
			closed: sidebarClosed,
		}),
	};

	setContext("SidebarCtx", ctx);
</script>

<div
	class={["Sidebar", variant]}
	class:sidebarCollapsed
	class:sidebarClosed
>
	{#if !!sidebarHeader}
		<div class="Header">{@render sidebarHeader?.()}</div>
		<Seperator horizontal></Seperator>
	{/if}
	<div
		class="Content"
		class:center
	>
		{@render children?.()}
	</div>
	{#if !!sidebarFooter}
		<Seperator horizontal></Seperator>
		<div class="Footer">{@render sidebarFooter?.()}</div>
	{/if}
</div>

<!--
@component
## Props
-->

<style lang="scss">
	.Sidebar {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		width: 350px;
		transition: width 0.3s ease-in-out;
		border-right: thin solid var(--border-color);
		&.sidebarCollapsed {
			width: 4rem;
		}
		&.sidebarClosed {
			width: 0px;
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
			flex: 1;
			&.center {
				justify-content: center;
			}
		}

		.Header,
		.Footer {
			display: flex;
			height: 3rem;
			width: 100%;
			align-items: center;
		}
	}
</style>
