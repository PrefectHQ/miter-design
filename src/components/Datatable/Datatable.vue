<template>
  <table>
    <thead class="table-head">
      <tr class="mobile-sort-container">
        <th class="mobile-sort">
          <slot name="header-sort" :handleMobileSort="sortColumns">
            <Button @click="sortColumns(columns[0])">Sort: A-Z</Button></slot
          >
        </th>
      </tr>

      <tr class="table-row">
        <th
          v-for="(column, columnIndex) in columns"
          class="table-header"
          :style="{ textAlign: column.align ? column.align : 'start' }"
          :key="columnIndex"
          @click="sortColumns(column)"
        >
          <span class="icon-container">
            <slot name="column" :column="column">
              <slot
                :name="'column-' + columns[columnIndex].value"
                :column="column"
              >
                {{ column.label }}
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
          </span>
        </th>
      </tr>
      <tr class="table-row">
        <td :colspan="columns.length" class="search-input">
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
      <tr v-for="(row, rowIndex) in sortedColumns" :key="rowIndex">
        <td
          v-for="column in columns"
          :key="column.value"
          :align="column.align || 'start'"
          class="table-cell"
        >
          <slot name="item" :item="row">
            <slot :name="`item-${column.value}`" :item="row">
              {{ row[column.value] }}
            </slot>
          </slot>
        </td>
      </tr>

      <tr>
        <td
          v-if="sortedColumns.length === 0"
          :colspan="columns.length"
          align="center"
          class="no-search-results"
        >
          <div>No results found</div>
          <Button @click="clearSearch" miter width="170px" height="36px"
            >Clear search</Button
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Button from '../Button/Button.vue'
import Input from '../Input/Input.vue'

interface Columns {
  label: string
  value: string
  align: string
  sort: void
}

export default defineComponent({
  name: 'DataTable',
  components: { Button, Input },
  props: {
    columns: {
      type: Array as PropType<Columns[]>,
      required: true,
      default: () => []
    },
    items: {
      type: Array as PropType<object[]>,
      required: true,
      default: () => []
    },
    direction: {
      type: String as PropType<string>,
      required: false,
      default: ''
    },
    sortBy: {
      type: String as PropType<string>,
      required: false,
      default: 'name'
    }
  },
  emits: ['update:direction'],
  data() {
    return {
      currentSortDir: '' as String,
      search: '' as String,
      sortedItems: [] as object[]
    }
  },
  computed: {
    sortedColumns(): object[] {
      const sortDir: String = this.direction || this.currentSortDir || 'asc'
      const sortBy: String = this.sortBy ? this.sortBy : 'name'
      const isCustomSort = this.sortedItems.length === 0
      let results = []

      if (isCustomSort) {
        results = this.sortAscOrDesc(sortDir, sortBy, this.items)
      } else {
        results = this.sortedItems
      }

      if (this.search) {
        results = results.filter((item: any) =>
          item.name.toLowerCase().includes(this.search.toLowerCase())
        )
      }

      return results
    }
  },
  methods: {
    sortAscOrDesc(
      direction: String,
      sortBy: String,
      items: object[]
    ): object[] {
      if (direction === 'asc') {
        return items.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
      } else if (direction === 'desc') {
        return items.sort((a, b) => (a[sortBy] > b[sortBy] ? -1 : 1))
      } else {
        return []
      }
    },
    handleResize(): void {
      this.windowWidth = window.innerWidth
    },
    sortColumns(col: Object) {
      this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      this.$emit('update:direction', this.currentSortDir)
      if (col?.sort) {
        this.sortedItems = this.items.sort(function (a, b) {
          return col.sort(a[col?.value], b[col?.value])
        })
      }
    },
    clearSearch(): void {
      this.search = ''
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

.table-cell {
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.table-cell:hover {
  background: #fcfdfe;
}

.table-cell > label:hover,
a:hover {
  color: #024dfd;
}

.icon-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
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
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  background: #fcfdfe;
}

.search-icon {
  margin-top: 5px;
}

.no-search-results {
  padding: 50px;
}

.no-search-results > div {
  font-size: 24px;
  line-height: 28px;

  text-align: center;

  color: #465968;
}

.no-search-results > button {
  margin-top: 24px;
}

.table-header {
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #e8e8e8;
}

.mobile-sort-container {
  display: none;
}

@media (max-width: 1200px) {
  tr,
  td {
    display: block;
  }

  .table-header {
    display: none;
  }
  .table-cell {
    border-bottom: none;
  }
  .table-cell:last-of-type {
    border-bottom: 1px solid #e8e8e8;
  }

  .mobile-sort-container {
    display: flex;
    justify-content: end;
    padding: 16px;
  }
}
</style>
