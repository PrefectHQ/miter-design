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
    const wrapper = mount(Checkbox)

    const checkbox = wrapper.get('label')

    expect(checkbox.attributes('disabled')).toContain('false')
  })
})

test('emit update to true when checked', async () => {
  const wrapper = mount(Checkbox)
  const input = wrapper.get('input[type="checkbox"]')
  await input.setValue(true)
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(true)
})

test('emit update to false when unchecked', async () => {
  const wrapper = mount(Checkbox, {
    props: {
      value: true
    }
  })
  const input = wrapper.get('input[type="checkbox"]')
  await input.setValue(false)
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(false)
})

test('updating prop also changes value', async () => {
  // we have to test this way as vue-test-utils doesn't offer a good way to test "checked"
  const wrapper = mount(Checkbox)
  await wrapper.setProps({ value: true })
  const input = wrapper.get('input[type="checkbox"]')
  expect(input.attributes('value')).toEqual('true')
})
