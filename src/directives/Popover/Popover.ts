import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'
import Popover from '../../components/Popover/Popover.vue'
import { mount } from '../mount'
import { h } from 'vue'

export const PopoverDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    el.setAttribute('id', 'popoverTarget')
    console.log(document.getElementById('tooltip-container'))
    el.addEventListener('mouseenter', () => {
      mount(
        Popover,
        {
          props: {
            currentElRect: 'popoverTarget',
            title: binding?.arg?.title,
            content: '',
            position: binding?.arg?.position
          },
          children: h(binding?.arg?.content)
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
