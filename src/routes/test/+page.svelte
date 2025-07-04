<script lang="ts">
	import Dropzone from "$lib/components/DragAndDrop/Dropzone.svelte";
</script>

<Dropzone >
	<p>Test 1</p>
	<p>Test 2</p>
	<p>Test 3</p>
</Dropzone>

<Dropzone >

</Dropzone>

<Dropzone group={2}>

</Dropzone>




<style lang="scss">
	p {
        // cursor: grab;
		padding: 20px;
        width: 200px;
		border: 1px dashed red;
    }
</style>