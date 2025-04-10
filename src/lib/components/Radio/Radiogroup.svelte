<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { onMount, setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";

	type Props = {
		onchange?: (value: string) => void;
		value?: string;
		label?: string;
		vertical?: boolean;
		children: Snippet;
	} & HTMLAttributes<any>;

	export type RadioCtx = {
		selected: Writable<string>;
	};

	let {
		onchange = () => {},
		value = $bindable(),
		label,
		children,
		vertical = false,
		...restProps
	}: Props = $props();

	const ctx = {
		selected: writable(value),
	};
	setContext("ctx", ctx);
	let initialized = false;

	onMount(() => {
		return ctx.selected.subscribe((x) => {
			if (!initialized) {
				initialized = true;
				return; // Skip the first run
			}
			value = x as string;
			onchange(x as string);
		});
	});
</script>

<div
	class={"Radio"}
	{...restProps}
>
	<div
		class="items"
		class:vertical
	>
		{@render children?.()}
	</div>
</div>

<!--
@component
## Props
@prop children: Snippet
-->

<style lang="scss">
	.Radio {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;

		.items {
			flex: 1;
			display: flex;
			gap: var(--padding-xs);
			&.vertical {
				flex-direction: column;
			}
		}
	}
</style>
