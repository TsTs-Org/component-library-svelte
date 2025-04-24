<script lang="ts">
	import SimpleLogin from "$lib/blocks/Authentication/SimpleLogin.svelte";
	import LoginAndRegister from "$lib/blocks/Authentication/LoginAndRegister.svelte";
	import Sidebar from "$lib/components/Sideabar/Sidebar.svelte";
	import { Button, Navigationbar, NavigationbarItem } from "$lib/index.js";
	import SidebarItem from "$lib/components/Sideabar/SidebarItem.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Layout from "$lib/components/Layout/Layout.svelte";
</script>

<div class="blocks-page">
	<div class="mock-block">
		<Layout>
			{#snippet topnav()}
				<Navigationbar variant="glass">
					{#snippet left()}
						<NavigationbarItem href="#1">Home</NavigationbarItem>
						<NavigationbarItem href="#2">Blocks</NavigationbarItem>
						<NavigationbarItem href="#3">Components</NavigationbarItem>
					{/snippet}
				</Navigationbar>
			{/snippet}

			{#snippet leftSidebar()}
				<Sidebar
					center
					variant="glass"
				>
					<SidebarItem>
						{#snippet icon()}
							<Icon iconName="sun"></Icon>
						{/snippet}
						Dashboard
					</SidebarItem>
					<SidebarItem>Lifecycle</SidebarItem>
					<SidebarItem>Analytics</SidebarItem>
					<SidebarItem>Projects</SidebarItem>
					{#snippet sidebarFooter()}
						<Button variant="ghost">Logout</Button>
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
