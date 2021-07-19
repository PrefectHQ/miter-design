import { mount } from '@vue/test-utils'
import Tab from './Tab.vue'

test('displays text in the default slot when none is provided', () => {
  const wrapper = mount(Tab, {})

  const card = wrapper.get('button')
  expect(card.text()).toBe('Tab')
})

test('displays text in the default slot', () => {
  const text = 'My First Tab'
  const wrapper = mount(Tab, {
    slots: {
      default: text
    }
  })

  const card = wrapper.get('button')
  expect(card.text()).toBe(text)
})
