import { getTabbableElements, getFirstTabbableElement, getLastTabbableElement } from './dom'

describe('dom utilities', () => {

    describe('getTabbableElements', () => {

        test('returns elements in dom order by default', () => {
            const div = document.createElement('div')
            const button1 = document.createElement('button')
            const button2 = document.createElement('button')
            const button3 = document.createElement('button')

            button3.tabIndex = 1
            button1.tabIndex = 2

            div.appendChild(button1)
            div.appendChild(button2)
            div.appendChild(button3)

            const tabbable = getTabbableElements(div)
                                .map(element => (element as HTMLButtonElement).tabIndex)
                                .join(',')

            expect(tabbable).toEqual('2,0,1')
        })

        test('returns elements in tab order when sort equals true', () => {
            const div = document.createElement('div')
            const button1 = document.createElement('button')
            const button2 = document.createElement('button')
            const button3 = document.createElement('button')

            button3.tabIndex = 1
            button1.tabIndex = 2

            div.appendChild(button1)
            div.appendChild(button2)
            div.appendChild(button3)

            const tabbable = getTabbableElements(div, { sort: true })
                                .map(element => (element as HTMLButtonElement).tabIndex)
                                .join(',')

            expect(tabbable).toEqual('1,2,0')
        })
    })

    describe('getFirstTabbableElement', () => {

        test('returns null when no tabbable elements are found', () => {
            const div = document.createElement('div')

            const first = getFirstTabbableElement(div)

            expect(first).toBe(null)
        })

        test('returns the first tabbable element when multiple tabbable elements are found', () => {
            const div = document.createElement('div')
            const button = document.createElement('button')
            const button2 = document.createElement('button')

            div.appendChild(button)
            div.appendChild(button2)

            const first = getFirstTabbableElement(div)

            expect(first).toBe(button)
        })

        test('returns the element with the lowest tab order when multiple tabbable elements are found', () => {
            const div = document.createElement('div')
            const button = document.createElement('button')
            const button2 = document.createElement('button')

            button2.tabIndex = 1

            div.appendChild(button)
            div.appendChild(button2)

            const first = getFirstTabbableElement(div)

            expect(first).toBe(button2)
        })

    })

    describe('getLastTabbableElement', () => {

        test('returns null when no tabbable elements are found', () => {
            const div = document.createElement('div')

            const first = getLastTabbableElement(div)

            expect(first).toBe(null)
        })

        test('returns the last tabbable element when multiple tabbable elements are found', () => {
            const div = document.createElement('div')
            const button = document.createElement('button')
            const button2 = document.createElement('button')

            div.appendChild(button)
            div.appendChild(button2)

            const first = getLastTabbableElement(div)

            expect(first).toBe(button2)
        })

        test('returns the element with the highest tab order when multiple tabbable elements are found', () => {
            const div = document.createElement('div')
            const button = document.createElement('button')
            const button2 = document.createElement('button')

            button2.tabIndex = 1

            div.appendChild(button)
            div.appendChild(button2)

            const last = getLastTabbableElement(div)

            expect(last).toBe(button)
        })

    })
    
})