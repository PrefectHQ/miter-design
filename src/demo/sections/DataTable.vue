<template>
  <div>
    <DataTable v-model:direction="sortDir" v-model:sort-by="sortBy" :columns="columns" :rows="rows">
      <!-- <template #header-sort="{ handleMobileSort }">
        <button @click="handleMobileSort(columns[0])">sort</button>
      </template>-->

      <template #column-header-name="{ label }">
        <Checkbox @click.stop @mouseup.stop="toggleSelectAll">{{ label }}</Checkbox>
      </template>

      <template #column-header-memberCount="{ label }">{{ label }}</template>

      <template #column-header-roles="{ label }">{{ label }}</template>

      <template #column-name="{ value }">
        <Checkbox :value="selected.includes(value)">{{ value }}</Checkbox>
      </template>

      <template #column-member-count="{ value }">
        <span>
          <strong>Member Count:</strong>
          {{ value }}
        </span>
      </template>

      <template #column-created="{ value }">{{ value?.toISOString().split('T')[0] }}</template>

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
      selected: any[],
      sortBy: string
      sortDir: DataTableColumnSort
      columns: DataTableColumn
      rows: DataTableRow
    } = {
      selected: [],
      sortBy: 'memberCount',
      sortDir: 'desc',
      columns: [
        {
          label: 'Name',
          value: 'name',
          search: true
        },
        {
          label: 'Member Count',
          value: 'memberCount',
          search: true
        },
        {
          label: 'Created',
          value: 'created',
          search: true
        },
        {
          label: 'Roles',
          value: 'roles',
          search: true
        },
      ],
      rows: [
        { name: 'Staging Team', memberCount: 57, roles: 'Admin', created: new Date() },
        { name: 'Data Science', memberCount: 405, roles: 'Admin', created: new Date() },
        { name: 'Dev Ops', memberCount: 22, roles: 'Admin', created: new Date() },
        { name: 'Production Team', memberCount: 35, roles: 'Admin', created: new Date() },
        { name: 'Winter Interns', memberCount: 90, roles: 'Admin', created: undefined }
      ]
    }

    return data
  },
  methods: {
    toggleSelectAll(e: any) {
      if (this.selected.length == this.rows.length) {
        this.selected.length = 0
      } else {
        this.selected = this.rows.map((row: DataTableRow) => row.name)
      }
    }
  }
})
</script>
