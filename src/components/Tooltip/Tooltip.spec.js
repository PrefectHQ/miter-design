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
  test('content prop is passed', () => {})

  test('content prop is not passed', () => {})

  test('position is passed', () => {})

  test('position is not passed', () => {})

  test('parentOffSet is passed', () => {})
  test('parentOffSet is not passed', () => {})
})
