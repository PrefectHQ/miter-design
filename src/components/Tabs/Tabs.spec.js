import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Tabs from './Tabs.vue'
import Tab from './Tab/Tab.vue'

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

test('updates the model when a keyed child is activated', () => {
  const wrapper = factoryMount(
    {},
    {
      // Using functions for the default slot in the renderer avoids Vue warns
      default: () => [
        h(Tab, { href: 'basil' }, () => 'Red Basil'),
        h(Tab, { href: 'cilantro' }, () => 'Cilantro'),
        h(Tab, { href: 'chives' }, () => 'Chives')
      ]
    }
  )

  const container = wrapper.get('.tabs-container')
  const tabs = container.findAll('.tab')

  tabs[0].trigger('click')
  tabs[1].trigger('click')
  tabs[2].trigger('click')
  tabs[0].trigger('click')

  const firstClick = wrapper.emitted('click')
  const secondClick = wrapper.emitted('click')
  const thirdClick = wrapper.emitted('click')
  const fourthClick = wrapper.emitted('click')

  expect(firstClick).toEqual(tabs[0].key)
  expect(secondClick).toEqual(tabs[1].key)
  expect(thirdClick).toEqual(tabs[2].key)
  expect(fourthClick).toEqual(tabs[0].key)
})
