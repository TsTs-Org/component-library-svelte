<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import Input from "../Input.svelte";
	import Multiselect from "../Multiselect/Multiselect.svelte";
	import MultiselectItem from "../Multiselect/MultiselectItem.svelte";

	type Props = {
		children: Snippet;
		initial: Array<number>;
	};

	let { children, initial = [] }: Props = $props();
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
		<Input
			placeholder="Search"
			type="search"
			bind:value={searchValue}
		/>
		<Multiselect
			placeholder="Columns"
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
	</div>
	<table bind:this={table}>
		{@render children?.()}
	</table>
</div>

<style lang="scss">
	.Table {
		.header {
			display: flex;
			justify-content: space-between;
		}
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
</style>
