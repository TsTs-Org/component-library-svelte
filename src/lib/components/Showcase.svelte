<script lang="ts">
	import { _mode } from "$lib/utils/themify.svelte.js";
	import Card from "./Card.svelte";
	import Icon from "./Icon.svelte";
	let { name, children } = $props();
	let localMode = $state($_mode);
	const setMode = () => {
		localMode === "light" ? (localMode = "dark") : (localMode = "light");
	};
</script>

<div class={localMode + "-mode"}>
	<Card size="l">
		{#snippet title()}{name}{/snippet}
		{#snippet iconRight(size)}
			<button
				aria-label="Toggle light/dark mode"
				onclick={() => setMode()}
			>
				{#if localMode === "light"}
					<Icon
						iconName="sun"
						{size}
					></Icon>
				{:else}
					<Icon
						iconName="moon"
						{size}
					></Icon>
				{/if}
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
