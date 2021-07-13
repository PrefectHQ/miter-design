import { mount } from '@vue/test-utils'
import Button from './Button.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Button, {
    slots: {
      default: text
    }
  })

  const button = wrapper.get('[data-test="default"]')

  expect(button.text()).toBe(text)
})

test('adds the disabled class when disabled is passed as a prop', () => {
  const wrapper = mount(Button, {
    props: {
      disabled: true
    }
  })

  const button = wrapper.get('button')

  expect(button.classes()).toContain('disabled')
})
