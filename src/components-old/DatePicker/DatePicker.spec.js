import { mount } from '@vue/test-utils'
import DatePicker from './DatePicker.vue'
import { nextTick, forceUpdate } from 'vue'

describe('V-Model', () => {
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

  test('emits date', async () => {
    const day = '2021-10-04T19:09:53.864Z'
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: day
      }
    })
    const button = wrapper.get('[data-test="day"]')
    await button.trigger('click')
    expect(wrapper.emitted('update:modelValue')[0][0].toString()).toContain(
      'Oct 01'
    )
  })
})

describe('updates month on arrow click', () => {
  test('increment month', async () => {
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

  test('decrement month', async () => {
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

// test('sets today', async () => {
//   const day = new Date()
//   day.setMonth(day.getMonth() + 1)

//   const month = new Date().getMonth()
//   const months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
//   ]
//   const wrapper = mount(DatePicker, {
//     props: {
//       modelValue: day
//     }
//   })

//   const monthDisplay = wrapper.get('[data-test="month"]')
  
//   expect(monthDisplay.text()).toContain(months[day.getMonth()])
  
//   const button = wrapper.get('[data-test="today"]')
//   await button.trigger('click')
  
//   await nextTick()

//   const monthDisplayAfter = wrapper.get('[data-test="month"]')

//   expect(monthDisplayAfter.text()).toContain(months[month])
// })
