import { mount } from '@vue/test-utils'
import List from './List.vue'

test('list contains 2 options when nothing is passed in', () => {
  const wrapper = mount(List)

  const list = wrapper.get('.list')
  const options = list.findAll('input[type="radio"]')
  expect(options).toHaveLength(2)
})
describe('icons', () => {
  test('option does not contain icon by default', () => {
    const wrapper = mount(List)

    const list = wrapper.get('.list')
    expect(list.find('i').exists()).toBe(false)
  })

  test('option contains icon if defined', () => {
    const wrapper = mount(List, { props: { icon: true } })

    const list = wrapper.get('.list')
    expect(list.find('i').exists()).toBe(true)
  })
})
describe('disabled state', () => {
  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(List, { props: { disabled: true } })

    const list = wrapper.get('.list')

    expect(list.attributes('disabled')).toBeDefined()
  })

  test("doesn't pass the disabled attribute when disabled:false is passed as a prop", () => {
    const wrapper = mount(List, { props: { disabled: false } })

    const list = wrapper.get('.list')

    expect(list.attributes('disabled')).toBeUndefined()
  })
})
describe('data passing', () => {
  test('emit selected option', async () => {
    const wrapper = mount(List)
    const list = wrapper.get('.list')
    await list.setValue('Option 2')
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('Option 2')
  })

  test('updating prop also changes value', async () => {
    const wrapper = mount(List)
    await wrapper.setProps({ value: 'New Option' })
    const input = wrapper.get('.list')
    expect(input.attributes('value')).toEqual('New Option')
  })
})
