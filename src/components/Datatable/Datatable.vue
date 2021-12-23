<template>
  <table>
    <thead class="table-head">
      <tr class="mobile-sort-container">
        <th class="mobile-sort">
          <slot name="header-sort" :sortColumn="sortColumn">
            <Button @click="sortColumn(internalSortByColumn)">Sort: A-Z</Button>
          </slot>
        </th>
      </tr>

      <tr class="table-row">
        <th
          v-for="(column, columnIndex) in columns"
          class="table-header"
          :style="{ textAlign: column.align ? column.align : 'start' }"
          :key="columnIndex"
          @click="sortColumn(column)"
        >
          <span class="icon-container">
            <slot name="column" :column="column">
              <slot :name="`column-${column.value}`" :column="column">
                {{ column.label }}
              </slot>

              <i
                v-if="internalDirection == 'asc'"
                class="pi pi-arrow-up-line pi-1x"
              />
              <i
                v-else-if="internalDirection == 'desc'"
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
      <tr v-for="(row, rowIndex) in sorted" :key="rowIndex">
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
          v-if="sorted.length === 0"
          :colspan="columns.length"
          align="center"
          class="no-search-results"
        >
          <div>No results found</div>
          <Button @click="clearSearch" miter width="170px" height="36px">
            Clear search
          </Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Button from '../Button/Button.vue'
import Input from '../Input/Input.vue'
import { DataTableColumn } from '../../types/DataTableColumn'

export type DataTableColumnSort = 'asc' | 'desc' | 'none'
export type DataTableRow = Record<string, any>

export default defineComponent({
  name: 'DataTable',
  components: { Button, Input },
  props: {
    columns: {
      type: Array as PropType<DataTableColumn[]>,
      required: true,
      default: () => []
    },
    rows: {
      type: Array as PropType<DataTableRow[]>,
      required: true,
      default: () => []
    },
    direction: {
      type: String as PropType<DataTableColumnSort>,
      required: false,
      default: 'none' 
    },
    sortBy: {
      type: String as PropType<string | null>,
      required: false,
      default: null
    }
  },
  emits: ['update:direction', 'update:sortBy'],
  data() {
    return {
      internalDirection: 'none' as DataTableColumnSort,
      internalSortBy: null as string | null,
      search: ''
    }
  },
  watch: {
    direction: {
      immediate: true,
      handler: function(direction) {
        this.internalDirection = direction
      }
    },
    sortBy: {
      immediate: true,
      handler: function(sortBy) {
        this.internalSortBy = sortBy
      }
    }
  },
  computed: {
    internalSortByColumn(): DataTableColumn {
      return this.columns.find(column => column.value == this.internalSortBy)!
    },
    sorted(): DataTableRow[] {
      if(this.internalSortBy === null || this.internalDirection === 'none') {
        return this.rows
      }

      const sorter = this.internalSortByColumn.sort ?? this.getDefaultSorter(this.internalSortBy)
      const sorted = [...this.rows].sort(sorter)

      if(this.internalDirection == 'desc') {
        sorted.reverse()
      }

      return sorted
    },
  },
  methods: {
    setDirection(direction: DataTableColumnSort) {
      this.internalDirection = direction
      this.$emit('update:direction', direction)
    },
    setSortBy(column: DataTableColumn) {
      this.internalSortBy = column.value
      this.$emit('update:sortBy', column.value)
    },
    getDefaultSorter(sortBy: string) {
      return (a: DataTableRow, b: DataTableRow) => a[sortBy].toString().localeCompare(b[sortBy].toString())
    },
    sortColumn(column: DataTableColumn): void {
      const sameColumn = this.internalSortBy == column.value
      let direction: DataTableColumnSort = 'asc'

      if(sameColumn) {
        switch(this.internalDirection) {
          case 'asc':
            direction = 'desc'
            break
          case 'desc':
            direction = 'none'
            break
          case 'none':
            direction = 'asc'
            break
        }
      }

      this.setDirection(direction)
      this.setSortBy(column)
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
