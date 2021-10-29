import Select from './Select.vue'
import Option from './Option.vue'
import OptionLabel from './OptionLabel.vue'
import OptionGroup from './OptionGroup.vue'
import SelectContent from './SelectContent.vue'

import { App } from 'vue'

Select.install = (app: App) => {
  app.component('Select', Select)
  app.component('Option', Option)
  app.component('OptionLabel', OptionLabel)
  app.component('SelectContent', SelectContent)
  app.component('OptionGroup', OptionGroup)
}

export default Select
