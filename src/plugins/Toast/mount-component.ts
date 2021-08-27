import { render, h, VNode, ComponentOptions, Component } from 'vue'
// import { provide } from 'vue'

// const createElement = () =>
//   typeof document !== 'undefined' && document.createElement('div')

export const mount = (
  component: Component,
  { props, children, app }: ComponentOptions = {},
  container: Element
) => {
  let vNode: VNode | null = h(component, props, children)
  if (app && app._context) {
    vNode.appContext = app._context
  }

  const destroy = () => {
    if (vNode) {
      render(null, container)
    }

    // For GC purposes
    vNode = null
  }

  render(h(vNode, { methods: { destroy: destroy } }), container)

  return { vNode, destroy }
}

export default mount
