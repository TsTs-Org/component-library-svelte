<script lang="ts">
	import { Icon } from "$lib/index.js";
	import { onMount, type Snippet } from "svelte";
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

	const initial_type = restProps.type;
	let self: HTMLInputElement;
	let focused = $state(false);
	let show_password = $state(false);

	function swapPasswordDisplay(e: Event) {
		e.preventDefault();
		show_password = !show_password;
		self.type = show_password ? "text" : "password";
	}

	onMount(() => {
		self.type = initial_type;
	});
</script>

<div class="InputWrapper">
	{#if label}
		<h5 class:focused>{label}</h5>
	{/if}
	<div class="Input">
		<input
			bind:this={self}
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

		{#if initial_type == "password"}
			<span
				class={["password-btn", initial_type]}
				class:focused
				onclick={swapPasswordDisplay}
			>
				<Icon
					iconName={show_password ? "visibility" : "visibility_off"}
					color="inherit"
				/>
			</span>
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
	.InputWrapper {
		width: 100%;
		display:contents;
	}
	.Input {
		position: relative;
		display:contents;

		&:has(.icon) input {
			padding-left: 2.35rem;
		}

		.password-btn {
			display: none;
			right: 0;
			cursor: pointer;
			&.password {
				display: flex;
			}
			&:hover {
				fill: var(--text-color);
			}
		}

		.icon,
		.password-btn {
			position: absolute;
			top: 12.5%;
			height: 75%;
			width: 2.5rem;
			align-items: center;
			justify-content: center;
			fill: var(--text-color-muted);
			&.focused {
				fill: var(--text-color);
			}
		}

		.icon {
			display: flex;
			left: 0;
		}
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
	input {
		background-color: transparent;
		outline: none;
		width: 100%;
		box-sizing: border-box;
		// height: min-content;
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
