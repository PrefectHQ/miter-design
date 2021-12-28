import Popover from './Popover.vue'
import PopoverContent from './PopoverContent.vue'

import { App } from 'vue'

Popover.install = (app: App) => {
  app.component('Popover', Popover)
  app.component('MPopover', Popover)
  app.component('PopoverContent', PopoverContent)
  app.component('MPopoverContent', PopoverContent)
}

export default Popover
