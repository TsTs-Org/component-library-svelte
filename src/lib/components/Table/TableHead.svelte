<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();
</script>

<th style="width: min-content">
	{@render children?.()}
</th>

<style>
	th {
		text-align: left;
		padding: var(--padding-m);
		/* font-weight: 600; */
		font-size: var(--text-size-s);
		/* color: var(--text-color-muted); */
		display: none;
	}
</style>
