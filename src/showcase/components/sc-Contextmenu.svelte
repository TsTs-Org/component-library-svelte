
<script>
    import Showcase from "$lib/components/Showcase.svelte";
    import Contextcontainer from "$lib/components/Contextcontainer/Contextcontainer.svelte";
    import Contextmenu from "$lib/components/Contextcontainer/Contextmenu.svelte";
    import ContextmenuItem from "$lib/components/Contextcontainer/ContextmenuItem.svelte";
    import Icon from "$lib/components/Icon.svelte";
</script>


<Showcase name="Contextmenu">
    <div style="height: 10rem; width: 100%">
        <Contextcontainer>
            <Contextmenu>
                <ContextmenuItem>Test</ContextmenuItem>
                <ContextmenuItem>
                    {#snippet icon()}
                        <Icon
                            size="s"
                            iconName="eyeOpen"
                        />
                    {/snippet}
                    Test
                </ContextmenuItem>
                <ContextmenuItem>
                    {#snippet icon()}
                        <Icon
                            size="s"
                            iconName="eyeClosed"
                        />
                    {/snippet}
                    Test
                </ContextmenuItem>
            </Contextmenu>
            <div
                style="
            display: flex;
            align-items: center; 
            justify-content: center;
            border: thin solid var(--border-color);
            width: 100%;
            height: 100%; 
            border-radius: var(--border-radius-m); 
            "
            >
                <h4>Right Click Me</h4>
            </div>
        </Contextcontainer>
    </div>
</Showcase>