<script lang="ts">
	import { onMount, type SvelteComponent, type Snippet } from "svelte";
	import type { ChangeEventHandler, HTMLInputAttributes } from "svelte/elements";
	import Textarea from "./Textarea.svelte";

    let self: HTMLTextAreaElement | SvelteComponent;

	type Props = {
		value?: string;
		placeholder?: string;
        height?: string;
        oncancel?: Function;
        onsubmit?: Function;
        globalClasses?: string[];
	};

	let {
		value = $bindable(),
		placeholder,
        height = "8rem",
        oncancel = undefined,
        onsubmit = undefined,
        globalClasses = [],
		...restProps
	}: Props = $props();

    let editing = $state(false);
    let skipBlur = $state(false);
    
    function handleKey(ev: KeyboardEvent): void {
		if (ev.key == "Escape" && oncancel) {
            skipBlur = true
            editing = false
			oncancel(value)
		}else if (ev.key == "Enter" && onsubmit) {
            skipBlur = true
            editing = false
			onsubmit(value)
		}
	}

    $effect(() => {
        if (editing) {
            self.focus();
        }
    })
</script>

{#if editing}
    <textarea 
        style={"min-height: " + height}
        bind:this={self}
        class={[...globalClasses, "p __editable_element"]}
        bind:value
        onkeydown={(e: KeyboardEvent) => {
            handleKey(e)
        }}
        onblur={() => {
            if (!skipBlur) {
                editing = false;
                if (oncancel) { oncancel(value) }
            }else {
                skipBlur = false
            }
        }}
    ></textarea>
{:else}
    <p 
        style={"min-height: " + height}
        class:empty={value == ""}
        class={[...globalClasses, "__editable_element"]}
        onclick={() => editing = true}
    >
        {value == "" ? placeholder : value}
    </p>
{/if}

<style>
    p {
        border-left: 1px solid var(--border-color);
        min-height: 8rem;
        padding: var(--padding-xs);
    }
    textarea {
		resize: none;
		background-color: transparent;
		outline: none;
		width: 100%;
		box-sizing: border-box;
		min-height: 8rem;
		height: min-content;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-s);
        padding: var(--padding-xs);
	}
	textarea:focus {
		border-color: var(--text-color);
	}
</style>