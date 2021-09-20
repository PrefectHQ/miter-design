// Todo: put in the type for the object properties

export function tooltipPosition(
  position: string,
  currentElRect: object,
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
      top:
        currentElRect.top -
        bodyRect.top -
        currentElRect.height -
        tooltipRefRect.height +
        20 +
        'px',
      left:
        currentElRect.left -
        bodyRect.left +
        currentElRect.width / 2 -
        tooltipRefRect.width / 2 +
        'px'
    }
  }
  if (position == 'right') {
    return {
      top: currentElRect.top - bodyRect.top - currentElRect.height + 'px',
      left: currentElRect.left - bodyRect.left + currentElRect.width + 10 + 'px'
    }
  }
  if (position == 'bottom') {
    return {
      top: currentElRect.top - bodyRect.top + currentElRect.height + 10 + 'px',
      left:
        currentElRect.left -
        bodyRect.left +
        currentElRect.width / 2 -
        tooltipRefRect.width / 2 +
        'px'
    }
  }

  if (position == 'left') {
    // return {
    //   top:
    //     currentElRect.offsetTop -
    //     0.25 * tooltipRefRect.height +
    //     currentElRect.offsetHeight / 2 +
    //     'px',
    //   left: currentElRect.offsetLeft - tooltipRefRect.width - 12 + 'px'
    // }

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
