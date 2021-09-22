export function tooltipPosition(
  position: string,
  currentElRect: DOMRect | undefined,
  bodyRect: object,
  tooltipRefRect: object
) {
  const arrow = {
    height: 12,
    width: 12
  }

  if (!currentElRect && !tooltipRefRect) return {}
  if (position == 'top') {
    return {
      top: `${
        currentElRect.top - bodyRect.top - tooltipRefRect.height - arrow.height
      }px`,
      left: `${
        currentElRect.left -
        bodyRect.left +
        currentElRect.width / 2 -
        tooltipRefRect.width / 2
      }px`
    }
  }
  if (position == 'right') {
    return {
      top: `${
        currentElRect.top -
        bodyRect.top -
        0.25 * tooltipRefRect.height +
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
        tooltipRefRect.width / 2
      }px`
    }
  }

  if (position == 'left') {
    return {
      top: `${
        currentElRect.top -
        bodyRect.top -
        0.25 * tooltipRefRect.height +
        currentElRect.height / 2 +
        arrow.height / 2
      }px`,

      left: `${currentElRect.left - tooltipRefRect.width - arrow.width}px`
    }
  }
}
