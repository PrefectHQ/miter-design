import { App, createApp, VNode, RendererNode, RendererElement } from 'vue'
import Toast from '@/components/Toast/Toast.vue'
import ToastContainer from '@/components/Toast/ToastContainer.vue'
import { mount } from './mount-component'
import { ToastInstance } from './main'

// export interface NodeInstance {
//   vNode: VNode<
//     RendererNode,
//     RendererElement,
//     {
//       [key: string]: any
//     }
//   >
//   destroy: () => void
//   el: any
// }

// export interface ToastInstance {
//   add: (text: string) => NodeInstance
// }

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: ToastInstance
  }
}

export const injectionKey = Symbol('toast')

export default {
  install: (app: App, options: any = {}) => {
    let mountPoint: Element

    if (options.mountPoint) {
      mountPoint = document.querySelector(options.mountPoint)
      if (!mountPoint)
        throw new Error(
          "Toast plugin wasn't provided a valid mount point. Make sure the mount point exists in the DOM or pass nothing to create one automatically."
        )
    } else {
      mountPoint = document.createElement('div')
      mountPoint.id = 'miter-toast-app'
      document.body.appendChild(mountPoint)
    }

    const toastApp = createApp(ToastContainer)

    toastApp.mount(mountPoint)

    console.log(toastApp)
    // const nodes: { [key: string]: Node } = {}

    app.config.globalProperties.$toast = {
      nodes: [],
      add(text: string) {
        return mount(
          Toast,
          {},
          toastApp._container?.querySelector('.toast-container')
        )
      }
    } as ToastInstance
  }
}
