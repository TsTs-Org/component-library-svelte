<script lang="ts">
import Axis from "./Axis.svelte";
import { clamp, getDistanceBetweenValues } from "./util/geometryHelpers";
import type { PercentageValue, PointRange } from "./util/types";

let relativeXPosition: PercentageValue = 0;
let relativeYPosition: PercentageValue = 0;

export let displayRange: PointRange;

let coordinatePlaneElement: HTMLDivElement;

// TODO: calculate offset automatically when there are negative Values

const semanticStepSize = 5;

// TODO: are those defaults needed?
let tickDistanceX: number = 10;
let tickDistanceY: number = 10;

function calculateTickDistance() {
    const computedWidthRaw = window.getComputedStyle(coordinatePlaneElement).width;
    const computedHeightRaw = window.getComputedStyle(coordinatePlaneElement).height;
    const computedWidth = parseInt(computedWidthRaw);
    const computedHeight = parseInt(computedHeightRaw);

    const delta_x = getDistanceBetweenValues(displayRange.from.x, displayRange.to.x);
    const delta_y = getDistanceBetweenValues(displayRange.from.y, displayRange.to.y);

    tickDistanceX = computedWidth / delta_x;
    tickDistanceY = computedHeight / delta_y;

    coordinatePlaneElement.style.setProperty("--tick-distance-x", tickDistanceX + "px");
    coordinatePlaneElement.style.setProperty("--tick-distance-y", tickDistanceY + "px");
}

function calculateOffset() {
    const length = getDistanceBetweenValues(displayRange.from.x, displayRange.to.x);
    const height = getDistanceBetweenValues(displayRange.from.y, displayRange.to.y);
    let calculatedRelativeXPosition = 0;
    if(displayRange.from.y < 0) {
        calculatedRelativeXPosition = Math.abs(displayRange.from.y) / height * 100;
        calculatedRelativeXPosition = clamp(calculatedRelativeXPosition, 0, 100);
    }
    let calculatedRelativeYPosition = 0; 
    if(displayRange.from.x < 0) {
        calculatedRelativeYPosition = Math.abs(displayRange.from.x) / length * 100;
        calculatedRelativeYPosition = clamp(calculatedRelativeYPosition, 0, 100);
    };

    relativeXPosition = calculatedRelativeXPosition;
    relativeYPosition = calculatedRelativeYPosition;
};

function getNthTickDescriptionFromStartValue(fromValue: number) {
    return function (index: number): string {
        return fromValue + index + ""
    }
}

$: {
    if(!!displayRange && !!coordinatePlaneElement) {
        calculateTickDistance();
        calculateOffset();
    }
}
</script>

<div bind:this={coordinatePlaneElement} class="coordinate-plane">
    <Axis orientation="x" 
        tickDistance={tickDistanceX}
        offset={relativeXPosition} 
        getNthTickDescription={getNthTickDescriptionFromStartValue(displayRange.from.x)}
    ></Axis>
    <Axis orientation="y" 
        tickDistance={tickDistanceY} 
        offset={relativeYPosition}
        getNthTickDescription={getNthTickDescriptionFromStartValue(displayRange.from.y)}
    ></Axis>
</div>

<style lang="scss">
    .coordinate-plane {
        --coordinate-grid-color: #414141;
        --coordinate-grid-stroke-width: 1px;

        width: 100%;
        height: 100%;
        background-size: var(--tick-distance-x) var(--tick-distance-y);
        background-image:
        linear-gradient(to right, var(--coordinate-grid-color) var(--coordinate-grid-stroke-width), transparent var(--coordinate-grid-stroke-width)),
        linear-gradient(to bottom, var(--coordinate-grid-color) var(--coordinate-grid-stroke-width), transparent var(--coordinate-grid-stroke-width));
        background-position: -0.5px -0.5px;
    }
</style>