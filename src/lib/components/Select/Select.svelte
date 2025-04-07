<script lang="ts">
	import { onMount, setContext } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import Icon from "../Icon.svelte";
	import { slide } from "svelte/transition";
	import { writable, type Writable } from "svelte/store";
	import Dropdown from "../Dropdown/Dropdown.svelte";
	import { closeOverlay } from "../Themify.svelte";

	type Variant = "ghost" | "bordered";

	type Props = {
		onchange?: (value: string) => void;
		value?: string;
		label?: string;
		description?: string;
		variant?: Variant;
		placeholder: string;
	} & HTMLAttributes<any>;

	type Option = {
		value: string;
		label: string;
	};

	export type SelectCtx = {
		selected: Writable<Option>;
	};

	let {
		onchange = () => {},
		value = $bindable(),
		label,
		description,
		variant = "bordered",
		placeholder,
		children,
		...restProps
	}: Props = $props();

	let open = $state(false);
	let selectedOption: Option | null = $state(null);

	const ctx = {
		selected: writable({ value, label }),
	};

	setContext("SelectCtx", ctx);
	let initialized = false;

	onMount(() => {
		document.addEventListener("click", (event: MouseEvent) => {
			if (event.target && !event.target.closest(".Select") && open) {
				open = false;
			}
		});
		return ctx.selected.subscribe((x) => {
			if (!initialized) {
				initialized = true;
				return; // Skip the first run
			}
			open = false;
			value = (x as Option).value;
			onchange((x as Option).value);
			selectedOption = x as Option;
		});
	});
</script>

<div class="Select">
	{#if label}
		<label>{label}</label>
	{/if}

	<button
		class={["Trigger", variant]}
		{...restProps}
		onclick={() => (open = !open)}
	>
		{#if selectedOption?.label}
			{selectedOption.label}
		{:else}
			<span style="color: var(--text-color-muted)">{placeholder}</span>
		{/if}

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
	.Select {
		position: relative;
	}

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
		padding: var(--padding-m);
		margin-block: var(--padding-xs);
		&.bordered {
			border: 1px solid var(--border-color);
		}
		&.ghost {
			border: none;
		}
	}
	button:focus {
		border-color: var(--primary-color);
	}
	.Portal {
		z-index: 500;
		position: absolute;
		overflow: hidden;
		background-color: var(--foreground-color);
		width: 100%;
		min-width: fit-content;
		box-sizing: border-box;
		border-radius: var(--border-radius-s);
		border: 1px solid var(--border-color);
	}
</style>
