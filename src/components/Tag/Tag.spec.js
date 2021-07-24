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
  test('passes the color prop as a class when passed', () => {
    const wrapper = mount(Tag, {
      props: { color: 'primary' }
    })

    const tag = wrapper.get('.tag')

    expect(tag.classes()).toContain('primary')
  })

  test('check if the computed style contains the color prop if updated', async () => {
    const wrapper = mount(Tag, {
      props: { color: 'primary' }
    })
    await wrapper.setProps({ color: 'secondary' })
    expect(wrapper.vm.classList).toContain('secondary')
  })

  test('does not pass the color prop when no color prop is provided', () => {
    const wrapper = mount(Tag, {
      props: {}
    })

    const tag = wrapper.get('.tag')
    expect(tag.classes()).not.toContain('primary')
  })
})

describe('disabled prop', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Tag, {
      props: {
        disabled: true
      }
    })

    const tag = wrapper.get('.tag')

    expect(tag.classes()).toContain('disabled')
  })

  test('check if the computed style contains the disabled prop if updated', async () => {
    const wrapper = mount(Tag, {
      props: { disabled: false }
    })
    await wrapper.setProps({ disabled: true })
    expect(wrapper.vm.classList).toContain('disabled')
  })

  test("doesn't pass the disabled class when disabled is not passed as a prop", () => {
    const wrapper = mount(Tag, {
      props: {}
    })

    const tag = wrapper.get('.tag')

    expect(tag.classes()).not.toContain('disabled')
  })
})

describe('outlined prop', () => {
  test('adds the outlined class when outlined:true is passed as a prop', () => {
    const wrapper = mount(Tag, {
      props: {
        outlined: true
      }
    })

    const tag = wrapper.get('.tag')

    expect(tag.classes()).toContain('outlined')
  })

  test('check if the computed style contains the outline prop if updated', async () => {
    const wrapper = mount(Tag, {
      props: { outlined: false }
    })
    await wrapper.setProps({ outlined: true })
    expect(wrapper.vm.classList).toContain('outlined')
  })

  test("doesn't pass the outlined class when outlined is not passed as a prop", () => {
    const wrapper = mount(Tag, {
      props: {}
    })

    const tag = wrapper.get('.tag')

    expect(tag.classes()).not.toContain('outlined')
  })
})
