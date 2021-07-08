import { createApp } from 'vue'

// Global and functional styles
import '@/styles/main.scss'

import App from './App.vue'
import * as Components from '@/components'

console.log(Components)

// Object.keys(Components).forEach((component: string) => {
//   console.log(component in Components)

//   console.log(Components[component])
//   // app.component(Components[component].name, Components[component])
// })

const app = createApp(App)

app.component('Button', Components.Button)
app.mount('#app')
