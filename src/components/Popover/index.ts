import Popover from './Popover.vue'
import PopoverContent from './PopoverContent.vue'

import { App } from 'vue'

Popover.install = (app: App) => {
  app.component('Popover', Popover)
  app.component('PopoverContent', PopoverContent)
}

export default Popover
