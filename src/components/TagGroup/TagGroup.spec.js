import { mount } from '@vue/test-utils'

import TagGroup from './TagGroup.vue'
import Tag from './Tag.vue'

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
  test('displays 2 tags when nothing is provided in the default slot', () => {
    const wrapper = factoryMount()
  })
})
