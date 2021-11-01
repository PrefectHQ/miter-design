<template>
  <div v-show="isOptionGroupVisible(group, filter)" class="option-group" :class="classes.group">
    <div class="option-group__label" :class="classes.label">
      <slot name="label" v-bind="group">
        {{ group.label }}
      </slot>
    </div>
    <template v-for="(option, i) in group.options" :key="i">
      <Option v-show="isOptionVisible(option, filter)" :disabled="group.disabled" :selected="isOptionSelected(option, selected)" v-bind="option" @select="select">
        <template v-slot:icon="scope">
          <slot name="option-icon" v-bind="scope" />
        </template>
        <template v-slot:label="scope">
          <slot name="option-label" v-bind="scope" />
        </template>
      </Option>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Component } from '@/utilities/vue-class-component'
import Option from './Option.vue'
import { OptionGroupType } from './types'
import { isOptionSelected, isOptionVisible, isOptionGroupVisible } from './utilities'

class Props {
  group = prop<OptionGroupType>({ default: () => ({}) })
  selected = prop({ default: null })
  filter = prop<string>({ default: '' })
}

@Component({
  emits: ['select'],
  components: {
    Option
  }
})
export default class OptionGroup extends Vue.with(Props) {

  private isOptionSelected = isOptionSelected
  private isOptionVisible = isOptionVisible
  private isOptionGroupVisible = isOptionGroupVisible

  get classes() {
    return {
      group: {
        'option-group--disabled': this.group.disabled
      },
      label: {
        'option-label--disabled': this.group.disabled
      }
    }
  }

  private select(value: any) {
    this.$emit('select', value)
  }

}
</script>

<style lang="scss">
@use '../../styles/abstracts/variables';

.option-group__label {
  border-bottom: 1px solid #f7f7f8;
  height: var(--select-height, 58px);
  display: flex;
  align-items: center;
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
  color: #{variables.$grey-20};
}

</style>