<script>
	import Showcase from "$lib/components/Showcase.svelte";
	import { Checkbox, Icon, Input } from "$lib/index.js";

</script>
<Showcase name="Checkbox">
    <div class="mock-grid">
        <Checkbox />
    </div>
</Showcase>


<Showcase name="Input">
    <div class="mock-grid">
        <Input
            type="text"
            label="With Icon"
            placeholder="username"
            description="The name to identify the user"
        >
            {#snippet icon()}
                <Icon
                    iconName="sun"
                    fill="inherit"
                />
            {/snippet}
        </Input>

        <Input
            type="password"
            label="No Icon"
            placeholder="username"
            description="The name to identify the user"
        />
    </div>
</Showcase>