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

  test('passes the color prop as a class when passed', () => {
    const wrapper = mount(Tag, {
      props: { color: 'primary' }
    })

    const tag = wrapper.get('.tag')

    expect(tag.classes()).toContain('primary')
  })
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Tag, {
      props: {
        disabled: true
      }
    })

    const tag = wrapper.get('.tag')

    expect(tag.classes()).toContain('disabled')
  })
})

describe('hovered state', () => {
  const wrapper = mount(Tag, {})
  const tag = wrapper.get('.tag')

  test('mouseenter adds the hovered class and mouseleave removes the hovered class', async () => {
    await tag.trigger('mouseenter')
    expect(tag.classes()).toContain('hovered')

    await tag.trigger('mouseleave')
    expect(tag.classes()).not.toContain('hovered')
  })
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Tag, {
      props: {
        disabled: true
      }
    })

    const tag = wrapper.get('.tag')

    expect(tag.classes()).toContain('disabled')
  })
})

describe('selected state', () => {
  test('adds the selected class when selected:true is passed as a prop', () => {
    const wrapper = mount(Tag, {
      props: {
        selected: true
      }
    })

    const tag = wrapper.get('.tag')

    expect(tag.classes()).toContain('selected')
  })

  test("doesn't pass the selected attribute when selected:false is passed as a prop", () => {
    const wrapper = mount(Tag, {
      props: {
        selected: false
      }
    })

    const tag = wrapper.get('.tag')

    expect(tag.attributes('selected')).toBeUndefined()
  })
})

describe('active states', () => {
  const wrapper = mount(Tag, {})
  const tag = wrapper.get('.tag')

  test('mousedown adds the active class and mouseup removes the active class', async () => {
    await tag.trigger('mousedown')
    expect(tag.classes()).toContain('active')

    await tag.trigger('mouseup')
    expect(tag.classes()).not.toContain('active')
  })

  test('keydown.enter adds the active class and keyup.enter removes the active class', async () => {
    await tag.trigger('keydown', { key: 'Enter' })
    expect(tag.classes()).toContain('active')

    await tag.trigger('keyup', { key: 'Enter' })
    expect(tag.classes()).not.toContain('active')
  })

  test('keydown.space adds the active class and keyup.space removes the active class', async () => {
    await tag.trigger('keydown', { key: 'Space' })
    expect(tag.classes()).toContain('active')

    await tag.trigger('keyup', { key: 'Space' })
    expect(tag.classes()).not.toContain('active')
  })
})
