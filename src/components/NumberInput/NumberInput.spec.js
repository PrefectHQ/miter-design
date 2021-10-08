import { mount } from '@vue/test-utils'
import NumberInput from './NumberInput.vue'

describe('Props', () => {
  test('passes max', () => {
    const wrapper = mount(NumberInput, {
      props: {
        max: 5,
        modelValue: 'Test'
      }
    })
    const input = wrapper.get('[data-test="input"]')
    expect(input.attributes('max')).toBe('5')
  })

  test('passes min', () => {
    const wrapper = mount(NumberInput, {
      props: {
        min: 2,
        modelValue: 'Test'
      }
    })
    const input = wrapper.get('[data-test="input"]')
    expect(input.attributes('min')).toBe('2')
  })

  describe('Emits NumberInput', () => {
    test('emits value', async () => {
      const wrapper = mount(NumberInput, {
        props: {
          modelValue: '0'
        }
      })
      const input = wrapper.get('input')
      await input.setValue(3)
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(3)
    })
  })

  describe('disabled state', () => {
    test('adds the disabled attribute when disabled:true is set', () => {
      const wrapper = mount(NumberInput, {
        props: {
          disabled: true,
          modelValue: '3'
        }
      })
      const inputElement = wrapper.get('.number-input__container')
      expect(inputElement.attributes('disabled')).toBeDefined()
    })
  })

  test('Max is emitted if exists and value is greater', async () => {
    const max = 2
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 1,
        max
      }
    })
    const input = wrapper.get('input')
    
    await input.setValue(3)

    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(max)
  })

  test('Min is emitted if exists and value is less', async () => {
    const min = 2
    const wrapper = mount(NumberInput, {
      props: {
        modelValue: 1,
        min
      }
    })
    const input = wrapper.get('input')
    
    await input.setValue(0)

    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(min)
  })
})
