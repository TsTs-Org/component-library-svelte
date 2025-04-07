<script module>
	if (typeof window !== "undefined") {
		getPersistentPrimaryColor("royalblue");
		getPersistentMode("light-mode");
	}
	let open_overlay = $state(false);
	export function openOverlay() {
		open_overlay = true;
	}
	export function closeOverlay() {
		open_overlay = false;
	}
</script>

<script lang="ts">
	import {
		_mode,
		getPersistentMode,
		getPersistentPrimaryColor,
	} from "$lib/utils/themify.svelte.js";
	import { onMount, type Snippet } from "svelte";
	import Loader from "./Loader.svelte";

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();

	let mode = $state("");
	onMount(() => {
		return _mode.subscribe((value) => {
			mode = value;
		});
	});

	let loading = $state(true);

	setTimeout(() => {
		loading = false;
	}, 500);
</script>

<div class={mode + " page"}>
	{#if open_overlay}
		<div
			class="Overlay"
			onclick={() => (open_overlay = false)}
		></div>
	{/if}
	{#if loading}
		<div class="loader">
			<Loader size="l" />
		</div>
	{:else}
		{@render children?.()}
	{/if}
</div>

<style>
	.page {
		position: relative;
		height: 100dvh;
		overflow: auto;
		box-sizing: border-box;
		background-color: var(--background-color);
		display: flex;
		flex-direction: column;
	}

	.loader {
		width: fit-content;
		margin-inline: auto;
		margin-top: 50vh;
		animation: loading 1s linear infinite;
	}

	.Overlay {
		z-index: 499;
		background-color: rgba(255, 0, 0, 0.1);
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}
</style>
