<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();

	const ctx = getContext("TriggerCtx");
	const open = ctx.open;
	let _open = $state(false);

	onMount(() => {
		return open.subscribe((x) => {
			_open = x;
		});
	});
</script>

{#if _open}
	<div class="Portal">
		{@render children?.()}
	</div>
{/if}

<style lang="scss">
	.Portal {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: red;
		z-index: 5000;
	}
</style>
