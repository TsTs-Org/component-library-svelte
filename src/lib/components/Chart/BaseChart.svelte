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
		data: Array<number>;
	};

	type Props = {
		chartType?: ChartType;
		labels: Array<string>;
		customColors?: Array<string>;
		data: Array<Dataset>;
		area?: boolean;
		stepped?: boolean;
		xAxis?: boolean;
		yAxis?: boolean;
		xGrid?: boolean;
		yGrid?: boolean;
		displayLegend?: boolean;
		displayTooltip?: boolean;
		displayTitle?: boolean;
		displayDescription?: boolean;
	};

	let {
		chartType = "line",
		labels,
		customColors,
		data,
		stepped = false,
		area = false,
		xAxis = false,
		yAxis = false,
		xGrid = false,
		yGrid = false,
		displayLegend = false,
		displayTooltip = false,
		displayTitle = false,
		displayDescription = false,
	}: Props = $props();

	const datasets: {
		label: string;
		data: number[];
		borderWidth: number;
		borderRadius: number;
		borderSkipped: boolean;
		stepped: string | boolean;
		fill: string | boolean;
		borderColor: string;
		backgroundColor: string;
	}[] = [];

	onMount(() => {
		data.forEach((val, i) => {
			datasets.push({
				label: val.title,
				data: val.data,
				borderWidth: 2,
				borderRadius: 3,
				borderSkipped: false,
				stepped: stepped ? "middle" : false,
				fill: area ? "start" : false,
				borderColor: customColors ? `rgba(from ${customColors[i]} r g b / .75)` : "grey",
				backgroundColor: customColors ? `rgba(from ${customColors[i]} r g b / .25)` : "grey",
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
						border: {
							display: false,
						},
						ticks: {
							display: xAxis,
							color: "#999",
						},
						grid: {
							display: xGrid,
							color: "rgba(145,145,145,0.25)",
						},
					},
					y: {
						beginAtZero: true,
						border: {
							display: false,
						},
						ticks: {
							display: yAxis,
							// display: false,
							color: "#999",
						},
						grid: {
							display: yGrid,
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

		if (!customColors) {
			theme.subscribe(() => {
				chart.data.datasets.forEach((dataset, i) => {
					mainColor = styles.getPropertyValue(`--primary-${i + 4}00`).trim();
					dataset.backgroundColor = `hsl(from ${mainColor} h s l / ${chartType == "bar" ? 0.75 : 0.25})`;
					dataset.borderColor = `hsl(from ${mainColor} h s l / ${chartType == "bar" ? 1 : 0.75})`;
				});
				chart.update();
			});
		}
	});
</script>

<div class="BaseChart">
	<canvas bind:this={canvas}></canvas>
	<ul
		class="__chartPlugin-legend"
		bind:this={legend}
	></ul>
</div>
