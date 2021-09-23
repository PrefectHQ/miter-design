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

describe('loads popover', () => {
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
})

describe('slots', () => {
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
})

describe('props', () => {
  test('passes popover teleport placement and attaches to element if it exists', () => {
    const wrapper = mount(Popover, {
      props: {
        modelValue: true,
        position: 'top',
        teleportTo: '#pop',
        target: 'opener'
      },
      slots: {
        content: '<div>Main Content</div>'
      }
    })
    expect(wrapper.props().teleportTo).toBe('#pop')
    const popupcontent = wrapper.findComponent(PopoverContent)
    expect(popupcontent.exists()).toBe(true)
  })

  test('passes popover teleport placement and does not attach if no element with correct id', () => {
    const wrapper = mount(Popover, {
      props: {
        modelValue: true,
        position: 'top',
        teleportTo: '#poppy',
        target: 'opener'
      },
      slots: {
        content: '<div>Main Content</div>'
      }
    })
    expect(wrapper.props().teleportTo).toBe('#poppy')
    const popupcontent = wrapper.findComponent(PopoverContent)
    expect(popupcontent.exists()).toBe(false)
  })

  test('passes popover title', () => {
    const title = 'My Pop Up'
    const wrapper = mount(Popover, {
      props: { modelValue: true, target: 'opener', title },
      slots: {
        content: '<div>Main Content</div>',
        activate: '<button id="test-button">Test</button>'
      }
    })
    const popupcontent = wrapper.findComponent(PopoverContent)
    expect(popupcontent.find('header').text()).toContain(title)
  })

  test('passes popover position', () => {
    const position = 'right'
    const wrapper = mount(Popover, {
      props: { modelValue: true, position, target: 'opener' },
      slots: {
        content: '<div>Main Content</div>',
        activate: '<button id="test-button">Test</button>'
      }
    })
    const popupcontent = wrapper.findComponent(PopoverContent)
    const divOne = popupcontent.get('#tooltip-container')
    expect(divOne.classes()).toContain('right')
  })
})

describe('default', () => {
  test('has top as default position', () => {
    const wrapper = mount(Popover, {
      props: { modelValue: true, target: 'opener' },
      slots: {
        content: '<div>Main Content</div>',
        activate: '<button id="test-button">Test</button>'
      }
    })
    const popupcontent = wrapper.findComponent(PopoverContent)
    const divOne = popupcontent.get('#tooltip-container')
    expect(divOne.classes()).toContain('top')
  })
})
