import { App, createApp } from 'vue'
import Toast from '@/components/Toast/Toast.vue'
import ToastContainer from '@/components/Toast/ToastContainer.vue'
import { mount } from './mount-component'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: {
      add: (text: string) => any
    }
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

    app.config.globalProperties.$toast = {
      add(text: string) {
        return mount(
          Toast,
          {},
          toastApp._container?.querySelector('.toast-container')
        )
      }
    }
  }
}
