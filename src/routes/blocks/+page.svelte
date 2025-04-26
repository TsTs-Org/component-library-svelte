<script lang="ts">
	import SimpleLogin from "$lib/blocks/Authentication/SimpleLogin.svelte";
	import LoginAndRegister from "$lib/blocks/Authentication/LoginAndRegister.svelte";
	import Sidebar from "$lib/components/Sideabar/Sidebar.svelte";
	import { Button, Navigationbar, NavigationbarItem } from "$lib/index.js";
	import SidebarItem from "$lib/components/Sideabar/SidebarItem.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Layout from "$lib/components/Layout/Layout.svelte";
	import BaseChart from "$lib/components/Chart/BaseChart.svelte";
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
