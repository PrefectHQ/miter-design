import { mount } from '@vue/test-utils'
import Timepicker from './Timepicker.vue'

describe('v-model', () => {
  test('displays v model hour', () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })
    const hourDisplay = wrapper.findAll('.number-input__input')[0].element.value
    expect(hourDisplay).toBe('6')
  })

  test('displays v model minute', () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const minuteDisplay = wrapper.findAll('.number-input__input')[1].element
      .value
    expect(minuteDisplay).toBe('18')
  })

  test('displays v model meridiem', () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })
    const meridiemDisplay = wrapper.findAll('.number-input__input')[2].element
      .value
    expect(meridiemDisplay).toBe('PM')
  })
})

describe('sets hour, minute, and meridiem', () => {
  test('sets meridiem', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const meridiemDisplay = wrapper.findAll('.number-input__input')[2]
    await meridiemDisplay.setValue('AM')
    expect(meridiemDisplay.element.value).toBe('AM')
  })
  test('sets hour', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })
    const hourDisplay = wrapper.findAll('.number-input__input')[0]
    await hourDisplay.setValue(7)
    expect(Number(hourDisplay.element.value)).toBe(7)
  })

  test('sets minute', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })
    const minuteDisplay = wrapper.findAll('.number-input__input')[1]
    await minuteDisplay.setValue(19)
    expect(Number(minuteDisplay.element.value)).toBe(19)
  })
})
