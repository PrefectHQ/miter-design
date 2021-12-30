import Toast from './Toast.vue'

import { App } from 'vue'

Toast.install = (app: App) => {
  app.component('Toast', Toast)
  app.component('MToast', Toast)
}

export default Toast
