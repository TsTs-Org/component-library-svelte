<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLInputAttributes } from "svelte/elements";

	type Props = {
		onchange?: (value: string) => void;
		checked?: string;
		label?: string;
		description?: string;
	} & HTMLInputAttributes;

	let {
		onchange = () => {},
		checked = $bindable(),
		label,
		description,
		...restProps
	}: Props = $props();
</script>

<div class="Checkbox">
	<div class="text">
		{#if label}
			<h5>{label}</h5>
		{/if}
		{#if description}
			<p class="description">{description}</p>
		{/if}
	</div>
	<div class="container">
		<label
			class="check"
			class:checked
		>
			<input
				{onchange}
				bind:checked
				type="checkbox"
				style="display: none;"
			/>
			<svg
				width="18px"
				height="18px"
				viewBox="0 0 18 18"
				style="display: block;"
			>
				<path
					d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
				></path>
				<polyline points="1 9 7 14 15 4"></polyline>
			</svg>
		</label>
	</div>
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
	.Checkbox {
		display: flex;
		gap: var(--padding-s);
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.container {
		height: 100%;
		margin-block: auto;
	}

	.check {
		cursor: pointer;
		position: relative;
		-webkit-tap-highlight-color: transparent;
	}

	.check svg {
		position: relative;
		z-index: 1;
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke: var(--text-color);
		stroke-width: 1.5;
		transform: translate3d(0, 0, 0);
		transition: all 0.1s ease;
	}

	.check svg path {
		stroke-dasharray: 60;
		stroke-dashoffset: 0;
		transition: all 0.2s linear;
	}

	.check svg polyline {
		stroke-dasharray: 22;
		stroke-dashoffset: 66;
		transition: all 0.1s linear;
	}

	.check:hover:before {
		opacity: 1;
	}

	.check:hover svg {
		stroke: var(--primary-color);
	}

	.check.checked svg {
		stroke: var(--text-color);
	}

	.check.checked svg path {
		stroke-dashoffset: 60;
	}

	.check.checked svg polyline {
		stroke-dashoffset: 42;
		transition-delay: 0.15s;
	}

	h5 {
		// font-weight: 600;
	}
	.description {
		color: var(--text-color-muted);
		font-size: var(--text-size-xs);
	}
</style>
