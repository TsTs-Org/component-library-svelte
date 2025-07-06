<script lang="ts">
	type Props = { useAmericanWeekFormat: boolean };

	let { useAmericanWeekFormat }: Props = $props();

	type ValidWeekIdentifier = 0 | 1 | 2 | 3 | 4 | 5 | 6;

	const days: ValidWeekIdentifier[] = [0, 1, 2, 3, 4, 5, 6];

	function mapNumberToDay(num: ValidWeekIdentifier): string {
		// TODO: add possibility to change language
		// FIXME: this could be done way smarter with date.toLocaleDateString({langauge}, {weekday: long}) to automatically translate it
		let dateMap = {
			"0": "sunday",
			"1": "monday",
			"2": "tuesday",
			"3": "wednesday",
			"4": "thursday",
			"5": "friday",
			"6": "saturday",
		};
		return dateMap[num];
	}

	function abbreviate(dayName: string): string {
		return dayName.slice(0, 2);
	}

	function getDayName(index: ValidWeekIdentifier, useAmericanFormat: boolean): string {
		// TODO: add option to only abbreviate when there isn't enough space in the parent container

		let numberToMap = index;
		if (!useAmericanFormat) {
			numberToMap = ((index + 1) % 7) as ValidWeekIdentifier;
		}
		const longDayName = mapNumberToDay(numberToMap);
		return abbreviate(longDayName);
	}
</script>

{#each days as day}
	<span class="day-name-text">{getDayName(day, useAmericanWeekFormat)}</span>
{/each}

<style lang="scss">
	.day-name-text {
		width: 100%;
		text-align: center;
	}
</style>
