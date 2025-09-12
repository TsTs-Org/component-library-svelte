<script lang="ts">
	import Slider from "$lib/components/Slider.svelte";
import { Button, Dropzone, Icon, Input, Popover, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/index.js";

    const display = [
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
    ]

    function proxyOpen(info) {
        slider.openSlider()
    }

    let slider: Slider;

</script>

<Slider bind:this={slider}></Slider>

<Table initial={["ID", "CreatedAt", "Username", "IsActive", "Actions"]} searchbar bordered>
    {#snippet headerAction()}
        <Button size="s">
            {#snippet icon()}
                <Icon size="m" iconName="add" fill="inherit" />
            {/snippet}
            AddUser
        </Button>
    {/snippet}
    <TableHeader>
        <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>IsActive</TableHead>
            <TableHead>Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {#each display as user (user.ID)}
            <TableRow
                callback={() => {proxyOpen()}}
                rowActions={[
                    {
                        iconName: 'logout',
                        title: 'Logout User',
                        callback: () => {
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
                <TableCell _for="createdat">{user.CreatedAt}</TableCell>
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
