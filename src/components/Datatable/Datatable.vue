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
    </thead>

    <tbody>
      <tr>
        <td :colspan="Object.keys(headers).length">
          <Input v-model="search" placeholder="Search...">
            <template v-slot:prepend>
              <i class="pi pi-search-line pi-1x" />
            </template>
          </Input>
        </td>
      </tr>

      <tr v-for="(row, rowIndex) in sortedCats" :key="rowIndex">
        <!-- <td>
          <Checkbox>
            {{ row.name }}
          </Checkbox>
        </td> -->
        <td v-for="(header, headerIndex) in headers" :key="headerIndex">
          <slot
            :name="'item-' + Object.keys(row)[headerIndex]"
            :item="row"
            :handleClick="handleClick"
          >
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
      // this.$emit('handleClick', e.target.innerText)
    }
  }
})
</script>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  cursor: pointer;
}

/* tbody > tr > :nth-child(1) {
  
} */
</style>
