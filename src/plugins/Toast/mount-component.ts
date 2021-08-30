import { render, h, VNode, ComponentOptions, Component } from 'vue'
// import { provide } from 'vue'

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
    container.appendChild(vNode.el)
  } else document.body.appendChild(vNode.el)

  return { vNode, destroy, el }
}

export default mount
