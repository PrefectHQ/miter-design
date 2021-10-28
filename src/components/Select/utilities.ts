import { OptionGroupType, Options, OptionType } from "./types";

export function isOptionGroup<T>(option: OptionGroupType<T> | OptionType<T>): option is OptionGroupType<T> {
  return option.hasOwnProperty('options')
}

export function isOptionSelected<T>(option: OptionType<T>, value: T): boolean {
  return JSON.stringify(option.value) == JSON.stringify(value)
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

export function searchOption<T>(option: OptionType<T>, term: string): boolean {
  return option.label.toLocaleLowerCase().includes(term)
}

export function searchOptions<T>(options: OptionType<T>[], term: string): OptionType<T>[] {
  return options.filter(option => searchOption(option, term))
}

export function searchOptionsAndGroups<T>(options: Options<T>, term: string): Options<T> {
  return options.reduce<Options<T>>((result, optionOrGroup) => {
    // this will destroy and class instance...
    const searchedOptionOrGroup = {...optionOrGroup}

    if(isOptionGroup(searchedOptionOrGroup)) {
      searchedOptionOrGroup.options = searchOptions(searchedOptionOrGroup.options, term)

      if(searchedOptionOrGroup.options.length) {
        result.push(searchedOptionOrGroup)
      }
    } else {
      if(searchOption(searchedOptionOrGroup, term)) {
        result.push(searchedOptionOrGroup)
      }
    }

    return result
  }, [])
}