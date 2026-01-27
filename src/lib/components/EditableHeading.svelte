<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

	type Props = {
        tag: "h1" | "h2" | "h3" | "h4" | "h5",
		value?: string;
		placeholder?: string;
        editing?: boolean | undefined;
        oncancel?: Function;
        onsubmit?: Function;
        globalClasses?: string[];
	};

	let {
        tag,
		value = $bindable(),
		placeholder,
        editing = $bindable(undefined),
        oncancel = undefined,
        onsubmit = undefined,
        globalClasses = [],
		...restProps
	}: Props = $props();

    let self: HTMLInputElement;
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

    $effect(() => {
        if (editing) {
            self.focus();
        }
    })

</script>

{#if editing}
    <input 
        bind:this={self}
        class={["__editable_element", tag, ...globalClasses]}
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
        class={["__editable_element", ...globalClasses]}
        class:empty={value == ""}
        onclick={() =>{
            setEditable(true)
        }}
    >
        {value == "" ? placeholder : value}
    </svelte:element>
{/if}
