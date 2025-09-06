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
	import type { SimplifiedDate } from "./types.js";
	let el: Calendar;
</script>

<Story name="Selectable days">
	{#snippet template(args)}
		<Calendar
			dateInMonth={(function () {
				const today = new Date();
				return {
					year: today.getFullYear(),
					day: today.getDate(),
					month: today.getMonth(),
				} as SimplifiedDate;
			})()}
			bind:this={el}
			onclick={(dateOfClickedDisplay: SimplifiedDate) => {
				el.toggleDateSelection(dateOfClickedDisplay);
			}}
		></Calendar>
	{/snippet}
</Story>
