import DatePicker from './DatePicker.vue'
import { App } from 'vue'

DatePicker.install = (app: App) => {
  app.component('DatePicker', DatePicker)
  app.component('MDatePicker', DatePicker)
}

export default DatePicker
