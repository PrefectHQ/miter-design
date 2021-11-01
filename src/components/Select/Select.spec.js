import { mount } from '@vue/test-utils'
import Select from './Select.vue'
import Option from './Option.vue'
import SelectContent from './SelectContent.vue'

class DOMRect {}

global.DOMRect = DOMRect

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


test('the passed value is selected when the component is mounted', async () => {
  const wrapper = factoryMount(
    {
      modelValue: 'value2',
      options: [
        { label: 'Label1', value: 'value1' },
        { label: 'Label2', value: 'value2' },
        { label: 'Label3', value: 'value3' }
      ]
    }
  )

  const select = wrapper.get('.select__input')
  await select.trigger('click')

  const content = wrapper.findComponent(SelectContent)
  const option = content.get('.option--selected')

  expect(option.text()).toEqual('Label2')
})

describe('icons', () => {
  test('option does not contain icon by default', () => {
    const option = mount(Option, { props: { value: 'First' } })
    expect(option.find('i').exists()).toBe(false)
  })

  test('option contains icon if defined', () => {
    const option = mount(Option, {
      props: { value: 'First', icon: 'Fire' }
    })
    expect(option.find('i').exists()).toBe(true)
  })
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Select, { props: { disabled: true } })

    const select = wrapper.get('.select')

    expect(select.classes('select--disabled')).toBe(true)
  })

  test('does not add disabled class when disabled:false is passed as a prop', () => {
    const wrapper = mount(Select, { props: { disabled: false } })

    const select = wrapper.get('.select')

    expect(select.classes('select--disabled')).toBe(false)
  })
})

describe('required state', () => {
  test('adds the required class when required:true is passed as a prop', () => {
    const wrapper = mount(Select, { props: { required: true } })

    const select = wrapper.get('.select')

    expect(select.classes('select--invalid')).toBe(true)
  })

  test('does not add required class when required:false is passed as a prop', () => {
    const wrapper = mount(Select, { props: { required: false } })

    const select = wrapper.get('.select')

    expect(select.classes('select--invalid')).toBe(false)
  })

  test('does not add required class when required:true is passed as a prop but a value is set', () => {
    const wrapper = mount(Select, { 
      props: { 
        modelValue: 'value',
        required: false 
      } 
    })

    const select = wrapper.get('.select')

    expect(select.classes('select--invalid')).toBe(false)
  })
})

test('emit selected option', async () => {
  const wrapper = factoryMount(
    {
      options: [
        { label: 'Label', value: 'value' }
      ]
    }
  )

  const select = wrapper.get('.select__input')
  await select.trigger('click')

  const content = wrapper.findComponent(SelectContent)
  const option = content.get('.option')

  await option.trigger('click')

  expect(wrapper.emitted('update:modelValue')[0][0]).toEqual('value')
})