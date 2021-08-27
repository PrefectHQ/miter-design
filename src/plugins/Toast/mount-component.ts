import { render, h, VNode, ComponentOptions, Component } from 'vue'

const createElement = () =>
  typeof document !== 'undefined' && document.createElement('div')

export const mount = (
  component: Component,
  { props, children, element, app }: ComponentOptions = {}
) => {
  let el = element ? element : createElement()

  let vNode: VNode | null = h(component, props, children)
  if (app && app._context) {
    vNode.appContext = app._context
  }
  document.body.appendChild(el)

  render(vNode, el)

  const destroy = () => {
    if (el) {
      render(null, el)
    }
    // For GC purposes
    el = null
    vNode = null
  }

  return { vNode, destroy, el }
}

export default mount
