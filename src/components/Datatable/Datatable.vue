<template>
  <table>
    <thead class="table-head">
      <tr class="table-row">
        <th
          v-for="(column, columnIndex) in columns"
          class="table-header"
          :key="columnIndex"
          @click="sortColumns(column)"
        >
          <div class="icon-container">
            <slot name="column" :column="column">
              <slot
                :name="'column-' + columns[columnIndex].value"
                :column="column"
              >
                {{ columns[columnIndex].text }}
              </slot>

              <i
                v-if="currentSortDir == 'asc'"
                class="pi pi-arrow-up-line pi-1x"
              />
              <i
                v-else-if="currentSortDir == 'desc'"
                class="pi pi-arrow-down-line pi-1x"
              />

              <div v-else class="rotate-arrow">
                <i class="pi pi-code-line pi-1x" />
              </div>
            </slot>
          </div>
        </th>
      </tr>
      <tr class="table-row">
        <td :colspan="Object.keys(columns).length" class="search-input">
          <Input v-model="search" placeholder="Search...">
            <template v-slot:prepend>
              <div class="search-icon">
                <i class="pi pi-search-line pi-1x" />
              </div>
            </template>
          </Input>
        </td>
      </tr>
    </thead>

    <tbody class="table-body">
      <tr
        v-for="(row, rowIndex) in sortedColumns"
        :key="rowIndex"
        class="table-row row-hover"
      >
        <td
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          class="table-cell"
        >
          <slot name="item" :item="row">
            <slot :name="'item-' + Object.keys(row)[columnIndex]" :item="row">
              {{ row[Object.keys(row)[columnIndex]] }}
            </slot>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Datatable',
  props: {
    columns: { type: Object, required: true },
    items: { type: Array, required: true },
    dir: { type: String, required: false },
    sortBy: { type: String, required: false }
  },
  emits: ['update:dir'],
  watch: {
    dir(val) {
      this.currentSortDir = val
    }
  },
  data() {
    return {
      currentSort: '',
      currentSortDir: this.dir ? this.dir : 'asc',
      search: '',
      sortedItems: []
    }
  },
  computed: {
    sortedColumns() {
      const customSort =
        this.sortedItems.length === 0 ? this.items : this.sortedItems

      if (this.search) {
        return customSort.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase())
        )
      }

      if (this.sortedItems.length === 0) {
        const sortBy = this.sortBy ? this.sortBy : 'name'
        return this.currentSortDir === 'asc'
          ? this.items.sort((a, b) => (a[sortBy] > b[sortBy] ? -1 : 1))
          : this.items
              .sort((a, b) => (a[sortBy] > b[sortBy] ? -1 : 1))
              .reverse()
      } else
        return this.currentSortDir === 'asc'
          ? this.sortedItems
          : this.sortedItems.reverse()
    }
  },
  methods: {
    sortColumns(col: object) {
      this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      this.$emit('update:dir', this.currentSortDir)
      if (col?.sort) {
        this.sortedItems = this.items.sort(function (a, b) {
          return col.sort(a[col?.value], b[col?.value])
        })
      }
    }
  }
})
</script>
<style>
table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

thead,
tbody,
tr {
  display: contents;
}

thead > tr > th {
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.06);
}

.search-input {
  grid-column: 1 / 4;
}

tbody > tr > td {
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
  width: 100%;
}

tbody > tr > td:hover {
  background: #fcfdfe;
}

tbody > tr > td > label:hover,
a:hover {
  color: #024dfd;
}

.icon-container {
  text-align: start;
}

.rotate-arrow {
  transform: rotate(90deg);
  margin-left: 5px;
  display: inline-block;
  color: #d2d9df;
  -webkit-text-stroke: 1px #d2d9df;
}

.icon-container > i {
  margin-left: 6px;
  color: #d2d9df;
}

.search-input {
  border-bottom: 1px solid #cecdd3;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 10px;
  background: #fcfdfe;
}

.search-icon {
  margin-top: 5px;
}

@media (max-width: 1200px) {
  table {
    grid-template-columns: 1fr;
  }

  .search-input {
    grid-column: 1 / 2;
  }

  tbody > tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  tbody > tr > td {
  }

  tbody > tr > td:nth-child(3) {
    grid-row: 1/3;
    grid-column: 2;
    /* border: 5px solid plum; */
  }
}
</style>
