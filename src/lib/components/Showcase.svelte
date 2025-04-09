<script lang="ts">
	import { theme } from "$lib/utils/themify.svelte.js";
	import Card from "./Card.svelte";
	import Icon from "./Icon.svelte";
	let { name, children } = $props();
	let localLightMode = $state($theme.lightMode);
	const setMode = () => {
		localLightMode = !localLightMode;
	};
	theme.subscribe((x) => {
		localLightMode = x.lightMode;
	});
</script>

<div class={localLightMode ? "light-mode" : "dark-mode"}>
	<Card size="l">
		{#snippet title()}{name}{/snippet}
		{#snippet iconRight(size)}
			<button
				aria-label="Toggle light/dark mode"
				onclick={() => setMode()}
			>
				<Icon
					iconName={localLightMode ? "sun" : "moon"}
					{size}
				></Icon>
			</button>
		{/snippet}
		<div class="content-wrapper">{@render children?.()}</div>
	</Card>
</div>

<style lang="scss">
	.content-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
</style>
