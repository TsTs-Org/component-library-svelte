<script lang="ts">
	import Textarea from "$lib/components/Textarea.svelte";
	import { Dropzone } from "$lib/index.js";


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
        <div class="mock-elem">
            <h2>Test3</h2>
        </div>
    </div>
</Dropzone>   
<Dropzone identifier="Zone3" group={3} callback={(e) => {console.log(e)}}>
    <div class="custom-style">
        <div class="mock-elem">
            <h2>Test4</h2>
        </div>
    </div>
</Dropzone>     

<Textarea label="Test Label" description="Some description that is quite long to see if it all fits in this">

</Textarea>

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