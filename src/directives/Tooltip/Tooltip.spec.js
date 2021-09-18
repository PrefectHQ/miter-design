import { mount } from '@vue/test-utils'
import * as Module from './Tooltip.ts'
const Tooltip = Module.TooltipDirective

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
          Tooltip: Tooltip
        }
      }
    }
  )
}

describe('mounted hook', () => {
  test('does not append component when mounted', () => {
    const wrapper = factoryMount()
    expect(wrapper.find('#tooltip-container').exists()).toBe(false)
  })

  test('appends the component on mouseenter', async () => {
    const wrapper = factoryMount()
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('#tooltip-container').exists()).toBe(true)
  })

  test('removes the component on mouseleave', async () => {
    const wrapper = factoryMount()
    await wrapper.trigger('mouseleave')
    expect(wrapper.find('#tooltip-container').exists()).toBe(false)
  })
})

describe('arguments', () => {
  test('content is passed if provided', async () => {
    const wrapper = factoryMount('right', 'Hello')
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.tooltip-content').text()).toBe('Hello')
  })

  test('position is passed if provided ', async () => {
    const wrapper = factoryMount('right')
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('#tooltip-container').classes()).toContain('right')
  })
})
