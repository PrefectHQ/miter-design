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

  test('sets disabled to false when disabled:false is passed as a prop', () => {
    const wrapper = mount(List, { props: { disabled: false } })

    const list = wrapper.get('.list')

    expect(list.attributes('disabled')).toContain('false')
  })
})
test('emit selected option', async () => {
  const wrapper = mount(List, {
    props: {
      value: 'Option 1'
    }
  })
  const option = wrapper.get('input[type="radio"]')
  option.element.selected = true
  await option.trigger('change')
  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('Option 1')
})
