<script lang="ts">
    import { calculateContainerRatio } from "./util/geometryHelpers";
    import type { PercentagePoint } from "./util/types";

    export let self: PercentagePoint;
    export let next: PercentagePoint | null;

    export let pointColor = "#989898";
    export let connectorColor = "#656565";

    let pointElement: HTMLDivElement;
    let connectorElement: HTMLDivElement;

    function calculateDistanceBetweenPointsOnGraph(pointA: PercentagePoint, pointB: PercentagePoint): number {
        let distanceX = pointA.x - pointB.x;
        let distanceY = pointA.y - pointB.y;
        distanceY = distanceY / calculateContainerRatio(pointElement.parentElement!);
        let length = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        
        return length;
    }

    function calculateAngleBetweenPoints(pointA: PercentagePoint, pointB: PercentagePoint): number {
        let distanceX = pointA.x - pointB.x;
        let distanceY = pointA.y - pointB.y;
        distanceY = distanceY / calculateContainerRatio(pointElement.parentElement!);
        
        let angle = Math.atan(distanceY / distanceX);
        if (distanceX > 0) {
            angle = angle + Math.PI;
        }

        return angle;
    }

    // TODO: this component has to ensure that something like inset doesn't interfere with it

    $: {
        if(!!pointElement && connectorElement) {
            pointElement.style.setProperty("--self-x-position", self.x + "%");
            pointElement.style.setProperty("--self-y-position", self.y + "%");
            connectorElement.style.setProperty("--self-x-position", self.x + "%");
            connectorElement.style.setProperty("--self-y-position", self.y + "%");
            connectorElement.style.setProperty("--connector-color", connectorColor);
            pointElement.style.setProperty("--point-color", pointColor);

            pointElement.style.setProperty("--point-size", "0.5rem");
            connectorElement.style.setProperty("--point-size", "0.5rem");

            let length = 0;
            let angle = 0;
            if (!!next) {
                length = calculateDistanceBetweenPointsOnGraph(self, next);
                angle = calculateAngleBetweenPoints(self, next);
            }
            connectorElement.style.setProperty("--after-length", length + "%");
            connectorElement.style.setProperty("--after-angle",  (-angle) + "rad");
    
        }
    }
</script>

<div bind:this={pointElement} class="point">
    <!--{self.x}, {self.y}/{next?.x}, {next?.y}-->
</div>
<div bind:this={connectorElement} class="connector"></div>

<style>
.point{
    background-color: var(--point-color);
    border-radius: 50%;
    width: var(--point-size);
    height: var(--point-size);
    position: absolute;
    left: calc(var(--self-x-position) - var(--point-size)/2);
    bottom: calc(var(--self-y-position) - var(--point-size)/2);
    z-index: 1;
}

.connector{
    --connection-line-width: 2px;

    position: absolute;
    width: calc(var(--after-length));
    height: var(--connection-line-width);
    background-color: var(--connector-color);
    rotate: var(--after-angle);
    left: calc(var(--self-x-position));
    bottom: calc(var(--self-y-position) - var(--connection-line-width)/2);
    transform-origin: left;
}
</style>