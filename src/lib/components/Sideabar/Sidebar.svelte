<script lang="ts">
	import type { Snippet } from "svelte";
	import Seperator from "../Seperator.svelte";

	type Props = {
		collapsed?: boolean;
		closed?: boolean;
		center?: boolean;
		sidebarHeader?: Snippet;
		sidebarFooter?: Snippet;
		children?: Snippet;
	};

	let { collapsed = false, closed = false, center = false, sidebarHeader, sidebarFooter, children }: Props = $props();
</script>

<div class="Sidebar" class:collapsed class:closed>
	{#if !!sidebarHeader}
		<div class="Header">{@render sidebarHeader?.()}</div>
		<Seperator horizontal></Seperator>
	{/if}
	<div class="Content" class:center>{@render children?.()}</div>
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
		z-index: 900;
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		height: 100%;
		width: 25%;
		background-color: var(--foreground-color);

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
