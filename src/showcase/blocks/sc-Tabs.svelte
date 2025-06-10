<script>
	import AutoGenerateTriggers from "$lib/components/Tabs/AutoGenerateTriggers.svelte";
	import TabContent from "$lib/components/Tabs/TabContent.svelte";
	import Tabs from "$lib/components/Tabs/Tabs.svelte";
	import DynamicHorizontalTabs from "$lib/blocks/Tabs/DynamicHorizontalTabsBlock.svelte";
	import { Button } from "$lib/index.js";

</script>
<div class="mock-block">
    <div style="padding: .5rem">
        <Tabs defaultTab="tab1">
            <div style="display: flex">
                <AutoGenerateTriggers>
                    {#snippet tabTrigger(selectTab, isSelected, tabIdentifier)}
                        <Button
                            onclick={selectTab}
                            style={isSelected() ? "background-color: var(--hover-color)" : ""}
                            >{tabIdentifier}</Button
                        >
                    {/snippet}
                </AutoGenerateTriggers>
            </div>
            <TabContent tabIdentifier="tab1">
                <h3>Tabs in tab</h3>

                <Tabs>
                    <DynamicHorizontalTabs></DynamicHorizontalTabs>
                </Tabs>
            </TabContent>
            <TabContent tabIdentifier="tab2">this is tab 2</TabContent>
            <TabContent tabIdentifier="tab3">this is tab 3</TabContent>
            <TabContent tabIdentifier="tab4">this is tab 4</TabContent>
        </Tabs>
    </div>
</div>