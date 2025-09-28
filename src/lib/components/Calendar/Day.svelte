<script lang="ts">
	import type { DateNumber } from "./types.js";

	export type DisplayState =
		| "disconnected"
		| "connected-l"
		| "connected-r"
		| "connected-both"
		| "deselected";

	type Props = {
		day: DateNumber;
		displayState: DisplayState;
		isInTargetTimeframe: boolean;
		onclick: () => void; // the date gets passed in the Calendar Component through something like onclick = () => {onclick(date)}
		isFocused: boolean;
	};
	let { day, displayState, isInTargetTimeframe, isFocused, onclick }: Props = $props();

	function getClassesFromState(state: DisplayState, isInMonth: boolean): String[] {
		let classes: string[] = [];
		switch (state) {
			case "disconnected":
				classes = ["date-wrapper--selected"];
				break;
			case "connected-both":
				classes = [
					"date-wrapper--next-selected",
					"date-wrapper--previous-selected",
					"date-wrapper--selected",
				];
				break;
			case "connected-l":
				classes = ["date-wrapper--previous-selected", "date-wrapper--selected"];
				break;
			case "connected-r":
				classes = ["date-wrapper--next-selected", "date-wrapper--selected"];
				break;
			case "deselected":
				if (!isInMonth) {
					classes = ["date-wrapper--not-in-target-month"];
				}
				break;
		}
		return classes;
	}
</script>

<div class={["date-wrapper", ...getClassesFromState(displayState, isInTargetTimeframe)]}>
	<div
		role="button"
		tabindex="0"
		{onclick}
		onkeyup={(e) => {
			if (e.key === "Enter") onclick();
		}}
		class={["date", isFocused ? "date--focused" : ""]}
	>
		<span class="date__text">{day}</span>
	</div>
</div>

<style lang="scss">
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

		&--selected {
			& > .date {
				background-color: var(--selected-color);
			}
		}

		&--not-in-target-month {
			/* TODO: add more styling to differentiate even selected ones */
			& > .date {
				background-color: var(--background-color);
			}
		}
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

		&--focused {
			outline: 2px solid var(--text-color);
		}
	}
</style>
