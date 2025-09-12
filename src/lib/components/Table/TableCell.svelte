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
		padding: var(--padding-s) var(--padding-m);
		font-size: var(--text-size-s);
		color: var(--text-color-muted);
		display: none;
	}
</style>
