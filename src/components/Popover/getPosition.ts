interface bodyRect {
  top: number
  left: number
}

interface popoverRect {
  height: number
  width: number
}

export function popoverPosition(
  position: string,
  current: DOMRect | undefined,
  body: bodyRect,
  popover: popoverRect
) {
  const arrow = {
    height: 12,
    width: 12
  }

  if (!current || !popover) return {}
  else {
    if (position == 'top') {
      return {
        top: `${
          current?.top -
          body?.top -
          popover.height -
          arrow.height
        }px`,
        left: `${
          current.left -
          body.left +
          current.width / 2 -
          popover.width / 2
        }px`
      }
    }
    
    if (position == 'right') {
      return {
        top: `${
          current.top -
          body.top -
          0.25 * popover.height +
          current.height / 2 +
          arrow.height / 2
        }px`,
        left: `${
          current.left - body.left + current.width + arrow.width
        }px`
      }
    }
    
    if (position == 'bottom') {
      return {
        top: `${
          current.top - body.top + current.height + arrow.height
        }px`,
        left: `${
          current.left -
          body.left +
          current.width / 2 -
          popover.width / 2
        }px`
      }
    }

    if (position == 'left') {
      return {
        top: `${
          current.top -
          body.top -
          0.25 * popover.height +
          current.height / 2 +
          arrow.height / 2
        }px`,

        left: `${current.left - popover.width - arrow.width}px`
      }
    }
  }
}
