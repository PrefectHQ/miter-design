import { mount } from '@vue/test-utils'
import Select from './Select.vue'
import Option from './Option.vue'
import { h } from 'vue'

const factoryMount = (props = {}, slots = {}) => {
  return mount(Select, {
    props: {
      ...props
    },
    slots: {
      ...slots
    }
  })
}

test('options passed in slots are displayed in component', async () => {
  const optionValues = ['First', 'Second', 'Third']
  const wrapper = factoryMount(
    {},
    {
      default: () => [
        h(Option, { value: 'First' }),
        h(Option, { value: 'Second' }),
        h(Option, { value: 'Third' })
      ]
    }
  )
  const picker = wrapper.get('.picker')
  await picker.trigger('click')

  const list = wrapper.get('.list')
  const options = list.findAll('.option')
  expect(options).toHaveLength(3)
  options.forEach((option, i) => expect(option.text()).toBe(optionValues[i]))
})

test('displays text in the active slot', async () => {
  const text = 'Hello, world!'
  const wrapper = factoryMount(
    {
      modelValue: 'First'
    },
    {
      active: text,
      default: () => [
        h(Option, { value: 'First' }),
        h(Option, { value: 'Second' }),
        h(Option, { value: 'Third' })
      ]
    }
  )
  const picker = wrapper.get('.picker > span')
  await picker.trigger('click')

  expect(picker.text()).toBe(text)
})

describe('icons', () => {
  test('option does not contain icon by default', async () => {
    const option = mount(Option, { props: { value: 'First' } })
    expect(option.find('i').exists()).toBe(false)
  })

  test('option contains icon if defined', async () => {
    const option = mount(Option, {
      props: { value: 'First', icon: 'Fire' }
    })
    expect(option.find('i').exists()).toBe(true)
  })
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Select, { props: { disabled: true } })

    const picker = wrapper.get('.picker')

    expect(picker.classes('disabled')).toBe(true)
  })

  test('does not add disabled class when disabled:false is passed as a prop', () => {
    const wrapper = mount(Select, { props: { disabled: false } })

    const picker = wrapper.get('.picker')

    expect(picker.classes('disabled')).toBe(false)
  })
})

describe('hover state', () => {
  const wrapper = factoryMount(
    {},
    { default: () => [h(Option, { value: 'First' })] }
  )
  const picker = wrapper.get('.picker')

  test('mouseenter adds the hovered class and mouseleave removes the hovered class', async () => {
    await wrapper.trigger('mouseenter')
    expect(picker.classes()).toContain('hovered')

    await picker.trigger('click')
    const option = wrapper.get('.option')

    await option.trigger('mouseenter')
    expect(option.classes()).toContain('hovered')

    await wrapper.trigger('mouseleave')
    expect(picker.classes()).not.toContain('hovered')

    await option.trigger('mouseleave')
    expect(option.classes()).not.toContain('hovered')
  })

  test('keyboard focus adds the hovered class and keyboard blur removes the hovered class', async () => {
    await wrapper.trigger('focus')
    expect(picker.classes()).toContain('hovered')

    await wrapper.trigger('blur')
    expect(picker.classes()).not.toContain('hovered')
  })

  test('arrow key adds the hovered class to option', async () => {
    await wrapper.trigger('keydown', { key: 'Enter' })
    const option = wrapper.get('.option')

    await wrapper.trigger('keydown', { key: 'ArrowDown' })
    expect(option.classes()).toContain('hovered')
  })
})

describe('active state', () => {
  const wrapper = mount(Select)
  const picker = wrapper.get('.picker')

  test('click adds and removes the active class', async () => {
    await picker.trigger('click')
    expect(picker.classes()).toContain('active')

    await picker.trigger('click')
    expect(picker.classes()).not.toContain('active')
  })

  test('keydown.enter adds and removes the active class', async () => {
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(picker.classes()).toContain('active')

    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(picker.classes()).not.toContain('active')
  })

  test('keydown.esc removes the active class', async () => {
    await wrapper.trigger('keydown', { key: 'Enter' })
    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(picker.classes()).not.toContain('active')
  })

  test('keydown.space adds and removes the active class', async () => {
    await wrapper.trigger('keydown', { code: 'Space' })
    expect(picker.classes()).toContain('active')

    await wrapper.trigger('keydown', { code: 'Space' })
    expect(picker.classes()).not.toContain('active')
  })
})

test('emit selected option', async () => {
  const wrapper = factoryMount(
    {},
    { default: () => [h(Option, { value: 'First' })] }
  )
  const picker = wrapper.get('.picker')
  await picker.trigger('click')

  const option = wrapper.get('.option')
  option.element.selected = true
  await option.trigger('click')
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('First')
})
