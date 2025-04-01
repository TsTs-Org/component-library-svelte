<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<tr>
	{@render children?.()}
</tr>

<style lang="scss">
	tr {
		border-bottom: thin solid var(--border-color);
		&:hover {
			background-color: var(--neutral-hover-color);
		}
	}
</style>
