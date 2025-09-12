<script lang="ts">
	import { onDestroy, onMount, type Snippet } from "svelte";
	import Card from "./Card.svelte";
	import Icon from "./Icon.svelte";
	import { type AnimationConfig } from "svelte/animate";
	import { linear } from "svelte/easing";
	import { browser } from "$app/environment";
	import { initAsyncCompiler } from "sass";

	// TODO: add option to open page with already openend popover

	type Props = {
		children: Snippet;
		popoverTrigger: Snippet<[() => void]>;
		title: Snippet;
		minimumSize?: boolean;
	};
	let { children, popoverTrigger, title, minimumSize = false }: Props = $props();

	let open = $state(false);

	function openTrigger() {
		open = true;
	}

	let childrenWrapperElement: HTMLDivElement;
	let triggerWrapperElement: HTMLDivElement;

	// TODO: think about what happens when dynamic is needed
	// or when the trigger element changes size because of window resize for example
	const final = {
		width: "80vw",
		height: "80vh",
		left: "50vw",
		top: "50vh",
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

	function getInitial() {
		const boundingRect = triggerWrapperElement.getBoundingClientRect();
		return {
			width: boundingRect.width + "px",
			height: boundingRect.height + "px",
			left: boundingRect.left + "px",
			top: boundingRect.top + "px",
			translateX: "0" + "px",
			translateY: "0" + "px",
		};
	}

	function growToPopoverAnimation(node: HTMLElement, params?: AnimationParams): AnimationConfig {
		console.log(defaultPartialAnimationConfigFromParams(params).easing?.name);

		const boundingRect = triggerWrapperElement.getBoundingClientRect();
		const initial = getInitial();

		// FIXME: does not work when trigger element is shifted with left or translate (because trigger wrapper won't be shifted by that)

		return {
			...defaultPartialAnimationConfigFromParams(params),
			css: (t, _) => {
				return `
					width: calc(${initial.width} + calc(${final.width} - ${initial.width}) * ${t});
					height: calc(${initial.height} + calc(${final.height} - ${initial.height}) * ${t});

					translate:
					calc(
						calc(calc(${initial.left} + ${initial.translateX}) * ${1 - t}) +
						calc(calc(${final.translateX} + ${final.left}) * ${t})

					)
					calc(
						calc(calc(${initial.top} + ${initial.translateY}) * ${1 - t}) +
						calc(calc(${final.translateY} + ${final.top}) * ${t})
					);

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
		if (browser) {
			document.removeEventListener("keyup", handleEscKey);
		}
	});

	function handleEscKey(ev: KeyboardEvent): void {
		if (ev.key !== "Escape") return;
		closePopover();
	}

	export function openPopover(): void {
		open = true;
	}

	export function closePopover(): void {
		open = false;
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
			style="left: 0; top: 0; width:{final.width}; height:{final.height}; translate: calc({final.translateX} + {final.left}) calc({final.translateY} + {final.top});"
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
								iconName="close"
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
