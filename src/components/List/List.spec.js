import { mount } from '@vue/test-utils'
import List from './List.vue'

test('list contains placeholder + 2 options when nothing is passed in', () => {
  const wrapper = mount(List)

  const list = wrapper.get('select')
  const options = list.findAll('option')
  expect(options).toHaveLength(3)
})

test('option does not contain icon by default', () => {
  const wrapper = mount(List)

  const list = wrapper.get('select')
  expect(list.find('i').exists()).toBe(false)
})

test('option contains icon if defined', () => {
  const wrapper = mount(List, { props: { icon: true } })

  const list = wrapper.get('select')
  expect(list.find('i').exists()).toBe(true)
})

test('adds the disabled attribute when disabled:true is passed as a prop', () => {
  const wrapper = mount(List, { props: { disabled: true } })

  const list = wrapper.get('select')

  expect(list.attributes('disabled')).toBeDefined()
})

test("doesn't pass the disabled attribute when disabled:false is passed as a prop", () => {
  const wrapper = mount(List, { props: { disabled: false } })

  const list = wrapper.get('select')

  expect(list.attributes('disabled')).toBeUndefined()
})
