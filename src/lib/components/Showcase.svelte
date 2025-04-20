<script lang="ts">
	import Card from "./Card.svelte";
	let { name, children } = $props();
</script>

<Card
	size="l"
	transparent
>
	{#snippet title()}{name}{/snippet}
	<div class="content-wrapper">{@render children?.()}</div>
</Card>

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
