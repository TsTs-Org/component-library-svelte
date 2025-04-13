<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import Card from "./Card.svelte";
	import Icon from "./Icon.svelte";
	import Button from "./Button.svelte";

	type Props = { children: Snippet; popoverTrigger: Snippet<[() => void]>; title: Snippet };
	let { children, popoverTrigger, title }: Props = $props();

	let open = $state(false);

	function openTrigger() {
		open = true;
	}

	let childrenWrapperElement: HTMLDivElement;
	let triggerWrapperElement: HTMLDivElement;

	// TODO: use object instead of attributes
	function setInitialSizeToGrowFrom(
		width: string,
		height: string,
		left: string,
		top: string,
		borderRadius: string
	) {
		childrenWrapperElement.style.setProperty("--calculated-width", width);
		childrenWrapperElement.style.setProperty("--calculated-height", height);
		childrenWrapperElement.style.setProperty("--calculated-left", left);
		childrenWrapperElement.style.setProperty("--calculated-top", top);
		childrenWrapperElement.style.setProperty("--calculated-borderRadius", borderRadius);
	}

	$effect(() => {
		if (!open) return;
		const boundingRect = triggerWrapperElement.getBoundingClientRect();
		let sizing = {
			width: boundingRect.width + "px",
			height: boundingRect.height + "px",
			left: boundingRect.left + "px",
			top: boundingRect.top + "px",
		};
		console.log(sizing);
		setInitialSizeToGrowFrom(
			boundingRect.width + "px",
			boundingRect.height + "px",
			boundingRect.left + "px",
			boundingRect.top + "px",
			window.getComputedStyle(triggerWrapperElement).borderRadius
		);
	});
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
				class={["children-wrapper", open ? "children-wrapper--active" : ""]}
				onclick={(ev) => {
					// TODO: is there a cleaner way to do this?
					// can you enrich an event with data? for example "inside-popover" to use in a higher eventhandler?
					ev.stopPropagation();
				}}
				role="none"
				bind:this={childrenWrapperElement}
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
		width: var(--calculated-width, 20%);
		height: var(--calculated-height, 20%);
		left: var(
			--calculated-left,
			calc(50% - var(--calculated-width, 20%) / 2)
		); /* check if this works...*/
		top: var(--calculated-top, 100%);

		/* FIXME: missing close animation */

		&--active {
			animation:
				popup-dimensions 0.3s ease-in-out forwards,
				popup-position 0.3s ease-out forwards;

			@keyframes popup-dimensions {
				from {
					width: var(--calculated-width);
					height: var(--calculated-height);
					border-radius: var(--calculated-border-radius);
				}
				to {
					width: 80%;
					height: 80%;
					border-radius: 16px;
				}
			}

			@keyframes popup-position {
				from {
					left: var(--calculated-left);
					top: var(--calculated-top);
					translate: 0 0;
				}
				to {
					left: 50%;
					top: 50%;
					translate: -50% -50%;
				}
			}
		}
	}

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
