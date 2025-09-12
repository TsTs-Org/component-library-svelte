<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import type { ChangeEventHandler, HTMLInputAttributes } from "svelte/elements";

	type Props = {
		value?: string;
		placeholder?: string;
	};

	let {
		value = $bindable(),
		placeholder,
		...restProps
	}: Props = $props();

    let editing = $state(false);
</script>

{#if editing}
    <textarea 
        class="p __editable_element"
        autofocus 
        bind:value
        onblur={() => editing = false}
    />
{:else}
    <p 
        class="__editable_element"
        class:empty={value == ""}
        onclick={() => editing = true}
    >
        {value == "" ? placeholder : value}
    </p>
{/if}

<style>
    :global(.__editable_element) {
        background-color: transparent;
        color: var(--text-color);
        cursor: text;
        border: 1px solid transparent;
        box-sizing: border-box;
        width: 100%;
        resize: none;
    }

    :global(.__editable_element.empty) {
        color: var(--text-color-muted);
        opacity: .5;
    }

    :global(textarea.__editable_element), :global(input.__editable_element) {
        border-bottom: 1px solid var(--primary-color);
    }

    :global(textarea.__editable_element:focus), :global(input.__editable_element:focus){
        outline: none;
    }

</style>