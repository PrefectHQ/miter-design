import * as Module from './Tooltip.ts'
import { mount } from '@vue/test-utils'
const Tooltip = Module.TooltipDirective

describe('Skeleton mounted hook', () => {
  test('calls the applyClass method if the directive value is true', () => {
    Tooltip.mounted({}, { position: 'right' })
    console.log(Module)
  })
})
