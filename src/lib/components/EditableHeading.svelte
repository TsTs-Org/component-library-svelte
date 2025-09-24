<script lang="ts">
	import { onMount } from "svelte";


	type Props = {
        tag: "h1" | "h2" | "h3" | "h4" | "h5",
		value?: string;
		placeholder?: string;
        editing?: boolean | undefined;
        oncancel?: Function;
        onsubmit?: Function;
	};

	let {
        tag,
		value = $bindable(),
		placeholder,
        editing = $bindable(undefined),
        oncancel = undefined,
        onsubmit = undefined,
		...restProps
	}: Props = $props();


    let skipBlur = $state(false);
    let editableManagedExternal = false;
    onMount(() => {
        if (editing !== undefined) { editableManagedExternal = true }
    })

    function handleKey(ev: KeyboardEvent): void {
		if (ev.key == "Escape" && oncancel) {
            skipBlur = true
            setEditable(false)
			oncancel(value)
		}else if (ev.key == "Enter" && onsubmit) {
            skipBlur = true
            setEditable(false)
			onsubmit(value)
		}
	}

    function setEditable(val: boolean) {
       if (!editableManagedExternal) {
            editing = val;
        } 
    }

</script>

{#if editing}
    <input 
        class={["__editable_element", tag]}
        autofocus 
        onkeydown={(e: KeyboardEvent) => {
            handleKey(e)
        }}
        bind:value
        onblur={(e: any) =>{ 
            if (!skipBlur){
                setEditable(false)
                if (oncancel) { oncancel(value) }
            } else {
                skipBlur = false;
            }
        }}
    />
{:else}
    <svelte:element
        this={tag}
        class="__editable_element"
        class:empty={value == ""}
        onclick={() =>{
            setEditable(true)
        }}
    >
        {value == "" ? placeholder : value}
    </svelte:element>
{/if}
