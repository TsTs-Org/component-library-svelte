<script lang="ts">
	import type { MonthNumber, SimplifiedDate } from "./types.js";
	import { nextDay, previousDay } from "./weekUtils.js";

	type props = {
		date: SimplifiedDate;
		targetedMonth: MonthNumber; // TODO: styling depending on targetState
		getSelectionStateByDate: (simplifiedDate: SimplifiedDate) => boolean;
		onclick: (dateOfClickedDisplay: SimplifiedDate) => void;
	};
	let { date, targetedMonth, getSelectionStateByDate, onclick }: props = $props();
</script>

<!-- FIXME: if this works, create invisible, position absolute elements with one day before and one day after month display-->
<div
	class={["date-wrapper"]}
	data-selected={getSelectionStateByDate(date)}
>
	<div
		role="button"
		tabindex="0"
		onclick={() => onclick(date)}
		onkeyup={(e) => {
			if (e.key === "Enter") onclick(date);
		}}
		class={[
			"date",
			getSelectionStateByDate(date) ? "date--selected" : "",
			date.month != targetedMonth ? "date--not-in-target-month" : "",
		]}
	>
		<span class="date__text">{date.day}</span>
	</div>
</div>

<style lang="scss">
	/* doesn't work, because last day of last week isn't previous tag in html (container per week) */
	:global(.date-wrapper[data-selected="true"]:has(+ [data-selected="true"])) {
		&::after {
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

	:global([data-selected="true"] + .date-wrapper[data-selected="true"]) {
		&::before {
			content: "";
			display: block;
			position: absolute;
			width: 50%;
			height: 100%;
			background-color: var(--connected-color);
		}
	}
	/**/

	.date-wrapper {
		--selected-color: seagreen;
		--connection-opacity: 80%;
		--connected-color: color-mix(
			in srgb,
			var(--selected-color) var(--connection-opacity),
			transparent
		);

		width: 100%;
		position: relative;
	}

	.date {
		--date-size: 2rem;

		position: relative;
		width: var(--date-size);
		height: var(--date-size);
		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: var(--date-size);

		margin-left: auto;
		margin-right: auto;

		z-index: 1;

		background-color: var(--foreground-color);
		&--selected {
			background-color: var(--selected-color);
		}
		&--not-in-target-month {
			background-color: var(--background-color);
		}
	}
</style>
