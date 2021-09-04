import { mount } from '@vue/test-utils'
import * as Module from './Tooltip.ts'
const Tooltip = Module.TooltipDirective

const Component = {
  data() {
    return {
      position: 'right',
      text: 'Hello'
    }
  },
  template: `<div v-tooltip:[position]="text">Foo</div>`
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
    const wrapper = mount(Component, {
      global: {
        directives: {
          Tooltip: Tooltip
        }
      }
    })

    expect(wrapper.classes()).toContain('tooltip-box')
  })
  test('current element has the right class', () => {
    const wrapper = mount(Component, {
      global: {
        directives: {
          Tooltip: Tooltip
        }
      }
    })

    expect(wrapper.classes()).toContain('right')
  })
})

describe('props', () => {
  test('displays text', () => {
    const wrapper = mount(Component, {
      global: {
        directives: {
          Tooltip: Tooltip
        }
      }
    })
    expect(wrapper.get('.tooltip-content').text()).toBe('Hello')
  })
})
