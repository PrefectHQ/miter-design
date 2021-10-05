import NumberInput from './NumberInput.vue'
import { App } from 'vue'

NumberInput.install = (app: App) => {
  app.component('NumberInput', NumberInput)
}

export default NumberInput
