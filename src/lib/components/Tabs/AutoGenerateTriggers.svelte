<script lang="ts">
	import type { Snippet } from "svelte";
	import { TabState } from "./Tabs.svelte";
	import TabTrigger from "./TabTrigger.svelte";

	// TODO: handle order
	const tabState = TabState.get();

	type Props = {
		tabTrigger: Snippet<[selectTab: () => void, isSelected: () => boolean, tabIdentifier: string]>;
	};

	let { tabTrigger }: Props = $props();
</script>

{#each tabState.registeredTabs as tab}
	<TabTrigger tabIdentifier={tab}>
		{#snippet trigger(selectTab, isSelected)}
			{@render tabTrigger?.(selectTab, isSelected, tab)}
		{/snippet}
	</TabTrigger>
{/each}
