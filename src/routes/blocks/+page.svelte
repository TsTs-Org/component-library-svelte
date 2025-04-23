<script lang="ts">
	import SimpleLogin from "$lib/blocks/Authentication/SimpleLogin.svelte";
	import LoginAndRegister from "$lib/blocks/Authentication/LoginAndRegister.svelte";
	import Sidebar from "$lib/components/Sideabar/Sidebar.svelte";
	import { Button, Navigationbar, NavigationbarItem } from "$lib/index.js";
	import SidebarItem from "$lib/components/Sideabar/SidebarItem.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Layout from "$lib/components/Layout/Layout.svelte";
	import BaseChart from "$lib/components/Chart/BaseChart.svelte";
	import Tabs from "$lib/components/Tabs/Tabs.svelte";
	import TabContent from "$lib/components/Tabs/TabContent.svelte";
	import AutoGenerateTriggers from "$lib/components/Tabs/AutoGenerateTriggers.svelte";
	import DynamicHorizontalTabs from "$lib/blocks/Tabs/DynamicHorizontalTabsBlock.svelte";
	let sidebarClosed = $state(false);
</script>

<div class="blocks-page">
	<div class="mock-block">
		<Layout style="height: 100%">
			{#snippet topnav()}
				<Navigationbar variant="glass">
					{#snippet left()}
						<Button
							variant="ghost"
							onclick={() => (sidebarClosed = !sidebarClosed)}
						>
							{#snippet icon()}
								<Icon iconName={sidebarClosed ? "sun" : "moon"} />
							{/snippet}
						</Button>
						<NavigationbarItem href="#1">Home</NavigationbarItem>
						<NavigationbarItem href="#2">Blocks</NavigationbarItem>
						<NavigationbarItem href="#3">Components</NavigationbarItem>
					{/snippet}
				</Navigationbar>
			{/snippet}

			{#snippet leftSidebar()}
				<Sidebar {sidebarClosed}>
					{#snippet sidebarHeader(collapsed)}
						{#if !collapsed()}
							<BaseChart
								chartType="line"
								displayTooltip
								yGrid
								yAxis
								xAxis
								labels={["January", "February", "March", "May", "June"]}
								data={[
									{
										title: "DataOne",
										data: [12, 19, 5, 5, 12, 15],
									},
									{
										title: "DataTwo",
										data: [2, 8, 2, 11, 7, 4],
									},
								]}
							></BaseChart>
						{/if}
					{/snippet}
					{#each ["Dashboard", "Lifecycle", "Analytics", "Projects"] as name}
						<SidebarItem size="s">{name}</SidebarItem>
					{/each}
					{#snippet sidebarFooter()}
						<SidebarItem>Logout</SidebarItem>
					{/snippet}
				</Sidebar>
			{/snippet}

			<h2 style="margin: auto">Main Content</h2>
		</Layout>
		<div style="padding: .5rem">
			<Tabs defaultTab="tab1">
				<div style="display: flex">
					<AutoGenerateTriggers>
						{#snippet tabTrigger(selectTab, isSelected, tabIdentifier)}
							<Button
								onclick={selectTab}
								style={isSelected() ? "background-color: var(--hover-color)" : ""}
								>{tabIdentifier}</Button
							>
						{/snippet}
					</AutoGenerateTriggers>
				</div>
				<TabContent tabIdentifier="tab1">
					<h3>Tabs in tab</h3>

					<Tabs>
						<DynamicHorizontalTabs></DynamicHorizontalTabs>
					</Tabs>
				</TabContent>
				<TabContent tabIdentifier="tab2">this is tab 2</TabContent>
				<TabContent tabIdentifier="tab3">this is tab 3</TabContent>
				<TabContent tabIdentifier="tab4">this is tab 4</TabContent>
			</Tabs>
		</div>
	</div>
	<div class="mock-block">
		<Sidebar>
			<SidebarItem>Item</SidebarItem>
			<SidebarItem>Item</SidebarItem>
			<SidebarItem>Item</SidebarItem>
			<SidebarItem>Item</SidebarItem>
		</Sidebar>
	</div>
	<div class="mock-block">
		<SimpleLogin
			onsubmit={(data) => {
				console.log(data);
			}}
			service="MockService"
			header="Welcome back"
			description="Login to your account"
		/>
	</div>
	<div class="mock-block">
		<LoginAndRegister
			onsubmit={(data) => {
				console.log(data);
			}}
			service="MockService"
			loginHeader="Login"
			loginDescription="Login to your account"
			registerHeader="Register"
			registerDescription="Create a new account"
		/>
	</div>
</div>

<style lang="scss">
	@media (max-width: 900px) {
		.mock-block {
			aspect-ratio: 9/16;
		}
	}

	@media (min-width: 900px) {
		.mock-block {
			aspect-ratio: 16/9;
		}
	}

	.mock-block {
		display: flex;
		overflow: hidden;
		border: thin solid var(--border-color);
		border-radius: var(--border-radius-m);
	}
	.blocks-page {
		box-sizing: border-box;
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		gap: var(--padding-l);
		padding: var(--padding-l);
	}
</style>
