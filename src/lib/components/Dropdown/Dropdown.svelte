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
	// -------------------------------------------------------------------------
	// Relative to window

	// 	const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
	//   const { top, left, bottom, right } = el.getBoundingClientRect();
	//   const { innerHeight, innerWidth } = window;
	//   return partiallyVisible
	//     ? ((top > 0 && top < innerHeight) ||
	//         (bottom > 0 && bottom < innerHeight)) &&
	//         ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
	//     : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
	// };

	// // e.g. 100x100 viewport and a 10x10px element at position
	// // {top: -1, left: 0, bottom: 9, right: 10}
	// elementIsVisibleInViewport(el); // false - (not fully visible)
	// elementIsVisibleInViewport(el, true); // true - (partially visible)

	// -------------------------------------------------------------------------
	// Relative to parent

	// 	function isElementVisibleInParent(el, partiallyVisible = false, parent = el.parentElement) {
	//     const elRect = el.getBoundingClientRect();
	//     const parentRect = parent.getBoundingClientRect();
	//     const parentStyle = getComputedStyle(parent);

	//     // Parse parent's padding
	//     const paddingTop = parseFloat(parentStyle.paddingTop);
	//     const paddingLeft = parseFloat(parentStyle.paddingLeft);

	//     // Get parent's scroll and client dimensions
	//     const scrollTop = parent.scrollTop;
	//     const scrollLeft = parent.scrollLeft;
	//     const clientHeight = parent.clientHeight;
	//     const clientWidth = parent.clientWidth;

	//     // Calculate element's position relative to parent's content area (after padding)
	//     const elementTop = (elRect.top - parentRect.top - paddingTop) + scrollTop;
	//     const elementBottom = (elRect.bottom - parentRect.top - paddingTop) + scrollTop;
	//     const elementLeft = (elRect.left - parentRect.left - paddingLeft) + scrollLeft;
	//     const elementRight = (elRect.right - parentRect.left - paddingLeft) + scrollLeft;

	//     // Calculate parent's visible area in content coordinates
	//     const visibleTop = scrollTop;
	//     const visibleBottom = scrollTop + clientHeight;
	//     const visibleLeft = scrollLeft;
	//     const visibleRight = scrollLeft + clientWidth;

	//     if (partiallyVisible) {
	//         // Check for any overlap
	//         const verticalOverlap = elementTop < visibleBottom && elementBottom > visibleTop;
	//         const horizontalOverlap = elementLeft < visibleRight && elementRight > visibleLeft;
	//         return verticalOverlap && horizontalOverlap;
	//     } else {
	//         // Check if fully contained
	//         return (
	//             elementTop >= visibleTop &&
	//             elementBottom <= visibleBottom &&
	//             elementLeft >= visibleLeft &&
	//             elementRight <= visibleRight
	//         );
	//     }
	// }
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
