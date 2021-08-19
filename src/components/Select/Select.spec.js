import { mount } from '@vue/test-utils'
import Select from './Select.vue'

test('select component contains 2 options when nothing is passed in', () => {
  const wrapper = mount(Select)

  const list = wrapper.get('.list')
  const options = list.findAll('.option')
  expect(options).toHaveLength(2)
})

test('options passed as props are displayed in component', () => {
  const optionProp = ['First', 'Second', 'Third']
  const wrapper = mount(Select, { props: { options: optionProp } })

  const list = wrapper.get('.list')
  const options = list.findAll('.option')
  options.forEach((option, i) => expect(option.text()).toBe(optionProp[i]))
})

describe('icons', () => {
  test('option does not contain icon by default', () => {
    const wrapper = mount(Select)

    const list = wrapper.get('.list')
    expect(list.find('i').exists()).toBe(false)
  })

  test('option contains icon if defined', () => {
    const wrapper = mount(Select, { props: { icon: 'Fire' } })

    const list = wrapper.get('.list')
    expect(list.find('i').exists()).toBe(true)
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
  const wrapper = mount(Select)
  const picker = wrapper.get('.picker')
  const option = wrapper.get('.option')

  test('mouseenter adds the hovered class and mouseleave removes the hovered class', async () => {
    await wrapper.trigger('mouseenter')
    expect(picker.classes()).toContain('hovered')

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

  test('keydown.down adds the hovered class to the first option', async () => {
    await picker.trigger('keydown', { key: 'Down' })
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

  test('keydown.enter adds the active class and keydown.enter removes the active class', async () => {
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(picker.classes()).toContain('active')

    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(picker.classes()).not.toContain('active')
  })

  test('keydown.esc removes the active class', async () => {
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(picker.classes()).toContain('active')

    await wrapper.trigger('keydown', { key: 'Esc' })
    expect(picker.classes()).not.toContain('active')
  })

  test('keydown.space adds the active class and keydown.space removes the active class', async () => {
    await wrapper.trigger('keydown', { key: 'Space' })
    expect(picker.classes()).toContain('active')

    await wrapper.trigger('keydown', { key: 'Space' })
    expect(picker.classes()).not.toContain('active')
  })
})
test('emit selected option', async () => {
  const wrapper = mount(Select, {
    props: {
      value: 'Option 1'
    }
  })
  const option = wrapper.get('.option')
  option.element.selected = true
  await option.trigger('click')
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('Option 1')
})
