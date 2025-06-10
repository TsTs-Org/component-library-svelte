<script>
	import Showcase from "$lib/components/Showcase.svelte";
	import { Card, Icon } from "$lib/index.js";

</script>
<Showcase name="Card">
    <div class="mock-grid">
        <div style="width: 4rem; height: 4rem">
            <Card size="s">
                {#snippet title()}
                    Title text
                {/snippet}
                {#snippet iconRight(size)}
                    <Icon
                        {size}
                        iconName="x"
                    ></Icon>
                {/snippet}
            </Card>
        </div>
        <div style="width: 7rem; height: 6rem">
            <Card size="m">
                {#snippet title()}
                    Title text
                {/snippet}
                {#snippet iconRight(size)}
                    <Icon
                        {size}
                        iconName="x"
                    ></Icon>
                {/snippet}
            </Card>
        </div>
        <div style="width: 20rem; height: 10rem">
            <Card size="l">
                {#snippet iconLeft(size)}
                    <Icon
                        {size}
                        iconName="sun"
                    ></Icon>
                {/snippet}
                {#snippet title()}
                    Title text
                {/snippet}
                {#snippet iconRight(size)}
                    <Icon
                        {size}
                        iconName="x"
                    ></Icon>
                {/snippet}
            </Card>
        </div>
    </div>
</Showcase>