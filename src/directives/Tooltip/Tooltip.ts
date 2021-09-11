import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'
import { render, h, VNode, ComponentOptions, Component, nextTick } from 'vue'
// import  Tooltip  from '@/components/Tooltip/Tooltip.vue'
import Tooltip from '../../components/Tooltip/Tooltip.vue'

const createElement = () =>
  typeof document !== 'undefined' && document.createElement('div')

export const mount = (
  component: Component,
  { props, children, element, app }: ComponentOptions = {},
  container: Element
) => {
  let el = element ? element : createElement()
  let vNode: VNode | null = h(component, props, children)
  if (app && app._context) {
    vNode.appContext = app._context
  }

  render(vNode, el)

  if (!vNode.el) throw new Error("Couldn't attach vNode to the DOM.")

  if (container) {
    container.appendChild(vNode.el?.parentElement)
  } else document.body.appendChild(vNode.el?.parentElement)

  // if (container) {
  //   container.addEventListener('mouseenter', () => {
  //     container.appendChild(vNode?.el)
  //   })

  //   container.addEventListener('mouseleave', () => {
  //     vNode?.el.remove()
  //   })
  // }
}

export const TooltipDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    el.style.display = 'inline-block'

    mount(
      Tooltip,
      {
        props: {
          content: binding.value,
          position: binding.arg,
          currentElRect: el.getBoundingClientRect()
        }
      },
      el
    )
  }
}

export default TooltipDirective
