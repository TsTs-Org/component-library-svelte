<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<tfoot>
	{@render children?.()}
</tfoot>

<style lang="scss">
	tfoot {
		background-color: var(--neutral-hover-color);
	}
</style>
