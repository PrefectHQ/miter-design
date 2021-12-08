<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(column, prop) in headers"
          :key="prop"
          @click="setSort(column.value)"
        >
          <slot :name="'header-' + headers[prop].value" :column="column">
            {{ column.text }}
          </slot>
        </th>
      </tr>
      <tr>
        <td :colspan="Object.keys(headers).length">
          <Input
            v-model="search"
            placeholder="Search..."
            style="
              border-bottom: 1px solid #cecdd3;
              margin-left: 16px;
              margin-right: 16px;
            "
          >
            <template v-slot:prepend>
              <i class="pi pi-search-line pi-1x" />
            </template>
          </Input>
        </td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rowIndex) in sortedCats" :key="rowIndex">
        <td v-for="(header, headerIndex) in headers" :key="headerIndex">
          <slot :name="'item-' + Object.keys(row)[headerIndex]" :item="row">
            {{ row[Object.keys(row)[headerIndex]] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Checkbox from '../Checkbox/Checkbox.vue'

export default defineComponent({
  components: { Checkbox },
  name: 'Datatable',
  props: {
    headers: { type: Object, required: true },
    items: { type: Array, required: true }
  },
  data() {
    return {
      currentSort: '',
      currentSortDir: 'asc',
      search: ''
    }
  },
  mounted() {},
  computed: {
    formatHeaders() {
      return this.headers.slice(1)
    },
    sortedCats() {
      if (this.search) {
        return this.items.filter((item) =>
          item.name.toUpperCase().includes(this.search.toUpperCase())
        )
      }
      return this.items.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    }
  },
  methods: {
    setSort(key: string) {
      if (key === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = key
    },
    handleClick(e: Event) {
      console.log('clicked from datatable')
    }
  }
})
</script>
<style>
table {
  border-spacing: 0;
  width: 100%;
  color: #465968;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;

  border: 1px solid #e8e8e8;
  text-align: left;
  border-radius: 4px;
}
thead > tr > th {
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
}

tbody > tr > td {
  padding: 8px;
  border-bottom: 1px solid #e8e8e8;
}
</style>
