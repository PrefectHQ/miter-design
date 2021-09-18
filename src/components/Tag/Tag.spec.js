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

    expect(wrapper.classes()).toContain('primary')
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

    expect(wrapper.classes()).not.toContain('primary')
  })
})

describe('disabled prop', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Tag, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('disabled')
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

    expect(wrapper.classes()).not.toContain('disabled')
  })
})

describe('outlined prop', () => {
  test('adds the outlined class when outlined:true is passed as a prop', () => {
    const wrapper = mount(Tag, {
      props: {
        outlined: true
      }
    })

    expect(wrapper.classes()).toContain('outlined')
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

    expect(wrapper.classes()).not.toContain('outlined')
  })
})

describe('flat prop', () => {
  test('adds the flat class when flat is passed as a prop', () => {
    const wrapper = mount(Tag, {
      props: {
        flat: true
      }
    })

    expect(wrapper.classes()).toContain('flat')
  })

  test("doesn't pass the outlined class when outlined is not passed as a prop", () => {
    const wrapper = mount(Tag, {
      props: {}
    })

    expect(wrapper.classes()).not.toContain('flat')
  })
})

describe('icon prop', () => {
  test('displays an icon when one is passed', () => {
    const wrapper = mount(Tag, {
      props: {
        icon: 'pi-fire-line'
      }
    })

    expect(wrapper.findAll('i').length).toEqual(1)
  })

  test("doesn't render an icon element when none is passed", () => {
    const wrapper = mount(Tag, {
      props: {}
    })

    expect(wrapper.findAll('i').length).toEqual(0)
  })
})

describe('hovered prop', () => {
  test('adds the hovered class when hovered:true is passed as a prop', () => {
    const wrapper = mount(Tag, {
      props: {
        hovered: true
      }
    })

    expect(wrapper.classes()).toContain('hovered')
  })

  test('check if the computed style contains the hovered prop if updated', async () => {
    const wrapper = mount(Tag, {
      props: { hovered: false }
    })
    await wrapper.setProps({ hovered: true })
    expect(wrapper.vm.classList).toContain('hovered')
  })

  test("doesn't pass the hovered class when hovered is not passed as a prop", () => {
    const wrapper = mount(Tag, {
      props: {}
    })

    expect(wrapper.classes()).not.toContain('hovered')
  })
})
