<script lang="ts">
	import { type Snippet } from "svelte";
	import Card from "./Card.svelte";
	import Icon from "./Icon.svelte";
	import { type AnimationConfig } from "svelte/animate";
	import { linear } from "svelte/easing";

	type Props = { children: Snippet; popoverTrigger: Snippet<[() => void]>; title: Snippet };
	let { children, popoverTrigger, title }: Props = $props();

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

	function myFadeInTransition(
		node: HTMLElement,
		params?: { delay?: number; duration?: number; easing?: (t: number) => number }
	): AnimationConfig {
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
			delay: params?.delay || 0,
			duration: params?.duration || 300,
			easing: params?.easing || linear,
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
		// create AnimationConfig-object from the input values... -> the animation inside the config will be automatically run
	}
</script>

<div>
	<div
		class="trigger-wrapper"
		bind:this={triggerWrapperElement}
	>
		{@render popoverTrigger?.(openTrigger)}
	</div>

	{#if open}
		<div
			class="background-dimmer"
			onclick={() => {
				open = false;
			}}
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
				in:myFadeInTransition
				out:myFadeInTransition
			>
				<Card {title}>
					{#snippet iconRight(size)}
						<button
							onclick={() => {
								console.log("cliiiick");
								open = false;
							}}
						>
							<Icon
								iconName="x"
								{size}
							></Icon>
						</button>
					{/snippet}
					{@render title?.()}
					{@render children?.()}
				</Card>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.trigger-wrapper {
		/* TODO: maybe use `display: contents`, but then I have to figure out a way to get the boundingclientrect */
		height: fit-content;
		width: fit-content;
	}

	.children-wrapper {
		position: relative;
		overflow: hidden;
	}

	// FIXME: animation for dimming when opening/closing
	// make something like this into a ripple effect through upscaling: https://stackoverflow.com/questions/10768451/inline-svg-in-css
	// (of an svg "blob" -> https://www.blobmaker.app/)
	.background-dimmer {
		position: fixed;
		z-index: 1001;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		backdrop-filter: brightness(60%);
	}
</style>
