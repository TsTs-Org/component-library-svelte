<script lang="ts">
	import { onDestroy, onMount, type Snippet } from "svelte";
	import Card from "./Card.svelte";
	import Icon from "./Icon.svelte";
	import { type AnimationConfig } from "svelte/animate";
	import { linear } from "svelte/easing";

	// TODO: add option to open page with already openend popover

	type Props = { 
		children: Snippet; 
		popoverTrigger: Snippet<[() => void]>; 
		title: Snippet,
		minimumSize?: boolean
	};
	let { children, popoverTrigger, title, minimumSize = false }: Props = $props();

	let open = $state(false);

	function openTrigger() {
		open = true;
	}

	let childrenWrapperElement: HTMLDivElement;
	let triggerWrapperElement: HTMLDivElement;

	const final = {
		width: "80%",
		height: "80%",
		left: "50%",
		top: "50%",
		translateX: "-50%",
		translateY: "-50%",
	};

	type AnimationParams = { delay?: number; duration?: number; easing?: (t: number) => number };

	function defaultPartialAnimationConfigFromParams(params?: AnimationParams): AnimationConfig {
		return {
			delay: params?.delay || 0,
			duration: params?.duration || 300,
			easing: params?.easing || linear,
		};
	}

	function growToPopoverAnimation(node: HTMLElement, params?: AnimationParams): AnimationConfig {
		const boundingRect = triggerWrapperElement.getBoundingClientRect();
		const initial = {
			width: boundingRect.width + "px",
			height: boundingRect.height + "px",
			left: boundingRect.left + "px",
			top: boundingRect.top + "px",
			translateX: "0" + "px",
			translateY: "0" + "px",
		};
		return {
			...defaultPartialAnimationConfigFromParams(params),
			css: (t, _) => {
				return `
					width: calc(${initial.width} + calc(${final.width} - ${initial.width}) * ${t});
					height: calc(${initial.height} + calc(${final.height} - ${initial.height}) * ${t}) ;
					left: calc(${initial.left} + calc(${final.left} - ${initial.left}) * ${t});
					top: calc(${initial.top} + calc(${final.top} - ${initial.top}) * ${t});
					translate: 
						calc(${initial.translateX} + calc(${final.translateX} - ${initial.translateX}) * ${t}) 
						calc(${initial.translateY} + calc(${final.translateY} - ${initial.translateY}) * ${t});
				`;
			},
		};
	}

	const backdropDimmingRemainingBrightnessPercentage: number = 60;

	function dimBackgroundAnimation(node: HTMLElement, params?: AnimationParams): AnimationConfig {
		return {
			...defaultPartialAnimationConfigFromParams(params),
			css: (t, _) => {
				const remainingBrightness = 100 - (100 - backdropDimmingRemainingBrightnessPercentage) * t;
				return `backdrop-filter: brightness(${remainingBrightness}%);`;
			},
		};
	}

	function changeOpacityAnimation(node: HTMLElement, params?: AnimationParams): AnimationConfig {
		return {
			...defaultPartialAnimationConfigFromParams(params),
			css: (t, _) => {
				const remainingOpacity = t;
				return `
					opacity: ${remainingOpacity};
					transform-origin: top left;
					transform: scale(${t});
				`;
			},
		};
	}

	onMount(() => {
		document.addEventListener("keyup", handleEscKey);
	});

	onDestroy(() => {
		document.removeEventListener("keyup", handleEscKey);
	})

	function handleEscKey(ev: KeyboardEvent): void {
		if (ev.key !== "Escape") return
		closePopover();
	}

	export function closePopover(): void {
		open = false
	}
</script>

<div
	class:trigger-wrapper={minimumSize}
	bind:this={triggerWrapperElement}
>
	{@render popoverTrigger?.(openTrigger)}
</div>

{#if open}
	<div
		class="background-dimmer"
		style="backdrop-filter: brightness({backdropDimmingRemainingBrightnessPercentage}%)"
		transition:dimBackgroundAnimation
		onclick={closePopover}
		role="none"
	>
		<div
			class={"children-wrapper"}
			style="width:{final.width}; height:{final.height}; left:{final.left}; top:{final.top}; translate:{final.translateX} {final.translateY}"
			onclick={(ev) => {
				// TODO: is there a cleaner way to do this?
				// can you enrich an event with data? for example "inside-popover" to use in a higher eventhandler?
				ev.stopPropagation();
			}}
			role="none"
			bind:this={childrenWrapperElement}
			transition:growToPopoverAnimation
		>
			<Card>
				{#snippet iconRight(size)}
					<button
						onclick={() => {
							open = false;
						}}
						><div
							class="children-opacity-changer"
							transition:changeOpacityAnimation
						>
							<Icon
								iconName="x"
								{size}
							></Icon>
						</div>
					</button>
				{/snippet}
				{#snippet title()}
					<div
						class="children-opacity-changer"
						transition:changeOpacityAnimation
					>
						{@render title?.()}
					</div>
				{/snippet}
				<div
					class="children-opacity-changer"
					transition:changeOpacityAnimation
				>
					{@render children?.()}
				</div>
			</Card>
		</div>
	</div>
{/if}

<style lang="scss">
	.trigger-wrapper {
		height: fit-content;
		width: fit-content;
	}

	.children-wrapper {
		position: relative;
		overflow: hidden;
	}

	.children-opacity-changer {
		height: 100%;
	}

	.background-dimmer {
		position: fixed;
		z-index: 1001;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
