import { App } from 'vue'

declare module '@vue/runtime-core' {
  export interface ToastInstance {
    add: (text: string) => any
  }

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
