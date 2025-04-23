<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { slide } from "svelte/transition";

	type Props = {
		open: boolean;
		alignRight?: boolean;
		children?: Snippet;
		toParent?: boolean;
	} & HTMLAttributes<any>;

	let {
		open = $bindable(),
		alignRight = false,
		children,
		toParent = false,
		...restProps
	}: Props = $props();
	$effect(() => {
		changeOpen(open);
	});

	let self: HTMLDivElement;
	function changeOpen(open: boolean) {
		if (open) {
			toParent ? getOffsetsToParent() : getOffsetsToViewport();
		}
	}

	const getOffsetsToParent = () => {
		let {
			top: ptop,
			left: pleft,
			bottom: pbottom,
			right: pright,
		} = self.parentElement!.parentElement!.getBoundingClientRect();
		let { top, left, bottom, right } = self.getBoundingClientRect();
		bottom = pbottom - bottom;
		right = pright - right;
		if (right < 0 || alignRight) {
			self.style.right = "0";
		} else if (!alignRight) {
			self.style.left = "0";
		}
		if (bottom < 0) {
			self.style.bottom = "0";
		}
		// console.log(`top: ${top}; left: ${left}; right: ${right}; bottom: ${bottom};`);
	};
	const getOffsetsToViewport = () => {
		let { top, left, bottom, right } = self.getBoundingClientRect();
		const { innerHeight, innerWidth } = window;
		bottom = innerHeight - bottom;
		right = innerWidth - right;
		if (right < 0 || alignRight) {
			self.style.right = "0";
		} else if (!alignRight) {
			self.style.left = "0";
		}
		if (bottom < 0) {
			self.style.bottom = "0";
		}
		// console.log(`top: ${top}; left: ${left}; right: ${right}; bottom: ${bottom};`);
	};
</script>

{#if open}
	<div
		bind:this={self}
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
		background-color: var(--background-color);
		width: 100%;
		overflow: hidden;
		min-width: fit-content;
		box-sizing: border-box;
		border-radius: var(--border-radius-s);
		border: 1px solid var(--border-color);
	}
</style>
