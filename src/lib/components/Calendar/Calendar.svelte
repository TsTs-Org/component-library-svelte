<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import Day, { type DisplayState } from "./Day.svelte";
	import type { MonthNumber, SimplifiedDate } from "./types.js";
	import WeekDayDisplay from "./WeekDayDisplay.svelte";
	import { nextDay, previousDay, sanitizeDate } from "./weekUtils.js";

	// TODO: when clicking the day, it the current year/month should be retrieved from a context created by the calendar and passed to the handle function
	// how does this work for the dates outside of the selected month?

	// TODO: the Calendar should take a snippet that is rendered for each day. it has (day, month, year) as input
	// when no snipped is supplied, the number gets rendered in a standard way (-> this standard way could be exported as a snippet as well)
	// Problem: than there has to be a different way to handle a click -> either handle click or custom snippet insertion

	// TODO: does it make sense to use the european week-format (start week with monday) by default?

	type DefaultDisplay = {
		onclick: (dateOfClickedDisplay: SimplifiedDate) => void;
		dateDisplaySnippet?: never;
	};

	type CustomDisplay = {
		onclick?: never;
		dateDisplaySnippet: Snippet<[simplifiedDate: SimplifiedDate]>;
	};

	type Props = {
		dateInMonth: SimplifiedDate;
		useAmericanWeekFormat?: boolean;
	} & (DefaultDisplay | CustomDisplay);

	let { dateInMonth, onclick, dateDisplaySnippet, useAmericanWeekFormat = false }: Props = $props();

	function getFirstDayOfMonth(date: Date): Date {
		return new Date(date.getFullYear(), date.getMonth(), 1);
	}

	function getMonthDateOffset(date: Date, useAmericanFormat: boolean): number {
		let firstOfMonth = getFirstDayOfMonth(date);
		let monthOffset = firstOfMonth.getDay();
		if (!useAmericanFormat) {
			monthOffset = monthOffset - 1;
		}

		return monthOffset;
	}

	function weekDaysFromStartDay(
		year: number,
		monthLike: number,
		weekStartDayLike: number
	): SimplifiedDate[] {
		let datesOfWeek = [];
		for (let i = 0; i < 7; i++) {
			const date = sanitizeDate(year, monthLike, weekStartDayLike + i);
			datesOfWeek.push(date);
		}
		return datesOfWeek;
	}

	let weeks: Array<Array<SimplifiedDate>> = $state([]);

	let currentDate = $state(new Date());
	let targetedMonth = $state(currentDate.getMonth() as MonthNumber);

	onMount(() => {
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();
		const firstDayOfMonth = getFirstDayOfMonth(currentDate).getDate();
		const monthDateOffset = getMonthDateOffset(currentDate, useAmericanWeekFormat);

		for (let i = 0; i < 6; i++) {
			const day = firstDayOfMonth - monthDateOffset + 7 * i;
			const week = weekDaysFromStartDay(currentYear, currentMonth, day);
			weeks.push(week);
		}
	});

	// FIXME: this structure seems flawed. the lookup is awful, as it has to be done via filter, etc.
	// would another system, eg. {year0: {month0: {day0: true}}, year1: ...} make sense? where only those dates are present which are actually selected (year0.month0.day1) could be unset

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

	function areDatesEqual(firstDate: SimplifiedDate, secondDate: SimplifiedDate): boolean {
		return (
			firstDate.day === secondDate.day &&
			firstDate.month === secondDate.month &&
			firstDate.year === secondDate.year
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

	/* TODO: use this method to conditionally exclude functions, depending on input. there seems to be no way to exclude exported fields from autocompletion.
    However when changing the type in index.ts and only importing it from there, this might be possible

	const F = { onclick: onclick, dateDisplaySnippet: dateDisplaySnippet };
	type a = typeof F extends CustomDisplay ? typeof getDisplayState : never;
	// type a = typeof F extends CustomDisplay ? never : typeof getDisplayState;
	export const getDisplayState = getDisplayState as a;
    */

	// TODO: pass fixed dates to some field like "initialSelectedDates" and set them to the internal state "selectedDates" or sth on mount.
	// add functions to clear all selections and set/add selections
</script>

<div class="calendar-wrapper">
	<div class="week-wrapper">
		<WeekDayDisplay {useAmericanWeekFormat}></WeekDayDisplay>
	</div>
	{#each weeks as week}
		<div class="week-wrapper">
			{#each week as date}
				{#if !!onclick}
					<Day
						displayState={getDisplayState(date)}
						day={date.day}
						isInTargetedMonth={date.month === targetedMonth}
						onclick={() => onclick(date)}
						isFocused={areDatesEqual(date, dateInMonth)}
					></Day>
				{:else}
					<!-- using ! is fine, because {!!onclick, else} implies that CustomSnippet is used -->
					{@render dateDisplaySnippet!(date)}
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.week-wrapper {
		width: 20rem;

		display: grid;
		grid-auto-flow: column;
		grid-template-columns: repeat(7, 1fr);
		align-items: center;
	}

	.calendar-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--padding-xs);
	}
</style>
