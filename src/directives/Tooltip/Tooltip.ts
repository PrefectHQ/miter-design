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

  const destroy = () => {
    if (el) {
      render(null, el)
    }

    // For GC purposes
    el = null
    vNode = null
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
  }

  // if (container) {
  //   container.appendChild(vNode.el)
  // } else document.body.appendChild(vNode.el)

  return { vNode, destroy, el }
}

export const TooltipDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    el.style.display = 'inline-block'

    const parentOffSet = {
      offsetTop: el.offsetTop,
      offsetHeight: el.offsetHeight,
      offsetWidth: el.offsetWidth,
      offsetLeft: el.offsetLeft
    }

    const positions = ['top', 'right', 'bottom', 'left']

    // const position = positions.includes(binding.arg)
    //   ? binding.arg
    //   : positions[0]

    mount(
      Tooltip,
      {
        props: {
          content: binding.value,
          position: positions[1],
          parentOffSet
        }
      },
      el
    )
  }
}

export default TooltipDirective
