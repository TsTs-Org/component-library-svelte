<script lang="ts">
	import { onDestroy, onMount, type Snippet } from "svelte";
	import Icon from "./Icon.svelte";
	import { browser } from "$app/environment";
	import { blur, fade, slide } from "svelte/transition";

	type Props = {
		children?: Snippet;
		title?: Snippet;
		footer?: Snippet;
	};
	let { 
		children,
		title,
		footer,
	}: Props = $props();

	let open = $state(false);

	onMount(() => {
		document.addEventListener("keyup", handleEscKey);
	});

	onDestroy(() => {
		if (browser) { document.removeEventListener("keyup", handleEscKey); }
	});

	function handleEscKey(ev: KeyboardEvent): void {
		if (ev.key !== "Escape") return;
		closeSlider();
	}

	export function openSlider(): void { open = true; }
	export function closeSlider(): void {open = false; }
	
	import { cubicOut } from 'svelte/easing';
	import type { AnimationConfig } from "svelte/animate";

  // Custom slide-in from right
  export function slideFromRight(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut } = {}): AnimationConfig {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      delay,
      duration,
      easing,
      css: (t, _) => {
        const x = (1 - t) * 100;
        return `
          transform: ${transform} translateX(${x}%);
          opacity: ${t}
        `;
      }
    };
  }

</script>

{#if open}
	<div
		class="background-dimmer"
		style="backdrop-filter: brightness(70%)"
		onclick={closeSlider}
		transition:fade={{ duration: 200 }}
		role="none"
	>
		<div
			class={"Slider"}
			onclick={(ev) => { ev.stopPropagation(); }}
			role="none"
			transition:slideFromRight
		>
			<div class="header">
				<span class="title">{@render title?.()}</span>
				<button onclick={() => { open = false; }} >
					<Icon
						iconName="close"
						size="m"
					></Icon>
				</button>
			</div>
			<div class="main">
				{@render children?.()}
			</div>
			<div class="footer">
				{@render footer?.()}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.Slider {
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		min-width: 400px;
		width: 35%;
		max-width: 600px;
		height: 100%;
		margin-left: auto;
		background-color: var(--foreground-color);
		border-left: 1px solid var(--border-color);
		padding: var(--padding-l);
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: fit-content;
		min-width: 0;
	}

	.title {
		min-width: 0;
		text-overflow: ellipsis;
		overflow: hidden;
		text-wrap: nowrap;
		text-align: left;
		flex-grow: 1;
		flex-shrink: 1;
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
