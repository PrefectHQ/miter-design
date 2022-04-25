import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Popover from './Popover.vue'
import PopoverContent from './PopoverContent'

class DOMRect {}

global.DOMRect = DOMRect

afterEach(() => {
  const content = document.querySelector('.popover-content')

  if(content) {
    content.remove()
  }
});

describe('Arrow', () => {
  test('arrow has correct position class', async () => {
    const wrapper = mount(Popover, {
      props: { 
        placement: 'right'
      }
    })

    wrapper.vm.openPopover()

    // magical number of nextTicks. 
    // todo: refactor openPopover to be async
    await nextTick()
    await nextTick()
    await nextTick()
    
    const popupContent = wrapper.findComponent(PopoverContent)
    const arrowClass = popupContent.find('.popover-content__body')

    expect(arrowClass.classes()).toContain('popover-content__body--arrow-right')
  })
})

describe('loads popover', () => {

  test('does load component when popover is open', async () => {
    const wrapper = mount(Popover)

    wrapper.vm.openPopover()
    await nextTick()
    
    const popupcontent = wrapper.findComponent(PopoverContent)

    expect(popupcontent.exists()).toBe(true)
  })

  test('does not load component when popover is not open', () => {
    const wrapper = mount(Popover)
    const popupcontent = wrapper.findComponent(PopoverContent)

    expect(popupcontent.exists()).toBe(false)
  })

})

describe('slots', () => {
  test('loads the trigger slot', () => {
    const wrapper = mount(Popover, {
      slots: {
        trigger: `<button id="opener">Test</button>`
      }
    })

    expect(wrapper.text()).toContain('Test')
  })

  test('loads the content slot', async () => {
    const wrapper = mount(Popover, {
      slots: {
        default: 'Main Content',
      }
    })

    wrapper.vm.openPopover()
    await nextTick()
    
    const popupcontent = wrapper.findComponent(PopoverContent)
    
    expect(popupcontent.text()).toBe('Main Content')
  })
})

describe('props', () => {
  test('passes popover teleport placement and attaches to element if it exists', async () => {
    const wrapper = mount(Popover)

    wrapper.vm.openPopover()
    await nextTick()

    const popupcontent = wrapper.findComponent(PopoverContent)

    expect(popupcontent.exists()).toBe(true)
  })

  test('passes popover title', async () => {
    const title = 'My Pop Up'
    const wrapper = mount(Popover, {
      props: {
        title
      }
    })

    wrapper.vm.openPopover()
    await nextTick()

    const popupcontent = wrapper.findComponent(PopoverContent)

    expect(popupcontent.text()).toContain(title)
  })

  test('has top as default placement', () => {
    const wrapper = mount(Popover)

    expect(wrapper.props().placement).toBe('top')
  })

  test('disabled prop prevents open', async () => {
    const wrapper = mount(Popover, {
      props: {
        disabled: true
      }
    })

    wrapper.vm.openPopover()
    await nextTick()

    const popupcontent = wrapper.findComponent(PopoverContent)

    expect(popupcontent.exists()).toBe(false)
  })
})
