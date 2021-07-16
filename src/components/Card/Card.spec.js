import { mount } from '@vue/test-utils'
import Card from './Card.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Card, {
    slots: {
      default: text
    }
  })

  const card = wrapper.get('main')
  expect(card.text()).toBe(text)
})

test('displays text in the header slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Card, {
    slots: {
      header: text
    }
  })

  const card = wrapper.get('header')
  expect(card.text()).toBe(text)
})

test('displays text in the footer slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Card, {
    slots: {
      actions: text
    }
  })

  const card = wrapper.get('footer')
  expect(card.text()).toBe(text)
})

test('displays text in the aside slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Card, {
    slots: {
      aside: text
    }
  })

  const card = wrapper.get('aside')
  expect(card.text()).toBe(text)
})
