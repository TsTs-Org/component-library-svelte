<script lang="ts">
	import { getContext, onMount, type Snippet } from "svelte";
	import Dropdown from "../Dropdown/Dropdown.svelte";
	import type { ContextCtx } from "./Contextcontainer.svelte";

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();

	const ctx: ContextCtx = getContext("ContextCtx");
	let open = $state(false);
	let xOffset = $state("0");
	let yOffset = $state("0");
	
	onMount(() => {
		ctx.data.subscribe((x) => {
			open = x.open;
			xOffset = x.xOffset;
			yOffset = x.yOffset;
		});
		document.onclick = () => {
			open = false;
		};
	});
</script>

<div
	class="ContextMenu"
	style={`left: ${xOffset}; top: ${yOffset};`}
>
	<Dropdown
		bind:open
		toParent
	>
		<div class="ContextContent">
			{@render children?.()}
		</div>
	</Dropdown>
</div>

<style lang="scss">
	.ContextMenu {
		z-index: 500;
		display: block;
		position: absolute;
	}
	.ContextContent {
		min-width: 100px;
		color: var(--text-color);
		display: flex;
		flex-direction: column;
		padding: var(--padding-xs);
	}
</style>
