<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import Input from "$lib/components/Input.svelte";
	import { Dropzone, EditableHeading } from "$lib/index.js";
    let test = $state(false);

    function submit(val: string) {
        console.log(val)
        test = false;
    }
</script>

<Dropzone identifier="Zone1" group={2} dontHandleMove={false}>
    <div class="custom-style">
        <p class="mock-elem">Test1</p>
        <p class="mock-elem">Test2</p>
    </div>
</Dropzone>    
<Dropzone identifier="Zone2" group={2} dontHandleMove>
    <div class="custom-style">
        <p class="mock-elem">Test3</p>
    </div>
</Dropzone>    

<Input
    autofocus
    onsubmit={submit}
    oncancel={submit}
>
</Input>

{#if test}
<Input
    autofocus
    onsubmit={submit}
    oncancel={submit}
>
</Input>
{:else}
<button onclick={() => test = true}>test</button>
{/if}

<style>
    .custom-style {
        min-height: 60px;
        background-color: var(--foreground-color);
        margin: 10px;
    }
    .mock-elem {
        padding: 5px;
    }
</style>