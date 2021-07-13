import { mount } from '@vue/test-utils'
import Header from './Header.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Header, {
    slots: {
      default: text
    }
  })

  const card = wrapper.get('.card-header')
  expect(card.text()).toBe(text)
})
