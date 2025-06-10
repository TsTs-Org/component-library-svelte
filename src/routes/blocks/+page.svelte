<script lang="ts">
	import Sidebar from "$lib/components/Sideabar/Sidebar.svelte";
	import { Seperator, ThemeSettings } from "$lib/index.js";
	import SidebarItem from "$lib/components/Sideabar/SidebarItem.svelte";
	import Layout from "$lib/components/Layout/Layout.svelte";
	import Tabs from "$lib/components/Tabs/Tabs.svelte";
	import TabContent from "$lib/components/Tabs/TabContent.svelte";
	import TabTrigger from "$lib/components/Tabs/TabTrigger.svelte";

	import ScLayout from "../../showcase/blocks/sc-Layout.svelte";
	import ScTabs from "../../showcase/blocks/sc-Tabs.svelte";
	import ScSimpleLogin from "../../showcase/blocks/sc-SimpleLogin.svelte";
	import ScLoginAndRegister from "../../showcase/blocks/sc-LoginAndRegister.svelte";
	let activeTab = $state("");

	const ShowCases = [
		{
			name: "Layout",
			identifier: "sc-layout",
			component: ScLayout
		},
		{
			name: "Tabs",
			identifier: "sc-tabs",
			component: ScTabs
		},
		{
			name: "Simple Login",
			identifier: "sc-simple-login",
			component: ScSimpleLogin
		},
		{
			name: "Login and Register",
			identifier: "sc-login-and-register",
			component: ScLoginAndRegister
		}
	].sort((a, b) => a.name.localeCompare(b.name));
</script>

<Tabs>
<Layout>

	{#snippet leftSidebar()}
		<Sidebar>
			<h4> Blocks </h4>
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