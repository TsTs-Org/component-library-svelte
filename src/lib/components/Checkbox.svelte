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
			<h4>{label}</h4>
		{/if}
		{#if description}
			<p>{description}</p>
		{/if}
	</div>
	<div class="container">
		<input
			{onchange}
			bind:checked
			type="checkbox"
			id="cbx"
			style="display: none;"
		/>
		<label
			for="cbx"
			class="check"
		>
			<svg
				width="18px"
				height="18px"
				viewBox="0 0 18 18"
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
	}

	.container {
		height: 100%;
		flex: 1;
		margin-block: auto;
	}

	.check {
		cursor: pointer;
		position: relative;
		-webkit-tap-highlight-color: transparent;
		// transform: translate3d(0, 0, 0);
	}

	// .check:before {
	// 	content: "";
	// 	position: absolute;
	// 	top: -15px;
	// 	left: -15px;
	// 	border-radius: 50%;
	// 	background: rgba(34, 50, 84, 0.03);
	// 	opacity: 0;
	// 	transition: opacity 0.2s ease;
	// }

	.check svg {
		position: relative;
		z-index: 1;
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke: var(--text-color);
		stroke-width: 1.5;
		transform: translate3d(0, 0, 0);
		transition: all 0.2s ease;
	}

	.check svg path {
		stroke-dasharray: 60;
		stroke-dashoffset: 0;
		transition: all 0.3s linear;
	}

	.check svg polyline {
		stroke-dasharray: 22;
		stroke-dashoffset: 66;
		transition: all 0.2s linear;
	}

	.check:hover:before {
		opacity: 1;
	}

	.check:hover svg {
		stroke: var(--primary-color);
	}

	#cbx:checked + .check svg {
		stroke: var(--text-color);
	}

	#cbx:checked + .check svg path {
		stroke-dashoffset: 60;
	}

	#cbx:checked + .check svg polyline {
		stroke-dashoffset: 42;
		transition-delay: 0.15s;
	}

	h4 {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-color);
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
</style>
