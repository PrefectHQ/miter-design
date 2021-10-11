export function getTabbableElements(element: HTMLElement) {
    const elements = [...element.querySelectorAll<HTMLElement>('*')]
    const tabbable = elements.filter(element => element.tabIndex >= 0)

    return tabbable
}

export function getFirstTabbableElement(element: HTMLElement) {
    const elements = getTabbableElements(element);
    const sorted = elements.sort((a, b) => a.tabIndex - b.tabIndex)
    const first = sorted[0]

    return first
}

export function getLastTabbableElement(element: HTMLElement) {
    const elements = getTabbableElements(element);
    const sorted = elements.sort((a, b) => a.tabIndex - b.tabIndex)
    const last = sorted[sorted.length - 1]

    return last
}