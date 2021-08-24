import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Tabs from './Tabs.vue'
import Tab from './Tab/Tab.vue'

window.HTMLElement.prototype.scrollIntoView = jest.fn()

const factoryMount = (props = {}, slots = {}) => {
  return mount(Tabs, {
    props: {
      ...props
    },
    slots: {
      ...slots
    }
  })
}

describe('slots', () => {
  test('displays 2 tabs when nothing is provided in the default slot', () => {
    const wrapper = factoryMount()

    const container = wrapper.get('.tabs-container')
    const tabs = container.findAll('.tab')

    expect(tabs).toHaveLength(2)
    expect(tabs[0].text()).toBe('Tab 1')
    expect(tabs[1].text()).toBe('Tab 2')
  })

  test('displays tabs passed in the default slot', async () => {
    const wrapper = factoryMount(
      {},
      {
        // Using functions for the default slot in the renderer avoids Vue warns
        default: () => [
          h(Tab, () => 'Red Basil'),
          h(Tab, () => 'Cilantro'),
          h(Tab, () => 'Chives')
        ]
      }
    )

    const container = wrapper.get('.tabs-container')
    const tabs = container.findAll('.tab')

    expect(tabs).toHaveLength(3)
    expect(tabs[0].text()).toBe('Red Basil')
    expect(tabs[1].text()).toBe('Cilantro')
    expect(tabs[2].text()).toBe('Chives')
  })
})

describe('model', () => {
  test('updates the model when a tab child is activated', () => {
    const texts = ['Red Basil', 'Cilantro', 'Chives']
    const hrefs = ['basil', 'cilantro', 'chives']
    const wrapper = factoryMount(
      {},
      {
        // Using functions for the default slot in the renderer avoids Vue warns
        default: () =>
          texts.map((t, i) => {
            return h(Tab, { href: hrefs[i] }, () => t)
          })
      }
    )

    const container = wrapper.get('.tabs-container')
    const tabs = container.findAll('.tab')

    tabs[0].trigger('mouseup')
    tabs[1].trigger('mouseup')
    tabs[2].trigger('mouseup')
    tabs[0].trigger('mouseup')

    const emit = wrapper.emitted('update:modelValue')

    expect(emit[0][0]).toEqual(hrefs[0])
    expect(emit[1][0]).toEqual(hrefs[1])
    expect(emit[2][0]).toEqual(hrefs[2])
    expect(emit[3][0]).toEqual(hrefs[0])
  })
})

describe('props', () => {
  describe('color prop', () => {
    test('defaults to the primary color when no color prop is passed', () => {
      const wrapper = factoryMount()

      const container = wrapper.get('.tabs-container')

      expect(container.classes()).toContain('primary')
    })

    test('passes the color prop as a class when passed', () => {
      const wrapper = factoryMount({ color: 'success' })

      const container = wrapper.get('.tabs-container')

      expect(container.classes()).toContain('success')
    })
  })

  describe('outlined prop', () => {
    test("doesn't apply the outlined class when outlined prop isn't passed", () => {
      const wrapper = factoryMount()

      const container = wrapper.get('.tabs-container')

      expect(container.classes()).not.toContain('outlined')
    })

    test('applies the outlined class when outlined is passed', () => {
      const wrapper = factoryMount({ outlined: true })

      const container = wrapper.get('.tabs-container')

      expect(container.classes()).toContain('outlined')
    })
  })
})
