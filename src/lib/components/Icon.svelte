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