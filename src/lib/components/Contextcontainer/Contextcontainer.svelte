<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { writable, type Writable } from "svelte/store";

	type Props = {
		children?: Snippet;
	} & HTMLAttributes<any>;

	export type ContextCtx = {
		data: Writable<{
			open: boolean;
			xOffset: string;
			yOffset: string;
		}>;
	};

	let { children, ...restProps }: Props = $props();

	function rightClick(e: PointerEvent) {
		e.preventDefault();
		ctx.data.set({
			open: true,
			xOffset: e.layerX + "px",
			yOffset: e.layerY + "px",
		});
	}

	const ctx = {
		data: writable({
			open: false,
			xOffset: "0",
			yOffset: "0",
		}),
	};

	setContext("ContextCtx", ctx);
</script>

<div
	class="ContextContainer"
	oncontextmenu={rightClick}
>
	{@render children?.()}
</div>

<style lang="scss">
	.ContextContainer {
		height: 100%;
		width: 100%;
		position: relative;
	}
</style>
