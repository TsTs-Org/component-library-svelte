<script lang="ts">
	import Slider from "$lib/components/Slider.svelte";
	import { Button } from "$lib/index.js";

    let slider: Slider;

</script>

<Button onclick={() => slider.openSlider()}>
    Open
</Button>


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
