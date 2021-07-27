import { mount } from '@vue/test-utils'
import Avatar from './Avatar.vue'

// Test that it displays the text or icon in the default slot
test('displays text in the default slot', () => {
  const text = 'TS!'
  const wrapper = mount(Avatar, {
    slots: {
      default: text
    }
  })

  const avatar = wrapper.get('[data-test="default"]')

  expect(avatar.text()).toBe(text)
})

// Test for the color prop
// NOTE: What should be the default color when no prop is provided - primary or grey?
describe('color prop', () => {
  test('defaults to the primary  when no color prop is passed', () => {
    const wrapper = mount(Avatar, {
      props: {}
    })

    const avatar = wrapper.get('.avatar')
    expect(avatar.classes()).toContain('primary')
  })

  test('passes the color prop as a class when passed', () => {
    const wrapper = mount(Avatar, {
      props: { color: 'error' }
    })

    const avatar = wrapper.get('.avatar')

    expect(avatar.classes()).toContain('error')
  })
})

/*
Test for the size prop:

The size prop allows you to define the height and width of Avatar component. 
This prop scales both evenly with an aspect ratio of 1. 

TODO: Ask how we want to size this. Size prop or indivdual height and width?

*/
