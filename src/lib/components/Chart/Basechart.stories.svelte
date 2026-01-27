<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import BaseChart from './BaseChart.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Charts/BaseChart',
      component: BaseChart,
      tags: ['autodocs'],
    });
  </script>

  <Story name="Line Chart">
    {#snippet template(args)}
        <BaseChart
            {...args}
            chartType="line"
            xAxis
            xGrid
            yAxis
            yGrid
            displayTooltip
            displayLegend
            labels={["January", "February", "March", "May", "June"]}
            data={[
            {
                title: "DataOne",
                data: [12, 19, 2, 5, 12, 15],
            },
            {
                title: "DataTwo",
                data: [2, 8, 2, 11, 7, 4],
            },
            ]}
        ></BaseChart>
    {/snippet}
  </Story>

  <Story name="Step Chart">
    {#snippet template(args)}
        <BaseChart
            {...args}
            chartType="line"
            stepped
            xAxis
            xGrid
            yAxis
            yGrid
            displayTooltip
            displayLegend
            labels={["January", "February", "March", "May", "June"]}
            data={[
                {
                    title: "DataOne",
                    data: [12, 19, 2, 5, 12, 15],
                },
                {
                    title: "DataTwo",
                    data: [2, 8, 2, 11, 7, 4],
                },
            ]}
        ></BaseChart>
    {/snippet}
  </Story>


  <Story name="Area Chart">
    {#snippet template(args)}
        <BaseChart
            {...args}
            chartType="line"
            area
            xAxis
            xGrid
            yAxis
            yGrid
            displayTooltip
            displayLegend
            labels={["January", "February", "March", "May", "June"]}
            data={[
            {
                title: "DataOne",
                data: [12, 19, 2, 5, 12, 15],
            },
            {
                title: "DataTwo",
                data: [2, 8, 2, 11, 7, 4],
            },
            ]}
        ></BaseChart>
    {/snippet}
  </Story>

  <Story name="Bar Chart">
    {#snippet template(args)}
        <BaseChart
            {...args}
            chartType="bar"
            xAxis
            xGrid
            yAxis
            yGrid
            displayTooltip
            displayLegend
            labels={["January", "February", "March", "May", "June"]}
            data={[
            {
                title: "DataOne",
                data: [12, 19, 2, 5, 12, 15],
            },
            {
                title: "DataTwo",
                data: [2, 8, 2, 11, 7, 4],
            },
            ]}
        ></BaseChart>
    {/snippet}
</Story>