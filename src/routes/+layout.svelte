<script>
	import "$lib/styles/main.css";
	import "$lib/styles/theme.css";
	import "$lib/styles/charts.css";
	import { base } from "$app/paths";

	let { children } = $props();
	import Icon from "$lib/components/Icon.svelte";
	import { mountTheme, theme } from "$lib/utils/themify.svelte.js";
	import Navigationbar from "$lib/components/Navigationbar/Navigationbar.svelte";
	import NavigationbarItem from "$lib/components/Navigationbar/NavigationbarItem.svelte";
	import Button from "$lib/components/Button.svelte";
	import Sidebar from "$lib/components/Sideabar/Sidebar.svelte";
	import Layout from "$lib/components/Layout/Layout.svelte";

	let sidebarCollapsed = $state(false);
	let sidebarClosed = $state(false);
</script>

<svelte:head>
	<title>Docsmocs</title>

	<script type="module">
		let x = JSON.parse(localStorage.getItem("_theme"));

		const themeValues = [
			"background_color",
			"foreground_color",
			"text_color",
			"text_color_muted",
			"text_color_inverted",
			"border_color",
			"hover_color",
			"neutral_hover_color",
		];

		const defaults = {
			lightMode: true,
			primaryColor: "royalblue",
			padding: "0.75rem",
			borderRadius: "0.5rem",
			colorInfluence: "0.01",
			fontSize: "1rem",
			lightValues: {
				background_color: "var(--neutral-100)",
				foreground_color: "var(--neutral-200)",

				text_color: "var(--neutral-800)",
				text_color_muted: "var(--neutral-500)",
				text_color_inverted: "var(--neutral-200)",

				border_color: "var(--neutral-400)",
				hover_color: "var(--neutral-300)",
				neutral_hover_color: "var(--neutral-400)",
			},
			darkValues: {
				background_color: "var(--neutral-900)",
				foreground_color: "var(--neutral-800)",

				text_color: "var(--neutral-200)",
				text_color_muted: "var(--neutral-300)",
				text_color_inverted: "var(--neutral-200)",

				border_color: "var(--neutral-600)",
				hover_color: "var(--neutral-600)",
				neutral_hover_color: "var(--neutral-700)",
			},
		};

		function setModeColors(colors) {
			const formatted_keys = [];
			themeValues.map((key) => {
				key = key.replaceAll("_", "-");
				formatted_keys.push(key);
			});
			formatted_keys.forEach((key, i) => {
				document.documentElement.style.setProperty(`--${key}`, colors[themeValues[i]] ?? "red");
			});
		}

		document.documentElement.style.setProperty("--primary-color", x.primaryColor ?? "royalblue");
		document.documentElement.style.setProperty("--border-radius-s", x.borderRadius ?? ".75rem");
		document.documentElement.style.setProperty("--padding-s", x.padding ?? ".5rem");
		document.documentElement.style.setProperty("--color-influence", x.colorInfluence ?? "0.01");
		document.documentElement.style.setProperty("--text-size-s", x.fontSize ?? "1rem");
		setModeColors(
			x.lightMode ? (x.lightValues ?? defaults.lightValues) : (x.darkValues ?? defaults.darkValues)
		);
	</script>
</svelte:head>

<Layout>
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
				<Button
					variant="ghost"
					onclick={() => (sidebarCollapsed = !sidebarCollapsed)}
				>
					{#snippet icon()}
						<Icon iconName={sidebarCollapsed ? "burgerMenu" : "x"} />
					{/snippet}
				</Button>
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
	{/snippet}

	{#snippet leftSidebar()}
		<Sidebar
			{sidebarClosed}
			{sidebarCollapsed}
		>
			<h2>Hello</h2>
		</Sidebar>
	{/snippet}

	{@render children()}
</Layout>
