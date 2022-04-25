import { mount } from '@vue/test-utils'
import Avatar from './Avatar.vue'

test('displays text in the default slot', () => {
  const text = 'TS'
  const wrapper = mount(Avatar, {
    slots: {
      default: text
    }
  })

  const avatar = wrapper.get('[data-test="default"]')

  expect(avatar.text()).toBe(text)
})

describe('color prop', () => {
  test('defaults to primary when no color prop is passed', () => {
    const wrapper = mount(Avatar, {
      props: {}
    })

    const avatar = wrapper.get('.avatar')
    expect(avatar.classes()).toContain('primary')
  })

  test('classlist contains the color prop as a class when passed and does not contain the color prop when changed', async () => {
    const wrapper = mount(Avatar, {
      props: { color: 'primary' }
    })
    await wrapper.setProps({ color: 'error' })
    expect(wrapper.vm.classList).toContain('error')

    await wrapper.setProps({ color: 'warning' })
    expect(wrapper.vm.classList).not.toContain('error')
  })
})
