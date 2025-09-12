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
