<script>
	import Showcase from "$lib/components/Showcase.svelte";
	import { Loader } from "$lib/index.js";

</script>
<Showcase name="Headings">
    <div class="mock-grid">
        <h1>Heading</h1>
        <h2>Heading</h2>
        <h3>Heading</h3>
        <h4>Heading</h4>
        <h5>Heading</h5>
        <p>Paragraph</p>
    </div>
</Showcase>

<Showcase name="Loader">
    <Loader size="s" />
    <Loader />
    <Loader size="l" />
</Showcase>