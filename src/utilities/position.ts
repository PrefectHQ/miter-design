import { Pixels, toPixels } from "./units"

export type Placement = 'top' | 'right' | 'bottom' | 'left'

export const allPlacements: Placement[] = ['top', 'right', 'bottom', 'left']

export type PlacementPositionStyles = {
  left: Pixels,
  top: Pixels
}

export type PlacementPosition = {
  left: number,
  top: number
}

export type PlacementVisibility = {
  placement: Placement,
  visibility:  number
}

export function isPlacement(value: any): value is Placement {
  return allPlacements.includes(value)
}

export function positionToPositionStyles(position: PlacementPosition): PlacementPositionStyles {
  return {
    left: toPixels(position.left),
    top: toPixels(position.top)
  }
}

export function calculatePlacementVisibility(
  placement: Placement,
  target: HTMLElement | DOMRect, 
  popover: HTMLElement | DOMRect, 
  container: HTMLElement | DOMRect = document.body,
): number {
  const popoverRect = domRectFromElementOrRect(popover)
  const position = calculatePlacementPosition(placement, target, popover, container)
  const positionRect = new DOMRect(position.left, position.top, popoverRect.width, popoverRect.height)

  return domRectVisibility(positionRect)
}

export function domRectVisibility(rect: DOMRect): number {
  const visibleWidth = Math.min(rect.right, window.scrollX + window.innerWidth) - Math.max(rect.left, 0)
  const visibleHeight = Math.min(rect.bottom, window.scrollY + window.innerHeight) - Math.max(rect.top, 0)
  const visibleArea = visibleWidth * visibleHeight
  const totalArea = rect.width * rect.height

  return visibleArea / totalArea
}

export function calculateMostVisiblePlacement(
  target: HTMLElement | DOMRect, 
  popover: HTMLElement | DOMRect, 
  container: HTMLElement | DOMRect = document.body,
  placements: Placement[] = allPlacements
): PlacementVisibility {
  const popoverRect = domRectFromElementOrRect(popover)
  let mostVisible: PlacementVisibility = { placement: placements[0], visibility: 0 }

  for (let i = 0; i < placements.length; i++) {
    const placement = placements[i]
    const visibility = calculatePlacementVisibility(placement, target, popover, container)

    if(visibility === 1) {
      return { placement, visibility }
    }

    if(visibility > mostVisible.visibility) {
      mostVisible = { placement, visibility }
    }

  }

  return mostVisible
}

export function calculateMostVisiblePlacementPositionStyles(
  target: HTMLElement | DOMRect,
  popover: HTMLElement | DOMRect,
  container: HTMLElement | DOMRect = document.body,
  placements: Placement[] = allPlacements
): PlacementPositionStyles {
  const position = calculateMostVisiblePlacementPosition(target, popover, container, placements)

  return positionToPositionStyles(position)
}

export function calculateMostVisiblePlacementPosition(
  target: HTMLElement | DOMRect,
  popover: HTMLElement | DOMRect,
  container: HTMLElement | DOMRect = document.body,
  placements: Placement[] = allPlacements
): PlacementPosition {
  const { placement } = calculateMostVisiblePlacement(target, popover, container, placements)
  const position = calculatePlacementPosition(placement, target, popover, container)

  return position
}

export function calculatePlacementPositionStyles(
  placement: Placement,
  target: HTMLElement | DOMRect,
  popover: HTMLElement | DOMRect,
  container: HTMLElement | DOMRect = document.body
): PlacementPositionStyles {
  const position = calculatePlacementPosition(placement, target, popover, container)

  return positionToPositionStyles(position)
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