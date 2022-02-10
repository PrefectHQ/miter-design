import { mount } from '@vue/test-utils'
import Code from './Code.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Code, {
    slots: {
      default: text
    }
  })

  const code = wrapper.get('[data-test="default"]')

  expect(code.text()).toBe(text)
})