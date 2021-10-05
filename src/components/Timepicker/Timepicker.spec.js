import { mount } from '@vue/test-utils'
import Timepicker from './Timepicker.vue'
import NumberInput from '../NumberInput/NumberInput.vue'

describe('V-Model', () => {
  test('displays v model hour', () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })
    const hourDisplay = wrapper
      .findAllComponents(NumberInput)[0]
      .get('[data-test="default"]').element.value

    expect(hourDisplay).toBe('6')
  })

  test('displays v model minute', () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })
    const minuteDisplay = wrapper
      .findAllComponents(NumberInput)[1]
      .get('[data-test="default"]').element.value

    expect(minuteDisplay).toBe('18')
  })

  test('displays v model meridiem', () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })
    const meridiemDisplay = wrapper.get('.ampm-input').element.value
    expect(meridiemDisplay).toBe('PM')
  })
})

describe('updates hour, minute and meridiem on arrow click', () => {
  test('increment hour', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const hourDisplay = wrapper
      .findAllComponents(NumberInput)[0]
      .get('[data-test="default"]')

    const button = wrapper
      .findAllComponents(NumberInput)[0]
      .get('.spin-button-up')

    await button.trigger('click')

    expect(hourDisplay.element.value).toBe('7')
  })

  test('decrement hour', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const hourDisplay = wrapper
      .findAllComponents(NumberInput)[0]
      .get('[data-test="default"]')

    const button = wrapper
      .findAllComponents(NumberInput)[0]
      .get('.spin-button-down')

    await button.trigger('click')

    expect(hourDisplay.element.value).toBe('5')
  })

  test('increment minute', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const minuteDisplay = wrapper
      .findAllComponents(NumberInput)[1]
      .get('[data-test="default"]')

    const button = wrapper
      .findAllComponents(NumberInput)[1]
      .get('.spin-button-up')

    await button.trigger('click')

    expect(minuteDisplay.element.value).toBe('19')
  })

  test('decrement minute', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const minuteDisplay = wrapper
      .findAllComponents(NumberInput)[1]
      .get('[data-test="default"]')

    const button = wrapper
      .findAllComponents(NumberInput)[1]
      .get('.spin-button-down')

    await button.trigger('click')

    expect(minuteDisplay.element.value).toBe('17')
  })

  test('increment meridiem', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })
    const meridiemDisplay = wrapper.get('.ampm-input')
    const incrementBtn = wrapper.findAll('button')[4]
    await incrementBtn.trigger('click')
  })

  test('decrement meridiem', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const meridiemDisplay = wrapper.get('.ampm-input')
    const decrementBtn = wrapper.findAll('button')[5]
    await decrementBtn.trigger('click')
  })
})

describe('sets hour, minute, and meridiem', () => {
  test('sets the hour', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const hourDisplay = wrapper
      .findAllComponents(NumberInput)[0]
      .get('[data-test="default"]')

    await hourDisplay.setValue('8')

    expect(hourDisplay.element.value).toBe('8')
  })

  test('sets the minute', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const minuteDisplay = wrapper
      .findAllComponents(NumberInput)[1]
      .get('[data-test="default"]')

    await minuteDisplay.setValue('18')

    expect(minuteDisplay.element.value).toBe('18')
  })

  test('sets the meridiem', async () => {
    const day = new Date('2021-10-05T01:18:22.660Z')
    const wrapper = mount(Timepicker, {
      props: {
        modelValue: day
      }
    })

    const meridiemDisplay = wrapper.get('.ampm-input')
    await meridiemDisplay.setValue('AM')
    expect(meridiemDisplay.element.value).toBe('AM')
  })
})
