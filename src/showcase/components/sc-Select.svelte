<script>
	import Showcase from "$lib/components/Showcase.svelte";
	import { Multiselect, MultiselectItem, Select, SelectItem } from "$lib/index.js";

</script>

<Showcase name="Select">
    <div class="mock-grid">
        <Select
            placeholder="Select a fruit..."
            label="Fruits"
            description="Dropdown to select a fruit"
        >
            <SelectItem
                value="apple"
                label="Apple"
            />
            <SelectItem
                value="banana"
                label="Banana"
            />
            <SelectItem
                value="orange"
                label="Orange"
            />
            <SelectItem
                value="grape"
                label="Grape"
            />
        </Select>
    </div>
</Showcase>

<Showcase name="Multiselect">
    <div class="mock-grid">
        <Multiselect
            placeholder="Multiselect a fruit..."
            label="Fruits"
            description="Dropdown to Multiselect a fruit"
        >
            <MultiselectItem
                value="apple"
                label="Apple"
            />
            <MultiselectItem
                value="banana"
                label="Banana"
            />
            <MultiselectItem
                value="orange"
                label="Orange"
            />
            <MultiselectItem
                value="grape"
                label="Grape"
            />
        </Multiselect>
    </div>
</Showcase>