import { mount } from '@vue/test-utils'
import Slider from './Slider.vue'





describe('disabled state', () => {
  test('adds the disabled class when disabled:true is passed as a prop', () => {
    const wrapper = mount(Slider, {
      props: {
        disabled: true,
        modelValue: '3'
      }
    })

    const slider = wrapper.get('input')

    expect(slider.classes()).toContain('disabled')
  })

  test('adds the disabled attribute when disabled:true is passed as a prop', () => {
    const wrapper = mount(Slider, {
      props: {
        disabled: true,
        modelValue: '3'
      }
    })

    const slider = wrapper.get('input')

    expect(slider.attributes('disabled')).toBeDefined()
  })

  test("doesn't pass the disabled attribute when disabled:false is passed as a prop", () => {
    const wrapper = mount(Slider, {
      props: {
        disabled: false,
        modelValue: '3'
      }
    })

    const slider = wrapper.get('input')

    expect(slider.attributes('disabled')).toBeUndefined()
  })
})

describe('active states', () => {
  const wrapper = mount(Slider, {})
  const slider = wrapper.get('input')

  test('mousedown adds the active class and mouseup removes the active class', async () => {
    await slider.trigger('mousedown')
    expect(slider.classes()).toContain('active')

    await slider.trigger('mouseup')
    expect(slider.classes()).not.toContain('active')
  })

  test('keydown.enter adds the active class and keyup.enter removes the active class', async () => {
    await slider.trigger('keydown', { key: 'Enter' })
    expect(slider.classes()).toContain('active')

    await slider.trigger('keyup', { key: 'Enter' })
    expect(slider.classes()).not.toContain('active')
  })

  test('keydown.space adds the active class and keyup.space removes the active class', async () => {
    await slider.trigger('keydown', { key: 'Space' })
    expect(slider.classes()).toContain('active')

    await slider.trigger('keyup', { key: 'Space' })
    expect(slider.classes()).not.toContain('active')
  })
})
