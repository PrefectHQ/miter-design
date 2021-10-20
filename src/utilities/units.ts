export type Pixels = `${number}px`

export function toPixels(value: number): Pixels {
    return `${value}px`
}