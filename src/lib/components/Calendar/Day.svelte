<script lang="ts">
	import type { MonthNumber, SimplifiedDate } from "./types.js";

	type props = {
		date: SimplifiedDate;
		targetedMonth: MonthNumber; // TODO: styling depending on targetState
		previousSelected: boolean;
		nextSelected: boolean;
	};
	let { date, previousSelected, nextSelected }: props = $props();
</script>

<div
	class={[
		"date-wrapper",
		previousSelected ? "date-wrapper--previous-selected" : "",
		nextSelected ? "date-wrapper--next-selected" : "",
	]}
>
	<div class="date"><span class="date__text">{date.day}</span></div>
</div>

<style lang="scss">
	.date-wrapper {
		--selected-color: seagreen;
		--connection-opacity: 80%;
		// --connected-color: var(--selected-color);
		--connected-color: color-mix(
			in srgb,
			var(--selected-color) var(--connection-opacity),
			transparent
		);

		width: 100%;
		position: relative;

		// box-sizing: border-box;
		// border: 1px solid blue;

		background-color: #11aacc88;

		&--previous-selected:before {
			content: "";
			display: block;
			position: absolute;
			width: 50%;
			height: 100%;
			background-color: var(--connected-color);
		}
		&--next-selected:after {
			content: "";
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			width: 50%;
			height: 100%;
			background-color: var(--connected-color);
		}
	}

	.date {
		--date-size: 2rem;

		position: relative;
		background-color: var(--selected-color);
		width: var(--date-size);
		height: var(--date-size);
		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: var(--date-size);

		margin-left: auto;
		margin-right: auto;

		// box-sizing: border-box;
		// border: 1px solid darkgreen;

		z-index: 1;

		&__text {
			// box-sizing: border-box;
			// border: 1px solid blue;
		}
	}
</style>
