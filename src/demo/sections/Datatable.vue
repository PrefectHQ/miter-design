<template>
  <div>
    <Datatable :headers="headers" :items="items">
      <template #item-name="{ item, handleClick }">
        <Checkbox>
          {{ item.name.toLowerCase() }}
        </Checkbox>
      </template>

      <template #header-name="{ column }">
        {{ column.text.toUpperCase() }}
      </template>
    </Datatable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Datatable from '@/components/Datatable/Datatable.vue'
export default defineComponent({
  components: { Datatable },
  data() {
    return {
      table: '',
      headers: [
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
