<script>
	import Showcase from "$lib/components/Showcase.svelte";
	import { Accordion, AccordionItem } from "$lib/index.js";

</script>
<Showcase name="Accordion">
    <Accordion>
        <AccordionItem title="Item 1">
            <p>Content for item 1</p>
        </AccordionItem>

        <AccordionItem title="Item 2">
            <p>Content for item 2</p>
        </AccordionItem>

        <AccordionItem title="Item 3">
            <p>Content for item 3</p>
        </AccordionItem>
    </Accordion>
</Showcase>