<script lang="ts">
	import { type Snippet } from "svelte";
	import { TabState } from "./Tabs.svelte";

	type Props = {
		trigger: Snippet<[selectTab: () => void, isSelected: () => boolean]>;
		tabIdentifier: string;
	};

	let { trigger, tabIdentifier }: Props = $props();

	const tabState = TabState.get();

	function selectTab() {
		tabState.setVisibility(tabIdentifier, true);
	}

	function isSelected(): boolean {
		return tabState.visibleTabs.has(tabIdentifier);
	}
</script>

{@render trigger?.(selectTab, isSelected)}
