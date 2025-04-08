<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Props = {
		icon?: Snippet;
		children: Snippet;
	} & HTMLButtonAttributes;

	let { icon, children, ...restProps }: Props = $props();
</script>

<button
	class="ContextmenuItem"
	{...restProps}
>
	<div class="icon">{@render icon?.()}</div>
	<div class={[!icon ? "no-icon" : "", "content"]}>
		{@render children?.()}
	</div>
</button>

<style lang="scss">
	.ContextmenuItem {
		border: none;
		white-space: nowrap;
		display: flex;
		gap: var(--padding-xs);
		padding: var(--padding-xs);
		border-radius: var(--border-radius-xs);
		&:hover {
			background-color: var(--neutral-hover-color);
		}

		.icon {
			width: 1rem;
		}
	}
</style>
