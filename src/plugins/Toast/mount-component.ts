import { App, render, h, VNode, ComponentOptions, Component } from 'vue'

const createElement = () =>
  typeof document !== 'undefined' && document.createElement('div')

export const mount = (
  component: Component,
  { props, children, element, app }: ComponentOptions = {},
  container: Element | null | undefined
) => {
  let el = element ? element : createElement()

  let vNode: VNode | null = h(component, props, children)
  if (app && app._context) {
    vNode.appContext = app._context
  }

  render(vNode, el)

  if (container) {
    container.appendChild(el)
  } else document.body.appendChild(el)

  const destroy = () => {
    if (el) {
      render(null, el)
    }

    if (container) {
      container.removeChild(el)
    } else document.body.removeChild(el)

    // For GC purposes
    el = null
    vNode = null
  }

  return { vNode, destroy, el }
}

export default mount
