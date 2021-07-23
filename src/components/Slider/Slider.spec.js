import { mount } from '@vue/test-utils'
import Slider from './Slider.vue'


//States

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
  const wrapper = mount(Slider, {
    props: {
     disabled: false,
     modelValue: '3'
  }})
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

// Logic

describe('model', () => {
    test('updates the inner value', async () => {
        const wrapper = mount(Slider, {
            props: {
              disabled: true,
              modelValue: '3', 
              label: "test-label"
            }
          })
    expect(wrapper.find('input[type="range"]').element.value).toBe('3')
    const rangeInput = wrapper.find('input[type="range"]')
    await rangeInput.setValue('8')  
    expect(wrapper.find('input[type="range"]').element.value).toBe('8')
        })
    
    test('emits update:modelValue', async () => {
          const wrapper = mount(Slider, {
              props: {
                disabled: true,
                modelValue: '3', 
                label: "test-label"
              }
            })
      wrapper.vm.$emit('update:modelValue', '7')
      const emit = wrapper.emitted()
      expect(emit['update:modelValue'][0]).toEqual(['7'])
    })
  })