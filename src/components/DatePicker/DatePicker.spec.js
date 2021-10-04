import { mount } from '@vue/test-utils'
import DatePicker from './DatePicker.vue'


describe('Props', () => {

  test('displays v model month and year', () => {
    const day = '2021-10-04T19:09:53.864Z'
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: day
      }
    })
    const monthDisplay = wrapper.get('[data-test="month"]')
    expect(monthDisplay.text()).toBe('October 2021')
  })

  })

  describe('updates month on arrow click', ()=> {
      test('increment month', async ()=> { 
    const day = '2021-10-04T19:09:53.864Z'
      const wrapper = mount(DatePicker, {
          props: {
              modelValue: day
          }
      })
      const monthDisplay = wrapper.get('[data-test="month"]')
      expect(monthDisplay.text()).toBe('October 2021')
      const button = wrapper.get('[data-test="next"]')
      await button.trigger('click')
      expect(monthDisplay.text()).toBe('November 2021')
  })

  test('decrement month', async ()=> { 
    const day = '2021-10-04T19:09:53.864Z'
      const wrapper = mount(DatePicker, {
          props: {
              modelValue: day
          }
      })
      const monthDisplay = wrapper.get('[data-test="month"]')
      expect(monthDisplay.text()).toBe('October 2021')
      const button = wrapper.get('[data-test="previous"]')
      await button.trigger('click')
      expect(monthDisplay.text()).toBe('September 2021')
  })
})


// describe('Emits selected date', () => {
//   test('emits value', async () => {
//     const wrapper = mount(DatePicker, {
//       props: {
//         modelValue: '0'
//       }
//     })
//     const input = wrapper.get('input')
//     await input.setValue(3)
//     expect(wrapper.emitted('update:modelValue')[0][0]).toBe(3)
//   })
// })


// describe('disabled state', () => {
//   test('adds the disabled class when disabled:true is passed as a prop', () => {
//     const wrapper = mount(DatePicker, {
//       props: {
//         disabled: true,
//         modelValue: '3'
//       }
//     })
//     const inputElement = wrapper.get('[data-test="outer"]')
//     expect(inputElement.classes()).toContain('disabled')
//   })

//   test('adds the disabled attribute when disabled:true is passed as a prop', () => {
//     const wrapper = mount(DatePicker, {
//       props: {
//         disabled: true,
//         modelValue: '3'
//       }
//     })
//     const inputElement = wrapper.get('input')
//     expect(inputElement.attributes('disabled')).toBeDefined()
//   })
// })

