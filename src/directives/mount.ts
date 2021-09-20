import { render, h, VNode, ComponentOptions, Component } from 'vue'

const createElement = () =>
  typeof document !== 'undefined' && document.createElement('div')

export function mount(
  component: Component,
  { props, children, element, app }: ComponentOptions = {},
  container: Element
) {
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
