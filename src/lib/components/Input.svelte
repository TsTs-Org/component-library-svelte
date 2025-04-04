<script lang="ts">
	import type { Snippet } from "svelte";
	import type { ChangeEventHandler, HTMLInputAttributes } from "svelte/elements";

	type Variant = "ghost" | "bordered" | "colored";
	type Size = "s" | "m" | "x";
	type Props = {
		onchange?: ChangeEventHandler<HTMLInputElement>;
		value?: string;
		placeholder?: string;
		type?: string;
		variant?: Variant;
		size?: Size;
		outerStyle?: string;
		label?: string;
		description?: string;
		icon?: Snippet;
	};

	let {
		onchange = () => {},
		value = $bindable(),
		placeholder,
		type = "text",
		variant = "ghost",
		size = "m",
		outerStyle,
		label,
		description,
		icon,
		...restProps
	}: Props = $props();

	let focused = $state(false);
</script>

{#if label}
	<h4 class:focused>{label}</h4>
{/if}
<div class="Input">
	<input
		bind:focused
		bind:value
		{placeholder}
		{onchange}
		class={[variant, size]}
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
		flex: 1;
		width: 100%;

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
