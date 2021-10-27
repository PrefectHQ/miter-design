import Tooltip from './Tooltip.vue'
import TooltipContent from './TooltipContent.vue'

import { App } from 'vue'

Tooltip.install = (app: App) => {
  app.component('Tooltip', Tooltip)
  app.component('TooltipContent', TooltipContent)
}

export default Tooltip
