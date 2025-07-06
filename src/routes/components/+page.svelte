<script lang="ts">
	import Calendar from "$lib/components/Calendar/Calendar.svelte";
	import type { SimplifiedDate } from "$lib/components/Calendar/types.js";
	import { SvelteSet } from "svelte/reactivity";

	type TestType = ({} & { name: "tom" }) | { alter: 25 };

	let testString: TestType = { name: "tom" };
	let anotherTestString: TestType = { alter: 25 };

	let selectedDates: SvelteSet<SimplifiedDate> = $state(new SvelteSet());
</script>

<div class="test-wrapper">
	<Calendar
		onclick={(dateOfClickedDisplay) => {
			selectedDates.has(dateOfClickedDisplay)
				? selectedDates.delete(dateOfClickedDisplay)
				: selectedDates.add(dateOfClickedDisplay);
			console.log(selectedDates);
		}}
		getSelectionStateByDate={(simplifiedDate) => selectedDates.has(simplifiedDate)}
	></Calendar>
</div>

<!-- Development page -->

<style lang="scss">
	.test-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: solid red;
		box-sizing: border-box;
	}
</style>
