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

test('emit update to true when checked', async () => {
  const wrapper = mount(Checkbox, {
    props: {
      disabled: false,
      value: false
    }
  })
  const input = wrapper.find('input[type="checkbox"]')
  input.element.checked = true
  await input.trigger('input')
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(true)
})

test('emit update to false when unchecked', async () => {
  const wrapper = mount(Checkbox, {
    props: {
      disabled: false,
      value: true
    }
  })
  const input = wrapper.find('input[type="checkbox"]')
  input.element.checked = false
  await input.trigger('input')
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(false)
})

test('updating prop also changes value', async () => {
  const wrapper = mount(Checkbox, {
    props: {
      value: false
    }
  })
  await wrapper.setProps({ value: true })
  const input = wrapper.find('input[type="checkbox"]')
  expect(input.attributes('value')).toEqual('true')
})
