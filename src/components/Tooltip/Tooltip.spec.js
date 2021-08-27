import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'

test('displays text in the text slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Tooltip, {
    slots: {
      text: text
    }
  })

  const tooltip = wrapper.get('[data-test="text"]')
  expect(tooltip.text()).toBe(text)
})

test('displays el in the text slot', () => {
  const el = '<div>text</div>'
  const wrapper = mount(Tooltip, {
    slots: {
      text: el
    }
  })

  const tooltip = wrapper.get('[data-test="text"]').find('div')
  expect(tooltip.html()).toContain(el)
})

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Tooltip, {
    slots: {
      default: text
    }
  })

  const tooltip = wrapper.get('[data-test="default"]')
  expect(tooltip.text()).toBe(text)
})

test('displays el in the default slot', () => {
  const el = '<button>button</button>'
  const wrapper = mount(Tooltip, {
    slots: {
      default: el
    }
  })

  const tooltip = wrapper.get('[data-test="default"]').find('button')
  expect(tooltip.html()).toContain(el)
})

describe('right prop', () => {
  test('passes the right prop as a class when passed', () => {
    const wrapper = mount(Tooltip, {
      props: { right: true }
    })

    expect(wrapper.classes()).toContain('right')
  })

  test('does not pass the right prop when no right prop is provided', () => {
    const wrapper = mount(Tooltip, {
      props: {}
    })
    expect(wrapper.classes()).not.toContain('right')
  })
})

describe('left prop', () => {
  test('passes the left prop as a class when passed', () => {
    const wrapper = mount(Tooltip, {
      props: { left: true }
    })

    expect(wrapper.classes()).toContain('left')
  })

  test('does not pass the left prop when no left prop is provided', () => {
    const wrapper = mount(Tooltip, {
      props: {}
    })
    expect(wrapper.classes()).not.toContain('left')
  })
})

describe('top prop', () => {
  test('passes the top prop as a class when no other prop is passed', () => {
    const wrapper = mount(Tooltip, {
      props: {}
    })

    expect(wrapper.classes()).toContain('top')
  })

  test('does not pass the top prop when another prop is passed', () => {
    const wrapper = mount(Tooltip, {
      props: { bottom: true }
    })
    expect(wrapper.classes()).not.toContain('top')
  })
})

describe('bottom prop', () => {
  test('passes the bottom prop as a class when passed', () => {
    const wrapper = mount(Tooltip, {
      props: { bottom: true }
    })

    expect(wrapper.classes()).toContain('bottom')
  })

  test('does not pass the bottom prop when no left prop is provided', () => {
    const wrapper = mount(Tooltip, {
      props: {}
    })
    expect(wrapper.classes()).not.toContain('bottom')
  })
})
