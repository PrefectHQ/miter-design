<template>
  <div>
    <Datatable :columns="columns" :items="items">
      <template #header-name="{ column }">
        <Checkbox>
          {{ column.text }}
          <i class="pi pi-arrow-up-down-line pi-1x" />
        </Checkbox>
      </template>

      <template #header-memberCount="{ column }">
        {{ column.text }}
        <i class="pi pi-arrow-up-down-line pi-1x" />
      </template>

      <template #header-roles="{ column }">
        {{ column.text }}
        <i class="pi pi-arrow-up-down-line pi-1x" />
      </template>

      <template #item-name="{ item }">
        <Checkbox>
          {{ item.name }}
        </Checkbox>
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
import Datatable from '@/components/Datatable/Datatable.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
export default defineComponent({
  components: { Datatable, Checkbox },
  data() {
    return {
      table: '',
      columns: [
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
      ],
      items: [
        { name: 'Staging Team', memberCount: 57, roles: 'Admin' },
        { name: 'Data Science', memberCount: 75, roles: 'Admin' },
        { name: 'Dev Ops', memberCount: 22, roles: 'Admin' },
        { name: 'Production Team', memberCount: 35, roles: 'Admin' },
        { name: 'Winter Interns', memberCount: 3, roles: 'Admin' }
      ]
    }
  }
})
</script>
