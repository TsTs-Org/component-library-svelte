<script lang="ts">
	import Day from "./Day.svelte";

    // TODO: when clicking the day, it the current year/month should be retrieved from a context created by the calendar and passed to the handle function
    // how does this work for the dates outside of the selected month?

    type Props = {
        dateInMonth: Date
    };

    let {dateInMonth}: Props = $props();

    function getFirstDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    type ValidWeekIdentifier = 0|1|2|3|4|5|6;
    // function mapNumberToDay(num: ValidWeekIdentifier, useAmericanFormat: boolean = true): string {
    //    let dateMap = {
    //         "0": "sunday",
    //         "1": "monday",
    //         "2": "tuesday",
    //         "3": "wednesday",
    //         "4": "thursday",
    //         "5": "friday",
    //         "6": "saturday"
    //     }
    //     return dateMap[num];
    // }

    $effect(() => {
        dateInMonth.getMonth();

        getFirstDayOfMonth(dateInMonth).getDay()

        dateInMonth.getDay();
    });
</script>
<div class="week-wrapper">
    {#each [1,2,3,4,5,6,7] as day}
        <Day day={day + ""} previousSelected={true} nextSelected={day !== 7}></Day>
    {/each}
</div>

<style lang="scss">
    .week-wrapper {
        width: 20rem;

        display: grid;
        grid-auto-flow: column;
        border: 1px solid red;
        box-sizing: border-box;
        align-items: center;
    }
</style>