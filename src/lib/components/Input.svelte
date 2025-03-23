<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLInputAttributes } from "svelte/elements";

	type Variant = "ghost" | "bordered" | "colored";
	type Props = {
		variant?: Variant;
		label?: string;
		description?: string;
		icon?: Snippet;
	} & HTMLInputAttributes;

	let {
		variant = "ghost",
		value = $bindable(),
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
	<input bind:value class={[variant]} {...restProps} />
	{#if description}
		<p>{description}</p>
	{/if}
</div>

<style lang="scss">
	label {
		font-size: 0.925rem;
		font-weight: 600;
		margin-left: var(--padding-xs);
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
		border-color: var(--primary-color);
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
