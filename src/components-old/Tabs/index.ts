import Tabs from './Tabs.vue'
import Tab from './Tab/Tab.vue'

import { App } from 'vue'

Tabs.install = (app: App) => {
  app.component('Tabs', Tabs)
  app.component(Tabs.name, Tabs)
  app.component('Tab', Tab)
  app.component(Tab.name, Tab)
}

export default Tabs
