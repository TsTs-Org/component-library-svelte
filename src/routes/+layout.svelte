<script>
	import { base } from "$app/paths";

	let { children } = $props();
	import Icon from "$lib/components/Icon.svelte";
	import Navigationbar from "$lib/components/Navigationbar/Navigationbar.svelte";
	import NavigationbarItem from "$lib/components/Navigationbar/NavigationbarItem.svelte";
	import Button from "$lib/components/Button.svelte";
	import Sidebar from "$lib/components/Sideabar/Sidebar.svelte";
	import Layout from "$lib/components/Layout/Layout.svelte";
	import SidebarItem from "$lib/components/Sideabar/SidebarItem.svelte";
	import Seperator from "$lib/components/Seperator.svelte";
	import Themify from "$lib/components/Themify.svelte";
	import ThemeModeButton from "$lib/components/ThemeModeButton.svelte";

	let sidebarCollapsed = $state(true);
	let customActive = $state(false);
</script>

<svelte:head>
	<title>Docsmocs</title>
</svelte:head>

<Themify />

<Layout mainLayout>
	{#snippet topnav()}
		<Navigationbar variant="glass">
			{#snippet left()}
				<Button
					variant="ghost"
					onclick={() => (sidebarCollapsed = !sidebarCollapsed)}
				>
					{#snippet icon()}
						<Icon iconName={sidebarCollapsed ? "menu" : "close"} />
					{/snippet}
				</Button>
				<NavigationbarItem href="{base}/">Home</NavigationbarItem>
				<NavigationbarItem href="{base}/components">Components</NavigationbarItem>
			{/snippet}
			{#snippet right()}
				<ThemeModeButton />
			{/snippet}
		</Navigationbar>
	{/snippet}

	{#snippet leftSidebar()}
		<Sidebar
			center
			{sidebarCollapsed}
		>
			<SidebarItem href="{base}/">
				{#snippet icon(size, filled)}
					<Icon
						iconName="home"
						{size}
						{filled}
						color="inherit"
					></Icon>
				{/snippet}
				Home
			</SidebarItem>
			<SidebarItem href="{base}/components">
				{#snippet icon(size, filled)}
					<Icon
						iconName="folder"
						{size}
						{filled}
						color="inherit"
					></Icon>
				{/snippet}
				Components
			</SidebarItem>
			<Seperator
				horizontal
				thick
			></Seperator>
			<SidebarItem
				onclick={() => (customActive = !customActive)}
				active={customActive}
			>
				{#snippet icon(size, filled)}
					<Icon
						iconName="account_circle"
						{size}
						{filled}
						color="inherit"
					></Icon>
				{/snippet}
				Projects
			</SidebarItem>

			{#snippet sidebarFooter(collapsed)}
				{#if collapsed() || !collapsed()}
					<SidebarItem href="{base}/test">
						{#snippet icon(size, filled)}
							<Icon
								iconName="settings"
								{size}
								{filled}
								color="inherit"
							></Icon>
						{/snippet}
						Settings
					</SidebarItem>
				{/if}
			{/snippet}
		</Sidebar>
	{/snippet}

	<div class="page">
		{@render children()}
	</div>
</Layout>

<style>
	.page {
		padding: var(--padding-l);
	}
</style>
