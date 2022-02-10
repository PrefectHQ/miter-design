import { mount } from '@vue/test-utils'
import Code from './Code.vue'

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Code, {
    slots: {
      default: text
    }
  })

  const code = wrapper.get('.code__content')

  expect(code.text()).toBe(text)
})

test('displays text in the file-name slot', () => {
  const text = 'test_file.js'
  const wrapper = mount(Code, {
    slots: {
      'file-name': text
    }
  })

  const code = wrapper.get('.code__file-name')

  expect(code.text()).toBe(text)
})

test('displays the copy button', () => {
  const text = ''
  const wrapper = mount(Code, {
    slots: {
      default: text
    }
  })


  expect(wrapper.find('.code__copy-button').exists()).toBe(true)
})

test('does\'t display the copy button if hide-copy-button is passed', () => {
  const text = ''
  const wrapper = mount(Code, {
    attrs: {
      'hide-copy-button': true
    },
    slots: {
      default: text
    }
  })


  expect(wrapper.find('.code__copy-button').exists()).toBe(false)
})