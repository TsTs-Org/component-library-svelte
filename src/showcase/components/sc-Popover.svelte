<script lang="ts">
	import Showcase from "$lib/components/Showcase.svelte";
	import { Button, Popover } from "$lib/index.js";

	let closablePopover: ReturnType<typeof Popover>;

</script>
<Showcase name="Popover">
    <Popover bind:this={closablePopover}>
        {#snippet title()}
            should be closed by content
        {/snippet}
        <Button onclick={() => {
            closablePopover.closePopover();
        }}>
            close from inner content
        </Button>
        {#snippet popoverTrigger(trigger)}
            <Button onclick={trigger}>open closable Popover</Button>
        {/snippet}
    </Popover>

    <Popover>
        {#snippet title()}
            Some title
        {/snippet}
        CONTENT
        {#snippet popoverTrigger(trigger)}
            <Button onclick={trigger}>Open Popover</Button>
        {/snippet}
    </Popover>
</Showcase>