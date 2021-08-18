import { mount } from '@vue/test-utils'
import Select from './Select.vue'

test('select component contains 2 options when nothing is passed in', () => {
  const wrapper = mount(Select)

  const list = wrapper.get('.list')
  const options = list.findAll('.option')
  expect(options).toHaveLength(2)
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
