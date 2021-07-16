import { mount } from '@vue/test-utils'
import Checkbox from './Checkbox.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Checkbox, {
    slots: {
      default: text
    }
  })

  const checkbox = wrapper.get('[data-test="default"]')

  expect(checkbox.text()).toBe(text)
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Checkbox, {
      props: {
        disabled: true
      }
    })

    const checkbox = wrapper.get('label')

    expect(checkbox.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(Checkbox, {
      props: {
        disabled: true
      }
    })

    const checkbox = wrapper.get('label')

    expect(checkbox.attributes('disabled')).toBeDefined()
  })

  test('sets disabled to false when disabled:false is passed as a prop', () => {
    const wrapper = mount(Checkbox, {
      props: {
        disabled: false
      }
    })

    const checkbox = wrapper.get('label')

    expect(checkbox.attributes('disabled')).toContain('false')
  })
})