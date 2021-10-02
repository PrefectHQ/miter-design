import Select from './Select.vue'
import Option from './Option.vue'
import OptionGroup from './OptionGroup.vue'

import { App } from 'vue'

Select.install = (app: App) => {
  app.component(Select.name, Select)
  app.component(Option.name, Option)
  app.component(OptionGroup.name, OptionGroup)
}

export default Select
