import { mount } from '@vue/test-utils'
import DataTable from './DataTable.vue'
import { DataTableColumn } from '../../types/DataTableColumn'
export type DataTableColumnSort = 'asc' | 'desc' | 'none'
export type DataTableRow = Record<string, any>

const columns: DataTableColumn[] = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Member Count',
    value: 'memberCount'
  },
  {
    label: 'Roles',
    value: 'roles'
  }
]

const rows: DataTableRow[] = [
  { name: 'Staging Team', memberCount: 57, roles: 'Admin' },
  { name: 'Data Science', memberCount: 405, roles: 'Admin' },
  { name: 'Dev Ops', memberCount: 22, roles: 'Admin' },
  { name: 'Production Team', memberCount: 35, roles: 'Admin' },
  { name: 'Winter Interns', memberCount: 90, roles: 'Admin' }
]

const ascRows: DataTableRow[] = [
  { name: 'Data Science', memberCount: 405, roles: 'Admin' },
  { name: 'Dev Ops', memberCount: 22, roles: 'Admin' },
  { name: 'Production Team', memberCount: 35, roles: 'Admin' },
  { name: 'Staging Team', memberCount: 57, roles: 'Admin' },
  { name: 'Winter Interns', memberCount: 90, roles: 'Admin' }
]

describe('props', () => {
  test('displays columns', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: columns,
        rows: []
      }
    })

    const datatableHeader = wrapper.findAll('.data-table__table-header')
    expect(datatableHeader[0].text()).toBe(columns[0].label)
    expect(datatableHeader[1].text()).toBe(columns[1].label)
    expect(datatableHeader[2].text()).toBe(columns[2].label)
    expect(datatableHeader.length).toBe(columns.length)
  })

  test('displays rows', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: [],
        rows: rows
      }
    })

    const datatableRows = wrapper.findAll('.data-table__table-row')
    expect(datatableRows.length).toBe(rows.length)
  })
})

describe('emits', () => {
  test('emits update:direction and update:sortBy when clicked', async () => {
    const wrapper = mount(DataTable, {
      props: {
        rows: rows,
        columns: columns
      }
    })

    const header = wrapper.find('.data-table__table-header')
    await header.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('update:direction')
    expect(wrapper.emitted()).toHaveProperty('update:sortBy')
  })

  test('sorting', async () => {
    const wrapper = mount(DataTable, {
      props: {
        rows: rows,
        columns: columns
      }
    })

    const header = wrapper.find('.data-table__table-header')
    await header.trigger('click')

    expect(wrapper.emitted('update:direction')).toEqual([['asc']])
    expect(wrapper.vm.sorted).toEqual(ascRows)

    expect(wrapper.emitted('update:sortBy')).toEqual([['name']])
  })
})

describe('column arrow', () => {
  test('displays table-header-sort-icon--rotate on mount', () => {
    const wrapper = mount(DataTable, {
      props: {
        rows: rows,
        columns: columns
      }
    })

    const tableHeaderSortIcon = wrapper.find(
      '.data-table__table-header-sort-icon'
    )

    expect(tableHeaderSortIcon.classes()).toContain(
      'data-table__table-header-sort-icon--rotate'
    )
  })

  test('displays pi-arrow-up-line on asc', async () => {
    const wrapper = mount(DataTable, {
      props: {
        rows: rows,
        columns: columns
      }
    })
    const header = wrapper.find('.data-table__table-header')
    const tableHeaderSortIcon = wrapper.find(
      '.data-table__table-header-sort-icon'
    )
    await header.trigger('click')
    expect(tableHeaderSortIcon.classes()).toContain('pi-arrow-up-line')
  })

  test('displays pi-arrow-down-line on desc', async () => {
    const wrapper = mount(DataTable, {
      props: {
        rows: rows,
        columns: columns
      }
    })
    const header = wrapper.find('.data-table__table-header')
    const tableHeaderSortIcon = wrapper.find(
      '.data-table__table-header-sort-icon'
    )
    await header.trigger('click')
    await header.trigger('click')

    expect(tableHeaderSortIcon.classes()).toContain('pi-arrow-down-line')
  })
})

describe('slots', () => {
  test('columns', () => {
    const wrapper = mount(DataTable, {
      props: {
        rows: rows,
        columns: columns
      },
      slots: {
        'column-header-member-count': `
      <template #column-header-member-count="{ label }">
        Total: {{ label }}
      </template>
      `
      }
    })

    expect(wrapper.html()).toContain('Total: Member Count')
  })

  test('rows', () => {
    const wrapper = mount(DataTable, {
      props: {
        rows: rows,
        columns: columns
      },
      slots: {
        'column-member-count': `
        <template #column-member-count="{ value }">
          <span>Member Count: {{ value }}</span>
        </template>
      `
      }
    })

    expect(wrapper.html()).toContain('Member Count: 405')
  })
})
