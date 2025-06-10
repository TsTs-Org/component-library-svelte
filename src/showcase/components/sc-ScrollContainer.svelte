<script>
	import Showcase from "$lib/components/Showcase.svelte";
	import { ScrollContainer } from "$lib/index.js";

</script>
<Showcase name="Scroll Container">
    <div style="height: 6rem">
        <ScrollContainer>
            {#each { length: 50 }, i}
                <p>Text {i}</p>
            {/each}
        </ScrollContainer>
    </div>
</Showcase>
