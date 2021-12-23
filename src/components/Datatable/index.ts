import Datatable from './DataTable.vue'

import { App } from 'vue'

Datatable.install = (app: App) => {
  app.component(Datatable.name, Datatable)
}

export default Datatable
