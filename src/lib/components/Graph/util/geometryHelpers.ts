import type { DataPoint } from "./types";

export function calculateContainerRatio(container: HTMLElement): number {
    let computedHeight = window.getComputedStyle(container).height;
    let computedWidth = window.getComputedStyle(container).width;

    return parseInt(computedWidth)/parseInt(computedHeight);
}

export function getDistanceBetweenPoints(pointA: DataPoint, pointB: DataPoint): number {
    const delta_x = getDistanceBetweenValues(pointA.x, pointB.x);
    const delta_y = getDistanceBetweenValues(pointA.y, pointB.y);

    return Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
}

export function getDistanceBetweenValues(valueA: number, valueB: number): number {
    return Math.abs(valueA - valueB)
}

export function clamp(x: number, lower: number, upper: number) {
    const upperBorder = Math.min(x, upper);
    const upperAndLowerBorder = Math.max(upperBorder, lower);
    return upperAndLowerBorder;
}