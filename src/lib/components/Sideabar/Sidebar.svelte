<script lang="ts">
	import type { Snippet } from "svelte";
	import Seperator from "../Seperator.svelte";

	type Props = {
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
	};

	let { header, footer, children }: Props = $props();
</script>

<div class="Sidebar">
	{#if !!header}
		<div class="Header">{@render header?.()}</div>
		<Seperator horizontal></Seperator>
	{/if}
	<div class="Content">{@render children?.()}</div>
	{#if !!footer}
		<Seperator horizontal></Seperator>
		<div class="Footer">{@render footer?.()}</div>
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
		position: static;
		height: 100%;
		width: 25%;
		min-width: 4rem;
		background-color: var(--foreground-color);

		.Content {
			display: flex;
			flex-direction: column;
			padding: var(--padding-s);
			flex: 1;
		}

		.Header,
		.Footer {
			display: flex;
			height: 4rem;
			width: 100%;
			align-items: center;
		}
	}
</style>
