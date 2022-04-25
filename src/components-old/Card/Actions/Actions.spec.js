import { mount } from '@vue/test-utils'
import Actions from './Actions.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Actions, {
    slots: {
      default: text
    }
  })

  const card = wrapper.get('.card-actions')
  expect(card.text()).toBe(text)
})
