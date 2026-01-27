<script lang="ts">
	import { onDestroy, onMount, type Snippet } from "svelte";
	import TableCell from "./TableCell.svelte";
	import Icon from "../Icon.svelte";
	import Dropdown from "../Dropdown/Dropdown.svelte";
	import ContextmenuItem from "../Contextcontainer/ContextmenuItem.svelte";

	type RowAction = {
		title: string;
		iconName?: string;
		callback: Function;
	};
	
	type Props = {
		data: object;
		children?: Snippet;
		rowActions?: Array<RowAction>;
		callback?: Function | undefined;
		styleOverrides?: Map<string, Snippet>;
		columns?: string[];
	};

	let actions: HTMLButtonElement;
	let open = $state(false);
	let { 
		data, 
		children, 
		rowActions, 
		callback = undefined,
		styleOverrides,
		columns,
	}: Props = $props();

	function getRowValues() {
		return data
	}

	function executeRowAction(callback: Function) {
		callback(getRowValues());
	}

	let clickable = callback != undefined;

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

<tr 
	onclick={() => { 
		if(callback != undefined) {
			callback(getRowValues())
		}
	}}
	class:clickable
>
	{#each columns ?? Object.keys(data) as key (key) }
		<TableCell _for={key}>
			{#if styleOverrides?.has(key)}
				{@render styleOverrides.get(key)?.(data[key])}
			{:else}
				{data[key]}
			{/if}
		</TableCell>
	{/each}
	{@render children?.()}
	{#if !!rowActions}
		<TableCell
			_for="__actions"
			style="width: var(--text-size-m); text-align: right;"
		>
			<button
				class="actions"
				bind:this={actions}
				onclick={(e) => {
					e.stopPropagation()
					open = !open
				}}
			>
				<Icon
					size="m"
					iconName="more_vert"
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
										size="s"
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

	.clickable {
		cursor: pointer;
	}
</style>
