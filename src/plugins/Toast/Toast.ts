import { App } from 'vue'

export interface ToastInstance {
  add: (text: string) => any
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $toast: ToastInstance
  }
}

export default {
  install: (app: App, options: any) => {
    app.config.globalProperties.$toast = {
      add: () => {
        console.log('im adding!')
      }
    }
  }
}
