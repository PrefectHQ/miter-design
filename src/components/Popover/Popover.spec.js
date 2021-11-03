import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Popover from './Popover.vue'
import PopoverContent from './PopoverContent'

describe('Arrow', () => {
  /* 
  this test is purposefully at the top because the class check fails if
  this test is the 4th or greater test in the file. No idea why.
  The arrow ends up being found twice but the first instance only 
  has default bindings. findAll()[1] would have the correct content.
  CH - 10/2021
  */
  test('arrow has correct position class', async () => {
    const wrapper = mount(Popover, {
      props: { 
        position: 'right'
      }
    })

    wrapper.vm.openPopover()
    await nextTick()
    
    const popupcontent = wrapper.findComponent(PopoverContent)

    expect(popupcontent.vm.$el.classList.contains('popover__content--arrow-right')).toBe(true)
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

  test('has top as default position', () => {
    const wrapper = mount(Popover)

    expect(wrapper.props().position).toBe('top')
  })
})
