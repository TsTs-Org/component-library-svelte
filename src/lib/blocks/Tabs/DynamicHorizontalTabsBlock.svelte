<script lang="ts">
	import OverflowContainer from "$lib/components/OverflowContainer.svelte";
	import TabContent from "$lib/components/Tabs/TabContent.svelte";
	import { Icon } from "$lib/index.js";
	import StyledHorizontalTabTrigger from "./StyledHorizontalTabTriggerBlock.svelte";

	let tabs: { tabIdentifier: string; title?: string }[] = $state([
		{ tabIdentifier: "1", title: "one" },
		{ tabIdentifier: "2", title: "two" },
		{ tabIdentifier: "3", title: "three" },
		{ tabIdentifier: "4", title: "four" },
		{ tabIdentifier: "5", title: "five" },
		{ tabIdentifier: "6", title: "six" },
		{ tabIdentifier: "7", title: "seven" },
	]);

	function getTitle(tabIdentifier: string): string {
		let correspondingTab = tabs.find((tab) => {
			return tab.tabIdentifier == tabIdentifier;
		});

		if (!correspondingTab) return "Error";
		if (!correspondingTab.title) return "generated Title";
		return "select Tab " + correspondingTab.title;
	}

	function addTab() {
		tabs.push({ tabIdentifier: crypto.randomUUID() });
	}

	function closeTab(tabIdentifierToClose: string) {
		tabs = tabs.filter((tab) => {
			return tab.tabIdentifier !== tabIdentifierToClose;
		});
	}
</script>

<div class="tab-navigation">
	<div class="tab-trigger-wrapper">
		<OverflowContainer>
			<StyledHorizontalTabTrigger>
				{#snippet additionalContent(tabIdentifier)}
					{getTitle(tabIdentifier)}

					<!-- use button component? -->
					<button
						onclick={() => closeTab(tabIdentifier)}
						onkeyup={(e) => {
							if (e.key === "Enter") closeTab(tabIdentifier);
						}}
					>
						<Icon
							size="s"
							iconName="x"
						></Icon>
					</button>
				{/snippet}
			</StyledHorizontalTabTrigger>
		</OverflowContainer>
	</div>
	<button
		class="tab-navigation__add-button"
		onclick={() => addTab()}
	>
		<Icon iconName="plus"></Icon>
	</button>
</div>

{#each tabs as tab (tab)}
	<TabContent tabIdentifier={tab.tabIdentifier}
		>this is the tab with identifier {tab.tabIdentifier}</TabContent
	>
{/each}

<style lang="scss">
	.tab-navigation {
		display: flex;
		gap: 0.5rem;
		width: 100%;
		position: relative;

		&__add-button {
			padding: var(--padding-xs);
			border-radius: var(--border-radius-s);
			background-color: var(--hover-color);
		}
	}

	.tab-trigger-wrapper {
		display: flex;
		width: 100%;
		min-width: 0;
	}
</style>
