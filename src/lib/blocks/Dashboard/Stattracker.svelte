<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import BaseChart from "$lib/components/Chart/BaseChart.svelte";
</script>

<div class="Stattracker">
	<Card transparent>
		<h5>Testopesto</h5>
		<h2>1,250.00</h2>
		<BaseChart
			chartType="line"
			area
			displayTooltip
			labels={["one", "two", "three", "four", "five", "six"]}
			data={[
				{
					title: "first",
					data: [12, 19, 5, 5, 12, 15],
				},
			]}
		></BaseChart>
	</Card>
</div>

<style lang="scss">
	.Stattracker {
		aspect-ratio: 10/6;
		min-width: 15rem;
	}
</style>
