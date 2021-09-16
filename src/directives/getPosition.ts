// Todo: put in the type for the object properties

export function tooltipPosition(
  position: string,
  currentElRect: object,
  bodyRect: object,
  tooltipRefRect: object
) {
  if (position == 'top') {
    return {
      top:
        currentElRect.top -
        bodyRect.top -
        currentElRect.height -
        tooltipRefRect.height -
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
      top:
        currentElRect.top -
        bodyRect.top +
        currentElRect.height / 2 -
        tooltipRefRect.height / 2 +
        'px',
      left: currentElRect.left + bodyRect.left + currentElRect.width + 20 + 'px'
    }
  }
  if (position == 'bottom') {
    return {
      top: currentElRect.top - bodyRect.top + 'px',
      left:
        currentElRect.left -
        bodyRect.left +
        currentElRect.width / 2 -
        tooltipRefRect.width / 2 +
        'px'
    }
  }
  if (position == 'left') {
    return {
      top:
        currentElRect.top -
        bodyRect.top +
        currentElRect.height / 2 -
        tooltipRefRect.height / 2 +
        'px',
      left:
        currentElRect.left - bodyRect.left - tooltipRefRect.width - 20 + 'px'
    }
  }
}
