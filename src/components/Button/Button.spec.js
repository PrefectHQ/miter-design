import { mount } from '@vue/test-utils'
import Button from './Button.vue'

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

describe('disabled state', () => {
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
