<script>
	import "$lib/styles/main.css";
	import "$lib/styles/theme.css";
	import { base } from "$app/paths";

	let { children } = $props();
	import Icon from "$lib/components/Icon.svelte";
	import Select from "$lib/components/Select/Select.svelte";
	import SelectItem from "$lib/components/Select/SelectItem.svelte";
	import Themify from "$lib/components/Themify.svelte";
	import { theme } from "$lib/utils/themify.svelte.js";
	import Navigationbar from "$lib/components/Navigationbar/Navigationbar.svelte";
	import NavigationbarItem from "$lib/components/Navigationbar/NavigationbarItem.svelte";
</script>

<Themify>
	<Navigationbar variant="glass">
		{#snippet left()}
			<NavigationbarItem href="{base}/">Home</NavigationbarItem>
			<!-- <NavigationbarItem href="/colors">Colors</NavigationbarItem> -->
			<NavigationbarItem href="{base}/blocks">Blocks</NavigationbarItem>
			<NavigationbarItem href="{base}/components">Components</NavigationbarItem>
			<NavigationbarItem href="{base}/settings">Settings</NavigationbarItem>
		{/snippet}
		<h3>Testo</h3>
		{#snippet right()}
			<Select
				value={$theme.primaryColor}
				onchange={(color) =>
					theme.update((x) => {
						x.primaryColor = color;
						return x;
					})}
				variant="ghost"
				placeholder="Theme"
			>
				<SelectItem
					value="rebeccapurple"
					label="Thingypurple"
				/>
				<SelectItem
					value="royalblue"
					label="Royalblue"
				/>
				<SelectItem
					value="seagreen"
					label="Seagreen"
				/>
				<SelectItem
					value="#F45D01"
					label="Charmander"
				/>
				<SelectItem
					value="#b08968"
					label="Creamy"
				/>
			</Select>
			<button
				aria-label="Toggle light/dark mode"
				onclick={() =>
					theme.update((x) => {
						x.lightMode = !x.lightMode;
						console.log(x);
						return x;
					})}
			>
				{#if $theme.lightMode}
					<Icon iconName="sun" />
				{:else}
					<Icon iconName="moon" />
				{/if}
			</button>
		{/snippet}
	</Navigationbar>

	<div class="content">
		{@render children()}
	</div>
</Themify>

<style>
	.content {
		flex: 1;
	}
</style>
