<script lang="ts">
	import Editable from "$lib/components/Editable.svelte";
	import EditableH1 from "$lib/components/EditableH1.svelte";
	import EditableH2 from "$lib/components/EditableH2.svelte";
	import EditableH3 from "$lib/components/EditableH3.svelte";
	import EditableH4 from "$lib/components/EditableH4.svelte";
	import EditableH5 from "$lib/components/EditableH5.svelte";
	import Slider from "$lib/components/Slider.svelte";
import { Button, Dropzone, Icon, Input, Popover, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/index.js";

    const display = $state([
        {
            ID: "2323232323",
            CreatedAt: "09.11.20011:12:23:14",
            Username: "Testuser",
            IsActive: true,
        },
        {
            ID: "2323232324",
            CreatedAt: "09.11.20011:12:23:14",
            Username: "Testuser2",
            IsActive: true,
        },
        {
            ID: "2323232325",
            CreatedAt: "09.11.20011:12:23:14",
            Username: "Testuser3",
            IsActive: false,
        },
    ])

    function proxyOpen(info) {
        slider.openSlider()
    }

    let slider: Slider;

    function addUser() {
        display.push({
            ID: display.length + 1,
            CreatedAt: "09.11.20011:12:23:14",
            Username: "Test",
            IsActive: true,
        })
    }

</script>

<Slider bind:this={slider}>

    <Editable value="teste" placeholder="place"></Editable>
    <EditableH1 value="teste" placeholder="place"></EditableH1>
    <EditableH2 value="teste" placeholder="place"></EditableH2>
    <EditableH3 value="teste" placeholder="place"></EditableH3>
    <EditableH4 value="teste" placeholder="place"></EditableH4>
    <EditableH5 value="teste" placeholder="place"></EditableH5>

</Slider>

<Table initial={["id", "created_at", "username", "isactive", "__actions"]} ignoreColumns={["__actions"]} searchbar bordered>
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
            <TableHead _for="created_at">CreatedAt</TableHead>
            <TableHead _for="username">Username</TableHead>
            <TableHead _for="isactive">IsActive</TableHead>
            <TableHead _for="__actions">Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {#each display as user (user.ID)}
            <TableRow
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
                <TableCell _for="id">{user.ID}</TableCell>
                <TableCell _for="created_at">{user.CreatedAt}</TableCell>
                <TableCell _for="username">{user.Username}</TableCell>
                <TableCell _for="isactive">{user.IsActive}</TableCell>
            </TableRow>
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
