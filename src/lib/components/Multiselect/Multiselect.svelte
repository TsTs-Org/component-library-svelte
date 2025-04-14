<script lang="ts">
	import { onMount, setContext } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import Icon from "../Icon.svelte";
	import Dropdown from "../Dropdown/Dropdown.svelte";
	import { writable, type Writable } from "svelte/store";

	type Variant = "ghost" | "bordered";
	type Size = "s" | "m" | "l";

	type Props = {
		onchange?: (value: Array<Option>) => void;
		value?: Array<Option>;
		label?: string;
		description?: string;
		initial?: Array<Option>;
		variant?: Variant;
		size?: Size;
		placeholder: string;
	} & HTMLAttributes<any>;

	type Option = string | number;

	export type MultiselectCtx = {
		selected: Writable<Array<Option>>;
	};

	let {
		onchange = () => {},
		value = $bindable(),
		label,
		description,
		initial = [],
		variant = "bordered",
		size = "m",
		placeholder,
		children,
		...restProps
	}: Props = $props();

	let open = $state(false);
	// let selectedOptions: Array<Option> = $state([]);

	const ctx = {
		selected: writable(initial),
	};

	setContext("MultiselectCtx", ctx);
	let initialized = false;

	onMount(() => {
		document.addEventListener("click", (event: MouseEvent) => {
			if (event.target && !event.target.closest(".Multiselect") && open) {
				open = false;
			}
		});
		return ctx.selected.subscribe((x) => {
			if (!initialized) {
				initialized = true;
				return; // Skip the first run
			}
			value = x;
			onchange(x);
		});
	});
</script>

<div class="Multiselect">
	{#if label}
		<h5>{label}</h5>
	{/if}

	<button
		class={["Trigger", variant, size]}
		{...restProps}
		onclick={() => {
			open = !open;
		}}
	>
		<span style="color: var(--text-color)">{placeholder}</span>

		<Icon
			iconName={open ? "arrowUp" : "arrowDown"}
			size="s"
			style="fill: var(--text-color-muted)"
		/>
	</button>

	<Dropdown bind:open>
		{@render children?.()}
	</Dropdown>

	{#if description}
		<p>{description}</p>
	{/if}
</div>

<!--
@component
## Props
@prop {string} [label] - The label for the select input.
@prop {string} [description] - The description for the select input.
@prop {string} [placeholder] - The placeholder text for the select input.
@prop {string} [variant] - The variant of the select input. Can be "ghost" or "bordered".
@prop {function} [onchange] - The function to call when the select input changes.
@prop {string} [value] - The value of the select input.
-->

<style lang="scss">
	.Multiselect {
		position: relative;
	}

	h5 {
		font-weight: 600;
		margin-left: var(--padding-xs);
	}
	p {
		color: var(--text-color-muted);
		margin-left: var(--padding-xs);
	}
	.Trigger {
		background-color: transparent;
		outline: none;
		width: 100%;
		box-sizing: border-box;
		height: min-content;
		text-align: left;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--text-color);
		border-radius: var(--border-radius-s);
		margin-block: var(--padding-xs);
		&.bordered {
			border: 1px solid var(--border-color);
		}
		&.ghost {
			border: none;
		}

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
	button:focus {
		border-color: var(--primary-color);
	}
</style>
