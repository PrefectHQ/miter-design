import { mount } from '@vue/test-utils'
import Popup from './Popup.vue'
import Popcontent from './Popcontent.vue'


beforeEach(() => {
  // create teleport target
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)
})

afterEach(() => {
  // clean up
  document.body.outerHTML = ''
})

test('loads the content slot when modelValue/v-model is true', async () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>'
  }})
  const modal = wrapper.findComponent(Popcontent)
  expect(modal.exists()).toBe(true)
  expect(modal.html()).toContain('Main Content')
})

test('does not load the content slot when modelValue/v-model is false', async () => {
  const wrapper = mount(Popup, {props: {modelValue: false, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>'
  }})
  const modal = wrapper.findComponent(Popcontent)
  expect(modal.exists()).toBe(false)
})

test('loads the activate slot', async () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }})
  expect(wrapper.get('#test-button').text()).toEqual('Test')
})

test('loads the activate slot', async () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }})
  expect(wrapper.get('#test-button').text()).toEqual('Test')
})