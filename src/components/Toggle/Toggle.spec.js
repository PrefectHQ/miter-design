import { mount } from '@vue/test-utils'
import RadioButton from './RadioButton.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(RadioButton, {
    slots: {
      default: text
    }
  })

  const radio = wrapper.get('[data-test="default"]')

  expect(radio.text()).toBe(text)
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(RadioButton, {
      props: {
        disabled: true
      }
    })

    const radio = wrapper.get('label')

    expect(radio.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(RadioButton, {
      props: {
        disabled: true
      }
    })

    const radio = wrapper.get('label')

    expect(radio.attributes('disabled')).toBeDefined()
  })

  test('sets disabled to false when disabled:false is passed as a prop', () => {
    const wrapper = mount(RadioButton, {
      props: {
        disabled: false
      }
    })

    const radio = wrapper.get('label')

    expect(radio.attributes('disabled')).toContain('false')
  })
})

test('emit update to true when selected', async () => {
  const wrapper = mount(RadioButton, {
    props: {
      disabled: false,
      modelValue: false
    }
  })
  const input = wrapper.find('input[type="radio"]')
  input.element.checked = true
  await input.trigger('input')
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(true)
})

test('emit update to false when unselected', async () => {
  const wrapper = mount(RadioButton, {
    props: {
      disabled: false,
      modelValue: true
    }
  })
  const input = wrapper.find('input[type="radio"]')
  input.element.checked = false
  await input.trigger('input')
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(false)
})
