<template>
  <div class="option" :class="classes.option" @click="click">
    <OptionLabel class="option__label" v-bind="{ icon, label }">
      <template v-slot:icon="scope">
        <slot name="icon" v-bind="scope" />
      </template>
      <template v-slot:label="scope">
        <slot name="label" v-bind="scope" />
      </template>
    </OptionLabel>
    <template v-if="isSelected">
      <i class="pi pi-check-line pi-lg" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Component } from '@/utilities/vue-class-component'
import OptionLabel from '@/components/Select/OptionLabel.vue'

class Props {
  label = prop<string>({ required: true })
  value = prop({ required: true })
  icon = prop<string>({ default: '' })
  disabled = prop<boolean | string>({ default: false })
  selected = prop<boolean | string>({ default: false })
}

@Component({
  emits: ['select'],
  components: {
    OptionLabel
  }
})
export default class Option extends Vue.with(Props) {

  get isDisabled() {
    return this.disabled || this.disabled === ''
  }

  get isSelected() {
    return this.selected || this.selected === ''
  }

  get scope() {
    return {
      label: this.label,
      value: this.value,
      icon: this.icon,
      disabled: this.isDisabled,
      selected: this.isSelected
    }
  }

  get classes() {
    return {
      option: {
        'option--disabled': this.isDisabled,
        'option--selected': this.isSelected
      },
      icon: `pi pi-1x mr-1 pi-${this.icon}`
    }
  }

  private click() {
    if(this.isDisabled) {
      return
    }

    this.$emit('select', this.value)
  }

}
</script>

<style lang="scss">
@use '../../styles/abstracts/variables';

.option {
  height: var(--select-height, 58px);
  color: #{variables.$text--primary};
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #{variables.$grey-10};
  }

  &:not(:last-child) {
    border-bottom: 1px solid #{variables.$secondary-background};
  }
}

.option--disabled {
  color: #{variables.$inactive};
  cursor: not-allowed;
}

.option--selected {
  background-color: #{variables.$primary};
  color: #fff;

  &:hover {
    background-color: #{variables.$primary};
  }
}

.option__label {
  margin-right: auto;
}
</style>