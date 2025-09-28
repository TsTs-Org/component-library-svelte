<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import Day, { type DisplayState } from "./Day.svelte";
	import type { SimplifiedDate } from "./types.js";
	import WeekDayDisplay from "./WeekDayDisplay.svelte";
	import {
		areDatesEqual,
		fromJsDate,
		getDayOfTheWeek,
		getFirstDayOfMonth,
		sanitizeDate,
	} from "./simplifiedDateUtils.js";

	// TODO: add additional option for year & week overview -> year could serve as something like commit overview

	type DefaultDisplay = {
		onclick: (dateOfClickedDisplay: SimplifiedDate) => void;
		dateDisplaySnippet?: never;
		highlightedDate?: SimplifiedDate;
	};

	type CustomDisplay = {
		highlightedDate?: never;
		onclick?: never;
		dateDisplaySnippet: Snippet<[simplifiedDate: SimplifiedDate]>;
	};

	type Props = {
		useAmericanWeekFormat?: boolean;
		referenceDate?: SimplifiedDate;
		getDisplayState?: (simplifiedDate: SimplifiedDate) => DisplayState;
	} & (DefaultDisplay | CustomDisplay);

	let {
		highlightedDate,
		onclick,
		dateDisplaySnippet,
		useAmericanWeekFormat = false,

		getDisplayState = (_) => {
			return "deselected";
		},
		referenceDate = fromJsDate(new Date()),
	}: Props = $props();

	function getMonthDateOffset(date: SimplifiedDate, useAmericanFormat: boolean): number {
		const firstOfMonth = getFirstDayOfMonth(date);
		let monthOffset = getDayOfTheWeek(firstOfMonth);
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

	onMount(() => {
		const currentMonth = referenceDate.month;
		const currentYear = referenceDate.year;
		const firstDayOfMonth = 1;
		const monthDateOffset = getMonthDateOffset(referenceDate, useAmericanWeekFormat);

		for (let i = 0; i < 6; i++) {
			const day = firstDayOfMonth - monthDateOffset + 7 * i;
			const week = weekDaysFromStartDay(currentYear, currentMonth, day);
			weeks.push(week);
		}
	});

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
						isInTargetTimeframe={date.month === referenceDate.month}
						onclick={() => onclick(date)}
						isFocused={!!highlightedDate && areDatesEqual(date, highlightedDate)}
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
