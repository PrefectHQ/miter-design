import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'
import Popover from '../../components/Popover/Popover.vue'
import { mount } from '../mount'

export const PopoverDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    el.addEventListener('mouseenter', () => {
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
    })

    el.addEventListener('mouseleave', () => {
      document.getElementById('tooltip-container')?.parentElement?.remove()
    })
  }
}

export default PopoverDirective
