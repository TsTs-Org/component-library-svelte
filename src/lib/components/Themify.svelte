<script module>
	if (typeof window !== "undefined") {
		getPersistentPrimaryColor("royalblue");
		getPersistentMode("light-mode");
	}
</script>

<script lang="ts">
	import {
		_mode,
		getPersistentMode,
		getPersistentPrimaryColor,
	} from "$lib/utils/themify.svelte.js";
	import { onMount, type Snippet } from "svelte";
	import Icon from "./Icon.svelte";

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
	{#if loading}
		<div class="loader">
			<Icon
				size="l"
				iconName="renew"
			/>
		</div>
	{:else}
		{@render children?.()}
	{/if}
</div>

<style>
	.page {
		position: relative;
		height: 100vh;
		overflow: auto;
		box-sizing: border-box;
		background-color: var(--background-color);
	}

	.loader {
		width: fit-content;
		margin-inline: auto;
		margin-top: 50vh;
		scale: 1.25;
		animation: loading 1s linear infinite;
	}

	@keyframes loading {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
