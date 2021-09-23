import { mount } from '@vue/test-utils'
import Popover from './Popover.vue'
import PopoverContent from './PopoverContent'

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

test('loads component when modelValue/v-model is true', () => {
  const wrapper = mount(Popover, {
    props: { modelValue: true, position: 'top', target: 'opener' },
    slots: {
      default: '<div>Main Content</div>',
      activator: `<button id="opener">Test</button>`
    }
  })
  const popupcontent = wrapper.findComponent(PopoverContent)
  expect(popupcontent.exists()).toBe(true)
})

test('does not load component when modelValue/v-model is false', () => {
  const wrapper = mount(Popover, {
    props: { modelValue: false, position: 'top', target: 'opener' },
    slots: {
      default: '<div id="content" >Main Content</div>',
      activate: `<button id="opener">Test</button>`
    }
  })
  const popupcontent = wrapper.findComponent(PopoverContent)
  expect(popupcontent.exists()).toBe(false)
})

test('loads the activate slot', () => {
  const wrapper = mount(Popover, {
    props: { modelValue: true, position: 'top', target: 'opener' },
    slots: {
      default: '<div id="content">Main Content</div>',
      activate: `<button id="opener">Test</button>`
    }
  })
  expect(wrapper.get('#opener').text()).toEqual('Test')
})

test('loads the content slot', () => {
  const wrapper = mount(Popover, {
    props: { modelValue: true, position: 'top', target: 'opener' },
    slots: {
      default: '<div id="content" >Main Content</div>',
      activate: `<button id="opener">Test</button>`
    }
  })
  const popupcontent = wrapper.findComponent(PopoverContent)
  expect(popupcontent.html()).toContain('Main Content')
})

// test('emits close and update:modelValue as false when the background is clicked', async () => {
//   const wrapper = mount(Popover, {
//     props: { modelValue: true, position: 'top' },
//     slots: {
//       content: '<div>Main Content</div>',
//       activate: '<button id="test-button">Test</button>'
//     },
//     global: {
//       components: {
//         Card: Card
//       }
//     }
//   })
//   const popupcontent = wrapper.findComponent(Popover)
//   const divOne = popupcontent.get('#backdrop')
//   await divOne.trigger('click')
//   const closeEvent = popupcontent.emitted('close')
//   expect(closeEvent).toHaveLength(1)
//   expect(closeEvent[0]).toEqual([false])
//   const outerCloseEvent = wrapper.emitted('update:modelValue')
//   expect(outerCloseEvent).toHaveLength(1)
//   expect(outerCloseEvent[0]).toEqual([false])
// })

// test('passes popover teleport placement and attaches to element if it exists', () => {
//   const wrapper = mount(Popover, {
//     props: { modelValue: true, position: 'top', teleportTo: '#pop' },
//     slots: {
//       content: '<div>Main Content</div>'
//     },
//     global: {
//       components: {
//         Card: Card
//       }
//     }
//   })
//   expect(wrapper.props().teleportTo).toBe('#pop')
//   const popupcontent = wrapper.findComponent(Popover)
//   expect(popupcontent.exists()).toBe(true)
// })

// test('passes popover teleport placement and does not attach if no element with correct id', () => {
//   const wrapper = mount(Popover, {
//     props: { modelValue: true, position: 'top', teleportTo: '#poppy' },
//     slots: {
//       content: '<div>Main Content</div>'
//     },
//     global: {
//       components: {
//         Card: Card
//       }
//     }
//   })
//   expect(wrapper.props().teleportTo).toBe('#poppy')
//   const popupcontent = wrapper.findComponent(Popover)
//   expect(popupcontent.exists()).toBe(false)
// })

// test('passes popover position', () => {
//   const position = 'top'
//   const wrapper = mount(Popover, {
//     props: { modelValue: true, position },
//     slots: {
//       content: '<div>Main Content</div>',
//       activate: '<button id="test-button">Test</button>'
//     },
//     global: {
//       components: {
//         Card: Card
//       }
//     }
//   })
//   const popupcontent = wrapper.findComponent(Popover)
//   const divOne = popupcontent.get('#backdrop')
//   expect(divOne.attributes().style).toBe(`--position-place: ${position};`)
// })

// test('has top as default position', () => {
//   const wrapper = mount(Popover, {
//     props: { modelValue: true },
//     slots: {
//       content: '<div>Main Content</div>',
//       activate: '<button id="test-button">Test</button>'
//     },
//     global: {
//       components: {
//         Card: Card
//       }
//     }
//   })
//   console.log('wrapper', wrapper)
//   const popupcontent = wrapper.findComponent(Popover)
//   const divOne = popupcontent.get('#backdrop')
//   expect(divOne.attributes().style).toBe(`--position-place: ${position};`)
// })

// test('passes popover title', () => {
//   const title = 'My Pop Up'
//   const wrapper = mount(Popover, {
//     props: { modelValue: true, position: 'top', title },
//     slots: {
//       content: '<div>Main Content</div>',
//       activate: '<button id="test-button">Test</button>'
//     },
//     global: {
//       components: {
//       }
//     }
//   })
//   const popupcontent = wrapper.findComponent(Popover)
//   expect(popupcontent.find('h4').text()).toContain(title)
// })

// test('passes popover height and width', () => {
//   const title = 'My Pop Up'
//   const wrapper = mount(Popover, {
//     props: { modelValue: true, title, height: '200px', width: '300px' },
//     slots: {
//       content: '<div>Main Content</div>',
//       activate: '<button id="test-button">Test</button>'
//     },
//     global: {
//       components: {
//       }
//     }
//   })
//   const popupcontent = wrapper.findComponent(Popover)
// })

// describe('focus trap', () => {
//   test('applies focus to close button on mount', async () => {
//     const wrapper = mount(Popover, {
//       attachTo: document.body,
//       props: { modelValue: true },
//       slots: {
//         content: '<div>Main Content</div>',
//         actions: '<Button id="pop-button">Pop Up Button</Button>',
//         activate: '<button id="test-button">Test</button>'
//       },
//       global: {
//         components: {
//           Button: Button
//         }
//       }
//     })
//     const popupcontent = wrapper.findComponent(Popover)
//     const close = popupcontent.find('[data-test="closeButton"]')
//     //Wait until component hovered class applied when focus is called on mount
//     await setTimeout(() => {}, 500)
//     expect(close.classes()).toContain('hovered')
//   })

//   test('closes pop up on escape', async () => {
//     const wrapper = mount(Popover, {
//       attachTo: document.body,
//       props: { modelValue: true },
//       slots: {
//         content: '<div>Main Content</div>',
//         actions: '<Button id="pop-button">Pop Up Button</Button>',
//         activate: '<button id="test-button">Test</button>'
//       },
//       global: {
//         components: {
//           Button: Button
//         }
//       }
//     })
//     const popupcontent = wrapper.findComponent(Popover)
//     const backdrop = popupcontent.find('#backdrop')
//     await backdrop.trigger('keydown.escape')
//     const closeEvent = popupcontent.emitted('close')
//     expect(closeEvent).toHaveLength(1)
//     expect(closeEvent[0]).toEqual([false])
//     const outerCloseEvent = wrapper.emitted('update:modelValue')
//     expect(outerCloseEvent).toHaveLength(1)
//     expect(outerCloseEvent[0]).toEqual([false])
//   })
// })

