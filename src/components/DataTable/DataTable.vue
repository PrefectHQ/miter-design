<template>
  <table class="data-table">
    <thead class="data-table__head">
      <tr class="data-table__header-mobile">
        <th class="data-table__table-header-mobile">
          <slot name="header-sort" :sortColumn="sortColumn">
            <Button @click="sortColumn(internalSortByColumn)">Sort: A-Z</Button>
          </slot>
        </th>
      </tr>

      <tr class="data-table__header-desktop">
        <template v-for="(column, columnIndex) in columns" :key="columnIndex">
          <th
            class="data-table__table-header"
            :style="{ textAlign: column.align ?? 'left', cursor: column.sortable ? 'pointer' : '' }"
            @click="sortColumn(column)"
          >
            <slot name="column-header" :label="column.label" :column="column">
              <slot
                :name="columnHeaderSlotName(column)"
                :label="column.label"
                :column="column"
              >{{ column.label }}</slot>
            </slot>
            <i
              class="data-table__table-header-sort-icon pi pi-1x"
              :class="getColumnSortIconClasses(column)"
            />
          </th>
        </template>
      </tr>
      <template v-if="searchableColumns.length">
        <tr>
          <td :colspan="columns.length" class="data-table__search">
            <Input v-model="search" placeholder="Search...">
              <template v-slot:prepend>
                <i class="pi pi-search-line pi-1x data-table__search-icon" />
              </template>
            </Input>
          </td>
        </tr>
      </template>
    </thead>

    <tbody class="data-table__table-body">
      <template v-for="(row, rowIndex) in sorted" :key="rowIndex">
        <tr class="data-table__table-row">
          <template v-for="column in columns" :key="column.value">
            <td :align="column.align ?? 'left'" class="data-table__table-cell">
              <slot name="column" :value="row[column.value]" :row="row">
                <slot
                  :name="columnSlotName(column)"
                  :value="row[column.value]"
                  :row="row"
                >{{ row[column.value] }}</slot>
              </slot>
            </td>
          </template>
        </tr>
      </template>
    </tbody>

    <template v-if="search.length > 0 && sorted.length === 0">
      <tbody class="data-table__table-body">
        <tr>
          <td :colspan="columns.length" align="center" class="data-table__no-search-results">
            <div class="data-table__no-search-results-description">
              <slot name="no-results">
                <p class="data-table__no-search-results-label">No results found</p>
              </slot>
            </div>
            <Button @click="clearSearch" miter width="170px" height="36px">Clear search</Button>
          </td>
        </tr>
      </tbody>
    </template>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Button from '../Button/Button.vue'
import Input from '../Input/Input.vue'
import { DataTableColumn } from '../../types/DataTableColumn'
import { pick } from '@/utilities/objects'
import { kebabCase } from '@/utilities/strings'

export type DataTableColumnSort = 'asc' | 'desc' | 'none'
export type DataTableRow = Record<string, any>

export default defineComponent({
  name: 'MDataTable',
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
    const data: {
      internalDirection: DataTableColumnSort,
      internalSortBy: string | null,
      search: string
    } = {
      internalDirection: 'none',
      internalSortBy: null,
      search: ''
    }

    return data
  },
  watch: {
    direction: {
      immediate: true,
      handler: function (direction) {
        this.internalDirection = direction
      }
    },
    sortBy: {
      immediate: true,
      handler: function (sortBy) {
        this.internalSortBy = sortBy
      }
    }
  },
  computed: {
    internalSortByColumn(): DataTableColumn {
      if (this.internalSortBy) return this.columns.find(column => column.value == this.internalSortBy)!
      return this.columns.find(column => column.sortable !== false)!
    },
    searchableColumns(): DataTableColumn[] {
      return this.columns.filter(column => column.search)
    },
    searched(): DataTableRow[] {
      if (this.searchableColumns.length == 0) {
        return this.rows
      }

      const searchable = this.searchableColumns.map(column => column.value)
      const term = this.search.toLowerCase()

      return this.rows.filter(row => {
        const onlySearchableRow = pick(row, searchable)
        const onlySearchableValues = Object.values(onlySearchableRow)

        return onlySearchableValues.some(value => value?.toString().toLowerCase().includes(term))
      })
    },
    sorted(): DataTableRow[] {
      const rows = this.searched

      if (this.internalSortBy === null || this.internalDirection === 'none') {
        return rows
      }

      const sorter = this.internalSortByColumn.sort ?? this.getDefaultSorter(this.internalSortBy)
      const sorted = [...rows].sort(sorter)

      if (this.internalDirection == 'desc') {
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
      return (a: DataTableRow, b: DataTableRow) => {
        if (typeof a[sortBy] == 'number' && typeof b[sortBy] == 'number') {
          return a[sortBy] - b[sortBy]
        } else {
          return a[sortBy]?.toString().localeCompare(b[sortBy]?.toString())
        }
      }
    },
    getColumnSortIconClasses(column: DataTableColumn) {
      if (column.sortable === false) return
      if (column.value !== this.internalSortBy || this.internalDirection == 'none') {
        return 'pi-code-line data-table__table-header-sort-icon--rotate'
      }

      return this.internalDirection == 'asc' ? 'pi-arrow-up-line' : 'pi-arrow-down-line'
    },
    sortColumn(column: DataTableColumn): void {
      if (column.sortable === false) return
      const sameColumn = this.internalSortBy == column.value
      let direction: DataTableColumnSort = 'asc'

      if (sameColumn) {
        switch (this.internalDirection) {
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
    },
    columnSlotName(column: DataTableColumn): string {
      return `column-${kebabCase(column.value)}`
    },
    columnHeaderSlotName(column: DataTableColumn): string {
      return `column-header-${kebabCase(column.value)}`
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/abstracts/variables';

.data-table {
  border-spacing: 0;
  width: 100%;
  color: #{variables.$text--primary};

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;

  border: 1px solid #{variables.$secondary-hover};
  text-align: left;
  border-radius: 4px;
}

.data-table__header-mobile {
  display: none;
}

.data-table__table-header {
  padding: 16px;
  border-bottom: 1px solid #{variables.$secondary-hover};
  user-select: none;
}

.data-table__table-header-sort-icon {
  width: 16px;
  height: 16px;
  margin-left: 6px;
  margin-top: -3px;
  color: #{variables.$grey-30};
  display: inline-block;
}

.data-table__table-header-sort-icon--rotate {
  transform: rotate(90deg);
}

.data-table__search {
  padding: 0 var(--m-1);
}

.data-table__table-row:hover {
  background: #{variables.$blue-5};
}

.data-table__table-cell {
  padding: 16px;
  border-bottom: 1px solid #{variables.$secondary-hover};
}

.data-table__no-search-results {
  padding: 50px;
}

.data-table__no-search-results-description {
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #{variables.$text--primary};
  margin-bottom: var(--m-3);
}

.data-table__no-search-results-label {
  margin: 0;
}

@media (max-width: 1200px) {
  .data-table__header-desktop {
    display: none;
  }

  .data-table__header-mobile {
    display: flex;
    justify-content: end;
    padding: 16px;
  }

  .data-table__table-row,
  .data-table__table-cell {
    display: block;
  }

  .data-table__table-cell {
    border-bottom: none;
  }
  .data-table__table-cell:last-of-type {
    border-bottom: 1px solid #{variables.$secondary-hover};
  }
}
</style>
