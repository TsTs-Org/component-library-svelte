<script lang="ts">
	import { onMount, type Snippet } from "svelte";

	// TODO: add vertical option

	type Props = {
		fadeColor?: string;
		fadeWidth?: string;
		children: Snippet;
	};

	let { fadeColor, fadeWidth, children }: Props = $props();

	let overflowContainer: HTMLDivElement;
	let contentWrapper: HTMLDivElement;

	let indicatorBeforeVisible = $state(false);
	let indicatorAfterVisible = $state(false);

	function processIndicatorVisibility() {
		let scrollLeft = contentWrapper.scrollLeft;
		let scrollWidth = contentWrapper.scrollWidth;
		let clientWidth = contentWrapper.clientWidth;

		indicatorBeforeVisible = !(scrollLeft === 0);
		indicatorAfterVisible = scrollWidth - scrollLeft > clientWidth;
	}

	function handleWheel(ev: WheelEvent) {
		if (!ev.shiftKey) return;

		ev.preventDefault();
		contentWrapper.scrollBy(ev.deltaY, 0);
		processIndicatorVisibility(); // possibly not very performant
	}

	let dragging = false;
	let dragMouseStart = 0;
	let dragOffsetStart = 0;

	function handlePointerDown(ev: PointerEvent) {
		dragMouseStart = ev.clientX;
		dragOffsetStart = contentWrapper.scrollLeft;
		dragging = !0;
	}

	function handlePointerMove(ev: PointerEvent) {
		if (!dragging) return;

		let newScrollLeft = dragOffsetStart - (ev.clientX - dragMouseStart);
		let scrollToOptions: ScrollToOptions = { left: newScrollLeft, top: 0 };
		contentWrapper.scrollTo(scrollToOptions);
		processIndicatorVisibility();
	}

	onMount(() => {
		// this doesn't seem to work with contenteditable -> another wrapper div and a resizeObserver on it could fix it
		// probably not very performant
		const mutationConfig: MutationObserverInit = { childList: true, subtree: true };
		new MutationObserver((mutationList, _) => {
			mutationList.forEach((_) => {
				processIndicatorVisibility();
			});
		}).observe(contentWrapper, mutationConfig);

		document.addEventListener("pointerup", () => {
			dragging = false;
		});
		processIndicatorVisibility();
	});

	$effect(() => {
		if (!!fadeColor)
			overflowContainer.style.setProperty("--indicator-overwrite-to-color", fadeColor);
		if (!!fadeWidth)
			overflowContainer.style.setProperty("--indicator-overwrite-fade-width", fadeWidth);
	});
</script>

<!-- TODO: add arrows inside the indicators (that's the reason why pseudo elements are used on the indicators) -->
<div
	class="overflow-container"
	onwheel={handleWheel}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	bind:this={overflowContainer}
>
	<div class={["indicator-before", indicatorBeforeVisible ? "indicator-visible" : ""]}></div>
	<div
		class="content-wrapper"
		bind:this={contentWrapper}
	>
		{@render children?.()}
	</div>
	<div class={["indicator-after", indicatorAfterVisible ? "indicator-visible" : ""]}></div>
</div>

<style lang="scss">
	.overflow-container {
		position: relative;
		width: 100%;
		touch-action: none;
	}

	.content-wrapper {
		display: flex;
		flex-direction: row;
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.indicator-before,
	.indicator-after {
		position: absolute;
		height: 100%;
		--indicator-from-color: rgba(0, 0, 0, 0);
		--indicator-to-color: var(--indicator-overwrite-to-color, var(--background-color));
		z-index: 1;
		top: 0;
		visibility: hidden;
	}

	.indicator-visible {
		visibility: visible;
	}

	.indicator-before::after,
	.indicator-after::before {
		display: block;
		content: "";
		height: 100%;
		width: var(--indicator-overwrite-fade-width, 0.75rem);
	}

	.indicator-before {
		left: 0;
		&::after {
			background-image: linear-gradient(
				to right,
				var(--indicator-to-color),
				var(--indicator-from-color)
			);
		}
	}

	.indicator-after {
		right: 0;
		&::before {
			background-image: linear-gradient(
				to left,
				var(--indicator-to-color),
				var(--indicator-from-color)
			);
		}
	}
</style>
