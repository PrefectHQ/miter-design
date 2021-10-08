export function getTabbableElements(element: HTMLElement) {
    const elements = element.querySelectorAll<HTMLElement>('*')
    const tabbable = [...elements].filter(element => element.tabIndex >= 0)

    return tabbable
}

export function getFirstTabbableElement(element: HTMLElement) {
    const elements = element.querySelectorAll<HTMLElement>('*')
    const tabbable = [...elements].find(element => element.tabIndex >= 0)

    return tabbable
}

export function getLastTabbableElement(element: HTMLElement) {
    const elements = element.querySelectorAll<HTMLElement>('*')
    const tabbable = [...elements].reverse().find(element => element.tabIndex >= 0)

    return tabbable
}