export interface DataTableColumn {
  label: string
  value: string
  align?: string
  sort?: (a: any, b: any) => -1 | 0 | 1
  search?: boolean
}
