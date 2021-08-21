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
    const tags = container.findAll('.tag-wrapper')

    expect(tags).toHaveLength(2)
    expect(tags[0].text()).toBe('Tag 1')
    expect(tags[1].text()).toBe('Tag 2')
  })

  test('displays tags passed in the default slot', () => {
    const wrapper = factoryMount(
      {},
      {
        default: () => [h(Tag, () => 'One'), h(Tag, () => 'Two')]
      }
    )

    const container = wrapper.get('.tag-group-container')
    const tags = container.findAll('.tag-wrapper')

    expect(tags[0].text()).toBe('One')
    expect(tags[1].text()).toBe('Two')
  })
})

describe('props', () => {
  test('outline prop is passed when tag is not clicked', () => {
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
    const tags = container.findAll('.tag-wrapper')
    expect(tags[0].classes()).toContain('outlined')
    expect(tags[1].classes()).toContain('outlined')
  })

  test('outline prop is not passed when tag is clicked', async () => {
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
    const tags = container.findAll('.tag-wrapper')

    await tags[0].trigger('click')
    await tags[1].trigger('click')

    expect(tags[0].classes()).not.toContain('outlined')
    expect(tags[1].classes()).not.toContain('outlined')

    await tags[0].trigger('click')
    await tags[1].trigger('click')
  })

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

describe('model', () => {
  test('multiple selection', async () => {
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
    const tags = container.findAll('.tag-wrapper')

    await tags[0].trigger('click')
    await tags[1].trigger('click')

    const emit = wrapper.emitted('update:modelValue')

    expect(emit).toHaveLength(2)
    expect(emit[0][0][0]).toEqual(0)
    expect(emit[1][0][1]).toEqual(1)
  })

  test('single selection', async () => {
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
    const tags = container.findAll('.tag-wrapper')

    await tags[0].trigger('click')
    const one = wrapper.emitted('update:modelValue')
    expect(one[0][0][0]).toEqual(0)

    await tags[1].trigger('click')
    const two = wrapper.emitted('update:modelValue')
    expect(two[0][0][0]).toEqual(1)
  })
})
