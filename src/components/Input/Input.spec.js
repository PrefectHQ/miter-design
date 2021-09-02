import { mount } from '@vue/test-utils'
import Input from './Input.vue'

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