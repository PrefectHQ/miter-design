import { mount } from '@vue/test-utils'
import Tabs from './Tabs.vue'

test('displays 2 tabs when nothing is provided in the default slot', () => {
  const wrapper = mount(Tabs, {})

  const container = wrapper.get('.tabs-container')
  const tabs = container.findAll('.tab')

  expect(tabs).toHaveLength(2)
  expect(tabs[0].text()).toBe('Tab 1')
  expect(tabs[1].text()).toBe('Tab 2')
})
