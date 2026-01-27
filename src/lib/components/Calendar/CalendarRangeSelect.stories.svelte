<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import CalendarRangeSelect from "./CalendarRangeSelect.svelte";

	const { Story } = defineMeta({
		title: "2. Components/Calendar/CalendarRangeSelect",
		component: CalendarRangeSelect,
		tags: ["autodocs"],
	});
</script>

<Story name="Default"></Story>

<Story name="Custom dateDisplaySnippet">
	{#snippet template()}
		<CalendarRangeSelect>
			{#snippet displaySelectableDateSnippet(
				simplifiedDate,
				_isDateSelected,
				getDisplayState,
				selectDate
			)}
				<button
					class={["date-display--" + getDisplayState(simplifiedDate)]}
					onclick={() => selectDate(simplifiedDate)}>{simplifiedDate.day}</button
				>
				<style lang="scss">
					.date-display {
						&--disconnected {
							background-color: red;
						}
						&--connected-l,
						&--connected-r {
							background-color: orange;
						}
						&--connected-both {
							background-color: yellow;
						}
						&--deselected {
							background-color: gray;
						}
					}
				</style>
			{/snippet}
		</CalendarRangeSelect>
	{/snippet}
</Story>
