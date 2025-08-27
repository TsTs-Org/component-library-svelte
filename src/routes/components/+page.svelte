<script lang="ts">
	import Textarea from "$lib/components/Textarea.svelte";
	import { Button, Dropzone } from "$lib/index.js";

    const listOfElemetns = $state([
        "test1",
        "test2",
        "test3"
    ])
</script>

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
</Button>

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