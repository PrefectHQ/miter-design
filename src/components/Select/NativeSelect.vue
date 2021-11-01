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
          <span class="native-select__placeholder">
            {{ placeholder }}
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
import OptionLabel from './OptionLabel.vue'

class Props {
  modelValue = prop<string | null>({ default: null })
  options = prop<Options>({ default: () => ({}) })
  placeholder = prop<string>({ default: 'Choose an Option' })
  disabled = prop<boolean | string>({ default: false })
  required = prop<boolean | string>({ default: false })
}

@Component({
  emits: ['update:modelValue'],
  components: {
    OptionLabel
  }
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
        'native-select--simple-selected': this.modelValue !== null,
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
  --simple-select-background-color: var(--select-background-color, #fff);
  --simple-select-cursor: var(--select-cursor, pointer);
  --simple-select-max-width: var(--select-max-width, 350px);
  --simple-select-height: var(--select-height, 58px);
  --miter-width: 16px;

  width: 100%;
  max-width: var(--simple-select-max-width);
  height: var(--simple-select-height);
  user-select: none;
}

.native-select--disabled {
  --simple-select-background-color: #{variables.$disabled};
  --simple-select-cursor: not-allowed;
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

.native-select__placeholder {
  color: #{variables.$grey-20};
}

.native-select__arrow {
  color: #{variables.$grey-80};
  margin-left: auto;
}

.native-select__input {
  background-color: var(--simple-select-background-color);
  cursor: var(--simple-select-cursor);
  appearance: none;
  width: inherit;
  height: inherit;
  border: 0;
  padding: 0 20px;
  color: var(--simple-select-background-color);
}
</style>