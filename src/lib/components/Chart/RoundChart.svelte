<script lang="ts">
	import Chart from "chart.js/auto";
	import { onDestroy, onMount } from "svelte";
	import { externalTooltipHandler, htmlLegendPlugin } from "$lib/components/Chart/plugins.js";
	import { theme } from "../Themify.svelte";

	let styles: CSSStyleDeclaration | undefined = undefined;
	onMount(() => {
		styles = getComputedStyle(document.documentElement);
	});
	// const styles = getComputedStyle(document.documentElement);
	let mainColor;

	let canvas: HTMLCanvasElement;
	let chart: Chart;

	let legend: HTMLUListElement;

	type ChartType = "donut" | "thingy";
	type Dataset = {
		title: string;
		data: Array<number>;
	};

	type Props = {
		chartType?: ChartType;
		dynamic?: boolean;
		labels?: Array<string>;
		customColors?: Array<string>;
		data: Array<Dataset>;
		value: string;
		title?: string;
		col?: boolean;
		dualColored?: boolean;
		displayLegend?: boolean;
		displayTooltip?: boolean;
		displayTitle?: boolean;
		displayDescription?: boolean;
	};

	let {
		chartType = "donut",
		dynamic,
		labels,
		customColors,
		data,
		value,
		title = "",
		col = false,
		dualColored = false,
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

	let observer: ResizeObserver;

	function handleResize(entry: ResizeObserverEntry) {
		chart?.resize(entry.contentRect.width, entry.contentRect.height);
	}

	onMount(() => {
		if (dynamic) {
			console.warn("Dynamic charts are an experimental feature and might cause issues.");
		}
		const parent = canvas.parentElement?.parentElement;
		if (parent) {
			canvas.width = parent.getBoundingClientRect().width;
			canvas.height = parent.getBoundingClientRect().height;
			if (dynamic) {
				observer = new ResizeObserver((e) => {
					for (const entry of e) {
						handleResize(entry);
					}
				});
				observer.observe(parent);
			}
		}
	});

	onDestroy(() => {
		observer?.disconnect();
	});

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
		chart = new Chart(canvas, {
			type: "doughnut",
			data: {
				labels: labels,
				datasets: datasets,
			},
			options: {
				responsive: false,
				maintainAspectRatio: false,
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
					dataset.data.forEach((_: number, i: number) => {
						if (dualColored) {
							mainColor = styles?.getPropertyValue(`--primary-${5}00`).trim();
							let secondColor = styles?.getPropertyValue(`--hover-color`).trim();
							new_bgs.push(`hsl(from ${mainColor} h s l / .85)`);
							new_bgs.push(`hsl(from ${secondColor} h s l / 1)`);
						} else {
							mainColor = styles?.getPropertyValue(`--primary-${i + 2}00`).trim();
							new_bgs.push(`hsl(from ${mainColor} h s l / .75)`);
						}
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
		<canvas bind:this={canvas}></canvas>
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
