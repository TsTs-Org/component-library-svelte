<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLOptionAttributes } from "svelte/elements";

    type Props = { title?: string, children?: Snippet } & HTMLOptionAttributes;
    let { 
        value = $bindable(),
        title,
        ...restProps
    }: Props = $props();
</script>

<option value={value} {...restProps}>
    {title}
</option>

<style>
option {
    background-color: transparent;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    height: min-content;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-s);
    padding: var(--padding-s);
    margin-block: var(--padding-xs);
}
</style>