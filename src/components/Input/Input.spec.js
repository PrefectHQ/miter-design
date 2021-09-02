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
})