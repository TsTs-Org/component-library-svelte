<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	const ctx = {
		selected: writable(),
	};

	let { children } = $props();

	setContext("ctx", ctx);
</script>

<div>
	{@render children?.()}
</div>
