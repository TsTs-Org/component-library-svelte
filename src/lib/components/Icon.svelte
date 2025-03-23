<script lang="ts">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

	type Size = 's' | 'm' | 'l';
    type Props = { size?: Size; icon?: Snippet; children: Snippet } & SVGAttributes<any>;

    let {
        size = 'm',
        icon,
        children,
        ...restProps
    }: Props = $props();
</script>

<svg class={[size]} {...restProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    {@render children?.()}
</svg>

<style lang="scss">
svg {
    pointer-events: none;
    fill: var(--text-color);
    &.s {
        height: 1.25rem;
        width: 1.25rem;
    }
    &.m {
        height: 1.75rem;
        width: 1.75rem;
    }
    &.l {
        height: 2.5rem;
        width: 2.5rem;
    }
}
</style>