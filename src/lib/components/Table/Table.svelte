<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import Input from "../Input.svelte";
	import Multiselect from "../Multiselect/Multiselect.svelte";
	import MultiselectItem from "../Multiselect/MultiselectItem.svelte";
	import TableBody from "./TableBody.svelte";
	import TableCell from "./TableCell.svelte";

	type Props = {
		children: Snippet;
		initial?: Array<string>;
		ignoreColumns?: Array<string>;
		searchbar?: boolean;
		bordered?: boolean;
		headerAction?: Snippet;
	};

	let {
		children,
		initial = [],
		ignoreColumns = [],
		searchbar = false,
		bordered = false,
		headerAction,
	}: Props = $props();

	let columns: Array<string> = $state([]);
	let activeColumns: Array<number> = $state([]);
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

	function searchStringInCells(searchString: string) {
		const tbody = table.querySelector("tbody");
	
		if (!tbody) {
			console.error("No <tbody> found in the table.");
			return;
		}

		for (let i = 0; i < tbody.rows.length; i++) {
			let rowContainsString = false;
	
			activeColumns.forEach((j) => {
				const cellText = tbody.rows[i].cells[j].textContent || tbody.rows[i].cells[j].innerText;
				if (cellText.toLowerCase().includes(searchString.toLowerCase())) {
					rowContainsString = true;
				}
			});
			tbody.rows[i].style.display = rowContainsString ? "" : "none";
		}
	}

	function properlyRoundCorners() {
		const firstRow = table.rows[0];
		const lastRow = table.rows[table.rows.length - 1];
		if (firstRow) {
			firstRow.cells[0].style.borderTopLeftRadius = "var(--border-radius-s)";
			firstRow.cells[firstRow.cells.length - 1].style.borderTopRightRadius = "var(--border-radius-s)";
		}
		if (lastRow) {
			lastRow.cells[0].style.borderBottomLeftRadius = "var(--border-radius-s)";
			lastRow.cells[lastRow.cells.length - 1].style.borderBottomRightRadius = "var(--border-radius-s)";
			lastRow.style.borderBottom = "none"; // Remove bottom border for last row
		}
	}

	function getAllColumns() {
		const headers = table.querySelectorAll("th");
		columns = Array.from(headers).map((header) => header.textContent) as Array<string>;
	}

	function enableInitialColumns() {
		getAllColumns();
		// If no initial columns are provided, select all
		if (initial.length == 0) { initial = columns; }
		activeColumns = [];
		for (let i = 0; i < columns.length; i++) {
			setColumnDisplay(i, initial.includes(columns[i]));
		}
	}

	$effect(() => {
		searchStringInCells(searchValue);
	});

	onMount(() => {
		properlyRoundCorners();
		enableInitialColumns();
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
				{#if !ignoreColumns.includes(col)}
				<MultiselectItem
					value={col}
					label={col}
					onchange={(newVal) => {
						setColumnDisplay(i, newVal as boolean);
					}}
				/>
				{/if}
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
		<div class="headerAction">
			{@render headerAction?.()}
		</div>
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
			.headerAction {
				display: flex;
				align-items: center;
			}
		}
	}
	._table {
		&.bordered {
			border: thin solid var(--border-color);
			border-radius: var(--border-radius-s);
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
