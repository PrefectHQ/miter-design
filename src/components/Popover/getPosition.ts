export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left'

export type PopoverPositionValue = `${number}px`

export type PopoverPositionStyles = {
  left?: PopoverPositionValue,
  top?: PopoverPositionValue
}

const arrow = {
  height: 12,
  width: 12
}

export function calculatePopoverPosition(
  placement: PopoverPlacement,
  target: HTMLDivElement,
  popover: HTMLDivElement,
  container: HTMLElement = document.body
): PopoverPositionStyles {

  const targetRect = target.getBoundingClientRect()
  const popoverRect = popover.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  console.log({ target, container, popover })

  switch(placement) {
    case 'top':
      return top(targetRect, popoverRect, containerRect)
    case 'right':
      return right(targetRect, popoverRect, containerRect)
    case 'bottom':
      return bottom(targetRect, popoverRect, containerRect)
    case 'left':
      return left(targetRect, popoverRect, containerRect)
    default:
      return {}
  }
}

function toPixels(value: number): PopoverPositionValue {
  return `${value}px`
}

function top(target: DOMRect, popover: DOMRect, container: DOMRect): PopoverPositionStyles {
  const top = target.top - container.top - popover.height - arrow.height
  const left = target.left - container.left + target.width / 2 - popover.width / 2

  return { 
    left: toPixels(left), 
    top: toPixels(top)
  }
}

function right(target: DOMRect, popover: DOMRect, container: DOMRect): PopoverPositionStyles {
  const top = target.top - container.top - 0.25 * popover.height + target.height / 2 + arrow.height / 2
  const left = target.left - container.left + target.width + arrow.width

  console.log({target, container, popover})

  return { 
    left: toPixels(left), 
    top: toPixels(top)
  }
}

function bottom(target: DOMRect, popover: DOMRect, container: DOMRect): PopoverPositionStyles {
  const top = target.top - container.top + target.height + arrow.height
  const left = target.left - container.left + target.width / 2 - popover.width / 2

  return { 
    left: toPixels(left), 
    top: toPixels(top)
  }
}

function left(target: DOMRect, popover: DOMRect, container: DOMRect): PopoverPositionStyles {
  const top = target.top - container.top - 0.25 * popover.height + target.height / 2 + arrow.height / 2
  const left = target.left - popover.width - arrow.width

  return { 
    left: toPixels(left), 
    top: toPixels(top)
  }
}
