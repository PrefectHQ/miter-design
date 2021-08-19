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

test('teleports to app', async () => {
  const wrapper = mount(Popup, {props: {modelValue: true}, slots: {
    content: '<div>Main Content</div>'
  }})

  const modal = wrapper.findComponent(Popcontent)
  console.log('modal', modal.html())
  expect(modal.html()).toContain('Main Content')
})