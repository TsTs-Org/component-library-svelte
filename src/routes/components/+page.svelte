<script lang="ts">
	import InfiniteScroll from "$lib/components/InfiniteScroll/InfiniteScroll.svelte";
	import { onMount } from "svelte";

	type Con = { imageUrl: string; title: string };
	let listOfContent = [
		{ imageUrl: "https://picsum.photos/200/300", title: "one" },
		{ imageUrl: "https://picsum.photos/200/300", title: "two" },
		{ imageUrl: "https://picsum.photos/200/300", title: "three" },
		{ imageUrl: "https://picsum.photos/200/300", title: "four" },
	];

	onMount(() => {
		document.addEventListener("click", () => {
			document.querySelectorAll(".scroll-item").forEach((el) => {
				if (el.style.animationPlayState == "running") {
					el.style.animationPlayState = "paused";
				} else {
					el.style.animationPlayState = "running";
				}
			});
		});
	});
</script>

<!-- Development page -->
<div style="width: 50%; translate: 50%">
	<InfiniteScroll content={listOfContent}>
		{#snippet contentDisplay(con: Con)}
			<div style="display: flex; flex-direction: column">
				<h4>{con.title}</h4>
				<img src={con.imageUrl} />
			</div>
		{/snippet}
	</InfiniteScroll>
</div>

<style lang="scss">
</style>
