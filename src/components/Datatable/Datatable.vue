<template>
  <table>
    <thead class="table-head">
      <tr v-if="windowWidth <= 1200" class="mobile-sort-container">
        <th v-if="windowWidth <= 1200" class="mobile-sort">
          <slot name="header-sort" :handleMobileSort="sortColumns">
            <Button @click="sortColumns(columns[0])">Sort: A-Z</Button></slot
          >
        </th>
      </tr>

      <tr v-if="windowWidth >= 1200" class="table-row">
        <th
          v-for="(column, columnIndex) in columns"
          class="table-header"
          :key="columnIndex"
          @click="sortColumns(column)"
        >
          <div
            class="icon-container"
            :style="{ textAlign: column.align ? column.align : '' }"
          >
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
          :align="column.align"
          class="table-cell"
        >
          <slot name="item" :item="row">
            <slot :name="'item-' + Object.keys(row)[columnIndex]" :item="row">
              {{ row[Object.keys(row)[columnIndex]] }}
            </slot>
          </slot>
        </td>
      </tr>

      <tr>
        <td
          v-if="sortedColumns.length === 0"
          :colspan="Object.keys(columns).length"
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
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  data() {
    return {
      currentSort: '',
      currentSortDir: this.dir ? this.dir : 'asc',
      search: '',
      sortedItems: [],
      windowWidth: window.innerWidth
    }
  },
  computed: {
    mobileView() {
      return true
    },
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
    },
    clearSearch() {
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

thead > tr > th {
  padding: 16px;
  cursor: pointer;
}

.table-cell {
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
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

@media (max-width: 1200px) {
  tr,
  td {
    display: block;
  }

  .table-cell:last-of-type {
    border-bottom: 1px solid #e8e8e8;
  }

  .table-cell {
    border-bottom: none;
  }

  .mobile-sort-container {
    display: flex;
    justify-content: end;
  }
}
</style>
