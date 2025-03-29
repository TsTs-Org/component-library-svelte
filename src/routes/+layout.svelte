<script>
	let { children } = $props();
	import Icon from "$lib/components/Icon.svelte";
	import Link from "$lib/components/Link.svelte";
	import NavigationBar from "$lib/components/NavigationBar.svelte";
	import Select from "$lib/components/Select.svelte";
	import Theme from "$lib/components/Theme.svelte";
	// import "$lib/styles/main.scss";
	import { getMode, setMode } from "../lib/states.svelte.js";
	import { setPrimaryColor } from "$lib/utils/themeManager.js";

	let primaryColor = $state("seagreen");

</script>

<Theme/>

<div class={getMode() + "-mode page"}>
	<NavigationBar variant="glass">
		<div>
			<Link href="/">Home</Link>
			<Link href="/colors">Colors</Link>
			<Link href="/components">Components</Link>
		</div>

		<div class="right">
			<Select 
				bind:value={primaryColor}
				on:change={() => setPrimaryColor(primaryColor)}
				variant="ghost"
				placeholder="Theme"
				options={[
					{ value: "rebeccapurple", label: "Thingypurple" },
					{ value: "royalblue", label: "Royalblue" },
					{ value: "seagreen", label: "Seagreen"},
					{ value: "#F45D01", label: "Sunrise" },
					{ value: "#D36135", label: "Charmander" },
					{ value: "#3E5641", label: "Forest" },
				]}
			/>
			<button aria-label="Toggle light/dark mode" onclick={() => setMode()}>
				{#if getMode() === "light"}
					<Icon iconName="sun" />
				{:else}
					<Icon iconName="moon"/>
				{/if}
			</button>
		</div>
	</NavigationBar>

	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.page {
		position: relative;
		height: 100vh;
		overflow: auto;
		box-sizing: border-box;
		background-color: var(--background-color);
	}

	.content {
		height: 100%;
	}

	.right {
		display: flex;
		align-items: center;
		gap: var(--padding-m);
	}
</style>
