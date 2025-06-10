<script>
	import Showcase from "$lib/components/Showcase.svelte";
	import TabContent from "$lib/components/Tabs/TabContent.svelte";
	import Tabs from "$lib/components/Tabs/Tabs.svelte";
	import TabTrigger from "$lib/components/Tabs/TabTrigger.svelte";
	import { Button } from "$lib/index.js";

</script>

<Showcase name="Tabs">
    <Tabs>
        <TabTrigger tabIdentifier="tab1">
            {#snippet trigger(selectTab)}
                <Button onclick={selectTab}>Select Tab 1</Button>
            {/snippet}
        </TabTrigger>
        <TabTrigger tabIdentifier="tab2">
            {#snippet trigger(selectTab)}
                <Button onclick={selectTab}>Select Tab 2</Button>
            {/snippet}
        </TabTrigger>

        <TabContent tabIdentifier="tab1">this is tab1</TabContent>
        <TabContent tabIdentifier="tab2">this is tab2</TabContent>
    </Tabs>
</Showcase>
