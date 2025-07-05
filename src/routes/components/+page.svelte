<script lang="ts">
	import Calendar from "$lib/components/Calendar/Calendar.svelte";

	type TestType = {

	} & {name: "tom"} | {alter: 25}

	let testString: TestType = {name: "tom"}
	let anotherTestString: TestType = {alter: 25}
</script>

<div class="test-wrapper">
<Calendar></Calendar></div>

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
