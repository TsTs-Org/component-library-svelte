<script>
	import { Button, Icon } from "$lib/index.js";
	import { theme } from "$lib/components/Themify.svelte";
</script>

<Button
	variant="ghost"
	onclick={() =>
		theme.update((x) => {
			x.lightMode = !x.lightMode;
			return x;
		})}
>
	{#snippet icon()}
		<Icon iconName={$theme.lightMode ? "light_mode" : "dark_mode"} />
	{/snippet}
</Button>
