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

describe('Tooltip directive object', () => {
  test('has the mounted method', () => {
    expect(Tooltip.mounted).toBeDefined()
  })

  test('has the updated method', () => {
    expect(Tooltip.updated).toBeDefined()
  })

  test('has the unmounted method', () => {
    expect(Tooltip.unmounted).toBeDefined()
  })
})

describe('classes', () => {
  test('current element has the tooltip-box class', () => {
    const wrapper = factoryMount()
    expect(wrapper.classes()).toContain('tooltip-box')
  })
  test('current element has the right class if a position was passed', () => {
    const wrapper = factoryMount('right')
    expect(wrapper.classes()).toContain('right')
  })

  test('current element defaults to the top class if a position was not passed', () => {
    const wrapper = factoryMount()
    expect(wrapper.classes()).toContain('top')
  })
})

describe('argument', () => {
  test('displays text if passed', () => {
    const wrapper = factoryMount('right', 'Hello')
    expect(wrapper.get('.tooltip-content').text()).toBe('Hello')
  })

  test('displays default text if not passed', () => {
    const wrapper = factoryMount()
    expect(wrapper.get('.tooltip-content').text()).toBe('text')
  })
})
