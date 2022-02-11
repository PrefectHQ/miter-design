export interface DataTableColumn {
  label: string
  value: string
  align?: 'left' | 'center' | 'right' | 'justify' | 'char'
  sort?: (a: any, b: any) => -1 | 0 | 1
  search?: boolean
}
