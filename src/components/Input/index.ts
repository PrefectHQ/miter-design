import Input from './Input.vue'

import { App } from 'vue'

Input.install = (app: App) => {
  app.component('Input', Input)
  app.component(Input.name, Input)
}

export default Input
