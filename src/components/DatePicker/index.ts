import DatePicker from './DatePicker.vue'
import { App } from 'vue'

DatePicker.install = (app: App) => {
  app.component('DatePicker', DatePicker)
}

export default DatePicker
