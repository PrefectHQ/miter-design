import { mount } from '@vue/test-utils'
import Tabs from './Tabs.vue'

test('displays 2 tabs when nothing is provided in the default slot', () => {
  const wrapper = mount(Tabs, {})

  const container = wrapper.get('.tabs-container')
  const tabs = container.get('.tab')
  expect(tabs).toHaveLength(2)
})
