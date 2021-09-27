type MountedElement = {
  vNode: VNode
  destroy: any
  el: Element
}

type ToastOptions = {
  component?: Component
  content?: string
  color?: string
  timeout?: number
  dismissable?: boolean
}
