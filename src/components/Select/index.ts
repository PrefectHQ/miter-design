import Select from './Select.vue'
import NativeSelect from './NativeSelect.vue'
import SimpleSelect from './SimpleSelect.vue'
import Option from './Option.vue'
import OptionLabel from './OptionLabel.vue'
import OptionGroup from './OptionGroup.vue'
import SelectContent from './SelectContent.vue'

import { App } from 'vue'

Select.install = (app: App) => {
  app.component('Select', Select)
  app.component('NativeSelect', NativeSelect)
  app.component('SimpleSelect', SimpleSelect)
  app.component('Option', Option)
  app.component('OptionLabel', OptionLabel)
  app.component('SelectContent', SelectContent)
  app.component('OptionGroup', OptionGroup)
}

export default Select
