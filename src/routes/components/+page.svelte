<script lang="ts">
	import Editable from "$lib/components/Editable.svelte";
	import EditableH1 from "$lib/components/EditableH1.svelte";
	import EditableH2 from "$lib/components/EditableH2.svelte";
	import EditableH3 from "$lib/components/EditableH3.svelte";
	import EditableH4 from "$lib/components/EditableH4.svelte";
	import EditableH5 from "$lib/components/EditableH5.svelte";
	import Slider from "$lib/components/Slider.svelte";
	import DataRow from "$lib/components/Table/DataRow.svelte";
	import DataTable from "$lib/components/Table/DataTable.svelte";
    import { Button, Dropzone, Icon, Input, Popover, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/index.js";
	import type { Snippet } from "svelte";

    const display = $state([
        {
            id: "2323232323",
            createdAt: "09.11.20011:12:23:14",
            username: "Testuser",
            isActive: true,
        },
        {
            id: "2323232324",
            createdAt: "09.11.20011:12:23:14",
            username: "Testuser2",
            isActive: true,
        },
        {
            id: "2323232325",
            createdAt: "09.11.20011:12:23:14",
            username: "Testuser3",
            isActive: false,
        },
    ])

    function proxyOpen(info) {
        slider.openSlider()
    }

    let slider: Slider;

    function addUser() {
        display.push({
            id: display.length + 1,
            createdAt: "09.11.20011:12:23:14",
            username: "Test",
            isActive: true,
        })
    }

    let tableOverrides = new Map([
        ["isActive", isActiveCell as Snippet], 
    ])

</script>

<Slider bind:this={slider}>

    <Editable value="teste" placeholder="place"></Editable>
    <EditableH1 value="teste" placeholder="place"></EditableH1>
    <EditableH2 value="teste" placeholder="place"></EditableH2>
    <EditableH3 value="teste" placeholder="place"></EditableH3>
    <EditableH4 value="teste" placeholder="place"></EditableH4>
    <EditableH5 value="teste" placeholder="place"></EditableH5>

</Slider>

<DataTable
    columnSelector
    searchbar
    styleOverrides={tableOverrides}
    data={display}
    columns={[
        {key: "isActive", hideToggle: true, title: ""},
        {key: "username"},
        {key: "id"},
        {key: "createdAt", initiallyHidden: true}
    ]} 
    rowActions={[
        {
            iconName: 'logout',
            title: 'Logout User',
            callback: (e) => {
                console.log(e)
            }
        }
    ]} 
    rowCallback={(info) => {proxyOpen(info)}}
>
{#snippet headerAction()}
    <Button size="s" onclick={() => {addUser()}}>
        {#snippet icon()}
            <Icon size="m" iconName="add" fill="inherit" />
        {/snippet}
        AddUser
    </Button>
{/snippet}

</DataTable>

{#snippet isActiveCell(data)}
    <p>testo</p>
{/snippet}

<Table initial={["id", "createdAt", "username", "isActive", "__actions"]} ignoreColumns={["__actions"]} searchbar bordered>
    {#snippet headerAction()}
        <Button size="s" onclick={() => {addUser()}}>
            {#snippet icon()}
                <Icon size="m" iconName="add" fill="inherit" />
            {/snippet}
            AddUser
        </Button>
    {/snippet}
    <TableHeader>
        <TableRow>
            <TableHead _for="id">ID</TableHead>
            <TableHead _for="createdAt">CreatedAt</TableHead>
            <TableHead _for="username">Username</TableHead>
            <TableHead _for="isActive">IsActive</TableHead>
            <TableHead _for="__actions">Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {#each display as user (user.id)}
            <DataRow
                styleOverrides={tableOverrides}
                data={user}
                callback={(info) => {proxyOpen(info)}}
                rowActions={[
                    {
                        iconName: 'logout',
                        title: 'Logout User',
                        callback: (e) => {
                            console.log(e)
                        }
                    },
                    {
                        iconName: 'account_circle_off',
                        title: 'Disable Account',
                        callback: () => {
                        }
                    },
                    {
                        iconName: 'delete',
                        title: 'Delete User',
                        // callback: () => deleteImage(value.id)
                        callback: () => {
                        }
                    }
                ]}
            >
                <!-- <TableCell _value={["test", "nothertest"]} _for="id">{user.id}</TableCell>
                <TableCell _for="createdAt">{user.createdAt}</TableCell>
                <TableCell _for="username">{user.username}</TableCell>
                <TableCell _for="isActive">{user.isActive}</TableCell> -->
            </DataRow>
        {/each}
    </TableBody>
</Table>
<!-- 
<Dropzone identifier="Zone1" group={2} callback={(e) => {console.log(e)}}>
    <div class="custom-style">
        <div class="mock-elem">
            <h2>Test1</h2>
        </div>
        <div class="mock-elem">
            <h2>Test2</h2>
        </div>
    </div>
</Dropzone>    
<Dropzone identifier="Zone2" group={2} callback={(e) => {console.log(e)}}>
   <div class="custom-style">

   </div> 
</Dropzone>   
<Dropzone identifier="Zone3" group={3} callback={(e) => {console.log(e)}}>
    <div class="custom-style">
   {#each listOfElemetns as el}
       <div class="mock-elem">
           <h2>{el}</h2>
       </div>
    {/each}
    </div>
</Dropzone>     

<Button onclick={() => listOfElemetns.push("addedtest")}>
    Add thingy
</Button> -->

<style>
	.custom-style {
		min-height: 60px;
		background-color: var(--foreground-color);
		margin: 10px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px;
	}
	.mock-elem {
		padding: 5px;
		background-color: blueviolet;
	}
</style>
