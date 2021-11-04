export type OptionGroupType<T = string> = {
    label: string
    options: OptionType<T>[]
    disabled?: boolean
  }
  
  export type OptionType<T = string> = {
    label: string
    value: T
    disabled?: boolean
    icon?: string
  }
  
  export type Options<T = string> = (OptionType<T> | OptionGroupType<T>)[]