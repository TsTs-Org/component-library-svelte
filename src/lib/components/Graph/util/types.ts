export type DataPoint = {
    x: number,
    y: number,
}

export type PointRange = {
    from: DataPoint,
    to: DataPoint
}

export type PercentageValue = number;

export type PercentagePoint = {
    x: PercentageValue,
    y: PercentageValue
}