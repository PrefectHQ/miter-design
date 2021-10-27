import { mount } from '@vue/test-utils'
import TooltipDirective from './Tooltip.ts'
import { nextTick } from 'vue'

class DOMRect {}

global.DOMRect = DOMRect

const factoryMount = (position = '', text = 'test') => {
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

afterEach(() => {
  const tooltip = document.querySelector('.tooltip')

  if(tooltip) {
    tooltip.remove()
  }
});

describe('mounted hook', () => {

  test('does not append component when mounted', () => {
    const wrapper = factoryMount()
    const tooltipContainer = document.querySelector('.tooltip')

    expect(tooltipContainer).toBe(null)
  })

  test('appends the component on mouseenter', async () => {
    const wrapper = factoryMount()
    
    await wrapper.trigger('mouseenter')

    const tooltipContainer = document.querySelector('.tooltip')

    expect(tooltipContainer).not.toBe(null)
  })

  test('removes the component on mouseleave', async () => {
    const wrapper = factoryMount()
    
    await wrapper.trigger('mouseenter')
    
    const tooltipOpen = document.querySelector('.tooltip')
    
    expect(tooltipOpen).not.toBe(null)

    await wrapper.trigger('mouseleave')
    
    const tooltipClosed = document.querySelector('.tooltip')
    
    expect(tooltipClosed).toBe(null)
  })
})

describe('arguments', () => {
  
  test('content is passed if provided', async () => {
    const wrapper = factoryMount('right', 'Hello')

    await wrapper.trigger('mouseenter')

    const content = document.querySelector('.tooltip__content')

    expect(content.innerText).toBe('Hello')
  })
  
  test('content html is not parsed', async () => {
    const content = '<p>hello world</p>'
    const wrapper = factoryMount('right', content)

    await wrapper.trigger('mouseenter')

    const contentContainer = document.querySelector('.tooltip__content')

    expect(contentContainer.innerText).toBe(content)
  })

  test('position is passed if provided ', async () => {
    const wrapper = factoryMount('right')

    await wrapper.trigger('mouseenter')

    const tooltipContainer = document.querySelector('.tooltip')
    
    expect(tooltipContainer.classList.contains('tooltip--right')).toBe(true)
  })

})
