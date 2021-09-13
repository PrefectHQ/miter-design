import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'
import { render, h, VNode, ComponentOptions, Component } from 'vue'
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
}

export const TooltipDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    if (el) {
      el.style.display = 'inline-block'
      el.setAttribute('aria-labelledby', 'tooltip-container')
      el.addEventListener('mouseenter', () => {
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
      })
      el.addEventListener('mouseleave', () => {
        document.getElementById('tooltip-container')?.remove()
      })
    }
  }
}

export default TooltipDirective
