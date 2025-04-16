<script lang="ts">
	import Chart from "chart.js/auto";
	import { onMount } from "svelte";
	import { externalTooltipHandler, htmlLegendPlugin } from "$lib/components/Chart/plugins.js";
	import { theme } from "$lib/utils/themify.svelte.js";

	const styles = getComputedStyle(document.documentElement);
	let mainColor;

	let canvas: HTMLCanvasElement;
	let legend: HTMLUListElement;

	type ChartType = "line" | "bar";
	type Dataset = {
		title: string;
		borderColor: string;
		backgroundColor: string;
		data: Array<number>;
	};

	type Props = {
		chartType?: ChartType;
		labels: Array<string>;
		data: Array<Dataset>;
		xAxis?: boolean;
		displayLegend?: boolean;
		displayTooltip?: boolean;
		displayTitle?: boolean;
		displayDescription?: boolean;
	};

	let {
		chartType = "line",
		labels,
		data,
		xAxis = false,
		displayLegend = false,
		displayTooltip = false,
		displayTitle = false,
		displayDescription = false,
	}: Props = $props();

	const datasets = [];

	onMount(() => {
		data.forEach((val) => {
			datasets.push({
				label: val.title,
				data: val.data,
				borderWidth: 2,
				borderRadius: 5,
				fill: "start",
			});
		});
		const chart = new Chart(canvas, {
			type: chartType,
			data: {
				labels: labels,
				datasets: datasets,
			},
			options: {
				events: displayTooltip ? undefined : [],

				interaction: {
					intersect: false,
					mode: "index",
				},
				scales: {
					x: {
						display: xAxis,
						ticks: {
							// display: false,
							color: "#999",
						},
						grid: {
							display: false,
							color: "rgba(145,145,145,0.25)",
						},
					},
					y: {
						beginAtZero: true,
						ticks: {
							display: !xAxis,
							// display: false,
							color: "#999",
						},
						grid: {
							// display: false,
							color: "rgba(145,145,145,0.25)",
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
			plugins: displayLegend ? [htmlLegendPlugin] : [],
		});

		theme.subscribe(() => {
			mainColor = styles.getPropertyValue("--primary-500").trim();
			chart.data.datasets.forEach((dataset) => {
				dataset.backgroundColor = `hsl(from ${mainColor} h s l / .25)`;
				dataset.borderColor = `hsl(from ${mainColor} h s l / .75)`;
			});
			chart.update();
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
