<script lang="ts">
	import type { Snippet } from "svelte";
	import Calendar from "./Calendar.svelte";
	import type { DisplayState } from "./Day.svelte";
	import { areDatesEqual, nextDay, previousDay } from "./simplifiedDateUtils.js";
	import type { SimplifiedDate } from "./types.js";

	// FIXME: this structure seems flawed. the lookup is awful, as it has to be done via filter, etc.
	// would another system, eg. {year0: {month0: {day0: true}}, year1: ...} make sense? where only those dates are present which are actually selected (year0.month0.day1) could be unset

	// TODO: set initial selection state via prop

	type Props = {
		displaySelectableDateSnippet?: Snippet<
			[
				simplifiedDate: SimplifiedDate,
				isDateSelected: boolean,
				getDisplayState: (simplifiedDate: SimplifiedDate) => DisplayState,
				selectDate: (simplifiedDateToSelect: SimplifiedDate) => void,
				deselectDate: (simplifiedDateToDeselect: SimplifiedDate) => void,
			]
		>;
		highlightedDate?: SimplifiedDate;
		useAmericanWeekFormat?: boolean;
		referenceDate?: SimplifiedDate;
	};

	let {
		displaySelectableDateSnippet,
		highlightedDate,
		useAmericanWeekFormat,
		referenceDate,
	}: Props = $props();

	let selectedDates = $state<SimplifiedDate[]>([]); // is it possible to create a list of states? for each month? does this even make sense?
	// a set can't be used here, as objects are compared via reference not value

	export function toggleDateSelection(date: SimplifiedDate): void {
		if (isDateSelected(date)) {
			deselectDate(date);
		} else {
			selectDate(date);
		}
	}

	function selectDate(date: SimplifiedDate): void {
		if (!isDateSelected(date)) {
			selectedDates.push(date);
			selectedDates = selectedDates;
		}
	}

	function deselectDate(date: SimplifiedDate): void {
		selectedDates = selectedDates.filter((currentDate) => {
			return !areDatesEqual(date, currentDate);
		});
	}

	function isDateSelected(date: SimplifiedDate): boolean {
		return (
			selectedDates.find((currentDate) => {
				return areDatesEqual(date, currentDate);
			}) !== undefined
		);
	}

	function getDisplayState(date: SimplifiedDate): DisplayState {
		if (!isDateSelected(date)) return "deselected";

		const previousDate = previousDay(date);
		const nextDate = nextDay(date);

		const previousDateSelected = isDateSelected(previousDate);
		const nextDateSelected = isDateSelected(nextDate);

		if (previousDateSelected && nextDateSelected) {
			return "connected-both";
		} else if (previousDateSelected) {
			return "connected-l";
		} else if (nextDateSelected) {
			return "connected-r";
		} else return "disconnected";
	}
</script>

{#snippet dateDisplaySnippet(date: SimplifiedDate)}
	{#if displaySelectableDateSnippet !== undefined}
		{@render displaySelectableDateSnippet(
			date,
			isDateSelected(date),
			getDisplayState,
			selectDate,
			deselectDate
		)}
	{/if}
{/snippet}

<!-- this can't be done inline because then typescript complains. Additionally, this is more readable -->
{#if displaySelectableDateSnippet !== undefined}
	<Calendar
		{dateDisplaySnippet}
		{getDisplayState}
		{referenceDate}
		{useAmericanWeekFormat}
	></Calendar>
{:else}
	<Calendar
		onclick={toggleDateSelection}
		{getDisplayState}
		{highlightedDate}
		{referenceDate}
		{useAmericanWeekFormat}
	></Calendar>
{/if}
