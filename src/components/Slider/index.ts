import Slider from './Slider.vue'

import { App } from 'vue'

Slider.install = (app: App) => {
  app.component(Slider.name, Slider)
}

export default Slider
