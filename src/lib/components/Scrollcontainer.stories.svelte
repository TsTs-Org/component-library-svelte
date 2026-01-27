<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import ScrollContainer from "./ScrollContainer.svelte";

	const { Story } = defineMeta({
		title: "2. Components/ScrollContainer",
		tags: ["autodocs"],
		component: ScrollContainer,
		render: insideWrapper,
	});
</script>

{#snippet insideWrapper()}
	<div style="height: 10rem;">
		<ScrollContainer>
			{#each { length: 50 }, i}
				<p>Text {i}</p>
			{/each}
		</ScrollContainer>
	</div>
{/snippet}

<Story name="Default"></Story>
