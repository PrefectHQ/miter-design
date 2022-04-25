import { OptionGroupType, Options, OptionType } from "./types";

export function isOptionGroup<T>(optionOrGroup: OptionGroupType<T> | OptionType<T>): optionOrGroup is OptionGroupType<T> {
  return optionOrGroup.hasOwnProperty('options')
}

export function isOption<T>(optionOrGroup: OptionGroupType<T> | OptionType<T>): optionOrGroup is OptionType<T> {
  return optionOrGroup.hasOwnProperty('value')
}

export function isOptionSelected<T>(option: OptionType<T>, value: T): boolean {
  return JSON.stringify(option.value) == JSON.stringify(value)
}

export function isOptionVisible<T>(option: OptionType<T>, term: string): boolean {
  return option.label.toLocaleLowerCase().includes(term)
}

export function isOptionGroupVisible<T>(group: OptionGroupType<T>, term: string): boolean {
  return group.options.some(option => isOptionVisible(option, term))
}

export function getOptionsFromOptionsAndGroups<T>(options: Options<T>): OptionType<T>[] {
  return options.reduce<OptionType<T>[]>((result, option) => {
    if(isOptionGroup(option)) {
      result.push(...option.options)
    } else {
      result.push(option)
    }

    return result
  }, [])
}

export function getOptionFromOptionsAndGroupsByValue<T>(options: Options<T>, value: T): OptionType<T> | null {
  const allOptions = getOptionsFromOptionsAndGroups(options)

  return allOptions.find(option => option.value === value) ?? null
}