import Button from './Button.vue'
import IconButton from './IconButton.vue'

import { App } from 'vue'

Button.install = (app: App) => {
  app.component('Button', Button)
  app.component('MButton', Button)
  app.component('IconButton', IconButton)
  app.component('MIconButton', IconButton)
}

export default Button
