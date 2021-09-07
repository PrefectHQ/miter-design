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
  console.log(icon.html())
  expect(icon.html()).toBe(`<span class="prepend" data-test="prepend"><i class="pi pi-Search pi-2x"></i></span>`)
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
  console.log('label', label)
  expect(label.text()).toBe('Default')
})

test('displays subtitle', () => {
  const wrapper = mount(Input, {
    props: {
      subtitle: 'Sub'
    }
  })
  const subtitle = wrapper.get('[data-test="subtitle"]')
  console.log('sub', subtitle)
  expect(subtitle.text()).toBe('Sub')
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