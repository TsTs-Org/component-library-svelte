<script lang="ts">
	import { onMount } from "svelte";

	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
	};
	let { children }: Props = $props();
	let scrollContainerWrapper: HTMLDivElement;
	let contentWrapperElement: HTMLDivElement;
	let scrollbar: HTMLDivElement;
	let scrollbarThumb: HTMLDivElement;

	let needsScrollbar: boolean = $state(false);

	let isDragging: boolean = false;
	let lastingThumbPosition = 0;
	let thumbGrabStartY = 0;

	function handleWheel(ev: WheelEvent) {
		// FIXME: this probably doesn't work on mobile

		ev.stopPropagation();
		ev.preventDefault(); // TODO: make conditional to only prevent, when not already on bottom/top

		contentWrapperElement.parentElement!.scrollTo({
			left: 0,
			top: contentWrapperElement.parentElement!.scrollTop + ev.deltaY,
			behavior: "smooth",
		});

		const factor =
			(contentWrapperElement.parentElement!.scrollTop + ev.deltaY) / getMaxScrollPosition();

		setLastingThumbPosition(getMaxThumbPosition() * factor);
	}

	function getMaxScrollPosition() {
		return (
			contentWrapperElement.getBoundingClientRect().height -
			contentWrapperElement.parentElement!.getBoundingClientRect().height
		);
	}

	let startpoint: number;
	let startScrollPos: number;
	function handleTouchStart(e: TouchEvent) {
		startpoint = e.touches[0].clientY; // TODO: add option for vertical
		startScrollPos = contentWrapperElement.parentElement!.scrollTop;
	}

	function handleTouchMove(e: TouchEvent) {
		contentWrapperElement.getBoundingClientRect().top;

		let difference = e.touches[0].clientY - startpoint;
		console.log(difference);

		contentWrapperElement.parentElement!.scrollTo({
			left: 0,
			top: startScrollPos - difference,
		});

		const factor =
			(contentWrapperElement.parentElement!.scrollTop - difference) / getMaxScrollPosition();
		setLastingThumbPosition(getMaxThumbPosition() * factor);
	}
	
	function handleTouchEnd(e: TouchEvent) {
		// TODO: keep "sliding", when done scrolling
		e.touches[0]
	}

	function updateThumbSize() {
		if (!contentWrapperElement || !scrollContainerWrapper) return;
		const wrapperHeight = contentWrapperElement.getBoundingClientRect().height;
		const contentHeight = scrollContainerWrapper.getBoundingClientRect().height;

		const ratio = wrapperHeight / contentHeight;

		let newHeight;
		console.log(ratio);
		if (ratio <= 1) {
			newHeight = 100;
			needsScrollbar = false;
		} else {
			newHeight = 100 / ratio;
			needsScrollbar = true;
		}
		scrollbarThumb.style.setProperty("--thumb-height", newHeight + "%");
	}

	function setLastingThumbPosition(yPosition: number) {
		lastingThumbPosition = normPositionToSize(yPosition);
		scrollbarThumb.style.setProperty("--thumb-position", lastingThumbPosition + "px");
	}

	function changeLastingThumbPositionBy(yPositionDelta: number) {
		setLastingThumbPosition(lastingThumbPosition + yPositionDelta);
	}

	function normPositionToSize(yPosition: number): number {
		if (yPosition < 0) {
			return 0;
		}

		const maxPosition = getMaxThumbPosition();

		if (yPosition > maxPosition) {
			return maxPosition;
		}

		return yPosition;
	}

	function getMaxThumbPosition(): number {
		return scrollbar.getBoundingClientRect().height - scrollbarThumb.getBoundingClientRect().height;
	}

	function setThumbPosition(movedY: number) {
		const newYPosition = normPositionToSize(lastingThumbPosition + movedY);
		scrollbarThumb.style.setProperty("--thumb-position", newYPosition + "px");

		const percentageScrolled = newYPosition / getMaxThumbPosition();

		const newScrollPosition = getMaxScrollPosition() * percentageScrolled;

		contentWrapperElement.parentElement!.scrollTo({
			left: 0,
			top: newScrollPosition,
			behavior: "smooth",
		});
	}

	onMount(() => {
		new ResizeObserver(() => {
			updateThumbSize();
		}).observe(contentWrapperElement);

		let lastTouch: number;

		document.addEventListener("mouseup", (ev) => {
			if (!isDragging) return;
			isDragging = false;
			changeLastingThumbPositionBy(ev.clientY - thumbGrabStartY);
		});
		document.addEventListener("touchend", (ev) => {
			if (!isDragging) return;
			isDragging = false;

			let activeElement = document.activeElement;
			if(!!activeElement){
				(activeElement as HTMLElement).blur();
			}
			changeLastingThumbPositionBy(lastTouch - thumbGrabStartY);
		});
		document.addEventListener("mousemove", (ev) => {
			if (!isDragging) return;
			setThumbPosition(ev.clientY - thumbGrabStartY);
		});
		document.addEventListener("touchmove", (ev) => {
			if (!isDragging) return;
			lastTouch = ev.touches[0].clientY;
			setThumbPosition(lastTouch - thumbGrabStartY);
		});
		scrollbarThumb.addEventListener("mousedown", (ev) => {
			isDragging = true;
			thumbGrabStartY = ev.clientY;
		});
		scrollbarThumb.addEventListener("touchstart", (ev) => {
			isDragging = true;
			thumbGrabStartY = ev.touches[0].clientY;
			lastTouch = thumbGrabStartY;

			scrollbarThumb.focus();
		});
	});
</script>

<div
	bind:this={scrollContainerWrapper}
	class="custom-scroll-container-wrapper"
	onwheel={handleWheel}
	onscroll={(e) => {
		e.preventDefault();
	}}
>
	<div ontouchstart={handleTouchStart} ontouchend={handleTouchEnd} ontouchmove={handleTouchMove} class="content-overflow-hider">
		<div bind:this={contentWrapperElement} class="content-wrapper">
			{@render children?.()}
		</div>
	</div>
	<div bind:this={scrollbar} role="none" oncontextmenu={(e) => {e.preventDefault()}} class="scrollbar" class:scrollbar--needed={needsScrollbar}>
		<div bind:this={scrollbarThumb} tabindex="-1" class="thumb"></div>
	</div>
</div>

<style lang="scss">
	.custom-scroll-container-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;

		&:has(.thumb:active) {
			& > .content-overflow-hider > .content-wrapper {
				user-select: none;
			}
		}

		&:hover > .scrollbar--needed {
			visibility: visible;
		}

		&:has(.thumb:focus) > .scrollbar--needed {
			visibility: visible;
		}
	}

	.content-overflow-hider {
		overflow-y: hidden;
		touch-action: none;
	}

	.content-wrapper {
		height: fit-content;
		&::before,
		&::after {
			/* used to prevent margin-collapsing */
			content: " ";
			display: table;
		}
	}

	/* TODO: prevent mobile scrolling on scrollbar-lane and between scrollbar and content */

	.scrollbar {
		position: relative;
		width: 4px;
		height: 100%;
		background-color: var(--neutral-hover-color);
		border-radius: 2px;
		margin-left: 8px;

		--thumb-height: 20px;
		--thumb-position: 0px;

		visibility: hidden;

		&:has(> .thumb:hover),
		&:has(> .thumb:active) {
			visibility: visible;
			// fade out transition -> background-color with alpha
		}

		&--needed {
			& > .thumb {
				visibility: visible;
				transition: none;
			}
		}
	}

	.thumb {
		position: relative;
		width: 4px;
		height: var(--thumb-height);
		left: 0px;
		border-radius: 4px;
		background-color: var(--text-color);
		top: var(--thumb-position);

		touch-action: none;

		&:hover,
		&:active,
		&:focus {
			width: 8px;
			left: -2px;
			outline: none;
		}
	}
</style>
