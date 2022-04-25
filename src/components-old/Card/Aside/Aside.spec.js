import { mount } from '@vue/test-utils'
import Aside from './Aside.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Aside, {
    slots: {
      default: text
    }
  })

  const card = wrapper.get('.card-aside')
  expect(card.text()).toBe(text)
})
