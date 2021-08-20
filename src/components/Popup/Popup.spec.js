import { mount } from '@vue/test-utils'
import Popup from './Popup.vue'
import PopupContent from './PopupContent.vue'


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

test('loads PopupContent component when modelValue/v-model is true', () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>'
  }})
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(true)
})

test('does not load PopUpContent component when modelValue/v-model is false', () => {
  const wrapper = mount(Popup, {props: {modelValue: false, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>'
  }})
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(false)
})

test('loads the activate slot', () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }})
  expect(wrapper.get('#test-button').text()).toEqual('Test')
})

test('loads the content slot', () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }})
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.html()).toContain('Main Content')
})

test('emits close and update:modelValue as false when the background is clicked', async () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }})
  const modal = wrapper.findComponent(PopupContent)
  const divOne = modal.get('#backdrop')
  await divOne.trigger('click')
  const closeEvent = modal.emitted('close')
  expect(closeEvent).toHaveLength(1)
  expect(closeEvent[0]).toEqual([false])
  const outerCloseEvent = wrapper.emitted('update:modelValue')
  expect(outerCloseEvent).toHaveLength(1)
  expect(outerCloseEvent[0]).toEqual([false])
})

test('passes popup position', () => {
  const position = 'flex-start'
  const wrapper = mount(Popup, {props: {modelValue: true, position}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }})
  const modal = wrapper.findComponent(PopupContent)
  const divOne = modal.get('#backdrop')
  expect(divOne.attributes().style).toBe(`--position-place: ${position};`)
})
  