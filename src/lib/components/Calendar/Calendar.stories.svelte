<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Calendar from "./Calendar.svelte";

	const { Story } = defineMeta({
		title: "2. Components/Calendar",
		component: Calendar,
		tags: ["autodocs"],
	});
</script>

<script lang="ts">
	import Button from "../Button.svelte";
	import type { SimplifiedDate } from "./types.js";
	import Icon from "../Icon.svelte";
	import {
		fromJsDate,
		getFirstDayOfNextMonth,
		getFirstDayOfPreviousMonth,
	} from "./simplifiedDateUtils.js";
	let el: Calendar;

	let referenceDate = $state(fromJsDate(new Date()));
</script>

<Story name="Default">
	{#snippet template(args)}
		<Calendar
			highlightedDate={(function () {
				const today = new Date();
				return {
					year: today.getFullYear(),
					day: today.getDate(),
					month: today.getMonth(),
				} as SimplifiedDate;
			})()}
			bind:this={el}
			onclick={(dateOfClickedDisplay: SimplifiedDate) => {
				console.log($state.snapshot(dateOfClickedDisplay));
			}}
		></Calendar>
	{/snippet}
</Story>

<Story name="With Month Switch">
	{#snippet template()}
		<div style="display: flex;">
			<Button
				onclick={() => (referenceDate = getFirstDayOfPreviousMonth(referenceDate))}
				size="s"
			>
				{#snippet icon()}
					<Icon iconName="chevron_left"></Icon>
				{/snippet}
			</Button>
			<Button
				onclick={() => (referenceDate = getFirstDayOfNextMonth(referenceDate))}
				size="s"
			>
				{#snippet icon()}
					<Icon iconName="chevron_right"></Icon>
				{/snippet}
			</Button>
		</div>
		<Calendar
			{referenceDate}
			highlightedDate={(function () {
				const today = new Date();
				return {
					year: today.getFullYear(),
					day: today.getDate(),
					month: today.getMonth(),
				} as SimplifiedDate;
			})()}
			bind:this={el}
			onclick={(dateOfClickedDisplay: SimplifiedDate) => {
				console.log($state.snapshot(dateOfClickedDisplay));
			}}
		></Calendar>
	{/snippet}
</Story>
