<script lang="ts">
	import ThemeSettings from "$lib/blocks/ThemeSettings.svelte";
	import Tabs from "$lib/components/Tabs/Tabs.svelte";
	import TabTrigger from "$lib/components/Tabs/TabTrigger.svelte";
	import TabContent from "$lib/components/Tabs/TabContent.svelte";
	import Layout from "$lib/components/Layout/Layout.svelte";
	import { Seperator, Sidebar, SidebarItem } from "$lib/index.js";
	import ScOverflowContainer from "../../showcase/components/sc-OverflowContainer.svelte";
	import ScTabs from "../../showcase/components/sc-Tabs.svelte";
	import ScButtons from "../../showcase/components/sc-Buttons.svelte";
	import ScCharts from "../../showcase/components/sc-Charts.svelte";
	import ScBasics from "../../showcase/components/sc-Basics.svelte";
	import ScContextmenu from "../../showcase/components/sc-Contextmenu.svelte";
	import ScPopover from "../../showcase/components/sc-Popover.svelte";
	import ScSelect from "../../showcase/components/sc-Select.svelte";
	import ScInput from "../../showcase/components/sc-Input.svelte";
	import ScTable from "../../showcase/components/sc-Table.svelte";
	import ScAccordion from "../../showcase/components/sc-Accordion.svelte";
	import ScCard from "../../showcase/components/sc-Card.svelte";
	import ScScrollContainer from "../../showcase/components/sc-ScrollContainer.svelte";
	import ScIcons from "../../showcase/components/sc-Icons.svelte";

	let activeTab = $state("");

	const ShowCases = [
		{
			name: "Tabs",
			identifier: "sc-tabs",
			component: ScTabs
		},
		{
			name: "Charts",
			identifier: "sc-charts",
			component: ScCharts
		},
		{
			name: "Table",
			identifier: "sc-table",
			component: ScTable
		},
		{
			name: "Accordion",
			identifier: "sc-accordion",
			component: ScAccordion
		},
		{
			name: "Overflow Container",
			identifier: "sc-overflow-container",
			component: ScOverflowContainer
		},
		{
			name: "Buttons",
			identifier: "sc-buttons",
			component: ScButtons
		},
		{
			name: "Basics",
			identifier: "sc-basics",
			component: ScBasics
		},
		{
			name: "Icons",
			identifier: "sc-icons",
			component: ScIcons
		},
		{
			name: "Contextmenu",
			identifier: "sc-contextmenu",
			component: ScContextmenu
		},
		{
			name: "Popover",
			identifier: "sc-popover",
			component: ScPopover
		},
		{
			name: "Select",
			identifier: "sc-select",
			component: ScSelect
		},
		{
			name: "Input",
			identifier: "sc-input",
			component: ScInput
		},
		{
			name: "Card",
			identifier: "sc-card",
			component: ScCard
		},
		{
			name: "Scroll container",
			identifier: "sc-scrollcontainer",
			component: ScScrollContainer
		}
	].sort((a, b) => a.name.localeCompare(b.name));

</script>

<Tabs>
<Layout>

	{#snippet leftSidebar()}
		<Sidebar>
			<h4> Components </h4>
			<Seperator horizontal thick />

			{#each ShowCases as showcase}
				<TabTrigger tabIdentifier={showcase.identifier}>
					{#snippet trigger(selectTab)}
						<SidebarItem 
							size="s" 
							onclick={() => {
								selectTab();
								activeTab = showcase.identifier
							}} 
							active={activeTab === showcase.identifier}
						>
							{showcase.name}
						</SidebarItem>
					{/snippet}
				</TabTrigger>
			{/each}

		</Sidebar>
	{/snippet}

	<div class="theme-settings">
		<ThemeSettings
			colors={["#6a994e", "royalblue", "#9d4edd", "#FE7520", "#e63946", "#CA802B", "#99582a"]}
		/>
	</div>

	{#each ShowCases as showcase}
	<TabContent tabIdentifier={showcase.identifier}>
			<div class="components-page">
			<svelte:component this={showcase.component} />
		</div>
		</TabContent>
	{/each}

</Layout>
</Tabs>

<style lang="scss">
	.components-page {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(auto-fit, min(90vw, 30rem));
		justify-content: center;
		gap: var(--padding-l);
		padding: var(--padding-l);
	}

	// .mock-grid {
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	flex-wrap: wrap;
	// 	width: 100%;
	// 	gap: var(--padding-m);
	// }

	// .mock-box {
	// 	border: 1px solid var(--border-color);
	// 	border-radius: var(--border-radius-m);
	// 	margin: auto;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	&.fixed-size {
	// 		width: 5rem;
	// 		height: 5rem;
	// 	}
	// }
</style>
