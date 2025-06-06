<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		_for: string;
		children?: Snippet;
		style?: string;
	};

	let { _for, children, style }: Props = $props();
</script>

<td
	{style}
	data-for={_for}
>
	{@render children?.()}
</td>

<style>
	td {
		padding: var(--padding-s);
		font-size: var(--text-size-xs);
		display: none;
	}
</style>
