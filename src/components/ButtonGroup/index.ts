import ButtonGroup from './ButtonGroup.vue'
import IconButton from './IconButton.vue'

import { App } from 'vue'

ButtonGroup.install = (app: App) => {
  app.component('MButtonGroup', ButtonGroup)
}

export default ButtonGroup
