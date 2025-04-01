<script lang="ts">
	import type { Snippet } from "svelte";
	import Input from "../Input.svelte";
	import Select from "../Select/Select.svelte";
	import SelectItem from "../Select/SelectItem.svelte";

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
	let table;
	function setColumnDisplay(columnIndex: number, value: "none" | "flex") {
		const rows = table.rows;

		for (let i = 0; i < rows.length; i++) {
			rows[i].cells[columnIndex].style.display = value;
		}
	}
</script>

<div class="Table">
	<div class="header">
		<Input
			placeholder="Search"
			type="search"
		/>
		<Select placeholder="Columns">
			<SelectItem
				value="apple"
				label="Apple"
			/>
			<SelectItem
				value="banana"
				label="Banana"
			/>
			<SelectItem
				value="orange"
				label="Orange"
			/>
			<SelectItem
				value="grape"
				label="Grape"
			/>
		</Select>
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
