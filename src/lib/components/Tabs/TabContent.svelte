<script lang="ts">
	import { type Snippet } from "svelte";
	import { TabState } from "./Tabs.svelte";

	type Props = { children: Snippet; tabIdentifier: string };

	let { children, tabIdentifier }: Props = $props();

	const tabState = TabState.get();
</script>

<!-- This wrapper is needed to make sure that there is just one element for multiple tab styling -->
{#if tabState.tabState.has(tabIdentifier)}
	<div>
		{@render children?.()}
	</div>
{/if}
