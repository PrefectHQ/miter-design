import Code from './Code.vue'

import { App } from 'vue'

Code.install = (app: App) => {
  app.component('Code', Code)
  app.component('MCode', Code)
}

export default Code
