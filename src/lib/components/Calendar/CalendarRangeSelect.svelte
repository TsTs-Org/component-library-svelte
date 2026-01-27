<script lang="ts">
	import { Calendar } from "$lib/index.js";
	import type { DisplayState } from "./Day.svelte";
	import { areDatesEqual, isBeforeDate, isInBetween } from "./simplifiedDateUtils.js";
	import type { SimplifiedDate } from "./types.js";
	import type { Snippet } from "svelte";

	// TODO: set initial selection state via prop

	type Props = {
		displaySelectableDateSnippet?: Snippet<
			[
				simplifiedDate: SimplifiedDate,
				isDateSelected: boolean,
				getDisplayState: (simplifiedDate: SimplifiedDate) => DisplayState,
				selectDate: (simplifiedDateToSelect: SimplifiedDate) => void,
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

	let leftDate: SimplifiedDate | null = $state(null);
	let rightDate: SimplifiedDate | null = $state(null);

	function getDisplayState(simplifiedDate: SimplifiedDate): DisplayState {
		if (leftDate == null) return "deselected";
		if (rightDate == null) {
			return areDatesEqual(simplifiedDate, leftDate) ? "disconnected" : "deselected";
		}

		if (areDatesEqual(simplifiedDate, leftDate)) return "connected-r";
		if (areDatesEqual(simplifiedDate, rightDate)) return "connected-l";
		if (isInBetween(simplifiedDate, leftDate, rightDate)) return "connected-both";

		return "deselected";
	}

	function selectDate(dateToSelect: SimplifiedDate) {
		// TODO: can a case happen where left is null but right is nonnull?
		if (leftDate == null || !!rightDate) {
			rightDate = null;
			leftDate = dateToSelect;
		} else {
			if (areDatesEqual(dateToSelect, leftDate)) return;

			rightDate = dateToSelect;
			if (isBeforeDate(rightDate, leftDate)) {
				[leftDate, rightDate] = [rightDate, leftDate];
			}
		}
	}
</script>

{#snippet dateDisplaySnippet(simplifiedDate: SimplifiedDate)}
	{#if !!displaySelectableDateSnippet}
		{@render displaySelectableDateSnippet(
			simplifiedDate,
			(!!leftDate && areDatesEqual(simplifiedDate, leftDate)) ||
				(!!rightDate && areDatesEqual(simplifiedDate, rightDate)),
			getDisplayState,
			selectDate
		)}
	{/if}
{/snippet}

{#if displaySelectableDateSnippet !== undefined}
	<Calendar
		{dateDisplaySnippet}
		{getDisplayState}
		{referenceDate}
		{useAmericanWeekFormat}
	></Calendar>
{:else}
	<Calendar
		onclick={selectDate}
		{getDisplayState}
		{highlightedDate}
		{referenceDate}
		{useAmericanWeekFormat}
	></Calendar>
{/if}
