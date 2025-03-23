<script lang="ts">
	import { getMode } from "../states.svelte.js";
	import Icon from "./Icon.svelte";
	let { name, children } = $props();
	let localMode = $state(getMode());
	const setMode = () => {
		localMode === "light" ? (localMode = "dark") : (localMode = "light");
	};
</script>

<div class={localMode + "-mode Showcase"}>
	<div class="header">
		<h2>{name}</h2>
		<button aria-label="Toggle light/dark mode" onclick={() => setMode()}>
			{#if localMode === "light"}
				<Icon iconName="sun"></Icon>
			{:else}
				<Icon iconName="moon"></Icon>
			{/if}
		</button>
	</div>
	{@render children?.()}
</div>

<style lang="scss">
	.Showcase {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--foreground-color);
		padding: var(--padding-l);
		// Adjust a bit to make the spacing look a bit more natural as the header does not take up space
		padding-top: calc(var(--padding-l) * 2);
		border-radius: var(--border-radius-m);
		border: 1px solid var(--border-color);
		position: relative;
	}

	.header {
		position: absolute;
		top: var(--padding-l);
		left: var(--padding-l);
		display: flex;
		justify-content: space-between;
		width: calc(100% - var(--padding-l) * 2);
		button {
			background-color: transparent;
			border: none;
			cursor: pointer;
			svg {
				fill: var(--text-color);
			}
		}
	}
</style>
