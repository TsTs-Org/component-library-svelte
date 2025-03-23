<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes, HTMLSelectAttributes } from "svelte/elements";

    type Props = { 
        value?: string,
        label?: string,
        description?: string,
        placeholder: string, 
        children?: Snippet 
    } & HTMLAttributes<any>
    let { 
        value = $bindable(),
        label,
        description,
        placeholder,
        children,
        ...restProps
    }: Props = $props();
</script>

<div>
    {#if label}
        <label>{label}</label>
    {/if}
    <button {...restProps}>
        {placeholder}
    </button>
    <div class="Portal">
        {@render children?.()}
    </div>
    {#if description}
        <p>{description}</p>
    {/if}
</div>

<style>
label {
    font-size: .925rem;
    font-weight: 600;
    margin-left: var(--padding-xs);
}
p {
    font-size: .75rem;
    font-weight: 600;
    color: var(--text-color-muted);
    margin-left: var(--padding-xs);
}
button {
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
button:focus {
    border-color: var(--primary-color);
}
.Portal {
    display: none;
}
</style>