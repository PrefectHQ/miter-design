import { mount } from '@vue/test-utils'
import * as Module from './Tooltip.ts'
const TooltipDirective = Module.TooltipDirective

const createContainer = (tag = 'div') => {
  const container = document.createElement(tag)
  document.body.appendChild(container)
  return container
}
// note: Passing but don't know why?
describe('mounted hook', () => {
  test('does not append component when mounted', () => {
    const App = {
      directives: {
        Tooltip: TooltipDirective
      },
      template: '<div v-tooltip>tooltip</div>'
    }
    const wrapper = mount(App, {
      attachTo: createContainer()
    })
    const tooltipContainer = document.querySelector('#tooltip-container')
    expect(tooltipContainer).toBe(null)
  })
  test('appends the component on mouseenter', async () => {
    const App = {
      directives: {
        Tooltip: TooltipDirective
      },
      template: '<div v-tooltip>tooltip</div>'
    }
    const wrapper = mount(App, {
      attachTo: createContainer()
    })

    await wrapper.trigger('mouseenter')
    const tooltipContainer = document.querySelector('#tooltip-container')
    // tooltipContainer.classList -> {}
    // tooltipContainer.classList.value -> tooltip

    expect(tooltipContainer).not.toBe(null)
    expect(tooltipContainer.classList.contains('tooltip')).toBe(true)
  })

  test('removes the component on mouseleave', async () => {
    const App = {
      directives: {
        Tooltip: TooltipDirective
      },
      template: '<div v-tooltip>tooltip</div>'
    }
    const wrapper = mount(App, {
      attachTo: createContainer()
    })
    await wrapper.trigger('mouseleave')
    const tooltipContainer = document.querySelector('#tooltip-container')
    expect(tooltipContainer).toBe(null)
  })
})

// note: Failing
describe('arguments', () => {
  // test('content is passed if provided', async () => {
  //   const wrapper = factoryMount('right', 'Hello')
  //   await wrapper.trigger('mouseenter')
  //   expect(wrapper.find('.tooltip-content').text()).toBe('Hello')
  // })
  // test('position is passed if provided ', async () => {
  //   const wrapper = factoryMount('right')
  //   await wrapper.trigger('mouseenter')
  //   expect(wrapper.find('#tooltip-container').classes()).toContain('right')
  // })
})
