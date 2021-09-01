import { mount } from '@vue/test-utils'
import Popup from './Popup.vue'
import PopupContent from './PopupContent.vue'
import Card from '../Card/Card.vue'


beforeEach(() => {
  // create teleport target
  const el = document.createElement('div')
  el.id = 'pop'
  document.body.appendChild(el)
})

afterEach(() => {
  // clean up
  document.body.outerHTML = ''
})

test('loads PopupContent component when modelValue/v-model is true', () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>'}, global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(true)
})

test('does not load PopUpContent component when modelValue/v-model is false', () => {
  const wrapper = mount(Popup, {props: {modelValue: false, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>'}, global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(false)
})

test('loads the activate slot', () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }, global: {
    components: {
      Card: Card
    }
  }})
  expect(wrapper.get('#test-button').text()).toEqual('Test')
})

test('loads the content slot', () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }, global: {
    components: {
      Card: Card
    }
  }})
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.html()).toContain('Main Content')
})

test('emits close and update:modelValue as false when the background is clicked', async () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start'}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }, global: {
    components: {
      Card: Card
    }
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

test('passes popup teleport placement and attaches to element if it exists', () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start', teleportTo: '#pop'}, slots: {
    content: '<div>Main Content</div>'}, global: {
      components: {
        Card: Card
      }
    }
  })
  expect(wrapper.props().teleportTo).toBe('#pop')
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(true)
})

test('passes popup teleport placement and does not attach if no element with correct id', () => {
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'flex-start', teleportTo: '#poppy'}, slots: {
    content: '<div>Main Content</div>'}, global: {
      components: {
        Card: Card
      }
    }
  })
  expect(wrapper.props().teleportTo).toBe('#poppy')
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(false)
})

test('passes popup position', () => {
  const position = 'flex-start'
  const wrapper = mount(Popup, {props: {modelValue: true, position}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }, global: {
    components: {
      Card: Card
    }
  }})
  const modal = wrapper.findComponent(PopupContent)
  const divOne = modal.get('#backdrop')
  expect(divOne.attributes().style).toBe(`--position-place: ${position};`)
})

test('has center as default position', () => {
  const position = 'center'
  const wrapper = mount(Popup, {props: {modelValue: true}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }, global: {
    components: {
      Card: Card
    }
  }})
  const modal = wrapper.findComponent(PopupContent)
  const divOne = modal.get('#backdrop')
  expect(divOne.attributes().style).toBe(`--position-place: ${position};`)
})

test('passes popup title', () => {
  const title = 'My Pop Up'
  const wrapper = mount(Popup, {props: {modelValue: true, position: 'center', title}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }, global: {
    components: {
      Card: Card
    }
  }})
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.find('h4').text()).toContain(title)
})

test('passes popup height and width', () => {
  const title = 'My Pop Up'
  const wrapper = mount(Popup, {props: {modelValue: true, title, height: '200px', width: '300px'}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }, global: {
    components: {
      Card: Card
    }
  }})
  const modal = wrapper.findComponent(PopupContent)
  const card = modal.findComponent(Card)
  const cardProps = card.props()
  expect(cardProps.height).toBe('200px')
  expect(cardProps.width).toBe('300px')
})

test('uses default popup height and width if non passed', () => {
  const title = 'My Pop Up'
  const wrapper = mount(Popup, {props: {modelValue: true, title}, slots: {
    content: '<div>Main Content</div>' , activate: '<button id="test-button">Test</button>'
  }, global: {
    components: {
      Card: Card
    }
  }})
  const modal = wrapper.findComponent(PopupContent)
  const card = modal.findComponent(Card)
  const cardProps = card.props()
  expect(cardProps.height).toBe('269px')
  expect(cardProps.width).toBe('350px')
})

  