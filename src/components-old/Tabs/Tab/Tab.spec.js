import { mount } from '@vue/test-utils'
import Tab from './Tab.vue'

const factoryMount = (props = {}, slots = {}) => {
  return mount(Tab, {
    props: {
      ...props
    },
    slots: {
      ...slots
    }
  })
}

test('displays text in the default slot when none is provided', () => {
  const wrapper = factoryMount()

  const card = wrapper.get('button')
  expect(card.text()).toBe('Tab')
})

test('displays text in the default slot', () => {
  const text = 'My First Tab'
  const wrapper = factoryMount({}, { default: text })

  const card = wrapper.get('button')
  expect(card.text()).toBe(text)
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = factoryMount({
      disabled: true
    })

    const button = wrapper.get('button')

    expect(button.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = factoryMount({
      disabled: true
    })

    const button = wrapper.get('button')

    expect(button.attributes('disabled')).toBeDefined()
  })

  test("doesn't pass the disabled attribute when disabled:false is passed as a prop", () => {
    const wrapper = factoryMount({
      disabled: false
    })

    const button = wrapper.get('button')

    expect(button.attributes('disabled')).toBeUndefined()
  })
})

describe('hovered and focused states', () => {
  const wrapper = factoryMount()
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

describe('focused states', () => {
  const wrapper = factoryMount()
  const button = wrapper.get('button')

  test('mousedown adds the focused class and mouseup removes the focused class', async () => {
    await button.trigger('mousedown')
    expect(button.classes()).toContain('focused')

    await button.trigger('mouseup')
    expect(button.classes()).not.toContain('focused')
  })

  test('keydown.enter adds the focused class and keyup.enter removes the focused class', async () => {
    await button.trigger('keydown', { key: 'Enter' })
    expect(button.classes()).toContain('focused')

    await button.trigger('keyup', { key: 'Enter' })
    expect(button.classes()).not.toContain('active')
  })

  test('keydown.space adds the focused class and keyup.space removes the focused class', async () => {
    await button.trigger('keydown', { key: 'Space' })
    expect(button.classes()).toContain('focused')

    await button.trigger('keyup', { key: 'Space' })
    expect(button.classes()).not.toContain('focused')
  })
})
