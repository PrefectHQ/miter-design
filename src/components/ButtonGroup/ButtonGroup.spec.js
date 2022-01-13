import { mount } from '@vue/test-utils'
import ButtonGroup from './ButtonGroup.vue'

describe('Button Group', () => {

    it('displayed the correct number of buttons', () => {
      const items = [1, 2, 3]
      const wrapper = mount(ButtonGroup, {
        props: {
          items,
          value: []
        }
      })
    
      const buttons = wrapper.findAll('.m-button-group__button')
    
      expect(buttons.length).toBe(items.length)
    })

    it('is disabled when using the disabled prop', () => {
      const disabled = true
      const wrapper = mount(ButtonGroup, {
        props: {
          items: [],
          value: [],
          disabled
        }
      })
    
      const group = wrapper.find('.m-button-group')
    
      expect(group.wrapperElement.disabled).toBe(disabled)

    })

})
