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

	let focused = $state(false);
</script>

<div>
	{#if label}
		<h4 class:focused>{label}</h4>
	{/if}
	<div class="Input">
		<input
			bind:focused
			bind:value
			{onchange}
			class={[variant]}
			{...restProps}
		/>
		{#if !!icon}
			<div
				class="icon"
				class:focused
			>
				{@render icon?.()}
			</div>
		{/if}
	</div>
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
	.Input {
		position: relative;
		min-width: 15rem;

		&:has(.icon) input {
			padding-left: 2.35rem;
		}

		.icon {
			position: absolute;
			top: 12.5%;
			left: 0;
			height: 75%;
			width: 2.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			fill: var(--text-color-muted);
			&.focused {
				fill: var(--text-color);
			}
		}
	}

	h4 {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-color-muted);
		margin-left: var(--padding-xs);
		&.focused {
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
