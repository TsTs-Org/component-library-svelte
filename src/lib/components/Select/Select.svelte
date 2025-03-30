<script lang="ts">
	import { onMount, setContext } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import Icon from "../Icon.svelte";
	import { slide } from "svelte/transition";
	import { writable, type Writable } from "svelte/store";

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

	onMount(() => {
		document.addEventListener("click", (event: MouseEvent) => {
			if (event.target && !event.target.closest(".Select") && open) {
				open = false;
			}
		});
		return ctx.selected.subscribe((x) => {
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

		{#if open}
			<Icon
				iconName="arrowUp"
				size="s"
				style="fill: var(--text-color-muted)"
			/>
		{:else}
			<Icon
				iconName="arrowDown"
				size="s"
				style="fill: var(--text-color-muted)"
			/>
		{/if}
	</button>

	{#if open}
		<div
			class="Portal"
			transition:slide={{ duration: 190 }}
		>
			{@render children?.()}
		</div>
	{/if}

	{#if description}
		<p>{description}</p>
	{/if}
</div>

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
		background-color: var(--foreground-color);
		width: 100%;
		min-width: fit-content;
		box-sizing: border-box;
		border-radius: var(--border-radius-s);
		border: 1px solid var(--border-color);
	}
</style>
