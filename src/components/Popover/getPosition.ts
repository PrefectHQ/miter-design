interface bodyRectType {
  top: number
  left: number
}

interface popoverRefRectType {
  height: number
  width: number
}

export function popoverPosition(
  position: string,
  currentElRect: DOMRect | undefined,
  bodyRect: bodyRectType,
  popoverRefRect: popoverRefRectType
) {
  const arrow = {
    height: 12,
    width: 12
  }

  if (!currentElRect || !popoverRefRect) return {}
  else {
    if (position == 'top') {
      return {
        top: `${
          currentElRect?.top -
          bodyRect?.top -
          popoverRefRect.height -
          arrow.height
        }px`,
        left: `${
          currentElRect.left -
          bodyRect.left +
          currentElRect.width / 2 -
          popoverRefRect.width / 2
        }px`
      }
    }
    
    if (position == 'right') {
      return {
        top: `${
          currentElRect.top -
          bodyRect.top -
          0.25 * popoverRefRect.height +
          currentElRect.height / 2 +
          arrow.height / 2
        }px`,
        left: `${
          currentElRect.left - bodyRect.left + currentElRect.width + arrow.width
        }px`
      }
    }
    
    if (position == 'bottom') {
      return {
        top: `${
          currentElRect.top - bodyRect.top + currentElRect.height + arrow.height
        }px`,
        left: `${
          currentElRect.left -
          bodyRect.left +
          currentElRect.width / 2 -
          popoverRefRect.width / 2
        }px`
      }
    }

    if (position == 'left') {
      return {
        top: `${
          currentElRect.top -
          bodyRect.top -
          0.25 * popoverRefRect.height +
          currentElRect.height / 2 +
          arrow.height / 2
        }px`,

        left: `${currentElRect.left - popoverRefRect.width - arrow.width}px`
      }
    }
  }
}
