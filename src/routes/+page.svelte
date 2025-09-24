<script lang="ts">
	import EditableH1 from "$lib/components/EditableHeading.svelte";
import Slider from "$lib/components/Slider.svelte";
	import { Button } from "$lib/index.js";

    let slider: Slider;
    let editable = $state(false)

</script>

<Button onclick={() => slider.openSlider()}>
    Open
</Button>

<Button onclick={() => editable = !editable}>
    Swap editable
</Button>

<EditableH1 tag="h3" value="test" oncancel={(val) => {console.log(val)}}></EditableH1>

<Slider width="medium" bind:this={slider}>
    
    {#snippet title()}
        <h2>Test</h2>
    {/snippet}

    {#each { length: 250 } as _, i}
        <h5>Test {i}</h5>
    {/each}

    {#snippet footer()}
        <Button>Test</Button>
    {/snippet}


</Slider>

<style lang="scss">

</style>
