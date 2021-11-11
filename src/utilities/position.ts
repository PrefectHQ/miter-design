import { Pixels, toPixels } from "./units"

export type Placement = 'top' | 'right' | 'bottom' | 'left' | 'leftTop' | 'rightTop'

export const allPlacements: Placement[] = ['top', 'right', 'bottom', 'left', 'leftTop', 'rightTop']

export const defaultPositionStyles: PlacementPositionStyles = {
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px'
}

export type PlacementPositionStyles = {
  top: Pixels,
  right: Pixels,
  bottom: Pixels
  left: Pixels,
}

export type PlacementPosition = {
  top: number,
  right: number,
  bottom: number
  left: number,
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
    top: toPixels(position.top),
    right: toPixels(position.right),
    bottom: toPixels(position.bottom),
    left: toPixels(position.left)
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
    case 'rightTop':
      return rightTop
    case 'bottom':
      return bottom
    case 'left':
      return left
    case 'leftTop':
      return leftTop
  }
}

function top(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top - popover.height
  const left = target.left - container.left + target.width / 2 - popover.width / 2
  const right = container.width - left - popover.width
  const bottom = container.height - top - popover.height

  return { 
    top,
    right,
    bottom,
    left
  }
}

function right(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top - 0.5 * popover.height + target.height / 2
  const left = target.left - container.left + target.width
  const right = container.width - left - popover.width
  const bottom = container.height - top - popover.height

  return { 
    top,
    right,
    bottom,
    left
  }
}

// Same as right but with a 0.25 offset on the popover's height
function rightTop(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top - 0.25 * popover.height + target.height / 2
  const left = target.left - container.left + target.width
  const right = container.width - left - popover.width
  const bottom = container.height - top - popover.height

  return { 
    top,
    right,
    bottom,
    left
  }
}

function bottom(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top + target.height
  const left = target.left - container.left + target.width / 2 - popover.width / 2
  const right = container.width - left - popover.width
  const bottom = container.height - top - popover.height

  return { 
    top,
    right,
    bottom,
    left
  }
}

function left(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top - 0.5 * popover.height + target.height / 2
  const left = target.left - popover.width
  const right = container.width - left - popover.width
  const bottom = container.height - top - popover.height

  return { 
    top,
    right,
    bottom,
    left
  }
}

// Same as left but with a 0.25 offset on the popover's height
function leftTop(target: DOMRect, popover: DOMRect, container: DOMRect): PlacementPosition {
  const top = target.top - container.top - 0.25 * popover.height + target.height / 2
  const left = target.left - popover.width
  const right = container.width - left - popover.width
  const bottom = container.height - top - popover.height

  return { 
    top,
    right,
    bottom,
    left
  }
}