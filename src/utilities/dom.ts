export function getTabbableElements(element: HTMLElement, { sort = false }: { sort?: boolean} = {}): HTMLElement[] {
    const elements = [...element.querySelectorAll<HTMLElement>('*')]
    const tabbable = elements.filter(element => element.tabIndex >= 0)

    if(sort) {
        const descendingOrder = tabbable.sort((a, b) => b.tabIndex - a.tabIndex)
        const ascendingButWithZerosAtEnd = descendingOrder.sort((a, b) => {
            if(a.tabIndex === 0) return 0
            
            return a.tabIndex - b.tabIndex
        })

        return ascendingButWithZerosAtEnd;
    }

    return tabbable
}

export function getFirstTabbableElement(element: HTMLElement): HTMLElement | null {
    const elements = getTabbableElements(element, { sort: true });
    const first = elements[0]

    return first ?? null
}

export function getLastTabbableElement(element: HTMLElement): HTMLElement | null {
    const elements = getTabbableElements(element, { sort: true });
    const last = elements[elements.length - 1]

    return last ?? null
}