<template>
  <div>
    <Datatable
      v-model:direction="sortDir"
      v-model:sort-by="sortBy"
      :columns="columns"
      :rows="rows"
    >
      <!-- <template #header-sort="{ handleMobileSort }">
        <button @click="handleMobileSort(columns[0])">sort</button>
      </template> -->

      <template #column-name="{ column }">
        <Checkbox>{{ column.label }}</Checkbox>
      </template>

      <template #column-memberCount="{ column }">
        {{ column.label }}
      </template>

      <template #column-roles="{ column }">
        {{ column.label }}
      </template>

      <template #item-name="{ item }">
        <Checkbox>
          {{ item.name }}
        </Checkbox>
      </template>

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
    </Datatable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Datatable from '@/components/Datatable/DataTable.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
export default defineComponent({
  components: { Datatable, Checkbox },
  data() {
    return {
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
  },

  methods: {
    nameSort(a, b) {
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    }
  }
})
</script>
