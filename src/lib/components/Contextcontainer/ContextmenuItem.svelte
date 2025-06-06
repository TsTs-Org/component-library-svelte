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
	<div class="icon">
		{@render icon?.()}
	</div>
	<div class={[!icon ? "no-icon" : "", "content"]}>
		{@render children?.()}
	</div>
</button>

<style lang="scss">
	.ContextmenuItem {
		border: none;
		white-space: nowrap;
		display: flex;
		align-items: center;
		gap: var(--padding-s);
		padding: var(--padding-xs);
		&:hover {
			background-color: var(--hover-color);
		}

		.icon {
			width: 1rem;
		}
	}
</style>
