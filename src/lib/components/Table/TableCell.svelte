<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	import type { TableCtx } from "./Table.svelte";

	type Props = {
		_for: string;
		_value?: any;
		children?: Snippet;
		style?: string;
	};

	let { _for, _value, children, style }: Props = $props();

	let activeColumns = $state()
	const ctx: TableCtx = getContext("TableCtx")
	onMount(() => {
		return ctx.activeColumns.subscribe((x) => {
			activeColumns = x
		})
	})

</script>

<td
	{style}
	hidden={!activeColumns?.includes(_for)}
	data-value={_value}
	data-for={_for}
>
	{@render children?.()}
</td>

<style>
	td {
		padding: var(--padding-s) var(--padding-m);
		font-size: var(--text-size-s);
		color: var(--text-color-muted);
		display: none
	}
	
	td:not([hidden]) {
		display: table-cell;
	}
</style>
