<script lang="ts">
	import { onMount } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import Icon from "./Icon.svelte";

    type Variant = "ghost" | "bordered";
    type Option = {
        value: string,
        label: string
    }
    
    type Props = { 
        value?: string,
        label?: string,
        description?: string,
        variant?: Variant,
        options: Option[],
        placeholder: string 
    } & HTMLAttributes<any>
        let { 
            value = $bindable(),
            label,
            description,
            variant = "bordered",
            options,
            placeholder,
            children,
            ...restProps
        }: Props = $props();
        
    let open = $state(false);
    let selectedOption = $state(options.find(option => option.value === value));

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    
    
    const selectOption = (option: Option) => {
        selectedOption = option;
        value = option.value;
        dispatch('change', { value });
        open = false;
    }

    onMount(() => {
        document.addEventListener('click', (event: MouseEvent) => {
            if (event.target && !event.target.closest('.Select') && open ) {
                open = false;
            }
        });
    });

</script>

<div class="Select">
    {#if label}
        <label>{label}</label>
    {/if}

    <button class={["Trigger", variant]} {...restProps} onclick="{() => open = !open}">
        {#if selectedOption}
            {selectedOption.label}
        {:else}
            <span style="color: var(--text-color-muted)">{placeholder}</span>
        {/if}
    
        {#if open}
            <Icon iconName="arrowUp" size="s" style="fill: var(--text-color-muted)" />
        {:else}
            <Icon iconName="arrowDown" size="s" style="fill: var(--text-color-muted)" />
        {/if}
    </button>

    {#if open}
        <div class="Portal">
            {#each options as option}
                <button onclick={() => selectOption(option)}>{option.label}</button>
            {/each}
        </div>
    {/if}

    {#if description}
        <p>{description}</p>
    {/if}
</div>

<style lang="scss">
.Select {
    position: relative;
}

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
.Trigger {
    background-color: transparent;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    height: min-content;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text-color);
    border-radius: var(--border-radius-s);
    padding: var(--padding-m);
    margin-block: var(--padding-xs);
    &.bordered {
        border: 1px solid var(--border-color);
    }
    &.ghost {
        border: none;
    }
}
button:focus {
    border-color: var(--primary-color);
}
.Portal {
    z-index: 500;
    position: absolute;
    background-color: var(--foreground-color);
    width: 100%;
    min-width: fit-content;
    box-sizing: border-box;
    padding: var(--padding-xs);
    border-radius: var(--border-radius-s);
    border: 1px solid var(--border-color);
    button {
        background-color: transparent;
        outline: none;
        text-align: left;
        width: 100%;
        border: none;
        border-radius: var(--border-radius-s);
        padding: var(--padding-s);
        color: var(--text-color-muted);
        &:hover {
            background-color: var(--background-color);
        }
    }
}
</style>