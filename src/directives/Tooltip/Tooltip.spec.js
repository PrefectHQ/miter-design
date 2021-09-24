import { mount, createLocalVue as CreateLocalVue } from '@vue/test-utils'
import * as Module from './Tooltip.ts'
const TooltipDirective = Module.TooltipDirective
import Tooltip from '../../components/Tooltip/Tooltip.vue'
import { nextTick } from 'vue'

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
const waitNT = (ctx) => new Promise((resolve) => ctx.$nextTick(resolve))
const createContainer = (tag = 'div') => {
  const container = document.createElement(tag)
  document.body.appendChild(container)
  return container
}
// note: Passing but don't know why?..
describe('mounted hook', () => {
  test('mounting', async () => {
    const App = {
      directives: {
        Tooltip: TooltipDirective
      },
      template: '<div v-tooltip>tooltip</div>'
    }

    const wrapper = mount(App, {
      attachTo: createContainer()
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)

    expect(wrapper.element.tagName).toBe('DIV')
    const $div = wrapper.find('div')
    await $div.trigger('mouseenter')

    const tooltipContainer = document.querySelector('#tooltip-container')

    expect(tooltipContainer).not.toBe(null)
    expect(tooltipContainer.classList.contains('tooltip')).toBe(true)
  })

  // test('does not append component when mounted', () => {
  //   const wrapper = factoryMount()
  //   expect(wrapper.find('#tooltip-container').exists()).toBe(false)
  // })
  // test('appends the component on mouseenter', async () => {
  //   const wrapper = factoryMount()
  //   await wrapper.trigger('mouseenter')
  //   expect(wrapper.find('#tooltip-container').exists()).toBe(true)
  // })
  // test('removes the component on mouseleave', async () => {
  //   const wrapper = factoryMount()
  //   await wrapper.trigger('mouseleave')
  //   expect(wrapper.find('#tooltip-container').exists()).toBe(false)
  // })
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
