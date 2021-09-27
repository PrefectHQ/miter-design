import { mount } from '@vue/test-utils'
import * as Module from './Tooltip.ts'
const TooltipDirective = Module.TooltipDirective

const factoryMount = (position = '', text = '') => {
  return mount(
    { template: `<div v-tooltip:[position]="text">Foo</div>` },
    {
      data() {
        return {
          position,
          text
        }
      },
      global: {
        directives: {
          Tooltip: TooltipDirective
        }
      }
    }
  )
}

describe('mounted hook', () => {
  test('does not append component when mounted', () => {
    const wrapper = factoryMount()
    const tooltipContainer = document.querySelector('#tooltip-container')

    expect(tooltipContainer).toBe(null)
  })

  test('appends the component on mouseenter', async () => {
    const wrapper = factoryMount()
    await wrapper.trigger('mouseenter')
    const tooltipContainer = document.querySelector('#tooltip-container')

    expect(tooltipContainer).not.toBe(null)
    expect(tooltipContainer.classList.contains('tooltip')).toBe(true)
  })

  test('removes the component on mouseleave', async () => {
    const wrapper = factoryMount()
    await wrapper.trigger('mouseleave')
    const tooltipContainer = document.querySelector('#tooltip-container')
    expect(tooltipContainer).toBe(null)
  })
})

describe('arguments', () => {
  test('content is passed if provided', async () => {
    const wrapper = factoryMount('right', 'Hello')
    await wrapper.trigger('mouseenter')

    const tooltipContainer = document.querySelector('#tooltip-container')
    expect(tooltipContainer.textContent).toBe('Hello')
  })

  test('position is passed if provided ', async () => {
    const wrapper = factoryMount('right')
    await wrapper.trigger('mouseenter')
    const tooltipContainer = document.querySelector('#tooltip-container')
    expect(tooltipContainer.classList.contains('right')).toBe(true)
  })
})
