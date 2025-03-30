<script>
	import "$lib/styles/main.css";
	import "$lib/styles/theme.css";

	let { children } = $props();
	import Icon from "$lib/components/Icon.svelte";
	import Link from "$lib/components/Link.svelte";
	import NavigationBar from "$lib/components/NavigationBar.svelte";
	import Select from "$lib/components/Select/Select.svelte";
	import SelectItem from "$lib/components/Select/SelectItem.svelte";
	// import "$lib/styles/main.scss";
	import { getMode, setMode } from "../lib/states.svelte.js";
	import { setPrimaryColor } from "$lib/utils/themeManager.js";

	let primaryColor = $state("seagreen");
</script>

<div class={getMode() + "-mode page"}>
	<NavigationBar variant="glass">
		<div>
			<Link href="/">Home</Link>
			<Link href="/colors">Colors</Link>
			<Link href="/blocks">Blocks</Link>
			<Link href="/components">Components</Link>
		</div>

		<div class="right">
			<Select
				bind:value={primaryColor}
				onchange={(color) => setPrimaryColor(color)}
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
					label="Sunrise"
				/>
				<SelectItem
					value="#D36135"
					label="Charmander"
				/>
				<SelectItem
					value="#3E5641"
					label="Forest"
				/>
			</Select>
			<button
				aria-label="Toggle light/dark mode"
				onclick={() => setMode()}
			>
				{#if getMode() === "light"}
					<Icon iconName="sun" />
				{:else}
					<Icon iconName="moon" />
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
