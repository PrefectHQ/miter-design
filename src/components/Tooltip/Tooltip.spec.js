import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'

const factoryMount = (props = {}) => {
  return mount(Tooltip, {
    props: {
      ...props
    }
  })
}

describe('props', () => {
  test('content prop is passed', () => {
    const wrapper = factoryMount({ content: 'hello' })
    expect(wrapper.find('.tooltip-content').text()).toBe('hello')
  })

  test('displays empty string text if content prop is not passed', () => {
    const wrapper = factoryMount()
    expect(wrapper.find('.tooltip-content').text()).toBe('')
  })

  test('position is passed', () => {
    const wrapper = factoryMount({ position: 'right' })
    expect(wrapper.classes()).toContain('right')
  })

  test('defaults to top if position is not passed', () => {
    const wrapper = factoryMount()
    expect(wrapper.classes()).toContain('top')
  })
})
