import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'
import { render, h, VNode, ComponentOptions, Component } from 'vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'

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
    container.addEventListener('mouseenter', () => {
      container.appendChild(vNode?.el)
    })

    container.addEventListener('mouseleave', () => {
      vNode?.el.remove()
    })
  } else {
    document.body.appendChild(vNode.el)
  }

  // if (container) {
  //   container.appendChild(vNode.el)
  // } else document.body.appendChild(vNode.el)

  return { vNode, el }
}

export const TooltipDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    el.style.display = 'inline-block'

    const body = document.body.getBoundingClientRect()
    const currentEl = el.getBoundingClientRect()

    const top = {
      top: currentEl.top - body.top - el.clientHeight - 10 + 'px',
      left: currentEl.left - body.left + 'px'
    }

    const right = {
      top: currentEl.top - body.top + 3 + 'px',
      left: currentEl.left - body.left + el.offsetWidth + 10 + 'px'
    }

    const bottom = {
      top: currentEl.top - body.top + el.offsetHeight + 10 + 'px',
      left: currentEl.left - body.left + 'px'
    }

    const left = {
      top: currentEl.top - body.top + 'px',
      left: currentEl.left - body.left - el.offsetWidth + 10 + 'px'
    }

    const parentOffSet = {
      top,
      right,
      bottom,
      left
    }

    mount(
      Tooltip,
      {
        props: {
          content: binding.value,
          position: binding.arg,
          parentOffSet
        }
      },
      el
    )
  }
}

export default TooltipDirective
