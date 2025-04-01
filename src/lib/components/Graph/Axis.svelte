<script lang="ts">
import type { PercentageValue } from "./util/types";

export let orientation: "x" | "y";

export let offset: PercentageValue = 0;
export let tickDistance: number; // should be a number of pixels

export let getNthTickDescription: Function = function (index: number) {return index};

let amountOfTicks: number;
let tickPosition: "initial" | "center" | "opposed" = "initial";

let axis: HTMLDivElement;

function calculateAmountOfTicks(): number {
    const computedStyle = window.getComputedStyle(axis);
    let rawAxisLength: string; 
    switch (orientation) {
        case "x": 
            rawAxisLength = computedStyle.width;
            break;
        case "y": 
            rawAxisLength = computedStyle.height;
            break;
        default:
            console.error("an axis should either be the x or y axis");
            rawAxisLength = "0";        
        }

    const axisLength = parseInt(rawAxisLength);
    return Math.floor(axisLength / tickDistance)
}

$: {if (!!axis && !!tickDistance) {
    axis.style.setProperty("--axis-offset", offset + "%");
    axis.style.setProperty("--orientation-specific-rotation", 
        orientation == "y" ? "-90deg" : "0"
    );
    
    amountOfTicks = calculateAmountOfTicks();
    axis.style.setProperty("--tick-distance", tickDistance + "px");
    axis.style.setProperty("--amount-of-ticks", amountOfTicks + ""); // TODO: I'm sure that there is a better way to do it! 

    switch (offset) {
        case 0: 
            tickPosition = "initial";
            break;
        case 100:
            tickPosition = "opposed";
            break;

        default: 
            tickPosition = "center";
    }
}};
</script>

<div bind:this={axis} class="axis axis--{orientation}">
    {#each {length: amountOfTicks}, index}
    <div class="tick-wrapper">
        <div class="tick tick--on-{orientation}-axis tick--on-{orientation}-axis--{tickPosition}">
            <div class="tick-description">{getNthTickDescription(index)}</div>
        </div>
    </div>
    {/each}
</div>

<style lang="scss">
.axis {
    position: absolute;
    display: flex;

    &--x {
        width: 100%;
        height: 0;
        border-top: var(--graph-stroke-width) var(--graph-color) solid;
        bottom: var(--axis-offset); /* Question: should this be split in different vars? */
        flex-direction: row;
        transform: translateY(50%);
    }
    
    &--y {
        width: 0;
        height: 100%;
        border-left: var(--graph-stroke-width) var(--graph-color) solid;
        bottom: 0;
        left: var(--axis-offset);
        grid-auto-flow: row;
        grid-template-rows: repeat(var(--amount-of-ticks), var(--tick-distance));
        align-items: start; /* FIXME: is this correct? */
        flex-direction: column-reverse;
        transform: translateX(-50%);
    }
}

.tick-wrapper {
    flex-basis: var(--tick-distance);
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    height: 100%;
}

.tick {
    /*TODO: move these vars somehere, where it makes sense
    and add the option to set this*/
    --graph-tick-stroke-width: calc(var(--graph-stroke-width) * 0.5);
    --graph-tick-height: 5px;
    --graph-tick-stroke-color: #aaa;

    background-color: var(--graph-tick-stroke-color);
    left: 0;
    top: 0;
    position: relative;
    display: flex;

    &--on-x-axis {
        width: var(--graph-tick-stroke-width);
        height: var(--graph-tick-height);
        justify-content: center;
        float: left;
        /* TODO: not sure, why the x translation is needed */

        &--opposed {
            transform: translateX(-50%) translateY(-100%);
            align-items: start;
            & > .tick-description {
                transform: translateY(-100%);
            }
        }
        &--initial {
            transform: translateX(-50%) translateY(calc(-1 * var(--graph-stroke-width)));
            & > .tick-description {
                transform: translateY(100%);
            }
        }
        &--center {
            transform: translateX(-50%) translateY(calc((-100% + calc(-1 * var(--graph-stroke-width))) / 2));
            & > .tick-description {
                transform: translateY(100%);
            }
        }
    }

    &--on-y-axis {
        width: var(--graph-tick-height);
        height: var(--graph-tick-stroke-width);
        align-items: center;
        top: 100%;

        &--initial {
            transform: translateY(-50%) translateX(-100%);
            justify-content: start;
            & > .tick-description {
                transform: translateX(-100%)
            }
        }
        &--opposed {
            transform: translateY(-50%) translateX(calc(-1 * var(--graph-stroke-width)));
            justify-content: end;
            & > .tick-description {
                transform: translateX(100%);
            }
        }
        &--center {
            transform: translateY(-50%) translateX(calc((-100% + calc(-1 * var(--graph-stroke-width))) / 2));
            justify-content: start;
            & > .tick-description {
                transform: translateX(-100%)
            }
        }
    }
}

.tick-description {
    --graph-tick-description-color: white;
    --graph-tick-description-font-size: .5rem;

    color: var(--graph-tick-description-color);
    font-size: var(--graph-tick-description-font-size);
}
</style>