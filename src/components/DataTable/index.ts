import DataTable from './DataTable.vue'

import { App } from 'vue'

DataTable.install = (app: App) => {
  app.component(DataTable.name, DataTable)
}

export default DataTable
