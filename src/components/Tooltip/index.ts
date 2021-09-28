import Tooltip from './Tooltip.vue'

import { App } from 'vue'

Tooltip.install = (app: App) => {
  app.component(Tooltip.name, Tooltip)
}

export default Tooltip
