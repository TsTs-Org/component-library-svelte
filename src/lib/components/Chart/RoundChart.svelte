<script lang="ts">
	import Chart from "chart.js/auto";
	import { onMount } from "svelte";
	import { externalTooltipHandler, htmlLegendPlugin } from "$lib/components/Chart/plugins.js";
	import { theme } from "$lib/utils/themify.svelte.js";

	let styles = undefined;
	onMount(() => {
		styles = getComputedStyle(document.documentElement);
	});
	// const styles = getComputedStyle(document.documentElement);
	let mainColor;

	let canvas: HTMLCanvasElement;
	let legend: HTMLUListElement;

	type ChartType = "donut" | "thingy";
	type Dataset = {
		title: string;
		data: Array<number>;
	};

	type Props = {
		chartType?: ChartType;
		labels?: Array<string>;
		customColors?: Array<string>;
		data: Array<Dataset>;
		value: string;
		title?: string;
		col?: boolean;
		displayLegend?: boolean;
		displayTooltip?: boolean;
		displayTitle?: boolean;
		displayDescription?: boolean;
	};

	let {
		chartType = "donut",
		labels,
		customColors,
		data,
		value,
		title = "",
		col = false,
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
		offset: number;
		cutout: string;
		circumference: number;
		rotation: number;
		backgroundColor?: Array<string>;
	}[] = [];

	onMount(() => {
		data.forEach((val) => {
			datasets.push({
				label: val.title,
				data: val.data,
				borderWidth: 0,
				borderRadius: 0,
				borderSkipped: false,
				offset: 0,
				cutout: "65%",
				circumference: chartType == "donut" ? 360 : 210,
				rotation: chartType == "donut" ? 0 : 255,
				backgroundColor: customColors,
			});
		});
		const chart = new Chart(canvas, {
			type: "doughnut",
			data: {
				labels: labels,
				datasets: datasets,
			},
			options: {
				responsive: false,
				events: displayTooltip ? undefined : [],
				scales: {
					x: {
						display: false,
					},
					y: {
						display: false,
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
				chart.data.datasets.forEach((dataset) => {
					const new_bgs: Array<string> = [];
					dataset.data.forEach((element: number, i: number) => {
						mainColor = styles.getPropertyValue(`--primary-${i + 2}00`).trim();
						new_bgs.push(`hsl(from ${mainColor} h s l / .75)`);
					});
					dataset.backgroundColor = new_bgs;
					return dataset;
				});
				chart.update();
			});
		}
	});
</script>

<div
	class="RoundChart"
	class:col
>
	<div class="Chart">
		<canvas
			bind:this={canvas}
			style="width: 180px"
		></canvas>
		<ul
			class="main"
			class:donut={chartType == "donut"}
		>
			<h3>{value}</h3>
			<h5>{title}</h5>
		</ul>
	</div>
	<ul
		class="__chartPlugin-legend"
		bind:this={legend}
	></ul>
</div>

<style lang="scss">
	.RoundChart {
		display: flex;
		flex-direction: row;
		gap: var(--padding-s);
		width: min-content;
		&.col {
			flex-direction: column;
		}
		.Chart {
			position: relative;
		}
		.main {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, 10%);
			h5 {
				color: var(--text-color-muted);
			}
			&.donut {
				transform: translate(-50%, -45%);
			}
		}
	}
</style>
