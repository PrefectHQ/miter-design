import DataTable from './DataTable.vue'
import Select from '../Select/Select.vue'
export default {
  title: 'Miter Design/DataTable',
  component: DataTable,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JomY9jsgJdal9wfPBtpWkY/UI?node-id=1881%3A37776'
    }
  }
}

const columns = [
  {
    label: 'Name',
    value: 'name',
    search: true
  },
  {
    label: 'Member Count',
    value: 'memberCount'
  },
  {
    label: 'Roles',
    value: 'roles'
  }
]
const rows = [
  { name: 'Staging Team', memberCount: 57, roles: 'Admin' },
  { name: 'Data Science', memberCount: 405, roles: 'Admin' },
  { name: 'Dev Ops', memberCount: 22, roles: 'Admin' },
  { name: 'Production Team', memberCount: 35, roles: 'Admin' },
  { name: 'Winter Interns', memberCount: 90, roles: 'Admin' }
]

const slotTemplate = `
<template #item-memberCount="{ item }">
        <span><strong>Member Count:</strong> {{ item.memberCount }}</span>
</template>
<template #item-roles>
        <Select
          :options="[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
            { label: 'ReadOnly', value: 'readonly' }
          ]"
        />
</template>
`

const Template = (args) => ({
  components: { DataTable, Select },
  setup() {
    return { args }
  },
  template: `
    <DataTable v-bind="args">
     ${args.slot ? args.slot : ''}
    </DataTable>
  `
})

export const Slot = Template.bind({})
Slot.args = {
  rows: rows,
  columns: columns,
  slot: slotTemplate
}
