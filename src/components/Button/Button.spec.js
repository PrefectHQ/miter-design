import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import IconButton from './IconButton.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Button, {
    slots: {
      default: text
    }
  })

  const button = wrapper.get('[data-test="default"]')

  expect(button.text()).toBe(text)
})

describe('icon and text', () => {
  test('displays icon prop with text if passed', () => {
    const wrapper = mount(Button, {
      props: { icon: 'bug-2-line' },
      slots: { default: 'Foo' }
    })
    const button = wrapper.get('button')

    expect(button.text()).toBe('Foo')
    expect(button.classes()).toContain('icon')
  })

  test('does not display icon prop with text if not passed', () => {
    const wrapper = mount(Button, {
      props: {},
      slots: { default: 'Foo' }
    })
    const button = wrapper.get('button')

    expect(button.text()).toBe('Foo')
    expect(button.classes()).not.toContain('icon')
  })
})

describe('color prop', () => {
  test('defaults to the secondary color when no color prop is passed', () => {
    const wrapper = mount(Button, {
      props: {}
    })

    const button = wrapper.get('button')

    expect(button.classes()).toContain('secondary')
  })

  test('passes the color prop as a class when passed', () => {
    const wrapper = mount(Button, {
      props: { color: 'primary' }
    })

    const button = wrapper.get('button')

    expect(button.classes()).toContain('primary')
  })
})

describe('miter prop', () => {
  test('defaults to rectangle when no miter prop is passed', () => {
    const wrapper = mount(Button, {
      props: {}
    })

    const button = wrapper.get('button')

    expect(button.classes()).not.toContain('miter')
  })

  test('passes the miter prop as a class when passed', () => {
    const wrapper = mount(Button, {
      props: { miter: true }
    })

    const button = wrapper.get('button')

    expect(button.classes()).toContain('miter')
  })
})

describe('IconButton - icon prop', () => {
  test('displays the passed icon if passed', () => {
    const wrapper = mount(IconButton, {
      props: { icon: 'bug-2-line' }
    })
    expect(wrapper.get('i').classes()).toContain('bug-2-line')
  })

  test('does not display an icon if not passed', () => {
    const wrapper = mount(IconButton, {
      props: {}
    })

    expect(wrapper.get('i').classes()).not.toContain('bug-2-line')
  })
})

describe('Button - icon prop', () => {
  test('defaults to the block button when no icon prop is passed', () => {
    const wrapper = mount(Button, {
      props: {}
    })

    const button = wrapper.get('button')

    expect(button.classes()).not.toContain('icon')
  })

  test('passes the icon prop as a class when passed', () => {
    const wrapper = mount(Button, {
      props: { icon: 'bug-2-line' }
    })

    const button = wrapper.get('button')

    expect(button.classes()).toContain('icon')
  })
})

describe('IconButton - disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(IconButton, {
      props: {
        disabled: true
      }
    })

    const button = wrapper.get('button')

    expect(button.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(IconButton, {
      props: {
        disabled: true
      }
    })

    const button = wrapper.get('button')

    expect(button.attributes('disabled')).toBeDefined()
  })

  test("doesn't pass the disabled attribute when disabled:false is passed as a prop", () => {
    const wrapper = mount(IconButton, {
      props: {
        disabled: false
      }
    })

    const button = wrapper.get('button')

    expect(button.attributes('disabled')).toBeUndefined()
  })
})

describe('Button - disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })

    const button = wrapper.get('button')

    expect(button.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })

    const button = wrapper.get('button')

    expect(button.attributes('disabled')).toBeDefined()
  })

  test("doesn't pass the disabled attribute when disabled:false is passed as a prop", () => {
    const wrapper = mount(Button, {
      props: {
        disabled: false
      }
    })

    const button = wrapper.get('button')

    expect(button.attributes('disabled')).toBeUndefined()
  })
})

describe('hovered and focused states', () => {
  const wrapper = mount(Button, {})
  const button = wrapper.get('button')

  test('mouseenter adds the hovered class and mouseleave removes the hovered class', async () => {
    await button.trigger('mouseenter')
    expect(button.classes()).toContain('hovered')

    await button.trigger('mouseleave')
    expect(button.classes()).not.toContain('hovered')
  })

  test('keyboard focus adds the hovered class and keyboard blur removes the hovered class', async () => {
    await button.trigger('focus')
    expect(button.classes()).toContain('hovered')

    await button.trigger('blur')
    expect(button.classes()).not.toContain('hovered')
  })
})

describe('active states', () => {
  const wrapper = mount(Button, {})
  const button = wrapper.get('button')

  test('mousedown adds the active class and mouseup removes the active class', async () => {
    await button.trigger('mousedown')
    expect(button.classes()).toContain('active')

    await button.trigger('mouseup')
    expect(button.classes()).not.toContain('active')
  })

  test('keydown.enter adds the active class and keyup.enter removes the active class', async () => {
    await button.trigger('keydown', { key: 'Enter' })
    expect(button.classes()).toContain('active')

    await button.trigger('keyup', { key: 'Enter' })
    expect(button.classes()).not.toContain('active')
  })

  test('keydown.space adds the active class and keyup.space removes the active class', async () => {
    await button.trigger('keydown', { key: 'Space' })
    expect(button.classes()).toContain('active')

    await button.trigger('keyup', { key: 'Space' })
    expect(button.classes()).not.toContain('active')
  })
})
