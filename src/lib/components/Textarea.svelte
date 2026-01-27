<script lang="ts">
	import { Icon } from "$lib/index.js";
	import { onMount, type Snippet } from "svelte";
	import type { ChangeEventHandler, HTMLInputAttributes } from "svelte/elements";

	type Variant = "ghost" | "bordered" | "colored";
	type Size = "s" | "m" | "x";
	type Props = {
		this?: HTMLTextAreaElement;
		onchange?: ChangeEventHandler<HTMLTextAreaElement>;
		value?: string;
		placeholder?: string;
		variant?: Variant;
		size?: Size;
		outerStyle?: string;
		label?: string;
		description?: string;
	};

	let {
		onchange = () => {},
		value = $bindable(),
		this: _this = $bindable(),
		placeholder,
		variant = "ghost",
		size = "m",
		outerStyle,
		label,
		description,
		...restProps
	}: Props = $props();

	let focused = $state(false);

</script>

<div class="InputWrapper">
	{#if label}
		<h5 class:focused>{label}</h5>
	{/if}
	<textarea
		bind:this={_this}
		bind:focused
		bind:value
		{placeholder}
		{onchange}
		class={[variant, size]}
		{...restProps}
	/>
	{#if description}
		<p>{description}</p>
	{/if}
</div>

<!--
@component
## Props
@prop {function} onchange - The function to call when the input value changes.
@prop {string} value - The value of the input.
@prop {string} variant - The variant of the input. Can be "ghost", "bordered", or "colored".
@prop {string} label - The label of the input.
@prop {string} description - The description of the input.
@prop {Snippet} icon - The icon to be displayed in the input.
-->

<style lang="scss">
	.InputWrapper {
		width: 100%;
	}

	h5 {
		font-weight: 600;
		margin-left: var(--padding-xs);
		color: var(--text-color-muted);
		&.focused {
			color: var(--text-color);
		}
	}
	p {
		color: var(--text-color-muted);
		margin-left: var(--padding-xs);
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
		margin-block: var(--padding-xs);
		&.s {
			padding: var(--padding-s);
		}
		&.m {
			padding: var(--padding-m);
		}
		&.l {
			padding: var(--padding-l);
		}
	}
	textarea:focus {
		border-color: var(--text-color);
	}
	textarea:disabled {
		cursor: not-allowed;
	}
	textarea::placeholder {
		color: var(--text-color-muted);
	}
</style>
