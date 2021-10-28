<template>
  <div class="option-group" :class="classes.group">
    <div class="option-group__label" :class="classes.label">
      <slot name="label" v-bind="scope">
        {{ label }}
      </slot>
    </div>
    <template v-for="(option, i) in options" :key="i">
      <Option :disabled="disabled" :selected="isOptionSelected(option, selected)" v-bind="option" @select="select">
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
import { OptionType } from './types'
import { isOptionSelected } from './utilities'

class Props {
  label = prop<string>({ required: true })
  disabled = prop<boolean>({ default: false })
  options = prop<OptionType[]>({ default: () => ([]) })
  selected = prop({ default: null })
}

@Component({
  emits: ['select'],
  components: {
    Option
  }
})
export default class OptionGroup extends Vue.with(Props) {

  private isOptionSelected = isOptionSelected

  get scope() {
    return {
      label: this.label,
      disabled: this.disabled
    }
  }

  get classes() {
    return {
      group: {
        'option-group--disabled': this.disabled
      },
      label: {
        'option-label--disabled': this.disabled
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

.option-group--disabled {

}

</style>