import { Pixels, toPixels } from "./units"

export type Placement = 'top' | 'right' | 'bottom' | 'left'

export type PlacementPositionStyles = {
  left: Pixels,
  top: Pixels
}

export type PlacementPosition = {
  left: number,
  top: number
}

export function isPlacement(value: any): value is Placement {
  const placements: Placement[] = ['top', 'right', 'bottom', 'left']

  return placements.includes(value)
}

export function calculatePlacementPositionStyles(
  placement: Placement,
  target: HTMLElement | DOMRect,
  popover: HTMLElement | DOMRect,
  container: HTMLElement | DOMRect = document.body
): PlacementPositionStyles {
  const { top, left } = calculatePlacementPosition(placement, target, popover, container)

  return {
    top: toPixels(top),
    left: toPixels(left)
  }
}

export function calculatePlacementPosition(
  placement: Placement,
  target: HTMLElement | DOMRect,
  popover: HTMLElement | DOMRect,
  container: HTMLElement | DOMRect = document.body
): PlacementPosition {
  const targetRect = domRectFromElementOrRect(target)
  const popoverRect = domRectFromElementOrRect(popover)
  const containerRect = domRectFromElementOrRect(container)
  const method = placementMethod(placement)
  const position = method(targetRect, popoverRect, containerRect)

  return position
}

function domRectFromElementOrRect(elementOrRect: HTMLElement | DOMRect): DOMRect {
  return elementOrRect instanceof DOMRect ? elementOrRect : elementOrRect.getBoundingClientRect()
}

function placementMethod(placement: Placement) {
  switch(placement) {
    case 'top':
      return top
    case 'right':
      return right
    case 'bottom':
      return bottom
    case 'left':
      return left
  }
}

function top(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top - popover.height
  const left = target.left - container.left + target.width / 2 - popover.width / 2

  return { 
    left, 
    top
  }
}

function right(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top - 0.5 * popover.height + target.height / 2
  const left = target.left - container.left + target.width

  return { 
    left, 
    top
  }
}

function bottom(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top + target.height
  const left = target.left - container.left + target.width / 2 - popover.width / 2

  return { 
    left, 
    top
  }
}

function left(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top - 0.5 * popover.height + target.height / 2
  const left = target.left - popover.width

  return { 
    left, 
    top
  }
}