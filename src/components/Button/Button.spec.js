import { mount } from '@vue/test-utils'
import Button from './Button.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Button, {
    slots: {
      default: text
    }
  })

  const todo = wrapper.get('[data-test="default"]')

  expect(todo.text()).toBe(text)
})
