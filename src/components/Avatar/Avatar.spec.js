import { mount } from '@vue/test-utils'
import Avatar from './Avatar.vue'

// Test that it displays the text or icon in the default slot
test('displays text in the default slot', () => {
  const text = 'Hello!'
  const wrapper = mount(Avatar, {
    slots: {
      default: text
    }
  })

  const avatar = wrapper.get('[data-test="default"]')

  expect(avatar.text()).toBe(text)
})

// Test for the color prop

/*
Test for the size prop:

The size prop allows you to define the height and width of Avatar component. 
This prop scales both evenly with an aspect ratio of 1. 

TODO: Ask how we want to size this. Size prop or indivdual height and width?

*/
