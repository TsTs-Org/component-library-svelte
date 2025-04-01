<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<td>
	{@render children?.()}
</td>

<style>
	td {
		padding: var(--padding-s);
		font-size: 0.9rem;
	}
</style>
