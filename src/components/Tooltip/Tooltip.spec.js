import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'

// slot
test('displays text in the text slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Tooltip, {
    slots: {
      text: text
    }
  })

  const tooltip = wrapper.get('[data-test="text"]')
  expect(tooltip.text()).toBe(text)
})

test('displays el in the text slot', () => {
  const el = '<div>text</div>'
  const wrapper = mount(Tooltip, {
    slots: {
      text: el
    }
  })

  const tooltip = wrapper.get('[data-test="text"]').find('div')
  expect(tooltip.html()).toContain(el)
})

test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Tooltip, {
    slots: {
      default: text
    }
  })

  const tooltip = wrapper.get('[data-test="default"]')
  expect(tooltip.text()).toBe(text)
})

test('displays el in the default slot', () => {
  const el = '<button>button</button>'
  const wrapper = mount(Tooltip, {
    slots: {
      default: el
    }
  })

  const tooltip = wrapper.get('[data-test="default"]').find('button')
  expect(tooltip.html()).toContain(el)
})

// props
