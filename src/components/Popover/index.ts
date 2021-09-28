import Popover from './Popover.vue'
import PopoverContent from './PopoverContent.vue'

import { App } from 'vue'

Popover.install = (app: App) => {
  app.component(Popover.name, Popover)
  app.component(PopoverContent.name, PopoverContent)
}

export default Popover
