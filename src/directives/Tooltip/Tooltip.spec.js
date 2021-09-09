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

describe('arguments', () => {
  test('displays text if passed', () => {
    const wrapper = factoryMount('right', 'Hello')
  })

  test('displays default text if not passed', () => {
    const wrapper = factoryMount('right', '')
  })

  test('current element has the right class if a position was passed', () => {
    const wrapper = factoryMount('right')
  })

  test('current element defaults to the top class if a position was not passed', () => {
    const wrapper = factoryMount()
  })
})
