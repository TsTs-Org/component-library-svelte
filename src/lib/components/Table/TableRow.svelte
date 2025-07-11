<script lang="ts">
	import { onDestroy, onMount, type Snippet } from "svelte";
	import TableCell from "./TableCell.svelte";
	import Icon from "../Icon.svelte";
	import Dropdown from "../Dropdown/Dropdown.svelte";
	import ContextmenuItem from "../Contextcontainer/ContextmenuItem.svelte";
	import type { BuiltinIcon } from "$lib/utils/builtinIcons.js";

	type RowAction = {
		title: string;
		iconName?: BuiltinIcon;
		callback: Function;
	};

	type Props = {
		children: Snippet;
		rowActions?: Array<RowAction>;
	};

	let self: HTMLTableRowElement;
	let actions: HTMLButtonElement;
	let open = $state(false);
	let { children, rowActions }: Props = $props();

	function executeRowAction(callback: Function) {
		let tdElements = self.querySelectorAll("td");
		let values = {};
		tdElements.forEach((td) => {
			const key = td.getAttribute("data-for");
			if (key && key != "_none") {
				values[key] = td.textContent;
			}
		});
		callback(values);
	}

	onMount(() => {
		document.addEventListener("click", (event: MouseEvent) => {
			if (actions && !actions.contains(event.target as Node) && open) {
				open = false;
			}
		});
	});

	onDestroy(() => {
		document.removeEventListener("click", (event: MouseEvent) => {
			if (actions && !actions.contains(event.target as Node) && open) {
				open = false;
			}
		});
	});
</script>

<tr bind:this={self}>
	{@render children?.()}
	{#if !!rowActions}
		<TableCell
			_for="_none"
			style="width: var(--text-size-m); text-align: right;"
		>
			<button
				class="actions"
				bind:this={actions}
				onclick={() => (open = !open)}
			>
				<Icon
					size="m"
					iconName="threeDots"
				/>
				<Dropdown
					alignRight
					bind:open
				>
					<div class="rowActions">
						{#each rowActions as action}
							<ContextmenuItem onclick={() => executeRowAction(action.callback)}>
								{#snippet icon()}
									<Icon
										size="m"
										iconName={action.iconName!}
									/>
								{/snippet}
								{action.title}
							</ContextmenuItem>
						{/each}
					</div>
				</Dropdown>
			</button>
		</TableCell>
	{/if}
</tr>

<style lang="scss">
	tr {
		border-bottom: 1px solid var(--border-color);
		&:hover {
			background-color: var(--hover-color);
			border-color: var(--hover-color);
		}
	}
	.actions {
		position: relative;
	}

	.rowActions {
		min-width: 100px;
		color: var(--text-color);
		display: flex;
		flex-direction: column;
		padding: var(--padding-xs);
	}
</style>
