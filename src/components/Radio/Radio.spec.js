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
    const wrapper = mount(RadioButton)

    const radio = wrapper.get('label')

    expect(radio.attributes('disabled')).toContain('false')
  })
})

test('emit button value when selected', async () => {
  const buttonValue = 'radio-button'
  const wrapper = mount(RadioButton, {
    props: {
      value: buttonValue
    }
  })
  const radio = wrapper.get('input[type="radio"]')
  radio.element.selected = true
  await radio.trigger('change')
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(buttonValue)
})

test('updating prop also changes value', async () => {
  // we have to test this way as vue-test-utils doesn't offer a good way to test "checked"
  const wrapper = mount(RadioButton, {
    props: {
      value: 'another-button'
    }
  })
  await wrapper.setProps({ value: 'this-button' })
  const input = wrapper.get('input[type="radio"]')
  expect(input.attributes('value')).toEqual('this-button')
})
