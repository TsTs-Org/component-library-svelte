<script lang="ts">
	import Chart from "chart.js/auto";
	import { onMount } from "svelte";
	import { externalTooltipHandler, htmlLegendPlugin } from "$lib/components/Chart/plugins.js";

	let canvas: HTMLCanvasElement;
	let legend: HTMLUListElement;

	type Variant = "line" | "bar";

	type Props = {
		variant?: Variant;
		dispayLegend?: boolean;
		displayTitle?: boolean;
		displayDescription?: boolean;
	};

	let {
		variant = "line",
		dispayLegend = true,
		displayTitle = false,
		displayDescription = false,
	}: Props = $props();

	onMount(() => {
		new Chart(canvas, {
			type: variant,
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [
					{
						label: "first",
						data: [12, 19, 3, 5, 2, 3],
						borderWidth: 2,
						borderRadius: 5,
						borderColor: "rgb(54, 162, 235)",
						backgroundColor: "rgba(54, 162, 235, .4)",
						fill: "start",
					},
					{
						label: "second",
						data: [2, 8, 2, 7, 12, 5],
						borderWidth: 2,
						borderRadius: 5,
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
					htmlLegend: {
						containerRef: legend,
					},
					title: {
						display: displayTitle,
						text: "Custom Chart Title",
						padding: {
							bottom: 10,
						},
					},
					subtitle: {
						display: displayDescription,
						text: "Chart.js Line Chart",
					},
					legend: {
						display: false,
					},
					tooltip: {
						enabled: false,
						position: "nearest",
						external: externalTooltipHandler,
					},
				},
			},
			plugins: [htmlLegendPlugin],
		});
	});
</script>

<div class="test">
	<canvas bind:this={canvas}></canvas>
	<ul
		class="__chartPlugin-legend"
		bind:this={legend}
	></ul>
</div>
