import NumberInput from './NumberInput.vue'
import { App } from 'vue'

NumberInput.install = (app: App) => {
  app.component('NumberInput', NumberInput)
  app.component('MNumberInput', NumberInput)
}

export default NumberInput
