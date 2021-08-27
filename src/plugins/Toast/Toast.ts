import { App, createApp, VNode } from 'vue'
import Toast from '@/components/Toast/Toast.vue'
import ToastContainer from '@/components/Toast/ToastContainer.vue'
import { mount } from './mount-component'

export interface ToastInstance {
  add: (text: string) => any
  remove: (id: string) => void
}

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

    // const nodes: { [key: string]: Node } = {}

    app.config.globalProperties.$toast = {
      add(text: string) {
        // toastApp._instance.render(h) {
        //   hel
        // },
        const c = mount(Toast)
        console.log(c)
        return c
      },
      remove(id: string) {
        // const child = nodes[id]
        // console.log(nodes, child)
        // if (!child)
        //   throw new Error("Couldn't remove toast; element does not exist.")
        // toastApp._container?.removeChild(nodes[id])
      }
    } as ToastInstance
  }
}
