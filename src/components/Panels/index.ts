import Panel from './Panel.vue'
import PanelContainer from './PanelContainer.vue'

import { App } from 'vue'

Panel.install = (app: App) => {
  app.component('MPanel', Panel)
  app.component('MPanelContainer', PanelContainer)
}

export default Panel
