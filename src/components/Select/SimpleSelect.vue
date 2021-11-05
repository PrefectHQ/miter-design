<template>
    <Select v-model="internalValue" :options="internalOptions" v-bind="$attrs">
      <template v-for="(slot, name) in $slots" v-slot:[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </Select>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { OptionType } from './types'
import { Component } from '@/utilities/vue-class-component'

class Props {
  modelValue = prop<string | null>({ default: null })
  options = prop<string[]>({ default: () => [] })
}

@Component({
  name: 'SimpleSelect',
  emits: ['update:modelValue']
})
export default class NativeSelect extends Vue.with(Props) {

  get internalValue() {
    return this.modelValue
  }

  set internalValue(value: string | null) {
    this.$emit('update:modelValue', value)
  }

  get internalOptions() {
    return this.options.map<OptionType<string>>(option => ({
      label: option,
      value: option
    }))
  }

}

</script>