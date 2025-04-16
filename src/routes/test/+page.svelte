<script lang="ts">
	import Chart from "chart.js/auto";
	import { onMount } from "svelte";
	import { externalTooltipHandler, htmlLegendPlugin } from "$lib/components/Chart/plugins.js";
	import BaseChart from "$lib/components/Chart/BaseChart.svelte";
</script>

<div class="page">
	<BaseChart></BaseChart>
	<BaseChart variant="bar"></BaseChart>
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
