<script lang="ts">
	import { getContext, onMount } from "svelte";

	let { children, title, open = false } = $props();

	const ctx = getContext("ctx");
	const selected = ctx.selected;

	const self = {};
	let _open = open;

	onMount(() => {
		if (_open) $selected = self;
		return selected.subscribe((x) => (open = x === self));
	});
</script>

<button onclick={() => selected.set(open ? {} : self)}>
	<h2>{title}</h2>
	{#if open}
		{@render children?.()}
	{/if}
</button>
