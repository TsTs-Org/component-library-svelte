<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import RoundChart from './RoundChart.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Charts/Roundchart',
      component: RoundChart,
      tags: ['autodocs'],
    });
  </script>

  <Story name="Donut Chart">
    {#snippet template(args)}
        <RoundChart
            value="1203"
            title="Visitors"
            displayTooltip
            displayLegend
            col
            customColors={["#eae2b7", "#fcbf49", "#f77f00", "#d62828", "#003049"]}
            labels={["January", "February", "March", "May", "June"]}
            data={[
                {
                    title: "DataOne",
                    data: [2, 8, 2, 11, 7],
                },
            ]}
    ></RoundChart>
    {/snippet}
</Story>

<Story name="Thingy Chart">
    {#snippet template(args)}
    <RoundChart
        chartType="thingy"
        value="1203"
        title="Visitors"
        displayTooltip
        displayLegend
        col
        labels={["January", "February", "March", "May"]}
        data={[
            {
                title: "Data",
                data: [2, 8, 2, 11],
            },
        ]}
    ></RoundChart>
    {/snippet}
</Story>

<Story name="Thingy Chart Dual-Colored">
    {#snippet template(args)}
    <RoundChart
        chartType="thingy"
        value="1203"
        title="Visitors"
        displayTooltip
        col
        dualColored
        data={[
            {
                title: "Data",
                data: [2, 8],
            },
        ]}
    ></RoundChart>
    {/snippet}
</Story>
