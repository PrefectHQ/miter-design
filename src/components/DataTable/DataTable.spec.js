import { mount } from '@vue/test-utils'
import DataTable from './DataTable.vue'

const columns = [
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

const rows = [
  { name: 'Staging Team', memberCount: 57, roles: 'Admin' },
  { name: 'Data Science', memberCount: 405, roles: 'Admin' },
  { name: 'Dev Ops', memberCount: 22, roles: 'Admin' },
  { name: 'Production Team', memberCount: 35, roles: 'Admin' },
  { name: 'Winter Interns', memberCount: 90, roles: 'Admin' }
]

const ascRows = [
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
        rows: rows,
        columns: columns
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
        rows: rows,
        columns: columns
      }
    })

    const datatableRows = wrapper.findAll('.data-table__table-row')
    expect(datatableRows.length).toBe(rows.length)
  })
})

describe('emits', () => {
  test('direction', async () => {
    const wrapper = mount(DataTable, {
      props: {
        rows: rows,
        columns: columns
      }
    })

    const header = wrapper.find('.data-table__table-header')
    await header.trigger('click')

    expect(wrapper.emitted('update:direction')[0][0]).toEqual('asc')
    expect(wrapper.vm.sorted).toEqual(ascRows)
  })

  test('sort by', async () => {
    const wrapper = mount(DataTable, {
      props: {
        rows: rows,
        columns: columns
      }
    })

    const header = wrapper.find('.data-table__table-header')
    await header.trigger('click')

    expect(wrapper.emitted('update:sortBy')[0][0]).toEqual('name')
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
