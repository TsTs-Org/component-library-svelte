<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import Input from "../Input.svelte";
	import Multiselect from "../Multiselect/Multiselect.svelte";
	import MultiselectItem from "../Multiselect/MultiselectItem.svelte";
	import TableBody from "./TableBody.svelte";
	import TableCell from "./TableCell.svelte";

	type Props = {
		children: Snippet;
		initial?: Array<number>;
		searchbar?: boolean;
		bordered?: boolean;
	};

	let { children, initial = [], searchbar = false, bordered = false }: Props = $props();
	let columns: Array<string> = $state([]);
	let activeColumns: Array<number> = $state(initial);
	let searchValue: string = $state("");
	let table: HTMLTableElement;

	function setColumnDisplay(columnIndex: number, display: boolean) {
		for (let i = 0; i < table.rows.length; i++) {
			table.rows[i].cells[columnIndex].style.display = display ? "table-cell" : "none";
		}
		display
			? activeColumns.push(columnIndex)
			: (activeColumns = activeColumns.filter((curr) => curr != columnIndex));
	}

	$effect(() => {
		const tbody = table.querySelector("tbody");

		if (!tbody) {
			console.error("No <tbody> found in the table.");
			return;
		}
		for (let i = 0; i < tbody.rows.length; i++) {
			let rowContainsString = false;

			activeColumns.forEach((j) => {
				const cellText = tbody.rows[i].cells[j].textContent || tbody.rows[i].cells[j].innerText;

				if (cellText.toLowerCase().includes(searchValue.toLowerCase())) {
					rowContainsString = true;
				}
			});
			tbody.rows[i].style.display = rowContainsString ? "" : "none";
		}
	});

	onMount(() => {
		const headers = table.querySelectorAll("th");
		columns = Array.from(headers).map((header) => header.textContent) as Array<string>;
	});
</script>

<div class="Table">
	<div class="header">
		<Multiselect
			placeholder="Columns"
			size="s"
			{initial}
		>
			{#each columns as col, i}
				<MultiselectItem
					value={i}
					label={col}
					onchange={(newVal) => {
						setColumnDisplay(i, newVal as boolean);
					}}
				/>
			{/each}
		</Multiselect>
		{#if searchbar}
			<Input
				placeholder="Search"
				type="search"
				size="s"
				bind:value={searchValue}
			/>
		{/if}
	</div>
	<div
		class="_table"
		class:bordered
	>
		<table bind:this={table}>
			{@render children?.()}
			{#if activeColumns.length == 0}
				<TableBody>
					<TableCell><p class="emptyText">No Columns Selected</p></TableCell>
				</TableBody>
			{/if}
		</table>
	</div>
</div>

<style lang="scss">
	.Table {
		width: 100%;
		display: table;
		.header {
			display: flex;
			justify-content: space-between;
			gap: var(--padding-xs);
		}
	}
	._table {
		&.bordered {
			border: thin solid var(--border-color);
			border-radius: var(--border-radius-s);
			overflow: hidden;
		}
	}
	.emptyText {
		width: 100%;
		text-align: center;
		color: var(--text-color-muted);
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
</style>
