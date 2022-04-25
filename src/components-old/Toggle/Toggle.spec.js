import { mount } from '@vue/test-utils'
import Toggle from './Toggle.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Toggle, {
    slots: {
      default: text
    }
  })

  const toggle = wrapper.get('[data-test="default"]')

  expect(toggle.text()).toBe(text)
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Toggle, {
      props: {
        disabled: true
      }
    })

    const toggle = wrapper.get('label')

    expect(toggle.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(Toggle, {
      props: {
        disabled: true
      }
    })

    const toggle = wrapper.get('label')

    expect(toggle.attributes('disabled')).toBeDefined()
  })

  test('sets disabled to false when disabled:false is passed as a prop', () => {
    const wrapper = mount(Toggle)

    const toggle = wrapper.get('label')

    expect(toggle.attributes('disabled')).toContain('false')
  })
})

test('emit update to true when selected', async () => {
  const wrapper = mount(Toggle)
  const input = wrapper.get('input[type="checkbox"]')
  await input.setValue(true)
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(true)
})

test('emit update to false when unselected', async () => {
  const wrapper = mount(Toggle, {
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
  const wrapper = mount(Toggle)
  await wrapper.setProps({ value: true })
  const input = wrapper.get('input[type="checkbox"]')
  expect(input.attributes('value')).toEqual('true')
})
