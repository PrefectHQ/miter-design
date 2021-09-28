import { App, createApp, InjectionKey, inject } from 'vue'
import ToastContainer from '@/components/Toast/ToastContainer.vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: {
      add: (options: ToastOptions) => MountedElement
    }
  }
}

export type Toast = {
  add: (options: ToastOptions) => MountedElement
}

export interface ToastPlugin {
  install(app: App): void
}

export const injectionKey: InjectionKey<ToastPlugin> = Symbol('toast')

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

    const toastContainer: any = toastApp.mount(mountPoint)

    const Toast = {
      /**
       * Adds a new toast to the global interface - if a component is passed, the content string will be ignored
       * @param options: { component: Component, content: string, color: string, timeout: number }
       * @returns remove
       */
      add(options: ToastOptions = {}): MountedElement {
        return { remove: toastContainer.add(options) }
      },

      removeAll(): void {
        toastContainer.removeAll()
      }
    }

    app.config.globalProperties.$toast = Toast

    app.provide('$toast', Toast)

    inject('$toast', Toast)
  }
}
