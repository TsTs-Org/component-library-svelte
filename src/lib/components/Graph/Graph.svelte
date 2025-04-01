<script lang="ts">
	import Card from "../Card.svelte";
	import CoordinatePlane from "./CoordinatePlane.svelte";
	import PointOnGraph from "./PointOnGraph.svelte";
	import { getDistanceBetweenValues } from "./util/geometryHelpers.js";
	import type { DataPoint, PointRange } from "./util/types.ts";

	export let dataPoints: DataPoint[];
	export let sequential = true;

	// TODO: add option to automatically calculate
	export let displayRange: PointRange | "auto";

	let normalizedDataPoints: DataPoint[];

	function getExtremeValues(pointArray: DataPoint[]): PointRange {
		let minX: number | null = null;
		let minY: number | null = null;
		let maxX: number | null = null;
		let maxY: number | null = null;
		pointArray.forEach((point) => {
			minX = minX == null ? point.x : Math.min(minX, point.x);
			maxX = maxX == null ? point.x : Math.max(maxX, point.x);
			minY = minY == null ? point.y : Math.min(minY, point.y);
			maxY = maxY == null ? point.y : Math.max(maxY, point.y);
		});

		let construcedPointRange = {
			from: {
				x: minX ?? -2,
				y: minY ?? -2,
			},
			to: {
				x: maxX ?? 0,
				y: maxY ?? 0,
			},
		};

		return construcedPointRange;
	}

	let rangeToNormalizeOn: PointRange;
	$: {
		if (sequential) {
			dataPoints.sort((a, b) => {
				return a.x - b.x;
			});
		}
		if (!!dataPoints && !!displayRange) {
			if (displayRange == "auto") {
				rangeToNormalizeOn = getExtremeValues(dataPoints);
			} else {
				rangeToNormalizeOn = displayRange;
			}
			normalizedDataPoints = normalizePoints(dataPoints, rangeToNormalizeOn);
		}
	}

	// Question: is this the correct name for the function?
	function normalizePoints(dataPointList: DataPoint[], range: PointRange): DataPoint[] {
		// TODO: remove points that are out of bounds
		const length = getDistanceBetweenValues(range.from.x, range.to.x);
		const height = getDistanceBetweenValues(range.from.y, range.to.y);
		return dataPointList.map((dataPoint) => {
			const nonNegativeXPosition = dataPoint.x - range.from.x;
			// TODO: possibly add percentageFrom function
			dataPoint.x = (nonNegativeXPosition / length) * 100;

			const nonNegativeYPosition = dataPoint.y - range.from.y;
			dataPoint.y = (nonNegativeYPosition / height) * 100;

			return dataPoint;
		});
	}
</script>

<!-- <div class="container"> -->
<div class="graph-container">
	<CoordinatePlane displayRange={rangeToNormalizeOn}></CoordinatePlane>
	{#each normalizedDataPoints as dataPoint, index}
		<PointOnGraph
			self={dataPoint}
			next={normalizedDataPoints[index + 1] ?? null}
		></PointOnGraph>
	{/each}
</div>

<style lang="scss">
	.graph-container {
		--graph-color: white;
		--graph-stroke-width: 2px;
		width: 100%;
		height: 100%;
		background-color: #00000044;
		position: relative;
	}
</style>
