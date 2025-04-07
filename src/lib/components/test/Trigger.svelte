<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { writable, type Writable } from "svelte/store";
	import Button from "../Button.svelte";

	type Props = {
		children?: Snippet;
	} & HTMLAttributes<any>;

	export type TriggerCtx = {
		selected: Writable<boolean>;
	};

	let { children }: Props = $props();

	const ctx = {
		open: writable(false),
	};

	setContext("TriggerCtx", ctx);
</script>

<Button onclick={() => ctx.open.set(true)}>Test</Button>
{@render children?.()}
