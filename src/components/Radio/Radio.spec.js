import { mount } from '@vue/test-utils'
import Radio from './Radio.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Radio, {
    slots: {
      default: text
    }
  })

  const radio = wrapper.get('[data-test="default"]')

  expect(radio.text()).toBe(text)
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Radio, {
      props: {
        disabled: true
      }
    })

    const radio = wrapper.get('label')

    expect(radio.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(Radio, {
      props: {
        disabled: true
      }
    })

    const radio = wrapper.get('label')

    expect(radio.attributes('disabled')).toBeDefined()
  })

  test('sets disabled to false when disabled:false is passed as a prop', () => {
    const wrapper = mount(Radio, {
      props: {
        disabled: false
      }
    })

    const radio = wrapper.get('label')

    expect(radio.attributes('disabled')).toContain('false')
  })
})

test('emit event when checked', () => {
  const wrapper = mount(Radio, {
    props: {
      disabled: false,
      checked: false
    }
  })

  wrapper.find('input[type="radio"]').trigger('input')

  expect(wrapper.emitted()).toHaveProperty('update:checked')
})
