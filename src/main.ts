import { createApp } from 'vue'

// Global and functional styles
import '@/styles/main.scss'

import App from './App.vue'
import * as Components from '@/components'

const app = createApp(App)

app.component('Button', Components.Button)
app.component('Card', Components.Card)
app.component('CardActions', Components.CardActions)
app.component('CardHeader', Components.CardHeader)

app.config.performance = true

app.config.errorHandler = (err, vm, info) => {
  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.
  // TODO: Perform any custom logic or log to server
  console.log(err, vm, info)
}

app.mount('#app')
