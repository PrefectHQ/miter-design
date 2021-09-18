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
    const subtitle = wrapper.get('.subtitle')
    expect(subtitle.text()).toBe('Sub')
  })

  test('hideLabel makes title not visible', () => {
    const wrapper = mount(TextArea, {
      props: {
        hideLabel: true
      }
    })
    const label = wrapper.get('label')
    expect(label.element.style.display).toBe('none')
  })

  test('passes valid state', () => {
    const wrapper = mount(TextArea, {
      props: {
        valid: false
      }
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('valid')).toBe('false')
  })

  test('passes maxLength', () => {
    const wrapper = mount(TextArea, {
      props: {
        maxLength: 5,
        modelValue: 'Test'
      }
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('maxlength')).toBe('5')
    expect(textarea.attributes('valid')).toBe('true')
  })

  test('passes minlength', () => {
    const wrapper = mount(TextArea, {
      props: {
        minLength: 2,
        modelValue: 'Test'
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

describe('active state', () => {
  const wrapper = mount(TextArea, {
    props: {
      modelValue: 'TextArea'
    }
  })
  const textarea = wrapper.get('textarea')

  test('mousedown adds the focused class', async () => {
    await textarea.trigger('mousedown')
    expect(textarea.classes()).toContain('focused')
  })

  test('blur removes the focused class', async () => {
    await textarea.trigger('mousedown')
    expect(textarea.classes()).toContain('focused')
    await textarea.trigger('blur')
    expect(textarea.classes()).not.toContain('focused')
  })
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(TextArea, {
      props: {
        disabled: true,
        modelValue: '3'
      }
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(TextArea, {
      props: {
        disabled: true,
        modelValue: '3'
      }
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('disabled')).toBeDefined()
  })
})

describe('error state', () => {
  test('adds the error class when valid:false is passed as a prop', () => {
    const wrapper = mount(TextArea, {
      props: {
        valid: false,
        modelValue: '3'
      }
    })
    const textarea = wrapper.get('textarea')
    expect(textarea.classes()).toContain('invalid')
  })

  test('adds error message when invalid', () => {
    const wrapper = mount(TextArea, {
      props: {
        valid: false
      },
      slots: {
        errorMessage: 'NO'
      }
    })
    const message = wrapper.get('.error-msg')
    expect(message.text()).toBe('NO')
  })

  test('emits invalid', async () => {
    const wrapper = mount(TextArea, {
      props: {
        modelValue: 'At',
        required: true
      }
    })
    const textarea = wrapper.get('textarea')
    await textarea.setValue('')
    expect(textarea.classes()).toContain('invalid')
    expect(wrapper.emitted('invalid')[0][0]).toBeTruthy()
  })
})
