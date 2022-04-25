import { createApp } from 'vue'

// Global and functional styles
import '@/styles/index.css'

import App from './App.vue'
import MiterDesign from '@/index'
import router from './plugins/router'

const app = createApp(App)
app.use(MiterDesign)
app.use(router)

app.config.performance = true

app.config.errorHandler = (err, vm, info) => {
  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.
  // TODO: Perform any custom logic or log to server
  console.log(err, vm, info)
}

console.log(app)

app.mount('#app')
