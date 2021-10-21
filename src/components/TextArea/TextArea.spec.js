import { mount } from '@vue/test-utils'
import TextArea from './TextArea.vue'

describe('Props', () => {
  test('displays title', () => {
    const wrapper = mount(TextArea, {
      props: {
        label: 'Default'
      }
    })
    const label = wrapper.get('label')
    expect(label.text()).toBe('Default')
  })

  test('displays subtitle', () => {
    const wrapper = mount(TextArea, {
      props: {
        subtitle: 'Sub'
      }
    })
    const subtitle = wrapper.get('.textarea__subtitle')
    expect(subtitle.text()).toBe('Sub')
  })

  test('passes maxLength', () => {
    const wrapper = mount(TextArea, {
      props: {
        maxLength: 5
      }
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('maxlength')).toBe('5')
  })

  test('passes minlength', () => {
    const wrapper = mount(TextArea, {
      props: {
        minLength: 2
      }
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('minlength')).toBe('2')
  })
})

describe('Emit', () => {
  test('emits value', async () => {
    const wrapper = mount(TextArea, {
      props: {
        modelValue: 'At'
      }
    })
    const textarea = wrapper.get('textarea')
    await textarea.setValue('Test again')
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('Test again')
  })
})

describe('disabled state', () => {

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(TextArea, {
      props: {
        disabled: true,
      }
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('disabled')).toBeDefined()
  })
})
