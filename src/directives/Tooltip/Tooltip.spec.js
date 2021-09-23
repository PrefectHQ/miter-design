import { mount } from '@vue/test-utils'
import * as Module from './Tooltip.ts'
const TooltipDirective = Module.TooltipDirective
import Tooltip from '../../components/Tooltip/Tooltip.vue'
import { nextTick } from 'vue'

const factoryMount = (position = '', text = '') => {
  return mount(
    { template: `<div v-tooltip:[position]="text">Foo</div>` },
    {
      data() {
        return {
          position,
          text
        }
      },
      global: {
        directives: {
          Tooltip: TooltipDirective
        }
      }
    }
  )
}
const waitNT = (ctx) => new Promise((resolve) => ctx.$nextTick(resolve))
// note: Failing..
describe('mounted hook', () => {
  test('mounting', async () => {
    /*
    note: 
     similar to the example in the vue test docs of using attachTo -
    creates a div and appends it the body then create our template using 
    the directive and use attachTo to append to the newly created div 
     */
    const App = {
      directives: {
        Tooltip: TooltipDirective
      },
      template: `<div v-tooltip>Foo</div>`
    }

    const container = document.createElement('div')
    document.body.appendChild(container)
    const wrapper = mount(App, {
      attachTo: container
    })
    // wrapper.element.tagName => DIV

    const div = wrapper.find('div')
    // note: if it does a  mouseenter, I would think it would mount the tooltip component
    // note: (line 34 - tooltip.ts) and we would be able to do document.body.querySelector or something similar?
    await div.trigger('mouseenter')
    // await waitNT(wrapper.vm)
    console.log(wrapper)
  })

  // test('does not append component when mounted', () => {
  //   const wrapper = factoryMount()
  //   expect(wrapper.find('#tooltip-container').exists()).toBe(false)
  // })
  // test('appends the component on mouseenter', async () => {
  //   const wrapper = factoryMount()
  //   await wrapper.trigger('mouseenter')
  //   expect(wrapper.find('#tooltip-container').exists()).toBe(true)
  // })
  // test('removes the component on mouseleave', async () => {
  //   const wrapper = factoryMount()
  //   await wrapper.trigger('mouseleave')
  //   expect(wrapper.find('#tooltip-container').exists()).toBe(false)
  // })
})

// note: Failing
describe('arguments', () => {
  // test('content is passed if provided', async () => {
  //   const wrapper = factoryMount('right', 'Hello')
  //   await wrapper.trigger('mouseenter')
  //   expect(wrapper.find('.tooltip-content').text()).toBe('Hello')
  // })
  // test('position is passed if provided ', async () => {
  //   const wrapper = factoryMount('right')
  //   await wrapper.trigger('mouseenter')
  //   expect(wrapper.find('#tooltip-container').classes()).toContain('right')
  // })
})
