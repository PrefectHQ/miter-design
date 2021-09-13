import { mount } from '@vue/test-utils'
import * as Module from './Tooltip.ts'
const Tooltip = Module.TooltipDirective

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
          Tooltip: Tooltip
        }
      }
    }
  )
}

describe('argument', () => {
  test('displays text if passed', () => {
    const wrapper = factoryMount('right', 'Hello')
    console.log(wrapper.html())
    expect(wrapper.find('.tooltip-content').text()).toBe('Hello')
  })

  test('displays default text if not passed', () => {
    const wrapper = factoryMount()
    expect(wrapper.get('.tooltip-content').text()).toBe('')
  })
})
