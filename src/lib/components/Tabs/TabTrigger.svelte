<script lang="ts">
	import { type Snippet } from "svelte";
	import { TabState } from "./Tabs.svelte";

	type Props = {
		trigger: Snippet<[selectTab: () => void]>;
		tabIdentifier: string;
	};

	let { trigger, tabIdentifier }: Props = $props();

	const tabState = TabState.get();

	function selectTab() {
		tabState.setVisibility(tabIdentifier, true);
	}

	// TODO: pass current activation state to children
</script>

{@render trigger?.(selectTab)}
