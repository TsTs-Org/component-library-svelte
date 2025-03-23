<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'bordered';
	type Size = 's' | 'm' | 'l';

	type Props = { variant?: Variant; size?: Size; icon?: Snippet; children: Snippet } & HTMLButtonAttributes;

	let {
		variant = 'primary',
		size = 'm',
		icon,
		children,
		...restProps
	}: Props = $props();
</script>

<button class={[variant, size]} {...restProps}>
	{#if !!icon}
		<div class="icon">{@render icon?.()}</div>
	{/if}
	<div class={[!icon ? "no-icon" : "", "content"]}>
		{@render children?.()}
	</div>
</button>

<style lang="scss">

	button {
		width: 100%;
		min-width: fit-content;
		border: none;
		white-space: nowrap;
		display: grid;
		grid-template-columns: 1fr auto 1fr; // 3rd cell empty but needed to center the content
		align-items: center;

		& .no-icon {
			grid-column-start: 2;
		}

		& .icon {
			width: fit-content;
			display: contents;
		}
		& .content {
			margin-left: auto;
		}

		&.s {
			padding: var(--padding-s);
			border-radius: var(--border-radius-s);
			gap: var(--padding-s);
		}
		&.m {
			padding: var(--padding-m);
			border-radius: var(--border-radius-m);
			gap: var(--padding-m);
		}
		&.l {
			padding: var(--padding-l);
			border-radius: var(--border-radius-m);
			padding: var(--padding-m);
			gap: var(--padding-m);
			font-size: var(--text-size-m);
			font-weight: 600;
		}

		&.primary {
			background-color: var(--primary-color);
		}
		&.bordered {
			background-color: var(--foreground-color);
			border: 1px solid var(--border-color);
			&:hover {
				background-color: var(--neutral-hover-color);
			}
		}

		&:hover {
			background-color: var(--hover-color);
			scale: 99.5%;
			cursor: pointer;
		}

		&:active {
			scale: 98%;
		}
	}
</style>
