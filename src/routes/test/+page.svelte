<script lang="ts">
	import Chart from "chart.js/auto";
	import { onMount } from "svelte";

	import { externalTooltipHandler, htmlLegendPlugin } from "$lib/components/Chart/plugins.js";

	let canvas: HTMLCanvasElement;
	let canvas2: HTMLCanvasElement;

	onMount(() => {
		new Chart(canvas, {
			type: "line",
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [
					{
						label: "first",
						data: [12, 19, 3, 5, 2, 3],
						borderWidth: 2,
						borderColor: "rgb(54, 162, 235)",
						backgroundColor: "rgba(54, 162, 235, .4)",
						fill: "start",
					},
					{
						label: "second",
						data: [2, 8, 2, 7, 12, 5],
						borderWidth: 2,
						borderColor: "rgb(54, 162, 235)",
						backgroundColor: "rgba(54, 162, 235, .4)",
						fill: "start",
					},
				],
			},
			options: {
				// events: ["click"],

				interaction: {
					intersect: false,
					mode: "index",
				},
				scales: {
					x: {
						display: false,
						ticks: {
							// display: false,
						},
						grid: {
							// display: false,
						},
					},
					y: {
						beginAtZero: true,
						// display: false,
						ticks: {
							// display: false,
						},
						grid: {
							// display: false,
							color: "rgba(125, 125, 125, 0.15)",
						},
					},
				},
				elements: {
					line: {
						tension: 0.4,
					},
					point: {
						radius: 0,
						// radius: 2,
						hitRadius: 5,
						hoverRadius: 4,
					},
				},
				plugins: {
					title: {
						display: true,
						text: "Custom Chart Title",
						padding: {
							bottom: 10,
						},
					},
					subtitle: {
						display: true,
						text: "Chart.js Line Chart",
					},
					legend: {
						display: true,
						labels: {
							color: "rgb(255, 99, 132)",
						},
					},
					tooltip: {
						enabled: false,
						position: "nearest",
						external: externalTooltipHandler,
					},
				},
			},
		});
		new Chart(canvas2, {
			type: "bar",
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [
					{
						label: "first",
						data: [12, 19, 3, 5, 2, 3],
						borderWidth: 1,
						backgroundColor: "rgba(255, 99, 132)",
					},
					{
						label: "second",
						data: [2, 8, 2, 7, 12, 5],
						borderWidth: 1,
						backgroundColor: "rgba(54, 162, 235)",
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
				plugins: {
					htmlLegend: {
						containerID: "legend-container",
					},
					legend: {
						display: false,
					},
				},
			},
			plugins: [htmlLegendPlugin],
		});
	});
</script>

<div class="page">
	<div class="test">
		<canvas bind:this={canvas}></canvas>
	</div>
	<div class="test">
		<canvas bind:this={canvas2}></canvas>
		<div id="legend-container"></div>
	</div>
</div>

<style lang="scss">
	.page {
		box-sizing: border-box;
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		gap: var(--padding-l);
		padding: var(--padding-l);
	}
</style>
