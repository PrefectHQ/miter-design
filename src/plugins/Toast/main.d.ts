import { VNode, RendererNode, RendererElement } from 'vue'

declare type NodeInstance = {
  vNode: VNode<
    RendererNode,
    RendererElement,
    {
      [key: string]: any
    }
  >
  destroy: () => void
  el: any
}

declare type ToastInstance = {
  add: (text: string) => NodeInstance
}
