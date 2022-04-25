import { mount } from '@vue/test-utils'
import Card from './Card.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Card, {
    slots: {
      default: text
    }
  })

  const card = wrapper.get('article')
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

test('adds the miter class when prop is passed', () => {
  const wrapper = mount(Card, {
    props: {
      miter: true
    }
  })

  expect(wrapper.classes()).toContain('miter')
})

describe('outlined prop', () => {
  test('adds the outlined class when prop is passed', () => {
    const wrapper = mount(Card, {
      props: {
        outlined: true
      }
    })

    expect(wrapper.classes()).toContain('outlined')
  })
})

describe('background color prop', () => {
  test('adds css-defined background color', () => {
    const color = 'aliceblue'

    const wrapper = mount(Card, {
      props: {
        backgroundColor: color
      }
    })

    const internalAttributes = wrapper.get('div > div > div').attributes()

    expect(internalAttributes.style).toContain(color)
  })

  test('adds hex background color', () => {
    const color = '#000'

    const wrapper = mount(Card, {
      props: {
        backgroundColor: color
      }
    })

    const internalAttributes = wrapper.get('div > div > div').attributes()

    expect(internalAttributes.style).toContain('rgb(0, 0, 0)')
  })
})
