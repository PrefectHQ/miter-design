<template>
  <div>
    <DataTable
      v-model:direction="sortDir"
      v-model:sort-by="sortBy"
      :columns="columns"
      :rows="rows"
    >
      <!-- <template #header-sort="{ handleMobileSort }">
        <button @click="handleMobileSort(columns[0])">sort</button>
      </template> -->

      <template #column-header-name="{ label }">
        <Checkbox>{{ label }}</Checkbox>
      </template>

      <template #column-header-memberCount="{ label }">
        {{ label }}
      </template>

      <template #column-header-roles="{ label }">
        {{ label }}
      </template>

      <template #column-name="{ value }">
        <Checkbox>
          {{ value }}
        </Checkbox>
      </template>

      <template #column-member-count="{ value }">
        <span><strong>Member Count:</strong> {{ value }}</span>
      </template>

      <template #column-roles>
        <Select
          :options="[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
            { label: 'ReadOnly', value: 'readonly' }
          ]"
        />
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from '@/components/DataTable/DataTable.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'

import { DataTableColumn } from '../../types/DataTableColumn'
export type DataTableColumnSort = 'asc' | 'desc' | 'none'
export type DataTableRow = Record<string, any>

export default defineComponent({
  components: { DataTable, Checkbox },
  data() {
    const data: {
      sortBy: string
      sortDir: DataTableColumnSort
      columns: DataTableColumn
      rows: DataTableRow
    } = {
      sortBy: 'memberCount',
      sortDir: 'desc',
      columns: [
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Member Count',
          value: 'memberCount'
        },
        {
          label: 'Roles',
          value: 'roles'
        }
      ],
      rows: [
        { name: 'Staging Team', memberCount: 57, roles: 'Admin' },
        { name: 'Data Science', memberCount: 405, roles: 'Admin' },
        { name: 'Dev Ops', memberCount: 22, roles: 'Admin' },
        { name: 'Production Team', memberCount: 35, roles: 'Admin' },
        { name: 'Winter Interns', memberCount: 90, roles: 'Admin' }
      ]
    }

    return data
  }
})
</script>
