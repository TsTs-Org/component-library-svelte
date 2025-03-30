<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLInputAttributes } from "svelte/elements";

	type Variant = "ghost" | "bordered" | "colored";
	type Props = {
		onchange?: (value: string) => void;
		value?: string;
		variant?: Variant;
		label?: string;
		description?: string;
		icon?: Snippet;
	} & HTMLInputAttributes;

	let {
		onchange = () => {},
		value = $bindable(),
		variant = "ghost",
		label,
		description,
		icon,
		...restProps
	}: Props = $props();
</script>

<div>
	{#if label}
		<label>{label}</label>
	{/if}
	<input
		bind:value
		{onchange}
		class={[variant]}
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
	label {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-color-muted);
		margin-left: var(--padding-xs);
		&:has(+ input:focus) {
			color: var(--text-color);
		}
	}
	p {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-color-muted);
		margin-left: var(--padding-xs);
	}
	input {
		background-color: transparent;
		outline: none;
		width: 100%;
		box-sizing: border-box;
		height: min-content;
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-s);
		padding: var(--padding-m);
		margin-block: var(--padding-xs);
	}
	input:focus {
		border-color: var(--text-color);
	}
	input:disabled {
		cursor: not-allowed;
	}
	input::placeholder {
		color: var(--text-color-muted);
	}

	input::file-selector-button {
		border: none;
		background-color: transparent;
		color: var(--text-color);
		font-weight: 800;
	}
	input::file-selector-button:hover {
		cursor: pointer;
	}
</style>
