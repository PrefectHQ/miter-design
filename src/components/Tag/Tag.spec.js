import { mount } from '@vue/test-utils'
import Tag from './Tag.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Tag, {
    slots: {
      default: text
    }
  })

  const tag = wrapper.get('[data-test="default"]')

  expect(tag.text()).toBe(text)
})

describe('color prop', () => {
  test('defaults to the secondary color when no color prop is passed', () => {
    const wrapper = mount(Tag, {
      props: {}
    })

    const tag = wrapper.get('.tag')
    expect(tag.classes()).toContain('secondary')
  })
})
