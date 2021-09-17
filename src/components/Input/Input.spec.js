import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Slots', () => {
  test('displays icon in the prepend slot', () => {
    const wrapper = mount(Input, {
      slots: {
        prepend: `<i class="pi pi-Search pi-2x"></i>`
      }
    })

    const icon = wrapper.get('[data-test="prepend"]')
    expect(icon.html()).toBe(
      `<span class="prepend" data-test="prepend"><i class="pi pi-Search pi-2x"></i></span>`
    )
  })

  test('displays text in the append slot', () => {
    const wrapper = mount(Input, {
      slots: {
        append: `<span>Info</span>`
      }
    })

    const append = wrapper.get('[data-test="append"]')
    expect(append.text()).toBe(`Info`)
  })
})

describe('Props', () => {
  test('displays label', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Default'
      }
    })
    const label = wrapper.get('[data-test="label"]')
    expect(label.text()).toBe('Default')
  })

  test('displays subtitle', () => {
    const wrapper = mount(Input, {
      props: {
        subtitle: 'Sub'
      }
    })
    const subtitle = wrapper.get('[data-test="subtitle"]')
    expect(subtitle.text()).toBe('Sub')
  })

  test('passes valid state', () => {
    const wrapper = mount(Input, {
      props: {
        valid: false
      }
    })
    const input = wrapper.get('[data-test="default"]')
    expect(input.attributes('valid')).toBe('false')
  })

  test('passes maxLength', () => {
    const wrapper = mount(Input, {
      props: {
        maxLength: 5,
        modelValue: 'Test'
      }
    })
    const input = wrapper.get('[data-test="default"]')
    expect(input.attributes('maxlength')).toBe('5')
    expect(input.attributes('valid')).toBe('true')
  })

  test('passes minlength', () => {
    const wrapper = mount(Input, {
      props: {
        minLength: 2,
        modelValue: 'Test'
      }
    })
    const input = wrapper.get('[data-test="default"]')
    expect(input.attributes('minlength')).toBe('2')
  })

  test('passes pattern', () => {
    const wrapper = mount(Input, {
      props: {
        pattern: '/',
        modelValue: 'Test'
      }
    })
    const input = wrapper.get('[data-test="default"]')
    expect(input.attributes('pattern')).toBe('/')
  })
})

describe('Emits Input', () => {
  test('emits value', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'At'
      }
    })
    const input = wrapper.get('input')
    await input.setValue('Test again')
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe('Test again')
  })
})

describe('active state', () => {
  const wrapper = mount(Input, {
    props: {
      modelValue: 'Input'
    }
  })
  const input = wrapper.get('input')

  test('focus adds the active class', async () => {
    await input.trigger('focus')
    expect(input.classes()).toContain('active')
  })

  test('blur removes the active class', async () => {
    await input.trigger('focus')
    expect(input.classes()).toContain('active')
    await input.trigger('blur')
    expect(input.classes()).not.toContain('active')
  })
})

describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true,
        modelValue: '3'
      }
    })
    const inputElement = wrapper.get('input')
    expect(inputElement.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true,
        modelValue: '3'
      }
    })
    const inputElement = wrapper.get('input')
    expect(inputElement.attributes('disabled')).toBeDefined()
  })
})

describe('error state', () => {
  test('adds the error class when valid:false is passed as a prop', () => {
    const wrapper = mount(Input, {
      props: {
        valid: false,
        modelValue: '3'
      }
    })
    const inputElement = wrapper.get('input')
    expect(inputElement.classes()).toContain('invalid')
  })

  test('emits invalid', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'At',
        required: true
      }
    })
    const input = wrapper.get('input')
    await input.setValue('')
    expect(input.classes()).toContain('invalid')
    expect(wrapper.emitted('invalid')[0][0]).toBeTruthy()
  })
})
