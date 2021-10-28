<template>
  <div class="option" :class="classes.option" @click="click">
    <template v-if="icon">
      <slot name="icon" :classes="classes.icon" v-bind="scope">
        <i :class="classes.icon" />
      </slot>
    </template>
    <div class="option__label">
      <slot name="label" v-bind="scope">
        {{ label }}
      </slot>
    </div>
    <template v-if="selected">
      <i class="pi pi-check-line pi-lg" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Component } from '@/utilities/vue-class-component'

class Props {
  label = prop<string>({ required: true })
  value = prop({ required: false }) // will this work or value being optional?
  icon = prop<string>({ default: '' })
  disabled = prop<boolean>({ default: false })
  selected = prop<boolean>({ default: false })
}

@Component({
  emits: ['select']
})
export default class Option extends Vue.with(Props) {

  get scope() {
    return {
      label: this.label,
      value: this.value,
      icon: this.icon,
      disabled: this.disabled,
      selected: this.selected
    }
  }

  get classes() {
    return {
      option: {
        'option--disabled': this.disabled,
        'option--selected': this.selected
      },
      icon: `pi pi-1x mr-1 pi-${this.icon}`
    }
  }

  private click() {
    if(this.disabled) {
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
    border-bottom: 1px solid #f7f7f8;
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