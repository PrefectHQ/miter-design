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

  test('displays default text if content prop is not passed', () => {
    const wrapper = factoryMount()
    expect(wrapper.find('.tooltip-content').text()).toBe('text')
  })

  test('position is passed', () => {
    const wrapper = factoryMount({ position: 'right' })
    expect(wrapper.classes()).toContain('right')
  })

  test('defaults to top if position is not passed', () => {
    const wrapper = factoryMount()
    expect(wrapper.classes()).toContain('top')
  })

  test('parentOffset prop', () => {
    const wrapper = factoryMount({
      position: 'top',
      parentOffSet: {
        top: { top: 1, left: 2 }
      }
    })

    console.log(wrapper.element.style)
  })
})
