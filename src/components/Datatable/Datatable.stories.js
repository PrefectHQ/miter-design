import Datatable from './Datatable.vue'
import Select from '../Select/Select.vue'
export default {
  title: 'Miter Design/Datatable',
  component: Datatable,
  parameters: {
    design: {
      type: 'figma',
      url: ''
    }
  }
}

const columns = [
  {
    text: 'Name',
    value: 'name'
  },
  {
    text: 'Member Count',
    value: 'memberCount'
  },
  {
    text: 'Roles',
    value: 'roles'
  }
]
const items = [
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
  components: { Datatable, Select },
  setup() {
    return { args }
  },
  template: `
    <Datatable v-bind="args">
     ${args.slot ? args.slot : ''}
    </Datatable>
  `
})

export const Default = Template.bind({})
Default.args = {
  items: items,
  columns: columns
}

export const Slot = Template.bind({})
Slot.args = {
  items: items,
  columns: columns,
  slot: slotTemplate
}
