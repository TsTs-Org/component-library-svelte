<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';
	import type { BuiltinIcon } from '$lib/utils/builtinIcons.ts';
	import { getIcon } from '$lib/utils/builtinIcons.js';

	type Size = 's' | 'm' | 'l';

	type EitherChildrenOrBuiltinIcon =
		| { children: Snippet; iconName?: never }
		| { children?: never; iconName: BuiltinIcon };
	type Props = { size?: Size } & EitherChildrenOrBuiltinIcon & SVGAttributes<any>;

	let { size = 'm', iconName, children, ...restProps }: Props = $props();
</script>

<svg class={[size]} {...restProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
	{#if !!children}
		{@render children?.()}
	{:else if !!iconName}
		{@html getIcon(iconName)}
	{/if}
</svg>

<style lang="scss">
	svg {
		fill: var(--text-color);
		&.s {
			height: var(--text-size-s);
			width: var(--text-size-s);
		}

		&.m {
			height: var(--text-size-m);
			width: var(--text-size-m);
		}
		&.l {
			height: var(--text-size-l);
			width: var(--text-size-l);
		}
		&.xl {
			height: var(--text-size-xl);
			width: var(--text-size-xl);
		}
	}
</style>
