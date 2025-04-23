<script>
	import "$lib/styles/main.css";
	import "$lib/styles/theme.css";
	import "$lib/styles/charts.css";
	import { base } from "$app/paths";

	let { children } = $props();
	import Icon from "$lib/components/Icon.svelte";
	import Themify from "$lib/components/Themify.svelte";
	import { theme } from "$lib/utils/themify.svelte.js";
	import Navigationbar from "$lib/components/Navigationbar/Navigationbar.svelte";
	import NavigationbarItem from "$lib/components/Navigationbar/NavigationbarItem.svelte";
	import Button from "$lib/components/Button.svelte";
	import Sidebar from "$lib/components/Sideabar/Sidebar.svelte";
</script>

<svelte:head>
	<title>Docsmocs</title>
</svelte:head>

<Themify>
	<Navigationbar variant="glass">
		{#snippet left()}
			<NavigationbarItem href="{base}/">Home</NavigationbarItem>
			<NavigationbarItem href="{base}/blocks">Blocks</NavigationbarItem>
			<NavigationbarItem href="{base}/components">Components</NavigationbarItem>
		{/snippet}
		{#snippet right()}
			<Button
				variant="ghost"
				onclick={() =>
					theme.update((x) => {
						x.lightMode = !x.lightMode;
						return x;
					})}
			>
				{#snippet icon()}
					<Icon iconName={$theme.lightMode ? "sun" : "moon"} />
				{/snippet}
			</Button>
		{/snippet}
	</Navigationbar>

	<Sidebar>
		<h2>Hello</h2>
	</Sidebar>

	<div class="content">
		{@render children()}
	</div>
</Themify>

<style>
	.content {
		flex: 1;
	}
</style>
