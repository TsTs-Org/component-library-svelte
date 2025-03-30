<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Variant = "background" | "glass";
	type Props = { variant?: Variant; children?: Snippet } & HTMLAttributes<any>;
	let { variant = "background", children, ...restProps }: Props = $props();
</script>

<nav
	class={[variant]}
	{...restProps}
>
	{@render children?.()}
</nav>

<!--
@component
## Props
@prop {string} variant - The variant of the navigation bar. Can be "background" or "glass".
-->

<style lang="scss">
	nav {
		position: sticky;
		top: 0;
		box-sizing: border-box;
		width: 100%;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--padding-m) var(--padding-l);
		border-bottom: 1px solid var(--border-color);
		&.background {
			background: var(--background-color);
		}
		&.glass {
			background: rgba($color: #000000, $alpha: 0.35);
			backdrop-filter: blur(8px);
			-webkit-backdrop-filter: blur(8px);
		}
	}
</style>
