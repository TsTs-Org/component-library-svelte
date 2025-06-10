<script>
	import Showcase from "$lib/components/Showcase.svelte";
	import { BaseChart, RoundChart } from "$lib/index.js";

</script>

<Showcase name="Thingy Chart">
    <RoundChart
        chartType="thingy"
        value="1203"
        title="Visitors"
        displayTooltip
        col
        labels={["January", "February", "March", "May"]}
        data={[
            {
                title: "second",
                data: [2, 8, 2, 11],
            },
        ]}
    ></RoundChart>
</Showcase>

<Showcase name="Thingy Chart testcolor">
    <RoundChart
        chartType="thingy"
        value="1203"
        title="Visitors"
        displayTooltip
        col
        dualColored
        data={[
            {
                title: "second",
                data: [2, 8],
            },
        ]}
    ></RoundChart>
</Showcase>

<Showcase name="Donut Chart">
    <RoundChart
        value="1203"
        title="Visitors"
        displayTooltip
        displayLegend
        customColors={["#eae2b7", "#fcbf49", "#f77f00", "#d62828", "#003049"]}
        labels={["January", "February", "March", "May", "June"]}
        data={[
            {
                title: "DataOne",
                data: [2, 8, 2, 11, 7, 4],
            },
        ]}
    ></RoundChart>
</Showcase>

<Showcase name="Step Chart">
    <BaseChart
        chartType="line"
        stepped
        yGrid
        yAxis
        displayTooltip
        displayLegend
        labels={["January", "February", "March", "May", "June"]}
        data={[
            {
                title: "DataOne",
                data: [12, 19, 2, 5, 12, 15],
            },
        ]}
    ></BaseChart>
</Showcase>

<Showcase name="Line Chart">
    <BaseChart
        chartType="line"
        yGrid
        yAxis
        displayTooltip
        displayLegend
        labels={["January", "February", "March", "May", "June"]}
        customColors={["#d62828", "#219ebc"]}
        data={[
            {
                title: "DataOne",
                data: [12, 19, 5, 5, 12, 15],
            },
            {
                title: "DataTwo",
                data: [2, 8, 2, 11, 7, 4],
            },
        ]}
    ></BaseChart>
</Showcase>

<Showcase name="Area Chart">
    <BaseChart
        chartType="line"
        area
        xAxis
        yGrid
        yAxis
        displayTooltip
        displayLegend
        labels={["January", "February", "March", "May", "June"]}
        data={[
            {
                title: "DataOne",
                data: [12, 19, 5, 5, 12, 15],
            },
            {
                title: "DataTwo",
                data: [2, 8, 2, 11, 7, 4],
            },
        ]}
    ></BaseChart>
</Showcase>

<Showcase name="Bar Chart">
    <BaseChart
        chartType="bar"
        xAxis
        displayTooltip
        labels={["January", "February", "March", "May", "June"]}
        data={[
            {
                title: "DataOne",
                data: [12, 19, 5, 5, 2, 3],
            },
            {
                title: "DataTwo",
                data: [2, 8, 2, 11, 7, 4],
            },
        ]}
    ></BaseChart>
</Showcase>
