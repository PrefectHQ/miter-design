<template>
  <div class="native-select" :class="classes.select">
    <div class="native-select__input-container">
      <select ref="input" v-model="selected" class="native-select__input" v-bind="{ disabled, required }">
        <template v-for="(optionOrGroup, i) in options" :key="i">
          <template v-if="isOptionGroup(optionOrGroup)">
            <optgroup :label="optionOrGroup.label" :disabled="optionOrGroup.disabled">
              <template v-for="(option, x) in optionOrGroup.options" :key="x">
                <option :value="option.value" :disabled="option.disabled">{{ option.label }}</option>
              </template>
            </optgroup>
          </template>
          <template v-else>
            <option :value="optionOrGroup.value" :disabled="optionOrGroup.disabled">{{ optionOrGroup.label }}</option>
          </template>
        </template>
      </select>
      <div class="native-select__overlay">
        <template v-if="showSelected">
          <OptionLabel :label="selectedOption?.label" :icon="selectedOption?.icon">
            <template v-slot:label="scope">
              <slot name="selected-option-label" v-bind="scope" />
            </template>
            <template v-slot:icon="scope">
              <slot name="selected-option-icon" v-bind="scope" />
            </template>
          </OptionLabel>
        </template>
        <template v-else>
          <span class="native-select__label">
            {{ label }}
          </span>
        </template>
        <i class="native-select__arrow pi pi-arrow-down-s-line pi-lg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Options } from './types'
import { getOptionFromOptionsAndGroupsByValue, isOptionGroup } from './utilities'
import { Component } from '@/utilities/vue-class-component'

class Props {
  modelValue = prop<string | null>({ default: null })
  options = prop<Options>({ default: () => ({}) })
  label = prop<string>({ default: 'Choose an Option' })
  disabled = prop<boolean | string>({ default: false })
  required = prop<boolean | string>({ default: false })
}

@Component({
  emits: ['update:modelValue']
})
export default class NativeSelect extends Vue.with(Props) {

  $refs!: {
    input: HTMLSelectElement
  }

  private isOptionGroup = isOptionGroup

  get selected() {
    return this.modelValue
  }

  set selected(value: string | null) {
    this.$emit('update:modelValue', value)
  }

  get selectedOption() {
    return getOptionFromOptionsAndGroupsByValue(this.options, this.selected)
  }

  get showSelected() {
    return this.selectedOption?.value !== undefined
  }

  get isRequired() {
    return this.required || this.required === ''
  }

  get classes() {
    return {
      select: {
        'native-select--disabled': this.disabled || this.disabled === '',
        'native-select--selected': this.modelValue !== null,
        'native-select--invalid': this.isRequired && this.modelValue === null
      }
    }
  }

  public focus() {
    this.$refs.input.focus()
  }

}
</script>

<style lang="scss" scoped>
@use '../../styles/abstracts/variables';
@use '../../styles/abstracts/mixins';

.native-select {
  --select-background-color: #fff;
  --select-cursor: pointer;
  --miter-width: 16px;

  width: 350px;
  height: 58px;
  user-select: none;
}

.native-select--disabled {
  --select-background-color: #{variables.$disabled};
  --select-cursor: not-allowed;
}

.native-select--invalid {
  --miter-border-color: #{variables.$error};
}

.native-select:focus-within {
  --miter-border-color: #{variables.$primary};
}

.native-select__input-container {
  position: relative;
  width: inherit;
  height: inherit;

  @include mixins.miter-bordered-rounded;
}

.native-select__overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
  padding: 0 20px;
}

.native-select__label {
  color: #{variables.$grey-20};
}

.native-select__arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #{variables.$grey-80};
  pointer-events: none;
}

.native-select__input {
  background-color: var(--select-background-color);
  cursor: var(--select-cursor);
  appearance: none;
  width: inherit;
  height: inherit;
  border: 0;
  padding: 0 20px;
  color: var(--select-background-color);
}
</style>