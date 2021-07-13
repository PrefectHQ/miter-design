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

test('adds the hovered class when button is hovered or focused', async () => {
  const wrapper = mount(Button, {})

  const button = wrapper.get('button')

  await button.trigger('mouseenter')
  expect(button.classes()).toContain('hovered')
})
