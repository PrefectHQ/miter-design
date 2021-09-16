import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'
import Popover from '../../components/Popover/Popover.vue'
import { mount } from '../mount'

export const PopoverDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    mount(
      Popover,
      {
        props: {
          currentElRect: el.getBoundingClientRect(),
          label: binding.arg.label,
          content: binding.arg.content,
          position: binding.arg.position
        }
      },
      el
    )
  }
}

export default PopoverDirective
