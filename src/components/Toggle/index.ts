import Toggle from './Toggle.vue'

import { App } from 'vue'

Toggle.install = (app: App) => {
  app.component('Toggle', Toggle)
  app.component(Toggle.name, Toggle)
}

export default Toggle
