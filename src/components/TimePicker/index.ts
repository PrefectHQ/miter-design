import TimePicker from './TimePicker.vue'
import MeridiemInput from './MeridiemInput.vue'

import { App } from 'vue'

TimePicker.install = (app: App) => {
  app.component('TimePicker', TimePicker)
  app.component('MTimePicker', TimePicker)
  app.component('MeridiemInput', MeridiemInput)
  app.component('MMeridiemInput', MeridiemInput)
}

export default TimePicker
