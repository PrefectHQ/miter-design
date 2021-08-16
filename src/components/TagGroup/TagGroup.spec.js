import { mount } from '@vue/test-utils'
import { h } from 'vue'

import TagGroup from './TagGroup'
import Tag from '../Tag/Tag'

const factoryMount = (props = {}, slots = {}) => {
  return mount(TagGroup, {
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

    const container = wrapper.get('.tag-group-container')
    const tags = container.findAll('.tag')

    expect(tags).toHaveLength(2)
    expect(tags[0].text()).toBe('Tag 1')
    expect(tags[1].text()).toBe('Tag 2')
  })

  test('displays tags passed in the default slot', async () => {
    const wrapper = factoryMount(
      {},
      {
        default: () => [
          h(Tag, () => 'One'),
          h(Tag, () => 'Two'),
          h(Tag, () => 'Three')
        ]
      }
    )

    const container = wrapper.get('.tag-group-container')
    const tags = container.findAll('.tag')

    expect(tags).toHaveLength(3)
    expect(tags[0].text()).toBe('One')
    expect(tags[1].text()).toBe('Two')
    expect(tags[2].text()).toBe('Three')
  })
})

describe('model', () => {
  test('multiple', () => {
    const wrapper = factoryMount(
      { multiple: true },
      {
        default: () =>
          ['one', 'two'].map((t, i) => {
            return h(Tag, { value: i }, () => t)
          })
      }
    )

    const container = wrapper.get('.tag-group-container')
    const tags = container.findAll('.tag')

    tags[0].trigger('click')
    tags[1].trigger('click')

    const emit = wrapper.emitted('update:modelValue')

    expect(emit[0][0][0]).toEqual(0)
    expect(emit[0][0][1]).toEqual(1)
  })

  test('single', () => {
    const wrapper = factoryMount(
      {},
      {
        default: () =>
          ['one', 'two'].map((t, i) => {
            return h(Tag, { value: i }, () => t)
          })
      }
    )

    const container = wrapper.get('.tag-group-container')
    const tags = container.findAll('.tag')

    tags[0].trigger('click')

    const emit = wrapper.emitted('update:modelValue')
    expect(emit[0][0][0]).toEqual(1)
  })
})

describe('props', () => {
  describe('multiple  prop', () => {
    test('multiple prop is false when not passed', () => {
      const wrapper = factoryMount()

      expect(wrapper.props().multiple).toBe(false)
    })

    test('multiple prop is true when passed', () => {
      const wrapper = factoryMount({ multiple: true })

      expect(wrapper.props().multiple).toBe(true)
    })
  })
})
