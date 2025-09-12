<script lang="ts">
	import Slider from "$lib/components/Slider.svelte";
	import { Button } from "$lib/index.js";

    let slider: Slider;

</script>

<Button onclick={() => slider.openSlider()}>
    Open
</Button>


<Slider bind:this={slider}>
    
    {#snippet title()}
        <h2>Test</h2>
    {/snippet}

    <h3>TestTwo</h3>


</Slider>

<style lang="scss">

</style>
