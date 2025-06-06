<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();
</script>

<th>
	{@render children?.()}
</th>

<style>
	th {
		text-align: left;
		padding: var(--padding-s);
		font-weight: 600;
		font-size: var(--text-size-xs);
		color: var(--text-color-muted);
		display: none;
	}
</style>
