import { mount } from '@vue/test-utils'
import Avatar from './Avatar.vue'

test('displays text in the default slot', () => {
  const text = 'TS!'
  const wrapper = mount(Avatar, {
    slots: {
      default: text
    }
  })

  const avatar = wrapper.get('[data-test="default"]')

  expect(avatar.text()).toBe(text)
})

describe('color prop', () => {
  test('defaults to the primary  when no color prop is passed', () => {
    const wrapper = mount(Avatar, {
      props: {}
    })

    const avatar = wrapper.get('.avatar')
    expect(avatar.classes()).toContain('primary')
  })

  test('passes the color prop as a class when passed', () => {
    const wrapper = mount(Avatar, {
      props: { color: 'error' }
    })

    const avatar = wrapper.get('.avatar')

    expect(avatar.classes()).toContain('error')
  })
})
