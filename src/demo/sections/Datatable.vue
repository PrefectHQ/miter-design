<template>
  <div>
    <Datatable
      v-model:dir="sortDir"
      v-model:sort-by="sortBy"
      :columns="columns"
      :items="items"
    >
      <!-- <template #header-sort="{ handleMobileSort }">
        <button @click="handleMobileSort(columns[0])">sort</button>
      </template> -->

      <template #column-name="{ column }">
        {{ column.text }}
      </template>

      <template #column-memberCount="{ column }">
        {{ column.text }}
      </template>

      <template #column-roles="{ column }">
        {{ column.text }}
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
        <div class="select-container">
          <Select
            :options="[
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'user' },
              { label: 'ReadOnly', value: 'readonly' }
            ]"
          />
        </div>
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
      sortBy: 'memberCount',
      sortDir: 'desc',
      table: '',
      columns: [
        {
          text: 'Name',
          value: 'name',
          align: 'start'
        },
        {
          text: 'Member Count',
          value: 'memberCount',
          align: 'start'
        },
        {
          text: 'Roles',
          value: 'roles',
          align: 'start'
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
    },
    memberCountSort(a, b) {
      return a - b
    },
    handleToggle() {
      this.sortBy = this.sortBy === 'memberCount' ? 'name' : 'memberCount'
    }
  }
})
</script>

<style>
.select-container > .select > div {
  height: 42px;
  background: #f7f7f8;
  color: #465968;
  border: 1px solid #cecdd3;
  border-radius: 4px;
}

.select-container > .select > div > span {
  color: #465968;

  font-size: 14px;
  line-height: 24px;
}
</style>
