<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { slide } from "svelte/transition";
	import { closeOverlay, openOverlay } from "../Themify.svelte";

	type Props = {
		open: boolean;
		children?: Snippet;
	} & HTMLAttributes<any>;

	let { open = $bindable(), children, ...restProps }: Props = $props();
	$effect(() => {
		if (open) {
			openOverlay();
		} else {
			closeOverlay();
		}
	});
</script>

{#if open}
	<div
		class="Dropdown"
		transition:slide={{ duration: 190 }}
	>
		{@render children?.()}
	</div>
{/if}

<style lang="scss">
	.Dropdown {
		z-index: 500;
		position: absolute;
		right: 0;
		overflow: hidden;
		background-color: var(--foreground-color);
		width: 100%;
		min-width: fit-content;
		box-sizing: border-box;
		border-radius: var(--border-radius-s);
		border: 1px solid var(--border-color);
	}
</style>
