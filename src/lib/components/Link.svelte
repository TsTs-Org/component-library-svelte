<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	type Variant = "ghost" | "bordered" | "colored";
	type Size = "s" | "m" | "l";
	type Props = {
		variant?: Variant;
		size?: Size;
		icon?: Snippet;
		children: Snippet;
	} & HTMLAnchorAttributes;

	let { variant = "ghost", size = "m", icon, children, ...restProps }: Props = $props();
</script>

<a
	class={[variant, size]}
	{...restProps}
>
	{@render children?.()}
</a>

<!--
@component
## Props
@prop {string} variant - The variant of the link. Can be "ghost", "bordered", or "colored".
@prop {string} size - The size of the link. Can be "s", "m", or "l".
@prop {Snippet} icon - The icon to be displayed in the link.
-->

<style lang="scss">
	a {
		text-align: center;
		text-decoration: none;
		height: fit-content;
		color: var(--text-color);
		padding: var(--padding-m);
		border-radius: var(--border-radius-m);
		font-size: 0.9rem;
		&.s {
			padding: var(--padding-s);
			border-radius: var(--border-radius-s);
		}
		&.l {
			padding: var(--padding-l);
			font-size: 1rem;
			border-radius: var(--border-radius-l);
		}

		&.ghost {
			background-color: none;
			border: none;
		}

		&.bordered {
			border: 1px solid var(--border-color);
		}

		&.colored {
			border: none;
			background-color: var(--primary-color);
			color: var(--text-color-inverted);
			&:hover {
				background-color: var(--hover-color);
			}
		}
	}
	a:hover {
		background-color: var(--neutral-hover-color);
		cursor: pointer;
	}
</style>
