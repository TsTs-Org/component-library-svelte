<script lang="ts">
	import { Table, TableBody, TableHead, TableHeader, TableRow } from "$lib/index.js";
	import type { Snippet } from "svelte";
	import DataRow from "./DataRow.svelte";

    type RowAction = {
        title: string;
        iconName?: string;
        callback: Function;
    }

    type ColumnHeader = {
        key: string,
        title?: string,
        initiallyHidden?: boolean,
        hideToggle?: boolean,
    }

    type Props = {
        data: Array<any>;
        rowCallback?: Function | undefined;
        rowActions?: RowAction[];
		styleOverrides?: Map<string, Snippet>;

        columns?: ColumnHeader[];
		searchbar?: boolean;
		bordered?: boolean;
        columnSelector?: boolean;
		headerAction?: Snippet;
	};

	let {
        data,
        rowCallback = undefined,
        rowActions = [],
        styleOverrides,

        columns,
		searchbar = false,
		bordered = false,
        columnSelector = false,
		headerAction,
    }: Props = $props();

    var initial: string[] = []
    if (columns) {
        initial = columns.filter((elem) => {
            return elem.initiallyHidden != true;
        }).map((elem) => {
            return elem.key
        })
    }else {
        initial = Object.keys(data[0])
    }

    var ignoreColumns = columns?.filter((elem) => {
        return elem.hideToggle == true
    }).map((elem) => {
        return elem.key
    }) ?? []

</script>

<Table
    {searchbar} 
    {bordered}
    {columnSelector}
    initial={[...initial, "__actions"]} 
    ignoreColumns={[...ignoreColumns, "__actions"]} 
>
    {#snippet headerAction()}
        {@render headerAction?.()}
    {/snippet}
    <TableHeader>
        <TableRow>

            {#if columns}
                {#each columns as column (column.key)}
                    <TableHead _for={column.key}>{column.title ?? column.key}</TableHead>
                {/each}
            {:else}
                {#each Object.keys(data[0]) as key (key)}
                    <TableHead _for={key}>
                        <span style="text-transform: capitalize;">{key}</span>
                    </TableHead>
                {/each}
            {/if}

            {#if rowActions.length > 0}
                <TableHead _for="__actions">Actions</TableHead>
            {/if}
        </TableRow>
    </TableHeader>
    <TableBody>
        {#each data as elem (elem)}
            <DataRow
                {styleOverrides} 
                data={elem} 
                rowActions={rowActions}
                callback={rowCallback}
                columns={columns?.map((elem) => elem.key)}
            ></DataRow>
        {/each}
    </TableBody>
</Table>