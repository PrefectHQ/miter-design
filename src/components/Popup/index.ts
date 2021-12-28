import Popup from './Popup.vue'
import PopupContent from './PopupContent.vue'

import { App } from 'vue'

Popup.install = (app: App) => {
  app.component('Popup', Popup)
  app.component(Popup.name, Popup)
  app.component('PopupContent', PopupContent)
  app.component(PopupContent.name, PopupContent)
}

export default Popup
