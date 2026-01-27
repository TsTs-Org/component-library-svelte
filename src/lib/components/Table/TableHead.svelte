<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	import type { TableCtx } from "./Table.svelte";

	type Props = {
		_for: string;
		children?: Snippet;
	};

	let { _for, children }: Props = $props();

	let activeColumns = $state()
	const ctx: TableCtx = getContext("TableCtx")
	onMount(() => {
		return ctx.activeColumns.subscribe((x) => {
			activeColumns = x
		})
	})
</script>

<th 
	style="width: min-content"
	data-for={_for}
	hidden={!activeColumns?.includes(_for)}
>
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

	th:not([hidden]) {
		display: table-cell;
	}
</style>
