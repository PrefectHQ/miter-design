import TimePicker from './TimePicker.vue'

import { App } from 'vue'

TimePicker.install = (app: App) => {
  app.component('TimePicker', TimePicker)
}

export default TimePicker
