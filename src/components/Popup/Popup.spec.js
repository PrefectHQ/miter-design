import { mount } from '@vue/test-utils'
import Popup from './Popup.vue'
import PopupContent from './PopupContent.vue'
import Card from '../Card/Card.vue'
import Button from '../Button/Button.vue'

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
  const wrapper = mount(Popup, {
    props: { modelValue: true, position: 'flex-start' },
    slots: {
      content: '<div>Main Content</div>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(true)
})

test('does not load PopUpContent component when modelValue/v-model is false', () => {
  const wrapper = mount(Popup, {
    props: { modelValue: false, position: 'flex-start' },
    slots: {
      content: '<div>Main Content</div>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(false)
})

test('loads the activate slot', () => {
  const wrapper = mount(Popup, {
    props: { modelValue: true, position: 'flex-start' },
    slots: {
      content: '<div>Main Content</div>',
      activate: '<button id="test-button">Test</button>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  expect(wrapper.get('#test-button').text()).toEqual('Test')
})

test('loads the content slot', () => {
  const wrapper = mount(Popup, {
    props: { modelValue: true, position: 'flex-start' },
    slots: {
      content: '<div>Main Content</div>',
      activate: '<button id="test-button">Test</button>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.html()).toContain('Main Content')
})

test('loads the title slot', () => {
  const wrapper = mount(Popup, {
    props: { modelValue: true, position: 'flex-start' },
    slots: {
      title: '<span>Title</span>',
      content: '<div>Main Content</div>',
      activate: '<button id="test-button">Test</button>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.html()).toContain('Title')
})

test('emits close and update:modelValue as false when the background is clicked', async () => {
  const wrapper = mount(Popup, {
    props: { modelValue: true, position: 'flex-start' },
    slots: {
      content: '<div>Main Content</div>',
      activate: '<button id="test-button">Test</button>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
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
  const wrapper = mount(Popup, {
    props: { modelValue: true, position: 'flex-start', to: '#pop' },
    slots: {
      content: '<div>Main Content</div>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  expect(wrapper.props().to).toBe('#pop')
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(true)
})

test('passes popup teleport placement and does not attach if no element with correct id', () => {
  const wrapper = mount(Popup, {
    props: { modelValue: true, position: 'flex-start', to: '#poppy' },
    slots: {
      content: '<div>Main Content</div>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  expect(wrapper.props().to).toBe('#poppy')
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.exists()).toBe(false)
})

test('passes popup position', () => {
  const position = 'flex-start'
  const wrapper = mount(Popup, {
    props: { modelValue: true, position },
    slots: {
      content: '<div>Main Content</div>',
      activate: '<button id="test-button">Test</button>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  const divOne = modal.get('#backdrop')
  expect(divOne.attributes().style).toBe(`--position-place: ${position};`)
})

test('has center as default position', () => {
  const position = 'center'
  const wrapper = mount(Popup, {
    props: { modelValue: true },
    slots: {
      content: '<div>Main Content</div>',
      activate: '<button id="test-button">Test</button>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  const divOne = modal.get('#backdrop')
  expect(divOne.attributes().style).toBe(`--position-place: ${position};`)
})

test('passes popup height and width', () => {
  const wrapper = mount(Popup, {
    props: { modelValue: true, height: '200px', width: '300px' },
    slots: {
      content: '<div>Main Content</div>',
      activate: '<button id="test-button">Test</button>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  const card = modal.findComponent(Card)
  const cardProps = card.props()
  expect(cardProps.height).toBe('200px')
  expect(cardProps.width).toBe('300px')
})

test('shows close button if showCloseButton is true', () => {
  const wrapper = mount(Popup, {
    props: { modelValue: true, position: 'center', showCloseButton: true },
    slots: {
      title: '<div>Title</div>',
      content: '<div>Main Content</div>',
      activate: '<button id="test-button">Test</button>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.find('h4').isVisible()).toBe(true)
})

test('does not show close button if showCloseButton is false', () => {
  const wrapper = mount(Popup, {
    props: { modelValue: true, position: 'center' },
    slots: {
      title: '<div>Title</div>',
      content: '<div>Main Content</div>',
      activate: '<button id="test-button">Test</button>'
    },
    global: {
      components: {
        Card: Card
      }
    }
  })
  const modal = wrapper.findComponent(PopupContent)
  expect(modal.find('h4').isVisible()).toBe(false)
})

describe('focus trap', () => {
  test('applies focus to close button on mount', async () => {
    const wrapper = mount(Popup, {
      attachTo: document.body,
      props: { modelValue: true },
      slots: {
        content: '<div>Main Content</div>',
        actions: '<Button id="pop-button">Pop Up Button</Button>',
        activate: '<button id="test-button">Test</button>'
      },
      global: {
        components: {
          Button: Button
        }
      }
    })
    const modal = wrapper.findComponent(PopupContent)
    const close = modal.find('[data-test="closeButton"]')
    //Wait until component hovered class applied when focus is called on mount
    await setTimeout(() => {}, 500)
    expect(close.classes()).toContain('hovered')
  })

  test('closes pop up on escape', async () => {
    const wrapper = mount(Popup, {
      attachTo: document.body,
      props: { modelValue: true },
      slots: {
        content: '<div>Main Content</div>',
        actions: '<Button id="pop-button">Pop Up Button</Button>',
        activate: '<button id="test-button">Test</button>'
      },
      global: {
        components: {
          Button: Button
        }
      }
    })
    const modal = wrapper.findComponent(PopupContent)
    const backdrop = modal.find('#backdrop')
    await backdrop.trigger('keydown.escape')
    const closeEvent = modal.emitted('close')
    expect(closeEvent).toHaveLength(1)
    expect(closeEvent[0]).toEqual([false])
    const outerCloseEvent = wrapper.emitted('update:modelValue')
    expect(outerCloseEvent).toHaveLength(1)
    expect(outerCloseEvent[0]).toEqual([false])
  })
})
