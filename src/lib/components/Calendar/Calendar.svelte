<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import Day from "./Day.svelte";
	import type { MonthNumber, SimplifiedDate } from "./types.js";
	import WeekDayDisplay from "./WeekDayDisplay.svelte";

	// TODO: when clicking the day, it the current year/month should be retrieved from a context created by the calendar and passed to the handle function
	// how does this work for the dates outside of the selected month?

	// TODO: the Calendar should take a snippet that is rendered for each day. it has (day, month, year) as input
	// when no snipped is supplied, the number gets rendered in a standard way (-> this standard way could be exported as a snippet as well)
	// Problem: than there has to be a different way to handle a click -> either handle click or custom snippet insertion

	// TODO: does it make sense to use the european week-format (start week with monday) by default?

	type Props = {
		dateInMonth: Date;
		useAmericanWeekFormat?: boolean;
	} & (
		| {
				onclick: (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
				dateDisplaySnippet: never;
		  }
		| { onclick: never; dateDisplaySnippet: Snippet<[simplifiedDate: SimplifiedDate]> }
	);

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

	function sanitizeDate(year: number, monthLike: number, dayLike: number): SimplifiedDate {
		const sanitizer = new Date(year, monthLike, dayLike);
		const simplifiedDate = {
			year: sanitizer.getFullYear(),
			month: sanitizer.getMonth(),
			day: sanitizer.getDate(),
		} as SimplifiedDate;

		return simplifiedDate;
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
		console.log(weeks);
	});
</script>

<div class="calendar-wrapper">
	<div class="week-wrapper">
		<WeekDayDisplay {useAmericanWeekFormat}></WeekDayDisplay>
	</div>
	{#each weeks as week}
		<div class="week-wrapper">
			{#each week as date}
				<Day
					{date}
					{targetedMonth}
					previousSelected={true}
					nextSelected={date.day !== 7}
				></Day>
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
		border: 1px solid red;
		box-sizing: border-box;
		align-items: center;
	}

	.calendar-wrapper {
		display: flex;
		flex-direction: column;
	}
</style>
