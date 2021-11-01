import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'
import TooltipContent from './TooltipContent.vue'

class DOMRect {}

global.DOMRect = DOMRect

const factoryMount = (props = {}) => {
  return mount(Tooltip, {
    props: {
      ...props
    }
  })
}

describe('props', () => {
  test('content prop is passed', async () => {
    const wrapper = factoryMount({ content: 'hello' })
    
    await wrapper.vm.openTooltip()
    
    const tooltip = wrapper.findComponent(TooltipContent)

    expect(tooltip.find('.tooltip__content').text()).toBe('hello')
  })
  
  test('displays empty string text if content prop is not passed', async () => {
    const wrapper = factoryMount()
    
    await wrapper.vm.openTooltip()
    
    const tooltip = wrapper.findComponent(TooltipContent)

    expect(tooltip.find('.tooltip__content').text()).toBe('')
  })

  test('placement is passed', async () => {
    const wrapper = factoryMount({ placement: 'right' })
    
    await wrapper.vm.openTooltip()
    
    const tooltip = wrapper.findComponent(TooltipContent)

    expect(tooltip.classes()).toContain('tooltip--right')
  })

  test('placement defaults to top', async () => {
    const wrapper = factoryMount()
    
    await wrapper.vm.openTooltip()
    
    const tooltip = wrapper.findComponent(TooltipContent)

    expect(tooltip.classes()).toContain('tooltip--top')
  })

})
