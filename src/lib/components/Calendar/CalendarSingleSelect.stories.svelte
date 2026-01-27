<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import CalendarSingleSelect from "./CalendarSingleSelect.svelte";

	const { Story } = defineMeta({
		title: "2. Components/Calendar/CalendarSingleSelect",
		component: CalendarSingleSelect,
		tags: ["autodocs"],
	});
</script>

<Story name="Default"></Story>

<Story name="Custom dateDisplaySnippet">
	{#snippet template()}
		<CalendarSingleSelect>
			{#snippet displaySelectableDateSnippet(
				simplifiedDate,
				isDateSelected,
				getDisplayState,
				selectDate,
				deselectDate
			)}
				<button
					class={["date-display--" + getDisplayState(simplifiedDate)]}
					onclick={() => {
						isDateSelected ? deselectDate(simplifiedDate) : selectDate(simplifiedDate);
					}}>{simplifiedDate.day}</button
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
		</CalendarSingleSelect>
	{/snippet}
</Story>
