<script lang="ts">
	import type { Snippet } from "svelte";
	import Day from "./Day.svelte";

    // TODO: when clicking the day, it the current year/month should be retrieved from a context created by the calendar and passed to the handle function
    // how does this work for the dates outside of the selected month?

    // TODO: the Calendar should take a snippet that is rendered for each day. it has (day, month, year) as input
    // when no snipped is supplied, the number gets rendered in a standard way (-> this standard way could be exported as a snippet as well)
    // Problem: than there has to be a different way to handle a click -> either handle click or custom snippet insertion

    type Props = {
        dateInMonth: Date
    } & 
        ({onclick: (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void, dateDisplaySnippet: never} | 
        {onclick: never, dateDisplaySnippet: Snippet<[simplifiedDate: SimplifiedDate]>});

    export type SimplifiedDate = {
        year: number,
        month: number,
        day: number
    };

    let {dateInMonth, onclick, dateDisplaySnippet}: Props = $props();

    function getFirstDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    function getMonthDateOffset(date: Date): number {
        const firstOfMonth = getFirstDayOfMonth(date);
        return firstOfMonth.getDay();
    }

    // type ValidWeekIdentifier = 0|1|2|3|4|5|6;
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

    function weekDaysFromStartDay(dateNumber: number): number[] {
        let datesOfWeek = []
        for(let i = 0; i < 7; i++) {
            datesOfWeek.push(dateNumber + i);
        }
        return datesOfWeek;
    }

    $effect(() => {
        let weeks = [];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();

        const monthDateOffset = getMonthDateOffset(currentDate);
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