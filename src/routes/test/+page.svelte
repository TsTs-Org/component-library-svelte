<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import BaseChart from "$lib/components/Chart/BaseChart.svelte";
	import { RoundChart } from "$lib/index.js";
</script>

<div
	style="width: calc(100% - 4rem); margin: 2rem; gap: 1rem; display: grid; grid-template-columns: 300px 300px auto;"
>
	<Card>
		{#snippet title()}
			<h3>System Usage</h3>
		{/snippet}
		<BaseChart
			chartType="line"
			area
			yGrid
			yAxis
			xAxis
			displayTooltip
			labels={["January", "February", "March", "May", "June"]}
			data={[
				{
					title: "DataOne",
					data: [2, 8, 2, 11, 7, 4],
				},
			]}
		></BaseChart>
	</Card>
	<Card>
		{#snippet title()}
			<h3>System User</h3>
		{/snippet}
		<RoundChart
			chartType="thingy"
			value={"15%"}
			title="Avg Memory"
			customColors={["#eae2b7", "#fcbf49", "#f77f00", "#d62828", "#003049"]}
			labels={["January", "February", "March", "May", "June"]}
			data={[
				{
					title: "DataOne",
					data: [2, 8, 2, 11, 7, 4],
				},
			]}
		></RoundChart>
	</Card>

	<Card>
		{#snippet title()}
			<h3>System Usage</h3>
		{/snippet}
		<BaseChart
			chartType="line"
			area
			yGrid
			yAxis
			xAxis
			displayTooltip
			displayLegend
			labels={[
				"January",
				"February",
				"March",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"Novermber",
			]}
			data={[
				{
					title: "DataOne",
					data: [2, 8, 2, 11, 7, 4, 3, 12, 5, 6],
				},
			]}
		></BaseChart>
	</Card>
</div>
