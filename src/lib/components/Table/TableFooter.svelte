<script lang="ts">
	import { onMount, type Snippet } from "svelte";

	type Props = {
		children: Snippet;
	};

	let self: HTMLTableSectionElement;
	let { children }: Props = $props();

	onMount(() => {
		// select tr elements and give the td in them a background color
		const trs = self.querySelectorAll("tr");
		trs.forEach((tr) => {
			const tds = tr.querySelectorAll("td");
			tds.forEach((td) => {
				td.style.backgroundColor = "var(--neutral-hover-color)";
			});
		});
	});
</script>

<tfoot bind:this={self}>
	{@render children?.()}
</tfoot>

