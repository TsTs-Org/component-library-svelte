<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import Input from "$lib/components/Input.svelte";
	import { EditableHeading } from "$lib/index.js";
    let test = $state(false);

    function submit(val: string) {
        console.log(val)
        test = false;
    }
</script>
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
