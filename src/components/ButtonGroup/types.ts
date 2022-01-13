export type ButtonGroupItemValue = string | number | boolean

export type ButtonGroupItem = {
    label?: string,
    value: ButtonGroupItemValue,
    disabled?: boolean
}

export type ButtonGroupItemsProp = ButtonGroupItem[] | ButtonGroupItemValue[]
export type ButtonGroupItemProp = ButtonGroupItem | ButtonGroupItemValue