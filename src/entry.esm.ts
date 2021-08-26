import './styles/main.scss'

import { App, Plugin } from 'vue'

// Import vue components
import * as components from '@/components/index'

// Import plugins
import * as plugins from '@/plugins/index'

// install function executed by Vue.use()
const install: Exclude<Plugin['install'], undefined> =
  function installMiterDesign(app: App) {
    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component)
    })

    Object.values(plugins).forEach((plugin) => {
      app.use(plugin)
    })
  }

// Create module definition for Vue.use()
export default install

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/components/index'
