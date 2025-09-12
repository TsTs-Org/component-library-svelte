<script lang="ts">

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
    <input 
        class="h5 __editable_element"
        autofocus 
        bind:value
        onblur={() => editing = false}
    />
{:else}
    <h5 
        class="__editable_element"
        class:empty={value == ""}
        onclick={() => editing = true}
    >
        {value == "" ? placeholder : value}
    </h5>
{/if}
