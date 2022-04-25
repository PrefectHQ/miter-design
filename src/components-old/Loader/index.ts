import Loader from './Loader.vue'

import { App } from 'vue'

Loader.install = (app: App) => {
  app.component('Loader', Loader)
  app.component('MLoader', Loader)
}

export default Loader
